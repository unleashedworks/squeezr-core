const jsonlint = require('@prantlf/jsonlint') // 更好的非标准兼容性
const htmlToText = require('html-to-text').fromString

function stringify (str) {
  return htmlToText(str, {
    wordwrap: false,
    format: {
      lineBreak: function (elem, fn, options) {
        return ' '
      } // 换行符暂时转换为多个空格，便于下方 replace 判断
    }
  }).replace(/ets_th([0-9])+ /g, '$1. ')
    .replace(/([^ ]+) {2,}/g, '$1 ') // 移除单词后的多个空格
    .trim()
}

function mapObject (targetObject, callbackFn) {
  if (!targetObject) return targetObject
  if (Array.isArray(targetObject)) {
    return targetObject.map((v) => mapObject(v, callbackFn))
  }
  return Object.entries(targetObject).reduce((acc, [key, value]) => {
    const res = callbackFn(key, value)
    if (!Array.isArray(res) && typeof res === 'object') {
      return { ...acc, [key]: mapObject(res, callbackFn) }
    }
    if (Array.isArray(res)) {
      return { ...acc, [key]: res.map((v) => mapObject(v, callbackFn)) }
    }
    return { ...acc, [key]: res }
  }, {})
}

module.exports = function (data, purify = true) {
  // eslint-disable-next-line no-control-regex
  data = data.replace(/[\x00-\x1F\x7F\n\uFEFF]/g, '') // 解决非标准 JSON 内出现的控制字符
  try {
    return mapObject(jsonlint.parse(data), (key, x) => {
      if (typeof x === 'string' && purify) {
        return stringify(x) // 当内容为文字时当作 HTML 解析
      } else {
        return x
      }
    })
  } catch (err) {
    return data
  }
}

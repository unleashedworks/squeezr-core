/**
 * 自动选择易听说 `paper.Jason` 解析器。
 * @param {string} data - 序列化后的试题。
 */
module.exports = async function (data) {
  if (data.txlist) {
    return require('./paper')(data)
  } else {
    return require('./legacy')(data)
  }
}

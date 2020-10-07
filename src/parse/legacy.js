/**
 * 易听说 `content.json` 解析器。
 * @param {Array} contents - 按照顺序包含序列化后的 `content.json`
 */
module.exports = function (content) {
  return content.map(problem => {
    switch (problem.structure_type) {
      case 'collector.read':
        return {
          type: 'read',
          content: [{
            ask: '朗读下列短文。',
            answer: [problem.info.symbol || problem.info.value]
          }]
        }
      case 'collector.role':
        return {
          type: 'answer',
          content: problem.info.question.map(question => ({
            ask: question.ask,
            answer: question.std.map(x => x.value)
          }))
        }
      case 'collector.picture':
        return {
          type: 'info',
          content: [{
            ask: problem.info.value,
            answer: problem.info.std.map(x => x.value)
          }]
        }
      case 'collector.word':
        return {
          type: 'read',
          content: [{
            ask: problem.info.translate,
            answer: [problem.info.value]
          }]
        }
      case 'collector.dialogue':
        return {
          type: 'answer',
          content: problem.info.question.map(question => ({
            ask: question.ask,
            answer: question.std.map(x => x.value)
          }))
        }
      case 'collector.choose':
        return {
          type: 'answer',
          content: problem.info.xtlist.map(question => ({
            ask: question.xt_value,
            answer: [question.answer]
          }))
        }
      case 'collector.fill':
        return {
          type: 'answer',
          content: [{
            ask: problem.info.value,
            answer: problem.info.std.map(x => x.value)
          }]
        }
      case 'collector.repeat_essay':
        return {
          type: 'read',
          content: problem.info.map(question => ({
            ask: '朗读下列短文。',
            answer: question.sublist.map(sequence => sequence.text)
          }))
        }
      default:
        return {
          type: 'unsupported',
          content: [
            {
              ask: '（暂时）不支持的题目',
              answer: [
                'ugh.',
                'squeezr 无法解析此题目！',
                '你可以尝试：',
                '更新 squeezr 至最新版。',
                '在 Issues 中反馈。',
                '编写补丁并发送！<3',
                    `Type: ${problem.structure_type}`
              ]
            }
          ]
        }
    }
  })
}

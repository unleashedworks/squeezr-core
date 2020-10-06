/**
 * 易听说 `paper.Jason` 解析器。
 * @param {string} paper - 序列化后的 `paper.Jason`
 */
module.exports = async function (paper) {
  return paper.txlist.map(problem => {
    switch (problem.cjq_no /* 题目类型 */) {
      case 'collector.read':
        return {
          type: 'read',
          content: [
            {
              ask: '朗读下列短文。',
              answer: [
                problem.stlist[0].symbol || problem.stlist[0].value
              ]
            }
          ]
        }
      case 'collector.role':
        return {
          type: 'answer',
          content: problem.stlist[0].question.map(question => ({
            ask: question.ask,
            answer: question.std.map(x => x.value)
          }))
        }
      case 'collector.picture':
        return {
          type: 'info',
          content: [
            {
              ask: problem.stlist[0].value,
              answer: problem.stlist[0].std.map(x => x.value)
            }
          ]
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
                `Type: ${problem.cjq_no}`
              ]
            }
          ]
        }
    }
  })
}

/*
 * 本文件包含所有支持的 `structure_type`
 * 并将它们转换为缩写。
 *
 * Last updated: 2020/10/1
 */

module.exports = {
  /* Types:
   * - `read': 模仿朗读类。
   * - `answer`: 选择题。
   * - `info` : 材料转述题。
   */
  'collector.read': { short: 'read', type: 'read' },
  'collector.role': { short: 'role', type: 'answer' },
  'collector.picture': { short: 'picture', type: 'info' },
  'collector.word': { short: 'word', type: 'read' },
  'collector.dialogue': { short: 'dialogue', type: 'answer' },
  'collector.choose': { short: 'choose', type: 'answer' },
  'collector.fill': { short: 'fill', type: 'answer' },
  'collector.repeat_essay': { short: 'essay', type: 'read' }
}

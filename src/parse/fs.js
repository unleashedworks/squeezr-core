const fs = require('fs/promises')
const path = require('path')
const format = require('../utils/format')

module.exports = async function (dir) {
  try {
    return require('./paper')(
      format(await fs.readFile( // 解决非标准 JSON
        path.join(dir, 'paper.Jason'), 'utf8'
      ))
    )
  } catch (err) {
    if (err.code === 'ENOENT') { // 文件不存在
      return require('./legacy')(
        await Promise.all((await fs.readdir(dir))
          .filter(folder =>
            folder.match(/^content0001[0-9]{4}$/g)
          ).map(async folder => {
            return format(
              await fs.readFile(
                path.join(dir, folder, 'content.json'), 'utf8'
              )
            )
          }))
      )
    }
  }
}

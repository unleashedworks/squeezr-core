import { directoryOpen } from 'browser-nativefs'
const parse = require('./src/parse')
const format = require('./src/utils/format')
const marked = require('marked')

async function openFileDialog () {
  const dirContent = (
    await directoryOpen({
      recursive: true
    })
  )

  function render (parsed, elem = document.getElementById('app')) {
    const md = parsed
      .map((problem) => {
        return problem.content
          .map((question) => {
            const answer = question.answer.map((x) => `- ${x}`).join('\n')
            return `## ${question.ask}\n${answer}`
          })
          .join('\n\n')
      })
      .join('\n\n---\n\n')
    elem.innerHTML = marked(md)
  }

  if (dirContent.filter(x => x.webkitRelativePath.match(/paper\.Jason$/g))) {
    render(await parse(
      format(await dirContent.filter(x => x.webkitRelativePath.match(/\/?paper\.Jason$/g))[0]
        .text()
      )
    ))
  } else {
    const blobs = await Promise.all(dirContent.filter(x =>
      x.webkitRelativePath.match(/content0001[0-9]{4}\/content\.json$/g)
    ).map(x => x.text()))

    render(await parse(blobs.map(format)))
  }
}

document.querySelector('#open').addEventListener('click', openFileDialog)

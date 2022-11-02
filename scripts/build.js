// 脚本的功能， 读取 ## 前端手写题积累  这几个字符串
// 遍历当前目录下面的文件  [.js|.html]结尾的文件生成链接写入到文件当中去


const path = require('path')
const fs = require('fs/promises')

const flag = `## 前端手写题积累`

const ignoreFiles = ['index.html']

// 获取源文件内容
async function getSourceContent() {
  let content = await fs.readFile(path.resolve(__dirname, '../readme.md'), { encoding: 'utf-8' })
  return content
}
// 生成新的字符串

async function genNewReadmeStr() {
  let files = await fs.readdir(path.resolve(__dirname, '../'))
  let extensions = ['.js', '.html']
  files = files.filter((name) => {
    const extension = path.extname(name)
    return extensions.includes(extension) && !ignoreFiles.includes(name)
  })
  const newStr = files.map((name) => {
    // 去掉后缀只拿名字
    const lastIndex = name.lastIndexOf('.')
    const filename = name.substring(0, lastIndex)
    return `[ ${filename} ](${name})`
  }).join('\n\n')
  return newStr
}

// 拼接后写入文件


async function start() {
  let sourceContent = await getSourceContent()
  sourceContent = sourceContent.substring(0, flag.length)
  let newContent = await genNewReadmeStr()

  let finallyContent = `${sourceContent ? sourceContent : flag}\n\n${newContent}`

  await fs.writeFile(path.resolve(__dirname, '../readme.md'), finallyContent, {
    encoding: 'utf-8'
  })
  console.log(`readme文件生成完毕`)
}

start()



// MAYBE https://ulbitv.ru/pl/teach/control/lesson/view?id=261589536 в комментариях доработаный скрипт.

// 1 Вариант: otherSources/create-public-api-for-ui.ts
// directories?.forEach((directory) => {
//     const folderName = directory.getPath()
//     const isIndexFileExist = directory.getSourceFile(`${folderName}/${indexFilename}`)

//     if (!isIndexFileExist) {
//     const filesInFolder = directory.getSourceFiles([
//     "**/*.tsx",
//     "!**/*.stories.*",
//     "!**/*.test.*",
//     ])

//     let content = ""

//     filesInFolder?.forEach((component) => {
//     const folderLen = folderName.length
//     const moduleName = component.getBaseNameWithoutExtension()
//     const modulePath = `.${component.getFilePath().slice(folderLen, -4)}`
//     content += `export {${moduleName}} from "${modulePath}"\n`
//     })
//     // console.log(content)
//     const file = directory.createSourceFile(
//     `${folderName}/${indexFilename}`,
//     content,
//     {overwrite: true},
//     )

//     file.save().then(() => console.log(`${folderName} --> index.ts created!`))
//     }
//     })

// Вариант 2
// componentsDirs?.forEach((directory) => {
//     const folderName = directory.getPath();
//     const indexFilePath = `${folderName}/index.ts`;
//     const indexFile = directory.getSourceFile(indexFilePath);
//     const moduleNamePath = directory.getBaseName();

//     if (!indexFile) {
//     const sourceCode = `export { ${moduleNamePath} } from './${moduleNamePath}';\n`;
//     const file = directory.createSourceFile(indexFilePath, sourceCode, { overwrite: true });

//     file.save();
//     }
//     });

// Вариант 3: otherSources/createPublicApiForSharedUI.ts

/** Добавляет index.ts public api для shared ui компонентов */

import { Project } from 'ts-morph'
import path from 'path'

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui')
const sharedUiDirectory = project.getDirectory(uiPath)
const componentsDirs = sharedUiDirectory?.getDirectories()

function isAbsolute(value: string) {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages']
  return layers.some((layer) => value.startsWith(layer))
}

componentsDirs?.forEach((directory) => {
  const indexFilePath = `${directory.getPath()}/index.ts`
  const indexFile = directory.getSourceFile(indexFilePath)

  if (!indexFile) {
    const sourceCode = `export * from './${directory.getBaseName()}'`
    const file = directory.createSourceFile(indexFilePath, sourceCode, {
      overwrite: true,
    })

    file.save()
  }
})

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations()
  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue()
    const valueWithoutAlias = value.replace('@/', '')

    const segments = valueWithoutAlias.split('/')

    const isSharedLayer = segments?.[0] === 'shared'
    const isUiSlice = segments?.[1] === 'ui'

    if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
      const result = valueWithoutAlias.split('/').slice(0, 3).join('/')
      importDeclaration.setModuleSpecifier(`@/${result}`)
    }
  })
})

project.save()

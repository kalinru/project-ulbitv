/** очищаем кэш, при установке нового пакета 
* не используется
* используем "postinstall": "rimraf ./node_modules/.cache"  (package.json)
*/

const fs = require('fs')
const { join: joinPath } = require('path')
const cacheDir = joinPath(__dirname, '..', 'node_modules/.cache')
fs.rmSync(cacheDir, { recursive: true, force: true })
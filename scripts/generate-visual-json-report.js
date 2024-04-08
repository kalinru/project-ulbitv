/** скрипт для генерации отчета по проваленым UI тестам в json формате для reg-cli 
 * package.json:
 *  "test:ui:report": "npm run test:ui:json && npm run test:ui:html",
 *  "test:ui:json": "node scripts/generate-visual-json-report.js",
 *  "test:ui:html": "reg-cli --from .loki/report.json --report .loki/report.html",
*/

const {promisify} = require('util');
const {readdir, writeFile} = require('fs');
const {join: joinPath, relative} = require('path');

const asyncReaddir = promisify(readdir);
const writeFileAsync = promisify(writeFile);

const lokiDir = joinPath(__dirname, '..', '.loki');
const actualDir = joinPath(lokiDir, 'current');
const expectedDir = joinPath(lokiDir, 'reference');
const diffDir = joinPath(lokiDir, 'difference');

(async function main() {
	const diffs = await asyncReaddir(diffDir);

	await writeFileAsync(joinPath(lokiDir, 'report.json'), JSON.stringify({
		newItems: [],
		deletedItems: [],
		passedItems: [],
		failedItems: diffs,
		expectedItems: diffs,
		actualItems: diffs,
		diffItems: diffs,
		actualDir: relative(lokiDir, actualDir),
		expectedDir: relative(lokiDir, expectedDir),
		diffDir: relative(lokiDir, diffDir)
	}));
})();
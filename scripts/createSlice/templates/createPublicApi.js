const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = async (layer, sliceName, {hasModel, hasUI}) => {
    const componentName = firstCharUpperCase(sliceName);
    const schemaName = `${sliceName}Schema`;

    let exports = ''

    if (hasUI) {
        exports += `export { ${componentName} } from './ui/${componentName}/${componentName}';`
    }

    if (hasModel) {
        exports += `export { ${firstCharUpperCase(schemaName)} } from './model/types/${schemaName}';`
    }

    try {
        await fs.writeFile(
            resolveRoot('src', layer, sliceName, 'index.ts'),
            exports,
        );
    } catch (e) {
        console.log('Не удалось создать PUBLIC API');
    }
};

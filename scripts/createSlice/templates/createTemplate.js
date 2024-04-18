const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const createModel = require('./createModel');
const createUI = require('./createUI');
const createPublicApi = require('./createPublicApi');

module.exports = async (layer, sliceName, options) => {
    try {
        await fs.mkdir(resolveRoot('src', layer, sliceName));
    } catch (e) {
        console.log(`не удалось создать директорию для слайса${sliceName}`);
    }

    let hasModel = true
    let hasUI = true

    if (options) {
        const optionsArray = options.split(' ')
        hasModel = optionsArray.find(option => option === 'model')
        hasUI = optionsArray.find(option => option === 'ui')
    }

    await hasModel && createModel(layer, sliceName);
    await hasUI && createUI(layer, sliceName);
    await createPublicApi(layer, sliceName, {hasModel, hasUI});
};

const { default: axios } = require('axios');
const {CONSOLE_LOG} = require('../logger/logger');

const callCommand = async (uri, method, data, token = null) => {
    CONSOLE_LOG.debug(`Calling command ${method}: ${uri} ${JSON.stringify(data)}`);
    const dtoIn = _prepareAxiosConfig(uri, method, data, token);
    const response = await axios(dtoIn);
    return response.data;

};

const _prepareAxiosConfig = (uri, method, data, token = null) => {
    const dtoIn = {
        url: uri,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Accept-Encoding": "gzip,deflate,compress"
        },
        method: token ? method : 'POST',
        data: JSON.stringify(data)
    };
    if (token) {
        dtoIn.headers.Authorization = `Bearer ${token}`;
    }
    return dtoIn;
};

module.exports = {
    callCommand
};

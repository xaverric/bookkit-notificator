const { callCommand } = require("../client/calls");

const getBookStructure = async (baseUri, token) => {
    return await callCommand(`${baseUri}/getBookStructure`, "GET", { }, token);
}

const loadPage = async (baseUri, code, token) => {
    return await callCommand(`${baseUri}/loadPage`, "GET", {code: code}, token);
}

const listPages = async (baseUri, token) => {
    return await callCommand(`${baseUri}/listPages`, "GET", {pageInfo: {pageSize: 5000}}, token);
}

module.exports = {
    getBookStructure,
    loadPage,
    listPages
}
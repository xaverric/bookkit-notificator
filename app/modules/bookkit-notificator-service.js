const {getBookStructure, loadPage, listPages} = require("./bookkit/bookkit-client");

const loadBookPages = async (configuration, token) => {
    let bookStructure = await getBookStructure(configuration.bookkit.uri, token);
    let requests = Object.keys(bookStructure.itemMap).map(async (pageCode) => await loadPage(configuration.bookkit.uri, pageCode, token));
    let result = await Promise.allSettled(requests);
    return result.map(item => item.value);
}

const listBookPages = async (configuration, token) => {
    let result = await listPages(configuration.bookkit.uri, token);
    return result.itemList;
}

module.exports = {
    loadBookPages,
    listBookPages
}
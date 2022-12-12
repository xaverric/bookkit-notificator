const {getBookStructure, loadPage} = require("./bookkit/bookkit-client");

const loadBookPagesPerf = async (configuration, token) => {
    let bookStructure = await getBookStructure(configuration.bookkit.uri, token);
    let requests = Object.keys(bookStructure.itemMap).map(async (pageCode) => await loadPage(configuration.bookkit.uri, pageCode, token));
    let result = await Promise.allSettled(requests);
    return result.map(item => item.value);
}

module.exports = {
    loadBookPagesPerf
}
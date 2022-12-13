const {loadBookPages, listBookPages} = require("../bookkit-notificator-service");
const {processPages, processPagesLight} = require("./loaded-pages-processor");
const {buildEmailHtmlContent, buildEmailHtmlContentLight} = require("../mail/template/email-html-content-builder");

const STRATEGY = {
    full: {
        loadPages: (configuration, token) => loadBookPages(configuration, token),
        processPages: (configuration, pages) => processPages(pages, configuration),
        buildHtmlContent: (data) => buildEmailHtmlContent(data)
    },
    light: {
        loadPages: (configuration, token) => listBookPages(configuration, token),
        processPages: (configuration, pages) => processPagesLight(pages, configuration),
        buildHtmlContent: (data) => buildEmailHtmlContentLight(data)
    }
}

const decideStrategy = (bookkitConfiguration) => {
    return bookkitConfiguration.strategy === "full" ? STRATEGY.full : STRATEGY.light;
}

module.exports = {
    decideStrategy
}
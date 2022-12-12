const {CONSOLE_LOG} = require("./modules/logger/logger");
const {login} = require("./modules/client/authorize-module");
const {readConfiguration} = require("./modules/configuration/configuration-reader");
const {buildEmailHtmlContent} = require("./modules/mail/template/email-html-content-builder");
const {loadBookPagesPerf} = require("./modules/bookkit-notificator-service");
const {processPages} = require("./modules/bookkit/loaded-pages-processor");
const {sendEmailNotification} = require("./modules/mail/sender/mail-sender");

const notify = async (cmdArgs) => {
    const configuration = await readConfiguration(cmdArgs);
    const token = await login(configuration.bookkit.oidcHost, configuration.bookkit.accessCode1, configuration.bookkit.accessCode2);

    // TODO multiple bookkits suport

    // TODO load including section history history
    // TODO listPageSectionVersion for every section in the page
    let pages = await loadBookPagesPerf(configuration, token);
    // TODO fix sorting from newest to oldest
    const processedPages = processPages(pages, configuration);

    if (processedPages && processedPages.length !== 0) {
        // TODO adjust output - "$NAME updated $PAGE"
        // TODO add description - from-to timeinterval changes are relevant
        let htmlContent = buildEmailHtmlContent({pages: processedPages, configuration});
        await sendEmailNotification(htmlContent, configuration);
    } else {
        CONSOLE_LOG.info("No news to notify about... :(");
    }
}

const help = usage => {
    CONSOLE_LOG.debug(usage);
}

const version = () => {
    CONSOLE_LOG.debug(packageJson.version);
}

module.exports = {
    notify,
    help,
    version
}
const {CONSOLE_LOG} = require("./modules/logger/logger");
const {login} = require("./modules/client/authorize-module");
const {readConfiguration} = require("./modules/configuration/configuration-reader");
const {buildEmailHtmlContent} = require("./modules/mail/template/email-html-content-builder");
const {loadBookPagesPerf} = require("./modules/bookkit-notificator-service");
const {processPages} = require("./modules/bookkit/loaded-pages-processor");
const {sendEmailNotification} = require("./modules/mail/sender/mail-sender");
const packageJson = require("../package.json");
const {currentDateTime} = require("./modules/util/date-helper");

const notify = async (cmdArgs) => {
    const configuration = await readConfiguration(cmdArgs);
    await Promise.all(configuration.map(async bookkitConfiguration => await _processBookkitNotifications(bookkitConfiguration)))
}

const _processBookkitNotifications = async bookkitConfiguration => {
    const token = await login(bookkitConfiguration.bookkit.oidcHost, bookkitConfiguration.bookkit.accessCode1, bookkitConfiguration.bookkit.accessCode2);
    // TODO load including section history history
    // TODO listPageSectionVersion for every section in the page
    CONSOLE_LOG.info(`${currentDateTime()} Loading pages for ${bookkitConfiguration.bookkit.name}`);
    let pages = await loadBookPagesPerf(bookkitConfiguration, token);
    CONSOLE_LOG.info(`${currentDateTime()} Processing pages for ${bookkitConfiguration.bookkit.name}`);
    const processedPages = processPages(pages, bookkitConfiguration);

    if (processedPages && processedPages.length !== 0) {
        let htmlContent = buildEmailHtmlContent({pages: processedPages, configuration: bookkitConfiguration});
        await sendEmailNotification(htmlContent, bookkitConfiguration);
    } else {
        CONSOLE_LOG.info(`No news to notify about for ${bookkitConfiguration.bookkit.name}... :(`);
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
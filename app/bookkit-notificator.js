const {CONSOLE_LOG} = require("./modules/logger/logger");
const {login} = require("./modules/client/authorize-module");
const {readConfiguration} = require("./modules/configuration/configuration-reader");
const {sendEmailNotification} = require("./modules/mail/sender/mail-sender");
const packageJson = require("../package.json");
const {decideStrategy} = require("./modules/bookkit/bookkit-load-strategy-helper");

const notify = async (cmdArgs) => {
    const configuration = await readConfiguration(cmdArgs);
    await Promise.all(configuration.map(async bookkitConfiguration => await _processBookkitNotifications(bookkitConfiguration)))
}

const _processBookkitNotifications = async bookkitConfiguration => {
    const token = await login(bookkitConfiguration.bookkit.oidcHost, bookkitConfiguration.bookkit.accessCode1, bookkitConfiguration.bookkit.accessCode2);
    const strategy = decideStrategy(bookkitConfiguration);
    CONSOLE_LOG.info(`Loading pages for ${bookkitConfiguration.bookkit.name}`);
    let pages = await strategy.loadPages(bookkitConfiguration, token);
    CONSOLE_LOG.info(`Processing pages for ${bookkitConfiguration.bookkit.name}`);
    const processedPages = strategy.processPages(bookkitConfiguration, pages);

    if (processedPages && processedPages.length !== 0) {
        let htmlContent = strategy.buildHtmlContent({pages: processedPages, configuration: bookkitConfiguration});
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
const resolveNotificationTimeOffset = configuration => {
    configuration.forEach(configItem => {
        configItem.notifications.timeNow = new Date();
        configItem.notifications.timeFrom = new Date();
        configItem.notifications.timeFrom.setHours(configItem.notifications.timeNow.getHours() - configItem.notifications.offset);
    });
    return configuration;
}

module.exports = {
    resolveNotificationTimeOffset
}
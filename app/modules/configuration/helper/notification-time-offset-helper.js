const resolveNotificationTimeOffset = configuration => {
    configuration.notifications.timeNow = new Date();
    configuration.notifications.timeFrom = new Date();
    configuration.notifications.timeFrom.setHours(configuration.notifications.timeNow.getHours() - configuration.notifications.offset);
    return configuration;
}

module.exports = {
    resolveNotificationTimeOffset
}
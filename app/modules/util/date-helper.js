/**
 * Returns current date in YYYY-MM-DD format
 *
 * @returns {string}
 */
const currentDateTime = () => {
    return formatDateTime(new Date());
}

/**
 * Returns date in "YYYY-MM-DD HH:mm" format based on the provided {@link Date} object
 *
 * @returns {string|null}
 */
const formatDateTime = date => {
    if (!date) {
        return null;
    }
    let yyyymmdd = [
        date?.getFullYear(),
        _padTo2Digits(date?.getMonth() + 1),
        _padTo2Digits(date?.getDate())
    ].join('-');

    let time = [
        _padTo2Digits(date?.getHours()),
        _padTo2Digits(date?.getMinutes())
    ].join(":");

    return `${yyyymmdd} ${time}`;
}

const _padTo2Digits = num => {
    return num.toString().padStart(2, '0');
}

module.exports = {
    currentDateTime,
    formatDateTime
}
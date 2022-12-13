const {compile} = require("../../util/handlebarsTemplateHelper");
const path = require("path");

const HTML_TEMPLATE_PATH = path.join(__dirname, "email-template.handlebars");
const HTML_TEMPLATE_PATH_LIGHT = path.join(__dirname, "email-template-light.handlebars");

const buildEmailHtmlContent = (data) => {
    return compile(HTML_TEMPLATE_PATH, data);
}

const buildEmailHtmlContentLight = (data) => {
    return compile(HTML_TEMPLATE_PATH_LIGHT, data);
}

module.exports = {
    buildEmailHtmlContent,
    buildEmailHtmlContentLight
}
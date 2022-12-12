const {compile} = require("../../util/handlebarsTemplateHelper");
const path = require("path");

// TODO - table form, filter and sort support
const HTML_TEMPLATE_PATH = path.join(__dirname, "email-template.handlebars");

const buildEmailHtmlContent = (data) => {
    return compile(HTML_TEMPLATE_PATH, data);
}

module.exports = {
    buildEmailHtmlContent
}
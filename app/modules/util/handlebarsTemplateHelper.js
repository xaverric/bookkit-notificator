const Handlebars = require('handlebars');
const fs = require('fs');
const {formatDateTime} = require("./date-helper");

/**
 * registration of the custom object to text formatter
 */
Handlebars.registerHelper('formatDate', date => {
  return formatDateTime(date);
});

/**
 * Receives template file path and data for the give template and returns compiled string result.
 * @param filePath
 * @param templateData
 * @returns {string}
 */
const compile = (filePath, templateData) => {
  const template = fs.readFileSync(filePath, "utf-8");
  const compiledTemplate = Handlebars.compile(template, { noEscape: true });
  return compiledTemplate(templateData).toString();
};

module.exports = {
  compile
};

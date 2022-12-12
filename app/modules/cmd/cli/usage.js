const commandLineUsage = require('command-line-usage');
const { cmdArgumentsDefinition } = require('./arguments.js');
const packageJson = require("../../../../package.json");

const usageDefinition = [
  {
    header: `bookkit-notificator @${packageJson.version}`,
    content: 'You never knew, you wanted this tool this bad.'
  },
  {
    header: 'Synopsis',
    content: '$bookkit-notificator <command> <command parameters>'
  },
  {
    header: 'Commands',
    content: [
      { name: 'help', summary: 'Display this help.' },
      { name: 'notify', summary: 'Performs whole magic.' },
      { name: 'version', summary: 'Show tool version.' }
    ]
  },
  {
    header: 'Parameters',
    optionList: cmdArgumentsDefinition
  }
];

const usage = commandLineUsage(usageDefinition);

module.exports = {
  usage
};

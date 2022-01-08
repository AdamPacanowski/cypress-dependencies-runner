export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('basicIntegrationFile', {
    prompts: [{
      type: 'input',
      name: 'id',
      message: 'id'
    }, {
      type: 'input',
      name: 'fullPath',
      message: 'fullPath'
    }, {
      type: 'input',
      name: 'json',
      message: 'json'
    }],
    actions: [{
      type: 'add',
      force: true,
      path: 'plopedScenarios/{{fullPath}}.js',
      templateFile: 'baseIntegrationFile.hbs'
    }]
  });
}

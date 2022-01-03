export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
    plop.setGenerator('basicGraphExampleData', {
        prompts: [{
            type: 'input',
            name: 'cwd',
            message: 'cwd'
        }],
        actions: [{
            type: 'add',
            force: true,
            path: 'graph/basicGraphExampleData.ploped.ts',
            templateFile: 'graph/TEMPLATE_basicGraphExampleData.hbs'
        }]
    });
    plop.setGenerator('basicResults', {
        prompts: [{
            type: 'input',
            name: 'cwd',
            message: 'cwd'
        }, {
            type: 'input',
            name: 'simpleReversedCwd',
            message: 'simpleReversedCwd'
        }],
        actions: [{
            type: 'add',
            force: true,
            path: 'cli/basicResults.ploped.json',
            templateFile: 'cli/TEMPLATE_basicResults.hbs'
        }]
    });
};


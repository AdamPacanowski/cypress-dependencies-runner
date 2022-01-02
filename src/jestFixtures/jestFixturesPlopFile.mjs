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
};


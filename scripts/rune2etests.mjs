import { fork, execSync, exec } from 'child_process';
import { join } from 'path';
import { cwd } from 'process';

const testServerWorkingDirectory = join(cwd(), '..', 'testserver');
const testWorkingDirectory = join(cwd(), '..', 'tests');
const generalDirectory = join(cwd(), '..');

console.log('Test server - npm install', testServerWorkingDirectory);
const npmInstallResult = execSync('npm install', {
  cwd: testServerWorkingDirectory
});
console.log(npmInstallResult.toString());


console.log('Src - npm install', generalDirectory);
const npmInstallGeneralResult = execSync('npm install', {
  cwd: generalDirectory
});
console.log(npmInstallGeneralResult.toString());

console.log('Src - Build', generalDirectory);
const buildResult = execSync('npm run build', {
  cwd: generalDirectory
});
console.log(buildResult.toString());


const serverProcess = fork('./index.js', [], {
  cwd: testServerWorkingDirectory
});

try {
  serverProcess.on('message', (message) => {
    if (message.started) {
      console.log('Test - npm install', testWorkingDirectory);
  
      execSync('npm install', {
        cwd: testWorkingDirectory
      });
  
      console.log('Run test...');
  
      const testProcess = exec('npm test', {
        cwd: testWorkingDirectory
      });
  
      testProcess.stdout.on('data', function (data) {   process.stdout.write(data.toString());  });
      testProcess.stderr.on('data', function (data) {   process.stdout.write(data.toString());  });
      testProcess.on('close', () => {
        process.exit(0);
      })
    }
  }); 
}
catch(e) {
  console.error(e);
}

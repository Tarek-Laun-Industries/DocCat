import { Command } from "commander"
import inquirer from "inquirer";

// New Project Command
const newCommand = new Command('new');
newCommand
    .description('Create a new Doc Cat project')
    .option('-n, --name <name>', 'Name of the project', '')
    .option('-d, --directory <directory>', 'Directory to create the project in', '')
    .action(async (options) => {
        console.log('Creating a new Doc Cat project...');
        // Step 1: Get the options
        let name = options.name;
        let directory = options.directory;

        if (!name) {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter the name of your project:',
                    default: 'my-doc-cat-project'
                }
            ]);
            name = answers.name;
        }

        if (!directory) {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'directory',
                    message: 'Enter the directory to create the project in:',
                    default: process.cwd()
                }
            ]);
            directory = answers.directory;
        }

        // Step 2: Generate package.json

        // Step 3: Add packages

        // Step 4: Create folder structure

        // Step 5: Create config file


    });

export { newCommand };
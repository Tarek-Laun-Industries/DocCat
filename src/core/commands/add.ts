import { Command } from "commander"
import inquirer from "inquirer";
import { Generator, Language } from "../../generator/generator.js";

enum FileType {
    Page = 'Page',
    Component = 'Component',
    Layout = 'Layout',
    BlogPost = 'Blog Post',
    Documentation = 'Documentation',
}

// New Project Command
const addCommand = new Command('add');
addCommand
    .description('Create a new Doc Cat project')
    .option('-t, --type <type>', 'Type of the File', '')
    .action(async (options) => {
        console.log('Creating a new Doc Cat project...');
        // Step 1: Get the options
        let type = options.type;

        if (!type) {
            const answers = await inquirer.prompt([
                {
                    type: 'select',
                    name: 'type',
                    message: 'Select the type of file to create:',
                    choices: Object.values(FileType),
                }
            ]);
            type = answers.type;
        }

        switch (type) {
            case FileType.Page:
                const pageAnswers = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'route',
                        message: 'Enter the route for the page (e.g., about or legal/imprint):',
                    },
                    {
                        type: 'select',
                        name: 'language',
                        message: 'Select the language for the page:',
                        choices: Object.values(Language),
                    }
                ]);

                Generator.getInstance().generatePage(process.cwd(), pageAnswers.route, pageAnswers.language);
                console.log(`Creating a new page at route ${pageAnswers.route} with language ${pageAnswers.language}...`);
                break;
            default:
                console.log('Invalid type selected. Please choose a valid type.');
                return;
        }

        console.log(`Creating a new ${type}...`);

        // Step 2: Generate package.json

        // Step 3: Add packages

        // Step 4: Create folder structure

        // Step 5: Create config file


    });

export { addCommand };
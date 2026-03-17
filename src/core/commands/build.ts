import { Command } from "commander"
import inquirer from "inquirer";
import fs from "fs";
import * as builder from "../../builder/builder.js";
import { buildTailwind } from "../../builder/tailwind.js";
import { resolvePath } from "../../utils.js";

// New Project Command
const buildCommand = new Command('build');
buildCommand
    .description('Build the Doc Cat project')
    .option('-o, --output <dir>', 'Output directory for the built', './build/')
    .option('-i, --input <dir>', 'Input directory for the source files', './')
    .action(async (options) => {
        console.log('Building the Doc Cat project...');
        // Step 1: Get the options
        let output = resolvePath(options.output);
        let inputPath = resolvePath(options.input);

        // Load Config
        if (!fs.existsSync(inputPath + "doccat.config.json")) {
            console.error('Error: doccat.config.json not found.');
            return;
        }

        // Create output directory if it doesn't exist
        if (!fs.existsSync(output)) {
            fs.mkdirSync(output, { recursive: true });
        }else {
            fs.rmSync(output, { recursive: true, force: true });
            fs.mkdirSync(output, { recursive: true });
        }

        // Copy Assets to output directory
        if (fs.existsSync(inputPath + "assets/")) {
            fs.cpSync(inputPath + "assets/", output + "assets/", { recursive: true });
        }

        // Build Tailwind CSS if needed
        await buildTailwind(inputPath, output);

        // Build the Pages in the src directory.
        if (!await fs.existsSync(inputPath + "src/")) {
            console.error('Error: src directory not found.');
            return;
        }

        builder.buildPages(inputPath + "src/", output, '');

    });

export { buildCommand };
#!/usr/bin/env tsx
import { Command } from 'commander';
import { newCommand } from './commands/new.js';
import { buildCommand } from './commands/build.js';

const program = new Command();

program
    .name('Doc Cat CLI')
    .version('0.0.1')
    .description('A CLI tool for Doc Cat');

program.addCommand(newCommand);
program.addCommand(buildCommand);

// Commands we Need.
// - new: Create a new Doc Cat project
// - add: Add a new document to the project
// - build: Build the Doc Cat project
// - dev: Start the development server

program.parse(process.argv);
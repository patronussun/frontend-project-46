#!/usr/bin/env node
import { Command } from 'commander';
import compare from '../src/parse.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(compare(filepath1, filepath2));
  });

program.parse();

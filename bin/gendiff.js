#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1');

program.command('gendiff')
  .description('Compares two configuration files and shows a difference')

program.parse();
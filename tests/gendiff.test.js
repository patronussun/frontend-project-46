import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (file) => path.join(__dirname, '..', '__fixtures__', file);
const readFile = (file) => readFileSync(getFixturePath(file), 'utf-8');

test('Diff JSON files', () => {
  const current = genDiff(getFixturePath('treeFile1.json'), getFixturePath('treeFile2.json'));
  const expected = readFile('expected-result.txt');
  expect(current).toEqual(expected);
});

test('Diff YAML files', () => {
  const current = genDiff(getFixturePath('treeFile1.yaml'), getFixturePath('treeFile2.yml'));
  const expected = readFile('expected-result.txt');
  expect(current).toEqual(expected);
});

test('Diff YAML and JSON files', () => {
  const current = genDiff(getFixturePath('treeFile1.json'), getFixturePath('treeFile2.yml'));
  const expected = readFile('expected-result.txt');
  expect(current).toEqual(expected);
});

test('FLAT FILES', () => {
  const current = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = readFile('expected-result-flat.txt');
  expect(current).toEqual(expected);
});

import genDiff from '../src/parse.js';

const jsonFilepath1 = '__fixtures__/file1.json';
const jsonFilepath2 = '__fixtures__/file2.json';
const ymlFilepath1 = '__fixtures__/file1.yaml';
const ymlFilepath2 = '__fixtures__/file2.yml';

const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const jsonCurrentResult = genDiff(jsonFilepath1, jsonFilepath2);
test('diff berween json files', () => {
  expect(jsonCurrentResult).toMatch(expectedResult);
});

const ymlCurrentResult = genDiff(ymlFilepath1, ymlFilepath2);
test('diff berween yml files', () => {
  expect(ymlCurrentResult).toMatch(expectedResult);
});

const jsonAndYmlCurrentResult = genDiff(jsonFilepath1, ymlFilepath2);
test('diff berween json & yml files', () => {
  expect(jsonAndYmlCurrentResult).toMatch(expectedResult);
});

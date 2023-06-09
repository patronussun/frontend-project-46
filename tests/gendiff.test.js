import genDiff from '../src/parse.js';

const filepath1 = '__fixtures__/file1.json';
const filepath2 = '__fixtures__/file2.json';
const currentResult = genDiff(filepath1, filepath2);
const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('diff berween json files', () => {
  expect(currentResult).toMatch(expectedResult);
});

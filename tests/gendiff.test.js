import genDiff from '../src/parse.js';

const jsonFilepath1 = '__fixtures__/treeFile1.json';
const jsonFilepath2 = '__fixtures__/treeFile2.json';
const ymlFilepath1 = '__fixtures__/treeFile1.yaml';
const ymlFilepath2 = '__fixtures__/treeFile2.yml';

const expectedResult = `{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
      setting6: {
          doge: {
            - wow: 
            + wow: so much
          }
          key: value
        + ops: vops
      }
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
- group2: {
      abc: 12345
      deep: {
          id: 45
      }
  }
+ group3: {
      deep: {
          id: {
              number: 45
          }
      }
      fee: 100500
  }
}`;

const jsonCurrentResult = genDiff(jsonFilepath1, jsonFilepath2);
test('diff berween json files', () => {
  expect(jsonCurrentResult).toMatch(expectedResult);
});

const expectedFLATResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const jsonFilepath11 = '__fixtures__/file1.json';
const jsonFilepath22 = '__fixtures__/file2.json';
const ymlCurrentResult = genDiff(jsonFilepath11, jsonFilepath22);
test('FLAT FILES', () => {
  expect(ymlCurrentResult).toMatch(expectedFLATResult);
});

// const jsonAndYmlCurrentResult = genDiff(jsonFilepath1, ymlFilepath2);
// test('diff berween json & yml files', () => {
//   expect(jsonAndYmlCurrentResult).toMatch(expectedResult);
// });

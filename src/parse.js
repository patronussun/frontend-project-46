import { readFileSync } from 'fs';
import _ from 'lodash';

// const parseFile = (filepath) => {
//   const rawData = readFileSync(filepath);
//   const object = JSON.parse(rawData);
//   return object;
// };

const parseFile = (filepath) => {
  const rawData = readFileSync(filepath);
  const object = JSON.parse(rawData);
  return object;
};

const compare = () => {
  const result = [];
  const object1 = parseFile('__fixtures__/file1.json');
  const object2 = parseFile('__fixtures__/file2.json');
  const sortedKeys1 = _.sortBy(Object.keys(object1));
  const sortedKeys2 = _.sortBy(Object.keys(object2));

  for (const key of sortedKeys1) {
    if (sortedKeys2.includes(key)) {
      if (object1.key === object2.key) {
        result.push(`  ${key}: ${object1.key}`);
      }
      if (object1.key !== object2.key) {
        result.push(`- ${key}: ${object1.key}`);
        result.push(`+ ${key}: ${object2.key}`);
      }
    }
    else if (!sortedKeys2.includes(key)) {
      result.push(`- ${key}: ${object1.key}`);
    }
  }

  for (const key of sortedKeys2) {
    if (!sortedKeys1.includes(key)) {
      result.push(`+ ${key}: ${object2.key}`);
    }
  }
  console.log(result);
};

compare();
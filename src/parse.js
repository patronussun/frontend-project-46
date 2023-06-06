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
  console.log('object1', object1);
  const object2 = parseFile('__fixtures__/file2.json');
  console.log('object2', object2);
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  sortedKeys.forEach((key) => {
    if (keys1.includes(key) && keys2.includes(key) && object1[key] === object2[key]) {
      return console.log(`  ${key}: ${object1[key]}`);
    }

    if (!keys2.includes(key)) {
      console.log(`- ${key}: ${object1[key]}`);
    }

    if (!keys1.includes(key)) {
      console.log(`+ ${key}: ${object2[key]}`);
    }

    if (keys1.includes(key) && keys2.includes(key) && object1[key] !== object2[key]) {
      console.log(`- ${key}: ${object1[key]}`);
      console.log(`+ ${key}: ${object2[key]}`);
    }
  });

  console.log(result.join('\n'));
};

compare();

import { readFileSync } from 'fs';
import _ from 'lodash';

const parseFile = (filepath) => {
  const rawData = readFileSync(filepath);
  const object = JSON.parse(rawData);
  return object;
};

const compare = () => {
  const result = ['{'];
  const object1 = parseFile('__fixtures__/file1.json');
  const object2 = parseFile('__fixtures__/file2.json');
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  sortedKeys.forEach((key) => {
    if (keys1.includes(key) && keys2.includes(key) && object1[key] === object2[key]) {
      result.push(`  ${key}: ${object1[key]}`);
    }

    if (!keys2.includes(key)) {
      result.push(`- ${key}: ${object1[key]}`);
    }

    if (!keys1.includes(key)) {
      result.push(`+ ${key}: ${object2[key]}`);
    }

    if (keys1.includes(key) && keys2.includes(key) && object1[key] !== object2[key]) {
      result.push(`- ${key}: ${object1[key]}`);
      result.push(`+ ${key}: ${object2[key]}`);
    }
  });
  result.push('}');
  return result.join('\n');
};

export default compare;

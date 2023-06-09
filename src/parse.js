import { readFileSync } from 'fs';
import _ from 'lodash';

const parseFile = (filepath) => {
  const rawData = readFileSync(filepath);
  const object = JSON.parse(rawData);
  return object;
};

const compare = (filepath1, filepath2) => {
  const result = [];
  const object1 = parseFile(filepath1);
  const object2 = parseFile(filepath2);
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  sortedKeys.forEach((key) => {
    if (keys1.includes(key) && keys2.includes(key) && object1[key] === object2[key]) {
      result.push({ key, value: object1[key], type: 'old' });
    }

    if (!keys2.includes(key)) {
      result.push({ key, value: object1[key], type: 'removed' });
    }

    if (!keys1.includes(key)) {
      result.push({ key, value: object2[key], type: 'added' });
    }

    if (keys1.includes(key) && keys2.includes(key) && object1[key] !== object2[key]) {
      result.push({ key, value: object1[key], type: 'removed' });
      result.push({ key, value: object2[key], type: 'added' });
    }
  });

  return result;
};

const joinResult = (coll) => {
  const result = coll.map((elem) => {
    switch (elem.type) {
      case 'removed':
        return ` - ${elem.key}: ${elem.value}`;
      case 'added':
        return ` + ${elem.key}: ${elem.value}`;
      default:
        return `   ${elem.key}: ${elem.value}`;
    }
  });

  return `{\n${result.join('\n')}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const coll = compare(filepath1, filepath2);
  const result = joinResult(coll);
  return result;
};

export default genDiff;

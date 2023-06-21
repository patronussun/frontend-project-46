import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

import stylish from './stylish.js';

const [changedVal, notChangedVal, addVal, deletedVal, nested] = ['changedVal', 'notChangedVal', 'addVal', 'deleted', 'nested'];

export const parseFile = (filepath) => {
  const current = process.cwd();
  const rawData = readFileSync(path.resolve(current, filepath));
  const type = path.extname(filepath).toLowerCase();

  switch (type) {
    case '.json':
      return JSON.parse(rawData);
    case '.yml':
      return yaml.load(rawData);
    case '.yaml':
      return yaml.load(rawData);

    default:
      throw new Error(`Format ${type} is not defined`);
  }
};

export const compare = (object1, object2, format = stylish) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const compareFiles = sortedKeys.reduce((result, key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return result.concat({ key, value: compare(value1, value2), type: nested });
    }
    if (keys1.includes(key) && keys2.includes(key)) {
      if (value1 === value2) {
        return result.concat({ key, value: value1, type: notChangedVal });
      }
      return result.concat({ key, value: [value1, value2], type: changedVal });
    }

    if (!keys2.includes(key)) {
      return result.concat({ key, value: value1, type: deletedVal });
    }

    if (!keys1.includes(key)) {
      return result.concat({ key, value: object2[key], type: addVal });
    }
    return format(result);
  }, []);
  return compareFiles;
};

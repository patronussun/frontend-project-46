import { readFileSync } from 'fs';
import _ from 'lodash';

const parseFile = (filepath) => {
  const rawData = readFileSync(filepath);
  const object = JSON.parse(rawData);
  return object;
};

const compare = (filepath1, filepath2) => {
  const sortedObject1 = _.sortBy(parseFile(filepath1));
  const sortedObject2 = _.sortBy(parseFile(filepath2));
}

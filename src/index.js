import stylish from './stylish.js';
import { parseFile, compare } from './parse.js';

const genDiff = (filepath1, filepath2, formater = 'stylish') => {
  const object1 = parseFile(filepath1);
  const object2 = parseFile(filepath2);
  const result = compare(object1, object2);

  if (formater === 'stylish') {
    return stylish(result);
  }
  return genDiff;
};

export default genDiff;

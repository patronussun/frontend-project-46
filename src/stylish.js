import _ from 'lodash';

const [changedVal, notChangedVal, addVal, deletedVal, nested] = ['changedVal', 'notChangedVal', 'addVal', 'deleted', 'nested'];

const indentSpecial = (depth) => {
  const replacer = ' ';
  const spaceToEachDepth = 4;
  const shiftTotheLeft = 2;
  const indent = replacer.repeat(depth * spaceToEachDepth - shiftTotheLeft);
  return indent;
};

const indentSimple = (depth) => {
  const replacer = ' ';
  const spaceToEachDepth = 4;
  const indent = replacer.repeat(depth * spaceToEachDepth);
  return indent;
};

const stringify = (val, dep) => {
  const iter = (item, depth) => {
    if (!_.isObject(item)) {
      return item;
    }
    const entries = Object.entries(item);
    const objectToString = entries.map((eachVal) => {
      const [key, value] = eachVal;
      return `${indentSimple(depth + 1)}${key}: ${iter(value, depth + 1)}\n`;
    });
    const joinResult = objectToString.join('');
    return `{\n${joinResult}${indentSimple(depth)}}`;
  };
  return iter(val, dep);
};

const stylish = (tree) => {
  const iter = (data, depth) => {
    const valToStr = data.map((element) => {
      const elKey = element.key;
      const elValue = element.value;
      const elType = element.type;

      const elData1 = elValue[0];
      const elData2 = elValue[1];

      switch (elType) {
        case addVal:
          return (`${indentSpecial(depth)}+ ${elKey}: ${stringify(elValue, depth)}`);
        case deletedVal:
          return (`${indentSpecial(depth)}- ${elKey}: ${stringify(elValue, depth)}`);
        case changedVal:
          return ([`${indentSpecial(depth)}${[`- ${elKey}: ${stringify(elData1, depth)}`]}\n${[`${indentSpecial(depth)}+ ${elKey}: ${stringify(elData2, depth)}`]}`]);
        case notChangedVal:
          return (`${indentSpecial(depth)}  ${elKey}: ${stringify(elValue, depth)}`);
        case nested:
          return (`${indentSpecial(depth)}  ${elKey}: ${iter(elValue, depth + 1)}`);
        default:
          throw new Error(`Type ${elType} is not defined`);
      }
    });
    const result = valToStr.join('\n');
    return `{\n${result}\n${indentSimple(depth - 1)}}`;
  };
  return iter(tree, 1);
};

export default stylish;

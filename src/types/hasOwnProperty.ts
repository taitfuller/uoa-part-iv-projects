// eslint-disable-next-line @typescript-eslint/ban-types
const hasOwnProperty = <X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> => {
  // eslint-disable-next-line no-prototype-builtins
  return obj.hasOwnProperty(prop);
};

export default hasOwnProperty;

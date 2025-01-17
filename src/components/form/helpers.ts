export const numRegex = /^[0-9]+$/;

export const INITIAL_STATE = {
  name: "",
  value: "",
  description: "",
};

export const getValue = (
  name: string,
  value: string,
  prevValue: string | number
) => {
  const isValueField = name === "value";

  if ((numRegex.test(value) || !value.length) && isValueField) {
    return value;
  }
  if (isValueField && !numRegex.test(value)) return prevValue;

  return value
};

export const isValuesCountEqualsKeysCount = <T extends object>(obj: T) =>
  Object.values(obj).filter((val) => Boolean(val?.toString())).length !==
  Object.keys(obj).length;


export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      
      return v.toString(16);
  });
}

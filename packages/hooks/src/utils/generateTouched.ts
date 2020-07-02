import { FieldValues } from '../types/FieldValues';
import { FieldTouched } from '../types/FieldTouched';

export const generateTouched = (values: FieldValues) => {
  const touchedArr = Object.keys(values).map(key => [key, false]);
  const touched = Object.fromEntries(touchedArr);

  return touched as FieldTouched;
};

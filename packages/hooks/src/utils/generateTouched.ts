import { FieldTouched } from '../types/FieldTouched';

export function generateTouched<Values>(values: Values) {
  const touchedArr = Object.keys(values).map(key => [key, false]);
  const touched = Object.fromEntries(touchedArr);

  return touched as FieldTouched<Values>;
}

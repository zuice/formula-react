import { ChangeEvent, FocusEvent } from 'react';

import { FieldValues } from '../types/FieldValues';
import { Props } from '../types/Props';

export function generateProps<Values>(
  values: FieldValues,
  handleChange: (key: string, value: string) => void,
  handleBlur: (key: string, event: FocusEvent<HTMLInputElement>) => void,
): Props<Values> {
  const propsArr = Object.keys(values).map(key => [
    [key],
    {
      id: key,
      name: key,
      value: values[key],
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        handleChange(key, event.target.value),
      onBlur: (event: FocusEvent<HTMLInputElement>) => handleBlur(key, event),
    },
  ]);
  const props = Object.fromEntries(propsArr) as Props<Values>;

  return props;
}

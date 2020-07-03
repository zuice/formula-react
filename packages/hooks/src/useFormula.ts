import { useState, FocusEvent } from 'react';

import { FieldValues } from './types/FieldValues';
import { Schema } from './types/Schema';
import { FieldTouched } from './types/FieldTouched';
import { generateTouched } from './utils/generateTouched';
import { generateProps } from './utils/generateProps';

export function useFormula<Values extends FieldValues = FieldValues>(
  initialValues: Values,
): Schema<Values> {
  const [values, setValues] = useState<Values>(initialValues);
  const [touched, setTouched] = useState<FieldTouched<Values>>(
    generateTouched<Values>(values),
  );

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };
  const handleBlur = (key: string, _: FocusEvent<HTMLInputElement>) => {
    setTouched({ [key]: true } as FieldTouched<Values>);
  };

  const props = generateProps<Values>(values, handleChange, handleBlur);

  return { values, touched, props };
}

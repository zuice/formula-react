import { useState, FocusEvent } from 'react';

import { FieldValues } from './types/FieldValues';
import { Schema } from './types/Schema';
import { Touched } from './types/Touched';
import { generateTouched } from './utils/generateTouched';
import { generateProps } from './utils/generateProps';
import { Config } from './types/Config';
import { Invalid } from './types/Invalid';

export function useFormula<Values extends FieldValues = FieldValues>(
  config: Config<Values>,
): Schema<Values> {
  const [values, setValues] = useState<Values>(config.initialValues);
  const [touched, setTouched] = useState<Touched<Values>>(
    generateTouched<Values>(values),
  );
  const [errors, setErrors] = useState<Invalid<Values>>();

  const handleChange = (key: string, value: string) => {
    const valid = config.onValidate && config.onValidate(values);

    setErrors(valid);
    setValues({ ...values, [key]: value });
  };
  const handleBlur = (key: string, _: FocusEvent<HTMLInputElement>) => {
    const valid = config.onValidate && config.onValidate(values);

    setErrors(valid);
    setTouched({ [key]: true } as Touched<Values>);
  };

  const props = generateProps<Values>(values, handleChange, handleBlur);

  return { values, touched, props, errors };
}

import { Invalid } from './Invalid';

export interface Config<Values> {
  initialValues: Values;
  onValidate?: (values: Values) => Invalid<Values> | undefined;
  onSubmit?: () => void;
}

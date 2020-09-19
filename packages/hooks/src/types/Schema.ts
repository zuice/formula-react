import { Invalid } from './Invalid';
import { Props } from './Props';
import { Touched } from './Touched';

export interface Schema<Values> {
  props: Props<Values>;
  values: Values;
  touched: Touched<Values>;
  errors?: Invalid<Values>;
}

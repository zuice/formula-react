import { SchemaProps } from './SchemaProps';
import { FieldTouched } from './FieldTouched';

export interface Schema<Values> {
  props: SchemaProps<Values>;
  values: Values;
  touched: FieldTouched<Values>;
}

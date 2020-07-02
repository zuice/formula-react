import { SchemaProps } from './SchemaProps';
import { FieldTouched } from './FieldTouched';
import { FieldValues } from './FieldValues';

export interface Schema {
  props: SchemaProps;
  values: FieldValues;
  touched: FieldTouched;
}

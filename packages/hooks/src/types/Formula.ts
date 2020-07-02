import { Schema } from './Schema';

export interface Formula<V> {
  handleSubmit: (values: V) => void;
  props: Schema;
}

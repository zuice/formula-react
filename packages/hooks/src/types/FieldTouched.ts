export type FieldTouched<Values> = {
  [K in keyof Values]: boolean;
};

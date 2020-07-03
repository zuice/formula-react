export type Touched<Values> = {
  [K in keyof Values]: boolean;
};

export type Invalid<Values> = {
  [K in keyof Values]: string;
};

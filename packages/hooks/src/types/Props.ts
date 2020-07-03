import { ChangeEvent, FocusEvent } from 'react';

export type Props<Values> = {
  [K in keyof Values]: {
    id: K;
    name: K;
    value: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  };
};

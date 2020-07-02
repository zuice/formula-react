import { ChangeEvent, FocusEvent } from 'react';

export interface SchemaProps {
  [key: string]: {
    id: string;
    name: string;
    value: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  };
}

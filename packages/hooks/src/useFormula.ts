import { useState } from 'react';

export const useFormula = () => {
  const [count, setCount] = useState(0);

  const increment = (x: number) => setCount(x + 1);

  return { count, increment };
};

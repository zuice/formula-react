import { renderHook, act } from '@testing-library/react-hooks';

import { useFormula } from './useFormula';

test('increment should raise the count by 1', () => {
  const { result } = renderHook(() => useFormula());

  act(() => {
    result.current.increment(0);
  });

  expect(result.current.count).toBe(1);
});

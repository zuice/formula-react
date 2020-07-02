import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent } from '@testing-library/react';

import { useFormula } from './useFormula';

// implementation:
// const Form = () => {
//   const { handleSubmit, props } = useFormula({ email: '', password: '' });

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="email">Email</label>
//       <input {...props.email} placeholder="Enter your email" />
//       <label htmlFor="password">Password</label>
//       <input {...props.password} placeholder="Enter your password" />
//     </form>
//   );
// };

test('returns an api to use for a form', () => {
  const { result } = renderHook(() => useFormula({ email: '', password: '' }));
  const { current } = result;
  const onChange = expect.any(Function);
  const onBlur = expect.any(Function);

  expect(current).toMatchObject({
    props: {
      email: {
        id: 'email',
        name: 'email',
        value: '',
        onChange,
        onBlur,
      },
      password: {
        id: 'password',
        name: 'password',
        value: '',
        onChange,
        onBlur,
      },
    },
    values: { email: '', password: '' },
    touched: { email: false, password: false },
  });
});

test('triggers onChange in the hook', async () => {
  const Component = () => {
    const { props } = useFormula({ email: '' });

    return <input {...props.email} data-testid="email" />;
  };
  const { getByTestId, findByTestId } = render(<Component />);
  const emailInput = getByTestId('email');

  fireEvent.change(emailInput, { target: { value: 'me@me.com' } });
  fireEvent.blur(emailInput);

  const emailInputUpdated = (await findByTestId('email')) as HTMLInputElement;

  expect(emailInputUpdated.value).toBe('me@me.com');
});

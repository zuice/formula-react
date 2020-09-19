import React, { ChangeEvent, FocusEvent } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';

import { useFormula } from './useFormula';

test('returns an api to use for a form', () => {
  const { result } = renderHook(() =>
    useFormula({ initialValues: { email: '', password: '' } }),
  );
  const { current } = result;
  const onChange = expect.any(Function);
  const onBlur = expect.any(Function);

  expect(current).toMatchObject({
    props: {
      email: {
        onChange,
        onBlur,
        id: 'email',
        name: 'email',
        value: '',
      },
      password: {
        onChange,
        onBlur,
        id: 'password',
        name: 'password',
        value: '',
      },
    },
    values: { email: '', password: '' },
    touched: { email: false, password: false },
  });
});

test('triggers onChange in the hook', async () => {
  const Component = () => {
    const { props } = useFormula({ initialValues: { email: '' } });

    return <input {...props.email} data-testid="email" />;
  };
  const { getByTestId, findByTestId } = render(<Component />);
  const emailInput = getByTestId('email');

  userEvent.type(emailInput, 'me@me.com');

  const emailInputUpdated = (await findByTestId('email')) as HTMLInputElement;

  expect(emailInputUpdated.value).toBe('me@me.com');
});

test('updates touched values after input is edited', () => {
  const { result } = renderHook(() =>
    useFormula({ initialValues: { email: '' } }),
  );
  const event = { target: { value: 'me@me.com' } };

  act(() => {
    result.current.props.email.onChange(event as ChangeEvent<HTMLInputElement>);
    result.current.props.email.onBlur({} as FocusEvent<HTMLInputElement>);
  });

  expect(result.current.touched.email).toBe(true);
});

test('should validate each field on change', () => {
  const onValidate = jest.fn();
  const { result } = renderHook(() =>
    useFormula({ onValidate, initialValues: { email: '' } }),
  );
  const event = { target: { value: 'me@me.com' } };

  act(() => {
    result.current.props.email.onChange(event as ChangeEvent<HTMLInputElement>);
    result.current.props.email.onBlur({} as FocusEvent<HTMLInputElement>);
  });

  expect(onValidate).toHaveBeenCalledTimes(2);
});

test('validation should send errors in the return of the hook', () => {
  const onValidate = (values: { email: string }) => {
    if (values.email !== 'me@me.com') {
      return { email: 'The email is incorrect.' };
    }

    return undefined;
  };
  const { result } = renderHook(() =>
    useFormula({ onValidate, initialValues: { email: '' } }),
  );
  const event = { target: { value: 'abcd@me.com' } };

  act(() => {
    result.current.props.email.onChange(event as ChangeEvent<HTMLInputElement>);
  });

  expect(result.current.errors!.email).toBe('The email is incorrect.');
});

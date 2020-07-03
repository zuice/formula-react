import { generateProps } from './generateProps';

test('generates correct props based on inputs', () => {
  const onChange = expect.any(Function);
  const onBlur = expect.any(Function);

  const output = generateProps({ email: '' }, onChange, onBlur);

  expect(output).toMatchObject({
    email: {
      onChange,
      onBlur,
      id: 'email',
      name: 'email',
      value: '',
    },
  });
});

import { generateTouched } from './generateTouched';

test('generates correct touched properties', () => {
  const output = generateTouched({ email: '' });

  expect(output).toMatchObject({ email: false });
});

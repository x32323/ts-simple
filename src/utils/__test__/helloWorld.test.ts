import helloWorld from '../helloWorld';

test('helloWorld', () => {
  expect(helloWorld()).toBe('Hello World!');
});
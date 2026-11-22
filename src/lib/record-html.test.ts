import { expect, test } from 'vitest'
import { recordFromHtml } from './record-html'

test('reads escaped record data without executing markup or truncating historical prose', () => {
  const record = { id: 'example', sources: [], biography: 'A < B; </script> is text; 引号“内容”' }
  const json = JSON.stringify(record).replace(/</g, '\\u003c')
  expect(
    recordFromHtml(
      `<html><script id="reading-record" type="application/json">${json}</script><article>正文</article></html>`,
    ),
  ).toEqual(record)
  expect(() => recordFromHtml('<html>404</html>')).toThrow('Reading data is missing')
})

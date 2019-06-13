export function currencyFormater(value: string, format = 'CSV', zone = 1) {
  /**
   * | 中文名 | 货币代码 | 货币符号 |
   * | ----- | ------- | ------- |
   * | 美元   | USD     | $       |
   * | 元     | CNY     | ¥      |
   * | 日元   | JPY     | 円      |
   *
   * 名词所有格用法时
   * - 中文显示`${数额}${中文名}`
   * - 其他语言显示`${数额}${货币代码}` 注：暂时指英文
   *
   * 动宾结构用法时
   * - 中文显示`${货币符号}${数额}`
   * - 其他语言显示`${货币代码}${货币符号}${数额}` 注：暂时指英文
   */
  const zoneMap = {
    1: { symbol: '¥', code: 'CNY', name: '元' },
    2: { symbol: '$', code: 'USD', name: '美元' },
  }
  const o = {
    V: parseFloat(value).toLocaleString(),
    S: zoneMap[zone].symbol,
    N: zoneMap[zone].name,
    C: zoneMap[zone].code,
  }
  let ret = format
  Reflect.ownKeys(o).forEach(p => (ret = ret.replace(p as string, o[p])))
  return ret
}

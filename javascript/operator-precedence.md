## Operator precedence

- 结合性决定拥有相同优先级的运算符的执行顺序
- 运算符返回结果？
- 赋值运算符的返回结果为赋值运算符右边的值

| 优先级 | 运算类型           | 结合性   | 运算符                                   |
| ------ | ------------------ | -------- | ---------------------------------------- |
| 20     | 圆括号             | n/a      | ( ... )                                  |
| 19     | 成员访问           | 从左到右 | ... . ...                                |
|        | 需要计算的成员访问 | 从左到右 | ... [ ... ]                              |
|        | new(带参数列表)    | n/a      | new ... ( ... )                          |
|        | 函数调用           | 从左到右 | ... ( ... )                              |
| 18     | new(无参数列表)    | 从右到左 | new ...                                  |
| 17     | 后置递增           | n/a      | ... ++                                   |
|        | 后置递减           | n/a      | ... --                                   |
| 16     | 逻辑非             | 从右到左 | ! ...                                    |
|        | 按位非             | 从右到左 | ~ ...                                    |
|        | 一元加法           | 从右到左 | + ...                                    |
|        | 一元减法           | 从右到左 | - ...                                    |
|        | 前置递增           | 从右到左 | ++ ...                                   |
|        | 前置递减           | 从右到左 | -- ...                                   |
|        | typeof             | 从右到左 | typeof ...                               |
|        | void               | 从右到左 | void ...                                 |
|        | delete             | 从右到左 | delete ...                               |
| 15     | 幂                 | 从右到左 | ... \*\* ...                             |
| 14     | 乘法               | 从左到右 | ... \* ...                               |
|        | 除法               | 从左到右 | ... / ...                                |
|        | 取模               | 从左到右 | ... % ...                                |
| 13     | 加法               | 从左到右 | ... + ...                                |
|        | 减法               | 从左到右 | ... - ...                                |
| 12     | 按位左移           | 从左到右 | ... << ...                               |
|        | 按位右移           | 从左到右 | ... >> ...                               |
|        | 无符号右移         | 从左到右 | ... >>> ...                              |
| 11     | 小于               | 从左到右 | ... < ...                                |
|        | 小于等于           | 从左到右 | ... <= ...                               |
|        | 大于               | 从左到右 | ... > ...                                |
|        | 大于等于           | 从左到右 | ... >= ...                               |
|        | in                 | 从左到右 | ... in ...                               |
|        | instanceof         | 从左到右 | ... instanceof ...                       |
| 10     | 等号               | 从左到右 | ... == ...                               |
|        | 非等号             | 从左到右 | ... != ...                               |
|        | 全等号             | 从左到右 | ... === ...                              |
|        | 非全等号           | 从左到右 | ... !== ...                              |
| 9      | 按位与             | 从左到右 | ... & ...                                |
| 8      | 按位异或           | 从左到右 | ... ^ ...                                |
| 7      | 按位或             | 从左到右 | ... \| ...                               |
| 6      | 逻辑与             | 从左到右 | ... && ...                               |
| 5      | 逻辑或             | 从左到右 | ... \|\| ...                             |
| 4      | 条件运算符         | 从右到左 | ... ? ... : ...                          |
| 3      | 赋值               | 从右到左 | =/+=/-=/\*=//=/%=/<<=/>>=/>>>=/&=/^=/\|= |
| 2      | yield              | 从右到左 | yield ...                                |
|        | yield\*            | 从右到左 | yield\* ...                              |
| 1      | 展开运算符         | n/a      | . . . ...                                |
| 0      | 逗号               | 从左到右 | ... , ...                                |

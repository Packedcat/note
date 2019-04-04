## Advanced features

### Slices

* `L[0:3]`表示，从索引0开始取，直到索引3为止，但不包括索引3
* 如果第一个索引是0则可以省略
* 使用负数取倒数的元素，最后一个元素的索引为-1
* 第三个参数位为间隔，不写任何参数为负值参数
* tuple也可用切片操作，返回结果仍为tuple
* 字符串也可用切片操作，返回结果认为字符串

### Iteration

* 使用`for...in`迭代对象，只要是可迭代对象都可以迭代
* 默认dict对象迭代key，使用`for value in d.values()`迭代value
* 使用`for k, v in d.items()`同时迭代key与value
* 使用`isinstance('abc', Iterable)`判断对象能否迭代
* 使用`enumerate`函数把一个list变成索引-元素对

```python
for i, value in enumerate(['A', 'B', 'C']):
    print(i, value)

>>> 0 A
>>> 1 B
>>> 2 C
```

### List generation

* 生成元素在前，循环体在后面，循环体后面可加if语句`[x * x for x in range(1, 11) if x % 2 == 0]`
* 可使用多层嵌套`[m + n for m in 'ABC' for n in 'XYZ']`
* 循环体可迭代多个变量`[k + '=' + v for k, v in d.items()]`

### Generator

* 使用括号替换列表生成式的方括号
* 使用`next()`获取生成器的下一个返回值
* 使用`for...in`迭代生成器对象
* 函数return语句替换成yield语句成为生成器
* 捕获`StopIteration`错误，拿到生成器的返回值

### Iterator

* 可以被`next()`函数调用并不断返回下一个值的对象称为迭代器：`Iterator`
* 生成器都是迭代器，可迭代对象不一定是迭代器
* ​凡是可作用于`for`循环的对象都是`Iterable`类型

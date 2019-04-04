## 编码问题

### 历史

#### ASCII

- 使用八 bit 位定义 128 个字符，最高位为零
- 96 个文字以及 32 个控制符号

#### EASCII(ISO/8859-1)

- 继承 CP437 字符编码由 160 开始定义
- 众多 ASCII 扩展字符集之间互不兼容

#### GB2312

- 收录 6763 个汉字，兼容 ASCII
- 不兼容繁体字

#### GBK

- 英文字符使用一个字节表示，中文用两个字节表示
- 收录 27484 个汉字，兼容 GB2312

#### Unicode

- UCS-2 与 UCS-4 两种格式，最高位为 0
- 只规定如何编码，并没有规定如何传输与保存
- UTF-8 与 UTF-16 为其实现方式

#### UTF-8

- 变长的字符编码
- 对于多字节（n 个字节）的字符，第一个字节的前 n 为都设为 1
- 第 n+1 位设为 0，后面字节的前两位都设为 10

### Python 编码

#### 默认编码

- `sys.getdefaultencoding()`输出`'ascii'`
- 使用`# coding=utf-8`或`# -*- coding: utf-8 -*-`支持非 ASCII 编码

#### str 与 unicode 对象

- `str`与`unicode`都是`basestring`的之类，为不同类型的字符串对象

```python
# 从str类型转换到Unicode
# s.decode(编码) =====> <type 'str'>到<type 'unicode'>
# 从Unicode转换到str
# u.encode(编码) =====> <type 'unicode'>到<type 'str'>
>>> c = b.encode('utf-8')
>>> type(c)
<type 'str'>
>>> c
'\xe5\xa5\xbd'

>>> d = c.decode('utf-8')
>>> type(d)
<type 'unicode'>
>>> d
u'\u597d'
# str(s)等于s.encode('ascii')
# unicode(s)等效与s.decode('ascii')
# str类型的unicode字符串
s.decode('unicode-escape')
```

### 其他

程序读到内存中仍是 Unicode 编码，保存与读取时再使用规定的编码方式解码

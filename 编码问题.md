## 编码问题

### 历史

#### ASCII

* 使用八bit位定义128个字符，最高位为零
* 96个文字以及32个控制符号

#### EASCII(ISO/8859-1)

* 继承CP437字符编码由160开始定义
* 众多ASCII扩展字符集之间互不兼容

#### GB2312

* 收录6763个汉字，兼容ASCII
* 不兼容繁体字

#### GBK

* 英文字符使用一个字节表示，中文用两个字节表示
* 收录27484个汉字，兼容GB2312

#### Unicode

* UCS-2与UCS-4两种格式，最高位为0
* 只规定如何编码，并没有规定如何传输与保存
* UTF-8与UTF-16为其实现方式

#### UTF-8

* 变长的字符编码
* 对于多字节（n个字节）的字符，第一个字节的前n为都设为1
* 第n+1位设为0，后面字节的前两位都设为10

### Python编码

#### 默认编码

* `sys.getdefaultencoding()`输出`'ascii'`
* 使用`# coding=utf-8`或`# -*- coding: utf-8 -*-`支持非ASCII编码

####  str与unicode对象

* `str`与`unicode`都是`basestring`的之类，为不同类型的字符串对象

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

程序读到内存中仍是Unicode编码，保存与读取时再使用规定的编码方式解码
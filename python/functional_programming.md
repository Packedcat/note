## Functional Programming

### 高阶函数

* 变量可指向函数`f = abs`
* 函数名也是变量`abs = 10`

#### map/reduce

* map把函数作用在list的每一个函数返回生成器
* reduce把函数返回结果与序列的下一个元素做累计运算

#### filter

* filter把函数作用于每个元素根据返回值保留或丢弃元素
* 返回生成器

#### sorted

* 接受key关键字的函数定义排序
* 接受reverse关键字决定结果是否反向

### 返回函数

* 定义函数作为结果值返回
* 返回时内部函数保存外部函数的参数与局部变量
* 返回函数不要引用任何环境变量或者后续会发生变化的变量
* 若要引用循环变量则再创建一个函数并使用参数绑定循环变量的当前值

### 匿名函数

* 冒号前为参数返回值为冒号后表达式的结果
* 作为函数对象可以复制给变量
* 能作为返回值返回

### 装饰器

* 装饰器就是一个返回函数的高阶函数

```python
import functools
def log(text = 'call'):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args,**kw):
            print('%s.%s' % (text,func.__name__))
            func(*args,**kw)
            print('end,%s' % func.__name__)
            return
        return wrapper
    return decorator
```

### 偏函数

* `functools.partial`固定某些参数的默认值并返回新的函数
* 调用时仍可以重新修改默认值

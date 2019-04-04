## WTF of Python

### dict in list

```python
handle = {'a': 1, 'b': 2}
l = []
l.append(handle)
other_handle = {'b': 2, 'a': 1}
if other_handle in l:
    print 'yes'
else:
    print 'no'
>>> 'yes'
```

### tuple as key

```python
dictObj = {}
dictObj[(1, 2)] = 'value'
print dictObj[(1, 2)]
>>> 'value'
```

### list dimension change

```python
src = [1, 2, 3, 4, 5, 6, [7, 8], 9]
dst = []
interval = 3
for x in range(0, len(src), interval):
	dst.append(src[x:x + interval])
print dst
>>> [[1, 2, 3], [4, 5, 6], [[7, 8], 9]]
```

### Conditional Expressions

```python
1 if True else 0
>>> 1

1 if False else 0
>>> 0

True and 1 or 0
>>> 1

False and 1 or 0
>>> 0

True and '' or 'Water'
>>> 'Water'
```

### Iteration multi value

```python
for x, y, z in [[1, 2, 3], [4, 5, 6]]:
    print(x, y, z)
>>> (1, 2, 3) (4, 5, 6)
```

### Destructuring assignment

```python
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        print(b)
        a, b = b, a + b
        n = n + 1
    return 'done'
# a, b = b, a + b
# equal >>>
# t = (b, a + b)
# a = t[0]
# b = t[1]
fib(6)
>>> 1 1 2 3 5 8
```

### List Iterator

```python
r = (x for x in range(10))
list(r)
>>> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### Global Varable

```python
GLOBAL_VARIABLE = 0

def set_globvar_to_one():
    global GLOBAL_VARIABLE # 修改变量时需要重新全局声明
    GLOBAL_VARIABLE = 1

def print_globvar():
    print(GLOBAL_VARIABLE) # 只读不需要重新全局声明

set_globvar_to_one()
print_globvar() # Prints 1
```

### Initialize List

```python
multi_list = [[0 for col in range(3)] for row in range(3)]
>>> [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
single_list = [None] * 5
>>> [None, None, None, None, None,]
```

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

>>>yse
```

### tuple as key

```python
dictObj = {}
dictObj[(1, 2)] = 'value'
print dictObj[(1, 2)]

>>>value
```

### list dimension change

```python
src = [1, 2, 3, 4, 5, 6, [7, 8], 9]
dst = []
interval = 3
for x in range(0, len(src), interval):
	dst.append(src[x:x + interval])
print dst

>>>[[1, 2, 3], [4, 5, 6], [[7, 8], 9]]
```
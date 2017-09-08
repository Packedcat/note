## 特性与属性

### 特性（Attribute）

* attribute由HTML定义，所有出现在HTML标签内的描述节点都是attribute
* attribute的类型总是字符串类型

```javascript
<div id="test" class="button" custom-attr="1"></div>
document.getElementById('test').attributes;
// return: [custom-attr="hello", class="button", id="test"]
```

### 属性（Property）

* property属于DOM对象，DOM实质为JavaScript中的对象
* 非自定义的attribute与property有1:1映射关系
* class的property对应为className，因为class是关键字
* 非自定义的property(attribute)改变的时候，对应的attribute(property)在多数情况下会改变
* 对应的property改变的时候，attribute的value属性不会改变
* 获取布尔类型的attribute会返回字符串类型

```javascript
<input id="search" value="foo" />
var input = document.getElementById('search');
input.value = 'foo2';
input.getAttribute('value'); // return string: "foo"
```


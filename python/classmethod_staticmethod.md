## @classmethod 与 @staticmethod

### Class Method

* 类似`c++`的重写用于从不同形式的参数实例化对象
* 接收的第一个参数为类本身
* from_other_struct

### Static Method

* 跟类有关系的功能但在运行时又不需要实例`ins`和类`self`参与
* 如更改环境变量或者修改其他类的属性等
* 虽然可以直接用函数解决但会扩散类内部的代码造成维护困难
* （其实就是为了能用类名调用但又不需要`self`）

### Link

[参考链接](https://stackoverflow.com/questions/12179271)
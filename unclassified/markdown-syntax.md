![Foo](https://zh.wikipedia.org/static/images/project-logos/zhwiki.png)  
###换行

在文本中输入的换行会从最终生成的结果中删除，浏览器会根据可用空间自动换行。如果想强迫换行，可以在行尾插入至少两个空格

###强调
_强调_ 或者 _强调_ (示例：斜体)

**加重强调** 或者 **加重强调**

又或者以制表符或至少四个空格缩进的行，例如：

    第一行代码
    第二行代码
    第三行代码

###无序列表

- 无序列表
- 无序列表
- 无序列表

###有序列表

1. 有序列表
2. 有序列表
3. 有序列表

###标题 #一级标题

##二级标题

###三级标题

####四级标题

#####五级标题

######六级标题

###引用

> 这一整段的内容都会作为一个 HTML 的引用元素。引用元素是会自动优化排版的（reflowable，可回流）。你可以任意地将引用的内容包含进来，然后所有这些都会被解析成为单独一个引用元素。

###链接
[Markdown](http://zh.wikipedia.com/wiki/Markdown)

###水平分区线

---

###代码段
`code`

```
(function($){
	$.fn.extend({
		"myScroll":function(value){
			$(this).niceScroll({
				cursorcolor:"#8d8d8d",
				cursoropacitymax:1,
				touchbehavior:false,
				cursorwidth:"10px",
				cursorborder:"0",
				cursorborderradius:"999px",
				horizrailenabled : false
			});
		}
	});
})(jQuery);
```

###表格
| Tables | Are | Cool |
| ------------- | :-----------: | ----: |
| col 3 is | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes | are neat | $1 |
| zebra stripes |   are neat    |    $1 |

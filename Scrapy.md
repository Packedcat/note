## Scrapy

### Spiders

#### 爬取周期

1. 开始的URLs（可以是`start_requests()`方法或者`start_urls`属性）指定回调函数
2. 在回调函数中解析相应体返回`Item`对象、`Requset`对象或者可迭代对象
3. 使用`Selectors`解析响应体获取结构化数据
4. 存储数据到数据库（如果有对应的`Item Pipeline`）或者写进文件

#### scrapy.Spider类

> name

唯一标识

> allowed_domains

允许的域名

> start_urls

当没有指定开始url时使用这个列表中的元素开始爬取

> custom_settings

使用一个`dict`对象重写`settings`中的配置

> crawler

不明

> settings

配置爬虫运行的设置的一个实例

> logger

向日志中记录信息

> from_crawler(crawler, \*args, \*\*kwargs)

使用`Scrapy`创建爬虫

不明

> start_requests()

必须返回一个可迭代的请求列表，安全起见将其定义为生成器

> parse(response)

下载完响应后默认调用的函数

> log(message\[, level, component\])

包装日子信息的方法

> closed(reason)

当爬虫关闭时被调用
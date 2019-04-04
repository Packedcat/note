### 与缓存相关的 HTTP 首部

##### 通用缓存首部

|     首部      |                     描述                     |
| :-----------: | :------------------------------------------: |
| Cache-Control |            用于随报文传中缓存指示            |
|    Pragma     | 另一种随报文传送指示的方式，但并不专用于缓存 |

##### 条件请求首部

|        首部         |                           描述                           |
| :-----------------: | :------------------------------------------------------: |
|      If-Match       |  如果实体标记与文档当前的实体标记相匹配，就获取这份文档  |
|  If-Modified-Since  | 除非在某个指定的日期之后资源被修改过，否则就限制这个请求 |
|    If-None-Match    | 如果提供的实体标记与当前文档的实体标记不相符，就获取文档 |
| If-Unmodified-Since | 除非在某个指定日期之后资源没有被修改过，否则限制这个请求 |

##### 实体缓存首部

|     首部      |                          描述                          |
| :-----------: | :----------------------------------------------------: |
|     ETag      |              与此实体相关的实体的实体标记              |
|    Expires    | 实体不再有效，要从原始的源端再次获取此实体的日期和时间 |
| Last-Modified |           这个实体最后一次被修改的日期和时间           |

注：

1. 从技术角度来看，Pragma 是一种请求首部，优先试用 Cache-Control 代替其控制缓存策略、
2. 实体标记本质上为某个特定资源版本的标识符
3. 优先级从高到低分别是  Pragma > Cache-Control > Expires

### 用户行为

##### 输入 URL 访问

若存在资源且未过期则返回 `200 OK (from [memory | disk] cache)`，否则从服务器重新获取资源

##### 刷行行为

- 刷新按钮/右键重新加载按钮
- `F5` or `command + r`
- `location.reload()`

添加以下 Headers

```http
Cache-Control: max-age=0
If-Modified-Since: [资源的Last-Modified头部]
If-None-Match: [资源的ETag头部] # 当资源的 Response 携带 ETag 时
```

##### 强制刷新行为

- 勾选 Network 面板 Disable cache 复选框
- `ctrl + F5` or `command + shift + r`

添加以下 Headers 并移除 `If-Modified-Since/If-None-Match` Headers

```http
Cache-Control: no-cache
Pragma: no-cache
```

### 请求一个资源的流程

![img](http://7tszky.com1.z0.glb.clouddn.com/Fsg_VB_TZqx8Gih88h3rKm_G-gWq)

##### 启发式缓存策略

在没有提供任何浏览器缓存过期策略的情况下，浏览器遵循一个启发式缓存过期策略：

根据响应头中 Date 与 Last-Modified 首部之间差值的 10%作为缓存时间

> HTTP/1.1 Cache-Control Header is present: private
> HTTP Last-Modified Header is present: Tue, 08 Nov 2016 06:59:00 GMT
> No explicit HTTP Cache Lifetime information was provided.
> Heuristic expiration policies suggest defaulting to: 10% of the delta between Last-Modified and Date.
> That's '05:15:02' so this response will heuristically expire 2016/11/11 0:46:01.

### Reference

[HTTP 缓存控制小结](http://imweb.io/topic/5795dcb6fb312541492eda8c)
[启发式缓存过期策略](https://mp.weixin.qq.com/s/qOMO0LIdA47j3RjhbCWUEQ?ref=myread)

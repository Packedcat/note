### Concept

> Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。

> 同源策略没有禁止脚本的执行，而是禁止读取 HTTP 回复

### XSS 分类

##### 存储型 XSS

攻击者提交数据注入恶意代码到数据库，服务器拼接带有恶意代码的 HTML，用户浏览器执行后触发

##### 反射型 XSS

攻击者构造带有恶意代码的 URL 诱导用户访问，服务器处理时将 URL 参数中恶意代码拼接到 HTML 中返回，用户浏览器执行后触发

##### DOM 型 XSS

类似反射型 XSS，区别在于取出和执行恶意代码由浏览器端 JavaScript 完成

### XSS 攻击预防

- 渲染前转义
- 纯前端渲染
- 避免执行或渲染拼接文本

##### 缺口

- `eval()`、`setTimeout()`、`setInterval()` 等能把字符串作为代码运行的 API
- 拼接 DOM 中的内联事件监听器
- `<a>` 标签的 `href` 属性，`location.href`
- `innerHTML`、`outerHTML`、`document.write()`

### 安全举措

- HTTP-only Cookie
- Same-Site Cookies
- [内容安全策略( CSP )](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)
- ...

### XSS 检测

- 使用通用 XSS 攻击字符串手动检测 XSS 漏洞
  - [Unleashing an Ultimate XSS Polyglot](https://github.com/0xsobky/HackVault/wiki/Unleashing-an-Ultimate-XSS-Polyglot)
- 使用扫描工具自动检测 XSS 漏洞
  - [Arachni](https://github.com/Arachni/arachni)
  - [Mozilla HTTP Observatory](https://github.com/mozilla/http-observatory/)
  - [w3af](https://github.com/andresriancho/w3af)

### Reference

[【技术分享】漫谈同源策略攻防](https://www.anquanke.com/post/id/86078)

[前端安全系列（一）：如何防止 XSS 攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)

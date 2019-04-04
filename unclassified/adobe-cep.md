## Adobe CEP(Adobe Common Extensibility Platform)

### window.cep

```javascript
encoding: Object; // 环境编码
fs: Object; // 文件操作
process: Object; // 进程查询
util: Object; // 浏览器打开&关闭回调&etc
```

### window.\_\_adobe_cep\_\_

```javascript
addEventListener; // 添加宿主的事件监听
autoThemeColorChange;
closeExtension;
dispatchEvent; // 分发事件
dumpInstallationInfo;
evalScript; // 执行 jsx 函数
getCurrentApiVersion;
getCurrentImsUserId;
getExtensionId; // 获取扩展 ID 注册事件监听时常用
getExtensions;
getHostCapabilities;
getHostEnvironment;
getNetworkPreferences;
getScaleFactor;
getSystemPath; // 常用参数有 SystemPath.EXTENSION: 扩展路径，用于拼接
imsConnect;
imsDisconnect;
imsFetchAccessToken;
imsFetchAccounts;
imsSetProxyCredentials;
initResourceBundle;
invokeAsync;
invokeSync;
registerInvalidCertificateCallback;
registerKeyEventsInterest;
removeEventListener; // 移除宿主事件监听
requestOpenExtension;
resizeContent;
setScaleFactorChangedHandler;
showAAM;
```

### CSInterface

实际是对`__adobe_cep__`的封装，处理对参数的校验以及数据传递等

#### evalScript(script, callback)

- **script** - `jsx` 脚本或自定义的 `.jsx` 文件中的函数
- **callback** - 带参数接收宿主函数执行后的返回值

## JSX

### \$

宿主对象，包含宿主版本、环境等信息等 (global,app,etc...)

通常使用 `$._ext` 扩自定义的 `jsx` 脚本

### 通过 JSON 传递对象

```javascript
// 为 JSX 手动加载 JSON 对象
loadJSX('json2.js');

// 执行的 JSX 脚本
function someScriptInJSX(info) {
  ...
  return JSON.stringify(result);
}

// evalScript 回调
function callback(result) {
  var o = JSON.parse(result); //　把 JSON 字符串转换为对象
  alert(o.someProp);  // 操作得到的对象
}
```

### 动态载入 **jsx** 文件

```javascript
// 不能在首加载的 JSX 文件中引用 $.fileName 拼装 JSX 脚本路径
function loadJSX(fileName) {
  var extensionRoot = `${cs.getSystemPath(SystemPath.EXTENSION)}/jsx/`;
  cs.evalScript(`$.evalFile('${extensionRoot}${fileName}')`);
}
```

## Event

**After Effect** 不支持 `standard events` 与 `specific Events`

### CEP event

#### 事件构造函数

```javascript
function CSEvent(type, scope, appId, extensionId) {
  this.type = type;
  this.scope = scope;
  this.appId = appId;
  this.extensionId = extensionId;
}
```

#### 事件监听

```javascript
var cs = new CSInterface();
cs.addEventListener("com.adobe.cep.test", function(event) {
  var obj = event.data;
});
```

#### 分发事件

```javascript
var cs = new CSInterface();
var event = new CSEvent(); // 创建一个事件对象
event.type = "com.vivue.event.test"; // 设定一个类型名称
event.scope = "APPLICATION"; // 限定在宿主应用范围内
event.data = "message"; // 事件要传递的信息
cs.dispatchEvent(event); // 发送事件
```

### CSX event

```javascript
try {
  var loadSuccess = new ExternalObject("lib:PlugPlugExternalObject");
} catch (e) {
  alert(e);
}

if (loadSuccess) {
  var eventJAX = new CSXSEvent(); // 创建事件对象
  eventJAX.type = "com.vivue.event.test"; // 设定一个类型名称
  eventJAX.data = " (⋟﹏⋞) !!!"; // 事件要传递的信息
  eventJAX.dispatch(); // 发送事件
}
```

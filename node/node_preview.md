### Node.js究竟是什么

一个 “编码就绪” 服务器

### Node 旨在解决什么问题？

Node 公开宣称的目标是 “旨在提供一种简单的构建可伸缩网络程序的方法”。

Web 应用程序架构（包括流量、处理器速度和内存速度）中的瓶颈是：服务器能够处理的并发连接的最大数量。

Node 解决这个问题的方法是：更改连接到服务器的方式。

### Node 肯定不是什么？

Node 是一个服务器程序。

基础 Node 产品不是 Apache 或 Tomcat 这种服务器 “安装就绪型” 服务器产品，支持立即部署应用程序。

### Node 如何工作？

Node 本身运行 V8 JavaScript。

JavaScript 引擎负责解释并执行代码。

### 事件驱动编程

JavaScript 是一种很棒的事件驱动编程语言，因为它允许使用匿名函数和闭包。

### 示例 Node 应用程序

```javascript
// these modules need to be imported in order to use them.
// Node has several modules.  They are like any #include
// or import statement in other languages
var http = require("http");
var url = require("url");
 
// The most important line in any Node file.  This function
// does the actual process of creating the server.  Technically,
// Node tells the underlying operating system that whenever a
// connection is made, this particular callback function should be
// executed.  Since we're creating a web service with REST API,
// we want an HTTP server, which requires the http variable
// we created in the lines above.
// Finally, you can see that the callback method receives a 'request'
// and 'response' object automatically.  This should be familiar
// to any PHP or Java programmer.
http.createServer(function(request, response) {
 
     // The response needs to handle all the headers, and the return codes
     // These types of things are handled automatically in server programs
     // like Apache and Tomcat, but Node requires everything to be done yourself
     response.writeHead(200, {"Content-Type": "text/plain"});
 
     // Here is some unique-looking code.  This is how Node retrives
     // parameters passed in from client requests.  The url module
     // handles all these functions.  The parse function
     // deconstructs the URL, and places the query key-values in the
     // query object.  We can find the value for the "number" key
     // by referencing it directly - the beauty of JavaScript.
     var params = url.parse(request.url, true).query;
     var input = params.number;
 
     // These are the generic JavaScript methods that will create
     // our random number that gets passed back to the caller
     var numInput = new Number(input);
     var numOutput = new Number(Math.random() * numInput).toFixed(0);
      
     // Write the random number to response
     response.write(numOutput);
      
     // Node requires us to explicitly end this connection.  This is because
     // Node allows you to keep a connection open and pass data back and forth,
     // though that advanced topic isn't discussed in this article.
     response.end();
 
   // When we create the server, we have to explicitly connect the HTTP server to
   // a port.  Standard HTTP port is 80, so we'll connect it to that one.
}).listen(80);
 
// Output a String to the console once the server starts up, letting us know everything
// starts up correctly
console.log("Random Number Generator Running...");
```

### Node 对什么有好处？

Node 非常适合以下情况：在响应客户端之前，您预计可能有很高的流量，但所需的服务器端逻辑和处理不一定很多。Node 表现出众的典型示例包括：

* **RESTful API**

  提供 RESTful API 的 Web 服务接收几个参数，解析它们，组合一个响应，并返回一个响应（通常是较少的文本）给用户。

* **Twitter 队列**

  Node 能处理数万条入站 tweet。它能快速而又轻松地将它们写入一个内存排队机制（例如 memcached），另一个单独进程可以从那里将它们写入数据库。

* **电子游戏统计数据**

  采集游戏生成的数据，对数据进行最少的合并，然后对数据进行排队，以便将它们写入数据库。

### 太长不看版本

```
Node 是一个程序，能够完成 Apache 能够完成的所有任务（借助一些模块），而且，作为一个可以将其作为基础进行构建的可扩展 JavaScript 平台，Node 还能完成更多的任务。
它使用了 Google 的一个非常快速的 JavaScript 引擎，即 V8 引擎。它使用一个事件驱动设计来保持代码最小且易于阅读。
```


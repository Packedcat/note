## 使用 FRP 实现内网穿透

### FRP是什么

> frp 是一个专注于内网穿透的高性能的反向代理应用，支持 TCP、UDP、HTTP、HTTPS 等多种协议，且支持 P2P 通信。可以将内网服务以安全、便捷的方式通过具有公网 IP 节点的中转暴露到公网。

简单点讲就是通过具有公网 IP 的设备访问内网机器，本质是内网机器 frpc 主动访问 frps 建立 TCP（或 QUIC、KCP）连接并维持通道。该通道会用于传输控制与数据转发

### 搭建步骤

1. 配置公网服务器

```toml
bindPort = 7381
auth.token = "cB94eWeuRJb7xcqJfamAHgbviBIIDRqlTi9TkKBYcSyJ10Cs7LFxXIYq7qhix5KP"
```

启动服务

```shell
./frps -c ./frps.toml
```

2. 配置内网服务器

```toml
serverAddr = "target.public.ip.addr"
serverPort = 7381

[[proxies]]
name = "server_name"
type = "udp"
localIP = "127.0.0.1"
localPort = 34197
remotePort = 34197
```

启动服务

```shell
./frpc -c frpc.toml
```

3. 开放公网服务器 `34197/7381` 端口

### Q&A

##### frp 工作机制

```
用户 → frps(监听 34197 端口) → frpc → 内网服务(127.0.0.1:34197)
```

所以公网机器需要开放内网服务监听的端口（可以配置不同的端口）
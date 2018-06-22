## 部署

### CentOS 7

#### 常用命令

网络端口

```shell
# -a (all)显示所有选项，默认不显示LISTEN相关
# -t (tcp)仅显示tcp相关选项
# -u (udp)仅显示udp相关选项
# -n 拒绝显示别名，能显示数字的全部转化成数字。
# -l 仅列出有在 Listen (监听) 的服務状态

# -p 显示建立相关链接的程序名
# -r 显示路由信息，路由表
# -e 显示扩展信息，例如uid等
# -s 按各个协议进行统计
# -c 每隔一个固定时间，执行该netstat命令。

# 提示：LISTEN和LISTENING的状态只有用-a或者-l才能看到
netstat -ntlp
```

查看已经开放的端口

```SHELL
firewall-cmd --list-ports
```

开启端口

```shell
# –zone 作用域
# –add-port=80/tcp 添加端口，格式为：端口/通讯协议
# –permanent 永久生效，没有此参数重启后失效
firewall-cmd --zone=public --add-port=80/tcp --permanent
```

防火墙操作

```shell
firewall-cmd --reload # 重启firewall
systemctl stop firewalld.service # 停止firewall
systemctl disable firewalld.service # 禁止firewall开机启动
```

### SHH命令

#### 基本用法

使用用户名`user`登录远程主机`host`

```shell
$ ssh user@host
```

若本地用户名与云层用户名一致可省略用户名

```shell
$ ssh host
```

SSH默认端口为22，使用-p修改端口号

```shell
$ ssh -p 2222 user@host
```

#### 中间人攻击（Man-in-the-middle attack）

在公共wifi区域等处于用户与远程主机之间使用伪造的公钥获取用户的登录密码

#### 口令登录

* 在第一次登录远程主机的时候确认远程主机的公钥指纹
* 远程主机应在自己的网站公开自己的公钥指纹
* 接受公钥后会被保存至`$HOME/.ssh/known_hosts`之后便不再确认
* 通常存在`/etc/ssh/ssh_known_hosts`保存所有用户都可以信赖的远程和主机公钥

#### 公钥登录

用户将自己的公钥存储在远程服务器并在登录的时候用自己的私钥加密服务器发送的字符串

```shell
$ ssh-keygen
```

运行上面命令后在`$HOME/.ssh/`生成`id_rsa.pub`和`id_rsa`

使用下面命令传送公钥到远程主机上

```shell
$ ssh-copy-id user@host
```

取消`/etc/ssh/sshd_config`注释

```
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

重启远程主机的SSH服务

```shell
# ubuntu系统
service ssh restart
# debian系统
/etc/init.d/ssh restart
```

#### authorized_keys文件

公钥保存的过程

```shell
$ ssh user@host 'mkdir -p .ssh && cat >> .ssh/authorized_keys' < ~/.ssh/id_rsa.pub
```

1. 登录远程主机
2. 若.ssh目录不存在创建
3. 将本地公钥文件重定向追加到远程文件末尾

#### 远程操作

将`$HOME/src/`目录下面的所有文件，复制到远程主机的`$HOME/src/`目录

```shell
$ cd && tar czv src | ssh user@host 'tar xz'
```

将远程主机`$HOME/src/`目录下面的所有文件，复制到用户的当前目录

```shell
$ ssh user@host 'tar cz src' | tar xzv
```

查看远程主机是否运行进程httpd

```shell
$ ssh user@host 'ps ax | grep [h]ttpd'
```

#### 绑定本地端口

绑定8080端口的数据通过SSH向远程主机传送

```shell
$ ssh -D 8080 user@host
```

#### 本地端口转发

通过host3连通host1与host2（待理）

```shell
$ ssh -L 2121:host2:21 host3
```

#### 远程端口转发

host1监听它自己的2121端口，然后将所有数据经由host3，转发到host2的21端口（待理）

```shell
$ ssh -R 2121:host2:21 host1
```
#### SSH的其他参数

* N参数，表示只连接远程主机，不打开远程shell
* T参数，表示不为这个连接分配TTY
* f参数，表示SSH连接成功后，转入后台运行

```shell
# 这个SSH连接只用来传数据，不执行远程操作
$ ssh -NT -D 8080 host
# 在不中断SSH连接的情况下，在本地shell中执行其他操作
$ ssh -f -D 8080 host
```

### 禁用 root 登录

1. 添加用户并添加 **ssh-key**

```shell
# on server
passwd root
adduser kitsch
passwd kitsch

# on local
ssh-copy-id kitsch@[ip]
```

2. 修改配置 `/etc/ssh/sshd_config`

```shell
vi /etc/ssh/sshd_config

PasswordAuthentication no # 禁用密码登录
PermitRootLogin no        # 禁用 root 帐号登录
PubkeyAuthentication yes

# resart ssh serveice
service sshd restart
```

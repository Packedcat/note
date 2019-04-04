## Supervisor

### 安装

```shell
yum install python-setuptools
easy_install supervisor
# 创建配置文件
echo_supervisord_conf > /etc/supervisord.conf
# 修改配置文件
vim /etc/supervisord.conf
# 启动时指定配置文件
supervisord -c /etc/supervisord.conf
```

### 配置

- `command` 要执行的命令
- `priority` 优先级
- `numprocs` 启动几个进程
- `autostart` supervisor 启动的时候是否随着同时启动
- `autorestart` 当程序 over 的时候，program 是否自动重启
- `directory` 进程路径

#### 进程日志

```shell
redirect_stderr         = true
stdout_logfile_maxbytes = 50MB
stdout_logfile_backups  = 10
stdout_logfile          = /path/to/log/app.log
```

### ctl 命令

- `help` 查看命令帮助
- `status` 查看状态
- `stop XXX` 停止某一个进程
- `start XXX` 启动某个进程
- `restart XXX` 重启某个进程
- `reload` 载入最新的配置文件，停止原有进程并按新的配置启动、管理所有进程
- `update` 根据最新的配置文件，启动新配置或有改动的进程，配置没有改动的进程不会受影响而重启

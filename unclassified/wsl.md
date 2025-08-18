## WSL trivia

### 在 WSL2 中使用代理

修改 WSL 配置文件，配置文件在 `%USERPROFILE%\.wslconfig`

```
[wsl2]
networkingMode=mirrored
dnsTunneling=true
firewall=true
autoProxy=true
```

添加到环境变量设置中，例如 `~/.zshrc`

```shell
export hostip=$(cat /etc/resolv.conf |grep -oP '(?<=nameserver\ ).*')
export https_proxy="http://${hostip}:7890"
export http_proxy="http://${hostip}:7890"
```

### 在非 C 盘安装 WSL 分发版本

1. 查看 WSL 分发版本

```powershell
wsl -l --all -v
```

2. 导出分发版

```powershell
wsl --export Ubuntu-20.04 d:\wsl-ubuntu20.04.tar
```

3. 注销当前分发版

```powershell
wsl --unregister Ubuntu-20.04
```

4. 重新导入并安装 WSL

```powershell
wsl --import Ubuntu-20.04 d:\wsl-ubuntu20.04 d:\wsl-ubuntu20.04.tar --version 2
```
6. 删除 tar 文件

```powershell
del d:\wsl-ubuntu20.04.tar
```

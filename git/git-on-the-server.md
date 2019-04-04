## Deploy Git on the Server

- create user

```shell
useradd git
```

- assign a password

```shell
passwd git
```

- init a repertory

```shell
git init --bare test.git
```

- change owner

```shell
chown -R git:git test.git
```

- specify `git-shell` instead of bash for git login shell

```shell
cat /etc/shells   # see if `git-shell` is already in there.  If not...
which git-shell   # make sure git-shell is installed on your system.
sudo vim /etc/shells  # and add the path to git-shell from last command
sudo chsh git  # and enter the path to git-shell, usually: /usr/bin/git-shell
```

### Secure Server

1. Create the user, replacing `example_user` with your desired username, and assign a password:

```shell
useradd example_user && passwd example_user
```

2. Add the user to the `wheel` group for sudo privileges:

```shell
usermod -aG wheel example_user
```

3. Upload the public key to your server:

```shell
ssh-copy-id example_user@255.255.255.255
```

4. SSH daemon options:

```shell
PermitRootLogin no
PasswordAuthentication no
```

5. Restart the SSH service to load the new configuration.

```shell
sudo systemctl restart sshd
```

### Reference

[如何在 Linux 上搭建一个 Git 中央仓库](https://zhuanlan.zhihu.com/p/27267335)

[gitosis](https://github.com/res0nat0r/gitosis)

[How to Secure Your Server](https://www.linode.com/docs/security/securing-your-server/)

[Git on the Server - Setting Up the Server](https://git-scm.com/book/en/v2/Git-on-the-Server-Setting-Up-the-Server)

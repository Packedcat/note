## 使用 docker 部署 gitlab-ce

### 步骤

1. 拉取镜像

```shell
docker pull gitlab/gitlab-ce
```

2. 启动容器

```shell
docker run -d \
  --name gitlab \
  --restart always \
  --publish 8229:8229 \ # 容器内监听端口同映射端口，详见 reference
  --publish 8443:443 \
  --publish 2222:22 \
  --volume /volume1/docker/gitlab/config:/etc/gitlab \
  --volume /volume1/docker/gitlab/data:/var/opt/gitlab \
  --volume /volume1/docker/gitlab/logs:/var/log/gitlab \
  --env GITLAB_OMNIBUS_CONFIG="external_url 'http://<IP>:8229'; gitlab_rails['gitlab_shell_ssh_port']=2222;" \
  gitlab/gitlab-ce:latest
```

3. 获取/重置管理员密码

```shell
# 获取临时密码，24 小时后过期，可以通过命令行重置
docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password

# 1. 进入容器
docker exec -it gitlab bash
# 2. 进入 GitLab Rails 控制台：
gitlab-rails console
# 3. 重设 root 密码
user = User.find_by_username('root')
user.password = 'your_new_password'
user.password_confirmation = 'your_new_password'
user.save!
# 4. 退出控制台
exit
```

4. 启动 gitlab-runner 容器

```shell
docker run -d \
--name gitlab-runner \
--restart always \
-v /volume1/docker/gitlab-runner/config:/etc/gitlab-runner \
-v /var/run/docker.sock:/var/run/docker.sock \ # 调用宿主 docker
gitlab/gitlab-runner:latest
```

### Reference

[Expose GitLab on different ports](https://docs.gitlab.com/install/docker/configuration/#expose-gitlab-on-different-ports)

https://docs.gitlab.com/runner/install/docker/
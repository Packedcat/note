## Git Hooks

### post-receive

```shell
#!/bin/sh
TAR_DIR='/opt/rendering-task-front-end'

# 将推送内容 checkout 到指定目录
GIT_WORK_TREE=${TAR_DIR}/code git checkout -f
sudo ${TAR_DIR}/deploy.sh
```

### deploy script

```shell
#!/bin/sh

WORK_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
LINK_NAME='task-front-end'
RES='\033[0m'

NEW_DIR=`date '+%Y_%m_%d_%H_%M_%S'`
mkdir ${WORK_DIR}/${NEW_DIR}

cd ${WORK_DIR}/code
echo -e "\033[1;32m install packages... ${RES}"
yarn install
echo -e "\033[1;36m install packages done ${RES}"
echo -e "\033[1;32m building code... ${RES}"
yarn build
echo -e "\033[1;36m building code done ${RES}"

cp -a ${WORK_DIR}/code/dist ${WORK_DIR}/${NEW_DIR}
rm -r ${WORK_DIR}/${LINK_DIR}
ln -s ${WORK_DIR}/${NEW_DIR} ${WORK_DIR}/${LINK_DIR}

echo -e "\033[1;32m deploy finish ${RES}"
```

### something else

```shell
# 赋权
sudo chown root:root /path/to/deploy.sh
sudo chmod 700 /path/to/deploy.sh
```

modify `/etc/sudoers` or `$ sudo visudo`

```shell
# 允许部署脚本无密码执行
production  ALL=(ALL) NOPASSWD: /path/to/deploy.sh
# 允许 git 用户使用 tty
Defaults:git !requiretty
```

### usage

```shell
# 添加远程分支
git remote add auto-deploy git@10.60.196.244.0.0.40:/home/git/git/auto-deploy

# 自动部署到测试机
git push auto-deploy local-feature:master
```

### Reference

[Customizing Git - Git Hooks](https://git-scm.com/book/gr/v2/Customizing-Git-Git-Hooks)

[Git Hooks](http://githooks.com/)

[Deploying Websites With a Tiny Git Hook](http://ryanflorence.com/deploying-websites-with-a-tiny-git-hook/)

[How To Use Git Hooks To Automate Development and Deployment Tasks](https://www.digitalocean.com/community/tutorials/how-to-use-git-hooks-to-automate-development-and-deployment-tasks)

[Using Git to manage a web site](http://toroid.org/git-website-howto)

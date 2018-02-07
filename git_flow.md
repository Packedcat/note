## Git Flow

### Git branching model

#### feature

```bash
# 新建本地特性分支
git checkout develop
git pull origin develop
git checkout -b [feature-name] develop
 
# 在分支上开发
git add ***
git commit -m '***'
 
# 在分支开发过程中合并develop分支到本分支
git checkout develop
git pull origin develop
git checkout [feature-name]
git merge develop
 
# 继续开发或解决冲突
git add ***
git commit -m '***'
 
# 特性分支开发完成
git checkout develop
git pull origin develop
git merge --no-ff [feature-name]
 
# 如果没有冲突，就推送到远程
git push origin develop

# 如果有冲突，则解决冲突，再commit，并推送到远程
git add ***
git commit -m '***'
git push origin develop
```

#### release

```bash
# 新建本地发布分支
git checkout develop
git checkout -b release/[0.0.0] develop

# 修复 bug
git add ***
git commit -m '***'

# 特性分支完成
git checkout master
git merge --no-ff release/[0.0.0]
git tag -a [0.0.0]
git checkout develop
git merge --no-ff release/[0.0.0]
```

#### hotfix

```bash
# 新建修复分支
git checkout -b hotfix/[0.0.0] master

# 修复 bug
git add ***
git commit -m '***'

# 修复分支完成
git checkout master
git merge --no-ff hotfix/[0.0.0]
git tag -a [0.0.0]
git checkout develop
git merge --no-ff hotfix-1.2.1
```

### git-flow command

```shell
# 初始化仓库
git flow init

# 新建特性分支
git flow feature start [feature-name]

# 特性分支完成
git flow feature finish [feature-name]

# 新建本地发布分支
git flow release start [0.0.0]

# 发布分支完成
git flow release finish [0.0.0]

# 新建修复分支
git flow hotfix start [0.0.0]

# 修复分支完成
git flow hotfix finish [0.0.0]
```

### Reference

- [Git Protocol](https://github.com/thoughtbot/guides/tree/master/protocol/git)
- [git-flow](https://github.com/nvie/gitflow)
- [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
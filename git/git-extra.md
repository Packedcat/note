## Git extra

### Trivia

```shell
# commit 命令参数
-a 自动添加暂存区已跟踪文件
-m 将提交信息与命令放在同一行

# tag 命令参数
-a 指定标签为附注标签
-m 指定存储在标签中的信息

# 添加远程仓库并指定名字
git remote add origin git@github.com:[user-name]/[repository-name].git

# 设置 upstream 并推送
git push --set-upstream origin master

# 推送标签
git push --tags

# 指定远程仓库推送标签
git push [reomte-name] --tags

# 强制更新远端分支至本地
git fetch --all
git reset --hard origin/[branch_name]

# 修剪本地分支（删除远端已删除的分支）
git fetch -p
git remote update origin --prune

# 清空或修改文件提交
git checkout -- .
```

### Rewrite history

修改最后一次提交

```shell
git commit --amend
# 修改提交作者
git commit --amend --author="NewAuthor <NewEmail@address.com>"
```

修改多个提交信息

```shell
# 不可涉及已经推送至服务器的提交，会造成两个版本
git rebase -i HEAD~[n]

# pick -> edit
git commit --amend
git rebase --continue
```

压缩提交

```shell
# squash 将该 commit 并入前一 commit
git rebase -i HEAD~[n]

# pick -> squash
# rewrite commit
```

### Version fallback

```shell
# 获取记录索引
git reflog

# 撤销提交
git revert head@{n}

git revert HEAD

# 继续执行 revert 操作若有冲突
git revert --continue

# 还原提交
git reset commitHash | head~{num}
```

### Repair record

```shell
# 删除已 merge 的分支
git branch -d [branch_name]

# 删除未 merge 的分支
git branch -D [branch_name]

# 使用 rebase 合并分支(提交呈线性)
git rebase [target_branch_name]

# 使用 merge 合并分支
git merge [target_branch_name]
```

> Git 会自行负责分支的管理，所以当我们删除一个分支时，Git 只是删除了指向相关提交的指针，但该提交对象依然会留在版本库中。

使用下面命令恢复已知某提交哈希值的分支

```shell
git branch [new_branch_name] [hash]
```

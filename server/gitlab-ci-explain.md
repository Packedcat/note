## Gitlab CI/CD 扫盲

### 构建设置分类

1. 阶段 (Stages)
   - 定义流水线的执行顺序
   - 同阶段的 Job 并行执行
   - 不同阶段顺序执行
2. 作业 (Jobs)

每个 Job 包含以下关键元素：

```yaml
job-name:
  stage: test         # 所属阶段
  script:             # 执行的核心脚本
    - echo "Running tests"
    - pytest
  image: python:3.9   # 使用的 Docker 镜像
  tags:               # 指定 Runner 标签
    - docker
    - linux
  rules:              # 执行规则
    - if: '$CI_MERGE_REQUEST_ID'
  artifacts:          # 构建产物
    paths:
      - test-reports/
    when: on_failure  # 仅在失败时保存
  needs:              # 依赖关系
    - compile-job
```

3. 变量 (Variables)

```yaml
variables:            # 全局变量
  DATABASE_URL: "postgres://user:pass@db"
  ENVIRONMENT: "staging"

job:
  variables:          # 作业级变量
    DEBUG: "true"
```


4. 缓存与产物

```yaml
cache:                # 加速后续构建
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/

artifacts:            # 传递构建结果
  paths:
    - dist/
    - reports/
  expire_in: 3 days   # 过期时间
```


5. 执行控制

```yaml
only:                 # 传统触发条件
  - main
  - /^release-.*$/

except:
  - tags

rules:                # 更灵活的规则
  - if: '$CI_COMMIT_BRANCH == "main"'
    when: on_success
  - if: '$CI_COMMIT_TAG'
    when: never
  - when: manual       # 手动触发
```


6. 环境与部署

```yaml
deploy-job:
  environment:        # 环境配置
    name: production
    url: https://prod.example.com
  script:
    - ./deploy.sh
```


7. 特殊功能

```yaml
retry: 2              # 失败重试
timeout: 30m          # 超时设置
interruptible: true   # 允许被新流水线中断
trigger:              # 触发下游流水线
  project: my/deploy
  strategy: depend
```

### Q&A

##### 同一 pipeline 不同 job 间共享内容

TBC

##### environment 与 variables 区别

TBC

##### variables 与仓库 CI/CD Variables 中的的区别

TBC

### MSIC

##### 缓存优化

```yaml
cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/
```

##### 缓存加速

```yaml
# 不清理部份文件
variables:
  GIT_CLEAN_FLAGS: -fdx -e node_modules
# 跳过重复安装
job:
  script:
    - if [ ! -d "node_modules" ]; then npm install; fi
```

##### 安全实践

- 敏感数据使用 **CI/CD Variables**（项目设置 > CI/CD）
- 禁止在脚本中硬编码密码

##### 调试技巧

```yaml
debug-job:
  script:
    - env | sort  # 查看所有环境变量
```

##### 容器部署免密登录

```yaml
# SSH_PRIVATE_KEY 私钥通过 CI/CD Variables 提供
before_script:
  - mkdir -p ~/.ssh
  - echo "$SSH_PRIVATE_KEY" | tr -d '\r' > ~/.ssh/id_rsa
  - chmod 600 ~/.ssh/id_rsa
  - ssh-keyscan -H $DEPLOY_HOST >> ~/.ssh/known_hosts
```

##### 安装临时工具

```yaml
before_script:
  - 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )'
```


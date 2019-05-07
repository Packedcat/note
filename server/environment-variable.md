## Environment variable in Node

###常量分类

- 应用常量（application-specific constant）
  - `MAX_LENGTH = 100`
  - etc.
- 环境常量（environment-specific constant）
  - `DB_HOST = localhost`
  - etc...

### 经典开发流程

- development(local machine)
  - host: 172.16.xxx.xxx
  - db: localhost
  - pwd: 123456
- staging(staging server)
  - host: 10.60.xxx.xxx
  - db: dbstage
  - pwd: xxxxxx
- production(production cluster)
  - host: xxx.xxx.xxx.xxx
  - db: dbprod
  - pwd: \*\*\*\*\*

### 环境变量

##### process.env

> `process.env` 属性返回包含用户环境的对象
>
> 可以修改此对象，但这些修改不会反映到 Node.js 进程之外

##### dotenv

> Dotenv is a zero-dependency module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env)

dotenv 定义的环境变量对于项目而言是环境常量，会覆盖 bash（执行环境）中的环境环境变量

由于同一项目不同人员之间开发机器不尽相同，需要在 `.env` 文件中定义的环境变量不同，推荐的做法是提供 `.env.example` 文件解释项目需要什么环境变量并由开发人员手动复制替换环境变量（需忽略 `.env` 文件的版本跟踪）

### GitLab CI&CD environment variables

[About CI&CD](./CI&CD.md)

##### 预定义变量

[Predefined environment variables reference](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)

##### 在 `.gitlab-ci.yml` 文件中自定义环境变量

```yml
variables:
  TEST: "HELLO WORLD"
```

##### 在 GitLab 的 Web UI 中添加环境变量

在**Settings > CI/CD** 中添加键值对

##### 环境变量优先级

> 1. Trigger variables or scheduled pipeline variables.
> 2. Project-level variables or protected variables.
> 3. Group-level variables or protected variables.
> 4. YAML-defined job-level variables.
> 5. YAML-defined global variables.
> 6. Deployment variables.
> 7. Predefined environment variables.

#### Reference

[process.env](https://nodejs.org/docs/latest/api/process.html#process_process_env)

[GitLab CI/CD environment variables](https://docs.gitlab.com/ee/ci/variables/README.html)

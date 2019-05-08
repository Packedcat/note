## Continuous Integration & Delivery & Deployment

### Continuous Integration

> In software engineering, continuous integration (CI) is the practice of merging all developer working copies to a shared mainline several times a day.

#### Base on shell script

(Suppose you have bash)

```bash
#!/bin/bash

# compress target
tar czf target.tar.gz $DIST_DIR

# copy to server
scp target.tar.gz $USER@$IP:$TARGET_DIR

ssh $USER@$IP << remotessh

# decompress & bootstrap
# ...

exit
remotessh
```

#### Base on fabric(Python)

Same as shell. Can be replaced with any module based on any language

#### Gase on Git hook

[Git Hook](../git/git-hooks.md)

#### Base on GitLab CI(GitLab continuous integration)

> Continuous Integration works by pushing small code chunks to your application’s code base hosted in a Git repository, and, to every push, run a pipeline of scripts to build, test, and validate the code changes before merging them into the main branch.

##### `.gitlab-ci.yml`

```yaml
stages:
  - install_deps
  - deploy

cache:
  paths:
    - node_modules/

install_deps:
  stage: install_deps
  only:
    - develop
    - master
  script:
    - yarn install

deploy-test:
  stage: deploy
  only:
    - develop
  script:
    - unset CI
    - ENV_VAL=$ENV_VAL yarn build
    -  # bootstrap server here

deploy:
  stage: deploy
  only:
    - master
  script:
    - unset CI
    - yarn build
    -  # deploy to production here
```

##### GitLab-Runner

> GitLab Runner is the open source project that is used to run your jobs and send the results back to GitLab. It is used in conjunction with GitLab CI, the open-source continuous integration service included with GitLab that coordinates the jobs.

Use

1. Add GitLab’s official repository:

```bash
 # For Debian/Ubuntu/Mint
 curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo bash

 # For RHEL/CentOS/Fedora
 curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh | sudo bash
```

2. Install the latest version of GitLab Runner

   ```bash
    # For Debian/Ubuntu/Mint
    sudo apt-get install gitlab-runner

    # For RHEL/CentOS/Fedora
    sudo yum install gitlab-runner
   ```

3. To register a Runner

   ```bash
   sudo gitlab-runner register
   ```

### Continuous Deployment

#### Base on shell script

```shell
#!/bin/bash

echo "starting"
cd /home/gitlab-runner/
# check source files
echo "check source files"
[ -e "$2.tar.gz" ] && rm -rf "$2.tar.gz"
[ -d $2 ] && rm -rf $2/

# copy project files
echo "copying"
cp -rf $1/ ./

# gzip
echo "gzip"
tar zcf $2.tar.gz $2

# setting deploy script
echo "generate deploy script"
if [ ! -e deploy.sh ]
then
cat > deploy.sh << EOF
  #!/bin/bash
  if [ -d $2 ]; then
    sudo tar zcf $2.tar.gz.back $2
  fi
  sudo tar zxf $2.tar.gz
  sudo chown -R deploy:deploy $2
  pm2 delete website > /dev/null 2>&1
  cd $2 && pm2 start node_modules/gatsby/dist/bin/gatsby.js --name website -- serve -H 0.0.0.0 > /dev/null 2>&1
  echo "finishing"
  exit 0
EOF
fi

chmod +x deploy.sh

# copy archive file to deploy machine
echo "copy archive file to deploy machine"
scp $2.tar.gz deploy@$3:/home/deploy/

echo "deploying"
ssh deploy@$3 'bash -s' < deploy.sh
exit 0
```

To be continued...

### Reference

[Understanding the Difference Between CI and CD](https://thenewstack.io/understanding-the-difference-between-ci-and-cd/?utm_source=wanqu.co&utm_campaign=Wanqu+Daily&utm_medium=website)

[GitLab Runner](https://docs.gitlab.com/runner/)

# git配置
<!-- toc -->
-----

## 清理过大的git repo
####方法一(推荐): 使用[bfg](https://rtyley.github.io/bfg-repo-cleaner/)

1. clone the bare repo (即带.git结尾的原始文件).
```bash
git clone --mirror git@github.com:xinntao/BasicSR.git
```

2. 删除大文件(>4M), 并改写历史.
```bash
java -jar bfg.jar --strip-blobs-bigger-than 4M some-big-repo.git
```
(BasicSR的repo中由于之前上传了.pth的model文件，导致整个repo很大=-=)

3. 更新repo并上传.
```bash
cd BasicSR.git
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push
```

经过更新后，BasicSR的repo大小由原来的40+M --> 1.4M :-)

####方法二: 使用`git filter-branch`
[参考](https://harttle.land/2016/03/22/purge-large-files-in-gitrepo.html)
(我尝试了但没有成功，不知道哪里出了问题=-=)

## 自动同步Github到Gitee码云
Gitee是可以:
1. 从Github的repo直接clone到Gitee;
2. 手动强制从Github同步到Gitee.

但是没法在Gitee上设置定期自动从Github同步。

解决方法：使用Github的Actions - [git-mirror-action](https://github.com/wearerequired/git-mirror-action)

1. repo下新建`.github/workflows/gitee-repo-mirror.yml`
2. 写入: (这里以[BasicSR](https://github.com/xinntao/BasicSR)为例)

```yml
name: Mirror BasicSR to Gitee

on: [ push, delete, create ]

jobs:
  git-mirror:
    runs-on: ubuntu-latest
    steps:
      - uses: wearerequired/git-mirror-action@v1
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        with:
          source-repo: 'git@github.com:xinntao/BasicSR.git'
          destination-repo: 'git@gitee.com:xinntao/BasicSR.git'
```
其中, SSH_PRIVATE_KEY: 1) Create a SSH key which has access to both repositories; 2) Store the private key as a secret.

这样，当我们`push, delete, create`便会触发Actions, 同步GitHub代码到Gitee.


参考:
1. [git-mirror-action](https://github.com/wearerequired/git-mirror-action)
2. [巧用Github Action同步代码到Gitee](http://yikun.github.io/2020/01/17/%E5%B7%A7%E7%94%A8Github-Action%E5%90%8C%E6%AD%A5%E4%BB%A3%E7%A0%81%E5%88%B0Gitee/)

## Github Public和Private同步
需求: 我有一个`BasicSR`的public repo, 同时，自己的private的开发是放在`BasicSR-private`repo的。希望定期可以从public的`BasicSR` repo pull.

1. 在`BasicSR-private`中把public加入
```git
git remote add pub git@github.com:xinntao/BasicSR.git
```
可以通过`git remote -v`查看远程仓库：
```git
origin  git@github.com:xinntao/BasicSR-private.git (fetch)
origin  git@github.com:xinntao/BasicSR-private.git (push)
pub  git@github.com:xinntao/BasicSR.git (fetch)
pub  git@github.com:xinntao/BasicSR.git (push)
```

2. pull
如果public repo有更新了，就可以pull到private repo中啦
```git
git pull pub master
```

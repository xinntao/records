# 码云gitee和github同时使用

因为国内github速度很慢，所以想使用[码云gitee](https://gitee.com/)来做同步。但很多项目之前是放在github上的，所以希望能够在码云gitee和github之间同步起来。

## 从github同步项目
这步骤很简单，gitee支持从github项目直接导入

## local代码同时push到github和gitee
一个本地仓库可以对应多个远程仓库。

1. 将gitee加入远程仓库
```bash
git remote add gitee git@gitee.com:xinntao/records.git
```
可以通过`git remote -v`查看远程仓库：
```bash
gitee   git@gitee.com:xinntao/records.git (fetch)
gitee   git@gitee.com:xinntao/records.git (push)
origin  git@github.com:xinntao/records.git (fetch)
origin  git@github.com:xinntao/records.git (push)
```
可以看到本地仓库同时对应了github和gitee两个远程仓库。

2. push
```bash
# push到origin: 对应github
git push origin master
# push到gitee
git push gitee master
```
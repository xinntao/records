# git配置
<!-- toc -->
-----

需求: 个人代码在github上，公司代码在gitlab上。在本地需要**同时使用两个账号**。关键是配置好各自的ssh公钥和远程关联。

## 配置glocal setting
根据使用频率，在github上使用global git setting，在gitlab上使用local的git setting。
可在任何目录下配置global setting。
```git
git config --global user.name Xintao Wang
git config --global user.email example@email.com
```

### git命令缩写
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch

git config --global alias.unstage 'reset HEAD'    # 把暂存区的修改撤销掉（unstage）
git config --global alias.last 'log -1'  # 显示最后一次提交信息
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```
如果只想在local文件夹生效，则把`--global`去掉即可。

## 生成公钥
### github生成公钥
```bash
ssh-keygen -t rsa  -C example@email.com
```
连续回车即可，默认文件为：`id_rsa.pub`. 把 `id_rsa.pub` 内容copy到github的setting SSH keys页面即可.

### gitlab生成公钥
```bash
ssh-keygen -t rsa  -C gitlab_example@email.com
```
注意第一次生成id_rsa指定文件名：`id_rsa_gitlab.pub`. <br>
把 `id_rsa_gitlab.pub` 内容copy到gitlab的setting SSH keys页面.

## 配置Cofing
用来区分git的时候，往哪个Host pull/push. <br>
在`.ssh/config`写入以下内容:
```
Host github.com
	HostName github.com
	User example@email.com
	IdentityFile ~/.ssh/id_rsa

Host gitlab.xx.xxxxxxxxx.com
	HostName gitlab.xx.xxxxxxxxx.com
	User gitlab_example@email.com
	IdentityFile ~/.ssh/id_rsa_gitlab
```

`.ssh/`目录下的`known_hosts`为免密登录用户信息，当成功添加github与gitlab的公钥，并向远程建立连接后，会自动生成known_hosts文件.

## 测试
```bash
ssh -T git@github.com
ssh -T git@gitlab.xx.xxxxxxxxx.com
```
一般会显示：Hi xinntao or Welcom to GitLab, @xinntao.

## git clone
使用global setting的账号来git clone没有问题，下面主要说使用local setting的账号来git clone。<br>
`git clone git@gitlab.xx.xxxxxxxxx.com:yyy/zzz.git`<br>
它是根据git@gitlab.xx.xxxxxxxxx.com Host来识别使用哪个SSH key的

**修改local git setting**
进入clone下来的文件夹, 修改local git setting
```bash
git config --local user.name wangxintao
git config --local user.email gitlab_example@email.com
```

检查 `.git/config`:
```
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = git@gitlab.xx.xxxxxxxxx.com:yyy/zzz.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
[user]
	name = wangxintao
	email = gitlab_example@email.com
[branch "0.1.0"]
	remote = origin
	merge = refs/heads/0.1.0
```

## 配置两个github账户
原理是一样的，创建公钥的时候区分开，然后在config里面写明:
```
Host github.com-xintao
	HostName github.com
	User example_2@email.com
	IdentityFile ~/.ssh/id_rsa_work_xintao
```
git clone的时候注意Host的后缀
```bash
git clone git@github.com-xintao:work_user1/repo_name.git
```
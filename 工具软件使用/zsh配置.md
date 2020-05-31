# zsh配置

## 安装
1. 安装zsh
```bash
sudo apt-get install zsh
```
或者已经安装了，查看`/usr/bin/zsh`

1. 安装oh-my-zsh
```bash
sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

## 主题
默认的`robbyrussell`主题就已经很不错啦。 `agnoster`也还行，就是字符显示有时有问题。修改后, 生效:
```bash
source ~/.zshrc
```

## 插件
1. zsh-syntax-highlighting
```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```
Ref:
    - https://github.com/zsh-users/zsh-syntax-highlighting
    - https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md

1. zsh-completions
```bash
git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-completions
```
Ref:
    - https://github.com/zsh-users/zsh-completions
    - https://github.com/zsh-users/zsh-completions/blob/master/README.md

1. zsh-autosuggestions
```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```
Ref:
    - https://github.com/zsh-users/zsh-autosuggestions
    - https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md

1. zsh-history-substring-search
```bash
git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search
```
Ref:
    - https://github.com/zsh-users/zsh-history-substring-search
    - https://github.com/zsh-users/zsh-history-substring-search/blob/master/README.md

{%em%}记得要在`~/.zshrc`更新{%endem%}: (如果没有.zshrc这个文件， 运行一下zsh即可)
```bash
plugins=(git git-extras yarn zsh-completions zsh-syntax-highlighting zsh-autosuggestions zsh-history-substring-search)
autoload -U compinit && compinit
```
然后执行生效:
```bash
source ~/.zshrc
```



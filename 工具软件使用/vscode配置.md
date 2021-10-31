# VSCode配置
<!-- toc -->
-----

## 代码规范配置
### 代码格式和静态检查
一般来说有三类：
- 代码格式: pep8, flake8
- 静态检查: yapf
- 自动排序import package: isort
```pip
pip install flake8 yapf isort
```

**vscode修改yapf配置**

```
"python.formatting.yapfArgs": [
    "--style",
    "{BASED_ON_STYLE = pep8, BLANK_LINE_BEFORE_NESTED_CLASS_OR_DEF = true, SPLIT_BEFORE_EXPRESSION_AFTER_OPENING_PAREN = true}"
],

```
这个修改是全局的，如果不希望全局，则可以在`.vscode/settings.json`中修改。

**保存时自动格式化**

```
"editor.formatOnSave": true,
"editor.formatOnPaste": true,
```
```
"[python]": {
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    }
}
```
对于isort需要按保存键两次才可以。

### pre-commit hook
提交代码前，在本地执行一些命令。
```bash
pip install -U pre-commit
pre-commit install  # 在当前repo中执行
```

### 单元测试
**测试单一函数**
```bash
pytest [xxx.py] -s -k "function_name"
```
其中 `-s`是输出print内容; `-k`是只测试包含`"function_name"`的函数。

*覆盖率*
```bash
pip install coverage
```
```bash
coverage run --source=your_pacakge -m pytest
coverage report -m
```

## 插件
1. Remote-SSH
    - Microsoft
    - 远程打开、编辑、运行代码库
1. Remote-SSH: Editing Configuration Files
    - Microsoft
1. Remote-WSL
    - Microsoft
    - 在windows上使用WSL
1. vscode-icons
    - VSCode Icons Team
    - 优化VSCode图标
1. Format Files
    - jbockle
    - 批量format文件
1. GitLens
    - Eric Amodio
    - 显示提交记录；比对多个branch内容
1. Markdown Preview Enhanced
    - Yiyi Wang
1. markdownlint
    - David Anson
1. Python
    - Microsoft
1. Git Graph
    - mhutchie
1. Live Server
    - Ritwick Dey
    - 点击右下角的`Go Live`, 就能运行一个server，能在浏览器中浏览网页
    - 可以配置默认打开的根目录

## ssh服务器

1. 安装`Remote-SSH`插件
1. 点击左侧的远程连接图标(Remote Explorer), 左侧边栏右上角选择`SSH TARGETS`, 点击齿轮图标设置
1. 编辑弹出的`~/.ssh/config`
    1. 有跳板机
    ```bash
    Host jump_machine  # arbitrary host name
        HostName jump.xx.xxxxxxxxx.com  # url or ip address
        User xtwang  # user name
        ForwardAgent yes

    Host remote_machine  # arbitray name
        HostName 172.20.20.2  # url or ip address
        User xtwang
        ProxyCommand C:\Windows\System32\OpenSSH\ssh.exe -q -W %h:%p jump_machine  # windows 下要写整个ssh的路径; # jump_machine为上一个entry的name
    ```
    1. 直连
    ```bash
    Host arbitrary_name  # arbitray name
        HostName xxxxx.xx.xxxx.xxx.xx  # url or ip address
        User xtwang
        ForwardAgent yes
        Port 2190
    ```

    {% reveal text="<font color=#ffffff>+</font>" %}
    Host cdc190
        HostName cdcgw.ie.cuhk.edu.hk
        User xtwang
        ForwardAgent yes
        Port 2190
    {% endreveal %}

1. 将本地ssh公钥(~/.ssh/id_rsa.pub内容)加到服务器的authorized_keys(~/.ssh/authorized_keys)里.

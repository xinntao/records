# gitbook使用
<!-- toc -->



## 安装
我是在Win10的wsl下安装使用的。

1. 安装node.js和npm. [Ref](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/)
```bash
# Enable the NodeSource repository
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
# install
sudo apt install nodejs
# verify
node --version
npm --version
```

2. 安装gitbook
```bash
# install
sudo npm install -g gitbook-cli
# verify
gitbook -V
```

## 基本使用
1. 初始化
```bash
gitbook init
```
它会生成<br>
*README.md*: 本书介绍<br>
*SUMMARY.md*: 定义本书目录

2. 编辑

    可用VSCode编辑

3. 输出
    1. 输出静态网页
    ```bash
    gitbook build
    ```
    它会生成`_book`文件夹

    2. 输出pdf
    ```bash
    # install
    sudo apt install calibre
    npm install gitbook-pdf -g
    # 命令，会生成book.pdf的文件
    gitbook pdf .
    ```

1. 预览
```bash
gitbook serve ./
```
可以在`http://localhost:4000/`实时预览

## 配置文件
在根目录下可以使用配置文件[`book.json`](../book.json.md).
更多内容可参见[这里](http://gitbook.zhangjikai.com/settings.html).

## 其他需求

1. 自动生成目录（SUMMARY.md）[Ref](http://self-publishing.ebookchain.org/index.html)<br>
```bash
# install
npm install -g gitbook-summary
# cmd
book sm
```
它会根据字母序来组织，如果需要保留顺序，可在题目前加上数字。

    如果有多余的目录，比如"node_modules", 则可以在`book.json`中加入
    ```
    "ignores": [
        "node_modules"
    ]
    ```

1. 生成当前页的目录<br>
使用插件: `simple-page-toc` [Ref](http://gitbook.zhangjikai.com/plugins.html#anchor-navigation-ex)
```bash
npm install gitbook-plugin-simple-page-toc
```
在需要生成目录的地方加上 &lt;!-- toc --&gt; .

1. 添加Toc到侧边悬浮导航以及回到顶部按钮<br>
使用插件: `anchor-navigation-ex` [Ref](http://gitbook.zhangjikai.com/plugins.html#anchor-navigation-ex)
```bash
npm install gitbook-plugin-anchor-navigation-ex
```

1. 为代码块添加复制的按钮<br>
使用插件: `copy-code-button` [Ref](http://gitbook.zhangjikai.com/plugins.html#copy-code-button))
```bash
npm install gitbook-plugin-copy-code-button
```

1. 折叠目录<br>
使用插件: `expandable-chapters`
```bash
npm install gitbook-plugin-expandable-chapters
```

### References
http://gitbook.zhangjikai.com/

https://tonydeng.github.io/gitbook-zh/gitbook-howtouse/index.html
# gitbook使用

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
可配合插件 `chapter-fold`, 使得箭头变小。<br>
折叠目录有一个缺点，就是默认是折叠的，这个没法默认展开，有点不友好，暂时先不用了。

1. 页面添加修改时间等页脚<br>
使用插件: `expandable-chapters` [Ref](http://gitbook.zhangjikai.com/plugins.html#tbfed-pagefooter)
```bash
npm install gitbook-plugin-tbfed-pagefooter
```

1. 支持中文搜索，及搜索结果高亮<br>
使用插件: `search-plus` [Ref](http://gitbook.zhangjikai.com/plugins.html#search-plus
```bash
npm install gitbook-plugin-search-plus
```

1. 字体颜色背景<br>
使用插件: `emphasize` [Ref](http://gitbook.zhangjikai.com/plugins.html#emphasize)
```bash
npm install gitbook-plugin-emphasize
```
使用示例:<br>
This text is {% em %}highlighted with **markdown**!{% endem %}<br>
This text is {% em type="red" %}highlighted in red!{% endem %}<br>
This text is {% em color="#ff0000" %}highlighted with a custom color!{% endem %}<br>
源码: 把`\%`替换成`%`<br>
```bash
This text is {\% em \%}highlighted with **markdown**!{\% endem \%}<br>
This text is {\% em type="red" \%}highlighted in red!{\% endem \%}
This text is {\% em color="#ff0000" \%}highlighted with a custom color!{\% endem \%}
```

1. 带颜色字体<br>
<span style="color:red;">红色字体</span>示例。<br>
```html
<span style="color:red;">红色字体</span>
```

1. 添加TODO List<br>
使用插件: `todo` [Ref](http://gitbook.zhangjikai.com/plugins.html#todo)
```bash
npm install gitbook-plugin-todo
```
- [ ] item 1
- [x] item 2
源码:

```markdown
- [ ] item 1
- [x] item 2
```

### References
http://gitbook.zhangjikai.com/

https://tonydeng.github.io/gitbook-zh/gitbook-howtouse/index.html
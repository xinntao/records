# gitbook使用
<!-- toc -->
-----

## 安装
我是在Win10的wsl下安装使用的.

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
gitbook --port 4000 serve ./
```
可以在`http://localhost:4000/`实时预览

## 配置文件
在根目录下可以使用配置文件[`book.json`](https://gitee.com/xinntao/records/blob/master/book.json).
更多内容可参见[这里](http://gitbook.zhangjikai.com/settings.html).


## 主题

gitbook可以修改主题，参考 [Templating](https://snowdreams1006.github.io/gitbook-official/en/templating/) 和 [Theming](https://snowdreams1006.github.io/gitbook-official/en/themes/).

Gitbook可以通过自定义插件来修改主题, 本主题是修改自[theme-hqbook](https://www.npmjs.com/package/gitbook-plugin-theme-hqbook). 本主题取了名字叫coolx, 放在了[github上](https://github.com/xinntao/gitbook-plugin-theme-coolx).

> [!TIP|label: 使用private plugin]
> 在`book.json`中可以使用private的github repo作为插件, 语法为`"theme-coolx@git+https://github.com/xinntao/gitbook-plugin-theme-coolx"`

在修改主题时候，我们需要在本地调试插件:

> [!TIP|label: 在本地修改和调试插件]
> 1. 在gitbook plugin folder, `npm link`
> 2. 在gitbook folder, `npm link gitbook-plugin-name`
>
>   [Reference](https://stackoverflow.com/questions/30897205/create-a-gitbook-plugin-locally-without-publishing-it)

另外一个使用了gitbook实现了sphinx主题的[theme-veeam](https://www.npmjs.com/package/gitbook-plugin-theme-veeam)(但好像没有必要，直接用sphinx就好了=-=).


## 其他需求 (插件)

只要把插件写在book.json, 然后`gitbook install`, 就会自动安装用到的package, 不需要单独一个个安装.

1. **自动生成目录（SUMMARY.md）**[Ref](http://self-publishing.ebookchain.org/index.html)<br>
```bash
# install
npm install -g gitbook-summary
# cmd
book sm
```
它会根据字母序来组织，如果需要保留顺序，可在题目前加上数字.
<br>
如果有多余的目录，比如"node_modules", 则可以在`book.json`中加入
```
"ignores": [
    "node_modules"
]
```

1. **折叠目录**<br>
使用插件: [`expandable-chapters`](https://www.npmjs.com/package/gitbook-plugin-expandable-chapters).
<br>
需要配合插件 [`chapter-fold`](https://www.npmjs.com/package/gitbook-plugin-chapter-fold) 一起用<br>
折叠目录有一个缺点，就是默认是折叠的，这个没法默认展开，有点不友好.

1. **页面添加修改时间等页脚**<br>
使用插件: [`tbfed-pagefooter`](https://www.npmjs.com/package/gitbook-plugin-tbfed-pagefooter).

1. **支持中文搜索，及搜索结果高亮**<br>
使用插件: [`search-plus`](https://www.npmjs.com/package/gitbook-plugin-search-plus)

1. **使用Math Latex**<br>
使用插件: [`katex`](https://www.npmjs.com/package/gitbook-plugin-katex)

1. **字体颜色背景**<br>
使用插件: [`emphasize`](https://www.npmjs.com/package/gitbook-plugin-emphasize).
<br>
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

1. **带颜色字体**<br>
<span style="color:red;">红色字体</span>示例. <br>
```html
<span style="color:red;">红色字体</span>
```

1. **代码高亮**<br>
使用插件: [`prism`](https://www.npmjs.com/package/gitbook-plugin-prism).
```bash
npm install gitbook-plugin-prism
npm install gitbook-plugin-prism-themes
```
还需要配置pluginsConfig；禁用自带的`-highlight`.
<br>[Prism Themes](https://github.com/PrismJS/prism)

1. **添加TODO List**<br>
使用插件: [`todo`](https://www.npmjs.com/package/gitbook-plugin-todo)
<br>
源码:<br>
`- [ ] item 1`<br>
`- [x] item 2`
    - [ ] item 1
    - [x] item 2

1. **查看修改源码**<br>
使用插件: [`editlink`](https://www.npmjs.com/package/gitbook-plugin-editlink).

1. **使用醒目的NOTE, TIP等**<br>
使用插件: [`flexible-alerts`](https://www.npmjs.com/package/gitbook-plugin-flexible-alerts).
<br>
> [!NOTE]
> 源码
> ```
> > [!NOTE]
> > Contents
> ```
<br>

    支持修改显示的label:
    > [!NOTE|label: 修改显示的label]
    > ```
    > > [!NOTE|label: 修改显示的label]
    > > Contents
    > ```
<br>

    TIP:
    > [!TIP]
    > ```
    > > [!TIP]
    > > Contents
    > ```
<br>

    WARNING:
    > [!WARNING]
    > ```
    > > [!WARNING]
    > > Contents
    > ```
<br>

    DANGER:
    > [!DANGER]
    > ```
    > > [!DANGER]
    > > Contents
    > ```
<br>

    COMMENT:
    > [!COMMENT]
    > ```
    > > [!COMMENT]
    > > Contents
    > ```

---
以下的功能暂时没有用，或在[coolx](https://github.com/xinntao/gitbook-plugin-theme-coolx)主题中已经提供.

1. **生成当前页的目录**<br>
使用插件: [`simple-page-toc`](https://www.npmjs.com/package/gitbook-plugin-simple-page-toc)
<br>
在需要生成目录的地方加上 &lt;!-- toc --&gt; .

1. **添加Toc到侧边悬浮导航以及回到顶部按钮**<br>
使用插件: [`anchor-navigation-ex`](https://www.npmjs.com/package/gitbook-plugin-anchor-navigation-ex).

1. **使用Google统计**<br>
使用插件: [`ga`](https://www.npmjs.com/package/gitbook-plugin-ga).
但目前版本好像不支持.

## References

Gitbook 介绍: <br>
http://gitbook.zhangjikai.com/ <br>
https://tonydeng.github.io/gitbook-zh/gitbook-howtouse/index.html

更多插件推荐: <br>
http://www.unclealan.cn/index.php/front/153.html <br>
https://www.goodzzp.com/custom/plugin/other/index.html <br>
https://zhousiwei.gitee.io/2019/06/24/GitBook%E7%9B%B8%E5%85%B3%E9%85%8D%E7%BD%AE%E5%8F%8A%E4%BC%98%E5%8C%96/ <br>
https://segmentfault.com/a/1190000019806829
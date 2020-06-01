# tmux使用
<!-- toc -->
-----

## 配置
可以把命令写入 `~/.tmux.conf`, 这样每次启动tmux就自动执行了。
```bash
setw -g mouse on  # 启用鼠标
set-option -g allow-rename off  # 禁止修改window名字
set -g history-limit 100000  # 设置显示历史，debug的时候可以看到更多信息

```

## 常见命令
1. 新建
```bash
tmux new -s XT
```
1. 修改prefix键
```bash
set-option -g prefix C-a
```
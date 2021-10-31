# tmux使用
<!-- toc -->
-----

## 配置
可以把命令写入 `~/.tmux.conf`, 这样每次启动tmux就自动执行了。
```bash
setw -g mouse on  # 启用鼠标
set-option -g allow-rename off  # 禁止程序自动修改window名字
set -g history-limit 100000  # 设置显示历史，debug的时候可以看到更多信息

# set scroll speed
bind -Tcopy-mode WheelUpPane send -N1 -X scroll-up
bind -Tcopy-mode WheelDownPane send -N1 -X scroll-down
```

## 常见命令
1. 新建
```bash
tmux new -s [name]
```

1. 修改prefix键, 默认是Ctrl+B
```bash
set-option -g prefix C-a
```

## 其他问题
1. 调节scroll速度, [Ref](https://stackoverflow.com/questions/36002866/configure-tmux-scroll-speed)
```bash
bind -Tcopy-mode WheelUpPane send -N1 -X scroll-up
bind -Tcopy-mode WheelDownPane send -N1 -X scroll-down
```
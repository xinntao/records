# Ubuntu配置PyTorch环境
<!-- toc -->
-----


可按照以下流程来配置Ubuntu的PyTorch环境.

## 一些基本命令
查看Ubuntu版本:
```bash
cat /etc/issue
```

apt更新:
```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get autoremove --purge
```

查看已经安装的软件
```bash
apt list --installed
```

搜索软件列表
```
apt-cache search nvidia
```

## 安装Anaconda 或 Miniconda
从 [Anaconda](https://www.anaconda.com/download/#linux) 或 [Miniconda](https://docs.conda.io/en/latest/miniconda.html) 下载.
`wget ...`

`bash ...` 安装，不需要sudo权限.
```bash
conda update --all
```

## 检查Nvidia Driver
关于不同版本的cuda对driver最低version的要求, 参见 [Nvidia doc - Table 2](https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html).
比如: CUDA 10.2.89	>= 440.33

### 更新driver

1. 首选通过 apt-get 安装
```bash
sudo add-apt-repository ppa:graphics-drivers/ppa + sudo apt-get update
```
搜索列表, 查看是否有需要的版本
```bash
apt-cache search nvidia
```
安装
```bash
sudo apt-get install nvidia-440
```

2. 若apt-get安装失败, 可以通过下载cuda.run文件自带的driver安装, 注意在这之前可能需要:

    - 卸载已有cuda
        ```bash
        apt list --installed | grep nvidia
        sudo apt-get --purge autoremove packagename
        ```
    - 可能需要禁用lightdm服务
        ```bash
        sudo service lightdm stop
        ```

3. 若仍有问题, 请参考[安装指南](https://gist.github.com/wangruohui/df039f0dc434d6486f5d4d098aa52d07#install-cuda).

### 添加配置, 提高性能
These commands can be added to `/etc/rc.local` for executing at system boot.
```bash
sudo nvidia-smi -pm 1
sudo nvidia-smi -e 0
```

最终确认nvidia driver是否成功:
```bash
nvidia-smi
```

## 安装cuda
如果不需要编译带.cu的源文件，可以不需要安装cuda. 因为PyTorch安装的时候，依赖就把runtime的库给安装了.

下载.run文件安装 `sudo bash .run`.

> [!NOTE]
> 若有补丁, `sudo bash cuda_9.1.85.1_linux.run.`

### 安装cudnn
安装cudnn只要copy即可:
```
sudo cp -r cuda/lib64/* /usr/local/cuda-10.0/lib64/
sudo cp -r cuda/include/* /usr/local/cuda-10.0/include/
```
> [!TIP]
> 下载cudnn文件需要先注册

## 新建Anaconda环境
以 pt15 (pytorch 1.5) 为例:
```bash
conda create -n pt15 python=3.8
```

### 多个cuda版本
如果环境中有多个cuda版本，可以指定conda环境指向的cuda版本.

**修改pt15启动环境**

1. activate
```bash
mkdir -p ~/anaconda3/envs/pt15/etc/conda/activate.d
cd ~/anaconda3/envs/pt15/etc/conda/activate.d
vim activate.sh
```
写入以下内容:
```bash
#!/bin/sh
ORIGINAL_LD_LIBRARY_PATH=$LD_LIBRARY_PATH
ORIGINAL_PATH=$PATH
ORIGINAL_CPATH=$CPATH
export LD_LIBRARY_PATH=/usr/local/cuda-10.2/lib64:/usr/local/cuda-10.2/extras/CUPTI/lib64:/lib/nccl/cuda-10.2:$LD_LIBRARY_PATH
export PATH=/usr/local/cuda-10.2/bin${PATH:+:${PATH}}
export CPATH=/usr/local/cuda-10.2/include${CPATH:+:${CPATH}}
# (option) export LD_LIBRARY_PATH=/usr/lib/x86_64-linux-gnu/libnccl.so:$LD_LIBRARY_PATH
# you can find the nccl path by ``find /usr -name '*nccl*'``
```
```bash
chmod +x activate.sh
```

2. deactivate
```bash
mkdir -p ~/anaconda3/envs/pt15/etc/conda/deactivate.d
cd ~/anaconda3/envs/pt15/etc/conda/deactivate.d
vim deactivate.sh
```
写入以下内容:
```bash
#!/bin/sh
export LD_LIBRARY_PATH=$ORIGINAL_LD_LIBRARY_PATH
unset ORIGINAL_LD_LIBRARY_PATH
export PATH=$ORIGINAL_PATH
unset ORIGINAL_PATH
export ORIGINAL_CPATH=$ORIGINAL_CPATH
unset ORIGINAL_CPATH
```
```bash
chmod +x deactivate.sh
```

## 安装PyTorch
参见 [官网](https://pytorch.org/) 命令 (要确定安装的PyTorch版本, 以及cuda版本).

e.g. `conda install pytorch torchvision cudatoolkit=10.2 -c pytorch`

验证:
```python
python
import torch
print(torch.__version__)
print(torch.version.cuda)
print(torch.backends.cudnn.version())
print(torch.cuda.is_available())
```
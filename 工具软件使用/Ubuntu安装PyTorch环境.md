1. Ubuntu实验环境配置 (PyTorch)
Created : 2019/01/07; Updated : 2019/01/29;

可以按照以下的流程来配置Lab机器.

1.1. 一些基本命令
查看Ubuntu版本: cat /etc/issue

apt更新

sudo apt-get update

sudo apt-get upgrade

sudo apt-get autoremove --purge

其他apt相关

查看已经安装的 apt list --installed

搜索软件列表 apt-cache search nvidia

1.2. tmux开启鼠标键盘控制
setw -g mouse on OR setw -g mode-mouse on

1.3. 安装Anaconda
wget ...

bash ..., 不需要sudo权限

conda update --all

1.4. 检查Nvidia Driver
关于cuda不同版本对driver最低version的要求, 参见 nvidia doc - Table 1. CUDA 10.0.130 >= 410.48

若需要update driver:

通过 apt-get 安装

sudo add-apt-repository ppa:graphics-drivers/ppa + sudo apt-get update

搜索列表, 查看是否有需要的版本 apt-cache search nvidia

安装 sudo apt-get install nvidia-410

若apt-get安装失败, 可以通过 cuda.run文件自带的driver安装, 注意在这之前可能需要

卸载已有的cuda, apt list --installed, sudo apt-get --purge autoremove packagename

可能需要禁用lightdm服务, sudo service lightdm stop

若有问题, 请参考晖哥的 安装指南

可以添加一些配置, 提高性能. These commands can be added to /etc/rc.local for executing at system boot. (Lab的机器都已经有了)

sudo nvidia-smi -pm 1
sudo nvidia-smi -e 0
确认是否成功 nvidia-smi.

1.5. 安装cuda 10.0
下载.run文件安装 sudo bash .run, 列一些选项:

>>> Do you accept the previously read EULA?
accept/decline/quit: accept
>>> Install NVIDIA Accelerated Graphics Driver for Linux-x86_64 410.48?
(y)es/(n)o/(q)uit: no
>>> Install the CUDA 10.0 Toolkit?
(y)es/(n)o/(q)uit: yes
>>> Enter Toolkit Location
[ default is /usr/local/cuda-10.0 ]:
>>> Do you want to install a symbolic link at /usr/local/cuda?
(y)es/(n)o/(q)uit: no
>>> Install the CUDA 10.0 Samples?
(y)es/(n)o/(q)uit: no
注解

若有补丁, sudo bash cuda_9.1.85.1_linux.run. (目前cuda10还没有)

1.6. 安装cudnn
cuda10对应7.4.2, 安装cudnn只要copy即可:

sudo cp -r cuda/lib64/* /usr/local/cuda-10.0/lib64/
sudo cp -r cuda/include/* /usr/local/cuda-10.0/include/
1.7. 新建Anaconda环境 - pt1
conda create -n pt1 python=3.7

修改pt1启动环境:

activate

mkdir -p ~/anaconda3/envs/pt1/etc/conda/activate.d

cd ~/anaconda3/envs/pt1/etc/conda/activate.d

vim activate.sh

写入以下内容:

#!/bin/sh
ORIGINAL_LD_LIBRARY_PATH=$LD_LIBRARY_PATH
ORIGINAL_PATH=$PATH
ORIGINAL_CPATH=$CPATH
export LD_LIBRARY_PATH=/usr/local/cuda-10.0/lib64:/usr/local/cuda-10.0/extras/CUPTI/lib64:/lib/nccl/cuda-10.0:$LD_LIBRARY_PATH
export PATH=/usr/local/cuda-10.0/bin${PATH:+:${PATH}}
export CPATH=/usr/local/cuda-10.0/include${CPATH:+:${CPATH}}
# (option) export LD_LIBRARY_PATH=/usr/lib/x86_64-linux-gnu/libnccl.so:$LD_LIBRARY_PATH
# you can find the nccl path by ``find /usr -name '*nccl*'``
chmod +x activate.sh

deactivate

mkdir -p ~/anaconda3/envs/pt1/etc/conda/deactivate.d

cd ~/anaconda3/envs/pt1/etc/conda/deactivate.d

vim deactivate.sh

#!/bin/sh
export LD_LIBRARY_PATH=$ORIGINAL_LD_LIBRARY_PATH
unset ORIGINAL_LD_LIBRARY_PATH
export PATH=$ORIGINAL_PATH
unset ORIGINAL_PATH
export ORIGINAL_CPATH=$ORIGINAL_CPATH
unset ORIGINAL_CPATH
chmod +x deactivate.sh

1.8. 安装PyTorch
参见 官网 命令 (要确定安装的pytorch版本, 以及cuda版本), e.g. conda install pytorch torchvision cuda100 -c pytorch

验证:

python
import torch
print(torch.__version__)
print(torch.version.cuda)
print(torch.backends.cudnn.version())
print(torch.cuda.is_available())
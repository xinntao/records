# Ubuntu安装MATLAB
<!-- toc -->
-----

## Ubuntu Silently Install MATLAB

若/usr/local空间不够, 可以安装在本地目录 `/home/xtwang/MATLAB/R2017b`.

1. 挂载镜像文件/解压iso文件
```bash
mkdir /home/xtwang/tmp
sudo mount -t auto -o loop R2017b_glnxa64.iso /home/xtwang/tmp
```
> [!TIP|label: 无法挂载]
> 如果遇到系统无法挂载的情况, 比如 `failed to setup loop device: No such file or directory`
>
> 采用 7z 进行iso解压
>```bash
> sudo apt-get install p7zip-full p7zip-rar # [On Debian/Ubuntu systems]
> sudo yum install p7zip p7zip-plugins # [On CentOS/RHEL systems]
> 7z x R2017b_glnxa64.iso  -o/data/xintao/matlab
> ```

1. 修改文件以便进行 Silent Install. 修改`installer_input.txt`和`activate.ini`.<br>
修改`installer_input.txt`:
```txt
destinationFolder=/home/xtwang/MATLAB/R2017b
fileInstallationKey= (your key)
agreeToLicense=yes
outputFile=/home/xtwang/mathworks_xtwang.log
mode=silent
```
修改文件 `activate.ini`:
```txt
isSilent=true
activateCommand=activateOffline #设置激活方式, 离线激活无需联网
```

1. 安装 `sudo install -inputFile /home/xtwang/installer_input.txt`
> [!NOTE|label: 安装可能需要指定javadir]
> 如果只出现下面三行文字, 说明安装失败
> ```txt
> Preparing installation files ...
> Installing ...
> Finished
> ```
> 原因: install文件只是一个shell脚本, 最终调用的是`bin/glnxa64/install_unix`, 并将参数传递给它.
> install_unix文件仍是shell脚本, 里面定义了丰富的参数及说明. 运行时加上verbose选项–v, 发现是javadir参数是空的.
> javadir一般在`/usr/local/jdk/jre`, 如果没有, 需要安装java.
> ```bash
> ./install -inputFile /data/xintao/matlab/installer_input.txt -javadir /usr/local/jdk/jre
> ```
> 注意使用绝对路径

1. 激活
> [!TIP|label: 如果有需要的话 :-|]
> ```bash
> sudo cp license_standalone.lic /home/xtwang/MATLAB/R2017b/licenses/
> sudo cp libmwservices.so /home/xtwang/MATLAB/R2017b/bin/glnxa64/
> ```
1. 取消挂载 (可选)
```bash
sudo umount -l /home/xtwang/tmp
sudo rm -rf tmp
```
1. 安装MATLAB的支持包 (可选)
```bash
sudo apt-get install matlab-support
```
1. 任意位置启动MATLAB
```bash
sudo ln -s /home/xtwang/MATLAB/R2017b/bin/glnxa64/MATLAB /usr/local/bin/matlab
```

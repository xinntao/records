# Ubuntu安装MATLAB
<!-- toc -->
-----

## Ubuntu Silently Install MATLAB

若/usr/local空间不够, 可以安装在本地目录 `/home/xtwang/MATLAB/R2017b`.

1. 挂载镜像文件
```bash
mkdir /home/xtwang/tmp
sudo mount -t auto -o loop R2017b_glnxa64.iso /home/xtwang/tmp
```
2. Silent Install 修改`installer_input.txt`, 修改以下项目, 然后 `sudo install -inputFile /home/xtwang/installer_input.txt`
```txt
destinationFolder=/home/xtwang/MATLAB/R2017b
fileInstallationKey= (your key)
agreeToLicense=yes
outputFile=/home/xtwang/mathworks_xtwang.log
mode=silent
```
> [!TIP|label: 如果有需要的话 :-|]
> ```bash
> sudo cp license_standalone.lic /home/xtwang/MATLAB/R2017b/licenses/
> sudo cp libmwservices.so /home/xtwang/MATLAB/R2017b/bin/glnxa64/
> ```
3. 取消挂载
```bash
sudo umount -l /home/xtwang/tmp
sudo rm -rf tmp
```
4. 安装MATLAB的支持包
```bash
sudo apt-get install matlab-support
```
5. 任意位置启动MATLAB
```bash
sudo ln -s /home/xtwang/MATLAB/R2017b/bin/glnxa64/MATLAB /usr/local/bin/matlab
```

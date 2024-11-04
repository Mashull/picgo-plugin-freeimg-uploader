## picgo-plugin-freeimg-uploader

Picgo plugin for [Freeimg图床](https://freeimg.cn/)
为 PicGo 开发的一款插件，适配Freeimg图床。

## 安装
#### 在线安装

	打开 PicGo 详细窗口，选择插件设置，搜索freeimg安装，然后重启应用即可。

#### 离线安装

1. 克隆该项目
2. 打开 PicGo 详细窗口，选择插件设置，并点击如下按钮： 
3. 选择你克隆仓库的文件夹
4. 重启应用即可

### 截图
![picgo-plugin-freeimg-uploader](./static/freeimg.png)

### 参数说明
|参数名称|类型|描述|是否必须|
|:--:|:--:|:--:|:--:|
|token|input|[Freeimg图床Token]([Tokens](https://freeimg.cn/user/tokens))|true|
|permission|list|存储权限(1:公开，0:私有)|true|
|strategies|list|存储节点(1:国内节点，3:国外节点)|true|


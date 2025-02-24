# VMware Workstation

## 安装步骤

1. 创建或登录 Broadcom 账号.

   - 访问链接: [Broadcom](https://www.broadcom.com/)

2. 下载 VMware Workstation Pro.
   - 访问下载页面: [VMware Workstation Pro Downloads](https://support.broadcom.com/group/ecx/productdownloads?subfamily=VMware+Workstation+Pro)

## VMware NAT 模式配置 IP

### 示例配置

配置起始 IP 为: `11.11.11.11`

### 主机网络适配器设置

- **适配器名称**: VMware 网络适配器 VMnet8 (VMware Network Adapter VMnet8)
- **操作步骤**:
  1. Windows 10(主机): 进入“设置” -> “网络和 Internet” -> “状态” -> “更改适配器选项”.
  2. 右键点击“VMnet8” -> 选择“属性”.
  3. 选择“Internet 协议版本 4” -> 点击“属性”.
  4. 选择“使用下面的 IP 地址”和“DNS 服务器地址”.

### IP 配置表

|   NAME   |      IP       |       INFO        |
| :------: | :-----------: | :---------------: |
| IP 地址  |  11.11.11.1   |      主机 IP      |
| 子网掩码 | 255.255.255.0 |     子网掩码      |
| 默认网关 |  11.11.11.2   |    虚拟机网关     |
|   DNS    |   223.5.5.5   | Alibaba Cloud DNS |
|   DNS    |    8.8.8.8    | Google Public DNS |

### VMware 虚拟网络编辑器设置

1. 打开 VMware Workstation.
2. 选择“编辑” -> “虚拟网络编辑器”.
3. 选择“VMnet8” -> 点击“更改设置”.
4. 设置“子网 IP”为 `11.11.11.0`.
5. 勾选“使用本地 DHCP 服务将 IP 地址分配给虚拟机”.
6. 在“DHCP 设置”中, 设置“起始 IP 地址”为 `11.11.11.11`, 和“结束 IP 地址”为 `11.11.11.254`.
7. 点击“确定”保存设置.

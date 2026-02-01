# RUthirsty - 喝水打卡应用

一款科技感的喝水打卡Cordova应用。

## 功能特点

- ✨ **科技感界面** - 深色主题，霓虹灯效果，流畅动画
- 💧 **一键打卡** - 点击按钮即可记录喝水
- 📊 **数据统计** - 显示今日打卡次数和累计天数
- 📝 **历史记录** - 完整的打卡历史记录，按日期分组显示
- 📱 **震动反馈** - 打卡时提供触觉反馈
- 💾 **本地存储** - 使用localStorage存储数据，无需网络

## 开发环境要求

- Node.js (v14+)
- Cordova CLI
- Android SDK（用于Android开发）

## 安装步骤

### 1. 安装依赖

```bash
npm install
```

### 2. 安装Cordova和平台

```bash
# 全局安装Cordova（如果没有安装）
npm install -g cordova

# 安装Android平台
cordova platform add android
```

### 3. 安装插件

```bash
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-vibration
cordova plugin add cordova-plugin-dialogs
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-splashscreen
```

## 运行应用

### 在浏览器中测试（开发阶段）

```bash
# 启动本地服务器
cd www
python3 -m http.server 8000
# 或使用其他静态服务器
```

然后在浏览器打开 http://localhost:8000

### 在Android设备上运行

```bash
# 连接Android设备并启用USB调试
adb devices

# 编译并安装到设备
cordova run android
```

### 构建APK

```bash
# 构建发布版本
cordova build android --release
```

## 项目结构

```
RUthirsty-cordova/
├── config.xml           # Cordova配置文件
├── package.json         # NPM配置
├── www/                 # 应用源码目录
│   ├── index.html       # 主页面
│   ├── cordova.js       # Cordova SDK（自动生成）
│   ├── css/
│   │   └── style.css    # 样式文件
│   └── js/
│       └── app.js       # 应用逻辑
└── README.md            # 项目说明
```

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画（渐变、阴影、动画效果）
- **JavaScript (ES6)** - 应用逻辑
- **Cordova** - 跨平台移动应用框架
- **LocalStorage** - 数据持久化

## 主要功能说明

### 打卡功能

点击主屏幕中央的圆形打卡按钮，系统会记录当前时间并保存到本地存储。打卡时会有震动反馈和视觉动画效果。

### 统计数据

- **今日已喝** - 显示当天的打卡次数
- **累计天数** - 显示有打卡记录的天数（去重）

### 历史记录

- 按日期分组显示所有打卡记录
- 显示每次打卡的具体时间
- 显示总的打卡序号
- 支持清空所有记录

## 界面设计

应用采用深色科技风格：
- 深蓝紫色渐变背景
- 青色霓虹灯光效果
- 玻璃态（Glassmorphism）卡片设计
- 流畅的水波纹动画
- 响应式布局，适配不同屏幕尺寸

## 兼容性

- Android 5.0+ (API 21+)
- iOS 11.0+ (如需支持iOS)

## 许可证

Apache License 2.0

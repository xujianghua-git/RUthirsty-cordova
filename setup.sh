#!/bin/bash

echo "================================"
echo "RUthirsty - 喝水打卡应用"
echo "================================"
echo ""

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 请先安装 Node.js"
    exit 1
fi

echo "✓ Node.js 已安装"

# 检查npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未找到"
    exit 1
fi

echo "✓ npm 已安装"
echo ""

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 检查Cordova
if ! command -v cordova &> /dev/null; then
    echo ""
    echo "📱 安装 Cordova CLI..."
    npm install -g cordova
fi

echo "✓ Cordova 已安装"
echo ""

echo "================================"
echo "✅ 安装完成！"
echo "================================"
echo ""
echo "下一步操作："
echo ""
echo "1. 安装Android平台:"
echo "   cordova platform add android"
echo ""
echo "2. 安装插件:"
echo "   cordova plugin add cordova-plugin-device"
echo "   cordova plugin add cordova-plugin-vibration"
echo "   cordova plugin add cordova-plugin-dialogs"
echo "   cordova plugin add cordova-plugin-statusbar"
echo "   cordova plugin add cordova-plugin-splashscreen"
echo ""
echo "3. 在浏览器中测试:"
echo "   cd www && python3 -m http.server 8000"
echo ""
echo "4. 在Android设备上运行:"
echo "   cordova run android"
echo ""
echo "5. 构建APK:"
echo "   cordova build android --release"
echo ""

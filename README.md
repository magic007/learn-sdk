
# 如何从零自己编写一个JavaScript语言 SDK
本项目是一个教大家如何开发一个小程序跨平台SDK项目，他能帮助一些不好开发SDK的朋友来学习SDK开发，从零开始搭建一个JavaScript SDK 过程最终形成本源码，讲解了SDK的设计理念，如何大家一个JavaScript SDK测试环境，如何实操一个SDK模块功能，如何实现跨平台，如何打包发布npm，如何生成开发文档以及在开发SDK中遇到的一些问题，最终解决这些问题，形成一个标准的SDK，如果你想构建一个JavaScript SDK，如果有更好的提议，可以提交pull ，希望本源码教程能帮助到你，从零开始，我们一起出发。



## 安装使用

直接在页面使用

```
<script src="js/sdk-1.2.0.min.js"></script>
```

或者直接`npm` 安装

```
npm install learn-sdk
```

> 推荐npm方式使用源码

## 教程地址wiki

https://github.com/magic007/learn-sdk/wiki

## 基于本源码开发sdk

**步骤一**

```
npm install learn-sdk
```

**步骤二**

阅读上面JavaScript SDK开发教程地址

**步骤三**

运行开发环境

```
npm run dev
```

**步骤四**

```
src/lib/下面建立自己的SDK逻辑
```

跟进需求开发自己的SDK




## 源码目录

```
.
├── README.md  
├── config  //配置文件目录
│   ├── dev.env.js
│   └── pro.env.js
├── dist	//打包后SDK目录
│   └── sdk-1.2.0.min.js
├── index.js //入口文件
├── package-lock.json  //包依赖管理文件
├── package.json //包依赖管理文件
├── src //源码目录
│   ├── index.html
│   ├── index.js
│   └── lib
└── webpack.config.js  //webpack 配置
```



## 版本记录

**V1.2.0** - 2020-11-04

>1.完善socket SDK示例

**V1.0.0** - 2020-11-03

>1.支持动态调试SDK

**V1.0.0** - 2020-11-02

>1.搭建基本框架
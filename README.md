# 中国天气 MCP 服务器

基于和风天气 API 的 Model Context Protocol (MCP) 服务器，提供中国地区天气查询功能。

## 项目结构

```
src/
├── index.ts              # 主入口文件
├── config/              # 配置文件
│   └── constants.ts     # 常量配置
├── types/               # 类型定义
│   └── weather.ts       # 天气相关类型
├── services/            # 服务层
│   └── qweather.ts      # 和风天气 API 服务
└── tools/               # MCP 工具定义
    ├── index.ts         # 工具注册器
    ├── citySearch.ts    # 城市搜索工具
    ├── currentWeather.ts # 实时天气工具
    ├── forecast.ts      # 天气预报工具
    ├── warnings.ts      # 天气预警工具
    └── utils.ts         # 辅助工具（帮助、测试等）
```

## 功能特性

### 核心功能

- 🔍 城市搜索：支持中国城市名称搜索
- 🌡️ 实时天气：获取当前天气状况
- 📅 天气预报：支持1-7天天气预报
- ⚠️ 天气预警：获取天气预警信息

### 辅助功能

- 📖 使用示例：展示工具使用方法
- 🧪 参数测试：测试参数传递功能
- ❓ 帮助文档：详细的使用说明

## 安装配置

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 API Key 和服务器地址

注册和风天气开发者账号并获取 API Key：

- 访问 [和风天气开发平台](https://dev.qweather.com/)
- 注册账号并创建应用
- 获取 API Key

设置环境变量：

**方法一：直接设置环境变量**

```bash
# 必需：API Key
export QWEATHER_API_KEY="your-api-key-here"

# 可选：自定义API服务器地址（默认使用和风天气官方地址）
export QWEATHER_API_BASE="https://devapi.qweather.com/v7"
export QWEATHER_GEO_API="https://geoapi.qweather.com/v2"
```

**方法二：使用 .env 文件**

```bash
# 复制示例环境变量文件
cp .env.example .env

# 编辑 .env 文件，填入您的配置
# 注意：需要安装 dotenv 包来加载 .env 文件
```

**注意：** 如果您使用的是私有部署的和风天气服务器或其他兼容的天气API服务器，可以通过 `QWEATHER_API_BASE` 和 `QWEATHER_GEO_API` 环境变量自定义服务器地址。

### 3. 编译项目

```bash
npm run build
```

### 4. MCP 配置

在 Claude Desktop 的配置文件中添加以下配置：

```json
{
  "mcpServers": {
    "qweather": {
      "command": "node",
      "args": ["your-project-path/build/index.js"],
      "env": {
        "QWEATHER_API_KEY": "your-api-key-here",
        "QWEATHER_API_BASE": "your-api-base-url",
        "QWEATHER_GEO_API": "your-geo-api-url"
      }
    }
  }
}
```

**注意：**

- 请将 `your-api-key-here` 替换为您的实际 API Key
- 根据您的 Node.js 安装路径调整 `command` 字段
- 根据您的项目路径调整 `args` 中的路径

### 5. 运行服务器

```bash
node build/index.js
```

## 工具使用说明

### 🔍 正确的使用流程

**重要：** 进行任何天气查询前，必须先调用 `search-city` 获取准确的坐标信息！

#### 步骤1：搜索城市获取坐标

```json
{
  "cityName": "北京"
}
```

返回示例：

```
城市：北京 (北京市 北京市)
ID：101010100
坐标：116.4074,39.9042
📍 用于天气查询的location参数：116.4074,39.9042
```

#### 步骤2：使用坐标进行天气查询

使用从步骤1获得的坐标作为location参数：

### 1. search-city - 搜索城市（必须先调用）

```json
{
  "cityName": "北京"
}
```

### 2. get-current-weather - 获取实时天气

```json
{
  "location": "116.4074,39.9042"
}
```

### 3. get-weather-forecast - 获取天气预报

```json
{
  "location": "116.4074,39.9042",
  "days": 5
}
```

### 4. get-weather-warnings - 获取天气预警

```json
{
  "location": "116.4074,39.9042"
}
```

### 5. get-help - 获取帮助

```json
{}
```

### 6. test-echo - 测试参数

```json
{
  "message": "测试消息",
  "number": 123
}
```

### 7. get-weather-example - 查看示例

```json
{
  "exampleCity": "杭州"
}
```

## 支持的城市

支持中国大陆所有地级市及以上城市，包括但不限于：

- 直辖市：北京、上海、天津、重庆
- 省会城市：广州、深圳、杭州、南京、成都、武汉、西安等
- 其他主要城市：苏州、长沙、郑州、青岛、大连、宁波、无锡等

## API 限制

### 免费版本

- 每日请求次数有限制
- 支持基础天气数据

### 商业版本

- 无请求次数限制
- 支持更多高级功能

## 错误处理

服务器具备完善的错误处理机制：

- API 请求失败重试
- 参数验证
- 详细的错误信息返回
- 日志记录

## 开发指南

### 添加新工具

1. 在 `src/tools/` 目录下创建新的工具文件
2. 在 `src/types/weather.ts` 中添加相关类型定义
3. 在 `src/tools/index.ts` 中注册新工具

### 修改配置

配置项集中在 `src/config/constants.ts` 中，便于管理和修改。

### 扩展服务

可以在 `src/services/` 目录下添加新的服务提供商支持。

## 许可证

本项目采用 ISC 许可证。

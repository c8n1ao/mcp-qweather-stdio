#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { SERVER_CONFIG, QWEATHER_CONFIG } from './config/constants.js'
import { QWeatherService } from './services/qweather.js'
import { registerWeatherTools } from './tools/index.js'

/**
 * 中国天气 MCP 服务器主入口
 * 基于和风天气 API 提供天气查询服务
 */
async function main() {
  // 创建 MCP 服务器实例
  const server = new McpServer({
    name: SERVER_CONFIG.NAME,
    version: SERVER_CONFIG.VERSION,
  })

  // 创建和风天气服务实例
  const weatherService = new QWeatherService()

  // 注册所有天气工具
  registerWeatherTools(server, weatherService)

  // 启动服务器
  const transport = new StdioServerTransport()
  await server.connect(transport)

  // 输出启动信息
  console.error('�️ 中国天气 MCP 服务器已启动')
  console.error(`📦 服务器名称: ${SERVER_CONFIG.NAME}`)
  console.error(`🔖 版本: ${SERVER_CONFIG.VERSION}`)
  console.error('🌐 API 提供商: 和风天气 (QWeather)')
  console.error('')
  console.error('📋 可用工具:')
  console.error('   🔍 search-city - 搜索中国城市')
  console.error('   🌡️ get-current-weather - 获取实时天气')
  console.error('   📅 get-weather-forecast - 获取天气预报')
  console.error('   ⚠️ get-weather-warnings - 获取天气预警')
  console.error('   📖 get-weather-example - 查看使用示例')
  console.error('   🧪 test-echo - 测试参数传递')
  console.error('   ❓ get-help - 获取帮助信息')
  console.error('')
  console.error('💡 快速开始:')
  console.error('   1. 使用 get-help 查看详细帮助')
  console.error('   2. 使用 get-weather-example 查看参数格式')
  console.error('   3. 使用 get-current-weather 查询实时天气')
  console.error('')
  console.error('📝 参数格式示例:')
  console.error('   查询天气: {"location": "北京"}')
  console.error('   天气预报: {"location": "上海", "days": 5}')
  console.error('   搜索城市: {"cityName": "广州"}')

  // 检查 API Key 配置
  if (!weatherService.isApiKeyConfigured()) {
    console.error('')
    console.error('⚠️  警告: 请配置和风天气 API Key')
    console.error('🔧 设置环境变量: export QWEATHER_API_KEY="your-api-key"')
    console.error('🔗 获取 API Key: https://dev.qweather.com/')
    console.error('💰 免费版本每日限量调用，商业版本无限制')
  } else {
    console.error('✅ API Key 已配置')
    console.error(`API Key: ${QWEATHER_CONFIG.API_KEY.slice(0, 4)}`)
  }

  console.error('')
  console.error('🚀 服务器运行中，等待 LLM 调用...')
}

// 启动服务器并处理错误
main().catch((error) => {
  console.error('❌ 服务器启动失败:', error)
  process.exit(1)
})

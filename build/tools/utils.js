import { z } from 'zod';
/**
 * 帮助和测试工具
 */
/**
 * 帮助工具
 */
export function createHelpTool() {
    return {
        name: 'get-help',
        description: '获取中国天气 MCP 服务器的使用帮助和参数格式说明',
        inputSchema: {},
        handler: async () => {
            return {
                content: [
                    {
                        type: 'text',
                        text: `🌤️ 中国天气 MCP 服务器帮助文档

📋 可用工具及参数格式：

1. 🔍 search-city - 搜索中国城市
   📝 参数格式: {"cityName": "城市名称"}
   🌟 示例: {"cityName": "北京"}
   💡 说明: 用于搜索城市并获取城市ID

2. 🌡️ get-current-weather - 获取实时天气
   📝 参数格式: {"location": "城市名称"}
   🌟 示例: {"location": "上海"}
   💡 说明: 获取指定城市的当前天气状况

3. 📅 get-weather-forecast - 获取天气预报
   📝 参数格式: {"location": "城市名称", "days": 天数}
   🌟 示例: {"location": "广州", "days": 5}
   💡 说明: days参数可选，默认3天，范围1-7天

4. ⚠️ get-weather-warnings - 获取天气预警
   📝 参数格式: {"location": "城市名称"}
   🌟 示例: {"location": "深圳"}
   💡 说明: 获取指定城市的天气预警信息

5. 📖 get-weather-example - 查看使用示例
   📝 参数格式: {"exampleCity": "城市名称"}
   🌟 示例: {"exampleCity": "杭州"}
   💡 说明: 展示所有工具的正确使用方法

6. 🧪 test-echo - 测试参数传递
   📝 参数格式: {"message": "测试消息", "number": 数字}
   🌟 示例: {"message": "hello", "number": 123}

7. ❓ get-help - 显示此帮助信息
   📝 参数格式: {} (无需参数)

🏙️ 支持的城市示例：
北京、上海、广州、深圳、杭州、南京、成都、武汉、西安、重庆、天津、苏州、长沙、郑州、青岛、大连、宁波、无锡、福州、厦门、昆明、哈尔滨、济南、佛山、长春、温州、石家庄、南宁、贵阳、泉州、南昌、金华、常州、嘉兴、台州、徐州、盐城、潍坊、保定等

⚠️ 重要提示：
- 🔑 需要配置和风天气 API Key (环境变量 QWEATHER_API_KEY)
- 📊 免费版本有调用次数限制
- 🇨🇳 支持中国大陆所有地级市及以上城市
- 📝 参数必须严格按照 JSON 格式传递
- 🏮 城市名称请使用中文

🔧 快速开始：
1. 先使用 get-weather-example 查看示例
2. 使用 get-current-weather 查询实时天气
3. 使用 get-weather-forecast 查询未来天气

🌐 API 提供商：和风天气 (QWeather)`,
                    },
                ],
            };
        },
    };
}
/**
 * 测试回显工具
 */
export function createTestEchoTool() {
    return {
        name: 'test-echo',
        description: '测试参数传递功能，回显输入的参数',
        inputSchema: {
            message: z.string().describe('测试消息'),
            number: z.number().optional().describe('可选的数字参数'),
        },
        handler: async (args) => {
            return {
                content: [
                    {
                        type: 'text',
                        text: `🧪 参数传递测试成功！

📝 接收到的消息: "${args.message}"
🔢 接收到的数字: ${args.number || '未提供'}
✅ 参数传递正常工作`,
                    },
                ],
            };
        },
    };
}
/**
 * 使用示例工具
 */
export function createExampleTool() {
    return {
        name: 'get-weather-example',
        description: '查看天气查询工具的使用示例和参数格式',
        inputSchema: {
            exampleCity: z
                .string()
                .optional()
                .describe('示例城市名称，可选参数，默认为北京'),
        },
        handler: async ({ exampleCity }) => {
            const cityName = exampleCity || '北京';
            return {
                content: [
                    {
                        type: 'text',
                        text: `📖 天气查询工具使用示例

🏙️ 以 "${cityName}" 为例：

1. 🔍 搜索城市：
   工具: search-city
   参数: {"cityName": "${cityName}"}
   用途: 查找城市信息和ID

2. 🌡️ 查询实时天气：
   工具: get-current-weather  
   参数: {"location": "${cityName}"}
   用途: 获取当前天气状况

3. 📅 查询3天天气预报：
   工具: get-weather-forecast
   参数: {"location": "${cityName}", "days": 3}
   用途: 获取未来3天天气预报

4. 📅 查询7天天气预报：
   工具: get-weather-forecast
   参数: {"location": "${cityName}", "days": 7}
   用途: 获取未来7天天气预报

5. ⚠️ 查询天气预警：
   工具: get-weather-warnings
   参数: {"location": "${cityName}"}
   用途: 获取天气预警信息

💡 参数格式说明：
- 所有参数都必须用双引号包围
- location 和 cityName 参数是必需的
- days 参数是可选的，默认为3，范围1-7
- 城市名称请使用中文全称

🎯 推荐使用流程：
1. 如不确定城市名称，先用 search-city 搜索
2. 使用 get-current-weather 查看当前天气
3. 使用 get-weather-forecast 查看未来天气
4. 如需要，使用 get-weather-warnings 查看预警信息`,
                    },
                ],
            };
        },
    };
}

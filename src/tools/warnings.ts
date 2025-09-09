import { z } from 'zod'
import { QWeatherService } from '../services/qweather.js'
import type { WeatherQueryParams } from '../types/weather.js'

/**
 * 天气预警查询工具
 */
export function createWarningsTool(weatherService: QWeatherService) {
  return {
    name: 'get-weather-warnings',
    description:
      '获取指定城市的天气预警信息。【重要】使用前必须先调用 search-city 工具获取目标城市的准确经纬度坐标，然后使用获得的坐标（格式：经度,纬度，如"116.4074,39.9042"）作为location参数。',
    inputSchema: {
      location: z
        .string()
        .min(2)
        .describe(
          '位置信息。优先使用经纬度坐标（格式：经度,纬度，如"116.4074,39.9042"），这是从search-city工具获得的。也可以使用城市名称，但可能不够精确。'
        ),
    },
    handler: async ({ location }: WeatherQueryParams) => {
      const warningData = await weatherService.getWeatherWarnings(location)

      if (!warningData) {
        return {
          content: [
            {
              type: 'text',
              text: `获取 "${location}" 的天气预警信息失败`,
            },
          ],
        }
      }

      if (!warningData.warning || warningData.warning.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `📍 ${location} 当前无天气预警`,
            },
          ],
        }
      }

      const warnings = warningData.warning
        .map((warning) =>
          [
            `⚠️ ${warning.title}`,
            `📊 等级：${warning.level}`,
            `🏷️ 类型：${warning.typeName}`,
            `📅 发布时间：${warning.pubTime}`,
            `⏰ 生效时间：${warning.startTime} ~ ${warning.endTime}`,
            `📋 状态：${warning.status}`,
            `📝 内容：${warning.text}`,
            `📤 发布机构：${warning.sender}`,
            '---',
          ].join('\n')
        )
        .join('\n')

      return {
        content: [
          {
            type: 'text',
            text: `📍 ${location} 天气预警：\n\n${warnings}`,
          },
        ],
      }
    },
  }
}

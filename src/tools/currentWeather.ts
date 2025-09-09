import { z } from 'zod'
import { QWeatherService } from '../services/qweather.js'
import type { WeatherQueryParams } from '../types/weather.js'

/**
 * 实时天气查询工具
 */
export function createCurrentWeatherTool(weatherService: QWeatherService) {
  return {
    name: 'get-current-weather',
    description:
      '获取指定城市的实时天气信息。【重要】使用前必须先调用 search-city 工具获取目标城市的准确经纬度坐标，然后使用获得的坐标（格式：经度,纬度，如"116.4074,39.9042"）作为location参数。',
    inputSchema: {
      location: z
        .string()
        .min(2)
        .describe(
          '位置信息。优先使用经纬度坐标（格式：经度,纬度，如"116.4074,39.9042"），这是从search-city工具获得的。也可以使用城市名称，但可能不够精确。'
        ),
    },
    handler: async ({ location }: WeatherQueryParams) => {
      const weatherData = await weatherService.getCurrentWeather(location)

      if (!weatherData) {
        return {
          content: [
            {
              type: 'text',
              text: `获取 "${location}" 的天气信息失败，请检查城市名称或 API Key 配置`,
            },
          ],
        }
      }

      const weather = weatherData.now
      const weatherInfo = [
        `📍 ${location} 实时天气`,
        `🌡️ 温度：${weather.temp}°C（体感：${weather.feelsLike}°C）`,
        `🌤️ 天气：${weather.text}`,
        `💨 风力：${weather.windDir} ${weather.windScale}级 ${weather.windSpeed}km/h`,
        `💧 湿度：${weather.humidity}%`,
        `🌧️ 降水量：${weather.precip}mm`,
        `🔍 能见度：${weather.vis}km`,
        `☁️ 云量：${weather.cloud}%`,
        `📊 气压：${weather.pressure}hPa`,
        `💦 露点温度：${weather.dew}°C`,
        `⏰ 观测时间：${weather.obsTime}`,
      ].join('\n')

      return {
        content: [
          {
            type: 'text',
            text: weatherInfo,
          },
        ],
      }
    },
  }
}

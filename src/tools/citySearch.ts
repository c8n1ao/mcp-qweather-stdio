import { z } from 'zod'
import { QWeatherService } from '../services/qweather.js'
import type { CitySearchParams } from '../types/weather.js'

/**
 * 城市搜索工具
 */
export function createCitySearchTool(weatherService: QWeatherService) {
  return {
    name: 'search-city',
    description:
      '【重要】搜索中国城市，获取城市的经纬度坐标和ID。这是所有天气查询的前置步骤：在调用任何天气相关工具（get-current-weather、get-weather-forecast、get-weather-warnings）之前，必须先调用此工具获取目标城市的准确坐标。',
    inputSchema: {
      cityName: z
        .string()
        .min(2)
        .describe(
          '城市名称（必须提供）。支持格式：北京、上海、广州、深圳、成都、杭州、南京、武汉、西安、重庆等中国城市名称'
        ),
    },
    handler: async ({ cityName }: CitySearchParams) => {
      const cityData = await weatherService.searchCity(cityName)

      if (!cityData || !cityData.location || cityData.location.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `未找到城市 "${cityName}"，请检查城市名称是否正确`,
            },
          ],
        }
      }

      const cities = cityData.location
        .map((city) => {
          const coordinates = `${city.lon},${city.lat}`
          return [
            `城市：${city.name} (${city.adm1} ${city.adm2})`,
            `ID：${city.id}`,
            `坐标：${coordinates}`,
            `📍 用于天气查询的location参数：${coordinates}`,
            '---',
          ].join('\n')
        })
        .join('\n')

      return {
        content: [
          {
            type: 'text',
            text: `找到以下城市：\n\n${cities}\n\n💡 提示：使用上述坐标（经度,纬度格式）作为其他天气工具的location参数，可获得最准确的结果。`,
          },
        ],
      }
    },
  }
}

import { QWEATHER_CONFIG } from '../config/constants.js'
import type {
  BaseQWeatherResponse,
  CitySearchResponse,
  CurrentWeatherResponse,
  DailyForecastResponse,
  WeatherWarningResponse,
} from '../types/weather.js'

/**
 * 和风天气 API 服务类
 */
export class QWeatherService {
  private readonly apiKey: string
  private readonly baseUrl: string
  private readonly geoUrl: string

  constructor() {
    this.apiKey = QWEATHER_CONFIG.API_KEY
    this.baseUrl = QWEATHER_CONFIG.API_BASE
    this.geoUrl = QWEATHER_CONFIG.GEO_API
  }

  /**
   * 通用 API 请求方法
   */
  private async makeRequest<T extends BaseQWeatherResponse>(
    url: string
  ): Promise<T | null> {
    try {
      console.log(`🌐 QWeather API Request: ${url}`)

      const response = await fetch(url, {
        headers: {
          'X-QW-Api-Key': this.apiKey,
          'Content-Type': 'application/json',
        },
      })

      console.log(
        `📡 Response Status: ${response.status} ${response.statusText}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = (await response.json()) as T

      // 打印响应基本信息
      console.log(`📊 Response Code: ${data.code}`)
      if (data.code === '200') {
        console.log(`✅ API Request Successful`)
      } else {
        console.log(`❌ API Request Failed: ${data.code}`)
      }

      // 和风天气 API 返回格式检查
      if (data.code !== '200') {
        console.error(`QWeather API error: ${data.code}`)
        return null
      }

      return data
    } catch (error) {
      console.error('❌ Error making QWeather request:', error)
      return null
    }
  }

  /**
   * 搜索城市
   */
  async searchCity(cityName: string): Promise<CitySearchResponse | null> {
    const url = `${this.geoUrl}/city/lookup?location=${encodeURIComponent(
      cityName
    )}`
    return this.makeRequest<CitySearchResponse>(url)
  }

  /**
   * 获取实时天气
   */
  async getCurrentWeather(
    location: string
  ): Promise<CurrentWeatherResponse | null> {
    const url = `${this.baseUrl}/weather/now?location=${encodeURIComponent(
      location
    )}`
    return this.makeRequest<CurrentWeatherResponse>(url)
  }

  /**
   * 获取天气预报
   */
  async getWeatherForecast(
    location: string,
    days: number
  ): Promise<DailyForecastResponse | null> {
    const url = `${this.baseUrl}/weather/${days}d?location=${encodeURIComponent(
      location
    )}`

    return this.makeRequest<DailyForecastResponse>(url)
  }

  /**
   * 获取天气预警
   */
  async getWeatherWarnings(
    location: string
  ): Promise<WeatherWarningResponse | null> {
    const url = `${this.baseUrl}/warning/now?location=${encodeURIComponent(
      location
    )}`
    return this.makeRequest<WeatherWarningResponse>(url)
  }

  /**
   * 检查 API Key 是否已配置
   */
  isApiKeyConfigured(): boolean {
    return this.apiKey !== 'your-api-key-here'
  }
}

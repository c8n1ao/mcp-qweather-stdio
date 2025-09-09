/**
 * 和风天气 API 接口类型定义
 */

// 基础响应接口
export interface BaseQWeatherResponse {
  code: string
  updateTime?: string
  fxLink?: string
}

// 城市搜索相关接口
export interface CityLocation {
  name: string
  id: string
  lat: string
  lon: string
  adm1: string // 省份
  adm2: string // 城市
  country: string
  type: string
}

export interface CitySearchResponse extends BaseQWeatherResponse {
  location: CityLocation[]
}

// 实时天气相关接口
export interface CurrentWeather {
  obsTime: string
  temp: string
  feelsLike: string
  text: string
  wind360: string
  windDir: string
  windScale: string
  windSpeed: string
  humidity: string
  precip: string
  pressure: string
  vis: string
  cloud: string
  dew: string
}

export interface CurrentWeatherResponse extends BaseQWeatherResponse {
  now: CurrentWeather
}

// 天气预报相关接口
export interface DailyForecast {
  fxDate: string
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moonPhase: string
  tempMax: string
  tempMin: string
  textDay: string
  textNight: string
  wind360Day: string
  windDirDay: string
  windScaleDay: string
  windSpeedDay: string
  wind360Night: string
  windDirNight: string
  windScaleNight: string
  windSpeedNight: string
  humidity: string
  precip: string
  pressure: string
  vis: string
  cloud: string
  uvIndex: string
}

export interface DailyForecastResponse extends BaseQWeatherResponse {
  daily: DailyForecast[]
}

// 天气预警相关接口
export interface WeatherWarning {
  id: string
  sender: string
  pubTime: string
  title: string
  startTime: string
  endTime: string
  status: string
  level: string
  type: string
  typeName: string
  text: string
}

export interface WeatherWarningResponse extends BaseQWeatherResponse {
  warning: WeatherWarning[]
}

// 工具参数类型
export interface CitySearchParams {
  cityName: string
}

export interface WeatherQueryParams {
  location: string
}

export interface ForecastParams extends WeatherQueryParams {
  days?: number
}

export interface TestEchoParams {
  message: string
  number?: number
}

export interface ExampleParams {
  exampleCity?: string
}

/**
 * 和风天气 API 配置常量
 */
export const QWEATHER_CONFIG = {
    API_BASE: process.env.QWEATHER_API_BASE || 'https://devapi.qweather.com/v7',
    GEO_API: process.env.QWEATHER_GEO_API || 'https://geoapi.qweather.com/geo/v2/',
    API_KEY: process.env.QWEATHER_API_KEY ||
        'your-api-key-here' /** YOUR QWEATHER_API_KEY */,
};
/**
 * MCP 服务器配置
 */
export const SERVER_CONFIG = {
    NAME: 'china-weather',
    VERSION: '1.0.0',
};
/**
 * API 请求配置
 */
export const REQUEST_CONFIG = {
    TIMEOUT: 10000, // 10秒超时
    MAX_RETRIES: 3,
};

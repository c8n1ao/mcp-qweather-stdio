import { z } from 'zod';
/**
 * 天气预报查询工具
 */
export function createForecastTool(weatherService) {
    return {
        name: 'get-weather-forecast',
        description: '获取指定城市的天气预报（未来3-7天）。【重要】使用前必须先调用 search-city 工具获取目标城市的准确经纬度坐标，然后使用获得的坐标（格式：经度,纬度，如"116.4074,39.9042"）作为location参数。',
        inputSchema: {
            location: z
                .string()
                .min(2)
                .describe('位置信息。优先使用经纬度坐标（格式：经度,纬度，如"116.4074,39.9042"），这是从search-city工具获得的。也可以使用城市名称，但可能不够精确。'),
            days: z
                .number()
                .min(1)
                .max(7)
                .default(3)
                .describe('预报天数，1-7天之间的整数，默认为3天。例如：3表示未来3天，7表示未来7天'),
        },
        handler: async ({ location, days = 3 }) => {
            const forecastData = await weatherService.getWeatherForecast(location, days);
            if (!forecastData) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `获取 "${location}" 的天气预报失败，请检查城市名称或 API Key 配置`,
                        },
                    ],
                };
            }
            const forecasts = forecastData.daily
                .map((day) => [
                `📅 ${day.fxDate}`,
                `🌡️ 温度：${day.tempMin}°C ~ ${day.tempMax}°C`,
                `🌅 白天：${day.textDay}`,
                `🌙 夜间：${day.textNight}`,
                `💨 风力：白天 ${day.windDirDay} ${day.windScaleDay}级，夜间 ${day.windDirNight} ${day.windScaleNight}级`,
                `💧 湿度：${day.humidity}%`,
                `🌧️ 降水量：${day.precip}mm`,
                `☀️ 紫外线指数：${day.uvIndex}`,
                `🌅 日出：${day.sunrise} | 🌇 日落：${day.sunset}`,
                `🌙 月出：${day.moonrise} | 🌚 月落：${day.moonset} | 🌛 月相：${day.moonPhase}`,
                '---',
            ].join('\n'))
                .join('\n');
            return {
                content: [
                    {
                        type: 'text',
                        text: `📍 ${location} ${days}天天气预报：\n\n${forecasts}`,
                    },
                ],
            };
        },
    };
}

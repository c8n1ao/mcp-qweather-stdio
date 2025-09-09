import { createCitySearchTool } from './citySearch.js';
import { createCurrentWeatherTool } from './currentWeather.js';
import { createForecastTool } from './forecast.js';
import { createWarningsTool } from './warnings.js';
import { createHelpTool, createTestEchoTool, createExampleTool, } from './utils.js';
/**
 * 注册所有天气相关工具到 MCP 服务器
 */
export function registerWeatherTools(server, weatherService) {
    // 天气功能工具
    const citySearchTool = createCitySearchTool(weatherService);
    const currentWeatherTool = createCurrentWeatherTool(weatherService);
    const forecastTool = createForecastTool(weatherService);
    const warningsTool = createWarningsTool(weatherService);
    // 辅助工具
    const helpTool = createHelpTool();
    const testEchoTool = createTestEchoTool();
    const exampleTool = createExampleTool();
    // 注册所有工具 - 使用正确的参数顺序和类型
    server.tool(citySearchTool.name, citySearchTool.description, citySearchTool.inputSchema, citySearchTool.handler);
    server.tool(currentWeatherTool.name, currentWeatherTool.description, currentWeatherTool.inputSchema, currentWeatherTool.handler);
    server.tool(forecastTool.name, forecastTool.description, forecastTool.inputSchema, forecastTool.handler);
    server.tool(warningsTool.name, warningsTool.description, warningsTool.inputSchema, warningsTool.handler);
    server.tool(helpTool.name, helpTool.description, helpTool.inputSchema, helpTool.handler);
    server.tool(testEchoTool.name, testEchoTool.description, testEchoTool.inputSchema, testEchoTool.handler);
    server.tool(exampleTool.name, exampleTool.description, exampleTool.inputSchema, exampleTool.handler);
}

/**
 * @file Node.js 服务器入口文件
 * @description 负责开发环境配置和服务器启动，提供 SSR 运行时环境
 */
declare const _default: {
    /**
     * 配置开发环境的应用创建器
     * @description 创建并配置 Rspack 应用实例，用于开发环境的构建和热更新
     */
    devApp(esmx: import("@esmx/core").Esmx): Promise<import("@esmx/core").App>;
    /**
     * 配置并启动 HTTP 服务器
     * @description 创建 HTTP 服务器实例，集成 Esmx 中间件，处理 SSR 请求
     */
    server(esmx: import("@esmx/core").Esmx): Promise<void>;
};
export default _default;
//# sourceMappingURL=entry.node.d.ts.map
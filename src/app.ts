// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export { default as request } from './aop/request'
export { default as layout } from './aop/layout'
export { default as rootContainer } from './aop/rootContainer'
export { getInitialState as getInitialState } from './aop/getInitialState'
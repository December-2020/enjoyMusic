// const plugins = [];//插件数组
// if (process.env.NODE_ENV === 'production') {
//     //判断如果是生产环境 添加去除输出插件
//   plugins.push('transform-remove-console');
// }
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // plugins: plugins//添加插件
}

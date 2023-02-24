module.exports = {
    plugins: [
        'autoprefixer',
        ['postcss-pxtorem', {
          rootValue: 75, // //75表示750设计稿，37.5表示375设计稿
          unitPrecision: 3, 
          propList: ['*'],
          exclude: /(node_module)/, // 默认false，，过滤/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，就不要过滤
          mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
          minPixelValue: 1 // 设置要替换的最小像素值
        }]
      ]
  };
  

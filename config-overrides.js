const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
  //实现antd的按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    //修改主题颜色            
    modifyVars: {'@primary-color': '#1DA57A'}
  })
);

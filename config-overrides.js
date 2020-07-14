const { override, addDecoratorsLegacy, fixBabelImports } = require("customize-cra");
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    }),
    addDecoratorsLegacy()//配置装饰器
);
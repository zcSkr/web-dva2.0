import path from 'path';

export default function (webpackConfig, env) {
  const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
    path.resolve(__dirname, 'src/assets/'), // 2. 自己私人的 svg 存放目录
  ];

  webpackConfig.module.rules.unshift({
    test: /\.svg$/i,
    use: 'svg-sprite-loader',
    include: svgDirs,
  });

  return webpackConfig;
};
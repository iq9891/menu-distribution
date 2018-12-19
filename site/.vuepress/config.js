const path = require('path');

const resolve = p => path.resolve(__dirname, '../../', p);

const base = process.env.GH ? '/menu-distribution/' : '/'

module.exports = {
  title: '分销商后台页面框架',
  base,
  head: [
    ['link', { rel: 'emmenudtbtion', href: `/logo.png` }]
  ],
  dest: './docs',
  serviceWorker: true,
  configureWebpack: {
    resolve: {
      alias: {
        helper: resolve('emmenudtbtion/helper'),
        assets: resolve('emmenudtbtion/assets'),
        message: resolve('emmenudtbtion/core/message'),
      }
    }
  },
  themeConfig: {
    repo: 'em-fe/menu-distribution',
    editLinks: false,
    docsDir: 'site',
    lastUpdated: '上次更新', // string | boolean
    searchMaxSuggestions: 5,
    editLinkText: '帮助我们改善此页面！',
    sidebar: [
      '/',
      '/layout',
      '/menu',
      '/bar',
    ]
  }
}

# 主菜单
> em 公共级左导航业务组件

<w-menu title="李红星" orgPath="http://www.evente.cn" :menus="menuTestRule" logo="https://2img.evente.cn/04/73/9c/da50756ce5f737490c1beb1cb9.jpg" class="demo" logoutAction="https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/getLoginOutCallBackUrl"></w-menu>

## API

### 属性

|参数|说明|类型|是否必填|默认值|
|---|----|---|-------|-----|
|logoutAction|退出登录的接口地址|String|否|false|
|menus|菜单配置|Array|否|false|
|active|选中字样，添加模块名一样|String|否|无|
|orgPath|主办后台地址|String|否|无|
|orgTarget|主办后台打开方式|String|否|'_self'|
|orgTitle|主办后台名称|String|否|'切换主办版'|
|title|顶部名字|String|否|无|
|logo|顶部名字|String|否|无|
|afterOut|退出之后触发|Function|否|() => {}|

### 方法

|事件名|说明|返回值|
|---|------|-----|
|analysised|获取菜单时触发|所有顶级权限|
|afterOut|退出之后触发|无|

<script>
import WMenu from '../emmenudtbtion/core/menu/Menu';
//  权限测试数据
import menuTestRule from './menudata';
//  环境地址配置
import envConf from './env';

export default {
  data() {
    return {
      env: envConf.production,
      menuTestRule,
    };
  },
  components: {
    WMenu,
  },
  methods: {
    getAllData(val){
      console.log('获取所有的值',val)
    }
  },
}
</script>

<style lang="scss">
@import '../emmenudtbtion/assets/css/menu.scss';

.demo {
  position: relative;
  height: 657px;
}

.page {
  position: relative;
  z-index: 9999;
  padding-left: 0;
  margin-left: 20rem;
}
</style>

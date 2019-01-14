<template>
  <div class="wd-menu-warp">
    <div class="wd-menu" :class="{'wd-menu-hover': hover}">
      <div class="wd-menu-header">
        <img class="wd-menu-header-icon" :src="logoValue" @error="errorFn">
        <a :href="headerLink" :target="headerTarget" class="wd-menu-header-title">{{title}}</a>
      </div>
      <ul class="wd-menu-list">
        <li class="wd-menu-list-item" v-for="(rule, ruleIndex) in menus" :key="ruleIndex">
          <router-link class="wd-menu-list-link" active-class="on" :to="rule.to">
            <img class="wd-menu-list-img" :src="require(`assets/img/${rule.icon}_normal.png`)">
            <img class="wd-menu-list-img" :src="require(`assets/img/${rule.icon}_selected.png`)">
            <span class="wd-menu-list-title">{{rule.name}}</span>
          </router-link>
          </a>
        </li>
      </ul>
      <a :href="orgPath" :target="orgTarget" class="wd-menu-release">
        <img class="wd-menu-release-img" :src="require(`assets/img/release.png`)">
        <span class="wd-menu-release-title">{{orgTitle}}</span>
      </a>
      <a class="wd-menu-quit" @click="modalShow = true">
        <img class="wd-menu-quit-img" :src="require(`assets/img/quit.png`)">
        <img class="wd-menu-quit-img" :src="require(`assets/img/quit_hover.png`)">
        <span class="wd-menu-quit-title">退出</span>
      </a>
    </div>
    <!-- 退出弹框 start -->
    <div class="wd-menu-modal" v-if="modalShow">
      <div class="wd-menu-modal-mask"></div>
      <div class="wd-menu-modal-wrap">
        <div class="wd-menu-modal-header">
          <div class="wd-menu-modal-inner">退出账号</div>
          <div class="wd-menu-modal-close" @click="modalShow = false">＋</div>
        </div>
        <div class="wd-menu-modal-main">确定要退出账号？</div>
        <div class="wd-menu-modal-footer">
          <button class="wd-menu-modal-cancel" @click="modalShow = false">取消</button>
          <button class="wd-menu-modal-ok" @click="modalOk">确定</button>
        </div>
      </div>
    </div>
    <!-- 退出弹框 end -->
  </div>
</template>
<script>
  import 'em-cookie';
  import 'em-jsonp';
  import message from 'message/index';
  import CONSTANT from 'helper/constant';
  import ajax from 'helper/ajax';

  export default {
    name: 'WMenuDtbtion',
    data() {
      return {
        // 调试一级黑色导航样式的时候可以为 true 方便调试
        hover: false,
        // hover: true,

        isMask: false,
        user: '',
        modalShow: false,
        callbackUrl: [],
        power: {},
        logoValue: '',
      };
    },
    props: {
      headerLink: {
        type: String,
        default: 'javascript:;',
      },
      headerTarget: {
        type: String,
        default: '_self',
      },
      orgPath: String,
      orgTitle: {
        type: String,
        default: '切换主办版',
      },
      orgTarget: {
        type: String,
        default: '_self',
      },
      active: {
        type: String,
        default: '',
      },
      logoutAction: String,
      afterOut: {
        type: Function,
        default: () => {},
      },
      menus: {
        type: Array,
        default: () => [],
      },
      title: String,
      logo: String,
    },
    computed: {
      activeValue() {
        return this.active;
      },
    },
    mounted() {
      this.handleData();
      this.logoValue = this.logo;
    },
    methods: {
      errorFn() {
        // 如果报错就是默认图片
        this.logoValue = 'https://static2.evente.cn/static/img/icon.jpg';
      },
      // 处理权限接口数据
      handleData() {
        this.$emit('analysised', this.power);
      },
      // 免费发活动和退出 start
      modalOk() {
        this.modalShow = false;
        this.goOut();
      },
      goOut() {
        ajax({
          type: 'GET',
          action: this.logoutAction,
          onSuccess: (res) => {
            if (res.code === CONSTANT.SUCCESS) {
              this.callbackUrl = res.data.url_list.slice();
              this.afterLogout(this.callbackUrl.length - 1);
            } else {
              message.error({
                content: res.message,
              });
            }
          },
          onError: (err, response) => {
            message.error({
              content: response.message,
            });
          },
        });
      },
      afterLogout(inow) {
        let theIndex = inow;
        window.$jsonp({
          url: this.callbackUrl[theIndex],
          success: (res) => {
            if (res.code === CONSTANT.SUCCESS) {
              if (theIndex === 0) {
                this.logoutSuc();
              } else {
                this.afterLogout(--theIndex);
              }
            } else {
              message.error({
                content: '登录失败',
              });
            }
          },
          error: () => {
            message.error({
              content: '登录失败',
            });
          },
        });
      },
      logoutSuc() {
        window.$cookie.remove(CONSTANT.EVENT_TOKE);
        window.$cookie.remove(CONSTANT.EVENT_USER);
        // 不加定时器，登录cookie还在
        setTimeout(() => {
          this.afterOut();
          this.$emit('afterOut');
        }, 0);
      },
      // 免费发活动和退出 end
    },
  };
</script>

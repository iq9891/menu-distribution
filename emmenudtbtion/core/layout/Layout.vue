<template>
  <div class="wd-layout" :class="{'on': !mainStatus}">
    <wd-menu :menus="menusValue" :orgTitle="orgTitle" :orgTarget="orgTarget" :orgPath="orgPath" :logo="logoValue" :title="menuTitleValue" :active="activeValue" :logoutAction="logoutAction" @analysised="analysised"></wd-menu>
    <wd-bar :navs="navsValue" :active="barActiveValue" :disabled="disabledValue" :title="barNameValue" :show="showStatus1" v-if="navsValue.length" :collapse="collapseValue" @collapsed="changeShowStatus"></wd-bar>
    <div class="wd-layout-main" :class="{'wd-layout-main-large': !navsValue.length}">
      <span class="wd-layout-collapse wd-layout-collapse-hide" v-show="!mainStatus" v-if="navsValue.length" @click="openBar">
        <img class="wd-bar-collapse-icon" :src="require('assets/img/corrw.png')">
      </span>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import WdBar from '../bar/Bar';
import WdMenu from '../menu/Menu';

export default {
  name: 'WLayoutDtbtion',
  data() {
    return {
      mainStatus: true,
      showStatus1: true,
    };
  },
  props: {
    barName: String,
    navs: {
      type: Array,
      default: () => [],
    },
    open: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    menuTitle: String,
    logo: String,
    orgPath: String,
    orgTarget: String,
    orgTitle: String,
    menus: {
      type: Array,
      default: () => [],
    },
    collapse: { // 是否有收起
      type: Boolean,
      default: true,
    },
    active: {
      type: String,
      default: '',
    },
    barActive: String,
    show: Boolean, // 二级是否显示
    logoutAction: String,
    rule: Object,
  },
  computed: {
    logoValue() {
      return this.logo;
    },
    menusValue() {
      return this.menus;
    },
    activeValue() {
      return this.active;
    },
    navsValue() {
      return this.navs.slice();
    },
    barActiveValue() {
      return this.barActive;
    },
    barNameValue() {
      return this.barName;
    },
    menuTitleValue() {
      return this.menuTitle;
    },
    disabledValue() {
      return this.disabled;
    },
    showStatus() {
      return this.show;
    },
    collapseValue() {
      return this.collapse;
    },
  },
  methods: {
    analysised(power) {
      this.$emit('analysised', power);
    },
    openBar() {
      this.showStatus1 = true;
      this.mainStatus = true;
    },
    changeShowStatus(val) {
      this.showStatus1 = val;
      this.updateMain(val);
    },
    updateMain(val) {
      this.mainStatus = val;
    },
  },
  components: {
    WdMenu,
    WdBar,
  },
};
</script>

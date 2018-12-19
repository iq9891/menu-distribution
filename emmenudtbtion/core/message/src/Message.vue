<template>
  <transition-group tag="div" class="wd-menu-message-box" name="fade">
    <div class="wd-menu-message-main" :class="[`wd-menu-message-${notice.type}`]" v-for="(notice, noticeIndex) in notices" :key="notice.name" :style="notice.style">
      <p class="wd-menu-message-text">{{ notice.content }}</p>
    </div>
  </transition-group>
</template>
<script>
let seed = 0;

export default {
  data() {
    return {
      notices: [],
    };
  },
  methods: {
    add(notice) {
      const name = `wd_name_${Date.now()}_${seed++}`;
      // 继承一下参数
      const newNotice = Object.assign({
        content: '',
        name,
        type: 'info',
        style: {},
        close() {},
      }, notice);
      // 添加到队列中
      this.notices.push(newNotice);
      // 自动关闭
      setTimeout(this.close.bind(this, name), notice.delayTime);
    },
    close(name) {
      this.notices.every((notice, noticeIndex) => {
        this.notices.splice(noticeIndex, 1);
        notice.close();
        return notice.name !== name;
      });
    },
  },
};
</script>

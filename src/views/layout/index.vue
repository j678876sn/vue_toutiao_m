<template>
    <div class="layout-container">
        <!-- 子路由出口 -->
        <router-view></router-view>

        <!-- 标签导航栏 -->
        <van-tabbar v-model="active" class="layout_tabber" route>
            <van-tabbar-item to="/">
                <i slot="icon" class="toutiao toutiao-shouye"></i>
                <span>首页</span>
            </van-tabbar-item>
            <van-tabbar-item to="/qa">
                <i slot="icon" class="toutiao toutiao-wenda"></i>
                <span>问答</span>
            </van-tabbar-item>
            <van-tabbar-item to="/video">
                <i slot="icon" class="toutiao toutiao-shipin"></i>
                <span>视频</span>
            </van-tabbar-item>
            <van-tabbar-item to="/my">
                <i slot="icon" class="toutiao toutiao-wode"></i>
                <span>{{$store.state.user?'我的':'未登录'}}</span>
            </van-tabbar-item>
        </van-tabbar>
        <!-- /标签导航栏 -->

    </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style lang="less" scoped>
.layout-container {
  .layout_tabber {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>

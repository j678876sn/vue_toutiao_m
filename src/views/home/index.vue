/* 首页 */
<template>
  <div class="home_container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button slot="title" round type="info" size="small" icon="search" class="search_btn" to="/search">
        搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="channel_tabs">
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <article-list :channel="item" />
      </van-tab>
      <!-- 右侧更多按钮 -->
      <template slot="nav-right">
        <div class="placeholder"></div>
        <div class="more_btn" @click="isChennelEditShow=true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
      <!-- /右侧更多按钮 -->
    </van-tabs>
    <!-- /频道列表 -->

    <!-- 频道编辑弹出层 -->
    <van-popup v-model="isChennelEditShow" closeable position="bottom" close-icon="close" :style="{ height: '100%' }"
      close-icon-position="top-left">
      <chennel-edit :myChannel="channels" :active="active" @update-active="onUpdateActive"
        @update-myChannel="onUpdateChannel"></chennel-edit>
    </van-popup>
    <!-- /频道编辑弹出层 -->


  </div>
</template>
<script>
import { getUserChannels } from "@/api/users.js";
import ArticleList from "./components/article-list";
import ChennelEdit from "./components/chennel-edit";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage.js";

export default {
  name: "HomeIndex",
  data() {
    return {
      active: 0,
      channels: [],
      isChennelEditShow: false //控制弹出层显示
    };
  },
  components: {
    ArticleList,
    ChennelEdit
  },
  created() {
    this.loadChannels();
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    // 获取频道列表
    async loadChannels() {
      try {
        /* const { data: res } = await getUserChannels();
          this.channels = res.data.channels; */

        let channel = [];

        if (this.user) {
          // 已登录
          const { data: res } = await getUserChannels();
          channel = res.data.channels;
        } else {
          // 未登录
          var localtoken = getItem("Token_Channel");
          if (localtoken) {
            channel = localtoken;
          } else {
            const { data: res } = await getUserChannels();
            channel = res.data.channels;
          }
        }

        this.channels = channel;
      } catch (err) {
        this.$toast("获取频道列表失败");
      }
    },
    onUpdateChannel(channel) {
      this.channels.push(channel);
    },
    onUpdateActive(index, isChennelEditShow = false) {
      this.active = index;
      this.isChennelEditShow = isChennelEditShow;
    }
  }
};
</script>

<style lang="less" scoped>
.home_container {
  padding-bottom: 100px;
  padding-top: 174px;

  // 添加scoped的样式无法作用到组件的子元素上，需要/deep/ ::v-deep
  ::v-deep.van-nav-bar__title {
    max-width: unset;
  }

  .search_btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
  }

  .van-icon {
    color: #fff;
    font-size: 32px;
  }

  /deep/.channel_tabs {
    .van-tabs__nav--line {
      padding-bottom: 0;
    }

    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;

      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    // 频道按钮底线
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .more_btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;

      i.toutiao {
        font-size: 33px;
      }

      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
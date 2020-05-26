<template>
  <div class="article_container">

    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text='refreshSuccessText'
      :success-duration='refreshSuccessTime'>

      <!-- 文章列表 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="van_list"
        :error.sync="error" error-text="请求失败，点击重新加载">

        <article-item v-for="(item,index) in list" :key="index" :title="item.title" :article='item' />

        <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.title">
          </van-cell> -->
      </van-list>
      <!-- /文章列表 -->
    </van-pull-refresh>
    <!-- /下拉刷新 -->
  </div>
</template>

<script>
import { getArticleList } from "@/api/article.js";
import { Toast } from "vant";
import ArticleItem from "@/components/article-item/index.vue";
export default {
  name: "ArticleList",
  data() {
    return {
      list: [], //存储列表数据
      loading: false, //控制加载中状态
      finished: false, //控制加载结束的状态
      timestamp: null, //获取下一页数据时间戳
      error: false,
      isLoading: false, //是否处于加载状态
      refreshSuccessText: "", //下拉刷新成功提示文本
      refreshSuccessTime: 1500 //下拉刷新提示成功持续时间
    };
  },
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoad() {
      // 获取列表数据
      try {
        const { data: res } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        });
        // 把请求的数据存储到list数组中
        const { results, pre_timestamp } = res.data;
        this.list.push(...results);
        // console.log(this.list);

        /* 测试错误提示
            *if (Math.random() > 0.1) {
            *JSON.parse('sasdsdsd')
          } */

        // 本次数据加载结束后，要把加载状态设为fales
        this.loading = false;
        // 判断数据是否已经加载完成
        if (results.length) {
          this.timestamp = pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        // this.$toast('获取新闻列表数据失败')
        // 展示错误提示
        this.error = true;
        // 阻止加载
        this.loading = false;
      }
    },
    // 下拉刷新功能
    async onRefresh() {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        });
        // 将数据追加到顶部
        const { results } = data.data;
        this.list.unshift(...results);
        // 关闭加载状态
        this.isLoading = false;
        this.refreshSuccessText = `刷新成功，更新了${results.length}条`;
      } catch (err) {
        this.refreshSuccessText = `刷新失败`;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.article_container {
  height: 79vh;
  overflow-y: auto;
}
</style>
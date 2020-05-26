<template>
    <div class="search-result">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :error.sync="error"
            error-text='加载失败，请重试'
        >
          <van-cell v-for="item in searchResults" :key="item.art_id" :title="item.title" />
        </van-list>
    </div>
</template>
<script>
import { getSearchResults } from "@/api/search.js";
// import ArticleItem from "@/components/article-item/index.vue";
export default {
  data() {
    return {
      searchResults: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    };
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  // components: {
  //   ArticleItem
  // },
  methods: {
    async onLoad() {
      try {
        // 请求数据
        const { data: res } = await getSearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        });
        // 将数据推送到数组中
        const results = res.data.results;
        this.searchResults.push(...results);
        // 关闭加载;
        this.loading = false;
        // 判断是否有下一页
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.finished = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>


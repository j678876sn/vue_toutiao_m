<template>
    <!-- 搜索页面 -->

    <div class="search-container">
        <!-- 搜索表单 -->
        <form action="/" class="search-form">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            background="#3296fa"
            @search="onSearch"
            @cancel="onCancel"
            @focus="isResultShow=false"
        />
        </form>
        <!-- /搜索表单 -->

         <!-- 搜索结果 -->
        <search-result 
        v-if="isResultShow"
        :search-text="searchText" 
        ></search-result>
        <!-- /搜索结果 -->

        <!-- 联想建议 -->
        <search-suggestion 
        :search-text="searchText" 
        v-else-if='searchText' 
        @search="onSearch" 
        ></search-suggestion>
        <!-- /联想建议 -->

        <!-- 搜索历史记录 -->
        <Search-history 
        v-else
        :search-histories="searchHistories"
        @clear-search-histories="searchHistories=[]"
        @search="onSearch"
        ></Search-history>
        <!-- /搜索历史记录 -->

       


    </div>
</template>
<script>
import SearchHistory from "@/views/search/components/search-history.vue";
import searchSuggestion from "@/views/search/components/search-suggestion.vue";
import searchResult from "@/views/search/components/search-result.vue";
import { setItem, getItem } from "@/utils/storage.js";
export default {
  data() {
    return {
      searchText: "",
      isResultShow: false,
      searchHistories: getItem("Token-search-histories") || [] //历史搜索记录数组
    };
  },
  components: {
    SearchHistory,
    searchResult,
    searchSuggestion
  },
  watch: {
    searchHistories(val) {
      setItem("Token-search-histories", val);
    }
  },
  methods: {
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val;
      // 存储历史记录
      // 注意：不能有重复
      const index = this.searchHistories.indexOf(val);
      if (index != -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(val);
      // 渲染搜索结果
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    }
  }
};
</script>
<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>


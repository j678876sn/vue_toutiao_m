<template>
    <div class="search-suggestion">
        <van-cell 
        v-for="(text,index) in searchSuggestions" 
        :key="index" 
        icon="search"
        @click="$emit('search',text)">

        <div slot="title" v-html='highlight(text)'></div>
        </van-cell>
    </div>
</template>
<script>
import { getSearchText } from "@/api/search.js";
// 按需加载：只会将用到的的成员打包到结果中
import { debounce } from "lodash";
export default {
  data() {
    return {
      searchSuggestions: []
    };
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      //当searchText发生改变的时候，调用handler函数
      //handler的函数名称是固定的

      handler: debounce(function(val) {
        this.loadSearchText(val);
      }, 200),
      /* handler(val) {
        this.loadSearchText(val);
      }, */
      immediate: true
    }
  },
  methods: {
    async loadSearchText(q) {
      try {
        const { data: res } = await getSearchText(q);
        this.searchSuggestions = res.data.options;
      } catch (err) {
        this.$toast("获取内容失败");
      }
    },
    //设置高亮
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`;
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, highlightStr);
    }
  }
};
</script>
<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>


<template>
    <div class="search-history">
        <van-cell title="搜索历史">
            <div v-if="isDeleteShow">
            <span @click="$emit('clear-search-histories')">全部删除</span>
            &nbsp;&nbsp;
            <span @click='isDeleteShow=false'>完成</span>
            </div>
            <van-icon v-else name="delete" @click='isDeleteShow=true'></van-icon>
        </van-cell>
        <van-cell 
        :title="item" 
        v-for="(item,index) in searchHistories" 
        :key="index" 
        @click="onSearchItemClick(item,index)"
        >
            <van-icon v-show='isDeleteShow' name="delete" ></van-icon>
        </van-cell>

    </div>
</template>
<script>
import { getSearchHistories } from "@/api/search.js";
export default {
  name: "SearchHistory",
  data() {
    return {
      isDeleteShow: false //控制删除按钮显示
    };
  },
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  created() {
    this.loadSearchHistories();
  },
  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1);
      } else {
        this.$emit("search", item);
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>


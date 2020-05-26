<template>
    <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{
      collected: value
    }"
    @click="onCollect"
    :loading="loading"
  />
</template>
<script>
import { addCollect, deleteCollect } from "@/api/article.js";
export default {
  name: "collectArticle",
  data() {
    return {
      loading: false
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onCollect() {
      this.loading = true;
      try {
        if (this.value) {
          //已收藏
          await deleteCollect(this.articleId);
        } else {
          //未收藏
          await addCollect(this.articleId);
        }
        this.$emit("input", !this.value);
        this.$toast.success(!this.value ? "收藏成功" : "取消收藏");
      } catch (err) {
        this.$toast.fail("收藏失败");
      }
      this.loading = false;
    }
  }
};
</script>
<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>

<template>
   <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1
    }"
    :loading="loading"
    @click="onCollect"
  />
</template>
<script>
import { addLike, deleteLike } from "@/api/article.js";
export default {
  name: "likeArticle",
  data() {
    return {
      loading: false
    };
  },
  props: {
    value: {
      type: Number,
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
        let state = -1;
        if (this.value === 1) {
          //已点赞
          await deleteLike(this.articleId);
        } else {
          //未点赞,需要点赞
          await addLike(this.articleId);
          state = 1;
        }
        this.$emit("input", state);
        this.$toast.success(this.value == 1 ? "取消点赞" : "点赞成功");
      } catch (err) {}
      this.loading = false;
    }
  }
};
</script>
<style lang="less" scoped>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>


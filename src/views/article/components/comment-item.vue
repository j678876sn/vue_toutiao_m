<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comments.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{comments.aut_name}}</div>
      <van-button
        @click="onCommentLike"
        :loading="commentLoading"
        class="like-btn"
        :class="{
            liked:comments.is_liking
        }"
        :icon="comments.is_liking?'good-job':'good-job-o'"
      >{{comments.like_count || '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{comments.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{comments.pubdate | relativeTime}}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('replay-click',comments)"
        >回复 {{comments.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from "@/api/comment.js";
export default {
  name: "CommentItem",
  components: {},
  props: {
    comments: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commentLoading: false //加载状态
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onCommentLike() {
      this.commentLoading = true;
      try {
        // 如果已经点赞，需要取消点赞
        if (this.comments.is_liking) {
          await deleteCommentLike(this.comments.com_id);
          this.comments.like_count--;
        } else {
          // 如果未点赞，需要添加点赞
          await addCommentLike(this.comments.com_id);
          this.comments.like_count++;
        }
        this.$emit("update-Commentisliking", !this.comments.is_liking);
      } catch (err) {
        this.$toast.fail("获取点赞状态失败");
      }
      this.commentLoading = false;
    }
  }
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
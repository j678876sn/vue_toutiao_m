<template>
    <div>
        <van-nav-bar
            :title="comment.reply_count?`${comment.reply_count}条回复`:`无回复`"
            left-arrow
        >
        <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
        </van-nav-bar>

        <div class="scroll-wrap">
            <comment-item 
                :comments='comment'
            ></comment-item>

            <!-- 全部回复列表 -->
            <van-cell title="全部回复"/>
             <comment-list
                :source="comment.com_id"
                :list="commentlist"
                :type="'c'"
                >
            </comment-list>
            <!-- /全部回复列表 -->
        </div>

        <!-- 底部区域 -->
        <div class="reply-bottom">
            <van-button 
            class="write-btn"
            size="small"
            round
            @click="isPostShow=true"
            >发布</van-button>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论 -->
        <van-popup v-model="isPostShow" position="bottom">
            <comment-post
              :target="comment.com_id"
              :article-id="articleId"
              @post-success="onPostSuccess"
            />
        </van-popup>
        <!-- /发布评论 -->

        

        
    </div>
</template>
<script>
import CommentItem from "./comment-item";
import commentList from "./comment-list"; //评论列表组件
import CommentPost from "./comment-post"; //评论发布组件

export default {
  name: "CommentReplay",
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  components: {
    CommentItem,
    commentList,
    CommentPost
  },
  data() {
    return {
      isPostShow: false,
      commentlist: []
    };
  },
  methods: {
    //发表评论成功后
    onPostSuccess(data) {
      this.comment.reply_count++; // 评论数量加一;
      this.isPostShow = false;
      this.commentlist.unshift(data.new_obj);
    }
  }
};
</script>
<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>

<template>
    <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中, vertical:是否垂直排列图标和文字内容-->
      <div class="loading-wrap" v-if='loading'>
        <van-loading  
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleDetail.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{articleDetail.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleDetail.aut_photo"
          />
          <div slot="title" class="user-name">{{articleDetail.aut_name}}</div>
          <div slot="label" class="publish-date">{{articleDetail.pubdate | relativeTime}}</div>
          <follow-user 
          v-model="articleDetail.is_followed"
          :user-id='articleDetail.aut_id'/>
          <!-- <van-button
            v-if="articleDetail.is_followed"
            class="follow-btn"
            round
            size="small"
            :loading="followLoading"
            @click="onFollow"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="followLoading"
            @click="onFollow"
          >关注</van-button> -->
          
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div 
          class="article-content markdown-body" >
          <div v-html='articleDetail.content' ref='articleDetail-content'>
          </div>
        </div>
        <van-divider>正文结束</van-divider>
        <comment-list 
        :source='articleDetail.art_id'
        :list='commentlists'
        @comment-count="totalCommentCount=$event.total_count"
        @replay-click='onReplay'
        ></comment-list>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <!-- 评论组件 -->
       <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow=true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :info="totalCommentCount"
        color="#777"
      />
      <collect-article 
        class="btn-item"
        v-model="articleDetail.is_collected"
        :articleId="articleDetail.art_id"
      ></collect-article>
      
      <like-article 
        class="btn-item"
        v-model='articleDetail.attitude'
        :articleId='articleDetail.art_id'
      ></like-article>
x`
      <van-icon name="share" color="#777777"></van-icon>
      </div>
    <!-- /底部区域 -->
    <!-- 评论弹出层 -->
        <van-popup 
        v-model="isPostShow" 
        position="bottom" >
          <comment-post
            @post-success='onPostSuccess'
            :target='articleDetail.art_id'
          />
        </van-popup>
    <!-- /评论弹出层 -->
    </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus=='404'">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleDetails">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 回复评论弹出层 -->
      <van-popup 
        v-model="isReplayShow" 
        position="bottom" 
        style="height:100%">
          <comment-replay
            v-if="isReplayShow"
           :comment="commentReplay" 
           @close="isReplayShow=false">
          </comment-replay>
        </van-popup>
    <!-- /回复评论弹出层 -->

  </div>
</template>
<script>
import { getArticleDetails } from "@/api/article.js";
import { ImagePreview } from "vant"; //图片预览
import FollowUser from "@/components/follow-user/index.vue"; //用户关注组件
import collectArticle from "@/components/collect-article/index.vue"; //文章收藏组件
import likeArticle from "@/components/like-article/index.vue"; //文章点赞组件
import commentList from "./components/comment-list"; //评论列表组件
import CommentPost from "./components/comment-post"; //评论发布组件
import CommentReplay from "./components/comment-replay"; //评论发布组件

export default {
  data() {
    return {
      articleDetail: {},
      loading: true,
      errStatus: "", //错误状态
      followLoading: false,
      totalCommentCount: 0,
      isPostShow: false, //发布评论弹出层是否显示
      commentlists: [], //评论列表，用于传值
      isReplayShow: false, //控制回复的弹出层
      commentReplay: {} //评论回复的对象
    };
  },
  // 依赖传值
  provide() {
    return {
      articleId: this.articleId
    };
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {
    FollowUser,
    collectArticle,
    likeArticle,
    commentList,
    CommentPost,
    CommentReplay
  },
  created() {
    this.loadArticleDetails();
  },
  methods: {
    async loadArticleDetails() {
      try {
        const { data: res } = await getArticleDetails(this.articleId);

        // 错误情况
        /* if (Math.random() > 0.5) {
          JSON.parse("dsdjsfsffssf");
        } */

        this.articleDetail = res.data;
        setTimeout(() => {
          this.previewImage();
        }, 0);
      } catch (err) {
        // 如果返回错误是404的话
        if (err.response && err.response.status == 404) {
          this.errStatus = "404";
        }

        // this.$toast("获取文章详情失败");
      }
      // 加载成功和失败都会让loading消失
      this.loading = false;
    },
    previewImage() {
      // 1.得到所有Img节点
      const articleContent = this.$refs["articleDetail-content"];
      // console.log(articleContent);
      const imgs = articleContent.querySelectorAll("img");
      // console.log(imgs);
      const images = [];
      imgs.forEach((img, index) => {
        // 将每个图片添加到images数组中
        images.push(img.src);
        // 给每个图片添加点击事件
        img.onclick = function() {
          ImagePreview({
            images: images,
            startPosition: index //起始位置
          });
        };
      });
    },
    // 关注功能
    /* async onFollow() {
      this.followLoading = true;
      try {
        if (this.articleDetail.is_followed) {
          // 已关注,需要取消关注
          await deleteFollow(this.articleDetail.aut_id);
        } else {
          // 未关注
          await addFollow(this.articleDetail.aut_id);
        }
        this.articleDetail.is_followed = !this.articleDetail.is_followed;
      } catch (err) {
        let errMsg = "操作失败，请重试";
        if (err.response && err.response.status == 400) {
          errMsg = "无法关注自己";
        }
        this.$toast.fail(errMsg);
      }
      this.followLoading = false;
    } */
    onPostSuccess(data) {
      this.isPostShow = false;
      this.commentlists.unshift(data.new_obj);
    },
    // 回复评论
    onReplay(comments) {
      // console.log(comments);
      this.commentReplay = comments;
      this.isReplayShow = true;
    }
  }
};
</script>
<style lang="less" scoped>
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777;
    }
    .collect-btn--collected {
      color: #ffa500;
    }
    .like-btn--liked {
      color: #e5645f;
    }
  }
}
</style>

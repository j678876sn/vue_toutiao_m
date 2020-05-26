<template>
    <!-- <van-cell class="article_item" :to="'/article/'+article.art_id"> -->
    <!-- <van-cell class="article_item" :to="`/article/${article.art_id}`"> -->
    <van-cell 
    class="article_item" 
    :to="{
      name:'article',
      params:{
        articleId:article.art_id
      }
    }
    ">

        <!-- 标题 -->
        <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>

        <div slot="label">

            <!-- 如果有3张图片 -->
            <div v-if="article.cover.type==3" class="cover_wrap">
                <div v-for="(img,index) in article.cover.images" :key="index" class="cover_item">
                    <van-image :src="img" class="cover_item_img" fit="cover" />
                </div>
            </div>
            <div class="label_span_wrap">
                <span>{{article.aut_name}}</span>
                <span>{{article.comm_count}}条</span>
                <span>{{article.pubdate | relativeTime}}</span>
            </div>
        </div>
        <!-- 如果有1张图片 -->
        <van-image slot="default" class="right_cover" v-if="article.cover.type==1" :src="article.cover.images[0]"
            fit="cover" />
    </van-cell>

</template>
<script>
export default {
  name: "ArticleItem",
  data() {
    return {};
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.article_item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;

    .right_cover {
      width: 232px;
      height: 146px;
    }
  }

  .label_span_wrap span {
    font-size: 22px;
    margin-right: 25px;
    color: #b4b4b4;
  }

  .cover_wrap {
    display: flex;
    padding: 30px 0;

    .cover_item {
      flex: 1;
      height: 146px;

      &:not(:last-child) {
        padding-right: 4px;
      }

      .cover_item_img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
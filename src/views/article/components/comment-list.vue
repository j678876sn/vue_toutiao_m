<template>
    <div class="comment-list">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
        <van-cell 
            v-for="(comment,index) in list" 
            :key="index" 
            >
            <comment-item 
            :comments='comment'
            @update-Commentisliking='comment.is_liking=$event'
            @replay-click="$emit('replay-click',$event)"></comment-item>
        </van-cell>
        </van-list>
    </div>
    
</template>
<script>
import { getComments } from "@/api/comment.js";
import CommentItem from "./comment-item";
export default {
  name: "commentList",
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, //获取下一页的标记
      limit: 10
    };
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator(val) {
        return ["a", "c"].includes(val);
      },
      default: "a"
    }
  },
  components: {
    CommentItem
  },
  created() {
    this.loading = true;
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        //   获取评论内容
        const { data: res } = await getComments({
          type: this.type, //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), //文章id或者评论Id
          offset: this.offset,
          limit: this.limit
        });
        const results = res.data.results;
        this.$emit("comment-count", res.data); //子向父传值
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.offset = res.data.last_id;
        } else {
          this.finished = true;
        }
        this.finished = true;
      } catch (err) {
        this.err = true;
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>

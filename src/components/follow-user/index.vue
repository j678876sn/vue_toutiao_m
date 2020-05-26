<template>
    <van-button
            v-if="isFollowd"
            class="follow-btn"
            round
            size="small"
            :loading="loading"
            @click="onFollow"
          >已关注
    </van-button>
    <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="loading"
            @click="onFollow"
          >关注
    </van-button>
</template>

<script>
import { addFollow, deleteFollow } from "@/api/users.js";
export default {
  name: "FollowUser",
  data() {
    return {
      loading: false
    };
  },
  model: {
    prop: "isFollowd", //重置v-model绑定的属性名
    event: "update-isFollowd" //重置v-model绑定的事件
  },
  props: {
    //是否被关注
    isFollowd: {
      type: Boolean,
      required: true
    },
    //被关注用户的id
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onFollow() {
      this.loading = true;
      try {
        if (this.isFollowd) {
          // 已关注,需要取消关注
          await deleteFollow(this.userId);
        } else {
          // 未关注
          await addFollow(this.userId);
        }
        // this.isFollowd = !this.isFollowd;
        this.$emit("update-isFollowd", !this.isFollowd);
      } catch (err) {
        let errMsg = "操作失败，请重试";
        if (err.response && err.response.status == 400) {
          errMsg = "无法关注自己";
        }
        this.$toast.fail(errMsg);
      }
      this.loading = false;
    }
  }
};
</script>
<style lang="less" scoped>
</style>

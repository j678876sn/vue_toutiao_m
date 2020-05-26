<template>
    <div>
        <!-- 导航 -->
        <van-nav-bar
            title="设置昵称"
            left-text="取消"
            right-text="完成"
            @click-left="$emit('close')"
            @click-right="onClickRight"
        />
        <!-- 导航 -->

        <!-- 输入框 -->
        <div class="field-wrap">
            <van-field
            v-model="localName"
            rows="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入昵称"
            show-word-limit
        />  
        </div>
        <!-- /输入框 -->
    </div>    
</template>
<script>
import { updateUserProfile } from "@/api/users.js";
export default {
  name: "UpdateName",
  props: {
    value: {
      type: String,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      localName: this.value
    };
  },
  methods: {
    async onClickRight() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, //禁用背景点击
        duration: 0 //持续时间，默认是2000毫秒 如果为0 则继续展示
      });

      try {
        if (!this.localName) {
          this.$toast.fail("昵称不能为空");
          return;
        }
        const { data: res } = await updateUserProfile({
          name: this.localName
        });
        // 将昵称更新在个人信息页面
        this.$emit("input", this.localName);
        //弹层关闭
        this.$emit("close");
        this.$toast.success("更新成功");
      } catch (err) {
        this.$toast.fail("更新失败");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.field-wrap {
  padding: 20px;
}
</style>

<template>
    <div>
        <van-picker 
        show-toolbar 
        title="设置性别" 
        :columns="columns" 
        :default-index="value" 
        @confirm="onConfirm"
        @cancel="$emit('close')"
        @change="onPikerChange"
        />
    </div>
</template>
<script>
import { updateUserProfile } from "@/api/users.js";
export default {
  name: "UpdateGender",
  data() {
    return {
      columns: ["男", "女"],
      localGender: 0
    };
  },
  props: {
    //用户id
    userId: {
      type: [Number, String, Object],
      required: true
    },
    // 性别字段
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, //禁用背景点击
        duration: 0 //持续时间，默认是2000毫秒 如果为0 则继续展示
      });

      try {
        if (!this.columns) {
          this.$toast.fail("性别不能为空");
          return;
        }
        const { data: res } = await updateUserProfile({
          gender: this.localGender
        });
        // 将性别更新在个人信息页面
        this.$emit("input", this.localGender);
        //弹层关闭
        this.$emit("close");
        this.$toast.success("更新成功");
      } catch (err) {
        this.$toast.fail("更新失败");
      }
    },
    onPikerChange(picker, value, index) {
      this.localGender = index;
    }
  }
};
</script>
<style lang="less" scoped>
</style>

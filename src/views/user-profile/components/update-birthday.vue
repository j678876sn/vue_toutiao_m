<template>
    <div>
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="$emit('close')"
            @confirm="onBirthConfirm"
        />
    </div>
</template>
<script>
import { updateUserProfile } from "@/api/users.js";
import dayjs from "dayjs";
export default {
  name: "UpdateBirthday",
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1977, 0, 1),
      maxDate: new Date(3000, 10, 1),
      currentDate: new Date(this.value)
    };
  },
  methods: {
    async onBirthConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, //禁用背景点击
        duration: 0 //持续时间，默认是2000毫秒 如果为0 则继续展示
      });
      const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
      try {
        if (!currentDate) {
          this.$toast.fail("生日不能为空");
          return;
        }
        const { data: res } = await updateUserProfile({
          birthday: currentDate
        });
        // 将生日更新在个人信息页面
        this.$emit("input", currentDate);
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
</style>

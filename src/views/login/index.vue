<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" >
      <van-icon class="back_icon" slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>

    <!-- 表单区域 -->
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field 
      v-model='users.mobile' 
      type="number" 
      name="mobile" 
      placeholder="请输入手机号"
      :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field 
      v-model='users.code' 
      type="number" 
      name="code" 
      placeholder="请输入验证码"
      :rules="userFormRules.code">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          <template #button>
            <div class="small-code">
              <van-count-down
              v-if="isCountDown" 
              :time="5 * 1000" 
              format="ss s" 
              @finish="isCountDown=false"
              />
              <van-button v-else size="small" round  native-type="button" class="btn-small-code" @click="onSendSms">获取验证码</van-button>
            </div>
          </template>
      </van-field>

      <div class="btn-submit">
        <van-button block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import { login, SenSms } from "@/api/users.js";
export default {
  name: "LoginPage",
  data() {
    return {
      users: {
        mobile: "15850897455", //手机号
        code: "" //验证码
      },
      // 手机号 密码规则
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空"
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式有误" //正则表达式
          }
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空"
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式有误" //正则表达式
          }
        ]
      },
      // 倒计时
      isCountDown: false
    };
  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: "登陆中...",
        forbidClick: true, //禁用背景点击
        duration: 0 //持续时间，默认是2000毫秒 如果为0 则继续展示
      });

      try {
        const { data: res } = await login(this.users);
        this.$toast.success("登录成功");
        this.$router.back();
        // 通过vuex将token存储到公共区域
        this.$store.commit("setUser", res.data);
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail("手机号或验证码有误");
        } else {
          this.$toast.fail("登录失败,请稍后再试");
        }
      }
    },
    // 发送验证码
    async onSendSms() {
      try {
        await this.$refs.loginFormRef.validate("mobile");
      } catch (err) {
        return console.log("验证失败");
      }
      console.log("验证成功");

      try {
        await SenSms(this.users.mobile);
        this.$toast.success("发送成功");
      } catch (err) {
        if (err.response.status === 429) {
          this.isCountDown = false;
          this.$toast.fail("发送太频繁，请稍后再试");
        } else {
          this.$toast.fail("发送失败");
        }
      }

      this.isCountDown = true;
    }
  }
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 32px;
    margin-right: 10px;
  }

  .small-code {
    width: 153px;
    height: 45px;
    padding-left: 20px;
    border-left: 2px solid #eeeeee;
    .btn-small-code {
      width: 153px;
      height: 45px;
      background-color: #ededed;
      font-size: 22px;
      font-family: "微软雅黑";
      color: #666666;
    }
  }

  .btn-submit {
    margin: 10px auto;
    width: 694px;
    height: 88px;
    button {
      border: 0;
      outline: none;
      border-radius: 8px;
      background-color: #6db4fb;
    }
  }
}
</style>
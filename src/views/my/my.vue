/* 我的 */
<template>
    <div class="my_container">
      <!-- 用户已登录 -->
        <div v-if="user" class="header user_info">
          <div class="base_info">
            <div class="left">
              <van-image
              round
              class="avater"
              fit="cover"
              :src="userInfo.photo"
              />
              <span class="name">{{userInfo.name}}</span>
            </div>
            <div class="right">
              <van-button 
              size="mini" 
              round
              to="/user-profile"
              >编辑资料</van-button>
            </div>
          </div>
          <div class="data_stats">
            <div class="data_item">
              <span class="count">{{userInfo.art_count}}</span>
              <span class="text">头条</span>
            </div>
            <div class="data_item">
              <span class="count">{{userInfo.follow_count}}</span>
              <span class="text">关注</span>
            </div>
            <div class="data_item">
              <span class="count">{{userInfo.fans_count}}</span>
              <span class="text">粉丝</span>
            </div>
            <div class="data_item">
              <span class="count">{{userInfo.like_count}}</span>
              <span class="text">获赞</span>
            </div>
          </div>
        </div>
      <!-- /用户已登录 -->
      <!-- 用户未登录 -->
        <div v-else class="header not_login">
            <div class="login_btn" @click="$router.push('/login')">
                <img class="mobile_img" src="~@/assets/mobile.png" alt="">
                <span class="text">登录 / 注册</span>
            </div>
        </div>
      <!-- /用户未登录 -->

      <!-- Grid导航 -->
        <van-grid :column-num="2" class="grid_nav" clickable>
          <van-grid-item class="grid_item">
            <i slot="icon" class="toutiao toutiao-shoucang"></i>
            <span class="text" slot="text">收藏</span>
          </van-grid-item>
          <van-grid-item class="grid_item">
             <i slot="icon" class="toutiao toutiao-lishi"></i>
            <span class="text" slot="text">历史</span>
          </van-grid-item>
        </van-grid>
      <!-- /Grid导航 -->

      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="小志同学" is-link />
        
      </van-cell-group>
      <van-cell v-if="user" @click="onlogOut" clickable title="退出登录" class="logout_cell" />
    </div>
</template>
<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/users.js";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  // 页面加载时触发
  created() {
    if (this.user) {
      this.loadUserInfo();
    }
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    /* 
      *用户退出
    */
    onlogOut() {
      this.$dialog
        .confirm({
          title: "确认退出吗？"
        })
        .then(() => {
          // on confirm
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
          console.log("取消退出");
        });
    },

    /* 
      *获取用户信息
     */
    async loadUserInfo() {
      try {
        const { data: res } = await getUserInfo();

        this.userInfo = res.data;
        console.log(this.userInfo);
      } catch (err) {
        this.$toast("获取用户数据失败");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.my_container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not_login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login_btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .mobile_img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: white;
      }
    }
  }
  .user_info {
    .base_info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avater {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }
        .name {
          color: #fff;
          font-size: 30px;
          margin-left: 22px;
        }
      }
    }
    .data_stats {
      display: flex;
      .data_item {
        display: flex;
        height: 130px;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid_nav {
    .grid_item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .text {
        font-size: 28px;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
    }
  }
  .logout_cell {
    text-align: center;
    color: #d86262;
    font-size: 30px;
    margin-top: 10px;
  }
}
</style>

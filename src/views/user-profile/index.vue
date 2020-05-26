<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <input type="file" hidden ref="file" @change="onChangeFile">

    <!-- 个人信息 -->
    <van-cell 
    class="avatar-cell" 
    title="头像" 
    is-link 
    center
    @click="$refs.file.click()"
    >
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <van-cell 
    title="昵称" 
    :value="user.name" 
    is-link 
    @click="isUpdateNickNameShow=true"/>
    <van-cell 
    title="性别" 
    :value="user.gender?'女':'男'" 
    is-link 
     @click="isUpdateGenderShow=true"/>
    <van-cell 
    title="生日" 
    :value="user.birthday" 
    is-link 
    @click="isUpdatebirthdayShow=true"/>
    <!-- /个人信息 -->

    <!-- 编辑昵称弹层 -->
    <van-popup v-model="isUpdateNickNameShow" position="bottom" :style="{ height: '100%' }" >
      <update-name
        v-if="isUpdateNickNameShow"
        v-model="user.name"
        @close="isUpdateNickNameShow = false"
        :userId='user.id'
      ></update-name>
    </van-popup>
    <!-- /编辑昵称弹层 -->

    <!-- 编辑性别弹层 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom" :style="{ height: '45%' }" >
      <update-gender
      v-if="isUpdateGenderShow"
      v-model="user.gender"
      @close="isUpdateGenderShow = false"
      :userId='user.id'
      ></update-gender>
    </van-popup>
    <!-- /编辑性别弹层 -->

    <!-- 编辑生日弹层 -->
    <van-popup v-model="isUpdatebirthdayShow" position="bottom" :style="{ height: '45%' }" >
      <update-birthday
      v-if="isUpdatebirthdayShow"
      v-model="user.birthday"
      @close="isUpdatebirthdayShow = false"
      ></update-birthday>
    </van-popup>
    <!-- /编辑生日弹层 -->


     <!-- 编辑头像弹层 -->
    <van-popup v-model="isUpdatePhotoShow" position="bottom" :style="{ height: '100%' }" >
        <update-photo
        :imageSrc='imageSrc'
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo=$event"
        ></update-photo>
    </van-popup>
    <!-- /编辑生头像弹层 -->
  </div>
</template>

<script>
import { getUserProfile } from "@/api/users.js";
import UpdateName from "./components/update-name";
import UpdateGender from "./components/update-gender";
import UpdateBirthday from "./components/update-birthday";
import UpdatePhoto from "./components/update-photo";

export default {
  name: "UserProfile",
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {},
  data() {
    return {
      user: {}, //存储获取的用户信息
      isUpdateNickNameShow: false, //控制昵称弹出层的显示状态
      isUpdateGenderShow: false,
      isUpdatebirthdayShow: false,
      isUpdatePhotoShow: false,
      imageSrc: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile();
  },
  mounted() {},
  methods: {
    async loadUserProfile() {
      try {
        const { data: res } = await getUserProfile();
        this.user = res.data;
      } catch (err) {
        console.log("获取失败");
      }
    },
    // 选择头像事件
    onChangeFile() {
      const file = this.$refs.file.files[0];
      this.imageSrc = window.URL.createObjectURL(file); //获取文件在当前浏览器的地址
      this.isUpdatePhotoShow = true;
      this.$refs.file.value = "";
    }
  }
};
</script>

<style scoped lang="less">
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }

  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
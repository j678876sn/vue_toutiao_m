<template>
    <div class="update-photo">
        <img class="img" height="100" :src="imageSrc" ref="imgRef" />

        <div class="toolbar">
            <div class="cancel" @click="$emit('close')">取消</div>
            <div class="confirm" @click="onConfirm">完成</div>
        </div>
    </div>
</template>
<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserPhoto } from "@/api/users.js";
export default {
  name: "UpdatePhoto",
  data() {
    return {
      cropper: null //裁切对象
    };
  },
  props: {
    imageSrc: {
      type: [String, Object],
      required: true
    }
  },
  mounted() {
    const image = this.$refs.imgRef;
    this.cropper = new Cropper(image, {
      viewMode: 1, //定义裁纸器的查看模式
      dragMode: "move", //定义裁纸器的拖动模式
      aspectRatio: 1, //定义裁剪框的固定长宽比
      //   autoCropArea: 0, //定义自动裁剪区域的大小
      cropBoxMovable: false, //控制裁剪框移动
      cropBoxResizable: false, //启用以通过拖动来调整裁剪框的大小
      background: false
    });
  },
  methods: {
    //   完成裁切的点击事件
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.loadUpdatePhoto(blob);
      });
    },
    async loadUpdatePhoto(blob) {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, //禁用背景点击
        duration: 0 //持续时间，默认是2000毫秒 如果为0 则继续展示
      });
      try {
        const formData = new FormData(); //二进制容器
        // Pass the image file name as the third parameter if necessary.
        formData.append("photo", blob);

        const { data: res } = await updateUserPhoto(formData);
        console.log(res);
        this.$emit("close");
        this.$emit("update-photo", res.data.photo);
        this.$toast.success("保存成功");
      } catch (err) {
        this.$toast.fail("保存失败");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>

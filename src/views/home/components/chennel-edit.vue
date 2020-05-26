<template>
  <div class="chennel_edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button 
      class="edit-btn" 
      slot="default" 
      size="mini" 
      round type="info" 
      color="#ff0000" plain
      @click='isEdit=!isEdit'>{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid 
    :gutter="10" 
    class="my-grid">
      <van-grid-item 
      class="grid-item" 
      v-for="(Channels,index) in myChannel" 
      :key="index"
      @click="onMyChannel(Channels,index)">
        <van-icon 
        slot="icon" 
        name="clear" 
        v-if="isEdit && !fiexChannels.includes(Channels.id)" 
        ></van-icon>
        <span 
        slot="text" 
        class="text" 
        :class="{active:active==index}">{{Channels.name}}</span>
      </van-grid-item>

    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div 
      slot="title" 
      class="title-text">频道推荐---{{recommendChannel.length}}</div>
    </van-cell>
    <van-grid 
    :gutter="10" 
    class="recommend-grid">
      <van-grid-item 
      class="grid-item" 
      icon="plus" v-for="(channel,index) in recommendChannel" 
      :key="index"
      :text="channel.name" 
      @click="onAddChannel(channel)">
      </van-grid-item>
    </van-grid>
  </div>

</template>

<script>
import {
  getAllChannels,
  addUserChannels,
  removeUserChannels
} from "@/api/channel.js";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage.js";
export default {
  name: "ChennelEdit",
  data() {
    return {
      allChannels: [], //所有频道内容
      isEdit: false, //控制编辑删除按钮显示
      fiexChannels: [0]
    };
  },

  props: {
    myChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    recommendChannel() {
      /* 方法2 filter */
      return this.allChannels.filter(channel => {
        return !this.myChannel.find(myChannel => {
          return myChannel.id == channel.id;
        });
      });

      /* 方法1 */
      /* const channels = []
        this.allChannels.forEach(channel => {
          const ret = this.myChannel.find(mychannel => {
            return mychannel.id == channel.id
          })
          if (!ret) {
            channels.push(channel)
          }
        })
        return channels
      } */
    },
    ...mapState(["user"])
  },
  created() {
    this.loadAllChannels();
  },
  methods: {
    editChannels() {
      console.log(this.myChannel);
    },
    /* 获取所有频道 */
    async loadAllChannels() {
      try {
        const { data: res } = await getAllChannels();
        this.allChannels = res.data.channels;
        // console.log(this.allChannels);
      } catch (err) {
        console.log(err);
      }
    },
    // 将频道列表内容添加到我的频道内
    async onAddChannel(channel) {
      this.$emit("update-myChannel", channel);
      // this.myChannel.push(channel);

      //判断登录状态
      if (this.user) {
        //已登录
        try {
          await addUserChannels({
            id: channel.id, //频道的id
            seq: this.myChannel.length //顺序序号
          });
        } catch (err) {
          this.$toast("添加频道失败");
        }
      } else {
        //未登录
        setItem("Token_Channel", this.myChannel);
      }
    },
    // 重新获取我的频道内容
    onMyChannel(channel, index) {
      if (this.isEdit) {
        // 如果删除的是推荐，则返回
        if (this.fiexChannels.includes(channel.id)) {
          return;
        }
        // 如果当前索引小于active的值,则将active-1
        if (index <= this.active) {
          this.$emit("update-active", this.active - 1, true);
        }
        //编辑状态
        this.myChannel.splice(index, 1);
        // 调用删除频道方法
        this.deleteUserChannels(channel);
      } else {
        //非编辑状态
        this.$emit("update-active", index, false);
      }
    },
    // 删除指定用户频道
    async deleteUserChannels(channel) {
      if (this.isEdit) {
        // 已登录
        try {
          await removeUserChannels(channel.id);
        } catch (err) {
          this.$toast("删除失败");
        }
      } else {
        //未登录
        setItem("Token_Channel", this.myChannel);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.chennel_edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;

      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }

      .active {
        color: red;
      }

      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;

        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
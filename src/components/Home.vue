<template>
  <div>
    <view-box ref="viewBox">
      <div>
        <form>
          <group title="转换" label-width="4.5em" label-margin-right="2em" label-align="right">
            <x-textarea title="" placeholder="旧链接" v-model="reqParam.oriString"></x-textarea>
            <div class="img-div">
              <img class="plus" src="../assets/plus.png">
            </div>
            <x-textarea title="" placeholder="新链接" v-model="reqParam.targetString"></x-textarea>
          </group>
        </form>
        <box gap="10px 10px">
          <x-button plain type="primary" style="border-radius:99px;" @click.native="convert()">转换</x-button>
        </box>
        <div class="img-div">
          <img class="convert" src="../assets/convert.png">
        </div>
        <group title="结果" label-width="4.5em" label-margin-right="2em" label-align="right">
          <x-textarea title="" v-model="myResult"></x-textarea>
        </group>
        <box gap="10px 10px">
          <x-button class="copy-code-button" :data-clipboard-text="myResult" plain type="warn" style="border-radius:99px;" @click.native="oneKeyCopy()">一键复制</x-button>
        </box>
      </div>
    </view-box>

    <tabbar slot="bottom" class="tabbar" style="position: fixed">
      <tabbar-item selected>
        <img slot="icon" src="../assets/icon_nav_article.png">
        <span slot="label">淘口令</span>
      </tabbar-item>
      <tabbar-item link="/profile/myProfile">
        <img slot="icon" src="../assets/icon_nav_cell.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>

  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell, ViewBox, XInput, XButton, Box, XTextarea } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'
import Clipboard from 'clipboard'
axios.defaults.withCredentials = true

export default {
  name: 'Home',
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    ViewBox,
    XInput,
    XButton,
    Box,
    XTextarea
  },
  data () {
    return {
      reqParam: {},
      myResult: ''
    }
  },
  methods: {
    // 保存修改密码信息
    convert () {
      let userData = {
        oriString: this.reqParam.oriString,
        targetString: this.reqParam.targetString
      }
      axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: userData,
        url: Global.serverUrl + '/taopassword/convert'
      }).then((response) => {
        if (response.data.code !== '0') {
          this.$vux.toast.show({
            text: response.data.message,
            type: 'text'
          })
        } else {
          this.myResult = response.data.data.convertResult
        }
      }).catch(() => {
        this.$vux.toast.show({
          text: '系统异常',
          type: 'warn'
        })
      })
    },
    // 一键复制
    oneKeyCopy () {
      // 这里可以理解为选择器，选择上面的复制按钮
      let clipboard = new Clipboard('.copy-code-button')
      clipboard.on('success', e => {
        this.$vux.toast.show({
          text: '复制成功',
          type: 'success'
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        // 释放内存
        clipboard.destroy()
      })
    }
  }
}
</script>

<style>
.img-div {
  text-align: center;
}
.plus {
  width: 30px;
  height: 30px;
  pointer-events: none;
}
.convert {
  width: 30px;
  height: 30px;
  pointer-events: none;
}
</style>

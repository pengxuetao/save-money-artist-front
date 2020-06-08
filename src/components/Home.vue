<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1>省钱艺术家</h1>
    </div>

    <view-box ref="viewBox" body-padding-top="46px">
      <div>
        <form>
          <group title="转换" label-width="4.5em" label-margin-right="2em" label-align="right">
            <x-textarea title="" placeholder="旧链接" v-model="reqParam.oriString"></x-textarea>
            <x-textarea title="" placeholder="新链接" v-model="reqParam.targetString"></x-textarea>
          </group>
        </form>
        <box gap="10px 10px">
          <x-button type="primary" @click.native="trans()">转换</x-button>
        </box>
        <group title="结果" label-width="4.5em" label-margin-right="2em" label-align="right">
          <x-textarea title="" v-model="myResult"></x-textarea>
        </group>
        <box gap="10px 10px">
          <x-button class="copy-code-button" :data-clipboard-text="myResult" type="warn" @click.native="oneKeyCopy()">一键复制</x-button>
        </box>
        <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="复制成功" :position="position"></toast>
      </div>
    </view-box>

  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell, Alert, ViewBox, XHeader, XInput, XButton, Box, XTextarea, Toast } from 'vux'
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
    Alert,
    ViewBox,
    XHeader,
    XInput,
    XButton,
    Box,
    XTextarea,
    Toast
  },
  data () {
    return {
      reqParam: {},
      myResult: '',
      position: 'center',
      showPositionValue: false
    }
  },
  methods: {
    // 保存修改密码信息
    trans () {
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
      }).then((data) => {
        console.log(data)
        this.myResult = data.data
      }).catch(() => {
        // Indicator.close();
        // Toast({
        //   message: '登陆失败',
        //   position: 'center',
        //   duration: 3000
        // });
      })
    },
    // 保存修改密码信息
    oneKeyCopy () {
      var clipboard = new Clipboard('.copy-code-button') // 这里可以理解为选择器，选择上面的复制按钮
      clipboard.on('success', e => {
        this.showPositionValue = true
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
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
.x-header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%
}
</style>

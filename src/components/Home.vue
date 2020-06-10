<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png" @click="easterEgg">
    </div>

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
          <x-button type="primary" @click.native="convert()">转换</x-button>
        </box>
        <div class="img-div">
          <img class="convert" src="../assets/convert.png">
        </div>
        <group title="结果" label-width="4.5em" label-margin-right="2em" label-align="right">
          <x-textarea title="" v-model="myResult"></x-textarea>
        </group>
        <box gap="10px 10px">
          <x-button class="copy-code-button" :data-clipboard-text="myResult" type="warn" @click.native="oneKeyCopy()">一键复制</x-button>
        </box>
      </div>
    </view-box>

  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell, Alert, ViewBox, XHeader, XInput, XButton, Box, XTextarea } from 'vux'
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
    XTextarea
  },
  data () {
    return {
      reqParam: {},
      myResult: '',
      eggCount: 0
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
        console.log(response)
        console.log(response.data)
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
      let clipboard = new Clipboard('.copy-code-button') // 这里可以理解为选择器，选择上面的复制按钮
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
    },
    // 彩蛋
    easterEgg () {
      this.eggCount ++
      if (this.eggCount >= 5) {
        this.$vux.toast.show({
          text: '喵~~~~~',
          type: 'text',
          position: 'top'
        })
        this.eggCount = 0
      }
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.img-div {
  text-align: center;
}
.logo {
  width: 120px;
  height: 120px;
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

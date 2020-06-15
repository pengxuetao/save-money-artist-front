<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="新增签名" class="x-header" style="position: fixed"></x-header>
      <div>
        <group title="签名" label-width="4.5em" label-margin-right="2em" label-align="right">
          <x-input title="" placeholder="标题" v-model="userSignature.title"></x-input>
          <x-textarea title="" placeholder="内容" v-model="userSignature.content" autosize></x-textarea>
        </group>
        <box gap="10px 10px">
          <x-button type="primary" @click.native="addUserSignature">保存</x-button>
        </box>
      </div>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Tabbar, TabbarItem, XInput, XButton, Group, Cell, Alert, Box, XTextarea } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

axios.defaults.withCredentials = true

export default {
  name: 'AddChannel',
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    XInput,
    XButton,
    Group,
    Cell,
    Alert,
    Box,
    XTextarea
  },
  data () {
    return {
      userSignature: {}
    }
  },
  methods: {
    // 获取用户资料信息
    addUserSignature () {
      let self = this
      let userSignature = {
        title: this.userSignature.title,
        content: this.userSignature.content
      }
      axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: userSignature,
        url: Global.serverUrl + '/setting/addUserSignature'
      }).then((response) => {
        if (response.data.code !== '0') {
          this.$vux.toast.show({
            text: response.data.message,
            type: 'warn'
          })
        } else {
          this.$vux.toast.show({
            text: '保存成功',
            type: 'text'
          })
          self.$router.back()
        }
      }).catch(() => {
        this.$vux.toast.show({
          text: '系统异常',
          type: 'warn'
        })
      })
    }
  }
}
</script>

<style>
  .x-header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%
  }
</style>

<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="编辑签名" class="x-header" style="position: fixed"></x-header>
      <div>
        <group title="签名" label-width="4.5em" label-margin-right="2em" label-align="right">
          <x-input title="" placeholder="标题" v-model="userSignature.title"></x-input>
          <x-textarea title="" placeholder="内容" v-model="userSignature.content" autosize></x-textarea>
        </group>
        <box gap="10px 10px">
          <x-button plain type="primary" style="border-radius:99px;" @click.native="modifyUserSignature">保存</x-button>
          <x-button plain type="primary" style="border-radius:99px;" :disabled="userSignature.isDefault===1" @click.native="configDefaultUserSignature">设置默认签名</x-button>
          <x-button plain type="warn" style="border-radius:99px;" @click.native="openDeleteUserSignature">删除</x-button>
        </box>
        <div v-transfer-dom>
          <confirm v-model="deleteShow"
                   @on-confirm="deleteUserSignature">
            <p style="text-align:center;">{{ '是否删除签名?' }}</p>
          </confirm>
        </div>
      </div>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Tabbar, TabbarItem, XInput, XButton, Group, Cell, Alert, Box, XTextarea, TransferDom, Confirm } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

axios.defaults.withCredentials = true

export default {
  name: 'EditSignature',
  directives: {
    TransferDom
  },
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
    XTextarea,
    Confirm
  },
  data () {
    return {
      userSignature: {},
      deleteShow: false
    }
  },
  created () {
    this.queryUserSignature()
  },
  methods: {
    // 查询用户签名
    queryUserSignature () {
      axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + '/profile/signature/' + this.$route.params.id
      }).then((response) => {
        if (response.data.code !== '0') {
          this.$vux.toast.show({
            text: response.data.message,
            type: 'text'
          })
        } else {
          this.userSignature = response.data.data
        }
      }).catch(() => {
        this.$vux.toast.show({
          text: '系统异常',
          type: 'warn'
        })
      })
    },
    // 修改用户签名
    modifyUserSignature () {
      let userSignature = {
        id: this.userSignature.id,
        title: this.userSignature.title,
        content: this.userSignature.content
      }
      if (userSignature.title == null || userSignature.content == null || userSignature.title === '' || userSignature.content === '') {
        this.$vux.toast.show({
          text: '输入内容不能为空',
          type: 'warn'
        })
        return
      }
      axios({
        method: 'put',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: userSignature,
        url: Global.serverUrl + '/profile/signature'
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
        }
      }).catch(() => {
        this.$vux.toast.show({
          text: '系统异常',
          type: 'warn'
        })
      })
    },
    // 设置默认用户签名
    configDefaultUserSignature () {
      axios({
        method: 'put',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + '/profile/signature/' + this.$route.params.id + '/default'
      }).then((response) => {
        if (response.data.code !== '0') {
          this.$vux.toast.show({
            text: response.data.message,
            type: 'warn'
          })
        } else {
          this.$vux.toast.show({
            text: '设置成功',
            type: 'text'
          })
          location.reload()
        }
      }).catch(() => {
        this.$vux.toast.show({
          text: '系统异常',
          type: 'warn'
        })
      })
    },
    // 打开删除用户签名弹框
    openDeleteUserSignature () {
      this.deleteShow = true
    },
    // 删除用户签名
    deleteUserSignature () {
      let self = this
      axios({
        method: 'delete',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + '/profile/signature/' + this.$route.params.id
      }).then((response) => {
        if (response.data.code !== '0') {
          this.$vux.toast.show({
            text: response.data.message,
            type: 'warn'
          })
        } else {
          this.$vux.toast.show({
            text: '删除成功',
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

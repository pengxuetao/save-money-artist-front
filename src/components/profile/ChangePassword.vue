<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="修改密码" class="x-header" style="position: fixed"></x-header>
      <div>
        <form>
          <group title="修改密码" label-width="4.5em" label-margin-right="2em" label-align="right">
            <x-input title="旧密码" type="password" v-model="changePassword.oldPassword"></x-input>
            <x-input title="新密码" type="password" v-model="changePassword.newPassword"></x-input>
            <x-input title="确认密码" type="password" v-model="changePassword.confirmPassword"></x-input>
          </group>
        </form>
        <box gap="10px 10px">
          <x-button type="primary" @click.native="saveChangePasswordInfo()">保存</x-button>
        </box>
      </div>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, XInput, XButton, Group, Cell, Alert, AlertModule, Box } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

axios.defaults.withCredentials = true

export default {
  name: 'ChangePassword',
  components: {
    ViewBox,
    XHeader,
    XInput,
    XButton,
    Group,
    Cell,
    Alert,
    Box
  },
  data () {
    return {
      changePassword: {}
    }
  },
  methods: {
    // 返回上一个页面
    back () {
      this.$router.back()
    },
    // 保存修改密码信息
    saveChangePasswordInfo () {
      let _this = this
      let userData = {
        pwd: this.changePassword.newPassword,
        isPwd: this.changePassword.confirmPassword,
        oldPwd: this.changePassword.oldPassword
      }
      if (userData.pwd !== userData.isPwd) {
        AlertModule.show({
          title: '提示',
          content: '新密码两次输入不一致'
        })
        return
      }
      axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        params: userData,
        url: Global.serverUrl + 'user/setPwd'
      }).then((data) => {
        console.log(data)
        if (data.data.code === '1000') {
          AlertModule.show({
            title: '操作结果',
            content: '修改成功',
            onHide () {
              _this.back()
            }
          })
        } else {
          AlertModule.show({
            title: '操作结果',
            content: data.data.message,
            onHide () {
              location.reload()
            }
          })
        }
      }).catch(() => {
        // Indicator.close();
        // Toast({
        //   message: '登陆失败',
        //   position: 'center',
        //   duration: 3000
        // });
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

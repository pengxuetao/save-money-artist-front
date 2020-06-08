<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="新用户注册" class="x-header" style="position: fixed"></x-header>
      <div>
        <form>
          <group title="注册" label-width="4.5em" label-margin-right="2em" label-align="right">
            <x-input title="手机号码" type="text" v-model="registerInfo.mobile" placeholder="请输入手机号码"></x-input>
            <x-input title="设置密码" type="password" v-model="registerInfo.password" placeholder="请输入密码"></x-input>
            <x-input title="确认密码" type="password" v-model="registerInfo.confirmPassword" placeholder="请输入确认密码"></x-input>
            <!--<x-input title="验证码" type="text" v-model="registerInfo.verificationCode" placeholder="请输入验证码"></x-input>-->
            <x-input title="推荐手机" type="text" v-model="registerInfo.rmmdMobile" placeholder="请输入推荐手机号码(选填)"></x-input>
          </group>
        </form>
        <box gap="10px 10px">
          <x-button type="primary" @click.native="register()">注册</x-button>
        </box>
      </div>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, XButton, Group, Cell, XInput, Alert, AlertModule, Box } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

export default {
  name: 'Register',
  components: {
    ViewBox,
    XHeader,
    XButton,
    Group,
    Cell,
    XInput,
    Alert,
    Box
  },
  data () {
    return {
      registerInfo: {}
    }
  },
  methods: {
    register () {
      let _this = this
      let registerData = {
        mobile: this.registerInfo.mobile,
        password: this.registerInfo.password,
        confirmPassword: this.registerInfo.confirmPassword,
        rmmdMobile: this.registerInfo.rmmdMobile
      }
      if (registerData.password !== registerData.confirmPassword) {
        AlertModule.show({
          title: '提示',
          content: '密码两次输入不一致'
        })
        return
      }
      axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + 'user/registerMobile',
        data: registerData
      }).then((data) => {
        console.log(data)
        console.log(data.data)
        if (data.data.code === '1000') {
          AlertModule.show({
            title: '操作结果',
            content: '注册成功',
            onHide () {
              _this.back()
            }
          })
        } else {
          AlertModule.show({
            title: '操作结果',
            content: '注册失败'
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

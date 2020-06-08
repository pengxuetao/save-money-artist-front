<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="新增渠道" class="x-header" style="position: fixed"></x-header>
      <div>
        <group title="用户信息" label-width="4.5em" label-margin-right="2em" label-align="right">
          <x-input title="真实姓名" v-model="channelInfo.realName"></x-input>
          <x-input title="电话号码" v-model="channelInfo.mobile"></x-input>
          <x-input title="登录密码" v-model="channelInfo.password"></x-input>
        </group>
        <box gap="10px 10px">
          <x-button type="primary" @click.native="saveNewChannelInfo()">保存</x-button>
        </box>
      </div>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Tabbar, TabbarItem, XInput, XButton, Group, Cell, Alert, AlertModule, Box } from 'vux'
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
    Box
  },
  data () {
    return {
      channelInfo: {}
    }
  },
  methods: {
    // 获取用户资料信息
    saveNewChannelInfo () {
      let channelData = {
        realName: this.channelInfo.realName,
        mobile: this.channelInfo.mobile,
        password: this.channelInfo.password
      }
      // Indicator.open('正在登陆，请稍后...');
      // axios.defaults.timeout = 2000
      axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: channelData,
        url: Global.serverUrl + 'channel/addChannelMobile'
      }).then((data) => {
        AlertModule.show({
          title: '操作结果',
          content: data.data,
          onHide () {
            location.reload()
          }
        })
      }).catch(() => {
        // Indicator.close();
        // Toast({
        //   message: '登陆失败',
        //   position: 'center',
        //   duration: 3000
        // });
      })
    },
    // 保存用户基础信息
    saveUserBasicInfo () {
      let userData = {
        id: this.myProfileInfo.id,
        mobile: this.myProfileInfo.mobile,
        realName: this.myProfileInfo.realName,
        idNo: this.myProfileInfo.idNo
      }
      axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: userData,
        url: Global.serverUrl + 'user/saveProfileByBasicInfoMobile'
      }).then((data) => {
        console.log(data)
        console.log(data.data)
        AlertModule.show({
          title: '操作结果',
          content: data.data,
          onHide () {
            location.reload()
          }
        })
        // return data.data
      }).catch(() => {
        // Indicator.close();
        // Toast({
        //   message: '登陆失败',
        //   position: 'center',
        //   duration: 3000
        // });
      })
    },
    // 保存用户银行信息
    saveUserBankInfo () {
      let userData = {
        id: this.myProfileInfo.id,
        openingBankName: this.myProfileInfo.openingBankName,
        bankCardAccount: this.myProfileInfo.bankCardAccount,
        bankCardNo: this.myProfileInfo.bankCardNo,
        openingBankNo: this.myProfileInfo.openingBankNo,
        payBankNo: this.myProfileInfo.payBankNo
      }
      axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: userData,
        url: Global.serverUrl + 'user/saveProfileByBankInfoMobile'
      }).then((data) => {
        console.log(data)
        console.log(data.data)
        AlertModule.show({
          title: '操作结果',
          content: data.data,
          onHide () {
            location.reload()
          }
        })
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

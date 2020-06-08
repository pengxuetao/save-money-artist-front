<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="我的资料" class="x-header" style="position: fixed"></x-header>
      <div>
        <group title="用户信息" label-width="4.5em" label-margin-right="2em" label-align="right">
          <x-input title="智融号" v-model="myProfileInfo.id" disabled></x-input>
          <x-input title="电话号码" v-model="myProfileInfo.mobile" disabled></x-input>
          <x-input title="姓名" v-model="myProfileInfo.realName"></x-input>
          <x-input title="身份证号" v-model="myProfileInfo.idNo"></x-input>
        </group>
        <box gap="10px 10px">
          <x-button type="primary" @click.native="saveUserBasicInfo()">保存</x-button>
        </box>
        <group title="银行信息" label-width="4.5em" label-margin-right="2em" label-align="right">
          <x-input title="开户银行" v-model="myProfileInfo.openingBankName"></x-input>
          <x-input title="开户姓名" v-model="myProfileInfo.bankCardAccount"></x-input>
          <x-input title="银行卡号" v-model="myProfileInfo.bankCardNo"></x-input>
          <x-input title="开户网点" v-model="myProfileInfo.openingBankNo"></x-input>
          <x-input title="联行号" v-model="myProfileInfo.payBankNo" placeholder="选填"></x-input>
        </group>
        <box gap="10px 10px">
          <x-button type="primary" @click.native="saveUserBankInfo()">保存</x-button>
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
  name: 'MyProfileDetail',
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
      myProfileInfo: {}
    }
  },
  created () {
    this.getMyProfileInfo()
  },
  methods: {
    // 获取用户资料信息
    getMyProfileInfo () {
      // Indicator.open('正在登陆，请稍后...');
      // axios.defaults.timeout = 2000
      axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + 'user/queryCurrentUser'
      }).then((data) => {
        console.log(data)
        console.log(data.data)
        this.myProfileInfo = data.data
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

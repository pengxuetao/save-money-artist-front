<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="用户资料" class="x-header" style="position: fixed"></x-header>
      <div>
        <group title="用户信息" label-width="4.5em" label-margin-right="2em" label-align="right">
          <x-input title="智融号" v-model="userProfileInfo.id" disabled></x-input>
          <x-input title="电话号码" v-model="userProfileInfo.mobile" disabled></x-input>
          <x-input title="姓名" v-model="userProfileInfo.realName"></x-input>
          <x-input title="身份证号" v-model="userProfileInfo.idNo"></x-input>
        </group>
        <box gap="10px 10px">
          <x-button type="primary" @click.native="saveUserBasicInfo()">保存</x-button>
        </box>
        <group title="银行信息" label-width="4.5em" label-margin-right="2em" label-align="right">
          <x-input title="开户银行" v-model="userProfileInfo.openingBankName"></x-input>
          <x-input title="开户姓名" v-model="userProfileInfo.bankCardAccount"></x-input>
          <x-input title="银行卡号" v-model="userProfileInfo.bankCardNo"></x-input>
          <x-input title="开户网点" v-model="userProfileInfo.openingBankNo"></x-input>
          <x-input title="联行号" v-model="userProfileInfo.payBankNo" placeholder="选填"></x-input>
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
  name: 'ChannelProfileDetail',
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
      userProfileInfo: {}
    }
  },
  created () {
    this.getUserProfileInfo()
  },
  methods: {
    // 获取用户资料信息
    getUserProfileInfo () {
      // Indicator.open('正在登陆，请稍后...');
      // axios.defaults.timeout = 2000
      axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + 'user/queryUserByUserId/' + this.$route.query.userId
      }).then((data) => {
        console.log(data)
        console.log(data.data)
        this.userProfileInfo = data.data
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
        id: this.userProfileInfo.id,
        mobile: this.userProfileInfo.mobile,
        realName: this.userProfileInfo.realName,
        idNo: this.userProfileInfo.idNo
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
        id: this.userProfileInfo.id,
        openingBankName: this.userProfileInfo.openingBankName,
        bankCardAccount: this.userProfileInfo.bankCardAccount,
        bankCardNo: this.userProfileInfo.bankCardNo,
        openingBankNo: this.userProfileInfo.openingBankNo,
        payBankNo: this.userProfileInfo.payBankNo
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

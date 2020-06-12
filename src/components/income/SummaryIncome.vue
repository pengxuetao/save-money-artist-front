<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-bottom="150px">
      <div>
        <group title="设置">
          <!--<x-switch title="签名开关" :value-map="['0', '1']" v-model="signatureSwitch" @on-change="configSignatureSwitch"></x-switch>-->
        </group>
        <box gap="10px 10px">
          <x-button type="primary" @click.native="goToAddUserSignature">新增签名</x-button>
        </box>
        <group title="签名">
          <div v-for="item in userSignatureList">
            <cell :title="item.title" @click.native="goToModifyUserSignature(item.id)" is-link></cell>
          </div>
        </group>
      </div>
      <tabbar slot="bottom" class="tabbar" style="position: fixed">
        <tabbar-item link="/">
          <img slot="icon" src="../../assets/icon_nav_article.png">
          <span slot="label">淘口令</span>
        </tabbar-item>
        <tabbar-item selected>
          <img slot="icon" src="../../assets/icon_nav_cell.png">
          <span slot="label">设置</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, Tabbar, TabbarItem, XButton, Group, GroupTitle, Cell, Card, Alert, XSwitch, Box } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

axios.defaults.withCredentials = true

export default {
  name: 'SummaryIncome',
  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
    XButton,
    Group,
    GroupTitle,
    Cell,
    Card,
    Alert,
    XSwitch,
    Box
  },
  data () {
    return {
      signatureSwitch: {},
      userSignatureList: []
    }
  },
  created () {
    this.querySignatureSwitch()
    this.queryUserSignatureList()
  },
  methods: {
    // 查询签名开关设置
    querySignatureSwitch () {
      axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + '/setting/querySignatureSwitch'
      }).then((response) => {
        console.log(response)
        console.log(response.data)
        if (response.data.code !== '0') {
          this.$vux.toast.show({
            text: response.data.message,
            type: 'text'
          })
        } else {
          this.signatureSwitch = response.data.data.subtypeValue
        }
      }).catch(() => {
        this.$vux.toast.show({
          text: '系统异常',
          type: 'warn'
        })
      })
    },
    // 设置签名开关
    configSignatureSwitch () {
      console.log('111')
      let userData = {
        signatureSwitchStatus: this.signatureSwitch
      }
      axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: userData,
        url: Global.serverUrl + '/setting/signatureSwitch'
      }).then((response) => {
        console.log(response)
        console.log(response.data)
        if (response.data.code !== '0') {
          this.$vux.toast.show({
            text: response.data.message,
            type: 'text'
          })
        } else {
          this.$vux.toast.show({
            text: response.data.message,
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
    // 跳转新增用户签名页面
    goToAddUserSignature () {
      this.$router.push({
        path: '/channel/addChannel'
      })
    },
    // 查询用户签名列表
    queryUserSignatureList () {
      axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + '/setting/queryUserSignatureList'
      }).then((response) => {
        console.log(response)
        console.log(response.data)
        if (response.data.code !== '0') {
          this.$vux.toast.show({
            text: response.data.message,
            type: 'text'
          })
        } else {
          this.userSignatureList = response.data.data
        }
      }).catch(() => {
        this.$vux.toast.show({
          text: '系统异常',
          type: 'warn'
        })
      })
    },
    // 跳转修改用户签名页面
    goToModifyUserSignature (id) {
      this.$router.push({
        path: '/channel/editSignature/' + id
      })
    }
  }
}
</script>

<style>
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .card-demo-flex span {
    color: #f74c31;
  }
  .tabbar {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%
  }
</style>

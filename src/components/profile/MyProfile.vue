<template>
  <div style="height:100%;">
    <div class="vux-demo">
      <img class="logo" src="../../assets/frog.png" @click="easterEgg">
      <h3>省钱艺术家</h3>
      <h6 style="color: #808080;">v1.0.3</h6>
    </div>

    <view-box ref="viewBox" body-padding-bottom="150px">
      <div>
        <group title="设置">
          <x-switch title="签名开关" :value-map="['0', '1']" v-model="signatureSwitch" prevent-default @on-click="configSignatureSwitch"></x-switch>
        </group>
        <box gap="10px 10px">
          <x-button plain type="primary" style="border-radius:99px;" @click.native="goToAddUserSignature">新增签名</x-button>
        </box>
        <group title="签名">
          <div v-for="item in userSignatureList">
            <cell :title="item.title" @click.native="goToModifyUserSignature(item.id)" is-link>
              <badge id="defaultBadge" v-if="item.isDefault" text="默认"></badge>
            </cell>
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
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, Tabbar, TabbarItem, XButton, Group, GroupTitle, Cell, Card, Alert, XSwitch, Box, Badge } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

axios.defaults.withCredentials = true

export default {
  name: 'MyProfile',
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
    Box,
    Badge
  },
  data () {
    return {
      signatureSwitch: {},
      userSignatureList: [],
      eggCount: 0
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
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + '/profile/signature/switch'
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
    configSignatureSwitch (newVal, oldVal) {
      axios({
        method: 'put',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + '/profile/signature/switch'
      }).then((response) => {
        if (response.data.code !== '0') {
          this.$vux.toast.show({
            text: response.data.message,
            type: 'text'
          })
        } else {
          this.signatureSwitch = newVal === true ? '1' : '0'
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
        path: '/profile/addSignature'
      })
    },
    // 查询用户签名列表
    queryUserSignatureList () {
      axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + '/profile/signature/list'
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
        path: '/profile/editSignature/' + id
      })
    },
    // 彩蛋
    easterEgg () {
      this.eggCount ++
      if (this.eggCount >= 5) {
        this.$vux.toast.show({
          text: '呱~~~~~',
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
    margin-top:46px;
  }
  .logo {
    width: 120px;
    height: 120px;
  }
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
  #defaultBadge {
    background: #FF8C00;
  }
</style>

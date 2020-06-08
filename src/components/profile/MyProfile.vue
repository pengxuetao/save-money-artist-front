<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-bottom="55px">
      <div>
        <panel type="5" :list="panelBodylist" @on-img-error="onImgError()"></panel>
        <group title="设置">
          <cell title="我的资料" link="/profile/myProfileDetail"></cell>
          <cell title="修改密码" link="/profile/changePassword"></cell>
          <cell title="联系客服" is-link></cell>
          <cell title="关于我们" is-link></cell>
          <cell title="退出账号" is-link @click.native="openLogout"></cell>
        </group>

        <div v-transfer-dom>
          <confirm v-model="logoutShow"
                   @on-confirm="logoutConfirm">
            <p style="text-align:center;">{{ '是否确认退出当前账号?' }}</p>
          </confirm>
        </div>
      </div>
      <tabbar slot="bottom" class="tabbar" style="position: fixed">
        <tabbar-item>
          <img slot="icon" src="../../assets/icon_nav_msg.png">
          <span slot="label">资讯</span>
        </tabbar-item>
        <tabbar-item link="/income/summaryIncome">
          <img slot="icon" src="../../assets/icon_nav_article.png">
          <span slot="label">收益</span>
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
import { ViewBox, Tabbar, TabbarItem, XButton, Group, Cell, Alert, Confirm, Panel, TransferDomDirective as TransferDom } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

axios.defaults.withCredentials = true

export default {
  name: 'MyProfile',
  directives: {
    TransferDom
  },
  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
    XButton,
    Group,
    Cell,
    Alert,
    Confirm,
    Panel
  },
  data () {
    return {
      myProfileInfo: {},
      logoutShow: false,
      panelBodylist: []
    }
  },
  created () {
    this.getMyProfileInfo()
  },
  methods: {
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
        this.panelBodylist = [{
          src: 'https://avatars0.githubusercontent.com/u/559179?s=180&v=4',
          title: this.myProfileInfo.realName,
          desc: '手机号: ' + this.myProfileInfo.mobile
        }]
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
    // 打开退出账号弹框
    openLogout () {
      this.logoutShow = true
    },
    // 退出账号
    logoutConfirm () {
      this.$router.push('/')
    },
    // Panel加载图片错误时触发的事件
    onImgError () {
      this.panelBodylist = [{
        src: 'https://avatars0.githubusercontent.com/u/31625193?s=180&v=4',
        title: this.myProfileInfo.realName,
        desc: '手机号: ' + this.myProfileInfo.mobile
      }]
    }
  }
}
</script>

<style>
  .tabbar {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%
  }
</style>

<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1>智融资讯</h1>
    </div>

    <div>
      <form>
        <group title="登录" label-width="4.5em" label-margin-right="2em" label-align="right">
          <x-input title="手机号码" type="text" v-model="userMobile" placeholder="请输入手机号码"></x-input>
          <x-input title="密码" type="password" v-model="userPassword" placeholder="请输入密码"></x-input>
        </group>
      </form>
      <box gap="10px 10px">
        <x-button type="primary" @click.native="login()">登录</x-button>
        <x-button type="default" link="/register">新用户注册</x-button>
      </box>
    </div>
  </div>
</template>

<script>
import { XButton, Group, Cell, XInput, Alert, Box } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

export default {
  name: 'Login',
  components: {
    XButton,
    Group,
    Cell,
    XInput,
    Alert,
    Box
  },
  data () {
    return {
      userMobile: '',
      userPassword: ''
    }
  },
  methods: {
    login () {
      console.log('---开始登录---')
      console.log(this.userMobile)
      console.log(this.userPassword)
      // Indicator.open('正在登陆，请稍后...');
      // axios.defaults.timeout = 2000
      axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + 'user/mobileLogin',
        data: {
          mobile: this.userMobile,
          password: this.userPassword
        }
      }).then((data) => {
        console.log(data)
        console.log(data.data)
        if (data.data.code === '1000') {
          // this.$vux.alert.show({
          //   title: '用户登录',
          //   content: 'Do you agree?',
          //   onShow () {
          //     console.log('登录成功')
          //   },
          //   onHide () {
          //     console.log('Plugin: I\'m hiding')
          //   }
          // })
          console.log('开始跳转')
          this.$router.push({
            path: '/income/summaryIncome'
          })
        } else {
          this.$vux.alert.show({
            title: '用户登录',
            content: 'Do you agree?',
            onShow () {
              console.log(data.data.message)
            },
            onHide () {
              console.log('Plugin: I\'m hiding')
            }
          })
        }
        // switch (data.data.code) {
        //   case 9999:
        //     // Indicator.close();
        //     // Toast({
        //     //   message: '登陆成功',
        //     //   position: 'center',
        //     //   duration: 3000
        //     // });
        //     // localStorage.curUser = state.user_login;
        //     // commit('handleLogin', data.data);
        //     // state.user_login = '';
        //     // state.pwd_login = '';
        //     location.reload()
        //     break
        //   case 0:
        //     // Indicator.close();
        //     // Toast({
        //     //   message: '用户名或密码错误',
        //     //   position: 'center',
        //     //   duration: 3000
        //     // });
        //     break
        //   default:
        //     // Indicator.close();
        //     // Toast({
        //     //   message: '未知错误',
        //     //   position: 'center',
        //     //   duration: 3000
        //     // });
        //     break
        // }
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
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>

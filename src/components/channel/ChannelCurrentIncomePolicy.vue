<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="用户政策" class="x-header" style="position: fixed"></x-header>
      <div style="padding:0 15px;">
        <x-table :cell-bordered="false" :content-bordered="false">
          <thead>
          <tr style="background-color: #F7F7F7">
            <th>等级</th>
            <th>最小数量<=</th>
            <th><=最大数量</th>
            <th>结算价</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in currentIncomePolicyList">
            <td>{{item.policyLevel}}</td>
            <td>{{item.userMinNumber}}</td>
            <td>{{item.userMaxNumber}}</td>
            <td style="width: 20%">
              <x-input type="text" v-model="item.incomePrice" text-align="center"></x-input>
            </td>
            <td>
              <x-button type="primary" mini @click.native="updateIncomePolicy(item)">更新</x-button>
            </td>
          </tr>
          </tbody>
        </x-table>
      </div>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Tabbar, TabbarItem, XTable, Group, Cell, Alert, XButton, XInput, AlertModule } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

axios.defaults.withCredentials = true

export default {
  name: 'ChannelCurrentIncomePolicy',
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    XTable,
    Group,
    Cell,
    Alert,
    XButton,
    XInput
  },
  data () {
    return {
      currentIncomePolicyList: []
    }
  },
  created () {
    this.getCurrentIncomePolicyList()
  },
  methods: {
    getCurrentIncomePolicyList () {
      // Indicator.open('正在登陆，请稍后...');
      // axios.defaults.timeout = 2000
      axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        params: {
          page: 1,
          limit: 10
        },
        url: Global.serverUrl + 'incomePolicy/queryCurrentIncomePolicyListByUserId/' + this.$route.query.userId
      }).then((data) => {
        console.log(data)
        console.log(data.data)
        this.currentIncomePolicyList = data.data.list
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
    updateIncomePolicy (item) {
      let policyData = {
        id: item.id,
        userId: item.userId,
        policyType: item.policyType,
        policyLevel: item.policyLevel,
        incomePrice: item.incomePrice
      }
      axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: policyData,
        url: Global.serverUrl + 'incomePolicy/updateIncomePolicyMobile'
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

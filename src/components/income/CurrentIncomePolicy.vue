<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="我的政策" class="x-header" style="position: fixed"></x-header>
      <div style="padding:0 15px;">
        <x-table :cell-bordered="false" :content-bordered="false">
          <thead>
          <tr style="background-color: #F7F7F7">
            <th>等级</th>
            <th>最小数量<=</th>
            <th><=最大数量</th>
            <th>结算价</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in currentIncomePolicyList">
            <td>{{item.policyLevel}}</td>
            <td>{{item.userMinNumber}}</td>
            <td>{{item.userMaxNumber}}</td>
            <td>{{item.incomePrice}}</td>
          </tr>
          </tbody>
        </x-table>
      </div>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Tabbar, TabbarItem, XTable, Group, Cell, Alert } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

axios.defaults.withCredentials = true

export default {
  name: 'CurrentIncomePolicy',
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    XTable,
    Group,
    Cell,
    Alert
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
        url: Global.serverUrl + 'incomePolicy/queryCurrentIncomePolicyListByLoginUserId'
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

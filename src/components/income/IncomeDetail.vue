<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="我的收益" class="x-header" style="position: fixed"></x-header>
      <div>
        <group title="收益明细">
          <cell title="收益明细" link="/income/incomeRecordList"></cell>
        </group>
        <group title="渠道政策">
          <cell title="我的政策" link="/income/currentIncomePolicy"></cell>
          <cell title="下级政策" link="/income/lowerIncomePolicy"></cell>
        </group>
      </div>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Tabbar, TabbarItem, XButton, Group, Cell, Alert } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

axios.defaults.withCredentials = true

export default {
  name: 'IncomeDetail',
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    XButton,
    Group,
    Cell,
    Alert
  },
  data () {
    return {
      summaryIncome: {}
    }
  },
  created () {
    this.getSummaryIncome()
  },
  methods: {
    getSummaryIncome () {
      // Indicator.open('正在登陆，请稍后...');
      // axios.defaults.timeout = 2000
      axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: Global.serverUrl + 'income/querySummaryIncome'
      }).then((data) => {
        console.log(data)
        console.log(data.data)
        this.summaryIncome = data.data
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

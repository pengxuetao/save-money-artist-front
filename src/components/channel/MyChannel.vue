<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="我的渠道" class="x-header" style="position: fixed"><a slot="right" @click="addChannel()">新增+</a></x-header>
      <div>
        <tab>
          <tab-item selected @on-item-click="getChannelList('')">全部渠道</tab-item>
          <tab-item @on-item-click="getChannelList('01')">商户渠道</tab-item>
          <tab-item @on-item-click="getChannelList('02')">用户渠道</tab-item>
        </tab>
        <group>
          <cell-box v-for="(item, index) in channelList" :key="index" is-link>
            <flexbox @click.native="queryChannelListDetail(item)">
              <flexbox-item :span="12">
                <p>{{ item.realName }} - {{ item.phone }}</p>
                <p>有效推广数量 {{ item.effectiveCount }} 个</p>
                <p>当前政策价 {{ item.currentPrice }} 元</p>
                <p>{{ item.status }}</p>
              </flexbox-item>
            </flexbox>
          </cell-box>
        </group>
      </div>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Tab, TabItem, Flexbox, FlexboxItem, Group, Cell, CellBox, Alert } from 'vux'
import axios from 'axios'
import Global from '@/components/Global.vue'

axios.defaults.withCredentials = true

export default {
  name: 'MyChannel',
  components: {
    ViewBox,
    XHeader,
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    CellBox,
    Alert
  },
  data () {
    return {
      channelList: []
    }
  },
  created () {
    this.getChannelList()
  },
  methods: {
    getChannelList (channelType) {
      let channelSearch = {
        channelType: channelType
      }
      // Indicator.open('正在登陆，请稍后...');
      // axios.defaults.timeout = 2000
      axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        // params: {
        // page: 1,
        // limit: 10
        // },
        data: channelSearch,
        url: Global.serverUrl + 'channel/queryChannelListByRmmdUserIdMobile'
      }).then((data) => {
        console.log(data)
        console.log(data.data)
        this.channelList = data.data.list
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
    queryChannelListDetail (item) {
      this.$router.push({
        path: '/channel/channelListDetail',
        query: {
          channelInfo: item
        }
      })
    },
    addChannel () {
      this.$router.push({
        path: '/channel/addChannel'
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

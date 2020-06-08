<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" title="渠道详情" class="x-header" style="position: fixed"></x-header>
      <div>
        <group>
          <cell-form-preview :list="list"></cell-form-preview>
        </group>
        <box gap="10px 10px">
          <flexbox :gutter="2">
            <flexbox-item :span="6">
              <x-button type="primary" @click.native="modifyProfile()">完善资料</x-button>
            </flexbox-item>
            <flexbox-item :span="6">
              <x-button type="primary" @click.native="modifyIncomePolicy()">调整政策</x-button>
            </flexbox-item>
          </flexbox>
        </box>
      </div>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Group, CellBox, CellFormPreview, Flexbox, FlexboxItem, Box, XButton } from 'vux'

export default {
  name: 'ChannelListDetail',
  components: {
    ViewBox,
    XHeader,
    Group,
    CellBox,
    CellFormPreview,
    Flexbox,
    FlexboxItem,
    Box,
    XButton
  },
  data () {
    return {
      list: [{
        label: '智融号',
        value: this.$route.query.channelInfo.userId
      }, {
        label: '真实姓名',
        value: this.$route.query.channelInfo.realName
      }, {
        label: '推荐人用户ID',
        value: this.$route.query.channelInfo.rmmdUserId
      }, {
        label: '用户加密手机',
        value: this.$route.query.channelInfo.phone
      }, {
        label: '银联状态',
        value: this.$route.query.channelInfo.status
      }, {
        label: '有效推荐数量',
        value: this.$route.query.channelInfo.effectiveCount + '个'
      }, {
        label: '当前政策价',
        value: this.$route.query.channelInfo.currentPrice + '元'
      }, {
        label: '用户创建日期',
        value: this.$route.query.channelInfo.createTime
      }]
    }
  },
  methods: {
    // 修改用户资料
    modifyProfile () {
      this.$router.push({
        path: '/channel/channelProfileDetail',
        query: {
          userId: this.$route.query.channelInfo.userId
        }
      })
    },
    // 修改用户当前享受的收益政策
    modifyIncomePolicy () {
      this.$router.push({
        path: '/channel/channelCurrentIncomePolicy',
        query: {
          userId: this.$route.query.channelInfo.userId
        }
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

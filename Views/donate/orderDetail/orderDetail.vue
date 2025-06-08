<template>
	<view class="flex-col page">
	  <view class="flex-col section">
	    <view class="flex-row justify-between self-stretch group">
	      <text @click="transfer(1)" class="font text" :style="{color: firstTextColor}">所有预约</text>
	      <text @click="transfer(2)" class="font" :style="{color: secondTextColor}">等待取件</text>
	      <text @click="transfer(3)" class="font text_2" :style="{color: thirdTextColor}">完成回收</text>
	    </view>
	    <view class="self-start section_2" :style="{marginLeft: offset + 'rpx'}"></view>
	  </view>
	  <view class="mt-20 flex-col">
	    <view class="flex-col list-item mt-27" v-for="(item, index) in recycleList" :key="index">
	      <view class="flex-row justify-between self-stretch group_2">
	        <text class="font_2 text_3">订单编号：{{item.id.toString().padStart(6, 0)}}</text>
	        <text class="font_3 text_4">等待取件</text>
	      </view>
	      <text class="mt-20 self-start font_4 text_5">回收类别：{{item.type == 0 ? '旧衣回收' : '书籍回收'}}</text>
	      <text class="mt-20 self-start font_5 text_6">预估重量：{{item.weight}}</text>
	      <text class="mt-20 self-start font_4 text_7">预约时间：{{item.cycleDate}}</text>
	      <text class="mt-20 self-start font_4 text_8" style="line-height: 35rpx; width: 90%;">取件地址：{{item.region.split('/').join('') + ' ' + item.detailAddress}}</text>
	      <view class="mt-20 flex-row items-center self-stretch group_3">
	        <text class="font_4 text_9">回收奖励：</text>
	        <text class="ml-2 font_6">{{item.cycleReward}}</text>
	        <text class="ml-2 font_3 text_10">积分</text>
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import {onMounted, ref} from 'vue'
	import { DomainName } from '../../../common/global';
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	const firstTextColor = ref('#000')
	const secondTextColor = ref('#989898')
	const thirdTextColor = ref('#989898')
	const offset = ref(18.75)
	
	const recycleId = ref(1)
	
	const transfer = (val:any) => {
		if(val == 1){
			recycleId.value = val
			firstTextColor.value = '#000'
			secondTextColor.value = '#989898'
			thirdTextColor.value = '#989898'
			offset.value = 18.75
			recycleList.value = originalRecycleList.value
		}else if(val == 2){
			recycleId.value = val
			secondTextColor.value = '#000'
			firstTextColor.value = '#989898'
			thirdTextColor.value = '#989898'
			offset.value = 270
			recycleList.value = originalRecycleList.value.filter(item => item.isAccess == 0)
		}else{
			recycleId.value = val
			thirdTextColor.value = '#000'
			firstTextColor.value = '#989898'
			secondTextColor.value = '#989898'
			offset.value = 515
			recycleList.value = originalRecycleList.value.filter(item => item.isAccess == 1)
		}
	}
	
	const recycleList = ref([])
	const originalRecycleList = ref([])

	const queryAllRecycleRecord = async () => {
		const res = await uni.request({
			url: DomainName + '/recycle/queryAllRecycleRecord',
			method: 'GET',
			data: {
				userId: userStore.user.id
			}
		})
		originalRecycleList.value = res.data.data
		recycleList.value = originalRecycleList.value
	}
	
	

	onMounted(() => {
		queryAllRecycleRecord()
	})
	
</script>

<style lang="scss" scoped>
.mt-27 {
  margin-top: 50.63rpx;
}
.page {
  padding-bottom: 150rpx;
  background-color: #f5f5f5;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.section {
  padding: 0 67.5rpx;
  background-color: #ffffff;
}
.group {
  padding: 41.25rpx 0 33.75rpx;
}
.font {
  font-size: 30rpx;
  font-family: Inter;
  line-height: 27.71rpx;
  color: #989898;
}
.text {
  color: #000000;
  line-height: 27.66rpx;
}
.text_2 {
  line-height: 27.81rpx;
}
.section_2 {
  margin-left: 18.75rpx;
  background-color: #00ba9c;
  width: 78.75rpx;
  height: 3.75rpx;
  transition-property:margin-left;
          /* 设置需要过渡的属性 */
          transition-duration: 0.3s;
          /* 设置过渡的时间 */
}
.list-item {
  padding-bottom: 37.5rpx;
  background-color: #ffffff;
}
.list-item:first-child {
  margin-top: 0;
}
.group_2 {
  padding: 33.75rpx;
  border-bottom: solid 1.88rpx #e6e6e6;
}
.font_2 {
  font-size: 26.25rpx;
  font-family: Inter;
  line-height: 24.26rpx;
  color: #989898;
}
.text_3 {
  line-height: 24.34rpx;
}
.font_4 {
  font-size: 26.25rpx;
  font-family: Inter;
  line-height: 24.26rpx;
  color: #000000;
}
.text_5 {
  margin-left: 33.75rpx;
}
.font_5 {
  font-size: 26.25rpx;
  font-family: Inter;
  line-height: 27.71rpx;
  color: #000000;
}
.text_6 {
  margin-left: 33.75rpx;
}
.text_7 {
  margin-left: 33.75rpx;
  line-height: 24.15rpx;
}
.text_8 {
  margin-left: 33.75rpx;
  line-height: 24.39rpx;
}
.group_3 {
  padding: 0 33.75rpx;
}
.text_9 {
  line-height: 24.41rpx;
}
.font_3 {
  font-size: 26.25rpx;
  font-family: Inter;
  line-height: 24.26rpx;
  color: #00ba9c;
}
.text_4 {
  margin-right: 11.25rpx;
}
.font_6 {
  font-size: 26.25rpx;
  font-family: Inter;
  line-height: 19.61rpx;
  color: #00ba9c;
}
.text_10 {
  line-height: 24.04rpx;
}
@import url(../component/css/global1.css);
</style>

<template>
	<view class="flex-col page" :style="{marginTop: offset + 'rpx'}">
	  <view class="flex-col self-stretch">
	    <view class="flex-row">
	      <image
	        class="image equal-division-item"
	        :src="GreenChallenageImgUrl + 'bicycle/bicycle.png'"
	      />
	      <image
	        class="image equal-division-item"
	        :src="GreenChallenageImgUrl + 'bicycle/electrocar.png'"
	      />
	    </view>
	    <view class="flex-row">
	      <view  class="flex-col justify-start items-center text-wrapper"><text class="font">单车</text></view>
	      <view  class="flex-col justify-start items-center text-wrapper section"><text class="font">电动车</text></view>
	    </view>
	  </view>
	  
	  <view v-show="isShow"> 
		  <bikeVue></bikeVue>
	  </view>
	  
	  <view v-show="!isShow">
		  <electrocarVue></electrocarVue>
	  </view>
	 
	<view @click="bike" class="item1" :style="{marginTop: offset + 'rpx'}" v-show="!isShow"></view>
	<view @click="electrocar" class="item2" :style="{marginTop: offset + 'rpx'}" v-show="isShow"></view>
</view>
</template>

<script setup lang="ts">

		
	import { GreenChallenageImgUrl } from '../../../common/global';
	import {onMounted, ref} from 'vue'
	import bikeVue from '../component/bike.vue';
	import electrocarVue from '../component/electrocar.vue';
	import emitter from '../../../utils/emitter'
	const isShow = ref(true)
	const offset = ref(0)
	
	onMounted(() => {
		emitter.on('focus', () => {
			focus()
		})
		emitter.on('blur', () => {
			blur()
		})
	})
	
	const focus = () => {
		offset.value = -80
	}
	
	const blur = () => {
		offset.value = 0
	}
	
	
	const bike = () => {
		isShow.value = true
	}
	
	const electrocar = () => {
		isShow.value = false
	}
</script>

<style lang="scss" scoped>
.item1{
	  position: absolute;
	  left: 0;
	  top: 0;
	  background-color: #00000066;
	  width: 375rpx;
	  height: 437rpx;
}
.item2{
	  position: absolute;
	  right: 0;
	  top: 0;
	  background-color: #00000066;
	  width: 375rpx;
	  height: 437rpx;
}
.mt-25 {
  margin-top: 46.88rpx;
}
.page {
  background-color: #ffffff;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  margin-top: -200rpx;
}
.image {
  flex: 1 1 375rpx;
}
.equal-division-item {
  height: 365.63rpx;
}
.text-wrapper {
  padding: 21.53rpx 0 21.94rpx;
  flex: 1 1 375rpx;
  background-color: #0eb2b3;
  height: 71.25rpx;
}
.font {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.79rpx;
  color: #ffffff;
}
.section {
  padding-bottom: 43.46rpx;
  flex: 1 1 375rpx;
  background-color: #0eb2b3;
  height: 71.25rpx;
}
.group {
  margin: 36.88rpx 39.38rpx 0 43.13rpx;
  border-bottom: solid 1.88rpx #ededed;
}
.image-wrapper {
  padding: 60rpx 0 61.88rpx;
  background-color: #f4f5f7;
  width: 168.75rpx;
}
.image_2 {
  width: 48.75rpx;
  height: 46.88rpx;
}
.group_2 {
  padding: 37.39rpx 3.75rpx 28.24rpx 16.01rpx;
  border-top: solid 1.88rpx #ededed;
}
.text_4 {
  color: #22adae;
  line-height: 30rpx;
}
.text-wrapper_1 {
  background-color: #ffffff;
  width: 324.38rpx;
  height: 54.38rpx;
}
.text_1 {
  margin-left: 8.57rpx;
  font-size: 30rpx;
}
.font_3 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 31.88rpx;
}
.text_2 {
  color: #616161;
}
.group_3 {
  margin-top: 63.75rpx;
  width: 642.28rpx;
}
.text_5 {
  color: #000000;
  width: 236.25rpx;
}
.image_3 {
  width: 298.13rpx;
  height: 264.38rpx;
}
.group_4 {
  margin-top: 63.75rpx;
  padding-left: 54.38rpx;
  padding-right: 52.76rpx;
}
.text-wrapper_3 {
  padding: 21.64rpx 0 21.86rpx;
  background-color: #0eb2b3;
  border-radius: 93.75rpx;
  width: 278.16rpx;
  height: 71.25rpx;
}
.text_8 {
  line-height: 27.75rpx;
}
.text-wrapper_4 {
  padding: 21.64rpx 0 21.86rpx;
  background-color: #04c364;
  border-radius: 93.75rpx;
  width: 278.16rpx;
  height: 71.25rpx;
}
.text_7 {
  line-height: 27.75rpx;
}
@import url(../component/css/global1.css);
</style>

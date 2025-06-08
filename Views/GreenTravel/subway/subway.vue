<template>
	<view class="flex-col page">
	  <view class="flex-col">
	    <view class="flex-row">
	      <image
	        class="image equal-division-item"
	        :src="GreenChallenageImgUrl + 'subway/dt.png'"
	      />
	      <image
	        class="image equal-division-item"
	        :src="GreenChallenageImgUrl + 'subway/gjc.png'"
	      />
	    </view>
	    <view class="flex-row">
	      <view class="flex-col justify-start items-center text-wrapper"><text class="font">地铁</text></view>
	      <view class="flex-col justify-start items-center text-wrapper section"><text class="font">公交</text></view>
	    </view>
	  </view>
	  
	  
	  <view v-show="isShow">
	  		  <subwayVue></subwayVue>
	  </view>
	  
	  <view v-show="!isShow">
	  		  <busVue></busVue>
	  </view>
	  

	  <view @click="isShow = true" class="item1" :style="{marginTop: offset + 'rpx'}" v-show="!isShow"></view>
	  <view @click="isShow = false" class="item2" :style="{marginTop: offset + 'rpx'}" v-show="isShow"></view>
	  
	</view>
</template>

<script setup lang="ts">
	import { GreenChallenageImgUrl } from '../../../common/global';
	import {ref} from 'vue'
	import subwayVue from '../component/subway.vue';
	import busVue from '../component/bus.vue';
	const isShow = ref(true)

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
.page {
  background-color: #ffffff;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.image {
  flex: 1 1 375rpx;
}
.equal-division-item {
  height: 365.63rpx;
}
.text-wrapper {
  padding: 21.68rpx 0 22.01rpx;
  flex: 1 1 375rpx;
  background-color: #0eb2b3;
  height: 71.25rpx;
}
.font {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.56rpx;
  color: #ffffff;
}
.section {
  padding-bottom: 43.69rpx;
  flex: 1 1 375rpx;
  background-color: #0eb2b3;
  height: 71.25rpx;
}
.section_2 {
  padding: 56.57rpx 43.13rpx 73.13rpx;
  background-color: #ffffff;
}
.font_2 {
  font-size: 26.25rpx;
  font-family: Open Sans;
}
.text_2 {
  color: #616161;
  line-height: 24.99rpx;
}
.image-wrapper {
  margin-top: 70.31rpx;
  padding: 60rpx 0 61.88rpx;
  background-color: #f4f5f7;
  width: 168.75rpx;
}
.image_2 {
  width: 48.75rpx;
  height: 46.88rpx;
}
.group {
  margin-top: 69.38rpx;
  padding: 40.65rpx 19.35rpx 0 29.12rpx;
  border-top: solid 1.88rpx #ededed;
}
.text_3 {
  color: #000000;
  line-height: 31.88rpx;
}
.image_3 {
  width: 498.75rpx;
  height: 290.63rpx;
}
.group_2 {
  margin-top: 56.25rpx;
  padding-left: 11.25rpx;
  padding-right: 9.64rpx;
}
.text-wrapper_2 {
  padding: 21.64rpx 0 21.86rpx;
  flex: 1 1 278.16rpx;
  background-color: #0eb2b3;
  border-radius: 93.75rpx;
  height: 71.25rpx;
}
.text_1 {
  line-height: 27.75rpx;
}
.text-wrapper_3 {
  padding: 21.64rpx 0 21.86rpx;
  flex: 1 1 278.16rpx;
  background-color: #04c364;
  border-radius: 93.75rpx;
  height: 71.25rpx;
}
.text_4 {
  line-height: 27.75rpx;
}
@import url(../component/css/global1.css);
</style>

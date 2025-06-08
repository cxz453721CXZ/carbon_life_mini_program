<template>
	<view class="flex-col page">
	  <view class="flex-row justify-between group">
	    <view class="flex-col justify-start items-center text-wrapper"><text class="font text">全部</text></view>
	    <view class="flex-col justify-start items-center text-wrapper_2"><text class="font text_2">政策公告</text></view>
	    <view class="flex-col justify-start items-center text-wrapper_2"><text class="font text_3">低碳宣传</text></view>
	  </view>
	  <view class="mt-22 flex-col">
	    <view class="flex-row justify-center list-item mt-3" v-for="(item, index) in items" :key="index">
	      <image
	        class="self-center image"
	        :src="KnowledgeChallengeImgUrl + 'information/banner.png'"
	      />
	      <view class="ml-20 flex-col self-start group_2">
	        <text class="self-stretch font_2">知识科普：碳源、碳汇和碳足迹</text>
	        <text class="self-start font_3 mt-19">2024-07-29</text>
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { KnowledgeChallengeImgUrl } from '../../../common/global';
	import {ref} from 'vue'
	const items = ref([null, null, null, null])
</script>

<style lang="scss" scoped>
.mt-3 {
  margin-top: 5.63rpx;
}
.mt-19 {
  margin-top: 35.63rpx;
}
.page {
  padding: 31.88rpx 31.88rpx 99.38rpx;
  background-color: #f6f6f6;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group {
  padding: 0 15rpx;
}
.text-wrapper {
  padding: 18.75rpx 0;
  background-color: #4ece72;
  border-radius: 18.75rpx;
  width: 150rpx;
  height: 75rpx;
}
.font {
  font-size: 37.5rpx;
  font-family: Open Sans;
  line-height: 35.63rpx;
  color: #000000;
}
.text {
  color: #ffffff;
  line-height: 34.58rpx;
}
.text-wrapper_2 {
  padding: 18.75rpx 0;
  background-color: #ffffff;
  border-radius: 18.75rpx;
  width: 208.13rpx;
  height: 75rpx;
}
.text_2 {
  line-height: 34.95rpx;
}
.text_3 {
  line-height: 34.5rpx;
}
.list-item {
  padding: 30rpx 33.75rpx;
  background-color: #ffffff;
  border-radius: 9.38rpx;
}
.list-item:first-child {
  margin-top: 0;
}
.image {
  width: 277.5rpx;
  height: 170.63rpx;
}
.group_2 {
  margin-top: 15rpx;
  width: 298.13rpx;
}
.font_2 {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 35.63rpx;
  color: #000000;
}
.font_3 {
  font-size: 22.5rpx;
  font-family: Open Sans;
  line-height: 16.54rpx;
  color: #7a7a78;
}
@import url('../component/css/global1.css');
</style>

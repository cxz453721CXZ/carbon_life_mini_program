<template>
	<view class="flex-col page">
	  <view class="flex-row justify-between">
		<text class="font text">历史记录</text>
		<text class="font text_2">清除</text>
	  </view>
	  <view class="flex-row group mt-28">
		<view class="flex-col justify-start items-center text-wrapper" v-for="(item, index) in items" :key="index">
		  <text class="font_2">低碳生活</text>
		</view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import {ref} from 'vue'
	const items = ref([null, null, null])
</script>

<style lang="scss" scoped>
	.page {
	  padding: 59.04rpx 35.57rpx 1056.38rpx 43.09rpx;
	  background-color: #ffffff;
	  mix-blend-mode: LUMINOSITY;
	  width: 100%;
	  overflow-y: auto;
	  overflow-x: hidden;
	  height: 100%;
	}
	.font {
	  font-size: 30rpx;
	  font-family: Open Sans;
	  line-height: 27.54rpx;
	}
	.text {
	  color: #000000;
	}
	.text_2 {
	  color: #4a616e;
	  line-height: 27.64rpx;
	}
	.group {
	  padding: 0 13.05rpx;
	}
	.text-wrapper {
	  padding: 16.88rpx 0 15.22rpx;
	  background-color: #ecf1f5;
	  border-radius: 15rpx;
	  width: 153.75rpx;
	  height: 56.25rpx;
	  margin-right: 30rpx;
	}
	.font_2 {
	  font-size: 26.25rpx;
	  font-family: Open Sans;
	  line-height: 24.15rpx;
	  color: #565c5c;
	}
	@import url(./css/global1.css);
</style>
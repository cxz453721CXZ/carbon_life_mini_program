<template>
	<view class="flex-col self-center relative section">
	  <view class="flex-col self-stretch section_2">
	    <view class="flex-row justify-center items-center">
	      <image
	        class="image_2"
	        :src="KnowledgeChallengeImgUrl + 'component/dg.png'"
	      />
	      <text class="text ml-13">签到成功</text>
	    </view>
	    <view class="flex-row justify-center items-center mt-25">
	      <text class="text_2">积分</text>
	      <text class="ml-2 text_3">＋</text>
	      <text class="ml-2 text_4">1</text>
	    </view>
	  </view>
	  <image
		@click="close"
	    class="self-center image_3 mt-29"
	    :src="KnowledgeChallengeImgUrl + 'component/cha.png'"
	  />
	</view>
</template>

<script setup lang="ts">
	import { KnowledgeChallengeImgUrl } from '../../../common/global';
	import emitter from '../../../utils/emitter';
	const close = () => {
		emitter.emit('closeCheckIn')
	}
</script>

<style lang="scss" scoped>
	.ml-13 {
	  margin-left: 24.38rpx;
	}
	.mt-25 {
	  margin-top: 46.88rpx;
	}
	.mt-29 {
	  margin-top: 54.38rpx;
	}
	.section {
	  margin-top: -273.75rpx;
	  padding-bottom: 18.75rpx;
	  background-color: #ffffff00;
	  border-radius: 18.75rpx;
	  width: 643.13rpx;
	}
	.section_2 {
	  padding: 76.88rpx 0 90rpx;
	  background-color: #ffffff;
	  border-radius: 18.75rpx;
	}
	.image_2 {
	  width: 76.88rpx;
	  height: 76.88rpx;
	}
	.text {
	  color: #0bba81;
	  font-size: 45rpx;
	  font-family: Open Sans;
	  line-height: 41.89rpx;
	}
	.text_2 {
	  color: #7a7a78;
	  font-size: 37.5rpx;
	  font-family: Open Sans;
	  line-height: 34.35rpx;
	}
	.text_3 {
	  color: #0bba81;
	  font-size: 37.5rpx;
	  font-family: Tahoma;
	  line-height: 27.22rpx;
	}
	.text_4 {
	  color: #0bba81;
	  font-size: 45rpx;
	  font-family: Tahoma;
	  line-height: 32.83rpx;
	}
	.image_3 {
	  width: 84.38rpx;
	  height: 84.38rpx;
	}
	@import url("css/global1.css");
</style>
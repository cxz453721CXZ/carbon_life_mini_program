<template>
	<view class="flex-col section">
	  <image
	    class="self-center image"
	    :src="PointsMallImgUrl + 'component/success.png'"
	  />
	  <view class="flex-col self-stretch mt-19">
	    <text class="self-center font text">兑换成功</text>
	    <view @click="jumpToDetail" class="mt-24 flex-col justify-start items-center self-stretch text-wrapper" style="width: 300rpx;">
	      <text class="font text_2">查看兑换记录</text>
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { PointsMallImgUrl } from '../../../common/global';
	const jumpToDetail = () => {
		uni.navigateTo({
			url:'../orderDetail/orderDetail'
		})
	}
</script>

<style scoped lang="scss">
	.mt-19 {
	  margin-top: 35.63rpx;
	}
	.section {
	  margin: 0 35.63rpx;
	  padding: 46.88rpx 108.75rpx 33.75rpx;
	  background-color: #ffffff;
	  border-radius: 18.75rpx;
	  .image {
	    width: 65.63rpx;
	    height: 65.63rpx;
	  }
	  .font {
	    font-size: 30rpx;
	    font-family: Microsoft YaHei UI;
	    line-height: 29.21rpx;
	  }
	  .text {
	    color: #000000;
	  }
	  .text-wrapper {
	    padding: 18.75rpx 0;
	    background-color: #00ba9c;
	    border-radius: 93.75rpx;
	    .text_2 {
	      color: #ffffff;
	      line-height: 29.18rpx;
	    }
	  }
	}
	

	@import url('../css/global1.css');
</style>
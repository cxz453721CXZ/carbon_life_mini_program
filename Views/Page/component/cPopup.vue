<template>
	<view class="flex-col section">
	  <view class="flex-col group">
	    <view class="flex-row justify-evenly items-center self-stretch">
	      <text class="font">兑换商品将消耗</text>
	      <text class="text">{{changePrice}}</text>
	      <text class="font text_2">积分</text>
	    </view>
	    <text class="mt-12 self-center font text_3">确认兑换吗？</text>
	  </view>
	  <view class="mt-44 flex-row justify-between">
	    <view @click="cancel" class="flex-col justify-start items-center text-wrapper"><text class="font_2 text_4">取消</text></view>
	    <view @click="confirm" class="flex-col justify-start items-center text-wrapper_2"><text class="font_2 text_5">确定</text></view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import emitter from '../../../utils/emitter';
	defineProps(['changePrice'])
	const confirm = () => {
		emitter.emit('changeGoods')
		emitter.emit('cPopClose')
		
		// emitter.emit('successPop')
	}
	
	const cancel = () => {
		emitter.emit('cPopClose')
	}
</script>

<style lang="scss" scoped>
	.section {
	  margin: 0 35.63rpx;
	  padding: 52.5rpx 61.88rpx 37.5rpx;
	  background-color: #ffffff;
	  border-radius: 18.75rpx;
	  .group {
	    padding-left: 82.5rpx;
	    padding-right: 71.25rpx;
	    .font {
	      font-size: 33.75rpx;
	      font-family: Microsoft YaHei UI;
	      line-height: 32.92rpx;
	      color: #000000;
	    }
	    .text {
	      color: #00ba9c;
	      font-size: 37.5rpx;
	      font-family: Times New Roman;
	      font-weight: 700;
	      line-height: 25.86rpx;
	    }
	    .text_2 {
	      color: #00ba9c;
	      line-height: 32.85rpx;
	    }
	    .text_3 {
	      line-height: 32.96rpx;
	    }
	  }
	  .text-wrapper {
	    padding: 15rpx 0;
	    background-color: #f2f2f2;
	    border-radius: 93.75rpx;
	    width: 185.63rpx;
	    height: 55.54rpx;
	    .text_4 {
	      color: #000000;
	      line-height: 25.28rpx;
	    }
	  }
	  .text-wrapper_2 {
	    padding: 15rpx 0;
	    background-color: #00ba9c;
	    border-radius: 93.75rpx;
	    width: 185.63rpx;
	    height: 55.54rpx;
	    .text_5 {
	      color: #ffffff;
	    }
	  }
	  .font_2 {
	    font-size: 26.25rpx;
	    font-family: Microsoft YaHei UI;
	    line-height: 25.61rpx;
	  }
	}
	
	@import url('../css/global1.css');
</style>
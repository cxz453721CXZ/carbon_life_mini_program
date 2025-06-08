<template>
<view class="flex-col section">
  <text class="self-center text">地址删除后无法恢复</text>
  <text class="self-center font text_2">是否删除地址?</text>
  <view class="flex-row justify-between self-stretch group">
    <view @click="cancel" class="flex-col justify-start items-center text-wrapper"><text class="font text_3">取消</text></view>
    <view @click="conform" class="flex-col justify-start items-center text-wrapper_2"><text class="font text_4">确定</text></view>
  </view>
</view>
</template>

<script setup lang="ts">
	import { DomainName } from '../../../common/global';
	import emitter from '../../../utils/emitter';
	const conform = async () => {
		
		emitter.emit('delAddress')
		emitter.emit('popClose')
	}
	
	const cancel = () => {
		emitter.emit('popClose')
	}
</script>

<style lang="scss" scoped>
.section {
  margin: 0 35.63rpx;
  padding: 60rpx 61.88rpx 33.75rpx;
  background-color: #ffffff;
  border-radius: 18.75rpx;
  .text {
    color: #000000;
    font-size: 33.75rpx;
    font-family: Microsoft YaHei UI;
    line-height: 32.85rpx;
  }
  .font {
    font-size: 26.25rpx;
    font-family: Microsoft YaHei UI;
    line-height: 25.43rpx;
  }
  .text_2 {
    margin-top: 48.75rpx;
    color: #8c92a4;
  }
  .group {
    margin-top: 63.75rpx;
    .text-wrapper {
      padding: 15rpx 0;
      background-color: #f2f2f2;
      border-radius: 93.75rpx;
      width: 185.63rpx;
      height: 55.54rpx;
	  margin-right: 75rpx;
      .text_3 {
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
	  margin-left: 75rpx;
      .text_4 {
        color: #ffffff;
        line-height: 25.61rpx;
      }
    }
  }
}

@import url('../css/global1.css');
</style>
<template>
	<view class="flex-col section">
	  <view class="flex-col group">
	    <view class="flex-row justify-between items-center group_2">
	      <view class="flex-row items-baseline">
	        <text class="text">{{totalPrice}}</text>
	        <text class="font text_2">积分</text>
	      </view>
	      <image
		    @click="close"
	        class="image"
	        :src="PointsMallImgUrl + 'component/cha.png'"
	      />
	    </view>
	    <view class="flex-row items-baseline group_3 mt-11">
	      <text class="font_2 text_3">已选：{{good.name}},</text>
	      <text class="font_2 text_4">{{cnt}}</text>
	      <text class="font_2 text_5">件</text>
	    </view>
	  </view>
	  <view class="flex-row justify-between items-center group_4">
	    <text class="font text_6">数量</text>
	    <view class="flex-row items-center">
	      <view class="flex-col justify-start items-center image-wrapper">
	        <image
			  @click="sub"
	          class="image_2"
			  :src="PointsMallImgUrl + 'component/sub.png'"
	        />
	      </view>
	      <view class="ml-10 flex-col justify-start items-center image-wrapper"><text class="text_7">{{ cnt }}</text></view>
	      <view class="ml-10 flex-col justify-start items-center image-wrapper">
	        <image
			  @click="add"
	          class="image_2"
	          :src="PointsMallImgUrl + 'component/add.png'"
	        />
	      </view>
	    </view>
	  </view>
	  <view @click="change" class="flex-col justify-start items-center text-wrapper"><text class="font text_8">确定</text></view>
	</view>
</template>

<script setup lang="ts">
	import { PointsMallImgUrl } from '../../../common/global';
	import emitter from '../../../utils/emitter';
	import {ref} from 'vue'
	
	const props = defineProps(['good'])
	const cnt = ref(1)
	const totalPrice = ref(props.good.price)
	const close = () => {
		emitter.emit('cClose', {
			confirm: false,
			cnt: 0
		})
	} 
	
	const change = () => {
		emitter.emit('cClose', {
			confirm: true,
			cnt: cnt.value
		})
	}
	
	const sub = () => {
		if (cnt.value > 1) {
			cnt.value --;
			totalPrice.value = cnt.value * props.good.price
		}
	}
	
	const add = () => {
		if (cnt.value < props.good.stock) {
			cnt.value ++;
			totalPrice.value = cnt.value * props.good.price
		}
	}
</script>

<style lang="scss" scoped>
	.mt-11 {
	  margin-top: 25.7rpx;
	}
	.section {
	  padding-bottom: 35.05rpx;
	  background-color: #ffffff;
	  border-radius: 35.05rpx 35.05rpx 0rpx 0rpx;
	  .group {
	    padding: 37.38rpx 0 32.71rpx;
	    border-bottom: solid 2.34rpx #ebebeb;
	    .group_2 {
	      padding-left: 46.73rpx;
	      padding-right: 25.7rpx;
	      .text {
	        color: #00ba9c;
	        font-size: 56.07rpx;
	        font-family: Times New Roman;
	        font-weight: 700;
	        line-height: 38.67rpx;
	      }
	      .text_2 {
	        color: #00ba9c;
	        line-height: 34.25rpx;
	      }
	      .image {
	        width: 42.06rpx;
	        height: 42.06rpx;
	      }
	    }
	    .group_3 {
	      padding: 0 46.73rpx;
	      .font_2 {
	        font-size: 32.71rpx;
	        font-family: Open Sans;
	        line-height: 29.95rpx;
	        color: #000000;
	      }
	      .text_3 {
	        line-height: 31.82rpx;
	      }
	      .text_4 {
	        line-height: 23.34rpx;
	      }
	      .text_5 {
	        margin-left: 9.35rpx;
	      }
	    }
	  }
	  .group_4 {
	    margin-top: 348.13rpx;
	    padding-left: 46.73rpx;
	    padding-right: 39.72rpx;
	    .text_6 {
	      color: #000000;
	    }
	    .image-wrapper {
	      width: 46.73rpx;
	      .image_2 {
	        width: 46.73rpx;
	        height: 46.73rpx;
	      }
	      .text_7 {
	        color: #000000;
	        font-size: 37.38rpx;
	        font-family: Open Sans;
	        line-height: 26.68rpx;
	      }
	    }
	  }
	  .font {
	    font-size: 37.38rpx;
	    font-family: Open Sans;
	    line-height: 34.51rpx;
	  }
	  .text-wrapper {
	    margin: 77.1rpx 39.72rpx 0;
	    padding: 23.36rpx 0;
	    background-color: #00ba9c;
	    border-radius: 116.82rpx;
	    .text_8 {
	      color: #ffffff;
	      font-weight: 700;
	      line-height: 35.28rpx;
	    }
	  }
	}
	
@import url('../css/global1.css');
</style>
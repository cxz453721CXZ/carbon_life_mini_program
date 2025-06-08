<template>
	<view class="flex-col self-center relative section">
	  <view class="flex-col self-stretch section_2">
	    <image
	      class="self-center image_2"
	      :src="KnowledgeChallengeImgUrl + 'component/wenjuan.png'"
	    />
	    <view class="flex-col self-stretch mt-35">
	      <view class="flex-col items-center">
	        <text class="font">您的问卷调查结果已提交</text>
	        <text class="mt-12 font text">并获得碳积分！</text>
	      </view>
	      <view class="flex-row items-center mt-21">
	        <image
	          class="image_3"
	          :src="KnowledgeChallengeImgUrl + 'component/jf.png'"
	        />
	        <text class="font text_3">＋</text>
	        <text class="text_2">5</text>
	      </view>
	    </view>
	  </view>
	  <image @click="close"
	    class="mt-28 self-center image_4"
	    :src="KnowledgeChallengeImgUrl + 'component/cha.png'"
	  />
	</view>
</template>

<script setup lang="ts">
	import { KnowledgeChallengeImgUrl } from '../../../common/global';
	import emitter from '../../../utils/emitter';
	const close = () => {
		
		routerJump('Views/GreeChallenge/checkIn/checkIn')
		
		// emitter.emit('questionClose')
	}
	
	const routerJump = (val:any) => {
		let pages = getCurrentPages();
		var num = pages.length
			//当前页面栈总数
		var backnum = num
		
		for( var i = 0; i < num; i ++ ){
				console.log(pages[i].route)
				//循环找到指定页面路由所在的页数
				if(pages[i].route == val){
				//'pages/mypage/mypage'替换成A页面的路由地址
					backnum = num - i - 1
					//计算返回的层数，总数-指定页面页数-1
				}		
			}
			
			uni.navigateBack({
					delta:backnum
					//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
				})
	}
	
</script>

<style lang="scss" scoped>
	.mt-35 {
	  margin-top: 65.63rpx;
	}
	.mt-21 {
	  margin-top: 39.38rpx;
	}
	.section {
	  margin-top: -388.13rpx;
	  padding-bottom: 20.63rpx;
	  background-color: #ffffff00;
	  border-radius: 18.75rpx;
	}
	.section_2 {
	  padding: 61.88rpx 112.5rpx 56.25rpx 116.25rpx;
	  background-color: #ffffff;
	  border-radius: 18.75rpx;
	}
	.image_2 {
	  width: 187.5rpx;
	  height: 187.5rpx;
	}
	.font {
	  font-size: 37.5rpx;
	  font-family: Open Sans;
	  line-height: 34.8rpx;
	  color: #000000;
	}
	.text {
	  line-height: 34.88rpx;
	}
	.image_3 {
	  margin-left: 112.5rpx;
	  width: 93.75rpx;
	  height: 93.75rpx;
	}
	.text_3 {
	  line-height: 27.22rpx;
	}
	.text_2 {
	  margin-left: 3.75rpx;
	  color: #000000;
	  font-size: 60rpx;
	  font-family: Open Sans;
	  line-height: 43.42rpx;
	}
	.image_4 {
	  width: 84.38rpx;
	  height: 84.38rpx;
	}
	@import url(../component/css/global1.css);
</style>
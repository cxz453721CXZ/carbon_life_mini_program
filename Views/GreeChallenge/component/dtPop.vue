<template>
	<view class="flex-col section">
	  <image
	    class="self-center image"
	    :src="KnowledgeChallengeImgUrl + 'component/xx.png'"
	  />
	  <text class="self-center font text">你的当前做题数据</text>
	  <view class="flex-row equal-division">
	    <view class="flex-col items-center equal-division-item">
	      <text class="font_2">{{ansArr[0]}}</text>
	      <text class="font_3 mt-13">今日答对</text>
	    </view>
	    <view class="flex-col items-center equal-division-item">
	      <text class="font_2">{{ansArr[1]}}</text>
	      <text class="font_3 mt-13">累计做题</text>
	    </view>
	    <view class="flex-col items-center equal-division-item">
	      <text class="font_2">{{ansArr[2]}}</text>
	      <text class="font_3 mt-13">累计天数</text>
	    </view>
	  </view>
	  <view @click="close" class="flex-col justify-start items-center self-center text-wrapper">
	    <text class="font text_2">返回</text> 
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { KnowledgeChallengeImgUrl } from '../../../common/global';
	import emitter from '../../../utils/emitter';
	import {onMounted, ref} from 'vue'
	
	const props = defineProps(['ansArr', 'typeId'])
	
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
	
	const close = () => {
		const id = props.typeId
		
		if(id == 0){
			routerJump('Views/GreeChallenge/answerGain/answerGain')
		}else {
			routerJump('Views/GreeChallenge/topicClass/topicClass')
		}

		// emitter.emit('ansClose')
	}
	
	
</script>

<style lang="scss" scoped>
	.mt-13 {
	  margin-top: 24.38rpx;
	}
	.section {
	  padding: 0 41.25rpx 52.5rpx;
	  background-image: linear-gradient(180deg, #bff3e4 0%, #ffffff 63.9%);
	  border-radius: 19rpx;
	  width: 643.13rpx;
	}
	.image {
	  width: 474.38rpx;
	  height: 249.38rpx;
	}
	.font {
	  font-size: 30rpx;
	  font-family: Times New Roman;
	  line-height: 27.81rpx;
	}
	.text {
	  margin-top: 11.25rpx;
	  color: #7a7a78;
	}
	.equal-division {
	  align-self: stretch;
	  margin-top: 45rpx;
	}
	.equal-division-item {
	  padding: 11.25rpx 0;
	  width: 186.04rpx;
	}
	.font_2 {
	  font-size: 52.5rpx;
	  font-family: Times New Roman;
	  line-height: 35.48rpx;
	  font-weight: 700;
	  color: #00a086;
	}
	.font_3 {
	  font-size: 26.25rpx;
	  font-family: Times New Roman;
	  line-height: 24.17rpx;
	  color: #000000;
	}
	.text-wrapper {
	  margin-top: 45rpx;
	  padding: 22.5rpx 0;
	  background-color: #00ba9c;
	  border-radius: 93.75rpx;
	  width: 420rpx;
	}
	.text_2 {
	  color: #ffffff;
	  font-weight: 700;
	  line-height: 27.49rpx;
	}
	@import url(./css/global1.css);
</style>
<template>
	<view class="flex-col page">
	  <view class="flex-col justify-start section">
	    <view class="flex-col section_2">
	      <image
	        class="self-center image"
	        :src="KnowledgeChallengeImgUrl + 'index/logo.png'"
	      />
	      <view class="mt-20 flex-row items-baseline self-stretch"> 
	        <text class="text">Hello</text>
	        <text class="text_2 ml-13">{{name}}，</text>
	      </view>
	      <view class="mt-20 flex-row justify-center items-baseline self-stretch">
	        <text class="font">今日获取碳积分</text>
	        <text class="text_3 ml-11">{{todayAllPoints}}</text>
	      </view>
	    </view>
	  </view>
	  <view class="flex-col relative group">
	    <view class="flex-col">
	      <view class="flex-row items-center section_3" @click="startChallenge">
	        <image
	          class="shrink-0 image_2"
	          :src="KnowledgeChallengeImgUrl + 'index/challenge.png'"
	        />
	        <text class="text_4">开始挑战</text>
	        <view class="flex-col justify-start items-center shrink-0 image-wrapper">
	          <image
	            class="image_3"
	            :src="KnowledgeChallengeImgUrl + 'index/yjt.png'"
	          />
	        </view>
	      </view>
	      <view class="flex-row justify-between items-center section_4" @click="pointsRank">
	        <text class="font text_5">积分排行榜</text>
	        <image
	          class="image_4"
	          :src="KnowledgeChallengeImgUrl + 'index/rank.png'"
	        />
	      </view>
	    </view>
	    <view class="mt-36 flex-col">
	      <text class="self-start text_6">每日任务</text>
	      <view class="mt-22 grid">
	        <view class="flex-col grid-item" @click="jumpToCheckIn">
	          <view class="flex-col items-center self-stretch">
	            <image
	              class="image_5"
	              :src="KnowledgeChallengeImgUrl + 'index/qd.png'"
	            />
	            <text class="font_2 text_7 mt-7">签到</text>
	          </view>
	          <text class="self-center font_3 text_8 mt-11">签到领取积分</text>
	        </view>
	        <view class="flex-col grid-item" @click="jumpToCheckIn">
	          <view class="flex-col items-center self-stretch">
	            <image
	              class="image_5"
	              :src="KnowledgeChallengeImgUrl + 'index/wj.png'"
	            />
	            <text class="font_2 mt-7">问卷调查</text>
	          </view>
	          <text class="self-center font_3 mt-11">完成问卷填写</text>
	        </view>
	        <view class="flex-col grid-item_2" @click="jumpToTopic">
	          <view class="flex-col items-center self-stretch">
	            <image
	              class="image_5"
	              :src="KnowledgeChallengeImgUrl + 'index/zs.png'"
	            />
	            <text class="font_2 text_9 mt-5">科普学习</text>
	          </view>
	          <text class="self-center font_3 text_11 mt-11">解锁双碳知识</text>
	        </view>
	        <view class="flex-col items-center grid-item_3" @click="jumpToInfo">
	          <image
	            class="image_5"
	            :src="KnowledgeChallengeImgUrl + 'index/zx.png'"
	          />
	          <text class="font_2 text_10">低碳资讯</text>
	          <text class="font_3 text_12">了解环保要闻</text>
	        </view>
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { onMounted , ref } from 'vue';
	import { DomainName, KnowledgeChallengeImgUrl } from '../../../common/global';
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	import { onShow } from "@dcloudio/uni-app";
	
	const todayAllPoints = ref(0)
	
	const name = ref('')
	
	
	const init = async () => {
		
		const res2 = await uni.request({
			url: DomainName + '/knowledge/initAllUserTodayPoints',
			method: 'GET',
			data: {
				todayDate: getDate()
			}
		})
		console.log(res2)
		
		
		updateUserTodayPoints()
		
	}
	
	
	onMounted(() => {
		init()
	})
	
	onShow(() => {
		updateUserTodayPoints()
	})
	
	
	const updateUserTodayPoints = async () => {
		if(userStore.user.id == '000000') name.value = '碳用户'
		else name.value = userStore.user.name
		
		const res = await uni.request({
			url: DomainName + '/knowledge/selectUserTodayPoints',
			method: 'GET',
			data: {
				userId: userStore.user.id,
				answerDate: getDate()
			}
		})
		todayAllPoints.value = res.data.data
		
		const response = await uni.request({
			url: DomainName + '/knowledge/registerUserTodayPoints',
			method: 'POST',
			data: {
				todayTime: getDate(),
				todayPoints: todayAllPoints.value,
				userId: userStore.user.id
			}
		})
		console.log(response)
	}
	
	
	const startChallenge = () => {
		uni.navigateTo({
			url: '../answerGain/answerGain?id=0'
		})
	}
	
	const pointsRank = () => {
		uni.navigateTo({
			url: '../personRank/personRank'
		})
	}
	
	const jumpToCheckIn = () => {
		uni.navigateTo({
			url: '../checkIn/checkIn'
		})
	}
	
	const jumpToInfo = () => {
		uni.navigateTo({
			url: '../information/information'
		})
	}
	
	const jumpToTopic = () => {
		uni.navigateTo({
			url: '../topicClass/topicClass'
		})
	}
	
	const getDate = () => {
		let now = new Date()
		let year = now.getFullYear()
		let month = (now.getMonth() + 1).toString().padStart(2, 0)
		let date = now.getDate().toString().padStart(2, 0)
		return year + '-' + month + '-' + date
	}
	
</script>

<style lang="scss" scoped> 
.ml-13 {
  margin-left: 24.38rpx;
}
.ml-11 {
  margin-left: 20.63rpx;
}
.mt-7 {
  margin-top: 13.13rpx;
}
.mt-5 {
  margin-top: 9.38rpx;
}
.mt-11 {
  margin-top: 20.63rpx;
}
.page {
  padding-bottom: 123.75rpx;
  background-color: #ecf3ec;
  mix-blend-mode: LUMINOSITY;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.section {
  border-radius: 0rpx 0rpx 56.25rpx 56.25rpx;
  background-image: url(https://carbon2.obs.cn-north-4.myhuaweicloud.com/carbon-life-static/KnowledgeChallenge/index/background.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.section_2 {
  padding: 136.88rpx 172.5rpx 273.75rpx 180rpx;
  background-color: #00000080;
  border-radius: 0rpx 0rpx 56.25rpx 56.25rpx;
}
.image {
  width: 140.63rpx;
  height: 140.63rpx;
}
.text {
  color: #ffffff;
  font-size: 67.5rpx;
  font-family: Open Sans;
  line-height: 51.94rpx;
}
.text_2 {
  color: #ffffff;
  font-size: 52.5rpx;
  font-family: Open Sans;
  line-height: 49.99rpx;
}
.font {
  font-size: 37.5rpx;
  font-family: Open Sans;
  line-height: 34.76rpx;
  color: #ffffff;
}
.text_3 {
  color: #55ae52;
  font-size: 60rpx;
  font-family: Microsoft New Tai Lue;
  line-height: 42.96rpx;
}
.group {
  margin-top: -123.75rpx;
  padding: 0 41.25rpx 7.5rpx;
}
.section_3 {
  padding: 43.13rpx 37.5rpx;
  background-color: #06b666;
  border-radius: 37.5rpx 37.5rpx 0rpx 0rpx;
}
.image_2 {
  width: 131.25rpx;
  height: 131.25rpx;
}
.text_4 {
  margin-left: 45rpx;
  color: #ffffff;
  font-size: 60rpx;
  font-family: Open Sans;
  line-height: 55.44rpx;
}
.image-wrapper {
  margin-left: 63.75rpx;
  padding: 30rpx 0;
  background-color: #ffffff66;
  border-radius: 50%;
  width: 114.38rpx;
  height: 114.38rpx;
}
.image_3 {
  width: 52.5rpx;
  height: 52.5rpx;
}
.section_4 {
  padding: 15rpx 37.5rpx;
  background-color: #06b66699;
  border-radius: 0rpx 0rpx 18.75rpx 18.75rpx;
}
.text_5 {
  line-height: 34.69rpx;
}
.image_4 {
  width: 56.25rpx;
  height: 56.25rpx;
}
.text_6 {
  margin-left: 7.5rpx;
  color: #000000;
  font-size: 45rpx;
  font-family: Open Sans;
  line-height: 41.63rpx;
}
.grid {
  height: 684.38rpx;
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-columns: repeat(2, minmax(0, 1fr));
  row-gap: 48.88rpx;
  column-gap: 52.63rpx;
}
.grid-item {
  padding: 22.5rpx 52.5rpx 41.25rpx;
  background-color: #ffffff;
  border-radius: 18.75rpx;
}
.image_5 {
  width: 198.75rpx;
  height: 166.88rpx;
}
.font_2 {
  font-size: 33.75rpx;
  font-family: Open Sans;
  line-height: 31.09rpx;
  color: #000000;
}
.text_7 {
  line-height: 31.22rpx;
}
.font_3 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 24.34rpx;
  color: #7a7a78;
}
.text_8 {
  line-height: 24.39rpx;
}
.grid-item_2 {
  padding: 26.25rpx 52.5rpx 41.25rpx;
  background-color: #ffffff;
  border-radius: 18.75rpx;
}
.text_9 {
  line-height: 31.22rpx;
}
.text_11 {
  line-height: 24.36rpx;
}
.grid-item_3 {
  padding: 26.25rpx 0 41.25rpx;
  background-color: #ffffff;
  border-radius: 18.75rpx;
}
.text_10 {
  margin-top: 7.5rpx; 
}
.text_12 {
  margin-top: 18.75rpx;
  line-height: 24.23rpx;
}
@import url(../component/css/global1.css);
</style>

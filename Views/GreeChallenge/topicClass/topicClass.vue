<template>
	<view class="flex-col page">
	  <view class="flex-col section">
	    <text class="self-start font text">碳知识问答</text>
	    <view class="flex-row equal-division group">
	      <view class="flex-col items-center group_2 group_1">
	        <text class="font_2">{{ansArr[0]}}</text>
	        <text class="font_3 text_1 mt-11">今日答对</text>
	      </view>
	      <view class="flex-col items-center group_2 group_3">
	        <text class="font_2">{{ansArr[1]}}</text>
	        <text class="font_3 text_2 mt-11">累计做题</text>
	      </view>
	      <view class="flex-col items-center group_2 group_4">
	        <text class="font_2 text_27">{{ansArr[2]}}</text>
	        <text class="font_3 text_28 mt-11">累计天数</text>
	      </view>
	    </view>
	    <view class="flex-col justify-start items-center self-center text-wrapper" @click="startChallenge(0)">
	      <text class="font text_3">开启碳知识</text>
	    </view>
	  </view>
	  <view class="flex-row relative grid mt-25">
	    <view class="flex-col grid-item pos" @click="startChallenge(1)">
	      <image
	        class="self-center image"
	        :src="KnowledgeChallengeImgUrl + 'topicClass/tzj.png'"
	      />
	      <text class="self-center font text_7 mt-9">碳足迹</text>
	      <view class="self-stretch divider mt-9"></view>
	      <view class="flex-row justify-evenly items-baseline self-stretch group_6 mt-9">
	        <text class="font_3 text_4">今日答题：</text>
	        <text class="font_4 text_5">{{typeCnt[0]}}</text>
	        <text class="font_3">道</text>
	      </view>
	      <view class="flex-row justify-evenly items-baseline self-stretch group_7 mt-9">
	        <text class="font_3 text_6">答题总数：</text>
	        <text class="font_4">{{totalCnt[0]}}</text>
	        <text class="font_3">道</text>
	      </view>
	    </view>
	    <view class="flex-col section_3 pos_2" @click="startChallenge(2)">
	      <image
	        class="self-center image_2"
	        :src="KnowledgeChallengeImgUrl + 'topicClass/jnjp.png'"
	      />
	      <text class="self-center font text_8">节能减排</text>
	      <view class="self-stretch divider view"></view>
	      <view class="flex-row justify-evenly items-baseline self-stretch group_6 view_2">
	        <text class="font_3 text_11">今日答题：</text>
	        <text class="font_4 text_12">{{typeCnt[1]}}</text>
	        <text class="font_3">道</text>
	      </view>
	      <view class="flex-row justify-evenly items-baseline self-stretch group_7 view_3">
	        <text class="font_3 text_14">答题总数：</text>
	        <text class="font_4">{{totalCnt[1]}}</text>
	        <text class="font_3">道</text>
	      </view>
	    </view>
	    <view class="flex-col section_5 pos_3" @click="startChallenge(3)">
	      <image
	        class="self-center image"
	        :src="KnowledgeChallengeImgUrl + 'topicClass/dtcx.png'"
	      />
	      <text class="self-center font text_15 mt-8">低碳出行</text>
	      <view class="self-stretch divider mt-8"></view>
	      <view class="flex-row justify-evenly items-baseline self-stretch group_6 mt-8">
	        <text class="font_3 text_16">今日答题：</text>
	        <text class="font_4 text_17">{{typeCnt[2]}}</text>
	        <text class="font_3">道</text>
	      </view>
	      <view class="flex-row justify-evenly items-baseline self-stretch group_7 mt-8">
	        <text class="font_3 text_20">答题总数：</text>
	        <text class="font_4">{{totalCnt[2]}}</text>
	        <text class="font_3">道</text>
	      </view>
	    </view>
	    <view class="flex-col section_6 pos_4" @click="startChallenge(4)">
	      <image
	        class="self-center image_3"
	        :src="KnowledgeChallengeImgUrl + 'topicClass/ljhs.png'"
	      />
	      <text class="self-center font mt-7">垃圾分类</text>
	      <view class="self-stretch divider mt-7"></view>
	      <view class="flex-row justify-evenly items-baseline self-stretch group_6 mt-7">
	        <text class="font_3 text_18">今日答题：</text>
	        <text class="font_4 text_19">{{typeCnt[3]}}</text>
	        <text class="font_3">道</text>
	      </view>
	      <view class="flex-row justify-evenly items-baseline self-stretch group_7 mt-7">
	        <text class="font_3 text_21">答题总数：</text>
	        <text class="font_4">{{totalCnt[3]}}</text>
	        <text class="font_3">道</text>
	      </view>
	    </view>
	    <view class="flex-col section_7 pos_5" @click="startChallenge(5)">
	      <image
	        class="self-center image_4"
	        :src="KnowledgeChallengeImgUrl + 'topicClass/jmsh.png'"
	      />
	      <text class="self-center font text_22 mt-8">居民生活</text>
	      <view class="self-stretch divider mt-8"></view>
	      <view class="flex-row justify-evenly items-baseline self-stretch group_6 mt-8">
	        <text class="font_3 text_24">今日答题：</text>
	        <text class="font_4 text_25">{{typeCnt[4]}}</text>
	        <text class="font_3">道</text>
	      </view>
	      <view class="flex-row justify-evenly items-baseline self-stretch group_7 mt-8">
	        <text class="font_3 text_26">答题总数：</text>
	        <text class="font_4">{{totalCnt[4]}}</text>
	        <text class="font_3">道</text>
	      </view>
	    </view>
	    <view class="flex-col section_5 pos_6" @click="startChallenge(6)">
	      <image
	        class="self-center image_5"
	        :src="KnowledgeChallengeImgUrl + 'topicClass/gyzt.png'"
	      />
	      <text class="self-center font text_23 mt-8">公益专题</text>
	      <view class="self-stretch divider mt-8"></view>
	      <view class="flex-row justify-evenly items-baseline self-stretch group_6 mt-8">
	        <text class="font_3 text_16">今日答题：</text>
	        <text class="font_4 text_17">{{typeCnt[5]}}</text>
	        <text class="font_3">道</text>
	      </view>
	      <view class="flex-row justify-evenly items-baseline self-stretch group_7 mt-8">
	        <text class="font_3 text_20">答题总数：</text>
	        <text class="font_4">{{totalCnt[5]}}</text>
	        <text class="font_3">道</text>
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { onMounted , ref} from 'vue';
	import { DomainName, KnowledgeChallengeImgUrl } from '../../../common/global';

	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()

	import { onShow } from "@dcloudio/uni-app";

	const startChallenge = (val:any) => {

		if(val == 0){
			uni.navigateTo({
				url: '../answerGain/answerGain?id=0'
			})
			return ;
		}
		
		if(toDayAnswerTypeCnt.value[val - 1] == 0){
			uni.navigateTo({
				url: '../answerGain/answerGain?id=' + val
			})
		}else{
			uni.showToast({
				title: '今日答题次数已上限',
				icon: 'exception'
			})
		}
	}
	
	const ansArr = ref([])
	
	const typeCnt = ref([])
	const totalCnt = ref([])
	
	const toDayAnswerTypeCnt = ref([])
	
	
	const init = async () => {
		const res = await uni.request({
			url: DomainName + '/knowledge/answerCorrectCnt',
			method: 'GET',
			data: {
				answerDate: getDate(),
				userId: userStore.user.id
			}
		})
		
		ansArr.value = res.data.data
		
		
		const response = await uni.request({
			url: DomainName + '/knowledge/answerTypeCnt',
			method: 'GET',
			data: {
				answerDate: getDate(),
				userId: userStore.user.id
			},
		})
		
		typeCnt.value = response.data.data.arr1
		totalCnt.value = response.data.data.arr2
		
		const res3 = await uni.request({
			url: DomainName + '/knowledge/selectTodayTypeAnswerCnt',
			method: 'GET',
			data: {
				userId: userStore.user.id,
				answerDate: getDate()
			}
		})
		toDayAnswerTypeCnt.value = res3.data.data
	}
	
	onMounted(() => {
		init()
	})
	
	onShow(() => {
		init()
	})
	
	const getDate = () => {
		let now = new Date()
		let year = now.getFullYear()
		let month = (now.getMonth() + 1).toString().padStart(2, 0)
		let date = now.getDate().toString().padStart(2, 0)
		return year + '-' + month + '-' + date
	}
</script>

<style lang="scss" scoped>
.mt-11 {
  margin-top: 20.63rpx;
}
.mt-25 {
  margin-top: 46.88rpx;
}
.mt-9 {
  margin-top: 16.88rpx;
}
.mt-7 {
  margin-top: 13.13rpx;
}
.page {
  padding: 46.88rpx 41.25rpx 54.38rpx;
  background-color: #f3f3f5;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.section {
  padding: 38.1rpx 0 31.88rpx;
  background-color: #ffffff;
  border-radius: 15rpx;
}
.font {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.71rpx;
  color: #000000;
}
.text {
  margin-left: 43.03rpx;
  line-height: 28.09rpx;
}
.equal-division {
  align-self: stretch;
  margin-top: 32.16rpx;
}
.group {
  padding: 0 14.4rpx;
}
.group_2 {
  flex: 1 1 212.23rpx;
}
.group_1 {
  padding: 9.99rpx 0 9.99rpx;
}
.font_2 {
  font-size: 45rpx;
  font-family: Times New Roman;
  line-height: 31.03rpx;
  font-weight: 700;
  color: #00ba9c;
}
.font_3 {
  font-size: 22.5rpx;
  font-family: Open Sans;
  line-height: 20.51rpx;
  color: #7a7a78;
}
.text_1 {
  line-height: 21.13rpx;
}
.group_3 {
  padding: 9.99rpx 0 10.05rpx;
}
.text_2 {
  line-height: 20.72rpx;
}
.group_4 {
  padding: 9.99rpx 0 10.01rpx;
}
.text_27 {
  line-height: 31.05rpx;
}
.text_28 {
  line-height: 20.77rpx;
}
.text-wrapper {
  margin-top: 18.11rpx;
  padding: 19.8rpx 0 19.99rpx;
  background-color: #00ba9c;
  border-radius: 93.75rpx;
  width: 311.25rpx;
}
.text_3 {
  color: #ffffff;
}
.grid {
  margin-left: 22.5rpx;
  margin-right: 20.63rpx;
  height: 995.63rpx;
}
.grid-item {
  padding: 18.77rpx 0 13.13rpx;
  background-color: #ffffff;
  border-radius: 15rpx;
  width: 275.63rpx;
}
.pos {
  position: absolute;
  left: 0;
  top: 0;
}
.image {
  width: 131.25rpx;
  height: 131.25rpx;
}
.text_7 {
  line-height: 27.6rpx;
}
.divider {
  background-color: #e9e9e9;
  height: 1.88rpx;
}
.group_6 {
  padding-left: 62.64rpx;
  padding-right: 61.09rpx;
}
.text_4 {
  line-height: 21.13rpx;
}
.font_4 {
  font-size: 22.5rpx;
  font-family: Open Sans;
  line-height: 16.52rpx;
  color: #7a7a78;
}
.text_5 {
  line-height: 16.27rpx;
}
.group_7 {
  padding-left: 62.51rpx;
  padding-right: 61.09rpx;
}
.text_6 {
  line-height: 21.11rpx;
}
.section_3 {
  padding: 20.63rpx 0 13.13rpx;
  background-color: #ffffff;
  border-radius: 15rpx;
  width: 275.63rpx;
}
.pos_2 {
  position: absolute;
  right: 0;
  top: 0;
}
.image_2 {
  width: 142.5rpx;
  height: 142.5rpx;
}
.text_8 {
  margin-top: 8.55rpx;
  line-height: 27.66rpx;
}
.view {
  margin-top: 18.17rpx;
}
.view_2 {
  margin-top: 14.51rpx;
}
.text_11 {
  line-height: 21.13rpx;
}
.text_12 {
  line-height: 16.27rpx;
}
.view_3 {
  margin-top: 12.62rpx;
}
.text_14 {
  line-height: 21.11rpx;
}
.section_5 {
  padding: 22.5rpx 0 13.13rpx;
  background-color: #ffffff;
  border-radius: 15rpx;
  width: 275.63rpx;
}
.pos_3 {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.text_15 {
  line-height: 27.69rpx;
}
.text_16 {
  line-height: 21.13rpx;
}
.text_17 {
  line-height: 16.27rpx;
}
.text_20 {
  line-height: 21.11rpx;
}
.section_6 {
  padding: 16.88rpx 0 13.13rpx;
  background-color: #ffffff;
  border-radius: 15rpx;
  width: 275.63rpx;
}
.pos_4 {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.image_3 {
  width: 168.75rpx;
  height: 144.38rpx;
}
.text_18 {
  line-height: 21.13rpx;
}
.text_19 {
  line-height: 16.27rpx;
}
.text_21 {
  line-height: 21.11rpx;
}
.section_7 {
  padding: 13.13rpx 0 13.13rpx;
  background-color: #ffffff;
  border-radius: 15rpx;
  width: 275.63rpx;
}
.pos_5 {
  position: absolute;
  left: 0;
  top: 693.77rpx;
}
.image_4 {
  width: 136.88rpx;
  height: 140.63rpx;
}
.text_22 {
  line-height: 27.64rpx;
}
.text_24 {
  line-height: 21.13rpx;
}
.text_25 {
  line-height: 16.27rpx;
}
.text_26 {
  line-height: 21.11rpx;
}
.pos_6 {
  position: absolute;
  right: 0;
  top: 693.77rpx;
}
.image_5 {
  width: 135rpx;
  height: 135rpx;
}
.text_23 {
  line-height: 27.81rpx;
}
@import url(../component/css/global1.css);
</style>

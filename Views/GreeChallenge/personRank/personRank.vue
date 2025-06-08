<template>
	<view class="flex-col page">
	  <view class="flex-row section">
	    <image
	      class="shrink-0 self-start image"
	      :src="userAvatar"
	    />
	    <view class="ml-6 flex-row equal-division">
	      <view class="flex-col equal-division-item group">
	        <view class="flex-col justify-start items-center text-wrapper"><text class="font text">{{tempTitle}}</text></view>
	        <view class="flex-row justify-center items-center group_3">
	          <text class="font_2 text_2">{{tempRank}}</text>
	          <text class="ml-8 text_4">th</text>
	        </view>
	      </view>
	      <view class="horiz-divider section_2"></view>
	      <view class="flex-col equal-division-item group_2">
	        <view class="flex-col justify-start items-center self-stretch text-wrapper">
	          <text class="font">碳积分</text>
	        </view>
	        <text class="self-center font_2 text_3 mt-17">{{ userPoints }}</text>
	      </view>
	    </view>
	  </view>
	  <view class="mt-16 flex-col group_4">
	    <view class="flex-col group_5">
	      <view class="flex-row justify-between self-stretch group_6">
	        <text class="font_3 text_5" @click="dayRank" :style="dayObj">积分日榜</text>
	        <text class="font_3 text_6" @click="totalRank" :style="totalObj">积分总榜</text>
	      </view>
	      <view class="self-start section_3" :style="borderObj"></view>
	    </view>
	    <view class="mt-16 flex-col">
	      <view class="flex-row justify-center items-center section_4" v-show="isTotal">
	        <text class="font_3 text_7">总榜人数</text>
	        <text class="ml-4 text_8">{{temp.length}}</text>
	      </view>
	      <view class="flex-col">
	        <view class="flex-row justify-between items-center list-item mt-3" v-for="(item, index) in temp" :key="index">
	          <view class="flex-row items-center">
	            <view class="flex-row shrink-0">
	            <image
					v-if="index <= 2"
	                class="image_3"
	                :src="imgSrc?.[index]"
	              />
				  <view v-show="index > 2" class="image_3 rank"><text>{{ (index + 1).toString().padStart(2, 0)}}</text></view>
	              <image
	                class="image_2 ml-13"
	                :src="item.avatar"
	              />
	            </view>
	            <text class="font_4 ml-23">{{item.name}}</text>
	          </view>
	          <text class="font_5 text_9">{{item.points}}</text>
	        </view>
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { DomainName, KnowledgeChallengeImgUrl } from '../../../common/global';
	
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	import {onMounted, ref} from 'vue'
	
	const imgSrc = ref([
		KnowledgeChallengeImgUrl + 'personRank/j.png',
		KnowledgeChallengeImgUrl + 'personRank/y.png',
		KnowledgeChallengeImgUrl + 'personRank/t.png'
	])
	
	const dayObj = ref({color:'#4fb562'})
	const totalObj = ref({color: '#7a7a78'})
	const borderObj = ref({marginLeft: '15rpx'})
	const isTotal = ref(false)
	
	
	const dayRank = () => {
		dayObj.value.color = '#4fb562'
		totalObj.value.color = '#7a7a78'
		borderObj.value.marginLeft = '15rpx'
		isTotal.value = false
		
		
		temp.value = todayUsers.value
		tempRank.value = todayRank.value
		tempTitle.value = dayTitle
		
		userPoints.value = temp.value[tempRank.value - 1].points
	}
	
	const totalRank = () => {
		dayObj.value.color = '#7a7a78'
		totalObj.value.color = '#4fb562'
		borderObj.value.marginLeft = '438rpx'
		isTotal.value = true
		
		 
		temp.value = users.value
		tempRank.value = rank.value
		tempTitle.value = totalTitle
		
		userPoints.value = temp.value[tempRank.value - 1].points
	}
	
	const dayTitle = '日榜排名'
	const totalTitle = '总榜排名'
	 
	const users = ref([])
	const todayUsers = ref([])
	
	const rank = ref(0)
	const todayRank = ref(0)
	
	const temp = ref([])
	const tempRank = ref(0)
	const tempTitle = ref('')
	
	const userAvatar = ref('')
	const userPoints = ref(0)
	
	onMounted( async () => {
		
		tempTitle.value = dayTitle
		
		const res2 = await uni.request({
			url: DomainName + '/knowledge/selectAllUsersTodayPoints',
			method: 'GET',
			data: {
				todayDate: getDate()
			}
		})
		todayUsers.value = res2.data.data
		for ( var i = 0; i < todayUsers.value.length; i ++ ){
			todayUsers.value[i].points = todayUsers.value[i].todayPoints
		}
		temp.value = todayUsers.value
		

		
		const rankRes2 = await uni.request({
			url: DomainName + '/knowledge/selectUserTodayRank',
			method: 'GET',
			data: {
				userId: userStore.user.id,
				todayDate: getDate()
			}
		})
		
		todayRank.value = rankRes2.data.data
		tempRank.value = todayRank.value
		
		userAvatar.value = temp.value[tempRank.value - 1].avatar
		userPoints.value = temp.value[tempRank.value - 1].points

		
		const res = await uni.request({
			url: DomainName + '/knowledge/selectAllUsers',
			method: 'GET'
		})
		users.value = res.data.data
		
		
		const rankRes = await uni.request({
			url: DomainName + '/knowledge/selectUserPointsRank',
			method: 'GET',
			data: {
				userId: userStore.user.id
			}
		})
		
		rank.value = rankRes.data.data
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
.rank{
	text-align: center;
	line-height: 88rpx;
	font-size: 40rpx;
}
.mt-17 {
  margin-top: 31.88rpx;
}
.mt-3 {
  margin-top: 5.63rpx;
}
.ml-23 {
  margin-left: 43.13rpx;
}
.ml-13 {
  margin-left: 24.38rpx;
}
.page {
  padding-bottom: 40rpx;
  background-color: #f6f6f6;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.section {
  padding: 37.5rpx 37.5rpx 63.75rpx 61.88rpx;
  background-color: #64c274;
  border-radius: 0rpx 0rpx 37.5rpx 37.5rpx;
}
.image {
  margin-top: 26.25rpx;
  border-radius: 93.75rpx;
  width: 105rpx;
  height: 105rpx;
}
.equal-division {
  flex: 1 1 0;
  align-self: center;
}
.equal-division-item {
  flex: 1 1 268.13rpx;
}
.group {
  padding: 11.25rpx 60rpx 0;
}
.text-wrapper {
  padding: 11.25rpx 0;
  background-color: #8fd39d;
  border-radius: 93.75rpx;
}
.font {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 24.26rpx;
  color: #ffffff;
}
.text {
  line-height: 24.3rpx;
}
.group_3 {
  padding: 30rpx 0 11.25rpx 11.25rpx;
}
.font_2 {
  font-size: 45rpx;
  font-family: Microsoft YaHei;
  line-height: 34.69rpx;
  color: #ffffff;
}
.text_2 {
  line-height: 35.36rpx;
}
.text_4 {
  color: #ffffff;
  font-size: 37.5rpx;
  font-family: Microsoft JhengHei;
  line-height: 30.41rpx;
}
.horiz-divider {
  flex-shrink: 0;
  margin: 63.75rpx 0 33.75rpx;
}
.section_2 {
  background-color: #ffffff;
  width: 1.88rpx;
  height: 33.75rpx;
}
.group_2 {
  padding: 11.25rpx 60rpx;
}
.text_3 {
  line-height: 35.19rpx;
}
.group_4 {
  padding: 0 22.5rpx;
}
.group_5 {
  padding: 0 67.5rpx;
}
.group_6 {
  padding-bottom: 15rpx;
}
.font_3 {
  font-size: 37.5rpx;
  font-family: Open Sans;
  line-height: 34.69rpx;
}
.text_5 {
  color: #4fb562;
}
.text_6 {
  color: #7a7a78;
}
.section_3 {
  margin-left: 15rpx;
  // margin-left: 438rpx;
  background-color: #4fb562;
  width: 120rpx;
  height: 5.63rpx;
  transition-property:margin-left;
          /* 设置需要过渡的属性 */
          transition-duration: 0.3s;
          /* 设置过渡的时间 */
}
.section_4 {
  padding: 18.75rpx 0;
  background-color: #64c274;
  border-radius: 18.75rpx 18.75rpx 0rpx 0rpx;
}
.text_7 {
  color: #ffffff;
  line-height: 34.61rpx;
}
.text_8 {
  color: #ffffff;
  font-size: 37.5rpx;
  font-family: Open Sans;
  line-height: 27.54rpx;
}
.list-item {
  padding: 15rpx 37.5rpx;
  background-color: #ffffff;
}
.list-item:first-child {
  margin-top: 0;
}
.image_3 {
  margin: 3.75rpx 0;
  width: 84.38rpx;
  height: 84.38rpx;
}
.font_5 {
  font-size: 37.5rpx;
  font-family: Microsoft YaHei;
  line-height: 27.69rpx;
  color: #0fb1a8;
}
.text_9 {
  line-height: 29.33rpx;
}
.font_4 {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.69rpx;
  color: #000000;
}
.image_2 {
  border-radius: 93.75rpx;
  width: 93.75rpx;
  height: 93.75rpx;
}
@import url('../component/css/global1.css');
</style>

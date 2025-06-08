<template>
	<view class="flex-col page">
	  <view @click="share" class="flex-col justify-start items-center text-wrapper_3">
		  <text class="font_6 text_20">立即邀请</text>
	 </view>
	  <view class="flex-col relative section">
	    <view class="flex-row justify-between items-start group">
	      <view class="flex-col items-start">
	        <text class="text">每日签到</text>
	        <text class="font text_2 mt-11">每天完成任务可获得碳积分</text>
	      </view>
	      <image
	        class="image"
	        :src="KnowledgeChallengeImgUrl + 'checkIn/sl.png'"
	      />
	    </view>
	    <view class="flex-col section_2">
	      <view class="flex-row justify-between items-center group_2">
	        <view class="flex-col group_14">
	          <view class="flex-row items-baseline">
	            <text class="font_2 text_3">已经连续签到</text>
	            <text class="font_2 text_4 ml-4">{{continueSign}}</text>
	            <text class="font_2 text_5 ml-4">天</text>
	          </view>
	          <view class="flex-row items-baseline group_15 mt-9">
	            <text class="font_3 text_7">已经累计签到</text>
	            <text class="font_3 text_8 ml-2">{{totalSign}}</text>
	            <text class="font_3 text_9 ml-2">天</text>
	          </view>
	        </view>
	        <view :style="{backgroundColor: backgroundColor}" class="flex-col justify-start items-center text-wrapper" @click="openCheckIn">
				<text :style="{color: color}" class="font text_6">{{signTitle}}</text>
			</view>
	      </view>
	      <view class="flex-row group_3 mt-29">
	        <view class="flex-col group_4 group_5" v-for="(item, index) in items" :key="index">
	          <view class="flex-col self-stretch section_1" :style="{backgroundColor: item.backgroundColor}">
	            <view class="flex-row justify-evenly items-baseline group_1">
	              <text class="font_4">＋</text>
	              <text class="font_5">1</text>
	            </view>
	            <image
				  v-if="!item.isSign"
	              class="image_2 mt-4"
	              :src="item.imgSrc"
	            />
				<image
				  v-if="item.isSign"
				  class="image_2 mt-4"
				  :src="KnowledgeChallengeImgUrl + 'checkIn/dg.png' "
				/>
	          </view>
	          <text class="self-center font_3 text_10 mt-7">{{item.name}}</text>
	        </view>
	      </view>
	    </view>
	  </view>
	  <view class="flex-col section_4">
	    <view class="flex-row items-center group_13">
	      <view class="section_5"></view>
	      <text class="font_6 ml-10">问卷调查</text>
	    </view>
	    <view class="flex-row justify-between items-center group_6">
	      <view class="flex-col">
	        <text class="font_7 text_11">社区居民低碳行为参与度调查</text>
	        <view class="flex-row items-baseline group_9 mt-15">
	          <text class="font_9 text_12">碳积分</text>
	          <text class="font_10">+</text>
	          <text class="font_11 text_13">5</text>
	        </view>
	      </view>
	      <view class="flex-col justify-start items-center text-wrapper_2" @click="jumpToQuestion(1)"><text class="font_8">{{title1}}</text></view>
	    </view>
	    <view class="flex-row justify-between items-center group_7">
	      <view class="flex-col">
	        <text class="font_7">社区居民日常垃圾回收行为调查</text>
	        <view class="flex-row items-baseline group_11 mt-15">
	          <text class="font_9 text_14">碳积分</text>
	          <text class="font_10">+</text>
	          <text class="font_11 text_15">5</text>
	        </view>
	      </view>
	      <view class="flex-col justify-start items-center text-wrapper_2" @click="jumpToQuestion(2)"><text class="font_8">{{title2}}</text></view>
	    </view>
	    <view class="divider"></view>
	  </view>
	  <view class="flex-row justify-between items-center section_6">
	    <view class="flex-col">
	      <view class="flex-row">
	        <view class="shrink-0 section_7"></view>
	        <text class="font_6 text_16 ml-12">邀请好友获得碳积分</text>
	      </view>
	      <text class="font_9 text_17">每周仅限前两次分享可得碳积分</text>
	      <view class="flex-row items-center group_8">
	        <image
	          class="image_4"
	          :src="KnowledgeChallengeImgUrl + 'checkIn/jf2.png'"
	        />
	        <text class="font_7 text_18">＋</text>
	        <text class="text_19">15</text>
	      </view>
	    </view>
	    <image
	      class="image_3"
	      :src="KnowledgeChallengeImgUrl + 'checkIn/fx.png'"
	    />
	  </view>
	</view>
	
	<uni-popup ref="checkIn" type="dialog">
						<view class="pop">
							<checkInPopVue></checkInPopVue>
						</view>
	</uni-popup>
</template>

<script setup lang="ts">
	import { DomainName, KnowledgeChallengeImgUrl } from '../../../common/global';
	import {onMounted, ref, toRaw} from 'vue'
	import checkInPopVue from '../component/checkInPop.vue';
	import emitter from '../../../utils/emitter';
	
	import {data} from './sign.js'
	
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	const continueSign = ref(0)
	const totalSign = ref(0)
	
	
	const color = ref('#fff')
	const backgroundColor = ref('#00725b')
	const signTitle = ref('签到')
	
	const items = ref(data)
	const checkIn = ref(null)
	
	const flag1 = ref(true)
	const flag2 = ref(true)
	
	const title1 = ref('去答题')
	const title2 = ref('去答题')
	
	const isSign = ref(false)
	
	
	
	const add = async () => {
		const res3 = await uni.request({
			url: DomainName + '/knowledge/selectSignDayCnt',
			method: 'GET',
			data: {
				userId: userStore.user.id
			}
		})
		
		totalSign.value = res3.data.data 
		
		
		const res4 = await uni.request({
			url: DomainName + '/knowledge/selectConSignDayCnt',
			method: 'GET',
			data: {
				userId: userStore.user.id
			}
		})
		
		continueSign.value = res4.data.data
	}
	
	
	const init = () => {
		backgroundColor.value = '#e0f2da'
		color.value = '#195511'
		signTitle.value = '已签到'
		isSign.value = true
		var f = 0;
		for (var i = 0; i < items.value.length; i ++ ){
			if(!items.value[i].isSign) {
				items.value[i].isSign = true
				items.value[i].backgroundColor = '#D9F1D1'
				f = 1
				break;
			}
		}
		
		if(!f) { 
			for (var i = 0; i < items.value.length; i ++ ){
				if(i == 0) {
					items.value[i].isSign = true
					items.value[i].backgroundColor = '#D9F1D1'
				}else{
					items.value[i].isSign = false
					items.value[i].backgroundColor = '#f9f9f7'				
				}
			}
			console.log(items.value)
		}
		const temp = items.value.map((item) => item.isSign)
	}
	
	onMounted( async () => {
		emitter.on('endDeal1', () => {
			title1.value = '已作答'
			flag1.value = false
		})
		emitter.on('endDeal2', () => {
			title2.value = '已作答'
			flag2.value = false
		})
		const res = await uni.request({
			url: DomainName + '/knowledge/selectIsSign',
			method: 'POST',
			data: {
				signDate: getDate(),
				userId: userStore.user.id
			}
		})
		if(res.data.data){
			backgroundColor.value = '#e0f2da'
			color.value = '#195511'
			signTitle.value = '已签到'
			isSign.value = true
		}else{
			backgroundColor.value = '#00725b'
			color.value = '#fff'
			signTitle.value = '签到'
		}
		
		const res2 = await uni.request({
			url: DomainName + '/knowledge/selectSixDaySign',
			method:'GET',
			data: {
				userId: userStore.user.id
			}
		})
		
		const tem = res2.data.msg
		for (var i = 0; i < tem.length; i ++ ){
			if(tem[i] == "1"){
				items.value[i].isSign = true
				items.value[i].backgroundColor = '#D9F1D1'
			}
		}
		
		
		add()
		
		
		const response1 = await uni.request({
			url: DomainName + '/knowledge/selectIsSubmitQuestion',
			method: 'GET',
			data: {
				typeId: 1,
				userId: userStore.user.id
			}
		})
		flag1.value = !response1.data.data
		if(!flag1.value) title1.value = '已作答'
		
		const response2 = await uni.request({
			url: DomainName + '/knowledge/selectIsSubmitQuestion',
			method: 'GET',
			data: { 
				typeId: 2,
				userId: userStore.user.id
			}
		})
		flag2.value = !response2.data.data
		if(!flag2.value) title2.value = '已作答'
	})
	
	const openCheckIn = async () => {
		
		if(isSign.value) return ;
		
		init()
		var tempStr = ""
		const temp = items.value.map((item) => item.isSign)
		for (var i = 0; i < temp.length; i ++ ){
			if(temp[i]) tempStr += "1"
			else tempStr += "0"
		}
		
		const res = await uni.request({
			url: DomainName + '/knowledge/daySign',
			method: 'POST',
			data: {
				signDate: getDate(),
				userId: userStore.user.id,
				signRecord: tempStr
			}
		})
		console.log(res)
		
		add()
		
		checkIn.value.open()
		emitter.on('closeCheckIn', () => {
			closeCheckIn()
		})
	}
	
	const closeCheckIn = () => {
		checkIn.value.close()
	}
	
	const jumpToQuestion = (val) => {
		if(val == 1){
			if(!flag1.value) return;
		}else{
			if(!flag2.value) return;
		}
		uni.navigateTo({
			url: '../questionnaires/questionnaires?id=' + val
		})
	}
	
	
	const share = () => {

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
.pop {
		height: 200rpx;
	}
.mt-11 {
  margin-top: 20.63rpx;
}
.mt-9 {
  margin-top: 16.88rpx;
}
.mt-29 {
  margin-top: 54.38rpx;
}
.mt-7 {
  margin-top: 13.13rpx;
}
.mt-15 {
  margin-top: 28.13rpx;
}
.page {
  padding-bottom: 52.5rpx;
  background-color: #faf9f7;
  mix-blend-mode: LUMINOSITY;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.text-wrapper_3 {
  margin: 1496.25rpx 39.38rpx 0 39.38rpx;
  padding: 24.75rpx 0 23.21rpx;
  background-color: #1cc676;
  border-radius: 93.75rpx;
}
.font_6 {
  font-size: 37.5rpx;
  font-family: Open Sans;
  line-height: 34.54rpx;
  color: #000000;
}
.text_20 {
  color: #ffffff;
}
.section {
  margin-top: -1578.75rpx;
  padding: 70.01rpx 26.25rpx 39.38rpx;
  background-color: #00725b;
  border-radius: 0rpx 0rpx 56.25rpx 56.25rpx;
}
.group {
  padding-left: 12.41rpx;
  padding-right: 9.38rpx;
}
.text {
  color: #ffffff;
  font-size: 52.5rpx;
  font-family: Inter;
  line-height: 48.62rpx;
}
.font {
  font-size: 26.25rpx;
  font-family: Inter;
  line-height: 22.8rpx;
  color: #ffffff;
}
.text_2 {
  line-height: 24.47rpx;
}
.image {
  margin-top: 12.49rpx;
  width: 127.5rpx;
  height: 127.5rpx;
}
.section_2 {
  padding: 26.25rpx 0 44.36rpx;
  background-color: #ffffff;
  border-radius: 28.13rpx;
}
.group_2 {
  padding-left: 26.92rpx;
  padding-right: 24.38rpx;
}
.group_14 {
  margin-top: 2.1rpx;
}
.font_2 {
  font-size: 37.5rpx;
  font-family: Inter;
  color: #000000;
}
.text_3 {
  line-height: 34.76rpx;
}
.text_4 {
  line-height: 27.28rpx;
}
.text_5 {
  line-height: 31.69rpx;
}
.group_15 {
  padding: 0 7.05rpx;
}
.font_3 {
  font-size: 22.5rpx;
  font-family: Inter;
  line-height: 19.05rpx;
  color: #7a7a78;
}
.text_7 {
  line-height: 20.81rpx;
}
.text_8 {
  line-height: 16.37rpx;
}
.text_9 {
  line-height: 19.01rpx;
}
.text-wrapper {
  padding: 19.09rpx 0 22.26rpx;
  background-color: #00725b;
  border-radius: 9.38rpx;
  width: 140.63rpx;
  height: 65.63rpx;
}
.text_6 {
  line-height: 24.28rpx;
}
.group_3 {
  padding: 0 7.5rpx;
  justify-content: space-around;
}
.group_4 {
  flex: 1 1 97.5rpx;
}
.group_5 {
  padding: 9.99rpx 11.25rpx 9.99rpx;
}
.section_1 {
  padding: 22.2rpx 13.5rpx 9.75rpx;
  background-color: #f9f9f7;
  border-radius: 9.38rpx;
}
.group_1 {
  padding: 0 5.06rpx;
}
.font_4 {
  font-size: 26.25rpx;
  font-family: Inter;
  line-height: 19.05rpx;
  color: #116350;
}
.font_5 {
  font-size: 33.75rpx;
  font-family: Times New Roman;
  line-height: 22.8rpx;
  color: #116350;
}
.image_2 {
  width: 48rpx;
  height: 48rpx;
  margin: auto;
}
.text_10 {
  line-height: 20.83rpx;
}
.section_4 {
  margin-top: 41.25rpx;
  padding: 43.13rpx 38.1rpx 41.25rpx 38.1rpx;
  background-color: #ffffff;
  border-radius: 18.75rpx;
}
.group_13 {
  padding: 0 5.03rpx;
}
.section_5 {
  background-color: #00725b;
  width: 7.5rpx;
  height: 41.25rpx;
}
.group_6 {
  margin-top: 62.89rpx;
}
.font_7 {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.69rpx;
  color: #000000;
}
.text_11 {
  line-height: 27.81rpx;
}
.group_9 {
  padding: 0 3.88rpx;
}
.font_9 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 22.8rpx;
  color: #7a7a78;
}
.text_12 {
  line-height: 24.26rpx;
}
.font_10 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 12.64rpx;
  color: #7a7a78;
}
.font_11 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 19.05rpx;
  color: #7a7a78;
}
.text_13 {
  margin-left: 6rpx;
  line-height: 18.99rpx;
}
.text-wrapper_2 {
  margin-right: 3.17rpx;
  padding: 16.93rpx 0 14.53rpx;
  background-color: #e0f2da;
  border-radius: 9.38rpx;
  width: 131.25rpx;
  height: 56.25rpx;
}
.font_8 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 24.79rpx;
  color: #195511;
}
.group_7 {
  margin-top: 42.77rpx;
  padding-top: 27.3rpx;
  border-top: solid 1.88rpx #e9e9e9;
}
.group_11 {
  padding: 0 4.82rpx;
}
.text_14 {
  line-height: 24.26rpx;
}
.text_15 {
  margin-left: 6rpx;
  line-height: 18.99rpx;
}
.divider {
  margin-right: 3.17rpx;
  margin-top: 44.64rpx;
  background-color: #e9e9e9;
  height: 1.88rpx;
}
.section_6 {
  margin-top: 41.25rpx;
  padding: 51.39rpx 41.25rpx 48.75rpx;
  background-color: #ffffff;
  border-radius: 18.75rpx;
}
.section_7 {
  background-color: #00725b;
  width: 7.61rpx;
  height: 38.61rpx;
}
.text_16 {
  margin-top: 2.25rpx;
  line-height: 34.69rpx;
}
.text_17 {
  margin-left: 27.3rpx;
  margin-top: 39.69rpx;
  line-height: 24.43rpx;
}
.group_8 {
  margin-top: 25.88rpx;
  padding: 0 9.38rpx;
}
.image_4 {
  width: 63.75rpx;
  height: 63.75rpx;
}
.text_18 {
  color: #116350;
  line-height: 21.79rpx;
}
.text_19 {
  color: #116350;
  font-size: 37.5rpx;
  font-family: Times New Roman;
  line-height: 25.78rpx;
}
.image_3 {
  margin-right: 9.38rpx;
  width: 146.25rpx;
  height: 151.88rpx;
}
@import url('../component/css/global1.css');
</style>

<template>
	<view class="flex-col justify-start page">
	  <view class="flex-col group_1">
	    <view class="flex-col list-item_1 group_3" v-for="(item, index) in arr" :key="index">
	      <view class="flex-col section">
	        <text class="self-start font text">{{item.type}}</text>
	        <view class="flex-row items-center self-stretch group">
	          <image
	            class="image"
	            :src="item.photo"
	          />
	          <view class="flex-col flex-1 ml-10">
	            <view class="flex-row">
	              <text class="font_2 text_2">{{nextTitle}}：</text>
	              <text class="font_2 text_3">{{cntArr[typeId - 1]}}</text>
	            </view>
	            <view class="flex-row items-center group_3">
	              <text class="font_2 text_4">兑换积分：</text>
	              <text class="font_3 text_5">{{item.reward}}</text>
	            </view>
	            <view class="flex-row group_3">
	              <text class="font_2 text_6">审核状态：</text>
	              <text class="font_4 text_7">{{item.isAccess}}</text>
	            </view>
	          </view>
	        </view>
	        <view class="flex-row justify-between items-center self-stretch group_2" @click="transfer(index)">
	          <text class="font text_8">时间：{{item.submitTime}}</text>
	          <view class="flex-row items-center">
	            <text class="font_2 text_9">查看详情</text>
	            <image
	              class="shrink-0 image_2 ml-3"
	              :src="GreenChallenageImgUrl + 'detail/sjt.png'"
	            />
	          </view>
	        </view>
	      </view>
	      <view class="flex-col list-item" v-show="item.isShow">
	        <view class="flex-row self-stretch">
	          <image
	            class="image"
	            :src="item.photo"
	          />
	        <image
	            class="image ml-9"
	            :src="nextArr[index]?.photo"
	          />
	        </view>
	        <text class="self-start font_2 text_10">编号：{{item.id}}</text>
	        <view class="self-stretch divider view"></view>
	        <text class="self-start font_2 text_11">分类名称：{{item.type}}</text>
	        <view class="self-stretch divider view_2"></view>
	        <text class="self-start font_2 text_12">时间：{{item.submitTime}}</text>
	        <view class="self-stretch divider view_3"></view>
	        <text class="self-start font_2 text_13">{{nextTitle}}：{{cntArr[typeId - 1]}}</text>
	        <view class="self-stretch divider view_4"></view>
	        <text class="self-start font_2 text_14">奖励积分：{{item.reward}}</text>
	        <view class="self-stretch divider view_5"></view>
	        <text class="self-start font_2 text_15">审核状态：{{item.isAccess}}</text>
	        <view class="self-stretch divider view_6"></view>
	      </view>
	    </view>
	  <!-- </view> -->
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { GreenChallenageImgUrl } from '../../../common/global';
	import {onMounted, ref} from 'vue'
	import { onLoad } from '@dcloudio/uni-app';
	
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	const items = ref([null, null])
	const offset = ref(709)
	const isShow = ref(true)
	
	const nextTitle = ref('本周打卡次数')
	
	const transfer = (val) => {
		arr.value.forEach((item, index) => {
			if(val == index) item.isShow = !item.isShow
		})
		
		
		
		// if(isShow.value){ 
		// 	offset.value = 709
		// }else{ 
		// 	offset.value = 0
		// }
	}
	
	import { DomainName } from '../../../common/global.js'
	
	const title = ref('')
	
	const typeId = ref(0)
	const arr = ref([])
	const nextArr = ref([])
	
	const cntArr = ref([])
	
	onLoad((options) => {
		typeId.value = options.id
		if(typeId.value == 1) title.value = '今日骑行时间'
		else if(typeId.value == 2) title.value = '今日骑行公里数'
		else if(typeId.value == 5) title.value = '今日充电度数'
	})
	
	onMounted( async () => {
		const res = await uni.request({
			url: DomainName + '/challenge/selectById/' + typeId.value,
			method: 'GET',
		})
		
		arr.value = res.data.data
		
		const temp = arr.value.map((item) => item.id)
		const response = await uni.request({
			url: DomainName + '/challenge/selectNext',
			method: 'GET',
			data: {
				ids: temp,
			}
		})
		nextArr.value = response.data.data

		arr.value.forEach((item) => {
			item.isShow = false;
			item.id = (item.id).toString().padStart(6, 0)
			if(item.isAccess == 0){
				item.isAccess = '待审核'
			}else if(item.isAccess == 1){
				item.isAccess = '审核通过'
			}else{
				item.isAccess = '审核不通过'
			}
		})
		
		const response2 = await uni.request({
			url: DomainName + '/challenge/selectCntEveryWeek',
			data: {
				userId: userStore.user.id
			}
		})
		console.log(response2.data.data)
		cntArr.value = response2.data.data
	})
	
	
</script>

<style lang="scss" scoped>
.ml-3 {
  margin-left: 5.63rpx;
}
.ml-9 {
  margin-left: 16.88rpx;
}
.page {
  padding: 37.5rpx 0 151.88rpx;
  background-color: #efefef;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 1600rpx;
}
.group_1 {
  margin-left: 33.75rpx;
  margin-right: 33.77rpx;
}
.list-item_1:first-child {
  margin-top: 0;
}
.group_3 {
  margin-top: 30rpx;
}
.section {
  padding-top: 27.15rpx;
  background-color: #ffffff;
  border-radius: 9.38rpx 9.38rpx 0rpx 0rpx;
  border-bottom: solid 1.88rpx #efefef;
}
.font {
  font-size: 28.13rpx;
  font-family: Open Sans;
  line-height: 26.16rpx;
  color: #000000;
}
.text {
  margin-left: 26.91rpx;
  font-size: 30rpx;
  line-height: 27.79rpx;
}
.group {
  margin-top: 20.06rpx;
  padding: 18.75rpx 16.88rpx 13.13rpx;
  border-top: solid 1.88rpx #efefef;
  border-bottom: solid 1.88rpx #efefef;
}
.image {
  width: 187.5rpx;
  height: 142.5rpx;
}
.font_2 {
  font-size: 28.13rpx;
  font-family: Open Sans;
  line-height: 26.16rpx;
  color: #616161;
}
.text_2 {
  font-size: 26.25rpx;
  line-height: 24.3rpx;
}
.text_3 {
  font-size: 26.25rpx;
  line-height: 25.71rpx;
}
.text_4 {
  font-size: 26.25rpx;
  line-height: 24.3rpx;
}
.font_3 {
  font-size: 28.13rpx;
  font-family: Open Sans;
  line-height: 21.73rpx;
  font-weight: 600;
  color: #fa7e20;
}
.text_5 {
  font-size: 30rpx;
}
.text_6 {
  font-size: 26.25rpx;
  line-height: 24.41rpx;
}
.font_4 {
  font-size: 28.13rpx;
  font-family: Open Sans;
  line-height: 26.16rpx;
  color: #fa7e20;
}
.text_7 {
  margin-left: -7.03rpx;
  font-size: 26.25rpx;
  line-height: 24.41rpx;
}
.group_2 {
  padding: 18.75rpx 22.5rpx 18.75rpx 24.77rpx;
}
.text_8 {
  line-height: 25.74rpx;
}
.text_9 {
  line-height: 26.03rpx;
}
.image_2 {
  width: 37.5rpx;
  height: 37.5rpx;
}
.list-item {
  padding: 15rpx 16.88rpx 42.19rpx;
  background-color: #ffffff;
   transition-property:height;
          /* 设置需要过渡的属性 */
          transition-duration: 0.5s;
}
.text_10 {
  margin-left: 14.16rpx;
  margin-top: 39.96rpx;
  line-height: 26.08rpx;
}
.divider {
  background-color: #efefef;
  height: 1.88rpx;
}
.view {
  margin: 28.65rpx 11.27rpx 0 11.25rpx;
}
.text_11 {
  margin-left: 13.74rpx;
  margin-top: 25.93rpx;
}
.view_2 {
  margin: 28.54rpx 11.27rpx 0 11.25rpx;
}
.text_12 {
  margin-left: 15.39rpx;
  margin-top: 26.23rpx;
  line-height: 25.74rpx;
}
.view_3 {
  margin: 28.65rpx 11.27rpx 0 11.25rpx;
}
.text_13 {
  margin-left: 14.08rpx;
  margin-top: 26.01rpx;
  line-height: 26.04rpx;
}
.view_4 {
  margin: 28.57rpx 11.27rpx 0 11.25rpx;
}
.text_14 {
  margin-left: 14.34rpx;
  margin-top: 25.97rpx;
}
.view_5 {
  margin: 28.5rpx 11.27rpx 0 11.25rpx;
}
.text_15 {
  margin-left: 15.43rpx;
  margin-top: 25.86rpx;
}
.view_6 {
  margin: 28.61rpx 11.27rpx 0 11.25rpx;
}
@import url(../component/css/global1.css);
</style>

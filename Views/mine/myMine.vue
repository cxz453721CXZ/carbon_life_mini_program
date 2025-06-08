<template>
	<view class="flex-col page">
	  <view class="flex-col self-stretch group">
	    <view class="flex-col items-center self-stretch section">
	      <image
			@click="login"
	        class="image"
	        :src="avatar"
			style="border-radius: 100rpx;"
	      />
	      <text class="text mt-17" @click="login" style="color: #000;">{{name}}</text>
	    </view>
	    <view class="flex-row equal-division section_2">
	      <view class="flex-col group_2 group_8">
	        <view class="flex-row items-center self-stretch">
	          <image
	            class="shrink-0 image_2"
	            :src="MyImgUrl + 'jf.png'"
	          />
	          <text class="font text_1 ml-4">累计积分</text>
	        </view>
	        <text class="self-center font_2 mt-6">{{points}}</text>
	      </view>
	      <view class="horiz-divider section_3 ml-9"></view>
	      <view class="flex-col group_2 group_1 ml-9">
	        <view class="flex-row items-center self-stretch">
	          <image
	            class="shrink-0 image_2"
	            :src="MyImgUrl + 'pm.png'"
	          />
	          <text class="font ml-3">积分排行</text>
	        </view>
	        <text class="self-center font_2 mt-7">{{rank}}</text>
	      </view>
	    </view>
	  </view>
	  <view class="flex-col self-center list mt-41">
	    <view class="flex-row justify-between items-center group_3" @click="jumpToOrderDetail">
	      <view class="flex-row items-center">
	        <image
	          class="shrink-0 image_2"
	          :src="MyImgUrl + 'dd.png'"
	        />
	        <text class="font_3 text_2 ml-10">我的订单</text>
	      </view>
	      <image
	        class="image_3"
	        :src="MyImgUrl + 'yjt.png'"
	      />
	    </view>
	    <view class="flex-row justify-between items-center group_4" @click="develop">
	      <view class="flex-row items-center">
	        <image
	          class="shrink-0 image_2"
	          :src="MyImgUrl + 'dz.png'"
	        />
	        <text class="font_3 ml-10">地址管理</text>
	      </view>
	      <image
	        class="image_3"
	        :src="MyImgUrl + 'yjt.png'"
	      />
	    </view>
	    <view class="flex-row justify-between items-center group_5" @click="develop">
	      <view class="flex-row items-center">
	        <image
	          class="shrink-0 image_2"
	          :src="MyImgUrl + 'act.png'"
	        />
	        <text class="font_3 text_4 ml-10">我参与的</text>
	      </view>
	      <image
	        class="image_3"
	        :src="MyImgUrl + 'yjt.png'"
	      />
	    </view>
	    <view class="flex-row justify-between items-center group_6" @click="jumpToRecycle">
	      <view class="flex-row">
	        <image
	          class="shrink-0 image_4"
	          :src="MyImgUrl + 'hs.png'"
	        />
	        <text class="font_3 text_5 ml-12">回收记录</text>
	      </view>
	      <image
	        class="image_3"
	        :src="MyImgUrl + 'yjt.png'"
	      />
	    </view>
	  </view>
	</view>
	<!-- <view @click="testSession">测试</view> -->
</template>

<script setup lang="ts">
	import {onMounted, ref} from 'vue'
	import { DomainName } from '../../common/global.js'
	import { MyImgUrl } from '../../common/global.js';
	import { userInfoStore } from '../../store/user'
	const userStore = userInfoStore()
	
	const avatar = ref(MyImgUrl + 'avatar.png')
	const name = ref('登录')
	const points = ref(0)
	const rank = ref(0)
	
	const develop = () => {
		uni.showToast({
			title: '正在开发中',
			icon: 'exception'
		})
	}
	
	const testSession = async () => {
		const res = await uni.request({
			url: DomainName + '/test/session',
			method: 'GET'
		}) 
		console.log(res)
	}

	onMounted( async () => {
		const response = await uni.request({
			url: DomainName + '/test/session',
			method: 'GET',
		})
		console.log(response); 
		userStore.user = response.data.data
		avatar.value = userStore.user.avatar
		name.value = userStore.user.name
		points.value = userStore.user.points
		
		const res2 = await uni.request({
			url: DomainName + '/knowledge/selectUserPointsRank',
			method: 'GET',
			data: {
				userId: userStore.user.id
			}
		})
		rank.value = res2.data.data
		dealDate()
	})

	const login = async () => {
		const auth = await my.getAuthCode({
			scopes: 'auth_user'
		}) 
		const res = await uni.request({
			url: DomainName + '/test/auth',
			data: {
				authCode: auth.authCode
			}
		})
		const openId = res.data.openId
		const response = await uni.request({
			url: DomainName + '/test/selectUserByOpenId',
			data: {
				openId,
			}
		})
		console.log("===============>", response)
		userStore.user = response.data.data
		avatar.value = userStore.user.avatar
		name.value = userStore.user.name
		points.value = userStore.user.points
		
		
		const res2 = await uni.request({
			url: DomainName + '/knowledge/selectUserPointsRank',
			method: 'GET',
			data: {
				userId: userStore.user.id
			}
		})
		rank.value = res2.data.data
		dealDate()
		
	}
	
	
	const dealDate = async () => {
		const res = await uni.request({
			url: DomainName + '/user/updateDate',
			method: 'GET',
			data: {
				currentTime: getDate(),
				id: userStore.user.id
			}
		})
		console.log(res.data)
	}
	
	
		
	const getDate = () => {
		let now = new Date()
		let year = now.getFullYear()
		let month = (now.getMonth() + 1).toString().padStart(2, 0)
		let date = now.getDate().toString().padStart(2, 0)
		return year + '-' + month + '-' + date
	}


	const jumpToOrderDetail = () => {
		if(userStore.user.id == '000000'){
			uni.showToast({
				title: '请先登录',
				icon: 'fail'
			})
			return ;
		}
		uni.navigateTo({
			url: '../Page/orderDetail/orderDetail'
		})
	}
	
	const jumpToRecycle = () => {
		if(userStore.user.id == '000000'){
			uni.showToast({
				title: '请先登录', 
				icon: 'fail'
			})
			return ;
		}
		uni.navigateTo({
			url: '../donate/orderDetail/orderDetail'
		})
	}

</script>

<style lang="scss">
.mt-17 {
  margin-top: 31.88rpx;
}
.ml-9 {
  margin-left: 16.88rpx;
}
.ml-3 {
  margin-left: 5.63rpx;
}
.mt-7 {
  margin-top: 13.13rpx;
}
.mt-41 {
  margin-top: 76.88rpx;
}
.page {
  padding-bottom: 50rpx;
  background-color: #fafafa;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group {
  height: 552.99rpx;
}
.section {
  padding: 84rpx 0 162.75rpx;
  background-image: url('https://ide.code.fun/api/image?token=66c63a560412d90011fbac80&name=147c4f5c4d42f4b1b71968440ac3045b.png');
  background-size: 100% 100%;
}
.image {
  width: 150rpx;
  height: 150rpx;
}
.text {
  color: #ffffff;
  font-size: 37.5rpx;
  font-family: Open Sans;
  font-weight: 600;
  line-height: 35.25rpx;
}
.equal-division {
  position: relative;
  align-self: center;
  margin-top: -91.01rpx;
}
.section_2 {
  padding: 33.13rpx 0 33.11rpx;
  background-color: #ffffff;
  border-radius: 18.75rpx;
  box-shadow: 0rpx 7.5rpx 7.5rpx #00000040;
  width: 650.63rpx;
}
.group_2 {
  flex: 1 1 308.04rpx;
}
.group_8 {
  padding: 11.87rpx 69.38rpx 15.11rpx 69.38rpx;
}
.image_2 {
  width: 37.5rpx;
  height: 37.5rpx;
}
.font {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.75rpx;
  color: #939393;
}
.text_1 {
  line-height: 27.66rpx;
}
.font_2 {
  font-size: 52.5rpx;
  font-family: Open Sans;
  line-height: 38.59rpx;
  color: #000000;
}
.horiz-divider {
  flex-shrink: 0;
  margin: 9.99rpx 0 10.01rpx;
}
.section_3 {
  background-color: #d8d8d8;
  width: 1.88rpx;
  height: 93.75rpx;
}
.group_1 {
  padding: 11.87rpx 71.79rpx 13.24rpx 71.79rpx;
}
.list {
  padding: 5.64rpx 37.5rpx 4.71rpx;
  background-color: #ffffff;
  border-radius: 18.75rpx;
  box-shadow: 0rpx 7.5rpx 7.5rpx #00000040;
  width: 650.63rpx;
}
.group_3 {
  padding: 41.23rpx 0 26.25rpx;
}
.font_3 {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.75rpx;
  color: #000000;
}
.text_2 {
  line-height: 27.84rpx;
}
.image_3 {
  width: 24.38rpx;
  height: 24.38rpx;
}
.group_4 {
  margin-top: 3.77rpx;
  padding: 37.48rpx 0 30rpx;
  border-top: solid 1.88rpx #e9e9e9;
  border-bottom: solid 1.88rpx #e9e9e9;
}
.group_5 {
  padding: 35.63rpx 0 31.88rpx;
  border-bottom: solid 1.88rpx #e9e9e9;
}
.text_4 {
  line-height: 27.9rpx;
}
.group_6 {
  margin-top: 4.69rpx;
  padding: 35.74rpx 0 40.29rpx 5.63rpx;
}
.image_4 {
  width: 28.13rpx;
  height: 28.13rpx;
}
.text_5 {
  line-height: 27.69rpx;
}
@import url(./css/global1.css);
</style>

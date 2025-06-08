<template>
	<view class="flex-col justify-start page">
	  <view class="flex-col list">
	    <view class="flex-col list-item mt-21" v-for="(item, index) in orderList" :key="index">
	      <view class="flex-col">
	        <view class="flex-row justify-center items-center list-item_2">
	          <image
	            class="image"
	            :src="item.url"
	          />
	          <view class="flex-col group ml-20">
	            <text class="self-start font">{{item.name}}</text>
	            <text class="self-start font mt-13">类别:【{{item.type}}】</text>
	            <view class="flex-row items-baseline self-stretch mt-13">
	              <text class="font text">单价：</text>
	              <text class="font_2 text_3">{{item.price}}</text>
	              <text class="font text_2">积分</text>
	            </view>
	            <view class="flex-row items-baseline self-stretch mt-13">
	              <text class="font_3 text_4">购买数量：</text>
	              <text class="font_2">{{item.cnt}}</text>
	            </view>
	          </view>
	        </view>
	        <view class="flex-col list-item_3">
	          <view class="flex-row justify-between self-stretch">
	            <view class="flex-row">
	              <text class="font text_5">状态：</text>
	              <text class="font_4 text_6">待发货</text>
	            </view>
	            <view class="flex-row items-baseline group_2">
	              <text class="font text_7">共计：</text>
	              <text class="font_5 text_8">{{item.price * item.cnt}}</text>
	              <text class="font text_9">积分</text>
	            </view>
	          </view>
	          <text class="self-start font_6 text_10">收货人：{{item.consignee}}</text>
	          <text class="self-start font_6 text_11">手机号：{{item.phone}}</text>
	          <text style="line-height: 35rpx;" class="self-stretch font_6 text_12">收货地址：{{addressList[index]}}</text>
	        </view>
	      </view>
	      <view class="flex-row justify-between items-center group_5">
	        <text class="font_7">{{item.orderDate}}</text>
	        <text class="font_6">创客实验室赞助</text>
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { DomainName } from '../../../common/global';
	import {onMounted, ref} from 'vue'
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	const orderList = ref([])
	const addressList = ref([])
	
	onMounted( async () => {
		const res = await uni.request({
			url: DomainName + '/change/queryUserOrders',
			method: 'GET',
			data: {
				id: userStore.user.id
			}
		})
		orderList.value = res.data.data
		for (var i = 0; i < orderList.value.length; i ++ ){
			addressList.value[i] = (orderList.value[i].region + ' ' + orderList.value[i].detailAddress).split('/').join('')
		}
	})
	
	
</script>

<style scoped lang="scss">
.mt-21 {
  margin-top: 39.38rpx;
}
.mt-13 {
  margin-top: 24.38rpx;
}
.page {
  padding: 46.88rpx 0 258.75rpx;
  background-color: #f3f3f6;
  mix-blend-mode: LUMINOSITY;
  border-left: solid 1.88rpx #fef7ff;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.list {
  margin-left: 35.63rpx;
  margin-right: 35.63rpx;
}
.list-item {
  background-color: #ffffff;
  border-radius: 28.13rpx;
}
.list-item:first-child {
  margin-top: 0;
}
.list-item_2 {
  padding: 31.88rpx 46.88rpx 31.27rpx;
  border-bottom: solid 1.88rpx #eaeaea;
}
.image {
  border-radius: 37.5rpx;
  width: 283.13rpx;
  height: 189.38rpx;
}
.group {
  width: 262.18rpx;
}
.font {
  font-size: 30rpx;
  font-family: Microsoft YaHei UI;
  line-height: 29.06rpx;
  color: #000000;
}
.text {
  line-height: 29.33rpx;
}
.font_2 {
  font-size: 33.75rpx;
  font-family: Times New Roman;
  line-height: 23.21rpx;
  color: #000000;
}
.text_3 {
  margin-left: -6.94rpx;
  color: #fa7e20;
}
.text_2 {
  margin-left: 9.68rpx;
  line-height: 29.21rpx;
}
.font_3 {
  font-size: 30rpx;
  font-family: Times New Roman;
  line-height: 29.06rpx;
  color: #000000;
}
.text_4 {
  line-height: 27.69rpx;
}
.list-item_3 {
  padding: 29.29rpx 32.81rpx 35.7rpx 32.83rpx;
  border-bottom: solid 1.88rpx #eaeaea;
}
.text_5 {
  line-height: 28.89rpx;
}
.font_4 {
  font-size: 30rpx;
  font-family: Microsoft YaHei UI;
  line-height: 29.06rpx;
  color: #fa7e20;
}
.text_6 {
  line-height: 29.33rpx;
}
.group_2 {
  margin-right: 14.68rpx;
}
.text_7 {
  line-height: 28.71rpx;
}
.font_5 {
  font-size: 37.5rpx;
  font-family: Times New Roman;
  line-height: 25.78rpx;
  color: #000000;
}
.text_8 {
  line-height: 25.86rpx;
  color: #fa7e20;
}
.text_9 {
  margin-left: 10.28rpx;
  line-height: 29.21rpx;
}
.font_6 {
  font-size: 26.25rpx;
  font-family: Microsoft YaHei UI;
  line-height: 25.78rpx;
  color: #7d7c81;
}
.text_10 {
  margin-top: 33.82rpx;
  line-height: 25.67rpx;
}
.text_11 {
  margin-top: 19.59rpx;
  line-height: 25.39rpx;
}
.text_12 {
  margin-top: 19.29rpx;
}
.group_5 {
  padding: 26.61rpx 36.77rpx 26.36rpx 38.23rpx;
}
.font_7 {
  font-size: 26.25rpx;
  font-family: Microsoft YaHei UI;
  line-height: 20.53rpx;
  color: #7d7c81;
}
@import url('../css/global1.css');
</style>

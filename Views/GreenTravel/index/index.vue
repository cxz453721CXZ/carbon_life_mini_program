<template>
	<view class="flex-col page">
	  <view class="flex-col section">
	    <view class="flex-col">
	      <view class="flex-col group">
	        <image
	          class="image"
	          :src="GreenChallenageImgUrl + 'index/lvsetz.png'"
	        />
	        <view class="flex-row justify-center items-center mt-34">
	          <view class="section_2"></view>
	          <text class="font ml-11">出行板块</text>
	          <view class="section_2 ml-11"></view>
	        </view>
	      </view>
	      <view class="flex-col justify-start items-start section_3">
	        <scroll-view class="flex-row equal-division" scroll-x>
	          <view class="flex-col section_4 equal-division-item" v-for="(item, index) in items" :key="index" @click="jump(index)">
	            <text class="self-center font_2">{{ item.name }}</text>
	            <view class="flex-row items-baseline self-stretch group_2">
	              <text class="font_3 text">挑战次数:</text>
	              <text class="font_4 text_2 ml-3">{{totalArr[index]}}</text>
	              <text class="font_3 ml-3">次</text>
	            </view>
	            <view class="flex-row items-center self-stretch group_3">
					
	              <view class="flex-col justify-start items-center text-wrapper" :style="{marginLeft: weekArr[index] / standard[index] * 100 * dw + 'rpx'}"><text class="font_5">{{(weekArr[index] / standard[index] * 100).toFixed(0)}}%</text></view>
				  <view class="divider" :style="{position: 'absolute', width: weekArr[index] / standard[index] * 100 * dw + 'rpx', backgroundColor: '#e9af0d'}"></view>
				  <view class="divider" :style="{position: 'absolute', width: (1 - weekArr[index] / standard[index]) * 100 * dw + 'rpx', marginLeft: weekArr[index] / standard[index] * 100 * dw + 46.15 + 'rpx'}"></view>
	            </view>
	            <image 
	              class="image_2 pos"
	              :src="item.src"
	            />
	          </view>
	        </scroll-view>
	      </view>
	    </view>
	    <view class="flex-col mt-19">
	      <view class="flex-row justify-center items-center group_4">
	        <view class="section_2"></view>
	        <text class="font ml-11">生活板块</text>
	        <view class="section_2 ml-11"></view>
	      </view>
	      <view class="flex-col justify-start items-start section_5">
	        <scroll-view class="flex-row equal-division" scroll-x>
	          <view class="flex-col section_4 equal-division-item" v-for="(item, index) in items_1" :key="index" @click="jump(index + 3)">
	            <text class="self-center font_2">{{ item.name }}</text>
	            <view class="flex-row items-baseline self-stretch group_2">
	              <text class="font_3 text">挑战次数:</text>
	              <text class="font_4 text_2 ml-3">{{totalArr[index + 3]}}</text>
	              <text class="font_3 ml-3">次</text>
	            </view>
	            <view class="flex-row items-center self-stretch group_3">
	              <view class="flex-col justify-start items-center text-wrapper" :style="{marginLeft: weekArr[index + 3] / standard[index + 3] * 100 * dw + 'rpx'}"><text class="font_5">{{(weekArr[index + 3] / standard[index + 3] * 100).toFixed(0)}}%</text></view>
	              <view class="divider" :style="{position: 'absolute', width: weekArr[index + 3] / standard[index + 3] * 100 * dw + 'rpx', backgroundColor: '#e9af0d'}"></view>
	              <view class="divider" :style="{position: 'absolute', width: (1 - weekArr[index + 3] / standard[index + 3]) * 100 * dw + 'rpx', marginLeft: weekArr[index + 3] / standard[index + 3] * 100 * dw + 46.15 + 'rpx'}"></view>
	            </view>
	            <image
	              class="image_2 pos_3"
	              :src="item.src"
	            />
	          </view>
	        </scroll-view>
	      </view>
	    </view>
	  </view>
	  <view class="flex-col group_5">
	    <text class="self-start font text_3">减碳活动</text>
	    <view class="flex-row items-center waterfall mt-26">
	      <view class="flex-col group_6">
	        <view class="flex-col list-item_2 mt-16" v-for="(item, index) in items_2" :key="index" @click="jumpToDetail">
	          <view class="flex-col items-center">
	            <image
	              class="image_3"
	              :src="GreenChallenageImgUrl + 'index/huodong1.png'"
	            />
	            <text class="font_6 text_4 mt-10">碳索生活&世界环境日垃圾回收活动</text>
	          </view>
	          <view class="flex-row items-center group_8 mt-5">
	            <image
	              class="image_5"
	              :src="GreenChallenageImgUrl + 'index/liulanliang.png'"
	            />
	            <text class="font_7">726</text>
	          </view>
	        </view>
	      </view>
	      <view class="flex-col group_7 ml-16">
	        <view class="flex-col list-item_3 mt-16" v-for="(item, index) in items_3" :key="index">
	          <view class="flex-col items-center">
	            <image
	              class="image_4"
	              :src="GreenChallenageImgUrl + 'index/huodong2.png'"
	            />
	            <text class="font_6 text_4 mt-13">碳索生活&世界环境日垃圾回收活动</text>
	          </view>
	          <view class="flex-row items-center group_8 mt-5">
	            <image
	              class="image_5"
	              :src="GreenChallenageImgUrl + 'index/liulanliang.png'"
	            />
	            <text class="font_7">726</text>
	          </view>
	        </view>
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { GreenChallenageImgUrl } from '../../../common/global'
	
	import { DomainName } from '../../../common/global';
	
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	const weekArr = ref([0, 0, 0, 0, 0, 0])
	const totalArr = ref([0, 0, 0, 0, 0, 0])
	const standard = [21, 28, 7, 21, 7, 7]
	
	import {onMounted, ref} from 'vue'
	const dw = ref(2.10)
	
	 import { onShow } from "@dcloudio/uni-app";
	 
	
	const textObj = ref({})
	
	const dealEvent = async () => {
		const res = await uni.request({
			url: DomainName + '/challenge/selectAllCntByWeek',
			data: {
				userId: userStore.user.id
			}
		})
		weekArr.value = res.data.data
		console.log(weekArr.value)
		
		const response = await uni.request({
			url: DomainName + '/challenge/selectAllCnt',
			data: {
				userId: userStore.user.id
			}
		})
		totalArr.value = response.data.data
	}
	
	onMounted(() => {
		dealEvent()
	})
	
	onShow(() => {
		dealEvent()
	})
	
	
	const items = ref([
		{
			name: '共享单车',
			src: GreenChallenageImgUrl + 'index/gxdc.png'
		},
		{
			name: '公交地铁',
			src: GreenChallenageImgUrl + 'index/subway.png',
		},
		{
			name: '新能源',
			src: GreenChallenageImgUrl + 'index/xny.png',
		}
	])
	const items_1 = ref([
		{
			name: '光盘行动',
			src: GreenChallenageImgUrl + 'index/gpxd.png',
		},
		{
			name: '垃圾回收',
			src: GreenChallenageImgUrl + 'index/ljhs.png',
		},
		{
			name: '循环利用',
			src: GreenChallenageImgUrl + 'index/recycle.png',
		}
	])
	const items_2 = ref([null, null, null])
	const items_3 = ref([null, null, null, null])
	
	 
	const jump = (val:any) => {
		if(val == 0){
			uni.navigateTo({
				url: '../bicycle/bicycle'
			})
		}else if(val == 1){
			uni.navigateTo({
				url: '../subway/subway'
			})
		}else if(val == 2){
			uni.navigateTo({
				url: '../newEnergy/newEnergy'
			})
		}else if(val == 3){
			uni.navigateTo({
				url: '../cleanPlate/cleanPlate'
			})
		}else if(val == 4){
			uni.navigateTo({
				url: '../garbageSorting/garbageSorting'
			})
		}else{
			uni.navigateTo({
				url: '../recycle/recycle'
			})
		}
	}
	
	const jumpToDetail = () => {
		uni.navigateTo({
			url: '../activity/activity'
		})
	}
</script>

<style lang="scss" scoped>
.ml-11 {
  margin-left: 20.63rpx;
}
.ml-3 {
  margin-left: 5.63rpx;
}
.mt-19 {
  margin-top: 35.63rpx;
}
.mt-5 {
  margin-top: 9.38rpx;
}
.mt-13 {
  margin-top: 24.38rpx;
}
.page {
  background-color: #f6f6f6;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.section {
  padding: 67.5rpx 0 39.38rpx;
  background-image: url(https://carbon2.obs.cn-north-4.myhuaweicloud.com/carbon-life-static/GreenChallenge/index/background.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.group {
  padding: 0 144.38rpx 17.1rpx;
}
.image {
  width: 459.38rpx;
  height: 155.63rpx;
}
.section_2 {
  background-color: #ffffff;
  width: 112.5rpx;
  height: 3.75rpx;
}
.font {
  font-size: 37.5rpx;
  font-family: Open Sans;
  line-height: 35.36rpx;
  font-weight: 700;
  color: #ffffff;
}
.section_3 {
  padding: 28.13rpx 0;
  background-color: #ffffff00;
}
.equal-division {
  width: 750rpx;
  // border: 3px solid red;
  
}
.section_4 {
  position: relative;
}
.equal-division-item {
  padding: 29.03rpx 20.63rpx 20.63rpx;
  background-color: #cdcdcd80;
  border-radius: 18.75rpx;
  backdrop-filter: blur(18.75rpx);
  width: 296.25rpx;
  height: 161.25rpx;
  margin-left: 31.88rpx;
  &:nth-last-of-type(1){
	  margin-right: 31.88rpx;
  }
}
.font_2 {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.84rpx;
  color: #ffffff;
}
.group_2 {
  margin-top: 27.36rpx;
}
.font_3 {
  font-size: 22.5rpx;
  font-family: Open Sans;
  line-height: 20.63rpx;
  color: #ffffff;
}
.text {
  line-height: 20.77rpx;
}
.font_4 {
  font-size: 22.5rpx;
  font-family: Open Sans;
  line-height: 16.52rpx;
  color: #ffffff;
}
.text_2 {
  line-height: 16.54rpx;
}
.group_3 {
  margin-top: 18.75rpx;
}
.text-wrapper {
  padding: 4.97rpx 0 3.64rpx;
  background-color: #e9af0d;
  border-radius: 8.63rpx;
  width: 45.13rpx;
  height: 26.88rpx;
}
.font_5 {
  font-size: 16.25rpx;
  font-family: Open Sans;
  line-height: 16.88rpx;
  color: #000000;
}
.divider {
  background-color: #5f6362;
  width: 211.88rpx;
  height: 5.63rpx;
}
.image_2 {
  width: 65.63rpx;
  height: 65.63rpx;
}
.pos {
  position: absolute;
  left: 11.25rpx;
  top: 11.25rpx;
}
.group_4 {
  padding-bottom: 13.35rpx;
}
.section_5 {
  padding: 31.88rpx 0 24.38rpx;
  background-color: #ffffff00;
}
.pos_3 {
  position: absolute;
  left: 11.25rpx;
  top: 11.25rpx;
}
.group_5 {
  padding: 58.54rpx 26.25rpx 60rpx;
}
.text_3 {
  margin-left: 6.98rpx;
  color: #000000;
  line-height: 34.54rpx;
  font-weight: unset;
}
.waterfall {
  align-self: stretch;
}
.group_6 {
  flex: 1 1 333.75rpx;
}
.list-item_2 {
  padding-bottom: 15rpx;
  background-color: #ffffff;
  border-radius: 28.13rpx;
}
.list-item_2:first-child {
  margin-top: 0;
}
.image_3 {
  border-radius: 28.13rpx 28.13rpx 0rpx 0rpx;
  width: 333.75rpx;
  height: 427.5rpx;
}
.font_6 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 31.88rpx;
  color: #000000;
}
.text_4 {
  width: 281.25rpx;
}
.group_8 {
  padding: 0 13.13rpx;
}
.image_5 {
  width: 37.5rpx;
  height: 37.5rpx;
}
.font_7 {
  font-size: 22.5rpx;
  font-family: Open Sans;
  line-height: 16.52rpx;
  color: #b2b2b2;
}
.group_7 {
  flex: 1 1 333.75rpx;
}
.list-item_3 {
  padding-bottom: 18.75rpx;
  background-color: #ffffff;
  border-radius: 28.13rpx;
}
.list-item_3:first-child {
  margin-top: 0;
}
.image_4 {
  border-radius: 28.13rpx 28.13rpx 0rpx 0rpx;
  width: 333.75rpx;
  height: 270rpx;
}
@import url(../component/css/global1.css);
</style>

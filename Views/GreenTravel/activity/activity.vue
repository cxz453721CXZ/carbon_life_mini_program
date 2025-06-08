<template>
	<view class="flex-col page">
	  <view class="flex-col justify-start relative group">
	    <view class="flex-col section">
	      <view class="flex-col items-start group_2">
	        <text class="text">回收纸箱活动</text>
	        <view class="mt-20 flex-row group_3">
	          <image
	            class="shrink-0 self-start image_2"
	            :src="GreenChallenageImgUrl + 'activity/didian.png'"
	          />
	          <text class="ml-14 flex-1 font text_2">浙江省台州市路桥区路北街道玉宏半岛花园2幢正北方向120米</text>
	        </view>
	      </view>
	      <view class="flex-col group_2 view">
	        <view class="flex-row items-center self-stretch">
	          <image
	            class="image_3"
	            :src="GreenChallenageImgUrl + 'activity/shijian.png'"
	          />
	          <text class="font_2 ml-17">截止时间</text>
	        </view>
	        <text class="mt-6 self-start font_3 text_3">2024-08-05 17:00</text>
	      </view>
	      <view class="divider view_2"></view>
	      <view class="flex-row items-center group_2 view_3">
	        <image
	          class="image_2"
	          :src="GreenChallenageImgUrl + 'activity/yjt.png'"
	        />
	        <text class="font_4 text_4 ml-9">关于活动</text>
	      </view>
	      <view class="flex-col group_4">
	        <text class="font_3">
	          我们社区即将开展一场纸箱回收活动，旨在减少废弃物的产生，提高资源利用率，同时增强社区居民的环保意识。我们诚邀各位居民积极参与，共同为我们的地球贡献一份力量
	        </text>
	        <view class="mt-36 flex-col section_2">
	          <view class="flex-row justify-between items-center">
	            <text class="font_2 text_5">活动时间：</text>
	            <text class="font text_6">2024-08-03 14:00</text>
	          </view>
	          <view class="mt-20 flex-row justify-between">
	            <text class="font_2 text_7">活动主题：</text>
	            <text class="font_2 text_8">纸箱回收</text>
	          </view>
	        </view>
	      </view>
	      <view class="flex-col group_5">
	        <view class="flex-row items-center self-stretch">
	          <image
	            class="image_2"
	            :src="GreenChallenageImgUrl + 'activity/yjt.png'"
	          />
	          <text class="ml-6 font_4 text_9">参与方式</text>
	        </view>
	        <view class="flex-col self-stretch group_6">
	          <text class="font_3">
	            居民可将自家不需要的纸箱（请确保纸箱内部干净、无杂物）带至指定地点
	            <br />
	            <br />
	          </text>
	          <text class="font_3 mt-11">在活动现场，志愿者将指导大家如何正确回收和堆放纸箱</text>
	        </view>
	        <text class="self-start font_5 text_10">请尽量平整纸箱，以节省空间并便于运输。</text>
	      </view>
	      <view class="flex-col group_7">
	        <view class="flex-row items-center">
	          <image
	            class="image_2"
	            :src="GreenChallenageImgUrl + 'activity/yjt.png'"
	          />
	          <text class="font_4 text_11 ml-7">活动奖励</text>
	        </view>
	        <text class="mt-18 font_3 text_12">
	          为了鼓励大家的积极参与，每位参与活动的居民将获得由社区精心准备的环保小礼品一份，以表达我们对您环保行动的支持与感谢。
	        </text>
	      </view>
	      <view class="flex-col group_8">
	        <view class="flex-row items-center">
	          <image
	            class="image_2"
	            :src="GreenChallenageImgUrl + 'activity/yjt.png'"
	          />
	          <text class="ml-6 font_4 text_13">特别提示</text>
	        </view>
	        <text class="font_5 text_14">请大家在活动前整理好纸箱，确保其干净整洁。</text>
	        <text class="font_3 text_15">若纸箱较多，可提前联系活动组织者，我们将安排志愿者上门协助。</text>
	      </view>
	      <view class="divider view_4"></view>
	      <view class="flex-col group_9">
	        <image
	          class="self-center image_4"
	          :src="GreenChallenageImgUrl + 'activity/zhixie.png'"
	        />
	        <text class="self-stretch font_3 mt-21">
	          通过这次活动，我们希望提升社区居民对环保的关注，营造一个更加和谐、绿色、可持续的生活环境。让我们携手行动，从身边的小事做起，为我们的地球贡献一份力量！
	        </text>
	      </view>
	    </view>
	    <image
	      class="image pos"
	      :src="GreenChallenageImgUrl + 'activity/activity.png'"
	    />
	  </view>
	  <view class="mt-90 flex-row justify-between items-center relative section_3">
	    <view class="flex-col items-end">
	      <text class="text_16">10</text>
	      <text class="font_2 text_18 mt-11">可赚取碳积分</text>
	    </view>
	    <view class="flex-col justify-start items-center text-wrapper">
	      <text class="font_5 text_17">上传参与凭证</text>
	    </view>
	    <image
	      class="image_5 pos_2"
	      :src="GreenChallenageImgUrl + 'activity/jf.png'"
	    />
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { GreenChallenageImgUrl } from '../../../common/global';
</script>

<style lang="scss" scoped>
.ml-17 {
  margin-left: 31.88rpx;
}
.ml-9 {
  margin-left: 16.88rpx;
}
.ml-7 {
  margin-left: 13.13rpx;
}
.mt-21 {
  margin-top: 39.38rpx;
}
.mt-11 {
  margin-top: 20.63rpx;
}
.page {
  padding-bottom: 257.5rpx;
  background-color: #ffffff;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group {
  padding-top: 354.38rpx;
  overflow-x: hidden;
}
.section {
  padding: 127.5rpx 20.63rpx 0;
  background-color: #ffffff;
}
.group_2 {
  padding: 0 7.5rpx;
}
.text {
  margin-left: 7.5rpx;
  color: #000000;
  font-size: 45rpx;
  font-family: Open Sans;
  line-height: 41.72rpx;
}
.group_3 {
  width: 636.49rpx;
}
.image_2 {
  width: 45rpx;
  height: 45rpx;
}
.font {
  font-size: 26.25rpx;
  font-family: Open Sans;
  color: #000000;
}
.text_2 {
  line-height: 31.88rpx;
}
.view {
  margin-top: 48.75rpx;
}
.image_3 {
  width: 41.25rpx;
  height: 41.25rpx;
}
.font_2 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 24.17rpx;
  color: #616161;
}
.divider {
  background-color: #c3c3c3;
  height: 1.88rpx;
}
.view_2 {
  margin-top: 48.75rpx;
}
.view_3 {
  margin-top: 61.88rpx;
}
.group_4 {
  margin: 46.88rpx 16.88rpx 0;
}
.section_2 {
  padding: 37.5rpx 30rpx 37.5rpx 33.75rpx;
  background-color: #f9f9f7;
  border-radius: 18.75rpx;
}
.text_5 {
  line-height: 24.07rpx;
}
.text_6 {
  line-height: 19.39rpx;
}
.text_7 {
  line-height: 24.04rpx;
}
.text_8 {
  color: #000000;
  line-height: 24.34rpx;
}
.group_5 {
  margin-top: 61.88rpx;
  padding-left: 7.5rpx;
  padding-right: 3.75rpx;
}
.font_4 {
  font-size: 37.5rpx;
  font-family: Open Sans;
  line-height: 35.63rpx;
  color: #000000;
}
.text_4 {
  line-height: 34.58rpx;
}
.text_9 {
  line-height: 34.8rpx;
}
.group_6 {
  margin-left: 22.5rpx;
  margin-top: 33.75rpx;
}
.font_5 {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 28.54rpx;
  color: #000000;
}
.text_10 {
  margin-left: 22.5rpx;
  margin-top: 22.5rpx;
}
.group_7 {
  margin: 67.5rpx 33.75rpx 0 7.5rpx;
}
.text_11 {
  line-height: 34.88rpx;
}
.font_3 {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 35.63rpx;
  color: #000000;
}
.text_3 {
  margin-left: 71.25rpx;
  font-size: 28.13rpx;
  line-height: 20.77rpx;
}
.text_12 {
  margin-left: 11.25rpx;
}
.group_8 {
  margin: 63.75rpx 15rpx 0 7.5rpx;
}
.text_13 {
  line-height: 34.65rpx;
}
.text_14 {
  margin-left: 22.5rpx;
  margin-top: 37.5rpx;
}
.text_15 {
  margin-left: 22.5rpx;
  margin-top: 26.25rpx;
}
.view_4 {
  margin-top: 52.5rpx;
}
.group_9 {
  margin: 60rpx 33.75rpx 0 18.75rpx;
  padding: 20.63rpx 0;
}
.image_4 {
  width: 95.63rpx;
  height: 93.75rpx;
}
.image {
  width: 100vw;
  height: 55.5vw;
}
.pos {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
.section_3 {
  padding: 48.75rpx 26.25rpx;
  background-color: #ffffff;
  box-shadow: 0rpx -3.75rpx 18.75rpx #00000040;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.text_16 {
  margin-right: 26.25rpx;
  color: #037457;
  font-size: 60rpx;
  font-family: Open Sans;
  line-height: 44.1rpx;
}
.text_18 {
  line-height: 24.26rpx;
}
.text-wrapper {
  margin-right: 7.5rpx;
  padding: 30rpx 0;
  background-color: #0eb2b3;
  border-radius: 18.75rpx;
  width: 255rpx;
  height: 91.88rpx;
}
.text_17 {
  color: #ffffff;
  line-height: 27.81rpx;
}
.image_5 {
  width: 80.63rpx;
  height: 80.63rpx;
}
.pos_2 { 
  position: absolute;
  left: 15.99rpx;
  top: 31.88rpx;
}
@import url(../component/css/global1.css);
</style>

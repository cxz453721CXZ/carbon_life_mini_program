<template>
<view class="flex-col page" :style="{marginTop: offset + 'rpx'}">
  <image
    class="image"
    :src="GreenChallenageImgUrl + 'newEnergy/xny.png'"
  />
  <view class="flex-col justify-start items-center text-wrapper"><text class="font text">新能源汽车</text></view>
  <view class="flex-col section">
    <text class="self-stretch font_2 text_2">充电4kwh获得1积分，每天可上传1次，每天上限20积分</text>
    <!-- <view class="flex-col justify-start items-center self-start image-wrapper">
      <image
        class="image_2"
        :src="GreenChallenageImgUrl + 'newEnergy/xj.png'"
      />
    </view> -->
	
	<uni-file-picker :limit="1" @select="select" @delete="del" :auto-upload="false"></uni-file-picker>
	
	
    <view class="flex-row justify-between items-center self-stretch group">
      <text class="font text_3">输入充电度数</text>
      <view class="flex-col justify-start items-start text-wrapper_2">
        <input class="text_4" placeholder="请输入充电度数" type="number" @focus="focus" @blur="blur" v-model="text"/>
      </view>
    </view>
    <view class="flex-row justify-between self-stretch group_2">
      <text class="self-start font_2 text_5">
        注：需要上传充电记录或支付记录，需要显示日期，时间，以及充电量，仅限当日(如右图示例)
      </text>
      <image
        class="image_3"
        :src="GreenChallenageImgUrl + 'newEnergy/xny1.png'"
      />
    </view>
    <view class="flex-row self-stretch group_3">
      <view class="flex-col justify-start items-center text-wrapper_3" @click="submit"><text class="font">提交</text></view>
      <view class="flex-col justify-start items-center text-wrapper_4 ml-46">
        <text class="font" @click="jump">查看提交记录</text>
      </view>
    </view>
  </view>
</view>
</template>

<script setup lang="ts">
	import { DomainName, GreenChallenageImgUrl } from '../../../common/global';
	import {ref} from 'vue'
	
	import { gc } from '../../../store/greenChallenge';
	const gcStore = gc()
	
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	const offset = ref(0)
	
	const focus = () => {
		offset.value = -80
	}
	
	const blur = () => {
		offset.value = 0
	}
	
	const text = ref('')
	
	const tempFile = ref('')
	
	const select = (e:any) => {
		tempFile.value = e.tempFilePaths[0]
	}
	
	const del = () => {
		console.log(tempFile.value)
		tempFile.value = ''
	}
	
	const jump = () => {
		uni.navigateTo({
			url: '../detail/detail?id=5'
		})
	}
	
	const returnUrl = ref(null)
	const obj = ref({
		id: '',
		type: '新能源',
		typeId: 5,
		photo: '',
		submitTime: '',
		submitData: 0,
		reward: 2, 
		isAccess: 0,
		userId: userStore.user.id,
		subCnt: 0
	})
	
	
	const submit = async () => {
		const flag = await gcStore.checkCount(getDate(), 5,  1, userStore.user.id)
		if(!flag) return;
		if(tempFile.value != '' && text.value != ''){
			uni.uploadFile({
				url: DomainName + '/file/upload',
				filePath: tempFile.value,
				name: 'file',
				success: async (res) => {
					returnUrl.value = res.data
					console.log(returnUrl.value)
					const time = getDate()
					obj.value.submitTime = time
					obj.value.photo = returnUrl.value
					obj.value.submitData = Number(text.value)
					const response = await uni.request({
						url: DomainName + '/challenge/insertBike',
						method:"POST",
						data:{
							...obj.value
						}
					})
					console.log(response)
					uni.showToast({
						title: '上传成功',
						icon: 'success'
					})
				}
			})
		}else if(tempFile.value == ''){
			uni.showToast({
				title:'请上传图片',
				icon: 'fail'
			})
		}else if(text.value == ''){
			uni.showToast({
				title:'请输入充电度数',
				icon: 'fail'
			})
		}
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
.page {
  background-color: #ffffff;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.image {
  width: 100vw;
  height: 48.75vw;
}
.text-wrapper {
  padding: 21.53rpx 0 21.83rpx;
  background-color: #0eb2b3;
}
.font {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.75rpx;
  color: #ffffff;
}
.text {
  line-height: 27.9rpx;
}
.section {
  padding: 56.57rpx 43.13rpx 73.13rpx;
  background-color: #ffffff;
}
.image-wrapper {
  margin-top: 70.31rpx;
  padding: 60rpx 0 61.88rpx;
  background-color: #f4f5f7;
  width: 168.75rpx;
}
.image_2 {
  width: 48.75rpx;
  height: 46.88rpx;
}
.group {
  margin-top: 46.88rpx;
  padding: 37.39rpx 0 26.36rpx 16.22rpx;
  border-top: solid 1.88rpx #ededed;
  border-bottom: solid 1.88rpx #ededed;
}
.text_3 {
  color: #22adae;
  line-height: 27.79rpx;
}
.text-wrapper_2 {
  padding: 0;
  background-color: #ffffff;
  width: 324.38rpx;
  height: 54.38rpx;
}
.text_4 {
  margin-left: 8.57rpx;
  font-size: 30rpx;
}
.font_2 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 24.3rpx;
}
.text_2 {
  color: #616161;
  line-height: 24.99rpx;
}
.group_2 {
  margin: 63.75rpx 9.38rpx 0 12.17rpx;
}
.text_5 {
  margin-top: 3.21rpx;
  color: #000000;
  line-height: 31.88rpx;
  width: 236.25rpx;
}
.image_3 {
  width: 298.13rpx;
  height: 264.38rpx;
}
.group_3 {
  margin-top: 63.75rpx;
  padding-left: 11.25rpx;
  padding-right: 9.64rpx;
}
.text-wrapper_3 {
  padding: 21.64rpx 0 21.86rpx;
  flex: 1 1 278.16rpx;
  background-color: #0eb2b3;
  border-radius: 93.75rpx;
  height: 71.25rpx;
}
.text-wrapper_4 {
  padding: 21.64rpx 0 21.86rpx;
  flex: 1 1 278.16rpx;
  background-color: #04c364;
  border-radius: 93.75rpx;
  height: 71.25rpx;
}
@import url(../component/css/global1.css);
</style>

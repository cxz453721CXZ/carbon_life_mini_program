<template>
	<view class="flex-col section_2">
	  <text class="self-start font_2 text_2">每天获得3积分，每天可以上传两次，每天上限6积分</text>
<!-- 	  <view class="flex-col justify-start items-center self-start image-wrapper">
	    <image
	      class="image_2"
	      :src="GreenChallenageImgUrl + 'component/xj.png'"
	    />
	  </view> -->

		<uni-file-picker2 :limit="1" @select="select" @delete="del" :auto-upload="false">
		</uni-file-picker2>  

 
	  
	  <view class="flex-col self-stretch group">
	    <text class="self-stretch font_2 text_3">注：上传正在乘坐地铁的内部图片，或地铁站内图片（如下图示例）</text>
	    <image
	      class="self-center image_3 mt-20"
	      :src="GreenChallenageImgUrl + 'component/jilu3.png'"
	    />
	  </view>
	  <view class="flex-row self-stretch group_2">
	    <view class="flex-col justify-start items-center text-wrapper_2" @click="submit"><text class="font text_1">提交</text></view>
	    <view class="flex-col justify-start items-center text-wrapper_3 ml-46" @click="jump">
	      <text class="font text_4">查看提交记录</text>
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { DomainName, GreenChallenageImgUrl } from '../../../common/global';
	
	import { gc } from '../../../store/greenChallenge';
	const gcStore = gc()
	
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	import {ref} from 'vue'
	
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
			url: '../detail/detail?id=3'
		})
	}
	
	const returnUrl = ref(null)
	const obj = ref({
		id: '',
		type: '地铁',
		typeId: 3,
		photo: '',
		submitTime: '',
		submitData: 0,
		reward: 2, 
		isAccess: 0,
		userId: userStore.user.id,
		subCnt: 0
	})
	
	
	
	
	
	const submit = async () => {
		const flag = await gcStore.checkCount(getDate(), 3,  2, userStore.user.id)
		if(!flag) return;
		if(tempFile.value != ''){
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
	.font {
	  font-size: 30rpx;
	  font-family: Open Sans;
	  line-height: 27.56rpx;
	  color: #ffffff;
	}
	.section_2 {
	  padding: 56.57rpx 43.13rpx 73.13rpx;
	  background-color: #ffffff;
	}
	.font_2 {
	  font-size: 26.25rpx;
	  font-family: Open Sans;
	}
	.text_2 {
	  color: #616161;
	  line-height: 24.99rpx;
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
	  margin-top: 69.38rpx;
	  padding: 40.65rpx 19.35rpx 0 29.12rpx;
	  border-top: solid 1.88rpx #ededed;
	}
	.text_3 {
	  color: #000000;
	  line-height: 31.88rpx;
	}
	.image_3 {
	  width: 498.75rpx;
	  height: 290.63rpx;
	}
	.group_2 {
	  margin-top: 56.25rpx;
	  padding-left: 11.25rpx;
	  padding-right: 9.64rpx;
	}
	.text-wrapper_2 {
	  padding: 21.64rpx 0 21.86rpx;
	  flex: 1 1 278.16rpx;
	  background-color: #0eb2b3;
	  border-radius: 93.75rpx;
	  height: 71.25rpx;
	}
	.text_1 {
	  line-height: 27.75rpx;
	}
	.text-wrapper_3 {
	  padding: 21.64rpx 0 21.86rpx;
	  flex: 1 1 278.16rpx;
	  background-color: #04c364;
	  border-radius: 93.75rpx;
	  height: 71.25rpx;
	}
	.text_4 {
	  line-height: 27.75rpx;
	}
	@import url(../component/css/global1.css);
</style>
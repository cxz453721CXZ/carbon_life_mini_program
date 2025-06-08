<template>
	<view class="flex-col page">
	  <image
	    class="image"
	    :src="GreenChallenageImgUrl + 'cleanPlate/gpxd.png'"
	  />
	  <view class="flex-col justify-start items-center text-wrapper"><text class="font text">光盘行动</text></view>
	  <view class="flex-col section">
	    <text class="self-start font_2 text_2">每次1积分，每天可以上传3次，每天上限3积分</text>
	   <!-- <view class="flex-col justify-start items-center self-start image-wrapper">
	      <image
	        class="image_2"
	        :src="GreenChallenageImgUrl + 'cleanPlate/xj.png'"
	      />
	    </view> -->
		<uni-file-picker2 :limit="1" @select="select" @delete="del" :auto-upload="false">
		</uni-file-picker2>
		
	    <view class="flex-col self-stretch group">
	      <text class="self-stretch font_2 text_3">
	        注：请上传用餐后的空盘图片，洗净的空盘无效，重复上传图片无效（如下图示例）
	      </text>
	      <image
	        class="mt-20 self-center image_3"
	        :src="GreenChallenageImgUrl + 'cleanPlate/gp.png'"
	      />
	    </view>
	    <view class="flex-row self-stretch group_2">
	      <view class="flex-col justify-start items-center text-wrapper_2" @click="submit"><text class="font">提交</text></view>
	      <view class="ml-46 flex-col justify-start items-center text-wrapper_3" @click="jump">
	        <text class="font">查看提交记录</text>
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
			url: '../detail/detail?id=6'
		})
	}
	
	const returnUrl = ref(null)
	const obj = ref({
		id: '',
		type: '光盘行动',
		typeId: 6,
		photo: '',
		submitTime: '',
		submitData: 0,
		reward: 3, 
		isAccess: 0,
		userId: userStore.user.id,
		subCnt: 0
	})
	
	
	
	
	
	const submit = async () => {
		const flag = await gcStore.checkCount(getDate(), 6,  3, userStore.user.id)
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
  padding: 22.5rpx 0;
  background-color: #0eb2b3;
}
.font {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.75rpx;
  color: #ffffff;
}
.text {
  line-height: 27.99rpx;
}
.section {
  padding: 56.25rpx 43.13rpx 73.13rpx;
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
  margin-top: 71.25rpx;
  padding: 60rpx 0;
  background-color: #f4f5f7;
  width: 168.75rpx;
}
.image_2 {
  width: 48.75rpx;
  height: 46.88rpx;
}
.group {
  margin-top: 69.38rpx;
  padding: 41.25rpx 30rpx 0;
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
  padding: 0 11.25rpx;
}
.text-wrapper_2 {
  padding: 22.5rpx 0;
  flex: 1 1 278.16rpx;
  background-color: #0eb2b3;
  border-radius: 93.75rpx;
  height: 71.25rpx;
}
.text-wrapper_3 {
  padding: 22.5rpx 0;
  flex: 1 1 278.16rpx;
  background-color: #04c364;
  border-radius: 93.75rpx;
  height: 71.25rpx;
}
@import url(../component/css/global1.css);
</style>

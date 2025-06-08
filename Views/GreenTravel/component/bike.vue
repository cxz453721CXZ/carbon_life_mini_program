<template>
	<view class="flex-col section_3">
	  <text class="self-stretch font_2 text_2">骑行10分钟获1积分，每天上限2积分，每天只能上传一次</text>
	  
	  
	<!-- <view style="width: 360.23rpx; display: flex; justify-content: space-between;"> -->
	
	<!-- <view @click="getImg" class="flex-col justify-start items-center self-start image-wrapper" style="padding: 0;" v-show="!isShow">
	    <image
		  style="height: 168.89rpx; width: 168.89rpx"
		  class="image_2"
	      :src="url"
	    />
	  </view> -->
	  
	<!-- <view class="flex-col justify-start items-center self-start image-wrapper" @click="submit" v-show="isShow">
	    <image
	      class="image_2"
	      :src="GreenChallenageImgUrl + 'component/xj.png'"
	    />
	  </view> -->
		<uni-file-picker :limit="1" @select="select" @delete="del" :auto-upload="false"></uni-file-picker>

	
	  
	<!-- </view> -->
	 
	  <view class="flex-row justify-between items-center self-stretch group_3">
	    <text class="font text_3">今日骑行时间(分钟)</text>
	    <view class="flex-col justify-start items-start text-wrapper_2">
	      <input class="text_4" placeholder="请输入今日骑行时间" type="number" @focus="focus" @blur="blur" v-model="text" />
	    </view>
	  </view>
	  <view class="flex-row justify-between items-center self-stretch group_4">
	    <text class="font_2 text_5">
	      注：上传共享单车的订单截图，要显示日期和骑行时间，只拍摄公共交通工具无效，重复上传图片无效。时间仅限当天（如右图示例）
	    </text>
	    <image
	      class="image_3"
	      :src="GreenChallenageImgUrl + 'component/jilu.png'"
	    />
	  </view>
	  <view class="flex-row self-stretch group_5">
	    <view class="flex-col justify-start items-center text-wrapper_3" @click="submit"><text class="font">提交</text></view>
	    <view class="flex-col justify-start items-center text-wrapper_4 ml-46" @click="jump"><text class="font">查看提交记录</text></view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { DomainName, GreenChallenageImgUrl } from '../../../common/global';
	import emitter from '../../../utils/emitter';
	import {onMounted, ref} from 'vue'
	import { gc } from '../../../store/greenChallenge';
	const gcStore = gc()
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	
	const text = ref('')
	
	const tempFile = ref('')
	
	const select = (e:any) => {
		tempFile.value = e.tempFilePaths[0]
	}
	
	const del = () => {
		console.log(tempFile.value)
		tempFile.value = ''
	}
	
	const focus = () => {
		emitter.emit('focus')
	}
	
	const blur = () => {
		emitter.emit('blur')
	}
	
	const jump = () => {
		uni.navigateTo({
			url: '../detail/detail?id=1'
		})
	}

	const returnUrl = ref(null)
	const obj = ref({
		id: '',
		type: '共享单车',
		typeId: 1,
		photo: '',
		submitTime: '',
		submitData: 0,
		reward: 2, 
		isAccess: 0,
		userId: userStore.user.id,
		subCnt: 0
	})

	
	const submit = async () => {
		const flag = await gcStore.checkCount(getDate(), 1,  2, userStore.user.id)
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
				title:'请输入骑行时间',
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
	  line-height: 27.75rpx;
	  color: #ffffff;
	}
	.section_3 {
	  padding: 36.88rpx 42rpx 73.13rpx;
	  background-color: #ffffff;
	}
	.image-wrapper {
	  margin-top: 47.29rpx;
	  padding: 60rpx 0 61.88rpx;
	  background-color: #f4f5f7;
	  width: 168.75rpx;
	}
	.image_2 {
	  width: 48.75rpx;
	  height: 46.88rpx;
	}
	.group_3 {
	  margin-top: 46.88rpx;
	  padding: 37.39rpx 0 26.36rpx 15.99rpx;
	  border-top: solid 1.88rpx #ededed;
	  border-bottom: solid 1.88rpx #ededed;
	}
	.text_3 {
	  color: #22adae;
	  line-height: 30rpx;
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
	  line-height: 31.88rpx;
	}
	.text_2 {
	  color: #616161;
	}
	.group_4 {
	  margin: 63.75rpx 9.71rpx 0 12rpx;
	}
	.text_5 {
	  color: #000000;
	  width: 236.25rpx;
	}
	.image_3 {
	  width: 298.13rpx;
	  height: 264.38rpx;
	}
	.group_5 {
	  margin-top: 63.75rpx;
	  padding: 0 9.99rpx;
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
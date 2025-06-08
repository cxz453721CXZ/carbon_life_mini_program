<template>
	<view class="flex-col page">
	  <image
	    class="image"
	    :src="GreenChallenageImgUrl + 'garbageSorting/ljfl.png'"
	  />
	  <view class="flex-col justify-start items-center text-wrapper"><text class="font text">垃圾分类</text></view>
	  <view class="flex-col section">
	    <text class="self-start font_2 text_2">每次1积分，每天可以上传一次</text>
	    <view class="flex-col self-stretch group">
	     <!-- <view class="flex-col justify-start items-center self-start image-wrapper">
	        <image
	          class="image_2"
	          :src="GreenChallenageImgUrl + 'garbageSorting/xj.png'"
	        />
	      </view> -->
		  
		  <uni-file-picker2 :limit="2" @select="select" @delete="del" :auto-upload="false">
		  </uni-file-picker2>
		  
	      <view class="flex-col self-stretch group_2 mt-18">
	        <text class="self-stretch font_2">
	          注：图片内容需要包括:扔垃圾且进行垃圾分类，仅拍摄垃圾分类桶无效。非垃圾分类的场景无效，重复上传无效。可以拍一张扔垃圾的图片，再拍一张分类垃圾桶的全景图
	          <br />
	        </text>
	        <text class="self-start font_2 mt-2">片（如下图示例）</text>
	      </view>
	    </view>
	    <view class="flex-row self-stretch relative grid">
	      <image
	        class="grid-item pos"
	        :src="GreenChallenageImgUrl + 'garbageSorting/lihs1.png'"
	      />
	      <image
	        class="grid-item pos_2"
	        :src="GreenChallenageImgUrl + 'garbageSorting/ljhs2.png'"
	      />
	      <view class="flex-col justify-start items-center grid-item_2 pos_3" @click="submit"><text class="font">提交</text></view>
	      <view class="flex-col justify-start items-center grid-item_3 pos_4" @click="jump"><text class="font">查看提交记录</text></view>
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
	
	const tempFile = ref([])
	
	const select = (e:any) => {
		tempFile.value.push(e.tempFilePaths[0])
	}
	
	const del = (e) => {
		tempFile.value = tempFile.value.filter((item) => {
			return item !== e.tempFilePath
		})
	}
	
	
	const jump = () => {
		uni.navigateTo({
			url: '../details/details?id=7'
		})
	}
	
	// const returnUrl = ref(null)
	
	const returnUrl = ref([])
	
	const obj = ref({
		id: null,
		type: '垃圾分类',
		typeId: 7,
		photo: '',
		submitTime: '',
		submitData: 0,
		reward: 3, 
		isAccess: 0,
		userId: userStore.user.id,
		subCnt: 0
	})
	
	const othObj = ref({
		id: null,
		photo: '',
		greenId: 0
	})
	
	
	
	const dealSqlData = async () => {
			const time = getDate()
			obj.value.submitTime = time
			obj.value.photo = returnUrl.value[0]
			const response = await uni.request({
			url: DomainName + '/challenge/insertBike',
			method:"POST",
			data:{
				...obj.value
			}
		})
			othObj.value.photo = returnUrl.value[1]
			const res = await uni.request({
				url: DomainName + '/challenge/insertOtherForm',
				method:"POST",
				data: {
					...othObj.value
				}
			})
			uni.showToast({
				title: '上传成功',
				icon: 'success'
			})
	}
	
	
	
	
	const submit = async () => {
		const flag = await gcStore.checkCount(getDate(), 7,  1, userStore.user.id)
		if(!flag) return;
		if(tempFile.value.length == 2){
			for (let i = 0; i < 2; i ++ ){
			const res = await uni.uploadFile({
				url: DomainName + '/file/upload',
					filePath: tempFile.value[i],
					name: 'file',
				})	
				returnUrl.value[i] = res.data
			}
			console.log(returnUrl.value)
			dealSqlData()
		}else{
			uni.showToast({
				title: '请上传两张图片',
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
  padding: 21.71rpx 0 21.83rpx;
  background-color: #0eb2b3;
}
.font {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.75rpx;
  color: #ffffff;
}
.text {
  line-height: 27.71rpx;
}
.section {
  padding: 56.57rpx 39.71rpx 73.13rpx 43.13rpx;
  background-color: #ffffff;
}
.font_2 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 31.88rpx;
  color: #000000;
}
.text_2 {
  color: #616161;
  line-height: 24.99rpx;
}
.group {
  // margin-top: 70.31rpx;
}
.image-wrapper {
  padding: 60rpx 0 61.88rpx;
  background-color: #f4f5f7;
  width: 168.75rpx;
}
.image_2 {
  width: 48.75rpx;
  height: 46.88rpx;
}
.group_2 {
  padding-top: 33.13rpx;
  border-top: solid 1.88rpx #ededed;
}
.grid {
  margin: 49.63rpx 13.03rpx 0 11.25rpx;
  height: 376.88rpx;
}
.grid-item {
  width: 298.13rpx;
  height: 226.88rpx;
}
.pos {
  position: absolute;
  left: 0;
  top: 0;
}
.pos_2 {
  position: absolute;
  right: 0;
  top: 0;
}
.grid-item_2 {
  padding: 21.64rpx 0 21.86rpx;
  background-color: #0eb2b3;
  border-radius: 93.75rpx;
  width: 278.16rpx;
}
.pos_3 {
  position: absolute;
  left: 0;
  top: 305.63rpx;
}
.grid-item_3 {
  padding: 21.64rpx 0 21.86rpx;
  background-color: #04c364;
  border-radius: 93.75rpx;
  width: 278.16rpx;
}
.pos_4 {
  position: absolute;
  right: 0;
  top: 305.63rpx;
}
@import url(../component/css/global1.css);
</style>

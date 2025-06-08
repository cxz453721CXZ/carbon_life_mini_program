<template>
	<view class="flex-col page">
	  <view class="flex-col group">
	    <view class="flex-col items-start group_2">
	      <!-- <view class="flex-col justify-start items-center image-wrapper"> -->
	        <!-- <image
	          class="image"
	          :src="CommunityImgUrl + 'publish/jh.png'"
	        /> --> 
			<uni-file-picker3 :limit="1" @select="select" @delete="del" :auto-upload="false"></uni-file-picker3>
			
	      <!-- </view> -->
	      <input enableNative="{{false}}" class="mt-14" type="text" placeholder="请输入标题" v-model="title" />
	    </view>
		
	    <textarea enableNative="{{false}}"  @focus="focus" @blur="blur" maxlength="1000" class="mt-12" placeholder="来分享你的低碳生活吧~" v-model="content"></textarea>
	   
	  </view>
	  <view class="flex-col section"> 
	    <text class="self-start font text_3">话题</text>
	    <view class="flex-row equal-division group_3">
	      <view class="flex-row justify-evenly items-center section_2 equal-division-item_1" @click="transfer(0)">
	        <image
	          class="image_2"
	          :src="CommunityImgUrl + 'publish/jhao.png'"
	        />
	        <text class="font_2">绿色出行</text>
	      </view>
	      <view class="flex-row justify-evenly items-center section_2 equal-division-item_1 ml-9" @click="transfer(1)">
	        <image
	          class="image_2"
	          :src="CommunityImgUrl + 'publish/jhao.png'"
	        />
	        <text class="font_2 text_1">低碳生活</text>
	      </view>
	      <view class="flex-row justify-evenly items-center section_2 equal-division-item ml-9" @click="transfer(2)">
	        <image
	          class="image_2"
	          :src="CommunityImgUrl + 'publish/jhao.png'"
	        />
	        <text class="font_2">公益活动</text>
	      </view>
	    </view>
	    <view class="flex-col justify-start self-stretch group_4">
	      <view class="flex-col justify-start items-center text-wrapper_3" @click="publish"><text class="text_4">发布</text></view>
	    </view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { CommunityImgUrl, DomainName } from '../../../common/global';
	import {ref} from 'vue'
	
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	

	const focus = () => {
		
	}
	
	const blur = () => {

	}
	
	const title = ref('')
	const content = ref('')
	const url = ref('')
	
	const tempFile = ref('')
	const returnUrl = ref('')
	
	const select = (e:any) => {
		tempFile.value = e.tempFilePaths[0]
	}
	
	const del = () => {
		console.log(tempFile.value)
		tempFile.value = ''
	}
	
	const mainTiltle = ['#绿色出行', '#低碳生活', '#公益活动']
	
	const arr = ref([false, false, false])
	const transfer = (val:any) => {
		arr.value[val] = !arr.value[val]
		if(arr.value[val]){
			content.value += mainTiltle[val]
		}else{
			content.value = content.value.replace(mainTiltle[val], '')
		}
	
	}
	
	
	const publish = async () => {
		
		if(title.value == ''){
			uni.showToast({
				title: '请输入标题',
				icon: 'fail'
			})
			return ;
		}else if(content.value == ''){
			uni.showToast({
				title: '请输入内容',
				icon: 'fail'
			})
			return ;
		}else if(tempFile.value == ''){
			uni.showToast({
				title: '请上传图片',
				icon: 'fail'
			})
			return ;
		}
		
		const res = await uni.uploadFile({
			url: DomainName + '/file/upload',
			filePath: tempFile.value,
			name: 'file',
		})
		returnUrl.value = res.data
		
		const response = await uni.request({
			url: DomainName + '/community/publish',
			method: 'POST',
			data: {
				title: title.value,
				content: content.value,
				url: returnUrl.value,
				upvote: 0,
				pls: 0,
				userId: userStore.user.id,
				pubDate: getDate(),
				transfer: 0,
			}
		})
		console.log(response)
		uni.showToast({
			title: '发布成功',
			icon: 'success'
		}) 
		routerJump('Views/community/index/index')
	}
	
	
	const routerJump = (val:any) => {
		let pages = getCurrentPages();
		var num = pages.length
			//当前页面栈总数
		var backnum = num
		
		for( var i = 0; i < num; i ++ ){
				console.log(pages[i].route)
				//循环找到指定页面路由所在的页数
				if(pages[i].route == val){
				//'pages/mypage/mypage'替换成A页面的路由地址
					backnum = num - i - 1
					//计算返回的层数，总数-指定页面页数-1
				}		
			}
			
			uni.navigateBack({
					delta:backnum
					//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
				})
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

textarea{
	height: 570rpx;
	padding: 20rpx;
}
.ml-9 {
  margin-left: 16.88rpx;
}
.page {
  background-color: #ffffff;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group {
  padding: 45rpx 26.25rpx 58.13rpx;
}
.group_2 {
  margin-left: 15.02rpx;
  margin-right: 14.98rpx;
  padding-bottom: 26.25rpx;
  border-bottom: solid 1.88rpx #e5e5e5;
}
.image-wrapper {
  padding: 69.38rpx 0;
  background-color: #f7f7f7;
  border-radius: 18.75rpx;
  width: 196.88rpx;
}
.image {
  width: 58.13rpx;
  height: 58.13rpx;
}
.font {
  font-size: 37.5rpx;
  font-family: Open Sans;
  line-height: 34.24rpx;
}
.section {
  padding: 17.51rpx 0 63.75rpx;
  background-color: #ffffff;
}
.text_3 {
  margin-left: 27.86rpx;
  color: #000000;
}
.equal-division {
  align-self: flex-start;
  margin-left: 41.25rpx;
  margin-top: 43.88rpx;
}
.group_3 {
  width: 585rpx;
}
.section_2 {
  flex: 1 1 183.75rpx;
}
.equal-division-item_1 {
  padding: 16.88rpx 31.88rpx 15rpx;
  background-color: #f6f6f6;
  border-radius: 37.5rpx;
  height: 58.13rpx;
}
.image_2 {
  width: 26.25rpx;
  height: 26.25rpx;
}
.font_2 {
  font-size: 22.5rpx;
  font-family: Open Sans;
  line-height: 20.83rpx;
  color: #a4a4a4;
}
.text_1 {
  line-height: 20.7rpx;
}
.equal-division-item {
  padding: 16.88rpx 31.71rpx 15rpx 31.88rpx;
  background-color: #f6f6f6;
  border-radius: 37.5rpx;
  height: 58.13rpx;
}
.group_4 {
  margin-top: 65.63rpx;
  padding-top: 28.13rpx;
  height: 105rpx;
  border-top: solid 1.88rpx #e5e5e5;
}
.text-wrapper_3 {
  margin-left: 43.13rpx;
  margin-right: 45rpx;
  padding: 24.06rpx 0 21.56rpx;
  background-color: #20d0c5;
  border-radius: 93.75rpx;
}
.text_4 {
  color: #ffffff;
  font-size: 33.75rpx;
  font-family: Open Sans;
  line-height: 31.26rpx;
}
@import url(../component/css/global1.css);
</style>

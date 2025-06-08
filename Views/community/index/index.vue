<template>
	<view class="flex-col page">
	  <view class="flex-row section">
	    <view class="flex-row items-center flex-1 relative section_1">
	      <image
	        class="image"
	        :src="CommunityImgUrl + 'index/search.png'"
	      />
		  <input enableNative="{{false}}" style="width: 3.3rem;" @focus="focus" @blur="blur" type="text" class="font text ml-3" placeholder="我要找..." v-model="contentText"/>
	    </view>
		
		<view class="flex-row items-center shrink-0 section_2 ml-19" style="margin-left: 20rpx;" @click="search">
		  <image
		    class="shrink-0 image_2"
		    :src="CommunityImgUrl + 'index/fs.png'"
		  />
		  <text class="font text_2 ml-2">搜索</text>
		</view>
		
	    <view class="flex-row items-center shrink-0 section_2 ml-19" style="margin-left: 20rpx;" @click="jumpToPublish">
	      <image
	        class="shrink-0 image_2"
	        :src="CommunityImgUrl + 'index/fs.png'"
	      />
	      <text class="font text_2 ml-2">发布</text>
	    </view>
		
	  </view>
	  
	  
	<!--  <view class="search" v-show="isShow">
		  <searchVue></searchVue>
	  </view> -->
	  
	  
	  <view class="flex-col section_3">
	    <view class="flex-col justify-start">
	      <view class="flex-row items-center group_1">
	        <view class="flex-col justify-start items-center text-wrapper" :style="newObj" @click="toNew">
				<text :style="{color: newTextColor}" class="font text_3">最新</text></view>
	        <view class="flex-col justify-start items-center text-wrapper_2" :style="hotObj" @click="toHot">
				<text :style="{color: hotTextColor}" class="font text_4">最热</text></view>
	        <view class="flex-row items-center group" @click="toFirst">
	          <image
	            class="shrink-0 image_3"
	            :src="firstUrl"
	          />
	          <text class="font text_5" :style="{color: firstColor}">绿色出行</text>
	        </view>
	        <view class="flex-row items-center group_2" @click="toSecond">
	          <image
	            class="shrink-0 image_3"
	            :src="secondUrl"
	          />
	          <text class="font text_6" :style="{color: secondColor}">低碳生活</text>
	        </view>
	      </view>
	    </view>
	    <view class="flex-col mt-16">
	      <view class="flex-col list-item mt-25" v-for="(item, index) in publishInfo" :key="index">
	        <view class="flex-row items-center" @click="jumpToComments(item)">
	          <image
	            class="image_4"
	            :src="item.avatar"
	          />
	          <view class="flex-col items-start ml-7">
	            <text class="font_2">{{item.userName}}</text>
	            <text class="font_3 text_1 mt-11">{{(item.pubDate).replace('-', '.').replace('-', '.')}}</text>
	          </view>
	        </view>
	        <view class="flex-col group_3 mt-13" @click="jumpToComments(item)">
	          <text class="self-start font_2 text_7">{{item.title}}</text>
	          <view class="flex-row self-stretch group_10 mt-12">
	            <text class="font_2" style="width:100%;display:inline-block;white-space: pre-wrap; word-wrap: break-word;height: auto; line-height: 0.4rem;">{{item.content}}</text>
	      <!--      <text class="font_2 text_12 ml-4">#绿色出行</text>
	            <text class="font_2 text_9 ml-4">#低碳活动</text> -->
	          </view>
	          <image
				mode="aspectFill"
	            class="self-stretch image_5 mt-12"
	            :src="item.url"
	          />
			  </view>
			
			<view class="group_3">
	          <view class="flex-row justify-between items-center self-stretch group_7 mt-12">
	            <view class="flex-row items-center">
	              <image
	                class="shrink-0 image_7"
	                :src="CommunityImgUrl + 'index/zf.png'"
	              />
	              <text class="font_4 ml-4">{{item.transfer}}</text>
	            </view>
	            <view class="flex-row group_6">
	              <view class="flex-row items-center" @click="upvote(item.id, 0)">
	                <image
	                  class="shrink-0 image_6"
	                  :src="isUpvoteList?.[index]"
	                />
	                <text class="font_4 ml-2">{{item.upvote}}</text>
	              </view>
	              <view class="flex-row items-center ml-22" @click="jump(item)">
	                <image
	                  class="shrink-0 image_6"
	                  :src="CommunityImgUrl + 'index/xx.png'"
	                />
	                <text class="font_4 ml-2">{{item.pls}}</text>
	              </view>
	            </view>
	          </view>
			</view>

			
			
			
	      </view>
	    </view>
	  </view>
	  
	</view>
</template>

<script setup lang="ts">
	import { CommunityImgUrl, DomainName } from '../../../common/global';
	import {onMounted, ref} from 'vue'
	// import searchVue from '../component/search.vue';
	import { onShow } from "@dcloudio/uni-app";
	
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	const isShow = ref(false)
	
	const isNew = ref(true)
	const isHot = ref(false)
	const firTitle = ref(false)
	const secTitle = ref(false)
	const contentText = ref('')
	
	const newObj = ref({})
	const hotObj = ref({})
	
	const newTextColor = ref('#fff')
	const hotTextColor = ref('#000')
	
	const firstColor = ref('#000')
	const secondColor = ref('#000')
	const firstUrl = ref(CommunityImgUrl + 'index/jh2.png')
	const secondUrl = ref(CommunityImgUrl + 'index/jh2.png')
	
	const upvoteState = [CommunityImgUrl + 'index/dz.png', CommunityImgUrl + 'index/dzs.png']

		
	const publishInfo = ref([])
	
	onMounted(() => {
		search()
	})
	
	onShow(() => {
		search()
	})
	
	const toNew = () => {
		isNew.value = true
		isHot.value = false
		newObj.value.backgroundColor = '#20d0c5'
		newTextColor.value = '#fff'
		hotObj.value.backgroundColor = '#e7e6e4'
		hotTextColor.value = '#000'
		search()
	}
	
	const toHot = () => {
		isNew.value = false
		isHot.value = true
		newObj.value.backgroundColor = '#e7e6e4'
		newTextColor.value = '#000'
		hotObj.value.backgroundColor = '#20d0c5'
		hotTextColor.value = '#fff'
		search()
	}
	
	const toFirst = () => {
		firTitle.value = !firTitle.value
		if(firTitle.value){
			firstColor.value = '#20d0c5'
			firstUrl.value = CommunityImgUrl + 'index/jh.png'
		}else{
			firstColor.value = '#000'
			firstUrl.value = CommunityImgUrl + 'index/jh2.png'
		}
		search()
	}
	
	
	const toSecond = () => {
		secTitle.value = !secTitle.value
		if(secTitle.value){
			secondColor.value = '#20d0c5'
			secondUrl.value = CommunityImgUrl + 'index/jh.png'
		}else{
			secondColor.value = '#000'
			secondUrl.value = CommunityImgUrl + 'index/jh2.png'
		}
		search()
	}
	
	const search = async () => {
		const res = await uni.request({
			url: DomainName + '/community/filterPublishRecord',
			method: 'GET',
			data: {
				isNew: isNew.value,
				isHot: isHot.value,
				firTitle: firTitle.value,
				secTitle: secTitle.value,
				contentText: contentText.value
			}
		})
		publishInfo.value = res.data.data
		initAllUpvotes()
	}
	
	
	const upvoteArr = ref([])
	const map = []
	const isUpvoteList = ref([])
	const initAllUpvotes = async () => {
		const res = await uni.request({
			url: DomainName + '/community/queryAllUpvotePublish',
			method: 'GET',
			data: {
				userId: userStore.user.id,
				typeId: 0
			}
		})
		upvoteArr.value = res.data.data
		for (var i = 0; i < upvoteArr.value.length; i ++ ){
			if(upvoteArr.value[i]) map[upvoteArr.value[i]] = 1;
		}
		for (var i = 0; i < publishInfo.value.length; i ++ ){
			if(map[publishInfo.value[i].id]) isUpvoteList.value[i] = upvoteState[1]
			else isUpvoteList.value[i] = upvoteState[0]
		}
	}
	
	
	const upvote = async (upvoteIdVal:any, typeIdVal:any) => {
		const res = await uni.request({
			url: DomainName + '/community/upvoteToCommentsOrPublish',
			method: 'POST',
			data: {
				upvoteId: upvoteIdVal,
				typeId: typeIdVal,
				userId: userStore.user.id
			},
		})
		console.log(res)
		const isUpvoted = res.data.data
		if(isUpvoted) {
			search() 
		}
	}
	
	
	const jump = (item:any) => {
		uni.navigateTo({
			url: '../comments/comments?isFocus=true'+ '&isUpvoted=' + map[item.id] +'&obj=' + JSON.stringify(item)
		})
	}
	
	
	
	const focus = () => {
		isShow.value = true
	}
	
	const blur = () => {
		isShow.value = false
	}
	
	const jumpToPublish = () => {
		if(userStore.user.id == '000000'){
			uni.showToast({
				title: '请先登录',
				icon: 'fail'
			})
			return ;
		}
		uni.navigateTo({
			url: '../publish/publish'
		})
	}
	
	const jumpToComments = (item:any) => {
		uni.navigateTo({
			url: '../comments/comments?isFocus=false'+ '&isUpvoted=' + map[item.id] +'&obj=' + JSON.stringify(item)
		})
	}
</script>

<style lang="scss" scoped>
.search{
	margin-top: 190rpx;
}
input{
	width: 420rpx;
	height: 40rpx;
	background-color: #fff;
}
.ml-3 {
  margin-left: 5.63rpx;
}
.ml-19 {
  margin-left: 35.63rpx;
}
.mt-25 {
  margin-top: 46.88rpx;
}
.ml-7 {
  margin-left: 13.13rpx;
}
.mt-11 {
  margin-top: 20.63rpx;
}
.mt-13 {
  margin-top: 24.38rpx;
}
.page {
  background-color: #ffffff;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.section {
  padding: 86.25rpx 31.88rpx 48.75rpx;
  background-image: linear-gradient(180deg, #fcfdff80 0%, #e7f1fb80 100%);
  backdrop-filter: blur(18.75rpx);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.section_1 {
  padding: 15rpx;
  background-color: #ffffff;
  border-radius: 37.5rpx;
  box-shadow: 0rpx 1.88rpx 5.63rpx 1.88rpx #00000026, 0rpx 1.88rpx 3.75rpx #0000004d;
  height: 58.13rpx;
}
.image {
  width: 30rpx;
  height: 30rpx;
}
.font {
  font-size: 22.5rpx;
  font-family: Open Sans;
  line-height: 22.05rpx;
  color: #000000;
}
.text {
  color: #7b7b7b;
  line-height: 20.77rpx;
}
.section_2 {
  padding: 15rpx 18.08rpx 16.88rpx 18.75rpx;
  background-color: #ffffff;
  border-radius: 37.5rpx;
  box-shadow: 0rpx 1.88rpx 5.63rpx 1.88rpx #00000026, 0rpx 1.88rpx 3.75rpx #0000004d;
  height: 58.13rpx;
}
.image_2 {
  width: 26.25rpx;
  height: 26.25rpx;
}
.text_2 {
  color: #3a5c75;
  line-height: 20.83rpx;
}
.section_3 {
  padding: 41.25rpx 31.88rpx 67.5rpx;
  background-color: #ffffff;
  margin-top: 190rpx;
}
.group_1 {
  padding: 0 3.75rpx;
}
.text-wrapper {
  padding: 16.82rpx 0 16.84rpx;
  background-color: #20d0c5;
  border-radius: 112.5rpx;
  width: 97.5rpx;
  height: 54.38rpx;
}
.text_3 {
  color: #ffffff;
  line-height: 20.72rpx;
}
.text-wrapper_2 {
  margin-left: 30rpx;
  padding: 16.71rpx 0 16.86rpx;
  background-color: #e7e6e4;
  border-radius: 112.5rpx;
  width: 97.5rpx;
  height: 54.38rpx;
}
.text_4 {
  line-height: 20.81rpx;
}
.group {
  margin-left: 39.38rpx;
}
.image_3 {
  width: 33.75rpx;
  height: 33.75rpx;
}
.text_5 {
  color: #20d0c5;
  line-height: 20.83rpx;
}
.group_2 {
  margin-left: 25.48rpx;
}
.text_6 {
  line-height: 20.7rpx;
}
.list-item:first-child {
  margin-top: 0;
}
.image_4 {
  border-radius: 93.75rpx;
  width: 84.38rpx;
  height: 84.38rpx;
}
.font_2 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 24.28rpx;
  color: #000000;
}
.font_3 {
  font-size: 22.5rpx;
  font-family: Open Sans;
  line-height: 16.63rpx;
  color: #7a7a78;
}
.text_1 {
  margin-left: 2.01rpx;
}
.group_3 {
  padding-left: 97.5rpx;
  padding-right: 48.75rpx;
}
.text_7 {
  line-height: 24.21rpx;
}
.group_10 {
  padding: 0 2.53rpx;
}
.text_12 {
  line-height: 24.3rpx;
}
.text_9 {
  line-height: 24.15rpx;
}
.image_5 {
  border-radius: 18.75rpx;
  width: 540rpx;
}
.group_7 {
  padding: 0 11.27rpx;
}
.image_7 {
  width: 37.5rpx;
  height: 37.5rpx;
}
.font_4 {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 22.05rpx;
  color: #bfbfbf;
}
.group_6 {
  margin-right: 7.84rpx;
}
.image_6 {
  width: 43.13rpx;
  height: 43.13rpx;
}
@import url(../component/css/global1.css);
</style>

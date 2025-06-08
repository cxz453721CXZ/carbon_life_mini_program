<template>
	<view class="flex-col page">
	  <view class="flex-row justify-center items-center section">
	    <image
	      class="image"
	      :src="detailObj.avatar"
	    />
	    <text class="text ml-13">{{detailObj.userName}}</text>
	  </view>
	  <view class="flex-col group">
	    <image
		  mode="widthFix"
	      class="image_2"
	      :src="detailObj.url"
	    />
	    <view class="flex-col group_2">
	      <text class="self-start text_2">{{detailObj.title}}</text>
	      <view class="flex-col self-stretch group_3 mt-20">
	        <view class="flex-row self-stretch" style="width: 675rpx;">
	          <text class="font text_3" style="width:105%;display:inline-block;white-space: pre-wrap; word-wrap: break-word;height: auto; line-height: 0.4rem;">{{detailObj.content}}</text>
	<!--          <text class="font text_4 ml-2">#绿色出行</text>
	          <text class="font text_5 ml-2">#低碳生活</text> -->
	        </view>
	        <text class="self-start font_2 text_6 mt-15">{{(detailObj.pubDate).replace('-', '.').replace('-', '.')}}</text>
	      </view>
	      <view class="self-stretch divider mt-20"></view>
	      <view class="flex-row items-baseline self-stretch mt-20">
	        <text class="font_3 text_7">共</text>
	        <text class="font_2 text_8 ml-2">{{AllCommentsCnt}}</text>
	        <text class="font_3 text_9 ml-2">条评论</text>
	      </view>
	      <view class="flex-col self-stretch mt-20" style="margin-left: 30rpx;">
	        <view class="flex-col list-item_1 group_26" v-for="(item, index) in firstComments" :key="index">
	          <view class="flex-col">
	            <view class="flex-row">
	              <image
	                class="image_3"
	                :src="item.avatar"
	              />
	              <view class="flex-col items-start flex-1 group_16 ml-11">
	                <text class="font_4">{{item.userName}}</text>
	                <text class="font_5 text_26 mt-13" style="width:531rpx;display:inline-block;white-space: pre-wrap; word-wrap: break-word;height: auto; line-height: 0.4rem;">{{item.plContent}}</text>
	              </view>
	            </view>
	            <view class="flex-row items-baseline group_5">
	              <text class="font_6">{{(item.plDate).replace('-', '.').replace('-', '.').slice(5)}}</text>
	              <text class="font_7 text_11 ml-4">{{item.ipAddress}}</text>
	            </view>
	            <view class="flex-row group_6 view_3">
	              <view class="flex-row items-center" @click="upvote(item.fid, 1)">
	                <image
	                  class="shrink-0 image_4"
	                  :src="isUpvoteList?.[index]"
	                />
	                <text class="font_2 ml-2">{{item.upvote}}</text>
	              </view>
	              <view class="flex-row items-center ml-23" @click="setMessage(item.fid, item.userName)">
	                <image
	                  class="shrink-0 image_4"
	                  :src="CommunityImgUrl + 'comments/xx.png'"
	                />
	                <text class="font_2 ml-3">{{item.pls}}</text>
	              </view>
	            </view>
	          </view>
	          <view class="flex-col group_26">
	            <view class="flex-col list-item group_26" v-for="(it, idx) in item.secondCommentsDetails" :key="idx">
	              <view class="flex-col group_27">
	                <view class="flex-row">
	                  <image
	                    class="image_5"
	                    :src="it.avatar"
	                  />
	                  <text class="self-start font_4 text_20 ml-7">{{it.userName}}</text>
	                </view>
	                <view class="flex-row group_8">
					  <text class="font_5 text_21">回复</text>
	                  <text class="font_8 text_22">{{it.receiver}}：</text>
	                  <text class="font_5 text_15" style="margin-left: -1.9rem;width:450rpx;display:inline-block;white-space: pre-wrap; word-wrap: break-word;height: auto; line-height: 0.4rem;">\n{{it.plContent}}</text>
	                </view>
	              </view>
	              <view class="flex-row items-baseline group_11">
	                <text class="font_6 text_16">{{(it.plDate).replace('-', '.').replace('-', '.').slice(5)}}</text>
	                <text class="font_7 text_19 ml-5">{{it.ipAddress}}</text>
	              </view>
	              <view class="flex-row items-center group_12" @click="setSecondMessage(item.fid, it.sid, it.userName)">
	                <image
	                  class="image_4 image_6"
	                  :src="CommunityImgUrl + 'comments/xx2.png'"
	                />
	                <text class="font_2 ml-3">{{it.pls}}</text>
	              </view>
	            </view>
	          </view>
	        </view>
	      </view>
	    </view>
	    <view class="divider_2"></view>
	  </view>
	  <view class="flex-row justify-between items-center section_2" :style="styObj">
	    <view class="flex-col justify-start items-start button" :style="btnObj">
			<input enableNative="{{false}}" :focus="isFocus" @focus="focus" @blur="blur" type="text" class="font_5 text_36" placeholder="说点什么吧..." :style="inputObj" v-model="plContent"/>
		</view>
		
	    <view class="flex-row button_2" v-show="isShow">
	      <view class="flex-row items-center" @click="upvote(detailObj.id, 0)">
	        <image
	          class="shrink-0 image_12"
	          :src="upvoteSytle"
	        />
	        <text class="font_9 ml-2">{{upvoteCnt}}</text>
	      </view>
	      <view class="flex-row items-center ml-20" @click="isFocus = true">
	        <image
	          class="shrink-0 image_12"
	          :src="CommunityImgUrl + 'comments/xx3.png'"
	        />
	        <text class="font_9 ml-2">{{AllCommentsCnt}}</text>
	      </view>
	      <view class="flex-row items-center group_23 ml-20">
	        <image
	          class="shrink-0 image_13"
	          :src="CommunityImgUrl + 'comments/zf.png'"
	        />
	        <text class="font_9 ml-4">{{detailObj.transfer}}</text>
	      </view>
	    </view>
		
		<view class="submit flex-row button_2" v-show="!isShow" @click="send">发送</view>
		
	  </view>
	</view>
</template>

<script setup lang="ts">
	import { CommunityImgUrl, DomainName } from '../../../common/global';
	import {onMounted, ref} from 'vue'
	import { onLoad } from "@dcloudio/uni-app";
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	
	const styObj = ref({})
	const inputObj = ref({})
	const btnObj = ref({})
	const isShow = ref(true)
	const isFocus = ref(false)
	
	const firstComments = ref([])
	
	const detailObj = ref({})
	
	const fid = ref(-1)
	const sid = ref(-1)
	const receiver = ref('')
	
	const AllCommentsCnt = ref(0)
	
	const upvoteState = [CommunityImgUrl + 'index/dz.png', CommunityImgUrl + 'index/dzs.png']
	const upvoteSytle = ref('')
	const isUpvoted = ref('')
	const upvoteCnt = ref(0)
	
	
	
	onLoad((options) => {
		console.log(options)
		const temp = JSON.parse(options.isFocus)
		isUpvoted.value = options.isUpvoted
		if(isUpvoted.value == '1') upvoteSytle.value = upvoteState[1]
		else upvoteSytle.value = upvoteState[0]
		
		if(temp) {
			focus()
		}
		detailObj.value = JSON.parse(options.obj)
		upvoteCnt.value = detailObj.value.upvote
		AllCommentsCnt.value = detailObj.value.pls
	})
	
	
	const upvote = async (upvoteIdVal:any, typeIdVal:any) => {
		if(typeIdVal == 0){
			if(isUpvoted.value == '1') return ;
		}else{
			if(map[upvoteIdVal] == 1) return ;  
		}
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
		if(typeIdVal == 0){
			upvoteSytle.value = upvoteState[1]
			upvoteCnt.value ++
		}else{
			deal()
		}
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
				typeId: 1
			}
		})
		upvoteArr.value = res.data.data
		for (var i = 0; i < upvoteArr.value.length; i ++ ){
			if(upvoteArr.value[i]) map[upvoteArr.value[i]] = 1;
		}
		for (var i = 0; i < firstComments.value.length; i ++ ){
			if(map[firstComments.value[i].fid]) isUpvoteList.value[i] = upvoteState[1]
			else isUpvoteList.value[i] = upvoteState[0]
		}
		console.log(isUpvoteList.value)
	}
	
	
	const deal = async () => {
		const res = await uni.request({
			url: DomainName + '/community/selectFirstCommentsByPubId',
			method: 'GET',
			data: {
				pubId: detailObj.value.id
			}
		})
		console.log(res.data.data)
		firstComments.value = res.data.data
		dealCommentsCnt()
		initAllUpvotes()
	}
	
	onMounted( async () => {
		deal()
	})
	
	const dealCommentsCnt = () => {
		var cnt = 0
		for (var i = 0; i < firstComments.value.length; i ++ ){
			cnt += firstComments.value[i].secondCommentsDetails.length
		}
		cnt += firstComments.value.length
		AllCommentsCnt.value = cnt
		console.log(AllCommentsCnt.value)
	}
	
	const blur = () => {
		// styObj.value.paddingBottom = '58.75rpx'
		btnObj.value.width = '316.88rpx'
		inputObj.value.width = '240rpx'
		isShow.value = true 
		isFocus.value = false
	}
	
	const focus = () => {
		// styObj.value.paddingBottom = '650rpx'
		inputObj.value.color = '#000'
		inputObj.value.width = '420rpx'
		btnObj.value.width = '496.88rpx'
		isShow.value = false
	}
	
	const setMessage = (val1:any, val2:any) => {
		isFocus.value = true
		fid.value = val1
		receiver.value = val2
	}
	
	const setSecondMessage = (val1:any, val2:any, val3:any) => {
		isFocus.value = true
		fid.value = val1
		sid.value = val2
		receiver.value = val3
	}
	 
	const plContent = ref('')
	
	const send = async () => {

			if(userStore.user.id == '000000'){
				uni.showToast({
					title: '请先登录',
					icon: 'fail'
				})
				return ;
			}
			const tempContent = plContent.value
			plContent.value = ''
			if(tempContent == ''){
				uni.showToast({
					title: '请输入内容'
				})
				return;
			}
		if(fid.value == -1){
			const res = await uni.request({
				url: DomainName + '/community/publishFirstComments',
				method: 'POST',
				data: {
					plContent: tempContent,
					ipAddress: '未知',
					plDate: getDate(),
					upvote: 0,
					pls: 0,
					pubId: detailObj.value.id,
					userId: userStore.user.id
				}
			})
			console.log(res)
		}else if(fid.value != -1 && sid.value == -1){
			const res = await uni.request({
				url: DomainName + '/community/publishSecondComments',
				method: 'POST',
				data: {
					plContent: tempContent,
					pls: 0,
					ipAddress: '未知',
					fid: fid.value,
					receiver: receiver.value,
					userId: userStore.user.id,
					plDate: getDate()
				}
			})
			console.log(res)
			fid.value = -1
			receiver.value = ''
		}else{
			const tempObj = {
						plContent: tempContent,
						pls: 0,
						ipAddress: '未知',
						fid: fid.value,
						receiver: receiver.value,
						userId: userStore.user.id,
						plDate: getDate()
					}
			const res = await uni.request({
				url: DomainName + '/community/answerSecondComments?sid=' + sid.value,
				method: 'POST',
				data: JSON.stringify(tempObj)
			})
			console.log(res)
			fid.value = -1
			sid.value = -1
			receiver.value = ''
		}
		deal()
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
.submit{
	width: 120rpx;
	height: 71.25rpx;
	background-color: #20D0C5;
	border-radius: 50rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 26.25rpx;
}
input{
	margin-top: 7.9rpx;
	background-color: #f4f8f9;
	width: 240rpx;
}
.ml-13 {
  margin-left: 24.38rpx;
}
.mt-15 {
  margin-top: 28.13rpx;
}
.ml-11 {
  margin-left: 20.63rpx;
}
.mt-13 {
  margin-top: 24.38rpx;
}
.ml-23 {
  margin-left: 43.13rpx;
}
.ml-3 {
  margin-left: 5.63rpx;
}
.ml-7 {
  margin-left: 13.13rpx;
}
.ml-5 {
  margin-left: 9.38rpx;
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
  padding: 20.63rpx 0;
  background-image: linear-gradient(180deg, #fcfdff 0%, #e7f1fb 100%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.image {
  border-radius: 93.75rpx;
  width: 88.13rpx;
  height: 88.13rpx;
}
.text {
  color: #000000;
  font-size: 33.75rpx;
  font-family: Open Sans;
  line-height: 31.22rpx;
}
.group {
  padding: 31.88rpx 16.88rpx 0;
  margin: 130rpx auto 160rpx;
}
.image_2 { 
  margin-left: 46.88rpx;
  margin-right: 48.77rpx;
  width: 620.63rpx;
  // height: 802.5rpx;
}
.group_2 {
  margin-top: 58.54rpx;
}
.text_2 {
  margin-left: 2.44rpx;
  color: #000000;
  font-size: 37.5rpx;
  font-family: Open Sans;
  line-height: 34.54rpx;
}
.group_3 {
  padding: 0 2.63rpx;
}
.font {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.69rpx;
  color: #6a6a6a;
}
.text_3 {
  line-height: 27.75rpx;
}
.text_4 {
  line-height: 27.79rpx;
}
.text_5 {
  line-height: 27.6rpx;
}
.font_2 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 19.29rpx;
  color: #bfbfbf;
}
.text_6 {
  color: #b7b7b7;
  line-height: 19.39rpx;
}
.divider {
  background-color: #f0f0f0;
  height: 1.88rpx;
}
.font_3 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 24.23rpx;
  color: #929292;
}
.text_7 {
  font-size: 28.13rpx;
  line-height: 25.65rpx;
}
.text_8 {
  color: #929292;
  font-size: 28.13rpx;
  line-height: 20.36rpx;
}
.text_9 {
  font-size: 28.13rpx;
  line-height: 25.91rpx;
}
.list-item_1:first-child {
  margin-top: 0;
}
.image_3 {
  border-radius: 93.75rpx;
  width: 82.5rpx;
  height: 82.5rpx;
}
.group_16 {
  margin-top: 6.67rpx;
}
.font_4 {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.69rpx;
  color: #000000;
}
.font_5 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 24.23rpx;
  color: #656565;
}
.text_26 {
  line-height: 24.82rpx;
}
.group_5 {
  margin-top: 23.31rpx;
  padding: 0 108rpx;
}
.font_6 {
  font-size: 22.5rpx;
  font-family: Open Sans;
  line-height: 16.54rpx;
  color: #b9b9b9;
}
.font_7 {
  font-size: 22.5rpx;
  font-family: Open Sans;
  line-height: 19.29rpx;
  color: #b9b9b9;
}
.text_11 {
  line-height: 20.68rpx;
}
.group_6 {
  padding: 0 106.88rpx;
}
.view_3 {
  margin-top: 13.2rpx;
}
.image_4 {
  width: 33.75rpx;
  height: 33.75rpx;
}
.list-item:first-child {
  margin-top: 0;
}
.group_27 {
  padding: 0 105rpx;
}
.image_5 {
  border-radius: 93.75rpx;
  width: 63.75rpx;
  height: 63.75rpx;
}
.text_20 {
  margin-top: 6.67rpx;
}
.group_8 {
  padding: 0 79.03rpx;
}
.text_21 {
  line-height: 24.34rpx;
}
.font_8 {
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 24.23rpx;
  color: #000000;
}
.text_22 {
  margin-left: 4.2rpx;
}
.text_15 {
  margin-left: -8.74rpx;
}
.group_11 {
  margin-top: 23.89rpx;
}
.text_16 {
  margin-left: 184.88rpx;
}
.text_19 {
  line-height: 20.68rpx;
}
.group_12 {
  margin-top: 13.2rpx;
}
.image_6 {
  margin-left: 183.75rpx;
}
.group_26 {
  margin-top: 30rpx;
}
.divider_2 {
  margin-right: 3.77rpx;
  margin-top: 71.25rpx;
  background-color: #d7d7d7;
}
.section_2 {
  padding: 24.38rpx 41.25rpx 38.75rpx;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto; 
  border-top: 1.88rpx solid #D9D9D9;
}
.button {
  // padding: 24.82rpx 0 22.26rpx;
  background-color: #f4f8f9;
  border-radius: 93.75rpx;
  width: 316.88rpx;
  height: 71.25rpx;
}
.text_36 {
  margin-left: 31.16rpx;
  color: #c3cad0;
  line-height: 24.17rpx;
}
.button_2 {
  margin-right: 15.36rpx;
}
.image_12 {
  width: 43.13rpx;
  height: 43.13rpx;
}
.font_9 {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 22.05rpx;
  color: #bfbfbf;
}
.group_23 {
  margin-top: -3.75rpx;
}
.image_13 {
  width: 37.5rpx;
  height: 37.5rpx;
}
@import url(../component/css/global1.css);
</style>

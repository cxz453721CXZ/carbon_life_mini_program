<template>
	<view class="flex-col page">
	<scroll-view class="scroll-view" scroll-y :style="obj">
	  <view class="flex-col justify-start items-center relative group">
	    <image
	      class="image" 
	      :src="KnowledgeChallengeImgUrl + 'answerGain/background.png'"
	    />
	    <image 
	      class="image_2 pos" 
	      :src="KnowledgeChallengeImgUrl + 'answerGain/logo.png'"
	    />  
	    <view class="flex-col section pos_2">
	      <view class="flex-row justify-between items-center">
	        <view class="flex-row items-center">
	          <view class="shrink-0 section_2"></view>
	          <text class="text_2 ml-9">单选</text>
	        </view>
	        <view class="flex-row items-baseline group_2">
	          <text class="font text">{{q[idx].qid}}</text>
	          <text class="font_2 text_3 ml-5">/5</text>
	        </view>
	      </view>
	      <text class="font_3 text_4" style="line-height: 40rpx;">{{q[idx].title}}</text>
	      <view class="flex-col group_3">
	        <view class="flex-row items-center section_1 list-item mt-14" @click="transfer(index)" v-for="(item, index) in q[idx].options" :key="index" 
			:style="{backgroundImage: item.bgc}">
	          <text class="font_2 text_5"></text>
	          <text class="font_3 text_6 ml-3"
			  style="width:90%;display:inline-block;white-space: pre-wrap; word-wrap: break-word;height: auto; line-height: 40rpx;"
			  >{{item.text}}</text>
			  
			  <image src="./images/dg.png" style="height: 38rpx; width: 38rpx;" v-if="trueShow[index]"></image>
			  <image src="./images/cha.png" style="height: 38rpx; width: 38rpx;" v-if="falseShow[index]"></image>
			  
	        </view>
	      </view> 
		   
	      <view class="flex-col group_4" v-show="isShow">
	        <view class="flex-row items-center self-stretch group_5">
	          <text class="font_3 text_10">正确答案：</text>
	          <text class="text_11">{{questions[idx].correctResponse}}</text>
	        </view>
	        <text class="self-start font_3 text_12 mt-16" style="line-height: 50rpx;">{{questions[idx].anwerDescription}}</text>
	      </view> 
		   
	    </view>
	  </view>
	  <view class="flex-row justify-between section_4 mt-86">
	    <view class="flex-col justify-start items-center text-wrapper" @click="front"><text class="font text_13">上一题</text></view>
	    <view class="flex-col justify-start items-center text-wrapper_2" @click="next" :style="{opacity: opacity}"><text class="font text_14">{{btnText}}</text></view>
	  </view>
	  </scroll-view>
	</view>
	
	<uni-popup ref="answer" type="dialog" :is-mask-click="false">
						<view class="pop">
							<dtPopVue :ansArr="ansArr" :typeId="typeId"></dtPopVue>
						</view>
	</uni-popup>
</template>

<script setup lang="ts">
	import { DomainName, KnowledgeChallengeImgUrl } from '../../../common/global';
	import {onMounted, ref} from 'vue'
	import dtPopVue from '../component/dtPop.vue';
	import emitter from '../../../utils/emitter';
	
	import {array, newArray, othArray} from './my.js'
	import {questions} from './question.js'
	
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	import { onLoad } from "@dcloudio/uni-app";
	
	const answer = ref(null)
	const items = ref([null, null, null, null])
	const isShow = ref(false)
	const obj = ref({height: '100%'})
	
	const q = ref(questions)
	const offset = ref(40)
	
	const btnText = ref('确定')
	
	const opacity = ref(0.3)
	
	const trueShow = ref([false, false, false, false])
	const falseShow = ref([false, false, false, false])
	
	const back = ['', 'linear-gradient(81.7deg, #a5fdef4d -21.1%, #82d5fb4d 107%)', 'linear-gradient(90deg, #c8f7e5 0%, #c8f7e5 100%)', 'linear-gradient(90deg, #ffebea 0%, #ffebea 100%)']
	
	
	
	const flag = ref(false)
	
	
	const toDayAnswerCnt = ref(0)
	const totalArr = ref([])
	
	const typeId = ref(0)
	
	const restrictCnt = ref(0)
	
	onLoad((options) => {
		typeId.value = options.id
		if(typeId.value == 0) restrictCnt.value = 2
		else restrictCnt.value = 1
	})
	
	
	onMounted(async () => {
		// console.log(q.value[idx.value].options)
		const res = await uni.request({
			url: DomainName + '/knowledge/answerDayTimes',
			method: 'GET',
			data: {
				userId: userStore.user.id,
				answerDate: getDate(),
				typeId: typeId.value,
			}
		})
		
		toDayAnswerCnt.value = res.data.data
		if(typeId.value == 0){
			if(toDayAnswerCnt.value == 0){
				totalArr.value = array
			}else{
				totalArr.value = newArray
			}			
		}else{
			totalArr.value = JSON.parse(JSON.stringify(othArray))
		}
		
		init()
		
	})
	
	const correctCnt = ref(0)
	 
	 
	const init = () => {
		flag.value = totalArr.value[idx.value].flag
		btnText.value = totalArr.value[idx.value].btnText
		trueShow.value = totalArr.value[idx.value].trueShow
		falseShow.value = totalArr.value[idx.value].falseShow
		isShow.value = totalArr.value[idx.value].isShow
		obj.value.height = totalArr.value[idx.value].height 
		obj.value.paddingBottom = totalArr.value[idx.value].paddingBottom
		opacity.value = totalArr.value[idx.value].opacity
		for (var i = 0; i < 4; i ++ ){
			questions[idx.value].options[i].isSelected = false
			questions[idx.value].options[i].bgc = totalArr.value[idx.value].bgc[i]
		}
		
	}
	 
	
	const save = () => {
		totalArr.value[idx.value].flag = flag.value
		totalArr.value[idx.value].btnText = btnText.value,
		totalArr.value[idx.value].trueShow = trueShow.value
		totalArr.value[idx.value].falseShow = falseShow.value
		totalArr.value[idx.value].isShow = isShow.value
		totalArr.value[idx.value].height = obj.value.height
		totalArr.value[idx.value].paddingBottom = obj.value.paddingBottom
		totalArr.value[idx.value].opacity = opacity.value
		for (var i = 0; i < 4; i ++ ){
			totalArr.value[idx.value].bgc[i] = questions[idx.value].options[i].bgc
		}
	}
	
	const ansArr = ref([])
	
	const next = async () => {
		
		if(toDayAnswerCnt.value >= restrictCnt.value && idx.value == 4){
			uni.showToast({
				title: '今日答题次数已上限',
				icon: 'exception',
			})
			return ;
		}
		
		if(idx.value == 4 && flag.value){
			const res = await uni.request({
				url: DomainName + '/knowledge/submitAnswerRecord',
				method: 'POST',
				data: {
					answerDate: getDate(),
					correctCnt: correctCnt.value,
					typeId: typeId.value,
					userId: userStore.user.id
				}
			})
			
			const res2 = await uni.request({
				url: DomainName + '/knowledge/answerCorrectCnt',
				method: 'GET',
				data: {
					answerDate: getDate(),
					userId: userStore.user.id
				}
			})
			
			ansArr.value = res2.data.data
			
			
			ansOpen()
			emitter.on('ansClose', () => {
				ansClose()
			})
			return ;
		}
		
		if(flag.value){
			if(idx.value < 4){
				idx.value ++
				init()
			} 
			return ;
		} 
		if(opacity.value == 0.3) return ;
		btnText.value = '下一题'
		if(idx.value == 4 && !flag.value){
			btnText.value = '完成'
		}
		var temp = 0;
		for (var i = 0; i < 4; i ++ ){
			if(q.value[idx.value].options[i].isSelected) temp = i
		}
		var zq = q.value[idx.value].zq
		// console.log(zq, temp)
		if(temp == zq){
			correctCnt.value ++
			q.value[idx.value].options[temp].bgc = back[2]
			trueShow.value[temp] = true
		}else{
			q.value[idx.value].options[temp].bgc = back[3]
			falseShow.value[temp] = true
		}
		dealAnswer()
		flag.value = true 
		save()
	}
	 
	const front = () => {
		if(idx.value > 0) {
			idx.value --
			init()
		}
	}
	
	
	const transfer = (val:any) => {
		if(flag.value) return ;
		if(!q.value[idx.value].options[val].isSelected){
			opacity.value = 1 
			q.value[idx.value].options[val].isSelected = true
			q.value[idx.value].options[val].bgc = back[1]
			for (var i = 0; i < 4; i ++ ){
				if(i != val){
					q.value[idx.value].options[i].isSelected = false
					q.value[idx.value].options[i].bgc = back[0]			
				}
			}
		}else{
			opacity.value = 0.3
			q.value[idx.value].options[val].isSelected = false
			q.value[idx.value].options[val].bgc = back[0]
		}
	}
	
	
	const dealAnswer = () => {
		isShow.value = !isShow.value
		if(isShow.value){
			obj.value.height = '1308rpx'
			var temp1 = questions[idx.value].anwerDescription.length
			var temp2 = questions[idx.value].title.length 
			var temp3 = 0
			for (var i = 0; i < 4; i ++ ){
				var k = (questions[idx.value].options[i].text.length) / 18
				if(k >= 1) temp3 += k 
			}
			if(temp1 / 20 >= 1) temp1 = temp1 / 20 * 50
			if(temp2 / 18 >= 1) temp2 = temp2 / 18 * 40
			if(temp3 == 0) temp3 = 2;
			temp3 = temp3 * 40
			// console.log(temp3)
			obj.value.paddingBottom = temp1 + temp2 + temp3 + 50 + 'rpx'
		}else{
			obj.value.height = '100%'
			obj.value.paddingBottom = '40rpx'
		}
	}
	
	const idx = ref(0)
	
	const ansOpen = () => {
		answer.value.open()
	}
	
	const ansClose = () => {
		answer.value.close()
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
.pop {
		height: 700rpx;
	}
.scroll-view{
	height: 1308rpx;
	padding-bottom: 40rpx;
	box-sizing: border-box;
}
.ml-9 {
  margin-left: 16.88rpx;
}
.ml-5 {
  margin-left: 9.38rpx;
}
.ml-3 {
  margin-left: 5.63rpx;
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
  padding-bottom: 624.38rpx;
}
.image {
  width: 100vw;
  height: 93.75vw;
}
.image_2 {
  width: 473rpx;
  height: 353rpx;
}
.pos {
  position: absolute;
  left: 50%;
  top: 11.25rpx;
  transform: translateX(-50%);
}
.section {
  padding: 83.85rpx 31.88rpx 70.41rpx;
  background-color: #ffffff;
  border-radius: 18.75rpx;
  box-shadow: 0rpx 7.5rpx 7.5rpx #00000040;
}
.pos_2 {
  position: absolute;
  left: 35.63rpx;
  right: 33.77rpx;
  top: 384.38rpx;
}
.section_2 {
  background-color: #04c398;
  width: 7.5rpx;
  height: 31.88rpx;
}
.text_2 {
  color: #000000;
  font-size: 26.25rpx;
  font-family: Open Sans;
  line-height: 24.04rpx;
}
.group_2 {
  margin-right: 15.67rpx;
}
.font {
  font-size: 37.5rpx;
  font-family: Open Sans;
  line-height: 33.86rpx;
}
.text {
  color: #04c398;
  line-height: 26.77rpx;
}
.font_2 {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 21.83rpx;
  color: #000000;
}
.text_3 {
  color: #656565;
  line-height: 21.71rpx;
}
.font_3 {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.9rpx;
  color: #000000;
}
.text_4 {
  margin-left: 3.07rpx;
  margin-top: 68.4rpx;
  line-height: 28.56rpx;
}
.group_3 {
  margin-top: 92.42rpx;
}
.section_1 {
  padding: 31.11rpx 20.32rpx 29.46rpx;
  background-color: #f2f9fa;
  border-radius: 9.38rpx;
}
.list-item:first-child {
  margin-top: 0;
}
.text_5 {
  line-height: 21.92rpx;
}
.text_6 {
  line-height: 27.56rpx;
}
.group_4 {
  margin-top: 49.16rpx;
}
.group_5 {
  padding: 0 3.19rpx;
}
.text_10 {
  font-weight: 700;
  line-height: 28.65rpx;
}
.text_11 {
  color: #27ac6c;
  font-size: 30rpx;
  font-family: Times New Roman;
  font-weight: 700;
  line-height: 20.77rpx;
}
.text_12 {
  color: #656565;
  line-height: 28.14rpx;
}
.section_4 {
  padding: 22.37rpx 46.88rpx 24.51rpx;
  background-color: #ffffff;
  border-top: solid 1.88rpx #e4e4e4;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.text-wrapper {
  padding: 30.94rpx 0 27.07rpx;
  background-color: #f1f8f9;
  border-radius: 93.75rpx;
  width: 294.38rpx;
  height: 91.88rpx;
}
.text_13 {
  color: #656565;
}
.text-wrapper_2 {
  padding: 31.99rpx 0 27.04rpx;
  background-color: #00ba9c;
  border-radius: 93.75rpx;
  width: 294.38rpx;
  height: 91.88rpx;
}
.text_14 {
  color: #ffffff;
  line-height: 32.85rpx;
}
@import url("../component/css/global1.css");
</style>

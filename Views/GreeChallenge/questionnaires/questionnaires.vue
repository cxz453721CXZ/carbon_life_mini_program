<template>
	<view class="flex-col page">
	  <view class="flex-col">
	    <text class="self-start text">社区居民低碳行为参与度调查</text>
		
	  </view>
	  <view class="flex-col group">
	    <view class="flex-col list-item_3" v-for="(item, index) in singleData" :key="index">
	      <text class="self-start font text_6" style="line-height: 50rpx;">{{item.qid}} {{item.title}}</text>
	      <view class="flex-col self-stretch section_2 mt-22">
			  
			<radio-group @change="onchange($event, index)">
				
	        <view class="flex-row items-center" :class="idx != 0 ? 'mt-27' : ''" v-for="(it, idx) in item.options">
	          <view class="section checkbox">
				  <radio color="#0BBA81" :value="it.value"></radio>
			  </view>
	          <text class="font text_11 ml-11 zdy" style="width:80%;display:inline-block;white-space: pre-wrap; word-wrap: break-word;height: auto;">{{it.text}}</text>
	        </view>	
			</radio-group>
	      </view>
	    </view>
		
	<view class="flex-col list-item_3" v-for="(item, index) in checkBoxData" :key="index">
			  <text class="self-start font text_6" style="line-height: 50rpx;">{{item.qid}} {{item.title}}</text>
			  <view class="flex-col self-stretch section_2 mt-22">
				  
				<checkbox-group @change="checkBoxChange($event, index)">
					
				<view class="flex-row items-center" :class="idx != 0 ? 'mt-27' : ''" v-for="(it, idx) in item.options">
				  <view class="section checkbox">
					  <checkbox color="#0BBA81" :value="it.value"></checkbox>
				  </view>
				  <text class="font text_11 ml-11 zdy" style="width:80%;display:inline-block;white-space: pre-wrap; word-wrap: break-word;height: auto;">{{it.text}}</text>
				</view>	
				</checkbox-group>
			  </view>
			</view>
		
	  </view>
	  <text class="font text_14">03、目前对于碳索生活平台的建议，请提出您宝贵的意见：</text>
	  <textarea class="text-wrapper" placeholder="请输入您的宝贵意见" v-model="advice"></textarea>
	  <view class="flex-col justify-start items-center text-wrapper_2" @click="submit"><text class="text_16">提交并获得碳积分</text></view>
	</view>
	
	<uni-popup ref="question" type="dialog" :is-mask-click="false">
						<view class="pop">
							<questionPopVue></questionPopVue>
						</view>
	</uni-popup>
</template>

<script setup lang="ts">
	import { DomainName, KnowledgeChallengeImgUrl } from '../../../common/global';
	import {onMounted, ref} from 'vue'
	import questionPopVue from '../component/questionPop.vue';
	import emitter from '@/utils/emitter'
	
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	import { onLoad } from "@dcloudio/uni-app";
	 
	import { singleData } from './question';
	import { checkBoxData } from './question';
	
	const typeId = ref(0)
	
	onLoad((options) => {
		typeId.value = options.id
	})
	
	const items = ref([null, null, null, null, null])
	const items_1 = ref([null, null, null, null, null])
	const advice = ref('')
	
	const singleAnswer = ref([])
	const checkBoxAnswer = ref([])
	
	const question = ref(null)
	const questionOpen = () => {
		question.value.open()
	}
	
	const questionClose = () => {
		question.value.close()
	}
	
	
	const submit = async () => {
		
		const temp = []
		var total = []
		checkBoxAnswer.value.map((item, index) => {
			var tempStr = ''
			item.forEach(it => {
				tempStr += it
			})
			temp[index] = tempStr
		})
		total = singleAnswer.value.concat(temp)
		const answer = total.join(',')
		console.log(answer)
		var cnt = 0;
		for (var i = 0; i < total.length; i ++ ){
			if(total[i] != '') cnt ++
		}
		if(cnt < 10) {
			uni.showToast({
				title: '请答完所有题'
			})
		}else{
			const res = await uni.request({
				url: DomainName + '/knowledge/submitQuestion',
				method: 'POST',
				data:{
					answer: answer,
					advice: advice.value,
					typeId: typeId.value,
					userId: userStore.user.id,
					submitDate: getDate()
				}
			})
			console.log(res)
			if(typeId.value == 1) emitter.emit('endDeal1')
			else emitter.emit('endDeal2')
			
			
			questionOpen()
			emitter.on('questionClose', () => {
				questionClose()
			})
			
			
		}
	}
	
	
	const onchange = (e, val) => {
		singleAnswer.value[val] = e.detail.value
		console.log(singleAnswer.value)
	}
	
	const checkBoxChange = (e, val) => {
		checkBoxAnswer.value[val] = e.detail.value
		console.log(checkBoxAnswer.value)
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
.zdy{

}
.pop {
		height: 500rpx;
	}
.rd{
	text{
		margin-right: -40rpx;
	}
}
checkbox{
	background-color: #fff;
}
.mt-27 {
  margin-top: 50.63rpx;
}
.ml-11 {
  margin-left: 20.63rpx;
}
.page {
  padding: 85.91rpx 33.71rpx 41.25rpx 33.71rpx;
  background-color: #ffffff;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.text {
  color: #000000;
  font-size: 45rpx;
  font-family: Open Sans;
  line-height: 41.72rpx;
}
.list {
  padding: 0 3.13rpx;
}
.list-item {
  padding: 63.84rpx 0 14.96rpx;
  border-bottom: solid 1.88rpx #cacac8;
}
.font {
  font-size: 30rpx;
  font-family: Open Sans;
  line-height: 27.75rpx;
  color: #000000;
}
.grid {
  width: 497.02rpx;
  height: 146.29rpx;
}
.grid-item_1 {
  padding: 23.46rpx 2.53rpx 21.88rpx;
  width: 226.58rpx;
}
.pos_1 {
  position: absolute;
  left: 0;
  top: 0;
}
.section {
  background-color: #ffffff;
  width: 51.88rpx;
  height: 51.88rpx;
  radio, checkbox{
	  display: block;
	  margin: 3.58rpx auto;
  }
}
.checkbox{
	background-color: #F9F9F7;
}
.pos {
  position: absolute;
  left: 2.53rpx;
  top: 50%;
  transform: translateY(-50%);
}
.text_2 {
  line-height: 27.81rpx;
}
.grid-item {
  padding: 23.46rpx 2.08rpx 21.94rpx;
  width: 226.58rpx;
}
.pos_25 {
  position: absolute;
  right: 0;
  top: 0;
}
.pos_2 {
  position: absolute;
  left: 2.08rpx;
  top: 50%;
  transform: translateY(-50%);
}
.grid-item_3 {
  padding: 23.44rpx 2.53rpx 21.96rpx;
  width: 226.58rpx;
}
.pos_26 {
  position: absolute;
  left: 0;
  top: 73.14rpx;
}
.pos_3 {
  position: absolute;
  left: 2.53rpx;
  top: 50%;
  transform: translateY(-50%);
}
.grid-item_4 {
  padding: 23.44rpx 2.08rpx 21.9rpx;
  width: 226.58rpx;
}
.pos_27 {
  position: absolute;
  right: 0;
  top: 73.14rpx;
}
.pos_4 {
  position: absolute;
  left: 2.08rpx;
  top: 50%;
  transform: translateY(-50%);
}
.text_3 {
  line-height: 27.81rpx;
}
.group {
  margin-left: 3.13rpx;
  margin-right: 3.13rpx;
}
.list-item_3 {
  padding: 62.74rpx 4.05rpx 39.38rpx;
  border-bottom: solid 1.88rpx #cacac8;
}
.text_6 {
  line-height: 27.86rpx;
}
.section_2 {
  margin-right: 2.23rpx;
  padding: 54.38rpx 48.75rpx 52.5rpx 48.77rpx;
  background-color: #f9f9f7;
  border-radius: 18.75rpx;
}
.text_11 {
  line-height: 50rpx;
}
.text_12 {
  line-height: 27.69rpx;
}
.text_13 {
  line-height: 27.71rpx;
}
.text_14 {
  margin: 69.36rpx 43.52rpx 0 7.18rpx;
  line-height: 35.63rpx;
}
.text-wrapper {
  margin: 46.88rpx 11.29rpx 0 5.66rpx;
	height: 200rpx;
	background-color: #f9f9f7;
	padding: 20rpx;
	border-radius: 18.75rpx;
}
.text-wrapper_2 {
  margin: 76.88rpx 9.41rpx 0 9.41rpx;
  padding: 29.7rpx 0 27.04rpx;
  background-color: #0bba81;
  border-radius: 93.75rpx;
}
.text_16 {
  color: #ffffff;
  font-size: 33.75rpx;
  font-family: Open Sans;
  line-height: 31.39rpx;
}
@import url(../component/css/global1.css);
</style>

<template>
	<view class="flex-col page">
	  <view class="flex-col section">
	    <text class="self-start font text">请选择上门时间</text>
		
	    <scroll-view class="flex-row equal-division group mt-16" scroll-x>
	      <view class="flex-col items-center group_2 equal-division-item" v-for="(item, index) in weeks" :key="index" @click="choose(index)">
	        <text :style="{color: textColor[index]}" class="font text_2">{{weekDay[index]}}</text>
	        <text :style="{color: textColor[index]}" class="font_2 text_3 mt-6">{{futureDate[index]}}</text> 
	      </view>
	    </scroll-view>
		
	    <view class="flex-col self-stretch group_3 mt-16">
	      <view class="flex-row equal-division">
	        <view class="flex-col items-center equal-division-item_2 section_2" @click="onChangeState(0)"
			:style="{backgroundColor: tempStyleArr[0].backgroundColor, border: '1.88rpx solid ' + tempStyleArr[0].borderColor}">
	          <text class="font_3 text_4" :style="{color: tempStyleArr[0].color}">10:00-12:00</text>
	          <text class="font_4 text_5 mt-11" :style="{color: tempStyleArr[0].color}">{{tempStyleArr[0].text}}</text>
	        </view>
	        <view class="flex-col items-center equal-division-item_2 equal-division-item_3 ml-14" @click="onChangeState(1)"
			:style="{backgroundColor: tempStyleArr[1].backgroundColor, border: '1.88rpx solid ' + tempStyleArr[1].borderColor}">
	          <text class="font_3" :style="{color: tempStyleArr[1].color}">12:00-14:00</text>
	          <text class="font_4 text_6 mt-11" :style="{color: tempStyleArr[1].color}">{{tempStyleArr[1].text}}</text>
	        </view>
	        <view class="flex-col items-center equal-division-item_2 equal-division-item_3 ml-14" @click="onChangeState(2)"
			:style="{backgroundColor: tempStyleArr[2].backgroundColor, border: '1.88rpx solid ' + tempStyleArr[2].borderColor}">
	          <text class="font_3" :style="{color: tempStyleArr[2].color}">14:00-16:00</text>
	          <text class="font_4 text_6 mt-11" :style="{color: tempStyleArr[2].color}">{{tempStyleArr[2].text}}</text>
	        </view>
	      </view>
	      <view class="flex-col items-center self-start section_3 mt-15" @click="onChangeState(3)"
		  :style="{backgroundColor: tempStyleArr[3].backgroundColor, border: '1.88rpx solid ' + tempStyleArr[3].borderColor}">
	        <text class="font_3 text_7" :style="{color: tempStyleArr[3].color}">16:00-18:00</text>
	        <text class="font_4 text_8 mt-11" :style="{color: tempStyleArr[3].color}">{{tempStyleArr[3].text}}</text>
	      </view>
	    </view>
	  </view>
	  <view class="flex-row justify-between items-center section_4 mt-12">
	    <text class="font text_9">预约时间</text>
	    <text class="font_2">{{new Date().getFullYear() + '-' + futureDate[tempIdx] + ' ' + tempTimeString}}</text>
	  </view>
	  <view class="flex-col justify-start section_5 mt-12">
	    <view class="flex-col justify-start items-center text-wrapper" @click="confirm"><text class="font text_10">确认</text></view>
	  </view>
	</view>
</template>

<script setup lang="ts">
	import {onMounted, ref} from 'vue'
import emitter from '../../../utils/emitter';
	
	const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
	const weekDay = ref([])
	
	const futureDate = ref([])
	
	const styleArr = [
		{backgroundColor: '#fff', color: '#000', borderColor: '#e8e8e8', text: '可预约'},
		{backgroundColor: '#fff', color: '#00ba9c', borderColor: '#00ba9c', text: '可预约'},
		{backgroundColor: '#f2f3f7', color: '#97989c', borderColor: '#fff', text: '已结束'},
	]
	
	const tempStyleArr = ref([]) 
	
	onMounted(() => { 
		const todayWeekDay = getWeekDate()
		for (var i = 0; i < 7; i ++ ){
			weekDay.value[i] = weeks[(todayWeekDay + i) % 7]
		}
		weekDay.value[0] = '今天'
		weekDay.value[1] = '明天'
		weekDay.value[2] = '后天'

		for (var i = 0; i < 7; i ++ ){
			const today = new Date()
			today.setDate(today.getDate() + i)
			futureDate.value[i] = (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0)		
		}
		console.log(futureDate.value)

		for (var i = 0; i < 4; i ++ ){
			tempStyleArr.value[i] = styleArr[0]
		}
		console.log(isDuringDate(getDate() + ' 19:00', getDate() + ' 21:03'))
		textColor.value[0] = '#00ba9c'
		dealTime(0)
	})
	
	const getWeekDate = () => {
		var now = new Date();
		return now.getDay();
	}
	
	const textColor = ref(['#000', '#000', '#000', '#000', '#000', '#000', '#000'])
	
	const isEnd = ref([false, false, false, false])
	
	const tempIdx = ref(0)
	const tempState = ref(null)
	const tempTimeString = ref('暂未选择')
	
	const choose = (val:any) => {
		tempIdx.value = val
		for (var i = 0; i < 7; i ++ ){
			if(i == val){
				textColor.value[i] = '#00ba9c'
			}else{
				textColor.value[i] = '#000'
			}
		} 
		dealTime(val)
	}
	
	const dealTime = (val:any) => {
		if(val == 0){
			if(isDuringDate(getDate() + ' 00:00', getDate() +' 12:00')){
				tempStyleArr.value[0] = styleArr[0]
			}else{
				tempStyleArr.value[0] = styleArr[2]
				isEnd.value[0] = true
			}
			if(isDuringDate(getDate() + ' 00:00', getDate() +' 14:00')){
				tempStyleArr.value[1] = styleArr[0]
			}else{
				tempStyleArr.value[1] = styleArr[2]
				isEnd.value[1] = true
			}
			if(isDuringDate(getDate() + ' 00:00', getDate() +' 16:00')){
				tempStyleArr.value[2] = styleArr[0]
			}else{
				tempStyleArr.value[2] = styleArr[2]
				isEnd.value[2] = true
			}
			if(isDuringDate(getDate() + ' 00:00', getDate() +' 18:00')){
				tempStyleArr.value[3] = styleArr[0]
			}else{
				tempStyleArr.value[3] = styleArr[2]
				isEnd.value[3] = true
			}
		}else{
			for (var i = 0; i < 4; i ++ ){
				tempStyleArr.value[i] = styleArr[0]
			}
		}
	}
	
	const onChangeState = (val:any) => {
		tempState.value = val
		if(tempIdx.value == 0){
			if(val == 0){
				if(isEnd.value[0]) return ;
				tempTimeString.value = '10:00-12:00'
			}else if(val == 1){
				if(isEnd.value[1]) return ;
				tempTimeString.value = '12:00-14:00'
			}else if(val == 2){
				if(isEnd.value[2]) return ;
				tempTimeString.value = '14:00-16:00'
			}else{
				if(isEnd.value[3]) return ;
				tempTimeString.value = '16:00-18:00'
			} 
		}else{
			if(val == 0){
				tempTimeString.value = '10:00-12:00'
			}else if(val == 1){
				tempTimeString.value = '12:00-14:00'
			}else if(val == 2){
				tempTimeString.value = '14:00-16:00'
			}else{
				tempTimeString.value = '16:00-18:00'
			} 
		}

		
		
		if(tempIdx.value == 0){
			for (var i = 0; i < 4; i ++ ){
				if(!isEnd.value[i]){
					if(i == val){
						tempStyleArr.value[i] = styleArr[1]
					}else{
						tempStyleArr.value[i] = styleArr[0]
					}
				}
			}
		}else{
			for (var i = 0; i < 4; i ++ ){
				if(i == val){
					tempStyleArr.value[i] = styleArr[1]
				}else{
					tempStyleArr.value[i] = styleArr[0]
				}
			}			
		}

	}
	
	
	const isDuringDate = (beginDateStr:any, endDateStr:any) => {
		var curDate = new Date(),
		  beginDate = new Date(beginDateStr),
		  endDate = new Date(endDateStr);
		if (curDate >= beginDate && curDate <= endDate) {
		  return true;
		}
		return false;
	  }
	  
	const getDate = () => {
	  	let now = new Date()
	  	let year = now.getFullYear()
	  	let month = (now.getMonth() + 1).toString().padStart(2, 0)
	  	let date = now.getDate().toString().padStart(2, 0)
	  	return year + '-' + month + '-' + date
	}
	
	
	const m = {
		'10:00-12:00': 0,
		'12:00-14:00': 1,
		'14:00-16:00': 2,
		'16:00-18:00': 3,
	}
	
	const confirm = () => {
		if(tempTimeString.value == '暂未选择'){
			uni.showToast({
				title: '请选择预约时间段',
				icon: 'fail'
			})
			return ;
		}
		if(tempIdx.value == 0){
			console.log(m[tempTimeString.value])
			if(isEnd.value[m[tempTimeString.value]]){
				uni.showToast({
					title: '当前预约时间段已结束',
					icon: 'fail'
				})
				return ;
			}
		}
		const appointmentTime =  new Date().getFullYear() + '-' + futureDate.value[tempIdx.value] + ' ' + tempTimeString.value
		emitter.emit('appointmentTime', appointmentTime)
		uni.navigateBack({
			
		})
		
	}
	
</script>

<style lang="scss" scoped>
.mt-15 {
  margin-top: 28.13rpx;
}
.mt-11 {
  margin-top: 20.63rpx;
}
.page {
  background-color: #f2f2f2;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.section {
  padding: 51.67rpx 0 52.5rpx;
  background-color: #ffffff;
}
.font {
  font-size: 30rpx;
  font-family: Inter;
  line-height: 27.79rpx;
  color: #000000;
}
.text {
  margin-left: 38.74rpx;
  line-height: 27.66rpx;
}
.equal-division {
  align-self: stretch;
}
.group {
  padding: 0 14.01rpx;
}
.group_2 {
  // flex: 1 1 120rpx;
  margin: 0 30rpx;
}
.equal-division-item {
  padding: 9.99rpx 0 10.01rpx;
}
.text_2 {
  // color: #00ba9c;
}
.font_2 {
  font-size: 30rpx;
  font-family: Inter;
  line-height: 22.41rpx;
  color: #000000;
}
.text_3 {
  // color: #00ba9c;
}
.group_3 {
  padding: 0 16.88rpx;
}
.equal-division-item_2 {
  flex: 1 1 221.25rpx;
}
.section_2 {
  padding: 35.02rpx 0 33.52rpx;
  background-color: #f2f3f7;
  border-radius: 9.38rpx;
  height: 133.13rpx;
}
.font_3 {
  font-size: 26.25rpx;
  font-family: Inter;
  line-height: 19.61rpx;
  color: #000000;
}
.text_4 {
  color: #97989c;
}
.font_4 {
  font-size: 26.25rpx;
  font-family: Inter;
  line-height: 22.41rpx;
  color: #000000;
}
.text_5 {
  color: #97989c;
  line-height: 24.15rpx;
}
.equal-division-item_3 {
  padding: 33.02rpx 0 31.8rpx;
  background-color: #ffffff;
  border-radius: 9.38rpx;
  height: 133.13rpx;
  border: solid 1.88rpx #e8e8e8;
}
.text_6 {
  line-height: 24.09rpx;
}
.section_3 {
  padding: 33.02rpx 0 31.8rpx;
  background-color: #ffffff;
  border-radius: 9.38rpx;
  width: 221.25rpx;
  // border: solid 1.88rpx #00ba9c;
}
.text_7 {
  color: #00ba9c;
}
.text_8 {
  color: #00ba9c;
  line-height: 24.09rpx;
}
.section_4 {
  padding: 55.46rpx 23.98rpx 57.56rpx 40.48rpx;
  background-color: #ffffff;
}
.text_9 {
  line-height: 27.6rpx;
}
.section_5 {
  padding: 45rpx 0 751.88rpx;
  background-color: #ffffff;
}
.text-wrapper {
  margin-left: 26.25rpx;
  margin-right: 26.27rpx;
  padding: 21.68rpx 0 23.76rpx;
  background-color: #00ba9c;
  border-radius: 75rpx;
}
.text_10 {
  color: #ffffff;
  line-height: 27.69rpx;
}
@import url(../component/css/global1.css);
</style>

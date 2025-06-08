<template>
	<view class="flex-col page">
	  <view class="flex-col group">
	    <view class="flex-col section">
	      <view class="flex-row items-center">
	        <image
	          class="image"
	          :src="tempFirstBook"
	        /> 
	        <text class="font_6 ml-6">请选择回收类型</text>
	      </view>
	      <view class="flex-col group_2 mt-45">
	        <view class="flex-row justify-between self-stretch group_3">
	          <text @click="transfer(1)" class="font_2 text_2" :style="{color: fc}">旧衣回收</text>
	          <text @click="transfer(2)" class="font_2 text_3" :style="{color: sc}">书籍回收</text>
	        </view>
	        <view class="self-start section_2" :style="mlObj"></view>
	      </view>
	    </view>
	    <view class="flex-col section_3 mt-19">
	      <view class="flex-row items-center group_4">
	        <image
	          class="image"
	          :src="DonateImgUrl + 'index/lb.png'"
	        />
	        <text class="font_3 text_4 ml-11">回收每1kg可获得15积分</text>
	      </view>
	      <view class="flex-row equal-division group_5">
	        <view class="flex-col items-center group_6 group_19">
	          <image
	            class="image_2"
	            :src="arr[0].url"
	          />
	          <text class="font_6 text_1 mt-8">{{arr[0].name}}</text>
	        </view>
	        <view class="flex-col items-center group_6 group_7">
	          <image
	            class="image_2"
	            :src="arr[1].url"
	          />
	          <text class="font_6 text_5 mt-8">{{arr[1].name}}</text>
	        </view>
	        <view class="flex-col items-center group_6 group_20">
	          <image
	            class="image_2"
	            :src="arr[2].url"
	          />
	          <text class="font_6 text_25 mt-8">{{arr[2].name}}</text>
	        </view>
	        <view class="flex-col items-center group_6 group_21">
	          <image
	            class="image_2"
	            :src="arr[3].url"
	          />
	          <text class="font_6 text_26 mt-7">{{arr[3].name}}</text>
	        </view>
	        <view class="flex-col items-center group_6 group_1">
	          <image
	            class="image_2"
	            :src="arr[4].url"
	          />
	          <text class="font_6 text_28 mt-8">{{arr[4].name}}</text>
	        </view>
	      </view>
	      <view class="flex-row items-center group_4 view">
	        <image
	          class="image"
	          :src="DonateImgUrl + 'index/hs.png'"
	        />
	        <text class="font_6 text_6 ml-9">回收流程</text>
	      </view>
	      <view class="flex-row items-center relative section_4">
	        <view class="flex-col justify-start items-center shrink-0 text-wrapper_7"><text class="font_5">1</text></view>
	        <text class="font_4 text_7">填写预约</text>
	        <image
	          class="shrink-0 image_3 pos"
	          :src="DonateImgUrl + 'index/up.png'"
	        />
	        <image
	          class="shrink-0 image_3 pos_4"
	          :src="DonateImgUrl + 'index/down.png'"
	        />
	        <view class="flex-col justify-start items-center shrink-0 relative text-wrapper">
	          <text class="font_5 text_10">2</text>
	        </view>
	        <text class="relative font_4 text_8">免费上门</text>
	        <image
	          class="shrink-0 image_3 pos_2"
	          :src="DonateImgUrl + 'index/up.png'"
	        />
	        <view class="flex-col justify-start items-center shrink-0 relative view_3">
	          <text class="font_5 text_11">3</text>
	        </view>
	        <view class="flex-col justify-start shrink-0 relative view_2">
	          <text class="font_4 text_29">完成回收</text>
	          <image
	            class="image_3 pos_3"
	            :src="DonateImgUrl + 'index/up.png'"
	          />
	          <image
	            class="image_3 pos_6"
	            :src="DonateImgUrl + 'index/down.png'"
	          />
	        </view>
	        <image
	          class="shrink-0 image_3 pos_5"
	          :src="DonateImgUrl + 'index/down.png'"
	        />
	        <view class="flex-col justify-start items-center shrink-0 relative text-wrapper_7 view_1">
	          <text class="font_5">4</text>
	        </view>
	        <text class="relative font_4 text_9">领取积分</text>
	      </view>
	    </view>
	    <view class="flex-col section_5 mt-19">
	      <view class="flex-row items-center group_10">
	        <image
	          class="image"
	          :src="tempSecondBook"
	        />
	        <text class="font_6 text_12 ml-6">{{tempTextTip}}</text>
	      </view>
	      <view class="flex-row items-center group_11">
	        <text class="font_6 text_13">*</text>
	        <text class="font_4 text_14 ml-2">满10kg以上可以获得积分，以实际称重为主</text>
	      </view>
	      <view class="flex-col group_12">
	        <view class="flex-row">
	          <view class="flex-col justify-start relative group_13">
	            <view class="flex-col justify-start items-center text-wrapper_1" 
				:style="{borderColor: initState[0].borderColor}" @click="changeState(0)">
	              <text class="font_6 text_27">10kg</text>
	            </view>
	            <image
				  v-if="initState[0].isChecked"
	              class="image_4 pos_7"
	              :src="DonateImgUrl + 'index/dg.png'"
	            />
	          </view>
	          <view class="flex-col justify-start relative group_13 ml-10">
	            <view class="flex-col justify-start items-center text-wrapper_1"
				 :style="{borderColor: initState[1].borderColor}" @click="changeState(1)">
	              <text class="font_6 text_27">10-20kg</text>
	            </view>
	            <image
				  v-if="initState[1].isChecked"
	              class="image_4 pos_8"
	              :src="DonateImgUrl + 'index/dg.png'"
	            />
	          </view>
	        </view>
	        <view class="flex-row mt-9">
	          <view class="flex-col justify-start relative group_13">
	            <view class="flex-col justify-start items-center text-wrapper_1" 
				:style="{borderColor: initState[2].borderColor}" @click="changeState(2)">
	              <text class="font_6 text_27">20-50kg</text>
	            </view>
	            <image
				  v-if="initState[2].isChecked"
	              class="image_4 pos_9"
	              :src="DonateImgUrl + 'index/dg.png'"
	            />
	          </view>
	          <view class="flex-col justify-start relative group_13 ml-10">
	            <view class="flex-col justify-start items-center text-wrapper_3" 
				:style="{borderColor: initState[3].borderColor}" @click="changeState(3)">
	              <text class="font_3 text_15">50kg以上</text>
	            </view>
	            <image
				  v-if="initState[3].isChecked"
	              class="image_4 pos_10"
	              :src="DonateImgUrl + 'index/dg.png'"
	            />
	          </view>
	        </view>
	      </view>
	      <view class="flex-row group_14">
	        <text class="font_6">预计获得：</text>
	        <text class="font_6 text_17">{{points}}环保积分</text>
	      </view>
	    </view>
	    <view class="flex-col section_6 mt-19">
	      <view class="flex-row items-center group_10">
	        <image
	          class="image_5"
	          :src="DonateImgUrl + 'index/dw.png'"
	        />
	        <text class="font_6 text_18 ml-4">填写回收信息</text>
	      </view>
	      <view class="flex-col mt-11">
	        <view class="flex-row items-center section_1" @click="addAddress">
	          <view class="flex-col items-start flex-1">
	            <text class="font_6">回收地址</text>
	            <text style="line-height: 35rpx;" class="font_6 text_20 mt-17">{{tempAddress}}</text>
	          </view>
	          <image
	            class="shrink-0 image_6 ml-4"
	            :src="DonateImgUrl + 'index/yjt.png'"
	          />
	        </view>
	        <view class="flex-row justify-between items-center section_7 mt-18" @click="jumpToTime">
	          <view class="flex-col items-start">
	            <text class="font_6">回收时间</text>
	            <text class="font_6 text_21 mt-18">{{appointmentTime}}</text>
	          </view>
	          <image 
	            class="image_6"
	            :src="DonateImgUrl + 'index/yjt.png'"
	          />
	        </view>
	      </view>
	    </view>
	  </view>
	  <view class="flex-col justify-start items-center section_8 mt-30">
	    <view class="flex-col justify-start items-center text-wrapper_4" @click="jumpToDetail"><text class="font_6 text_22">提交</text></view>
	  </view>
	</view>
	
	
	<uni-popup ref="popup" background-color="#fff">
					<view class="popup-content">
						<addressVue></addressVue>
					</view>
	</uni-popup>
	
	<uni-popup ref="alertDialog" type="dialog">
						<view class="pop">
							<popupVue></popupVue>
						</view>
	</uni-popup>
	 
</template>

<script setup lang="ts">
	import { DomainName, DonateImgUrl } from '../../../common/global';
	import {onMounted, ref} from 'vue'
	import addressVue from '../component/address.vue'
	import popupVue from '../component/popup.vue'
	import emitter from '../../../utils/emitter';
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	 
	const appointmentTime = ref('请输入预约时间')
	
	const weightArr = ['10kg', '10-20kg', '20-50kg', '50kg以上']
	
	const tempWeight = ref('')
	
	const tempWeightId = ref(-1)
	
	onMounted(() => {
		emitter.on('close', () => {
			popup.value.close()
		})
		
		emitter.on('pop', () => {
			alertDialog.value.open()
		})
		
		emitter.on('popClose', () => {
			alertDialog.value.close()
		})
		emitter.on('addAddressOrder', (val:any) => {
			tempAddress.value = val
		})
		emitter.on('addId', (val:any) => {
			addId.value = val
		})
		
		emitter.on('appointmentTime', (val:any) => {
			appointmentTime.value = val
			console.log(appointmentTime.value)
		})
		checkDefaultAddressIsExist()
		getDefaultAddress()
	})
	
	const getDefaultAddress = async () => {
		const res = await uni.request({
			url: DomainName + '/change/queryUserDefaultAddress',
			method: 'GET',
			data: {
				id: userStore.user.id
			}
		})
		if(res.data.data != null){
			addId.value = res.data.data.id
		}
	}
	
	const addId = ref(0)
	
	const tempAddress = ref('请填写回收地址信息')
	
	const checkDefaultAddressIsExist = async () => {
		const res = await uni.request({
			url: DomainName + '/change/queryUserDefaultAddress',
			method: 'GET',
			data: {
				id: userStore.user.id
			}
		})
		console.log(res)
		if(res.data.data != null){
			tempAddress.value = (res.data.data.region + ' ' + res.data.data.detailAddress).split('/').join('')
		}
	}
	 
	const clothes = [
		{name: '四季衣物', url: DonateImgUrl + 'index/1.png'},
		{name: '帽子围巾', url: DonateImgUrl + 'index/2.png'},
		{name: '床单被罩', url: DonateImgUrl + 'index/3.png'},
		{name: '闲置旧包', url: DonateImgUrl + 'index/4.png'},
		{name: '毛绒玩具', url: DonateImgUrl + 'index/5.png'},
	]
	
	const books = [
		{name: '文学小说', url: DonateImgUrl + 'component/1.png'},
		{name: '人文社科', url: DonateImgUrl + 'component/2.png'},
		{name: '生活艺术', url: DonateImgUrl + 'component/3.png'},
		{name: '科学科普', url: DonateImgUrl + 'component/4.png'},
		{name: '童书绘本', url: DonateImgUrl + 'component/5.png'},
	]
	
	const arr = ref(clothes)
	
	const fc = ref('#00ba9c')
	const sc = ref('#000')
	const mlObj = ref({
		marginLeft: 14.91 + 'rpx'
		// marginLeft: 440.54 + 'rpx'
	})
	
	const tempFirstBook = ref(DonateImgUrl + 'index/yf.png')
	const tempSecondBook = ref(DonateImgUrl + 'index/yf2.png')
	const tempTextTip = ref('请选择衣物重量')
	
	const typeId = ref(0)
	
	const transfer = (val:any) => {
		if(val == 1){
			typeId.value = val
			fc.value = '#00ba9c'
			sc.value = '#000'
			mlObj.value.marginLeft = 14.91 + 'rpx'
			arr.value = clothes
			tempFirstBook.value = DonateImgUrl + 'index/yf.png'
			tempSecondBook.value = DonateImgUrl + 'index/yf2.png'
			tempTextTip.value = '请选择衣物重量'
		}else{
			typeId.value = val
			sc.value = '#00ba9c'
			fc.value = '#000'
			mlObj.value.marginLeft = 440.54 + 'rpx'
			arr.value = books
			tempFirstBook.value = DonateImgUrl + 'index/book2.png'
			tempSecondBook.value = DonateImgUrl + 'index/book1.png'
			tempTextTip.value = '请选择书籍重量'
		}
	}
	
	const initState = ref([
		{isChecked: false, borderColor: '#E3E3E3'},
		{isChecked: false, borderColor: '#E3E3E3'},
		{isChecked: false, borderColor: '#E3E3E3'},
		{isChecked: false, borderColor: '#E3E3E3'},
	])
	
	const realPoints = ref(0)
	const points = ref('0')
	
	const changeState = (val:any) => {
		tempWeight.value = weightArr[val]
		tempWeightId.value = val
		for (var i = 0; i < 4; i ++ ){
			if(i == val){
				initState.value[i].isChecked = true
				initState.value[i].borderColor = '#00ba9c'
			}else{
				initState.value[i].isChecked = false
				initState.value[i].borderColor = '#E3E3E3'
			}
			if(val == 0) {
				points.value = '150'
				realPoints.value = 150
			}else if(val == 1) {
				points.value = '300'
				realPoints.value = 300
			}else if(val == 2){
				points.value = '750'
				realPoints.value = 750
			}else{
				points.value = '750以上'
				realPoints.value = 750
			} 
		}
	}
	
	const jumpToTime = () => {
		uni.navigateTo({
			url: '../selectPeriod/selectPeriod'
		}) 
	}
	
	const popup = ref(null)
	const alertDialog = ref(null)
	
	const addAddress = () => {
		popup.value.open('bottom')
	}
	
	
	const jumpToDetail = async () => {
		console.log(typeId.value, 11111)
		if(tempWeightId.value == -1){
			uni.showToast({
				title: '请选择重量',
				icon: 'fail'
			})
			return ;
		}
		if(appointmentTime.value == '请输入预约时间'){
			uni.showToast({
				title: '请输入预约时间',
				icon: 'fail'
			})
			return ;
		}
		const res = await uni.request({
			url: DomainName + '/recycle/insertRecycleRecord',
			method: 'POST',
			data: { 
				type: typeId.value,
				weight: tempWeight.value,
				cycleAddressId: addId.value,
				cycleDate: appointmentTime.value,
				cycleReward: realPoints.value,
				userId: userStore.user.id,
				isAccess: 0,
			}
		})
		console.log(res)
		uni.showToast({
			title: '提交成功',
			icon: 'success'
		})
		setTimeout(() => {
			uni.navigateTo({
				url: '../orderDetail/orderDetail'
			})
		}, 1000)
	}
	
</script>

<style lang="scss" scoped>
.pop{
	height: 500rpx; 
}
	
.popup-content { 
		height: 392px;
		align-items: center;
		justify-content: center;
		padding: 30rpx;
		background-color: #fff;
	}
	
.mt-45 {
  margin-top: 84.38rpx;
}
.ml-11 {
  margin-left: 20.63rpx;
}
.mt-7 {
  margin-top: 13.13rpx;
}
.ml-9 {
  margin-left: 16.88rpx;
}
.mt-9 {
  margin-top: 16.88rpx;
}
.mt-19 {
  margin-top: 35.63rpx;
}
.mt-11 {
  margin-top: 20.63rpx;
}
.mt-17 {
  margin-top: 31.88rpx;
}
.page {
  padding-bottom: 41.38rpx;
  background-color: #f2f2f2;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group {
  padding: 24.24rpx 26.12rpx 24.26rpx;
}
.section {
  margin-right: 5.89rpx;
  padding: 33.75rpx 31.88rpx 20.63rpx;
  background-color: #ffffff;
  border-radius: 9.38rpx;
}
.image {
  width: 56.25rpx;
  height: 56.25rpx;
}
.font_6 {
  font-size: 30rpx;
  font-family: Inter;
  line-height: 27.69rpx;
  color: #000000;
}
.group_2 {
  padding-left: 39.47rpx;
  padding-right: 33.6rpx;
}
.group_3 {
  padding-bottom: 21.56rpx;
}
.font_2 {
  font-size: 33.75rpx;
  font-family: Inter;
  line-height: 31.29rpx;
}
.text_2 {
  color: #00ba9c;
  line-height: 31.14rpx;
}
.text_3 {
  color: #000000;
}
.section_2 {
  margin-left: 14.91rpx;
  background-color: #00ba9c;
  width: 97.5rpx;
  height: 5.63rpx;
  transition-property:margin-left;
          /* 设置需要过渡的属性 */
          transition-duration: 0.3s;
          /* 设置过渡的时间 */
}
.section_3 {
  margin-right: 5.89rpx;
  padding: 45rpx 0 43.13rpx;
  background-color: #ffffff;
  border-radius: 9.38rpx;
}
.group_4 {
  padding: 0 28.13rpx;
}
.font_3 {
  font-size: 30rpx;
  font-family: Inter;
  line-height: 31.29rpx;
  color: #000000;
}
.text_4 {
  line-height: 31.84rpx;
}
.equal-division {
  margin-top: 18.13rpx;
}
.group_5 {
  padding: 0 13.29rpx;
}
.group_6 {
  flex: 1 1 132.66rpx;
}
.group_19 {
  padding: 8.89rpx 0 10.11rpx;
}
.image_2 {
  border-radius: 93.75rpx;
  width: 96rpx;
  height: 96rpx;
}
.text_1 {
  font-size: 28.13rpx;
  line-height: 25.91rpx;
}
.group_7 {
  padding: 8.89rpx 0 10.03rpx;
}
.text_5 {
  font-size: 28.13rpx;
  line-height: 25.97rpx;
}
.group_20 {
  padding: 8.89rpx 0 9.99rpx;
}
.text_25 {
  font-size: 28.13rpx;
  line-height: 25.97rpx;
}
.group_21 {
  padding: 8.89rpx 0 10.09rpx;
}
.text_26 {
  font-size: 28.13rpx;
  line-height: 26.04rpx;
}
.group_1 {
  padding: 8.89rpx 0 10.07rpx;
}
.text_28 {
  font-size: 28.13rpx;
  line-height: 25.88rpx;
}
.view {
  margin-top: 32.63rpx;
}
.text_6 {
  font-size: 28.13rpx;
  line-height: 25.97rpx;
}
.section_4 {
  margin: 37.5rpx 28.13rpx 0 28.13rpx;
  padding-left: 28.13rpx;
  padding-right: 27.32rpx;
  background-color: #00ba9c;
  border-radius: 18.75rpx;
}
.text-wrapper_7 {
  padding: 6.39rpx 0 6.22rpx;
  background-color: #ffffff;
  border-radius: 50%;
  width: 26.25rpx;
  height: 26.25rpx;
}
.font_5 {
  font-size: 18.75rpx;
  font-family: Inter;
  line-height: 13.63rpx;
  color: #00ba9c;
}
.font_4 {
  font-size: 24.38rpx;
  font-family: Inter;
  line-height: 22.59rpx;
  color: #ffffff;
}
.text_7 {
  margin-left: 4.56rpx;
  line-height: 22.48rpx;
}
.image_3 {
  width: 28.13rpx;
  height: 48.75rpx;
}
.pos {
  position: absolute;
  left: 142.5rpx;
  top: 0;
}
.pos_4 {
  position: absolute;
  left: 142.76rpx;
  bottom: 0;
}
.text-wrapper {
  margin-left: 19.82rpx;
  padding: 6.21rpx 0 6.22rpx;
  background-color: #ffffff;
  border-radius: 50%;
  width: 26.25rpx;
  height: 26.25rpx;
}
.text_10 {
  line-height: 13.82rpx;
}
.text_8 {
  margin-left: 4.63rpx;
  line-height: 22.5rpx;
}
.pos_2 {
  position: absolute;
  left: 292.5rpx;
  top: 0;
}
.view_3 {
  margin-left: 19.74rpx;
  padding: 6.21rpx 0 6.04rpx;
  background-color: #ffffff;
  border-radius: 50%;
  width: 26.25rpx;
  height: 26.25rpx;
}
.text_11 {
  line-height: 14.01rpx;
}
.view_2 {
  padding: 35.77rpx 0 37.26rpx;
}
.text_29 {
  margin-left: 4.58rpx;
  margin-right: 12.56rpx;
}
.pos_3 {
  position: absolute;
  right: 0;
  top: 0;
}
.pos_6 {
  position: absolute;
  right: 0;
  bottom: 0;
}
.pos_5 {
  position: absolute;
  left: 292.76rpx;
  bottom: 0;
}
.view_1 {
  margin-left: 7.24rpx;
}
.text_9 {
  margin-left: 4.56rpx;
  line-height: 22.57rpx;
}
.section_5 {
  margin-right: 5.89rpx;
  padding: 28.13rpx 11.25rpx 51.83rpx 28.13rpx;
  background-color: #ffffff;
  border-radius: 9.38rpx;
}
.group_10 {
  padding: 0 3.75rpx;
}
.text_12 {
  font-size: 28.13rpx;
  line-height: 25.93rpx;
}
.group_11 {
  margin-top: 18.47rpx;
  padding: 0 11.04rpx;
}
.text_13 {
  color: #fa0101;
  line-height: 12.28rpx;
}
.text_14 {
  color: #a1a1a1;
  font-size: 22.5rpx;
  line-height: 23.89rpx;
}
.group_12 {
  margin-top: 28.89rpx;
}
.group_13 {
  flex: 1 1 316.88rpx;
  padding-bottom: 18.75rpx;
}
.text-wrapper_1 {
  margin-right: 16.88rpx;
  padding: 45.26rpx 0 38.64rpx;
  background-color: #ffffff;
  border: solid 1.88rpx #00ba9c;
}
.text_27 {
  line-height: 28.59rpx;
}
.image_4 {
  width: 31.88rpx;
  height: 31.88rpx;
}
.pos_7 {
  position: absolute;
  right: 0;
  bottom: 0;
}
.pos_8 {
  position: absolute;
  right: 0;
  bottom: 0;
}
.pos_9 {
  position: absolute;
  right: 0;
  bottom: 0;
}
.text-wrapper_3 {
  margin-right: 16.88rpx;
  padding: 42.62rpx 0 38.66rpx;
  background-color: #ffffff;
  border: solid 1.88rpx #00ba9c;
}
.text_15 {
  line-height: 31.24rpx;
}
.pos_10 {
  position: absolute;
  right: 0;
  bottom: 0;
}
.group_14 {
  margin-top: 29.18rpx;
}
.text_17 {
  color: #00ba9c;
  line-height: 27.66rpx;
}
.section_6 {
  margin-right: 5.89rpx;
  padding: 31.88rpx 31.88rpx 56.25rpx;
  background-color: #ffffff;
  border-radius: 9.38rpx;
  margin-bottom: 120rpx;
}
.image_5 {
  width: 46.88rpx;
  height: 46.88rpx;
}
.text_18 {
  line-height: 27.99rpx;
}
.section_1 {
  padding: 34.8rpx 13.13rpx 33.08rpx 25.48rpx;
  background-color: #f1f1f1;
  border-radius: 9.38rpx;
}
.text_20 {
  line-height: 27.86rpx;
}
.image_6 {
  width: 43.13rpx;
  height: 43.13rpx;
}
.section_7 {
  padding: 34.8rpx 13.13rpx 34.46rpx 26.64rpx;
  background-color: #f1f1f1;
  border-radius: 9.38rpx;
}
.text_21 {
  // color: #999999;
  line-height: 24.49rpx;
}
.section_8 {
  padding: 28.13rpx 0 46.25rpx;
  background-color: #ffffff;
  box-shadow: 0rpx -7.5rpx 7.5rpx -7.5rpx #00000040;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.text-wrapper_4 {
  padding: 23.51rpx 0 23.74rpx;
  background-color: #00ba9c;
  border-radius: 93.75rpx;
  width: 631.88rpx;
}
.text_22 {
  color: #ffffff;
  line-height: 27.75rpx;
}
@import url(../component/css/global1.css);
</style>

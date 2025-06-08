<template>
	<view class="flex-col page">
	  <view class="flex-row group">
	    <text class="font">收货人</text>
	    <input class="ml-33" placeholder="请填写收货人姓名" enableNative="{{false}}" v-model="consignee" />
	  </view>
	  <view class="flex-col group_2">
	    <view class="flex-row group_1">
	      <text class="font text">手机号码</text>
	      <input class="ml-20" placeholder="请填写联系电话" enableNative="{{false}}" v-model="phone" />
	    </view>
	    <view class="flex-row justify-between group_4">
	      <view class="flex-row">
	        <text class="font text_3">所在地区</text>
	        <!-- <input class="ml-20" placeholder="选择省/市/区" disabled="false"/> -->
			<text class="zujian"><addSelectedVue></addSelectedVue></text>
	      </view>
	      <image 
	        class="image"
	        :src="PointsMallImgUrl + 'saveAddress/yjt2.png'"
	      /> 
	    </view>
	    <view class="flex-row group_3"> 
	      <text class="font text_4">详细地址</text>
	      <input class="ml-19" placeholder="街道、楼牌号等" enableNative="{{false}}" v-model="detailAddress" />
	    </view>
	    <view class="flex-row justify-between items-center group_5">
	      <text class="text_6">设为默认地址</text>
	      <view @click="transfer" class="section">
			  <radio color="#00ba9c" :checked="checked"></radio>
		  </view> 
	    </view>
	  </view>
	  <view @click="save" class="flex-col justify-start items-center text-wrapper"><text class="text_7">保存地址</text></view>
	</view>
</template> 

<script setup lang="ts">
	import {onMounted, ref} from 'vue'
	import { DomainName, PointsMallImgUrl } from '../../../common/global';
	import addSelectedVue from '../component/addSelected.vue';
	import emitter from '../../../utils/emitter';
	import { onLoad } from "@dcloudio/uni-app";
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	
	const consignee = ref('')
	const phone = ref('')
	const detailAddress = ref('')
	const isDefault = ref(0)

	const tempRegion = ref('')

	const checked = ref(false)
	const transfer = () => {
		checked.value = !checked.value
		if(checked.value) isDefault.value = 1
		else isDefault.value = 0
	}
	
	const addressObj = ref({})
	
	const isAdd = ref(false)
	
	const id = ref(0)
	
	
	onLoad((options) => {
		isAdd.value = JSON.parse(options.isAdd)
		console.log(isAdd.value)
		if(isAdd.value) return ;
		addressObj.value = JSON.parse(options.obj)
		id.value = addressObj.value.id
		consignee.value = addressObj.value.consignee
		phone.value = addressObj.value.phone
		tempRegion.value = addressObj.value.region
		detailAddress.value = addressObj.value.detailAddress
		isDefault.value = addressObj.value.isDefault
		if(isDefault.value) checked.value = true
	})
	
	onMounted( () => {
		emitter.on('region', (regionVal:any) => {
			tempRegion.value = regionVal
		})
		if(!isAdd.value) emitter.emit('addRegion', tempRegion.value)
	})
	
	const save = async () => {
		if(checked.value) isDefault.value = 1 
		const res = await uni.request({
			url: DomainName + '/change/saveDeliveryAddress',
			method: 'POST',
			data: {
				id: id.value,
				consignee: consignee.value,
				phone: phone.value,
				detailAddress: detailAddress.value,
				region: tempRegion.value,
				isDefault: isDefault.value,
				userId: userStore.user.id
			}
		})
		console.log(res)
		
		
		uni.navigateBack({
			
		})
	}
	
</script>

<style lang="scss" scoped>

.zujian{
	height: 100rpx;
	width: 450rpx;
	margin-left: 50rpx;
}
input{
	vertical-align: middle;
	line-height: 25px;
}
.ml-33 {
  margin-left: 61.88rpx;
}
.ml-19 {
  margin-left: 35.63rpx;
}
.page {
  padding: 102.19rpx 37.97rpx 671.23rpx;
  background-color: #ffffff;
  mix-blend-mode: LUMINOSITY;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  .group {
    margin-right: 9.02rpx;
    padding: 0 8.59rpx;
  }
  .group_2 {
    margin-right: 9.02rpx;
    margin-top: 42.51rpx;
    border-top: solid 1.88rpx #e5e5e5;
    .group_1 {
      padding: 38.55rpx 3.28rpx 44.21rpx;
      border-bottom: solid 1.88rpx #e5e5e5;
    }
    .group_4 {
      padding: 37.5rpx 2.44rpx 43.13rpx;
      border-bottom: solid 1.88rpx #e5e5e5;
      .image {
        margin-right: 6.94rpx;
        width: 30rpx;
        height: 30rpx;
		line-height: 0.5rem;
      }
    }
    .group_3 {
      padding: 38.44rpx 3rpx 44.34rpx;
      border-bottom: solid 1.88rpx #e5e5e5;
    }
    .group_5 {
      padding-top: 39.38rpx;
      .text_6 {
        color: #000000;
        font-size: 30rpx;
        font-family: Open Sans;
        line-height: 27.69rpx;
      }
      .section {
        background-color: #ffffff;
      }
    }
  }
  .font {
    font-size: 30rpx;
    font-family: Roboto;
    color: #000000;
	vertical-align: middle;
  }
  .text-wrapper {
    margin: 88.14rpx 9.02rpx 0 8.79rpx;
    padding: 31.88rpx 0 30.38rpx;
    background-color: #00ba9c;
    border-radius: 93.75rpx;
    .text_7 {
      color: #ffffff;
      font-size: 37.5rpx;
      font-family: Open Sans;
      font-weight: 700;
      line-height: 35.25rpx;
    }
  }
}
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}


@import url('../css/global1.css');
</style>

<template>
<view class="flex-col section">
  <view class="flex-row justify-center relative group">
    <text class="text">回收地址</text>
    <image
	  @click="close"
      class="image pos"
      :src="PointsMallImgUrl + 'component/cha.png'"
    />
  </view>
  <scroll-view scroll-y class="scroll-view">
  
  <view class="flex-col justify-start group_1">
  <radio-group @change="onchange">
    <view class="flex-col group_2" v-for="(item, index) in addressList" :key="index">
      <view class="flex-row items-center group_3">
        <view class="section_2">
			<radio color="#00ba9c" :value="index"></radio>
		</view>
        <text class="font text_2 ml-8">{{item.consignee}}</text>
        <text class="font text_3 ml-8">{{item.phone}}</text>
      </view>
      <view class="flex-row justify-between items-center group_4 mt-14">
        <text class="text_4">{{specificAddress[index]}}</text>
        <view class="flex-row">
          <image
			@click="del(item.id)"
            class="image_2"
            :src="PointsMallImgUrl + 'component/shanchu.png'"
          />
          <image
			@click="edit(item)" 
            class="image_3 ml-16"
            :src="PointsMallImgUrl + 'component/bianji.png'"
          />
        </view>
      </view>
    </view>
	</radio-group>
  </view>
  
  </scroll-view>
	  <view class="flex-col justify-start items-center text-wrapper" @click="add"><text class="text_5">添加新地址</text></view> 
</view>

</template> 

<script setup lang="ts">
import emitter from '../../../utils/emitter';
import {onMounted, ref} from 'vue'
import { DomainName, PointsMallImgUrl } from '../../../common/global';
import { onShow } from "@dcloudio/uni-app";
import { userInfoStore } from '../../../store/user';
const userStore = userInfoStore()

const addressList = ref([])
const specificAddress = ref([])

onMounted(() => {
	init()
})

onShow(() => {
	init()
})


 
const init = async () => {
	const res = await uni.request({
		url: DomainName + '/change/queryUserAllAddress',
		method: 'GET',
		data: {
			userId: userStore.user.id
		}
	})
	addressList.value = res.data.data
	
	for (var i = 0; i < addressList.value.length; i ++ ){
		specificAddress.value[i] = addressList.value[i].region.split('/').join('') + ' ' + addressList.value[i].detailAddress
		if(specificAddress.value[i].length > 16){
			specificAddress.value[i] = specificAddress.value[i].slice(0, 16) + '...'
		}
	}
}


const onchange = (event:any) => {
	const idx = event.detail.value
	var temp = addressList.value[idx].region.split('/').join('') + ' ' + addressList.value[idx].detailAddress
	const addId = addressList.value[idx].id
	// if(temp.length > 14) temp = temp.slice(0, 14) + '...'
	emitter.emit('addAddressOrder', temp)
	emitter.emit('addId', addId)
	emitter.emit('close')
}


const close = () => {
	emitter.emit('close')
}


const add = () => { 
	uni.navigateTo({
		url: '../saveAddress/saveAddress?isAdd=true'
	})
}


const delId = ref(0)

const delAddress = async () => {
	const res = await uni.request({
		url: DomainName + '/change/deleteUserAddressById',
		method: 'GET',
		data: {
			id: delId.value
		}
	})
	console.log(res)
	init()
}



const del = (idVal:any) => {
	delId.value = idVal
	emitter.on('delAddress', () => {
		delAddress()
	})
	emitter.emit('pop')
	
}

const edit = (obj:any) => { 
	uni.navigateTo({
		url: '../saveAddress/saveAddress?isAdd=false&obj=' + JSON.stringify(obj)
	})
}


</script>

<style lang="scss" scoped>
	.scroll-view{
		height: 520rpx;
	}
	.section {
	  padding: 37.05rpx 0 35.16rpx;
	  background-color: #ffffff;
	  border-radius: 35.16rpx 35.16rpx 0rpx 0rpx;
	  .group {
	    padding: 0 25.78rpx 3.52rpx;
	    .text {
	      color: #000000;
	      font-size: 42.19rpx;
	      font-family: Open Sans;
	      line-height: 39.12rpx;
	    }
	    .image {
	      width: 42.19rpx;
	      height: 42.19rpx;
	    }
	    .pos {
	      position: absolute;
	      right: 25.78rpx;
	      top: 50%;
	      transform: translateY(-50%);
	    }
	  }
	  .group_1 {
	    margin-top: 46.88rpx;
	    .group_2 {
		  margin-bottom: 40rpx;
	      padding-bottom: 25.78rpx;
	      border-bottom: solid 2.34rpx #ebebeb;
	      .group_3 {
	        padding: 0;
	        .section_2 {
	          background-color: #ffffff;
	        }
	        .font {
	          font-size: 32.81rpx;
	          font-family: Open Sans;
	          color: #000000;
	        }
	        .text_2 {
	          line-height: 30.28rpx;
	        }
	        .text_3 {
	          line-height: 24.09rpx;
	        }
	      }
	      .group_4 {
	        padding-left: 70.55rpx;
	        padding-right: 25.78rpx;
	        .text_4 {
	          color: #9ca1b1;
	          font-size: 28.13rpx;
	          font-family: Open Sans;
	          line-height: 26.2rpx;
	        }
	        .image_2 {
	          width: 44.53rpx;
	          height: 44.53rpx;
	        }
	        .image_3 {
	          margin-top: 2.34rpx;
	          margin-bottom: 2.34rpx; 
	          width: 39.84rpx;
	          height: 39.84rpx;
	        }
	      }
	    }
	  }
	  .text-wrapper {
	    margin: 30rpx 39.84rpx 0 37.5rpx;
	    padding: 22.08rpx 0 22.31rpx;
	    background-color: #00ba9c;
	    border-radius: 117.19rpx;
	    .text_5 {
	      color: #ffffff;
	      font-size: 37.5rpx;
	      font-family: Open Sans;
	      font-weight: 700;
	      line-height: 35.3rpx;
	    }
	  }
	}
	
	@import url(./css/global1.css);  
</style>
<template>
	<view class="flex-row relative page">
	  <image
	    class="image pos"
	    :src="good.url"
	  />
	  <view class="flex-col section pos_2">
	    <view class="flex-row items-baseline self-stretch group">
	      <text class="text">{{good.price}}</text>
	      <text class="text_2">积分</text>
	    </view>
	    <text class="mt-10 self-start font text_3">{{good.name}}</text>
	    <text class="mt-10 self-start text_4">{{good.type}}</text>
	    <view class="mt-10 flex-row justify-between self-stretch group_2">
	      <view class="flex-row group_3">
	        <text class="font_2 text_6">创客实验室</text>
	        <text class="font_2 text_5">权益提供方-</text>
	      </view>
	      <view class="flex-row items-baseline group_4">
	        <text class="font_2 text_7">已兑换</text>
	        <text class="ml-4 font_2 text_8">{{good.sales}}</text>
	        <text class="ml-4 font_2 text_9">件</text>
	      </view>
	    </view>
	  </view>
	  <view class="flex-col section_2 pos_3">
	    <view class="flex-row justify-between items-center" @click="jumpToChange">
	      <view class="flex-row items-baseline">
	        <text class="font_3">已选 :</text>
	        <text class="font text_10">{{good.name}},</text>
	        <text class="font text_11">{{changeCnt}}</text>
	        <text class="font">件</text>
	      </view>
	      <image
	        class="image_2"
	        :src="PointsMallImgUrl + 'payOrder/yjt.png'"
	      />
	    </view>
	    <view class="flex-row justify-between items-center mt-27" @click="jumpToAddress">
	      <view class="flex-row">
	        <text class="font_3 text_12">送至 :</text>
	        <text class="ml-14 font_3 text_13">{{tempAddress}}</text>
	      </view>
	      <image
	        class="image_2"
	        :src="PointsMallImgUrl + 'payOrder/yjt.png'"
	      />
	    </view>
	  </view>
	  <view class="flex-col section_3 pos_4">
	    <text class="self-start font text_14">商品详情</text>
	    <view class="mt-12 flex-col self-stretch group_5">
	      <text class="self-stretch font text_15">
	        {{good.detail}}
	      </text>
	      <image
			mode="aspectFit"
	        class="shrink-0 self-center image_3"
	        :src="good.url"
	      />
	    </view>
	  </view>
	  <view class="flex-col justify-start section_4 pos_5">
	    <view class="flex-row justify-center items-center button section_5" @click="cPop">
	      <text class="text_16">{{changePrice}}</text>
	      <text class="ml-4 font text_17">积分兑换</text>
	    </view>
	  </view>
	</view>
	
	<uni-popup ref="popup" background-color="#fff" @change="change">
					<view class="popup-content">
						<addressVue></addressVue>
					</view>
	</uni-popup>
	
	<uni-popup ref="change" background-color="#fff" @change="change">
					<view class="popup-content">
						<changeVue :good="good"></changeVue>
					</view>
	</uni-popup>
	
	<uni-popup ref="alertDialog" type="dialog">
						<view class="pop">
							<popupVue></popupVue>
						</view>
	</uni-popup>
	
	<uni-popup ref="cAlertDialog" type="dialog">
						<view class="pop">
							<cPopupVue :changePrice="changePrice"></cPopupVue>
						</view>
	</uni-popup>
	
	<uni-popup ref="success" type="dialog">
						<view class="pop">
							<changeSuccessVue></changeSuccessVue>
						</view>
	</uni-popup>
</template>

<script lang="ts" setup>
	import { DomainName, PointsMallImgUrl } from '../../../common/global';
	import {onMounted, ref} from 'vue' 
	import addressVue from '../component/address.vue'
	import emitter from '../../../utils/emitter'
    import popupVue from '../component/popup.vue';
	import changeVue from '../component/change.vue';
	import cPopupVue from '../component/cPopup.vue';
	import changeSuccessVue from '../component/changeSuccess.vue';
	import { onLoad } from "@dcloudio/uni-app";
	import { userInfoStore } from '../../../store/user';
	const userStore = userInfoStore()
	
	const good = ref([])
	
	const changePrice = ref(0)
	const changeCnt = ref(1)
	
	const tempAddress = ref('请输入/选择地址')
	
	const realAddress = ref('')
	
	const addId = ref(0)
	
	onLoad((options) => {
		good.value = JSON.parse(options.good)
		changePrice.value = good.value.price
		console.log(good.value)
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
			realAddress.value = (res.data.data.region + ' ' + res.data.data.detailAddress).split('/').join('')
			tempAddress.value = (res.data.data.region + ' ' + res.data.data.detailAddress).split('/').join('')
			if(tempAddress.value.length > 14)
			tempAddress.value = tempAddress.value.slice(0, 14) + '...'
		}

	}
	
	
	const pointsChangeGoods = async () => {
		if(tempAddress.value == '请输入/选择地址'){
			uni.showToast({
				title: '请选择地址',
				icon: 'fail'
			})
			return ;
		}
		const res = await uni.request({
			url: DomainName + '/change/pointsChangeGoods',
			method: 'POST',
			data: {
				orderDate: getDate(),
				goodId: good.value.id,
				addressId: addId.value,
				quantity: changeCnt.value,
				userId: userStore.user.id
			}
		})
		console.log(res)
		if(res.data.code == '200'){
			successPop()
		}else{
			uni.showToast({
				title: '积分不足',
				icon: 'fail'
			})
		}
	}
	
	
	onMounted(() => { 
		emitter.on('open', () => {
			open()
		})
		emitter.on('close', () => {
			close()
		})
		emitter.on('pop', () => {
			pop()
		})
		emitter.on('cClose', (obj:any) => {
			cClose(obj)
		})
		emitter.on('cPopClose', () => {
			cPopClose()
		})
		emitter.on('successPop', () => {
			successPop()
		})
		emitter.on('popClose', () => {
			popClose()
		})
		emitter.on('cPop', () => {
			cPop()
		})
		
		emitter.on('changeGoods', () => {
			pointsChangeGoods()
		})
		
		emitter.on('addId', (val:any) => {
			addId.value = val
		})
		
		emitter.on('addAddressOrder', (val:any) => {
			realAddress.value = val
			tempAddress.value = val
			if(tempAddress.value.length > 14) 
			tempAddress.value = tempAddress.value.slice(0, 14) + '...'
		})
		
		getDefaultAddress()
		
	}) 
	 
	const jumpToAddress = () => {
		open()
	}
	const popup = ref(null)
	
	const open = () => {
		popup.value.open('bottom')
	}
	const close = () => {
		popup.value.close()
	}
	
	
	const jumpToChange = () => {
		cOpen()
	}
	
	const change = ref(null)
	const cOpen = () => {
		change.value.open('bottom')
	}
	const cClose = (obj:any) => {
		if(obj.confirm){
			changePrice.value = obj.cnt * good.value.price
			changeCnt.value = obj.cnt
		}
		change.value.close()
	}
	
	
	
	const alertDialog = ref(null)
	const cAlertDialog = ref(null)
	const success = ref(null)
	
	const successPop = () => {
		success.value.open()
	}
	
	const pop = () => {
		alertDialog.value.open()
	}
	
	const popClose = () => {
		alertDialog.value.close()
	}
	
	const cPop = () => {
		cAlertDialog.value.open()
	}
	
	const cPopClose = () => {
		cAlertDialog.value.close()
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

.section, .section_2, .section_3{
	margin-top: 50rpx;
}
.mt-27 {
  margin-top: 63.28rpx;
}
.page {
  padding: 614.06rpx 37.5rpx 173.44rpx;
  background-color: #f3f3f6;
  mix-blend-mode: LUMINOSITY;
  height: 2135.16rpx;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .image {
    width: 100vw;
    height: 81.875vw;
  }
  .pos {
    position: absolute;
    left: 0;
    right: -2.34rpx;
    top: 0;
  }
  .section {
    padding-top: 37.5rpx;
    background-color: #ffffff;
    border-radius: 23.44rpx;
    .group {
      padding: 0 37.5rpx;
      .text {
        color: #00ba9c;
        font-size: 56.25rpx;
        font-family: Times New Roman;
        font-weight: 700;
        line-height: 38.79rpx;
      }
      .text_2 {
        color: #00ba9c;
        font-size: 30.47rpx;
        font-family: Rockwell Condensed;
        line-height: 27.91rpx;
      }
    }
    .text_3 {
      margin-left: 28.13rpx;
      line-height: 34.64rpx;
    }
    .text_4 {
      margin-left: 28.13rpx;
      color: #454e6c;
      font-size: 32.81rpx;
      font-family: Open Sans;
      line-height: 30.33rpx;
    }
    .group_2 {
      padding: 37.5rpx 18.75rpx;
      border-top: solid 2.34rpx #e5e5e5;
      .group_3 {
        width: 295.29rpx;
		margin-top: 0;
        .text_6 {
          margin-left: 150rpx;
          color: #000000;
        }
        .text_5 {
          margin-left: -295.31rpx;
        }
      }
      .group_4 {
        margin-right: 9.38rpx;
        .text_7 {
          line-height: 25.97rpx;
        }
        .text_8 {
          line-height: 20.67rpx;
        }
        .text_9 {
          line-height: 25.76rpx;
        }
      }
      .font_2 {
        font-size: 28.13rpx;
        font-family: Open Sans;
        line-height: 26.04rpx;
        color: #454e6c;
      }
    }
  }
  .pos_2 {
    position: absolute;
    left: 37.5rpx;
    right: 35.16rpx;
    top: 614.06rpx;
  }
  .section_2 {
    padding: 28.13rpx 23.44rpx 32.81rpx 32.81rpx;
    background-color: #ffffff;
    border-radius: 23.44rpx;
    .font_3 {
      font-size: 30.5rpx;
      font-family: Open Sans;
      line-height: 34.36rpx;
      color: #9ca1b1;
    }
    .text_10 {
      margin-left: 23.44rpx;
      line-height: 36.49rpx;
    }
    .text_11 {
      margin-left: 9.38rpx;
      line-height: 27.16rpx;
    }
    .image_2 {
      width: 30.47rpx;
      height: 30.47rpx;
    }
    .text_12 {
      line-height: 34.2rpx;
    }
    .text_13 {
      line-height: 34.69rpx;
    }
  }
  .pos_3 {
    position: absolute;
    left: 37.5rpx;
    right: 35.16rpx;
    top: 50%;
    transform: translateY(-50%);
  }
  .font {
    // font-size: 37.5rpx;
    font-family: Open Sans;
    line-height: 34.36rpx;
    color: #000000;
  }
  .section_3 {
    padding: 37.5rpx 37.5rpx 42.19rpx;
    background-color: #ffffff;
    border-radius: 23.44rpx;
    .text_14 {
      line-height: 34.62rpx;
    }
    .group_5 {
      margin-right: 14.06rpx;
      .text_15 {
        line-height: 46.88rpx;
        word-break: break-all;
      }
      .image_3 {
        margin-top: -9.38rpx;
        width: 349.22rpx;
        height: 339.84rpx;
      }
    }
  }
  .pos_4 {
    position: absolute;
    left: 37.5rpx;
    right: 35.16rpx;
    top: 1200rpx;
  }
  .section_4 {
    padding: 25.78rpx 0 39.84rpx;
    background-color: #ffffff;
    .button {
      margin: 0 46.88rpx;
      .text_16 {
        color: #ffffff;
        font-size: 37.5rpx;
        font-family: Times New Roman;
        font-weight: 700;
        line-height: 25.85rpx;
      }
      .text_17 {
        color: #ffffff;
        font-weight: 700;
        line-height: 35.55rpx;
      }
    }
    .section_5 {
      padding: 23.44rpx 0;
      background-color: #00ba9c;
      border-radius: 117.19rpx;
    }
  }
  .pos_5 {
    position: fixed;
    left: 0;
    right: -2.34rpx;
    bottom: 0;
  }
}

@import url('../css/global2.css');

</style>

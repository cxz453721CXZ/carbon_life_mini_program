<template>
	<view class="flex-row relative page" >
	  <text class="font text pos">积分商城</text>
	  <image
	    class="image pos_2"
	    :src="PointsMallImgUrl + 'pointsMall/jfsc.png'"
	  />
	  <image 
	    class="image_3 pos_4"
	    :src="PointsMallImgUrl + 'pointsMall/tip.png'"
	  />
	  <image
	    class="image_2 pos_3" 
	    :src="PointsMallImgUrl + 'pointsMall/sp.png'"
	  />
	  <view class="flex-col justify-start group pos_5">
	    <view class="flex-col section_2">
	      <text class="self-start text_5">超值推荐</text>
	      <view class="flex-row self-stretch relative grid mt-23">
	        <view @click="jumpToOrder(item)" class="flex-col grid-item pos_7" v-for="(item, index) in goodList" :key="index">
	          <image
				mode="aspectFill"
	            class="self-center image_4"
	            :src="item.url"
	          />
	          <text class="self-start font mt-12">{{goodName[index]}}</text>
	          <view class="flex-row self-stretch group_3 mt-12">
	            <view class="flex-row items-baseline flex-1 self-start">
	              <text class="font_3">{{item.price}}</text>
	              <text class="font_4 ml-3">积分</text>
	            </view>
	            <view class="flex-col justify-start items-center shrink-0 self-center text-wrapper_2 ml-12">
	              <text class="font_5 text_6">兑换</text>
	            </view>
	          </view>
	        </view>
	      </view>
	    </view>
	    <view class="flex-row justify-between section pos_6">
	      <view class="flex-col items-start self-center">
	        <text class="font_2 text_2">我的积分</text>
	        <text class="text_4 mt-14">{{myPoints}}</text>
	      </view>
	      <view @click="jumpToDetail" class="flex-col justify-start self-start text-wrapper">
	        <text class="font_2 text_3">积分使用记录</text>
	      </view>
	    </view>
	  </view>
	</view>
</template>
 
<script lang="ts" setup>
	import { DomainName, PointsMallImgUrl } from '../../../common/global';
	import {onMounted, ref} from 'vue'
	import { userInfoStore } from '../../../store/user';
	import emitter from '../../../utils/emitter';
	import { onShow } from "@dcloudio/uni-app";
	const userStore = userInfoStore()
	
	
	const myPoints = ref(0)
	const goodList = ref([])
	const goodName = ref([])
	
	const updateMyPoints = async () => {
		const res = await uni.request({
			url: DomainName + '/change/queryUserPoints',
			method: 'GET',
			data: {
				userId: userStore.user.id
			}
		})
		myPoints.value = res.data.data
	}
	
	onMounted(async () => {
		updateMyPoints()
		
		const response = await uni.request({
			url: DomainName + '/change/queryAllGoods',
			method: 'GET'
		})
		goodList.value = response.data.data
		for (var i = 0; i < goodList.value.length; i ++ ){
			if(goodList.value[i].name.length > 5){
				goodName.value[i] = goodList.value[i].name.slice(0, 5) + '...'
			}else{
				goodName.value[i] = goodList.value[i].name
			}
		}
		console.log(goodName.value)
	})
	
	onShow(() => {
		updateMyPoints()
		emitter.off('changeGoods')
	})
	

	const jumpToOrder = (item:any) => {
		uni.navigateTo({
			url: '../payOrder/payOrder?good=' + JSON.stringify(item)
		})
	}
	
	const jumpToDetail = () => {
		uni.navigateTo({
			url: '../orderDetail/orderDetail'
		})
	}
</script>

<style lang="scss">
.mt-23 {
  margin-top: 53.91rpx;
}
.ml-3 {
  margin-left: 7.03rpx;
}
.page {
  padding: 37.5rpx 16.41rpx 1434.38rpx;
  background-color: #20eb9d;
  mix-blend-mode: LUMINOSITY;
  height: 1809.38rpx;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .font {
    font-size: 37.5rpx;
    font-family: Roboto;
    line-height: 35.37rpx;
    font-weight: 600; 
    color: #626161;
  }
  .text {
    color: #000000;
    line-height: 34.69rpx;
    font-weight: unset;
  }
  .pos {
    position: absolute;
    left: 50%;
    top: 38.81rpx;
    transform: translateX(-50%);
  }
  .image {
    width: 459.38rpx;
    height: 145.31rpx;
  }
  .pos_2 {
    position: absolute;
    left: 16.41rpx;
    top: 110.16rpx;
  }
  .image_3 {
    width: 372.66rpx;
    height: 65.63rpx;
  }
  .pos_4 {
    position: absolute;
    left: 21.09rpx;
    top: 255.47rpx;
  }
  .image_2 {
    width: 227.34rpx;
    height: 264.84rpx;
  }
  .pos_3 {
    position: absolute;
    right: 44.53rpx;
    top: 110.16rpx;
  }
  .group {
    padding-top: 75rpx;
    .section_2 {
      padding: 173.44rpx 44.53rpx 60.94rpx;
      background-color: #f2faf7;
      border-radius: 46.88rpx 46.88rpx 0rpx 0rpx;
      .text_5 {
        color: #000000;
        font-size: 56.25rpx;
        font-family: Roboto;
        font-weight: bold;
        line-height: 52.99rpx;
      }
      .grid {
        display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
        grid-template-rows: repeat(3, minmax(0, 1fr));
        grid-template-columns: repeat(2, minmax(0, 1fr));
        // row-gap: 41.84rpx; 
        column-gap: 39.49rpx;
        .grid-item {
          padding: 24.06rpx 26.41rpx 24.06rpx 28.13rpx;
          background-color: #ffffff;
          border-radius: 23.44rpx;
		  margin-bottom: 30rpx;
          .image_4 {
            width: 244.06rpx;
            height: 164.06rpx;
          }
          .font_3 {
            font-size: 37.5rpx;
            font-family: Times New Roman;
            line-height: 25.85rpx;
            font-weight: 700;
            color: #ff0000;
          }
          .font_4 {
            font-size: 23.44rpx;
            font-family: Rozha One;
            line-height: 21.47rpx;
            color: #ff0000;
          }
          .text-wrapper_2 {
            padding: 4.69rpx 0;
            background-color: #01d283;
            border-radius: 46.88rpx;
            width: 100.78rpx;
            height: 32.81rpx;
            .font_5 {
              font-size: 23.44rpx;
              font-family: Sansita;
              line-height: 21.47rpx;
              color: #ffffff;
            }
            .text_6 {
              line-height: 21.63rpx;
            }
          }
        }
      }
    }
    .section {
      padding: 37.5rpx 37.5rpx 46.88rpx 51.56rpx;
      border-radius: 11.72rpx;
      background-image: url('https://carbon2.obs.cn-north-4.myhuaweicloud.com/carbon-life-static/PointsMall/pointsMall/bgc.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 639.84rpx;
      .font_2 {
        font-size: 28.13rpx;
        font-family: Roboto;
        line-height: 25.85rpx;
      }
      .text_2 {
        color: #000000;
        line-height: 26.13rpx;
      }
      .text_4 {
        color: #000000;
        font-size: 51.56rpx;
        font-family: Times New Roman;
        line-height: 35.46rpx;
      }
      .text-wrapper {
        margin-top: 18.75rpx;
        padding: 18.75rpx 0;
        background-color: #00d282;
        border-radius: 46.88rpx;
        height: 67.97rpx;
        .text_3 {
          margin: 0 14.06rpx;
          color: #ffffff;
          font-weight: 600;
          line-height: 26.7rpx;
        }
      }
    }
    .pos_6 {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
  }
  .pos_5 {
    position: absolute;
    left: 0;
    right: -2.34rpx;
    top: 337.5rpx;
  }
}

@import url('../css/global2.css');
</style>

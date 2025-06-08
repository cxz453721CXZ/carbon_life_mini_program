<template>
   <view class="notice" >
      <view class="ca">平台维护，活动通知 </view>
    </view>
      <swiper class="swiper" duration="200" circular="true" interval="2000" autoplay="true" disable-touch="ture">
     	<swiper-item>
      		<image :src="HomeImgUrl + 'banner1.png'" mode="scaleToFill" style=" height: 500rpx; width: 750rpx;" ></image>
      	</swiper-item>
      	<swiper-item>
      		<image :src="HomeImgUrl + 'banner2.png'" mode="scaleToFill" style="height: 500rpx; width: 750rpx;"></image>
      	</swiper-item>
      	<swiper-item>
      		<image :src="HomeImgUrl + 'banner3.png'" mode="scaleToFill" style="height: 500rpx; width: 750rpx;" ></image>
      	</swiper-item>
      </swiper>  
          <view  style="width: 100%; height: auto;margin-top: 5rpx;">
            <view class="main-body">
              <view v-for="item in images">
                <view  @click="jump(item.path)">
                 <image :src="item.img" alt="" style="height: 55px; width: 55px;"></image>
                </view>
                 {{item.name}}
              </view>
            </view>
		  </view>	
		  <view class="insertContent">
			      <view class="mark"></view>
			      <view>环保内容推荐</view> 
			  </view>
        <view >
        	<view class="Essay" v-for="item in essay">
        		<view class="essay" @click="develop">
        		<image :src="item.img"></image>
        		<view>{{item.title}}</view>
        		</view>
        	</view> 
        </view>
    </template>
    
    <script setup lang="ts">
	
	import { onMounted } from 'vue';
import { userInfoStore } from '../../store/user';
import { DomainName } from '../../common/global';
	const userStore = userInfoStore()
	
	onMounted( async () => {
		const response = await uni.request({
			url: DomainName + '/test/session',
			method: 'GET',
		})
		console.log(response); 
		userStore.user = response.data.data
	})
	
	const develop = () => {
		uni.showToast({
			title: '正在开发中',
			icon: 'exception'
		})
	}
	
    function jump(value:any){ 
		if(value == '/Views/GreeChallenge/index/index'){
			if(userStore.user.id == '000000'){
				uni.showToast({
					title: '请先登录',
					icon: 'fail'
				})
				return ;
			}
		}
		
		if(value == '/Views/GreenTravel/index/index'){
			if(userStore.user.id == '000000'){
				uni.showToast({
					title: '请先登录',
					icon: 'fail'
				})
				return ;
			}
		}
		
		if(value == '/Views/Page/pointsMall/pointsMall'){
			if(userStore.user.id == '000000'){
				uni.showToast({
					title: '请先登录',
					icon: 'fail'
				})
				return ;
			}
		}
		
		if(value == '/Views/donate/index/index'){
			if(userStore.user.id == '000000'){
				uni.showToast({
					title: '请先登录',
					icon: 'fail'
				})
				return ;
			}
		}
		
        uni.navigateTo({
            url: value
        })
    } 
    import {reactive} from "vue";
	
    import {ref} from 'vue'
    
	import { HomeImgUrl } from '../../common/global';
    
    const images = ref([
      {
        name: '知识挑战',
        img: HomeImgUrl + 'kownledgetz.png',
        path:'/Views/GreeChallenge/index/index',
      },
      {
        name: '积分商城',
        img: HomeImgUrl + 'pointsMall.png',
        path:'/Views/Page/pointsMall/pointsMall',
      },
	  {
	    name: '绿色挑战',
	    img: HomeImgUrl + 'lvsetz.png',
	  		path:'/Views/GreenTravel/index/index',
	  },
	  {
	    name: '碳行者',
	    img: HomeImgUrl + 'carboner.png',
		path:'/Views/GreenTravel/index/index'
	  },
	  {
		  name:'爱心捐赠',
		  img: HomeImgUrl + 'juanzeng.png',
		  path:'/Views/donate/index/index',
	  }
    ])
	const essay = reactive([
		{
			img:HomeImgUrl + 'zx1.png',
			title:"废纸如何进行回收再利用？"
		},
		{
			img:HomeImgUrl + 'zx2.png',
			title:"环保创意风车在优化生态环境层面有哪些实际意义？"
		},
		{
			img:HomeImgUrl + 'zx3.png',
			title:"新型环保机器人通过检测空气含氧量维持树木生长"
		},
		{
			img:HomeImgUrl + 'zx4.png',
			title:"如何构建生态环保社区？"
		}
	])
    </script>
    
    <style lang="scss">
	.insertContent{
		width: 135px;
		font-size: 20px;
		margin: 5px 0 0 15px;
		.mark{
			height: 20px;
			width: 5px;
			background-color: seagreen;
		}
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.main-body{
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 200rpx;
		text-align: center;
	}
    .notice{
		width: 100%;
      background: white;
      line-height: 50rpx;
	  position: fixed;
	  top: 0;
	  z-index: 9;
	  background-color: rgb(255, 255, 255,0.0);
	  .ca{
	    position: absolute;
	    left: 40px;
	    top: 5px;
	    font-size: 20px;
	  }
    }
    .Eight{
      margin-top: 13px;
      border-top: 1px solid #2c2c2c;
      border-radius: 20px;
      z-index: 80;
      padding-top: 10px;
      background-color: white;
    }
	.essay{
		height: 450rpx;
		width: 320rpx;
		border-radius: 20px;
		margin: 10px;
		float: left;
		border: 1px solid #d2d2d2;
		font-size: 13px;
		text-align: center;
		image{
			height: 300rpx;
			width: 270rpx;
			margin: 25rpx;
		}
	}
    .tag-g{
      font-size: 15px;
    }
    </style>
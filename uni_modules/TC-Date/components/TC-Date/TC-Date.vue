<template>
	<view class="zong">
		<view>
			<view class="top">
				<!-- 上个月 -->
				<view class="sgy" @click="sgy">◀</view>
				<view class="nianyue">
					{{ year }}年{{ month + 1 }}月
				</view>
				<!-- 下个月 -->
				<view class="xgy" @click="xgy">▶</view>
				<view class="tzjinri" @click="tzjinri">
					今日
				</view>
			</view>
		</view>
		<!-- 周期 -->
		<view class="days">
			<view class="dayss" v-for="(item,index) in days" :key="index">
				{{item.week}}
			</view>
		</view>
		<!-- 天数 -->
		<view class="tian">
			<view style="color: grey;" class="tians" v-for="(itemm,indexx) in qnumbers" :key="indexx"
				@click="qdianjitian(year , month , itemm)">
				{{itemm}}
			</view>
			<view class="tians" v-for="(item,index) in numbers" :key="index"
				:class="{ 'highlight': item === day && pdjr === true }" @click="dianjitian(year , month + 1 , item)">
				{{item}}
				<text v-if="item === day && pdjr === true" class="jinriziyang">今日</text>

				<text v-if="dianjizhi.includes(JSON.stringify(year)+JSON.stringify(month + 1) + JSON.stringify(item) )"
					class="qiandaozhi">已签</text>
			</view>
			<view style="color: grey;" class="tians" v-for="(itemmm,indexxx) in houmianbuqi" :key="indexxx"
				@click="hdianjitian(year , month + 1 , itemmm)">
				{{itemmm}}
			</view>
		</view>
	</view>

</template>

<script setup>
	import {
		onMounted,
		ref,
		watch
	} from "vue";
	// 获取当前年月日
	const currentDate = new Date();
	// 获取当前年
	const year = ref(currentDate.getFullYear());
	// 获取当前月
	const month = ref(currentDate.getMonth());
	// 获取当前日
	const day = ref(currentDate.getDate());
	// 当天年月日
	const teday = ref()
	// 判断是否是今日
	const pdjr = ref(false)
	// 获取当前周期
	const week = ref(currentDate.getDay())
	// 获取当前月的总天数
	const totalDaysInMonth = ref();
	// 当前月的整体天数
	const numbers = ref([]);
	// 当前月的1号是星期几
	const weekdate = ref()
	// 当月前的空数据
	const qnullnumber = ref()
	// 当月后面补齐的差的数据
	const hnullnumber = ref()
	// 前一个月的数据
	const qnumber = ref()
	// 前一个月补充的天数
	const qnumbers = ref()
	// 补充到后面的数据
	const houmianbuqi = ref()
	// 被点击后赋值 进行签到
	const dianjizhi = ref([])
	// 是否已签到
	const yiqiandao = ref()

	// 周期
	const days = ref([{
			id: 0,
			week: '日'
		},
		{
			id: 1,
			week: '一'
		},
		{
			id: 2,
			week: '二'
		},
		{
			id: 3,
			week: '三'
		},
		{
			id: 4,
			week: '四'
		},
		{
			id: 5,
			week: '五'
		},
		{
			id: 6,
			week: '六'
		},
	])
	// 程序加载完获取当日日期
	onMounted(() => {
		huoqu()
	})
	// 上个月
	function sgy() {
		// 如果月数小于1那就恢复到12月
		if (month.value <= 0) {
			month.value = 11
			year.value = year.value - 1
		} else {
			month.value = month.value - 1
			// console.log("上个月", month.value)
		}
		huoqu()
	}
	// 下个月
	function xgy() {
		// 如果月数大于12那就恢复到1月
		if (month.value >= 11) {
			month.value = 0
			year.value = year.value + 1
		} else {
			month.value = month.value + 1
			// console.log("下个月", month.value)
		}
		huoqu()
	}
	// 跳转到当日
	function tzjinri() {
		// 获取当前年月日
		const jcurrentDate = new Date();
		// 获取当前年
		year.value = jcurrentDate.getFullYear();
		// 获取当前月
		month.value = jcurrentDate.getMonth();
		// 获取当前日
		day.value = jcurrentDate.getDate();
		huoqu()
	}


	// 点击天数
	function dianjitian(iyear, imouth, item) {

		const Y = JSON.stringify(iyear)
		const M = JSON.stringify(imouth)
		const D = JSON.stringify(item)
		const iqriqi = Y + M + D
		yiqiandao.value = iqriqi
		console.log("点击天数", yiqiandao.value)
		if (dianjizhi.value.includes(iqriqi)) {
			// 如果已点击，则取消点击状态
			dianjizhi.value = dianjizhi.value.filter(i => i !== iqriqi);
			console.log('55', dianjizhi.value)
		} else {
			// 如果未点击，则添加点击状态
			dianjizhi.value.push(iqriqi);
			dianjizhi.value = Array.from(new Set(dianjizhi.value));
			console.log('44', dianjizhi.value)
		}
	}
	// 上个月点击天数
	function qdianjitian(iyear, imouth, item) {
		let itemm = 0
		// 如果月数小于1那就恢复到12月
		if (month.value <= 0) {
			itemm = 12
		} else {
			itemm = imouth
			// console.log("上个月", month.value)
		}
		const Y = JSON.stringify(iyear)
		const M = JSON.stringify(imouth)
		const D = JSON.stringify(item)
		const iqriqi = Y + itemm + D
		console.log("上个点击天数", iqriqi)
	}
	// 下个月点击天数
	function hdianjitian(iyear, imouth, item) {
		let itemm = 0
		// 如果月数大于12那就恢复到1月
		if (month.value >= 11) {
			itemm = 1
		} else {
			itemm = imouth
			// console.log("下个月", month.value)
		}
		const Y = JSON.stringify(iyear)
		const M = JSON.stringify(imouth)
		const D = JSON.stringify(item)
		const iqriqi = Y + itemm + D
		console.log("点击天数", iqriqi)
	}
	// 获取天数
	function huoqu() {
		const nian = year.value;
		const yue = month.value;
		const ri = day.value
		const jyue = yue + 1
		teday.value = nian + jyue + ri
		// 判断是否是今日,是今日给当日加背景
		const today = new Date();
		const jyear = today.getFullYear();
		const jmonth = today.getMonth() + 1; // 月份从0开始，所以要加1
		const jday = today.getDate();
		const jinri = jyear + jmonth + jday
		if (jinri === teday.value) {
			pdjr.value = true
			console.log("是今日")
		} else {
			pdjr.value = false
		}

		console.log("今天是", jinri, pdjr.value)
		console.log("随机年月日", teday.value)
		// 获取当月总天数
		totalDaysInMonth.value = new Date(nian, yue + 1, 0).getDate();
		// 获取当月1号是星期几
		weekdate.value = new Date(nian, yue, 1).getDay();
		// 周如果等于0加1
		if (weekdate.value === 0) {
			weekdate.value += 1
			// console.log("周等于0", syue)
		} else {
			// console.log("周不等于0", syue)	
		}
		// 当月前空数据
		// 通过查找周期数据，返回前面有几个空数据
		const id = weekdate.value;
		const index = days.value.findIndex(item => item.id === id);
		const count = index >= 0 ? index : 0;
		qnullnumber.value = count
		console.log(`当月前面有${qnullnumber.value}个数据`);

		console.log(`星期`, weekdate.value);
		// 给当月的前添加上个月多出的天数
		const number = [];
		for (let i = 1; i <= totalDaysInMonth.value; i++) {
			number.push(i);
		}
		// 获取上个月末尾的天数补充到当月前的空数据
		console.log("月", yue)
		let syue = yue
		if (syue === 0) {
			syue += 1
			// console.log("月等于0", syue)
		} else {
			// console.log("月不等于0", syue)	
		}
		const snumber = new Date(nian, syue, 0).getDate();
		const snumberss = [];
		for (let i = 1; i <= snumber; i++) {
			snumberss.push(i);
		}
		qnumber.value = snumberss
		// console.log("上个月天数", qnumber.value)
		// 从上个月天数后面开始取后本月缺少的空值
		const snum = qnullnumber.value
		const lastFour = qnumber.value.slice(-snum);
		qnumbers.value = lastFour
		console.log("上个月后面的天数", number);

		// 只显示前35个天数
		const slicedArray = number.slice(0, 35 - snum);
		// 查看数据是否满35个
		const tianshushuju = slicedArray.length;
		let chashu = ''
		let houbuqi = []
		if (tianshushuju < 35) {
			chashu = 35 - tianshushuju - snum

		} else {
			console.log("已够35个")
		}
		// 后面的差数赋值
		hnullnumber.value = chashu
		console.log("差", hnullnumber.value)
		for (let i = 0; i < chashu; i++) {
			houbuqi.push(i + 1); // 补齐数据，从1开始递增
		}
        
		numbers.value = slicedArray
		houmianbuqi.value = houbuqi
		console.log("当月天数", houbuqi)

	}
</script>

<style>
	/* 总效果 */
	.zong {
		width: 650rpx;
		margin-left: 7%;
		margin-top: 10rpx;
	}

	/* 月份切换视图 */
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;
		border-bottom: 1rpx solid #dadada;
		padding-bottom: 20rpx;
	}

	.sgy,
	.xgy,
	.nianyue {
		flex: 1;
		text-align: center;
	}

	.tzjinri {
		display: inline-block;
		width: 70rpx;
		background-color: #e1e1e1;
		padding-left: 10rpx;
		line-height: 50rpx;
		text-align: center;
		border-radius: 10px 0px 0px 10px;
		font-size: 30rpx;
	}


   
	/* 周期 */
	.days {
		
		
		display: inline-flex;
		justify-content: space-between;
		width: 100%;
		margin-top: 20rpx;
		border-bottom: 1rpx solid #dadada;
		padding-bottom: 20rpx;
	}

	.dayss {
		width: 80rpx;
		text-align: center;
		padding-right: 23rpx;
		padding-left: 9rpx;
	}

	/* 天数 */
	.tian {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		margin-left: -30rpx;
		border-bottom: 1rpx solid #dadada;
		padding-bottom: 50rpx;
	}

	.tians {
		width: 45rpx;
		white-space: normal;
		align-items: center;
		justify-content: center;
		display: inline-grid;
		padding-left: 47rpx;
		padding-top: 50rpx;
		display: grid
			/* padding-right: 69rpx; */



	}

	/* 今日字样 */
	.jinriziyang {
		width: 48rpx;
		font-size: 10rpx;
		padding-top: 5rpx;
		margin-bottom: -10rpx;
		color: red;
	}

	/* 当日的天数的背景 */
	.highlight {
		/* background-color: #55aaff; */
		border-radius: 30rpx;
		font-weight: bold;
		font-size: 40rpx;
		height: 60rpx;
		margin-bottom: -20rpx;
	}

	/* 签到字样的 */
	.qiandaozhi {
		width: 50rpx;
		font-size: 10rpx;
		padding-top: 5rpx;
		margin-bottom: -25rpx;
		color: #55aaff;
		margin-left: -3rpx;
	}
</style>
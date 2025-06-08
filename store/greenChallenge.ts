import {defineStore} from 'pinia'
import { DomainName } from '../common/global'

export const gc = defineStore('greenChallenge', {

	actions: {
		checkCount: async (time:String, typeId:number, cnt:number, userId:number) => {
			const res = await uni.request({
				url: DomainName + '/challenge/selectCntByDate',
				method:'GET',
				data:{
					currentDate: time,
					typeId: typeId,
					userId: userId,
				}
			})
			if(res.data.data >= cnt) {
				uni.showToast({
					title: '今日挑战次数已上限',
					icon: 'exception'
				})
				return false
			}
			return true
		}
	}
})
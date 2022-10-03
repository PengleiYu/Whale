Page({
    data: {
        text: '',
    },
    fetchData: async function (isPull) {
        console.log(`fetchData called with [ ${isPull} ]`)
        let result = await wx.cloud.callFunction({
            // 云函数名称
            name: 'random',
            // 传给云函数的参数
            data: {},
        })

        console.log("call random", result)
        this.setData({
            text: result.result
        })
        if (isPull) {
            let stopRefreshResult = await wx.stopPullDownRefresh()
            console.log("call stopPullDownRefresh", stopRefreshResult)
        }
    },
    onLoad: async function (options) {
        await this.fetchData();
    },
    onPullDownRefresh: async function () {
        await this.fetchData(true)
    }
});
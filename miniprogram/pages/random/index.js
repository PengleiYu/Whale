Page({
    data: {
        text: '',
    },
    onLoad: async function (options) {
        // let randInt = Math.floor(Math.random() * 100);
        // this.setData({
        //     text: randInt + ""
        // })


        let result = await wx.cloud.callFunction({
            // 云函数名称
            name: 'random',
            // 传给云函数的参数
            data: {},
        })

        console.log(result)
        this.setData({
            text: result.result
        })
    }
});
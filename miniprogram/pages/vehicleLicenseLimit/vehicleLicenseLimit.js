class LimitInfo {
    city
    date
    week
    limitTime
    limitArea
    limitSummary
    limitNumber
    limitRule
}

Page({
    data: {
        text: "请求中",
        limitInfo: new LimitInfo(),
    },
    onLoad: function (options) {
        this.request()
    },
    request() {
        let that = this;
        wx.request({
            url: 'https://api.jisuapi.com/vehiclelimit/query', //仅为示例，并非真实的接口地址
            data: {
                appkey: 'b2660d7cf46f0de2',
                city: 'beijing',
                date: '2024-02-10',
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                let resData = res.data;
                let status = resData.status;
                let msg = resData.msg;
                let data = resData.result;
                let text = JSON.stringify(resData)
                console.log('success', text)
                let limitInfo = new LimitInfo();
                limitInfo.city = data.cityname
                limitInfo.date = data.date
                limitInfo.week = data.week
                limitInfo.limitTime = data.time?.join(",")
                limitInfo.limitArea = data.area
                limitInfo.limitNumber = data.number
                limitInfo.limitRule = data.numberrule
                limitInfo.limitSummary = data.summary
                that.setData({
                    limitInfo: limitInfo,
                })
            },
            fail(res) {
                let text = JSON.stringify(res)
                console.log('fail', text)
                that.setData({
                    text
                })
            },
        })
    },
});

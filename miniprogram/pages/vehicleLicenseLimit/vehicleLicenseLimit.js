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

const date = new Date()
const YEAR_COUNT = 10

function getFullDateArr() {
    const years = []
    const months = []
    const days = []
    let startYear = date.getFullYear() - 9;
    for (let i = startYear; i <= startYear + YEAR_COUNT; i++) {
        years.push(i)
    }
    for (let i = 1; i <= 12; i++) {
        months.push(i)
    }
    for (let i = 1; i <= 31; i++) {
        days.push(i)
    }
    return {years, months, days}
}

let fullDateArr = getFullDateArr();
const years = fullDateArr.years
const months = fullDateArr.months
const days = fullDateArr.days

function createLimitInfo(data) {
    let limitInfo = new LimitInfo();
    limitInfo.city = data.cityname
    limitInfo.date = data.date
    limitInfo.week = data.week
    limitInfo.limitTime = data.time?.join(",")
    limitInfo.limitArea = data.area
    limitInfo.limitNumber = data.number
    limitInfo.limitRule = data.numberrule
    limitInfo.limitSummary = data.summary
    return limitInfo;
}

const PICKER_INIT_INDEXES = [YEAR_COUNT - 1, date.getMonth(), date.getDate() - 1];
const INIT_DATE = {
    year: years[PICKER_INIT_INDEXES[0]],
    month: months[PICKER_INIT_INDEXES[1]],
    day: days[PICKER_INIT_INDEXES[2]],
};

Page({
    data: {
        text: "请求中",
        limitInfo: new LimitInfo(),
        years, months, days,
        year: INIT_DATE.year, month: INIT_DATE.month, day: INIT_DATE.day,
        value: PICKER_INIT_INDEXES,
        requestDate: "",
    },
    onLoad: function (options) {
        this.queryLimitInfo()
    },
    queryLimitInfo() {
        let that = this;
        let date = `${this.data.year}-${this.data.month}-${this.data.day}`
        wx.request({
            url: 'https://api.jisuapi.com/vehiclelimit/query', //仅为示例，并非真实的接口地址
            data: {
                appkey: 'b2660d7cf46f0de2',
                city: 'beijing',
                date: date,
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
                that.setData({
                    limitInfo: createLimitInfo(data),
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
    bindChange(e) {
        const val = e.detail.value
        let year = this.data.years[val[0]];
        let month = this.data.months[val[1]];
        let day = this.data.days[val[2]];
        this.setData({
            year, month, day,
        })
    }
});

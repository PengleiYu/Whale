import {aphorism_list} from "./aphorism.json"

const EMPTY_TEXT = "没有数据!"

function getDataSource() {
    return aphorism_list;
}

function getRandomInt(maxInt) {
    return Math.floor(Math.random() * maxInt);
}


function getRandomItem(dataSource) {
    let len = dataSource.length;
    let index = getRandomInt(len);
    return dataSource[index];
}

function formatItem(itemStr) {
  // return itemStr.replaceAll("；", "；\n")
  //   .replaceAll("。", "。\n")
    return itemStr;
}

Page({
    data: {
        text: EMPTY_TEXT,
    },
    dataSource: [],
    onLoad: function (options) {
        this.dataSource = getDataSource()
        this.refreshText()
    },
    onPullDownRefresh() {
        this.refreshText(true)
    },
    onShareAppMessage(options) {
        console.log(`onShareAppMessage: ${JSON.stringify(options)}`)
        return {
            title: '随机格言',
        }
    },
    onShareTimeline() {
        console.log(`onShareTimeline`)
    },
    refreshText(pullRefresh) {
        let randomAphorism = formatItem(getRandomItem(this.dataSource));
        if (pullRefresh) {
            wx.stopPullDownRefresh()
        }
        setTimeout(() => {
            this.setData({
                text: randomAphorism ?? EMPTY_TEXT
            })
        }, 500)
    },
});

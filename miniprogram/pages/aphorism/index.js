import {aphorism_list} from "./aphorism.json"

const EMPTY_TEXT = "白茫茫大地真干净！"

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
    refreshText(pullRefresh) {
        let randomAphorism = getRandomItem(this.dataSource);
        this.setData({
            text: randomAphorism ?? EMPTY_TEXT
        })
        if (pullRefresh) {
            wx.stopPullDownRefresh()
        }
    },
});
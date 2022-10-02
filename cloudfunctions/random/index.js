// 云函数入口函数
exports.main = async (event, context) => {
    console.log("clound function ramdom is called")
    return Math.floor(Math.random() * 100)
}
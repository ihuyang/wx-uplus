var app = getApp()
Page({
  data: {
    lastid: 0,
    newsList: [],

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  loadData: function (lastid) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/items/?limit=2',
      data: {
        'offset': lastid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var len = res.data.results.length
        that.setData({
          lastid: res.data.results[len-2].id
        })
        var dataArr = that.data.newsList
        var newData = dataArr.concat(res.data.results)
        that.setData({
          newsList: newData
        })
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    this.loadData(0)

  },
  loadmore: function (event) {
     var id = event.currentTarget.dataset.lastid
    console.log("ddddddddd" + id)
    this.loadData(id)
  }

})
// pages/timeadmin/timeadd.js

var hour = new Array("00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23");
var minute = new Array("00","30");
//var minute = new Array("00", "15","30","45");

const date = new Date()
const years = []
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}
const openId = (wx.getStorageSync('openId'))

Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: years,
    year: date.getFullYear(),
    value: [9999, 1, 1],
    time: '12:01',
    array: ['娱乐时间', '休息时间', '强迫工作', '高效工作', '拖严浪费'],
    index: 0,
    timestart: [['06', '07'], ['00', '30']],
    timestartIndex: [3, 0],
    timeend: [['06', '07'], ['00', '30']],
    timeendIndex: [0, 0],
    selecttodo:""
  },




  bindTimeStartChange: function (e) {
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      timestartIndex: e.detail.value
    })
  },

  bindTimeEndChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      timeendIndex: e.detail.value
    })
  },

  bindSelecTodoChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindFormSubmit:function(e){
    console.log(e);
    console.log(wx.getStorageSync('openId'));
    console.log(getApp().globalData);
    console.log(getApp().globalData.userInfo);

    const openid = wx.getStorageSync('openId');
    const timestart = e.detail.value.starttime;
    const timeend = e.detail.value.endtime;
    const textarea = e.detail.value.textarea;
    const selecttodo = e.detail.value.selecttodo;
    //console.log(this.data);return;
    const times = this.data.times;

    var posttimestart = hour[timestart[0]] + ":" + minute[timestart[1]];
    var posttimeend = hour[timeend[0]] + ":" + minute[timeend[1]]
    console.log(posttimestart + "--------------" + posttimeend);
    //return;



    wx.request({
      //url: 'https://www.uqitu.com/timeadmin/?post=1',
      url: 'http://localhost/timeadmin/?post=1',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { openid: openid, timestart: posttimestart, timeend: posttimeend, textarea: textarea, selecttodo: selecttodo, times: times},
      success: function (res) {
        console.log(res);

        wx.navigateTo({
          url: '../index/index'
        })

      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("上个页面传过来的值为："+options);
    console.log(options);
    var that = this;
    //console.log(options.times);


    var timeStartHourIndex=0, timeStartMinuteIndex=0, timeEndHourIndex=0, timeEndMinuteIndex=0;

    if (options.times!="null"){
      //console.log("111111111111111");
      var timesArray = options.times.split("~");
      var startTimeTemp = timesArray[0].split(":");
      var endTimeTemp = timesArray[1].split(":");

      for (var i = 0; i < hour.length; i++) {
        if (hour[i] == startTimeTemp[0]) {
          //console.log(i + "sfsdfsdfsfsdf11111111111111111");
          var timeStartHourIndex = i;
        }
      }

      for (var i = 0; i < minute.length; i++) {
        if (minute[i] == startTimeTemp[1]) {
          //console.log(i + "sfsdfsdfsfsdf11111111111111111");
          var timeStartMinuteIndex = i;
          break;
        }
      }

      for (var i = 0; i < hour.length; i++) {
        if (hour[i] == endTimeTemp[0]) {
          //console.log(i + "sfsdfsdfsfsdf11111111111111111");
          var timeEndHourIndex = i;
        }
      }

      for (var i = 0; i < minute.length; i++) {
        if (minute[i] == endTimeTemp[1]) {
          //console.log(i + "sfsdfsdfsfsdf11111111111111111");
          var timeEndMinuteIndex = i;
          break;
        }
      }
    }else{
      console.log("times为空,当前选择的时间是："+options.timepoint);
      var startTimeTemp = options.timepoint.split(":");
      timeStartHourIndex = parseInt(startTimeTemp[0]);
      for (var i = 0; i < minute.length; i++) {
        if (minute[i] == startTimeTemp[1]) {
          //console.log(i + "sfsdfsdfsfsdf11111111111111111");
          var timeStartMinuteIndex = i;
          break;
        }
      }

      timeEndHourIndex = parseInt(startTimeTemp[0]);
      timeEndMinuteIndex = 1;
    }
    

    that.setData({
      todotitle: options.paramTitle,

      times: options.times,

      timestart: [hour, minute],
      timeend: [hour, minute],

      timestartIndex: [timeStartHourIndex, timeStartMinuteIndex],
      timeendIndex: [timeEndHourIndex, timeEndMinuteIndex],
      stimevalue: options.timepoint,

      selecttodo: options.selecttodo
      
    })




    
  
    wx.setNavigationBarTitle({
      title: options.timepoint+" 的时间记录"//页面标题为路由参数
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }







})
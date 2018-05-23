let API_HOST = "http://127.0.0.1/xx";
let DEBUG = false;//切换数据入口
var Mock = require('./mock.js')
function ajax1(data = '', fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: config.API_HOST + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  } else {
    // 模拟数据
    var res = Mock.mock({
      'error_code': '',
      'error_msg': '',
      'data|10': [{
        'id|+1': 1,
        'img': "@image('200x100', '#4A7BF7','#fff','pic')",
        'title': '@ctitle(3,8)',
        'city': "@county(true)",
        'stock_num': '@integer(0,100)',//库存数量  //ssss
        'marketing_start': '@datetime()',
        'marketing_stop': '@now()',
        'price': '@integer(100,2000)',//现价，单位：分  
        'original_price': '@integer(100,3000)'
      }]
    })
    // 输出结果
    // console.log(JSON.stringify(res, null, 2))
    fn(res);
  }
}


function ajax(data = 'getTimeList', fn, method = "get", header = {}) {

  var s = new Array();
  var n=0;
  for(var i=6; i<24; i++){
    s[n++] = i + ":00";
    s[n++] = i + ":30";
  }


  var color = new Array();
  color = ['#FF4500', '#FFFF00', '#FFA500', '#63B8FF','#3CB371'];

  var height = new Array();
  n=0;
  for (var i = 0; i < 36; i++) {
    
    if (i == 0) {
      height[n++] = 0.5
    }else{
      height[n++] = i * 2.5+0.5;
    }
  }
  console.log(height);

  if (data =='getTimeList') {
    // 模拟数据
    var res = Mock.mock({
      'error_code': '',
      'error_msg': '',
      'data|36': [{
        'id|+1': 1,
        'timepoint|+1': s,
        'color|1':color,
        'height|+1': height,
        'title': '@ctitle(3,38)'
        
      }]
    })
    // 输出结果
    // console.log(JSON.stringify(res, null, 2))
    fn(res);
  }
}





function ajaxget(data = '', fn, method = "get", header = {}) {
  console.log("sfsdfsdfs11111111111111111");
  const openId = (wx.getStorageSync('openId'))
  if (!DEBUG) {
    wx.request({
      url: "http://localhost/timeadmin/" + data,
      //url:"https://www.uqitu.com/timeadmin/"+data,
      method: method ? method : 'get',
      data: { openid: openId},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  }
}



module.exports = {
  ajax: ajax,
  ajaxget: ajaxget
}
//显示用户
var store_name=sessionStorage.getItem("username");    //获取登陆成功的用户名
document.getElementById("nameshow").innerText='欢迎,用户'+store_name;
//轮播图
$(function() {
  var i = 0;           // 当前显示的图片索引
  var timer = null;    // 定时器
  var delay = 2000;    // 图片自动切换的间隔时间
  var width = 300;     // 每张图片的宽度
  var speed = 400;     // 动画时间
  // 复制列表中的第一个图片，追加到列表最后，设置ul的宽度为图片张数 * 图片宽度
  var firstimg = $('.hot li').first().clone();
  $('.hot').append(firstimg).width($('.hot li').length * width);
  // 1. 设置周期计时器，实现图片自动切换
  timer = setInterval(imgChange, delay);
  // 2. 鼠标移入，暂停自动播放，移出，开始自动播放
  $('.banner').hover(function() {
    clearInterval(timer);
  }, function() {
    timer = setInterval(imgChange, delay);
  });
  // 3. 鼠标划入圆点
  $('.dot li').mouseover(function() {
    i = $(this).index();
    $('.hot').stop().animate({left: -i * width}, 200);
    dotChange();
  });
  // 4. 设置左右切换的箭头显示和隐藏
  $('.banner').hover(function() {
    $('.arrow').show();
  }, function () {
    $('.arrow').hide();
  });
  // 5. 向右箭头
  $('.next').click(function() {
    imgChange()
  });
  // 6. 向左箭头
  $('.prev').click(function() {
    --i;
    if (i == -1) {
      i = $('.hot li').length - 2;
      $('.hot').css({left: -($('.hot li').length - 1) * width});
    }
    $('.hot').stop().animate({left: -i * width}, speed);
    dotChange();
  });
  // 自动切换图片
  function imgChange() {
    ++i;
    isCrack();
    dotChange();
  }
  // 无缝轮播
  function isCrack() {
    if (i == $('.hot li').length) {
      i = 1;
      $('.hot').css({left: 0});
    }
    $('.hot').stop().animate({left: -i * width}, speed);
  }
  // 自动切换对应的圆点
  function dotChange() {
    if (i == $('.hot li').length - 1) {
      $('.dot li').eq(0).addClass('on').siblings().removeClass('on');
    } else {
      $('.dot li').eq(i).addClass('on').siblings().removeClass('on');
    }
  }
});
//倒计时
// 设置秒杀结束时间
var endtime = new Date('2023-01-22 00:00:00'), endseconds = endtime.getTime();
// 设置据当前时间开始，秒杀的结束时间
// 声明变量保存剩余的时间
var d = h = m = s = 0;
// 设置定时器，实现限时秒杀效果
var id = setInterval(seckill, 1000);
function seckill() {
  var nowtime = new Date();    // 获取当前时间
  // 获取时间差，单位秒
  var remaining = parseInt((endseconds - nowtime.getTime()) / 1000);
  // 判断秒杀是否过期
  if (remaining > 0) {
    d = parseInt(remaining / 86400);        // 计算剩余天数（除以60*60*24取整，获取剩余的天数）
    h = parseInt((remaining / 3600) % 24);  // 计算剩余小时（除以60*60转换为小时，与24取模，获取剩余的小时）
    m = parseInt((remaining / 60) % 60);    // 计算剩余分钟（除以60转为分钟，与60取模，获取剩余的分钟）
    s = parseInt(remaining % 60);           // 计算剩余秒（与60取模，获取剩余的秒数）
    // 统一利用两位数表示剩余的天、小时、分钟、秒
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
  } else {
    clearInterval(id);         // 秒杀过期，取消定时器
    d = h = m = s = '00';
  }
  // 将剩余的天、小时、分钟和秒显示到指定的网页中
  document.getElementById('d').innerHTML = d + '天';
  document.getElementById('h').innerHTML = h + '时';
  document.getElementById('m').innerHTML = m + '分';
  document.getElementById('s').innerHTML = s + '秒';
}
//倒计时
class Snowflake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 0;
    this.alpha = 0;
    this.reset();
  }
  reset() {
    this.x = this.randBetween(0, window.innerWidth);
    this.y = this.randBetween(0, -window.innerHeight);
    this.vx = this.randBetween(-3, 3);
    this.vy = this.randBetween(2, 5);
    this.radius = this.randBetween(1, 4);
    this.alpha = this.randBetween(0.1, 0.9);
  }
  randBetween(min, max) {
    return min + Math.random() * (max - min);
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y + this.radius > window.innerHeight) {
      this.reset();
    }
  }
}
class Snow {
  createSnowflakes() {
    const flakes = window.innerWidth / 5;
    this.snowflakes = [];
    for (let s = 0; s < flakes; s++) {
      this.snowflakes.push(new Snowflake());
    }
  }
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let flake of this.snowflakes) {
      flake.update();
      this.ctx.save();
      this.ctx.fillStyle = '#FFF';
      this.ctx.beginPath();
      this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.globalAlpha = flake.alpha;
      this.ctx.fill();
      this.ctx.restore();
    }
    requestAnimationFrame(this.updateBound);
  }
}
new Snow();
var stop = false;
function show_runtime() {
  var newDay = '2023/1/22 00:00:00';
  var countDate = new Date(newDay);
  var now = new Date().getTime();
  gap = countDate - now;
  var second = 1000;
  var minute = second * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var d = Math.floor(gap / day);
  var h = Math.floor((gap % day) / hour);
  var m = Math.floor((gap % hour) / minute);
  var s = Math.floor((gap % minute) / second);
  if ((d, h, m, s < 0)) {
    stop = true;
  } else {
    document.getElementById('day').innerText = d;
    document.getElementById('hour').innerText = h;
    document.getElementById('minute').innerText = m;
    document.getElementById('second').innerText = s;
  }
}
var time = setInterval(() => {
  show_runtime();
  if (stop === true) {
    newyear();
    clearInterval(time);
  }
}, 1000);
// 定时器 控制图片自动切换
function downTime() {
  let item = 1;
  setInterval(() => {
    item++;
    if (item === 4) {
      item = 1;
    }
    console.log(item, 'item');
    return item;
    e.stopPropagation(); //取消事件冒泡
  }, 2000);
}
window.onload = downTime;
/*
* @Author: Emmet
* @Date:   2017-03-08 12:03:14
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-13 13:41:35
*/

window.onload = function () {

  // var isLogin = false; // 全局变量 用户是否登录
  var isLogin = localStorage.getItem('isLogin') == '1' ? true : false;



  var content = document.querySelector('.content'); // 新闻内容区域

  // 进入后首次加载数据 轮播图和当日新闻
  (function () {

    // var newsList = document.querySelector('.news-list');

    ajax({
      url: '20170308.json',
      type: 'GET',
      // async: false,
      success: function (data) {
        data = JSON.parse(data);
        getCarousel(data);
        getNews(data);
        getArticles();
        watchScroll();
      },
      error: function (err) {
        console.log(err);
      }
    });


    // 获取轮播图的新闻
    function getCarousel (data) {

      var len =  data.top_stories.length;

      for (var i = 0; i < len; i++) {

        var carouselNews = document.querySelector('.carousel-news');

        var a = document.createElement('a'),
            img = document.createElement('img'),
            span = document.createElement('span');

        a.classList.add('news');
        // a.href = '/views/article?id=' + data.top_stories[i].id;
        a.newsid = data.top_stories[i].id;

        img.src = data.top_stories[i].image;
        span.innerHTML = data.top_stories[i].title;

        a.appendChild(img);
        a.appendChild(span);
        carouselNews.appendChild(a);
      }
    }
  })();

  // 格式化日期
  function formatDate (date) {

    var date2 =  date.split(''); // 需要转成xxxx/xx/xx的格式才可以计算周几
    date2.splice(4, 0, '/');
    date2.splice(7, 0, '/');
    date2 = date2.join('');

    return date.substring(4, 6) + '月' + date.substring(6, 8) + '日 ' + '星期' + '日一二三四五六'.charAt(new Date(date2).getDay());
  }

    // 获取新闻并且添加到页面
    function getNews (data) {

    var h2 = document.createElement('h2'),
        ul = document.createElement('ul');

    h2.innerHTML = data.date == '20170308' ? '今日新闻' : formatDate(data.date);

      for (var i = 0, len = data.stories.length; i < len; i++) {
        var li = document.createElement('li'),
            a = document.createElement('a'),
            h3 = document.createElement('h3'),
            img = document.createElement('img');


            ul.className = 'news-list clearfix';

        // var h2 = document.querySelector('h2');

        a.classList.add('news');
        // a.href = '/views/article?id=' + data.stories[i].id;
        a.newsid = data.stories[i].id;

        h3.innerHTML = data.stories[i].title;
        img.src = data.stories[i].images[0];
        img.alt = data.stories[i].title;
        // li.title = data.stories[i].id;

        a.appendChild(h3);
        a.appendChild(img);
        li.appendChild(a);
        // newsList.appendChild(li);
        ul.appendChild(li);
      }

      content.appendChild(h2);
      content.appendChild(ul);
    }

  // 轮播图自动轮播
  (function () {

    var carouselNews = document.querySelector('.carousel-news'),
        carouselCtrl = document.querySelector('.carousel-ctrl'),
        ctrls = carouselCtrl.getElementsByTagName('li');

    var width = carouselNews.clientWidth;

    var idx = 0;

    carouselNews.timer = setInterval(function () {
      idx ++;
      idx %= 5;
      carouselNews.style.left = - width / 5 * idx + 'px';

      Array.from(ctrls).forEach( function(ele, idx) {
        ele.classList.remove('active');
      });
      ctrls[idx].classList.add('active');
    }, 3000);

    // 获取计算后的样式
    function getStyle (obj, attr) {
      return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
    }
  })();

  // 点击出现隐藏设置栏
  (function () {

    var setting = document.querySelector('#setting'),
        setList = document.querySelector('.set-list');

    setting.addEventListener('click', function (e) {
      setList.classList.add('show');
      e.stopPropagation();
    }, false);

    document.addEventListener('click', function () {
      if (setList.classList.contains('show')) {
        setList.classList.remove('show');
      }
    }, false);
  })();

  // 点击出现隐藏侧边栏
  (function () {

    var sidebarCtrl = document.querySelector('#sidebar-ctrl'),
        sidebar = document.querySelector('.sidebar');

    var body = document.body;

    sidebarCtrl.addEventListener('click', function () {

      if (!sidebar.classList.contains('show')) {
        this.classList.add('active');
        sidebar.classList.add('show');
      }
      // 加入遮罩层
      var mask = document.createElement('div');
      mask.className = 'mask';
      body.appendChild(mask);

      mask.addEventListener('click', function (e) {

        sidebarCtrl.classList.remove('active');
        sidebar.classList.remove('show');
        body.removeChild(mask); // 点击后去掉遮罩层
        e.stopPropagation();
      }, false);

    }, false);
  })();

  // 点击开启关闭夜间模式
  // 夜间模式也给个状态值 就可以让各个页面切换仍然保持夜间模式
  (function () {

    var night = document.querySelector('#night');

    var head = document.getElementsByTagName('head')[0];

    night.addEventListener('click', function (e) {

      if (document.querySelector('#nightPattern')) {
        setTimeout(function () {
          head.removeChild(document.querySelector('#nightPattern'));
        }, 100);
      } else {
        var nightStyle = document.createElement('link');
        nightStyle.href = 'dist/css/night.min.css';
        nightStyle.rel = 'stylesheet';
        nightStyle.id = 'nightPattern';

        setTimeout(function () {
          head.appendChild(nightStyle);
        }, 100);
      }
      e.stopPropagation();
    }, false);
  })();


  // 点击页面跳转与传递参数函数
  function getArticles () {

    var newsLinks = document.querySelectorAll('.news');

    Array.from(newsLinks).forEach( function(ele, idx) {
      ele.addEventListener('click', function () {

        window.location.href = '/zhihudaily/local-version/views/article.html?newsid=' + ele.newsid;
      }, false);
    });

  }


  // 监控页面滚动条滚动 判断是否继续加载
  function watchScroll () {

    var h2 = document.getElementsByTagName('h2')[0];
        title = document.querySelector('.title');

    var top = getTop(h2);


    window.onscroll = function () {

      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      var content = document.querySelector('.content');
      var ch = content.clientHeight;

      var isLoading = true; // 标志 避免滚动事件多次加载

      // 读取不到clientHeight属性
      // 继续加载内容的条件
      if (content.clientHeight + getTop(content) < scrollTop + window.innerHeight) {
        if (isLoading) { // 防止滚动事件持续触发多次加载

          isLoading = false;

          ajax({
            url: '20170306.json',
            type: 'get',
            success: function (data) {
              data = JSON.parse(data);
              getNews(data);
              getArticles();
              isLoading = true;
            },
            error: function (err) {
              console.log(err);
            }
          });
        }
      }
      // 监听滚动事件 更改页面标题
      if (scrollTop >= 0 && scrollTop < 200) {
        title.innerHTML = '首页';
      }

      if (scrollTop >= 200) {
        title.innerHTML = h2.innerHTML;
      }
    };


    // 获取元素距离页面根部的距离
    function getTop (obj) {

      var top = 0,
          parent = obj.parentNode;
      while (parent) {
        top += obj.offsetTop;
        obj = parent;
        parent = parent.parentNode;
      }
      return top;
    }
  }

  // 切换登陆状态 及登陆信息
  (function () {

    var user = document.querySelector('.user'),
        avatar = user.querySelector('img'),
        nickname = user.querySelector('span');

    toggleLogin();

    // 没做服务器上获取登陆状态的部分 暂时做个点击头像切换登陆状态
    avatar.addEventListener('click', function () {
      isLogin = !isLogin;
      toggleLogin();
    }, false);

    // 切换数据函数
    function toggleLogin () {

      if (isLogin) {
        avatar.src = 'src/img/avatar.png';
        nickname.innerHTML = '小学生';
        localStorage.setItem('isLogin', '1');
      }else{
        avatar.src = 'src/img/nobody.jpg';
        nickname.innerHTML = '未登陆';
        localStorage.setItem('isLogin', '0');
      }
    }
  })();


};
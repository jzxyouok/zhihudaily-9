/*
* @Author: Emmet
* @Date:   2017-03-12 16:24:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-13 13:33:34
*/

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

  (function () {

    var collectedNewsIDs;

    if (localStorage.getItem('newsids')) {
      collectedNewsIDs = localStorage.getItem('newsids').split('-'); // 从本地存储取出所有已经收藏的文章ID数组
    } else {
      collectedNewsIDs = [];
    }

    var title = document.querySelector('.title');

    title.innerHTML = collectedNewsIDs.length === 0 ? '无收藏' : collectedNewsIDs.length + '条收藏';

    collectedNewsIDs.forEach( function(ele, idx) {
      ajax({  // 利用ajax加载收藏页面 || 应该从服务器请求
        url: '/zhihudaily/local-version/json/' + ele + '.json',
        type: 'get',
        success: function (data) {

          data = JSON.parse(data);
          loadCollection(data);
        },
        error: function (err) {
          console.log(err);
        }
      });
    });

    // 获取收藏加载进来
    function loadCollection (data) {

        var ul = document.querySelector('.news-list'), // 创建元素
            li = document.createElement('li'),
            a = document.createElement('a'),
            h3 = document.createElement('h3'),
            img = document.createElement('img');

        a.classList.add('news');
        a.newsid = data.id;

        h3.innerHTML = data.title; // 指定信息
        img.src = data.image;
        img.alt = data.title;

        a.appendChild(h3);
        a.appendChild(img);
        li.appendChild(a);
        ul.appendChild(li); // 添加到页面
    }

  })();
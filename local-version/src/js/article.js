/*
* @Author: Emmet
* @Date:   2017-03-10 12:53:53
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-13 13:33:10

*/
window.onload = function () {

  var isLogin = true; // 判断是否登录 可以通过页面间传值或者服务器来判断是否登录

  var msg = window.location.search.match(/[\?\&]newsid=([^\&]+)/i)[0];
  newsid = msg.split('=')[1];
  ajax({
    url: '/zhihudaily/local-version/json/' + newsid +'.json',
    type: 'GET',
    success: function (data) {
      data = JSON.parse(data);
      loadArticle(data);
    },
    error: function (err) {
      console.log(err);
    }
  });

  // 控制分享框 和 遮罩层
  var share = document.querySelector('.share');

  share.onclick = function (e) {

    var mask = document.querySelector('.mask'),
        shareBox = document.querySelector('.share-box');

    mask.classList.remove('hide');
    shareBox.classList.add('show');


    shareBox.addEventListener('click', function (e) {
        e.stopPropagation();
    }, false);

    mask.addEventListener('click', function () {
      mask.classList.add('hide');
      shareBox.classList.remove('show');
    },false);
  };



// 分享到功能
(function () {

  var shareBox = document.querySelector('.share-box');

  var aLinks = shareBox.querySelectorAll('a');

  Array.from(aLinks).forEach( function(ele, idx) {

    ele.addEventListener('click', function (ev) {

      var e = ev || window.event;
      // 通过索引判断点击元素 || 有点事件委托的感觉
      switch (idx) {
        case 0:
          window.open('http://v.t.sina.com.cn/share/share.php?url=' + window.location.href + '&title=' + document.title, '分享到微博', target = '_blank');
          break;
        case 1:
          console.log('我是微信，我被点了');
            break;
        case 2:
          window.location.href = 'https://github.com/ntnyq';
          break;
        case 3:
          window.open('http://share.v.t.qq.com/index.php?c=share&a=index&title= ' + document.title +' &pic= ' + document.querySelector('img') + '&url=' + window.location.href,  '分享到腾讯微博', target = '_blank');
          break;
        case 4:
          console.log('我是有道云笔记，我被点了');
          break;
        case 5:
          window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + window.location.href + '&title= ' + document.title + '&desc=' + '分享给QQ好友' + '&pics=' + document.querySelector('img'), '分享给QQ好友', target = '_blank');
          break;
        case 6:
          console.log('我是更多平台，我被点了');
          break;
        default:
          console.log('你猜我能被点到吗？');
          break;
      }

      e.preventDefault(); // 阻止点击链接跳转
    }, false);
  });
})();

// 文章点赞功能
// 知乎日报APP不登录就可以点赞，所以这里不增加判断是否登录逻辑

  (function () {

    var like = document.querySelector('.like'),
        likes = document.querySelector('.likes'),
        icon = like.querySelector('i');

    like.addEventListener('click', function () {

      if (icon.classList.contains('islike')) { // 如果已经点赞 再点击取消
        icon.classList.remove('islike');
        likes.innerHTML = parseInt(likes.innerHTML) - 1;
      } else { // 未点赞 则点赞 且存入本地存储中  || 其实要存入服务器
        icon.classList.add('islike');
        likes.innerHTML = parseInt(likes.innerHTML) + 1;
        localStorage.setItem(newsid + 'islike', '1');

        var toolTip = document.createElement('div');
        toolTip.className = 'toolTip';
        toolTip.innerHTML = '<i class="fa fa-thumbs-up"></i><sapn>' + likes.innerHTML + '+1</sapn>';

        document.body.appendChild(toolTip); // 将提示框加入页面

        setTimeout(function () { // 0.8秒后提示框自动消失
          document.body.removeChild(toolTip);
        }, 800);
      }
    }, false);
  })();

  // 收藏文章功能
  (function () {

    var collect = document.querySelector('.collect');
    icon = collect.querySelector('i');

    var collectedNewsID;

    if (!localStorage.getItem('newsids')) {
      collectedNewsID = []; // 定义数组保存收藏的文章ID
    } else {
      collectedNewsID = localStorage.getItem('newsids').split('-');
      if (collectedNewsID.indexOf(newsid) > 0) {
        icon.classList.contains('collected') ? '' :icon.classList.add('collected'); // 载入页面后判断是否此页面在收藏列表内
      }
    }

    if (isLogin) { // 登录才有权限收藏文章

      collect.addEventListener('click', function () {

        // icon.classList.contains('collected') ? icon.classList.remove('collected') :icon.classList.add('collected');
        if (icon.classList.contains('collected')) { // 若已经收藏

          icon.classList.remove('collected'); // 去除收藏样式
          collectedNewsID.splice(collectedNewsID.indexOf(newsid), 1); // 去除收藏的那一项
          if (collectedNewsID.length === 0) {
            localStorage.removeItem('newsids');
          } else {
            localStorage.setItem('newsids', collectedNewsID.join('-')); // 存入本地存储 || 或是服务器
          }
        } else { // 若未收藏

          icon.classList.add('collected'); // 添加收藏样式
          if (collectedNewsID.indexOf(newsid) < 0) { // 在收藏列表里没有的情况才添加 避免多次添加

            collectedNewsID.push(newsid);
            // console.log(collectedNewsID.join('-'));
            localStorage.setItem('newsids', collectedNewsID.join('-')); // 存入本地存储
          }
        }
      }, false);
    }
  })();
};

// 载入文章内容到页面身上
function loadArticle (data) {

  var articleInfo = document.querySelector('.article-pic'),
      articlePic = articleInfo.getElementsByTagName('img')[0],
      articleTitle = articleInfo.getElementsByTagName('span')[0],
      articlePicSrc = articleInfo.getElementsByTagName('em')[0];

  var articleContent = document.querySelector('.article-content'),
      comments = document.querySelector('.comments'),
      likes = document.querySelector('.likes');

  articlePic.src = data.image;
  articleTitle.innerHTML = data.title;
  articlePicSrc.innerHTML = data.image_source;

  // 加入文章额外信息 评论数 点赞数
  articleContent.innerHTML = data.body;
  comments.innerHTML = data.extra.comments;
  likes.innerHTML = data.extra.popularity;

  // 去除文章后 判断是否被点赞过
  if (localStorage.getItem(newsid + 'islike')) {
    likes.previousSibling.classList.add('islike'); // dom上个兄弟节点
  }
}

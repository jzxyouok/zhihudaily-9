/*
* @Author: Emmet
* @Date:   2017-03-12 16:24:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-12 17:15:01
*/

// 运用事件委托与Promise的异步来完成判断是否点击选中与取消checkbox
(function () {

  var settingContent = document.querySelector('.setting-content');

  settingContent.addEventListener('click', function (ev) {

    var e = ev || window.event;

    if (e.target && e.target.getAttribute('type') == 'checkbox') {

      // var isChecked = e.target.checked ? '已经被选中了' : '被取消选中了';
      var isChecked = e.target.checked;
      // setTimeout(function () {
      //   alert('我是' + e.target.id + ', 我被点击了! 我' + isChecked);
      // }, 200);
      var p = new Promise(function (resolve, reject) {

        setTimeout(function () {
          if (isChecked) {
            resolve('我被选中了');
          } else {
            reject('我被取消选中了');
          }
        }, 200);
      });

      p.then(function (res) {
        alert('我是' + e.target.id + ',' + res);
      }, function (res) {
        alert('我是' + e.target.id + ',' + res);
      });
    }
  }, false);
})();
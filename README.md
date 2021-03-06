# zhihudaily(知乎日报)

[在线DEMO](https://ntnyq.github.io/zhihudaily/local-version/)

仿照知乎日报的小项目，利用了知乎日报的API。
分为2个版本:

1. 本地版本，展现保存好的json假数据。

2. 服务器版本，需要服务器有php环境。

因为为了练习移动端的布局和简单开发，所以用的知乎APP的截图，再用PS处理至750px宽，以iphone6的尺寸为布局的基准，再通过CSS的媒体查询进行响应式处理，使用rem单位来进行布局。

## 项目结构

![项目结构图片](http://olo2ef5ol.bkt.clouddn.com/screenshot.jpg)

## 依赖

- 本地服务器环境
- 将zhihudaily文件夹放至服务器根目录即可。
- 服务器版本需要PHP服务器环境。

## 介绍

- 使用了gulp作为自动化构建工具和使用相关模块进行css和js的压缩。

- 使用gulp-browser-sync模块进行浏览器的自动刷新。

- 使用less预处理语言编写css，并使用gulp-less模块进行编译。

### API介绍

[API介绍页面](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)

## 实现功能

各个页面间的基本跳转

### 首页功能

- 请求加载当天新闻(假数据不支持)
- 下拉继续加载过往新闻
- 点击切换夜间白天模式
- 首页新闻图片文字轮播
- 侧边栏导航出现隐藏
- 点击头像切换登陆状态
- 点击新闻列表和轮播新闻进入对应新闻页面

### 登陆页功能

无

### 新闻页功能

- 基本的新闻数据展现
- 点击切换赞和取消赞新闻
- 点击收藏和取消收藏新闻
- 点击出现分享页面(实现了2个分享功能)

### 收藏页功能

- 已收藏新闻预览

### 设置页功能

- 自定义多选框样式
- 弹出选择结果

## 页面预览

[点击查看各个页面预览图片](https://github.com/ntnyq/zhihudaily/blob/master/screenshot/)
> 图片来自于知乎日报APP截图

## 待完善

1. 夜间模式暂未添加到每个页面
  - 解决方案: 使用less定义2个颜色变量文件，一个项目的整体颜色less文件。分别导入变量文件后编译，再通过js决定是否引入夜间模式。再定义一个变量存入本地存储，来确定是否用户选择了夜间模式。
2. 侧边栏滚动到最大限度后会留空
  - 解决方案：正在寻找中。
3. 除首页外的页面CSS通过给body设置类做命名空间
  - 不足之处：因为项目较小 所以没有写多个less文件去进行模块化开发，这样的方式导致部分选择器嵌套有点长
  - 解决办法：BEM命名法 OOCSS等 模块化开发 将页面公共样式提取出来 再对每个页面单独创建样式表 最后合并
4. 字体暂未做自适应处理
  - 不足之处：字体暂未做自适应处理，用rem做字体自适应据说不好
  - 解决方法：修改less里面的有关字体的mixin。改成rem单位。
  - 最佳方案：为字体单独设置媒体查询(待完成)

## 下一步

1. 完善上述问题
2. 增加loading效果
3. 完善别的页面功能

## 学习

- 样式全部采用less进行编写，因为初学less，所以有好多东西不精，比如mixin的使用，less的内置函数如round, percentage等。所以做完了感觉对less有了新的认识，学到了很多。比如用less做项目前，一定要先规划好，写好变量和mixin等。
- 移动端的坑也是才开始踩，在这个项目里用到了比如移动端的1像素边框，利用了伪类再用CSS的transform来进行了实现。再就是移动端布局的自适应问题。察觉出了好多坑。
- 对常用的API了解更深了一点，也实践了一些新的比如ES6的API，如Array.from方法，Promise类型等。因为是做移动端的开发所以使用了一些相对新的API，如classList, forEach等。
- 针对页面间的跳转传值的实现，在无后端服务器的情况下，学习了2种实现方案。一种是存入本地存储后待页面跳转后再读取，一种是将值装入URL中，再通过Location对象来进行字符串的截取获得。
- 纯CSS自定义checkbox样式，通过label的for属性和checkbox的id属性的关联，再加上A+B选择器来实现。看过别人做的小DEMO，就因为有这个前端可以不用JS做出点击后的不同效果，很炫酷。




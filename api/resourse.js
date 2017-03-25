/*
* @Author: Emmet
* @Date:   2017-03-25 02:17:38
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-25 03:08:28
*/

/*
* 以下所有 API 均由 知乎（Zhihu.Inc） 提供。
* 所有API的HTTP请求方式均为get，返回格式都为json。
* 具体调用实例和详情可参考
* https://github.com/izzyleung/ZhihuDailyPurify/wiki/知乎日报-API-分析
 */
import { API_ROOT } from './config.js'

var apiZhihudaily = {
  // 获取软件最近版本 2个参数 android/ios + version(1.0.0)
  latestVersion: '/version/',
  // 获取当天新闻 无参数
  latestNews: '/news/latest',
  // 获取过往新闻 需要日期 格式(20170325)
  beforeNews: '/before/',

  // 获取新闻内容 需要新闻id
  newsContent: '/news/',
  // 新闻额外信息 需要新闻id
  newsExtraInfo: '/story-extra/',
  // 新闻对应长短评论 和推荐者 需要新闻id
  aboutNewsInfo: '/story/',

  // 主题日报列表 无参数
  themesList: '/themes',
  // 主题日报当日内容 和过往内容 需要主题id 过往内容要指定时间 如上时间格式
  themeContent: '/theme/',

  // 热门新闻消息 无参数
  hotNews: '/news/hot',

  // 栏目列表 无参数
  sectionsList: '/sections',
  // 获取栏目具体消息 需要栏目id
  sectionContent: '/section/',

  // 新闻编辑者主页 需要新闻id
  editorPage: '/editor/'
}

// 版本
export const LastVersionResource = API_ROOT.concat(apiZhihudaily.latestVersion)
// 当前消息 和 过往消息
export const LatestNewsResource = API_ROOT.concat(apiZhihudaily.latestNews)
export const BeforeNewsResource = API_ROOT.concat(apiZhihudaily.beforeNews)

// 消息主内容和额外内容
export const NewsContentResource = API_ROOT.concat(
  apiZhihudaily.newsContent)
export const NewsExtraInfoResource = API_ROOT.concat(apiZhihudaily.newsExtraInfo)
export const AboutNewsInfoResource = API_ROOT.concat(apiZhihudaily.aboutNewsInfo)

// 主题日报
export const ThemesListResource = API_ROOT.concat(
  apiZhihudaily.themesList)
export const ThemeContentResource = API_ROOT.concat(apiZhihudaily.themeContent)

// 热门消息
export const HotNewsResource = API_ROOT.concat(apiZhihudaily.hotNews)

// 栏目列表内容
export const SectionsListResource = API_ROOT.concat(apiZhihudaily.sectionsList)
export const SectionContentResource = API_ROOT.concat(apiZhihudaily.sectionContent)

// 编辑者个人信息
export const EditorPageResource = API_ROOT.const(apiZhihudaily.editorPage)

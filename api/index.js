/*
* @Author: Emmet
* @Date:   2017-03-25 02:17:10
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-25 16:52:28
*/
import axios from 'axios'

import { // 以对象的格式导出
  LatestVersionResource,

  LatestNewsResource,
  BeforeNewsResource,

  NewsContentResource,
  NewsExtraInfoResource,

  ThemesListResource,
  ThemeContentResource,

  HotNewsResource,

  SectionsListResource,
  SectionContentResource,

  EditorPageResource
} from './resourse.js'

export default {

  getAppVersion (platform, version) {
    return axios.get( LatestVersionResource + platform + '/' + version )
  },

  getTodayNews () {
    return axios.get( LatestNewsResource )
  },
  getNewsByDate (date) {
    return axios.get( BeforeNewsResource + date )
  },

  getNewsContent (id) {
    return axios.get( NewsContentResource + id )
  },
  getNewsExtraInfo (id) {
    return axios.get( NewsExtraInfoResource + id )
  },
  getLongComments (id) {
    return axios.get( AboutNewsInfoResource + id + '/long-comments' )
  },
  getShortComments (id) {
    return axios.get( AboutNewsInfoResource + id + '/short-comments' )
  },
  getNewsRecommender (id) {
    return axios.get( AboutNewsInfoResource + id + '/recommenders' )
  },

  getThemesList () {
    return axios.get( ThemesListResource )
  },
  getThemeContent (id) {
    return axios.get( ThemeContentResource + id )
  },

  getHotNews () {
    return axios.get( HotNewsResource )
  },

  getSectionList () {
    return axios.get( SectionsListResource )
  },
  getSectionContext (id) {
    return axios.get( SectionContentResource + id )
  },

  getEditorPage (id, platform) {
    return axios.get( EditorPageResource + id + '/profile-page' + platform )
  }
}

// 如果需要a=b&c=d这样的参数
// 写成如下格式
// axios.get( ABC, {
//  params: {
//    a: b,
//    c: d
//  }
// })

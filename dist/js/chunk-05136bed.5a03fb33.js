(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05136bed"],{"1d29":function(t,i,s){"use strict";s("c7fb")},6923:function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"the_charts"},[s("div",{staticClass:"title"},[s("ul",[s("li",{class:{active:0==t.activeIndex},on:{click:t.gotoF1}},[t._v("精选")]),s("li",{class:{active:1==t.activeIndex},on:{click:t.gotoF2}},[t._v("歌手")]),s("li",{class:{active:2==t.activeIndex},on:{click:t.gotoF3}},[t._v("MV")]),s("li",{class:{active:3==t.activeIndex},on:{click:t.gotoF4}},[t._v("热赞")])])]),s("div",{ref:"floor1",staticClass:"floor1"},[s("border-title",[t._v("榜单推荐")]),t.isLoading?s("loading"):t._e(),t.floor1List?s("ul",t._l(t.floor1List,(function(i,e){return s("li",{key:e,on:{click:function(s){return t.gotoList(i.id)}}},[s("div",{staticClass:"t"},[s("img",{attrs:{src:i.coverImgUrl,alt:""}}),s("div",{staticClass:"ctime"},[t._v(t._s(i.updateFrequency))]),s("i",{staticClass:"iconfont icon-bofang"})]),s("div",{staticClass:"b"},[t._v(t._s(i.name))])])})),0):t._e()],1),s("div",{ref:"floor2",staticClass:"floor2"},[s("border-title",[t._v("官方版")]),t.isLoading?s("loading"):t._e(),s("ul",t._l(t.floor2List,(function(t){return s("li",{key:t.id},[s("chart-item",{attrs:{item:t}})],1)})),0)],1),s("div",{ref:"floor3",staticClass:"floor3"},[s("border-title",[t._v("热门歌手")]),t.isLoading?s("loading"):t._e(),s("ul",t._l(t.artList,(function(t){return s("li",{key:t.id},[s("singer-item",{attrs:{item:t}})],1)})),0)],1),s("div",{ref:"floor4",staticClass:"floor4"},[s("border-title",[t._v("热播MV")]),t.isLoading?s("loading"):t._e(),s("ul",t._l(t.mvList,(function(t){return s("li",{key:t.id},[s("mv-item",{attrs:{item:t}})],1)})),0),s("ul",t._l(t.wyMvList,(function(t){return s("li",{key:t.id},[s("mv-item",{attrs:{item:t}})],1)})),0)],1),s("div",{ref:"floor5",staticClass:"floor5"},[s("div",{staticClass:"t"},[s("border-title",[t._v("网络热赞歌曲")]),s("button",{on:{click:t.playMenu}},[s("i",{staticClass:"iconfont icon-bofang"}),t._v("播放 ")])],1),t.isLoading?s("loading"):t._e(),t._l(t.admireList,(function(t){return s("all-listen",{key:t.id,attrs:{item:t}})}))],2)])},o=[],n=(s("fb6a"),s("d81d"),s("a785")),a=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"chart_item",on:{click:function(i){return t.gotoChartSongList(t.item.id)}}},[s("div",{staticClass:"title"},[t._v(t._s(t.item.updateFrequency))]),s("div",{staticClass:"mes"},[s("div",{staticClass:"left"},[s("h5",[t._v(t._s(t.item.name))]),s("img",{attrs:{src:t.item.coverImgUrl,alt:""}})]),s("div",{staticClass:"right"},[t.item.tracks?s("ul",t._l(t.item.tracks,(function(i,e){return s("li",{key:e},[t._v(" "+t._s(e+1)+". "+t._s(i.first)+" - "),s("span",[t._v(t._s(i.second))])])})),0):t._e()])])])},l=[],r={props:["item"],created:function(){},methods:{gotoChartSongList:function(t){this.$router.push("/recommend_songs/:".concat(t))}}},c=r,d=(s("85bb"),s("2877")),u=Object(d["a"])(c,a,l,!1,null,"34bd5664",null),f=u.exports,m=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"singer_item",on:{click:function(i){return t.gotosinger(t.item.id)}}},[s("div",{staticClass:"middle"},[s("img",{attrs:{src:t.item.picUrl,alt:""}})]),s("div",{staticClass:"right"},[s("p",[t._v(t._s(t.item.name))]),s("p",[t._v(t._s(t.item.alias[0]))])])])},v=[],g={props:["item"],created:function(){},methods:{gotosinger:function(t){this.$router.push("/chart_singer/".concat(t))}}},h=g,_=(s("e7d7"),Object(d["a"])(h,m,v,!1,null,"8ade2a02",null)),L=_.exports,p=s("f292"),b=s("a564"),C=s("3a5e"),k={name:"charts",components:{BorderTitle:n["a"],ChartItem:f,SingerItem:L,MvItem:p["a"],AllListen:b["a"],Loading:C["a"]},data:function(){return{activeIndex:0,allList:[],artList:[],admireList:[],admireAllList:[],floor1List:[],floor2List:[],mvList:[],wyMvList:[],timer:null,isLoading:!0}},created:function(){var t=this;this.isLoading=!0,this.axios.get("/toplist/detail").then((function(i){t.allList=i.data.list,t.floor1List=t.allList.slice(4,7),t.floor2List=t.allList.slice(0,4),t.isLoading=!1})),this.isLoading=!0,this.axios.get("/artist/list?cat=1001").then((function(i){t.artList=i.data.artists.slice(0,6),t.isLoading=!1})),this.isLoading=!0,this.axios.get("/personalized/mv").then((function(i){t.mvList=i.data.result,t.isLoading=!1})),this.isLoading=!0,this.axios.get("/mv/exclusive/rcmd?limit=4").then((function(i){t.wyMvList=i.data.data.map((function(t){return t.picUrl=t.cover,t})),t.isLoading=!1})),this.isLoading=!0,this.axios.get("/playlist/detail?id=3778678").then((function(i){t.admireAllList=i.data.playlist.tracks.map((function(t){return t.song={artists:t.ar,album:t.al},t})),t.admireList=t.admireAllList.slice(100,106),t.isLoading=!1}))},methods:{onScroll:function(){var t=this;clearTimeout(this.timer);var i=document.documentElement.scrollTop,s=this.$refs.floor2.offsetTop,e=this.$refs.floor3.offsetTop,o=this.$refs.floor4.offsetTop,n=this.$refs.floor5.offsetTop,a=[];a.push(s,e,o,n),this.timer=setTimeout((function(){for(var s=0;s<a.length;s++)i+30>=a[s]&&(t.activeIndex=s);i+30<a[1]&&(t.activeIndex=0)}),100)},gotoF1:function(){document.documentElement.scrollTop=0},gotoF2:function(){document.documentElement.scrollTop=this.$refs.floor3.offsetTop},gotoF3:function(){document.documentElement.scrollTop=this.$refs.floor4.offsetTop},gotoF4:function(){document.documentElement.scrollTop=this.$refs.floor5.offsetTop},gotoList:function(t){this.$router.push("/recommend_songs/:".concat(t))},playMenu:function(){var t=this.admireList;this.$emit("playMenu",t)}},activated:function(){window.addEventListener("scroll",this.onScroll)},deactivated:function(){window.removeEventListener("scroll",this.onScroll),clearTimeout(this.timer)}},y=k,x=(s("1d29"),Object(d["a"])(y,e,o,!1,null,"044b9e45",null));i["default"]=x.exports},"797b":function(t,i,s){},"85bb":function(t,i,s){"use strict";s("bb09")},bb09:function(t,i,s){},c7fb:function(t,i,s){},e7d7:function(t,i,s){"use strict";s("797b")}}]);
//# sourceMappingURL=chunk-05136bed.5a03fb33.js.map
(function(t){function e(e){for(var r,a,i=e[0],l=e[1],c=e[2],p=0,f=[];p<i.length;p++)a=i[p],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);u&&u(e);while(f.length)f.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],r=!0,i=1;i<n.length;i++){var l=n[i];0!==o[l]&&(r=!1)}r&&(s.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},o={app:0},s=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=l;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("0cdd");var r=n("2b0e"),o=n("5f5b");n("ab8b"),n("2dd8");r["default"].use(o["a"]);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("PostBox",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},a=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-navbar",{attrs:{type:"dark",variant:"dark"}},[n("b-navbar-nav",[n("b-navbar-brand",{attrs:{href:"#",center:""}},[n("h1",[t._v("HTTP Client")])])],1)],1),n("b-container",{staticClass:"pt-3"},[n("b-row",[n("b-col",[n("b-card",{attrs:{"no-body":""},scopedSlots:t._u([{key:"header",fn:function(){return[n("h3",{staticClass:"mb-0"},[t._v("Posts")])]},proxy:!0}])},[n("b-card-body",{ref:"content",staticClass:"p-0",staticStyle:{position:"relative",height:"500px","overflow-y":"scroll"},attrs:{id:"nav-scroller"}},t._l(t.posts,(function(e,r){return n("b-card",{key:e.id+r,staticClass:"m-1",attrs:{"body-class":"px-0 pb-0","border-variant":"success",align:"center"}},[n("b-card-sub-title",{staticClass:"mb-2"},[t._v("Jemand schrieb:")]),n("b-card-text",[t._v(t._s(e.content))]),n("b-card-footer",{staticClass:"p-0"},[t._v(" #"+t._s(e.id)+" ")])],1)})),1)],1)],1),n("b-col",[n("b-form-input",{staticClass:"mb-2",attrs:{placeholder:"URL eingeben"},model:{value:t.url,callback:function(e){t.url=e},expression:"url"}}),n("b-form-input",{staticClass:"mb-2",attrs:{placeholder:"Kommentar eingeben"},model:{value:t.newPost,callback:function(e){t.newPost=e},expression:"newPost"}}),n("b-button",{attrs:{variant:"success"},on:{click:t.getRequest}},[t._v("GET")]),n("b-button",{attrs:{variant:"dark"},on:{click:t.postRequest}},[t._v("POST")]),n("b-form-file",{attrs:{state:Boolean(t.file1),placeholder:"Choose a file or drop it here...","drop-placeholder":"Drop file here..."},model:{value:t.file1,callback:function(e){t.file1=e},expression:"file1"}}),n("b-button",{attrs:{variant:"dark"},on:{click:t.postFile}},[t._v("Send File")])],1)],1),t._v(" "+t._s(t.$data)+" ")],1)],1)},l=[],c=n("bc3a"),u=n.n(c),p={name:"PostBox",props:{msg:String},data:function(){return{posts:"",url:"https://postbox.shmiede.de/posts/",newPost:"",file1:""}},methods:{addFiles:function(){this.$refs.files.click()},getRequest:function(){var t=this;u.a.get(this.url,{withCredentials:!0}).then((function(e){t.posts=e.data,t.posts.reverse()}))},postFile:function(){var t=new FormData;t.append("file1",this.file1),u.a.post(this.url,t,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){console.log(t)}))},postRequest:function(){var t=this;u.a.post(this.url,{content:this.newPost},{withCredentials:!0}).then((function(e){t.posts=e.data,t.posts.reverse(),t.newPost=""})).catch((function(t){console.log(t)}))},putRequest:function(){var t=this;u.a.put(this.url,{content:this.newPost},{withCredentials:!0}).then((function(e){t.posts=e.data,t.posts.reverse(),t.newPost=""}))}},mounted:function(){this.getRequest()}},f=p,d=(n("9195"),n("2877")),b=Object(d["a"])(f,i,l,!1,null,"424a3f57",null),h=b.exports,v={name:"App",components:{PostBox:h}},m=v,y=(n("034f"),Object(d["a"])(m,s,a,!1,null,null,null)),g=y.exports;r["default"].config.productionTip=!1,new r["default"]({render:function(t){return t(g)}}).$mount("#app")},"711b":function(t,e,n){},"85ec":function(t,e,n){},9195:function(t,e,n){"use strict";n("711b")}});
//# sourceMappingURL=app.947f06df.js.map
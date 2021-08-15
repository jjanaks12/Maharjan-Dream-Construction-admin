(function(t){function e(e){for(var n,o,i=e[0],u=e[1],s=e[2],l=0,d=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);f&&f(e);while(d.length)d.shift()();return c.push.apply(c,s||[]),a()}function a(){for(var t,e=0;e<c.length;e++){for(var a=c[e],n=!0,o=1;o<a.length;o++){var u=a[o];0!==r[u]&&(n=!1)}n&&(c.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},r={app:0},c=[];function o(t){return i.p+"js/"+({}[t]||t)+"."+{"chunk-2d0a441e":"b5433e05","chunk-2d0a4b9e":"a0ee47b6","chunk-2d0c8267":"de4fd5ab","chunk-2d0d366a":"d65d1fbb","chunk-2d0decaa":"eb42805e","chunk-2d0e5f50":"ee0afc6a","chunk-6cab77ae":"26b77cc0","chunk-e4f79458":"fdb9a0f7","chunk-2d0d7ab2":"b68ca7d0","chunk-326f9578":"b27b2185","chunk-04b7d073":"8dc93574","chunk-4256027b":"36f5cb08","chunk-aadc12ec":"4ef00c9b","chunk-aadf2bb6":"7e90dbdb"}[t]+".js"}function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.e=function(t){var e=[],a=r[t];if(0!==a)if(a)e.push(a[2]);else{var n=new Promise((function(e,n){a=r[t]=[e,n]}));e.push(a[2]=n);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=o(t);var s=new Error;c=function(e){u.onerror=u.onload=null,clearTimeout(l);var a=r[t];if(0!==a){if(a){var n=e&&("load"===e.type?"missing":e.type),c=e&&e.target&&e.target.src;s.message="Loading chunk "+t+" failed.\n("+n+": "+c+")",s.name="ChunkLoadError",s.type=n,s.request=c,a[1](s)}r[t]=void 0}};var l=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(e)},i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var f=s;c.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},"0613":function(t,e,a){"use strict";var n=a("2b0e"),r=a("2f62"),c=a("f33f"),o=a("0e44"),i=Object(o["a"])({key:"Maharjan Construction",paths:["root.token","root.userDetail"],storage:{getItem:function(t){return window.localStorage.getItem(t)},setItem:function(t,e){return window.localStorage.setItem(t,e)},removeItem:function(t){return window.localStorage.removeItem(t)}}}),u=i;n["a"].use(r["a"]);e["a"]=new r["a"].Store({modules:c["default"],strict:!1,plugins:[u]})},2700:function(t,e,a){"use strict";a.r(e);var n=a("5530"),r=a("d4ec"),c=a("bee2"),o=a("262e"),i=a("2caf"),u=(a("d3b7"),a("9ab4")),s=a("6fc5"),l=a("e738"),f=a("c1df"),d=a.n(f),p=function(t){Object(o["a"])(a,t);var e=Object(i["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.trainingList={data:[],current_page:0,last_page:0,per_page:0,total:0},t}return Object(c["a"])(a,[{key:"getTrainingList",get:function(){return this.trainingList.data}},{key:"today",get:function(){return d()().add(1,"day").format("YYYY-MM-DD")}},{key:"total",get:function(){return this.trainingList.total}},{key:"lastPage",get:function(){return this.trainingList.last_page}},{key:"currentPage",get:function(){return this.trainingList.current_page}},{key:"SET_TRAINING_LIST",value:function(t){this.trainingList=t}},{key:"fetch",value:function(t){var e=this;return new Promise((function(a){l["a"].get("trainings",{params:Object(n["a"])(Object(n["a"])({},t),{},{per_page:10})}).then((function(t){e.context.commit("SET_TRAINING_LIST",t.data),a(!0)})).catch((function(){}))}))}},{key:"save",value:function(t){var e=this;return new Promise((function(a){Object(l["a"])({method:t.id?"put":"post",url:t.id?"trainings/".concat(t.id):"trainings",data:t}).then((function(){e.context.dispatch("fetch"),a(!0)})).catch((function(){}))}))}},{key:"destory",value:function(t){var e=this;return new Promise((function(a){l["a"].delete("trainings/"+t).then((function(){e.context.dispatch("fetch"),a(!0)})).catch((function(){}))}))}},{key:"nextPage",value:function(){var t=this;return new Promise((function(e){t.currentPage<t.lastPage&&t.context.dispatch("fetch",{page:t.currentPage+1}),e(!0)}))}},{key:"prevPage",value:function(){var t=this;return new Promise((function(e){t.currentPage>1&&t.context.dispatch("fetch",{page:t.currentPage-1}),e(!0)}))}},{key:"gotoPage",value:function(t){var e=this;return new Promise((function(a){e.currentPage>=1&&e.context.dispatch("fetch",{page:t}),a(!0)}))}}]),a}(s["d"]);Object(u["a"])([s["c"]],p.prototype,"SET_TRAINING_LIST",null),Object(u["a"])([s["a"]],p.prototype,"fetch",null),Object(u["a"])([s["a"]],p.prototype,"save",null),Object(u["a"])([s["a"]],p.prototype,"destory",null),Object(u["a"])([s["a"]],p.prototype,"nextPage",null),Object(u["a"])([s["a"]],p.prototype,"prevPage",null),Object(u["a"])([s["a"]],p.prototype,"gotoPage",null),p=Object(u["a"])([s["b"]],p),e["default"]=p},"2a64":function(t,e,a){"use strict";a.r(e);var n,r=a("5530"),c=a("d4ec"),o=a("bee2"),i=a("262e"),u=a("2caf"),s=(a("d3b7"),a("9ab4")),l=a("6fc5"),f=a("e738"),d=function(t){Object(i["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(c["a"])(this,a),t=e.apply(this,arguments),t.list={data:[],current_page:0,last_page:0,per_page:0,total:0},t}return Object(o["a"])(a,[{key:"getPropertyList",get:function(){return this.list.data}},{key:"totalCount",get:function(){return this.list.total}},{key:"lastPage",get:function(){return this.list.last_page}},{key:"currentPage",get:function(){return this.list.current_page}},{key:"SET_PROPERTY_LIST",value:function(t){this.list=t}},{key:"fetch",value:function(t){var e=this;return new Promise((function(a){f["a"].get("realStates",Object(r["a"])({},t)).then((function(t){e.context.commit("SET_PROPERTY_LIST",t.data),a(!0)})).catch((function(){}))}))}},{key:"save",value:function(t){var e=this;return new Promise((function(a,n){Object(f["a"])({method:t.id?"put":"post",url:t.id?"realStates/".concat(t.id):"realStates",data:t}).then((function(){e.context.dispatch("fetch"),a(!0)})).catch((function(t){var e;n(null===(e=t.response)||void 0===e?void 0:e.data)}))}))}},{key:"destory",value:function(t){var e=this;return new Promise((function(a){f["a"].delete("realStates/"+t).then((function(){e.context.dispatch("fetch"),a(!0)})).catch((function(){}))}))}},{key:"nextPage",value:function(){var t=this;return new Promise((function(e){t.currentPage<t.lastPage&&(n={params:Object(r["a"])(Object(r["a"])({},n.params),{},{page:t.currentPage+1})},t.context.dispatch("fetch",n)),e(!0)}))}},{key:"prevPage",value:function(){var t=this;return new Promise((function(e){t.currentPage>1&&(n={params:Object(r["a"])(Object(r["a"])({},n.params),{},{page:t.currentPage-1})},t.context.dispatch("fetch",n)),e(!0)}))}},{key:"gotoPage",value:function(t){var e=this;return new Promise((function(a){e.currentPage>=1&&(n={params:Object(r["a"])(Object(r["a"])({},n.params),{},{page:t})},e.context.dispatch("fetch",n)),a(!0)}))}},{key:"search",value:function(t){var e=this;return new Promise((function(a){e.currentPage>=1&&(n={params:{location:t}},e.context.dispatch("fetch",n)),a(!0)}))}}]),a}(l["d"]);Object(s["a"])([l["c"]],d.prototype,"SET_PROPERTY_LIST",null),Object(s["a"])([l["a"]],d.prototype,"fetch",null),Object(s["a"])([l["a"]],d.prototype,"save",null),Object(s["a"])([l["a"]],d.prototype,"destory",null),Object(s["a"])([l["a"]],d.prototype,"nextPage",null),Object(s["a"])([l["a"]],d.prototype,"prevPage",null),Object(s["a"])([l["a"]],d.prototype,"gotoPage",null),Object(s["a"])([l["a"]],d.prototype,"search",null),d=Object(s["a"])([l["b"]],d),e["default"]=d},"3f9b":function(t,e,a){var n={"./Material.ts":"72c2","./Notification.ts":"6485","./RealState.ts":"2a64","./Rent.ts":"749d","./Root.ts":"443e","./Training.ts":"2700","./User.ts":"7f1d","./index.ts":"f33f"};function r(t){var e=c(t);return a(e)}function c(t){if(!a.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}r.keys=function(){return Object.keys(n)},r.resolve=c,t.exports=r,r.id="3f9b"},"443e":function(t,e,a){"use strict";a.r(e);var n=a("5530"),r=a("d4ec"),c=a("bee2"),o=a("262e"),i=a("2caf"),u=(a("d3b7"),a("9ab4")),s=a("6fc5"),l=a("e738"),f=function(t){Object(o["a"])(a,t);var e=Object(i["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.token=null,t.userDetail=null,t}return Object(c["a"])(a,[{key:"getLoggedinUser",get:function(){return this.userDetail}},{key:"getToken",get:function(){return this.token}},{key:"SET_TOKEN",value:function(t){this.token=t}},{key:"SET_LOGIN_USER",value:function(t){this.userDetail=Object(n["a"])({},t)}},{key:"login",value:function(t){var e=this;return new Promise((function(a){l["a"].post("admin/login",t).then((function(t){e.context.commit("SET_TOKEN",t.data.token),e.context.commit("SET_LOGIN_USER",t.data),a(!0)})).catch((function(){}))}))}},{key:"logout",value:function(){var t=this;return new Promise((function(e){l["a"].post("admin/logout").then((function(){t.context.commit("SET_TOKEN",null),t.context.commit("SET_LOGIN_USER",{}),e(!0)})).catch((function(){}))}))}},{key:"fetchLogginedUser",value:function(){var t=this;return new Promise((function(e){e(!0),l["a"].post("admin/logout").then((function(){t.context.commit("SET_TOKEN",null),t.context.commit("SET_LOGIN_USER",{})})).catch((function(){}))}))}},{key:"resetUser",value:function(){var t=this;return new Promise((function(e){t.context.commit("SET_TOKEN",null),t.context.commit("SET_LOGIN_USER",{}),e(!0)}))}}]),a}(s["d"]);Object(u["a"])([s["c"]],f.prototype,"SET_TOKEN",null),Object(u["a"])([s["c"]],f.prototype,"SET_LOGIN_USER",null),Object(u["a"])([s["a"]],f.prototype,"login",null),Object(u["a"])([s["a"]],f.prototype,"logout",null),Object(u["a"])([s["a"]],f.prototype,"fetchLogginedUser",null),Object(u["a"])([s["a"]],f.prototype,"resetUser",null),f=Object(u["a"])([s["b"]],f),e["default"]=f},4678:function(t,e,a){var n={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function r(t){var e=c(t);return a(e)}function c(t){if(!a.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}r.keys=function(){return Object.keys(n)},r.resolve=c,t.exports=r,r.id="4678"},"5aea":function(t,e,a){},6485:function(t,e,a){"use strict";a.r(e);var n=a("d4ec"),r=a("bee2"),c=a("262e"),o=a("2caf"),i=a("9ab4"),u=a("6fc5"),s=a("c1df"),l=a.n(s),f=function(t){Object(c["a"])(a,t);var e=Object(o["a"])(a);function a(){var t;return Object(n["a"])(this,a),t=e.apply(this,arguments),t.notificationList=[{id:1,detail:"Massa vitae tortor condimentum lacinia quis vel eros donec",created:l()().subtract(3,"days").fromNow()},{id:2,detail:"Lorem ipsum dolor sit amet",created:l()().subtract(3,"minutes").fromNow()},{id:3,detail:"Lorem dolor sed viverra ipsum",created:l()().subtract(1,"hours").fromNow()},{id:4,detail:"Egestas sed tempus urna",created:l()().fromNow()}],t}return Object(r["a"])(a,[{key:"getNotificationList",get:function(){return this.notificationList}}]),a}(u["d"]);f=Object(i["a"])([u["b"]],f),e["default"]=f},"72c2":function(t,e,a){"use strict";a.r(e);var n=a("5530"),r=a("d4ec"),c=a("bee2"),o=a("262e"),i=a("2caf"),u=(a("d3b7"),a("9ab4")),s=a("6fc5"),l=a("e738"),f=function(t){Object(o["a"])(a,t);var e=Object(i["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.categoryList={data:[],current_page:0,last_page:0,per_page:0,total:0},t.materialList={data:[],current_page:0,last_page:0,per_page:0,total:0},t}return Object(c["a"])(a,[{key:"getMaterialList",get:function(){return this.materialList.data}},{key:"getCategoryList",get:function(){return this.categoryList.data}},{key:"totalMaterialCount",get:function(){return this.materialList.total}},{key:"lastMaterialPage",get:function(){return this.materialList.last_page}},{key:"currentMaterialPage",get:function(){return this.materialList.current_page}},{key:"currentCategoryPage",get:function(){return this.categoryList.current_page}},{key:"totalCatergoryCount",get:function(){return this.categoryList.total}},{key:"lastCategoryPage",get:function(){return this.categoryList.last_page}},{key:"SET_MATERIAL_LIST",value:function(t){this.materialList=t}},{key:"SET_CATEGORY_LIST",value:function(t){this.categoryList=t}},{key:"fetch",value:function(t){var e=this;return new Promise((function(a){l["a"].get("materials",{params:Object(n["a"])(Object(n["a"])({},t),{},{per_page:10})}).then((function(t){e.context.commit("SET_MATERIAL_LIST",t.data),a(!0)})).catch((function(){}))}))}},{key:"fetchCategory",value:function(t){var e=this;return new Promise((function(a){l["a"].get("materialCategories",{params:Object(n["a"])(Object(n["a"])({},t),{},{per_page:10})}).then((function(t){e.context.commit("SET_CATEGORY_LIST",t.data),a(!0)})).catch((function(){}))}))}},{key:"save",value:function(t){var e=this;return new Promise((function(a){Object(l["a"])({method:t.id?"put":"post",url:t.id?"materials/".concat(t.id):"materials",data:t}).then((function(){e.context.dispatch("fetch"),a(!0)})).catch((function(){}))}))}},{key:"saveCategory",value:function(t){var e=this;return new Promise((function(a){l["a"].post("materialCategories",t).then((function(){e.context.dispatch("fetchCategory"),a(!0)})).catch((function(){}))}))}},{key:"destory",value:function(t){var e=this;return new Promise((function(a){l["a"].delete("materials/"+t).then((function(){e.context.dispatch("fetch"),a(!0)})).catch((function(){}))}))}},{key:"deleteCategory",value:function(t){var e=this;return new Promise((function(a){l["a"].delete("materialCategories/"+t).then((function(){e.context.dispatch("fetchCategory"),a(!0)})).catch((function(){}))}))}},{key:"nextMaterialPage",value:function(){var t=this;return new Promise((function(e){t.currentMaterialPage<t.lastMaterialPage&&t.context.dispatch("fetch",{page:t.currentMaterialPage+1}),e(!0)}))}},{key:"prevMaterialPage",value:function(){var t=this;return new Promise((function(e){t.currentMaterialPage>1&&t.context.dispatch("fetch",{page:t.currentMaterialPage-1}),e(!0)}))}},{key:"materialGotoPage",value:function(t){var e=this;return new Promise((function(a){e.currentMaterialPage>=1&&e.context.dispatch("fetch",{page:t}),a(!0)}))}},{key:"nextCategoryPage",value:function(){var t=this;return new Promise((function(e){t.currentCategoryPage<t.lastCategoryPage&&t.context.dispatch("fetchCategory",{page:t.currentCategoryPage+1}),e(!0)}))}},{key:"prevCategoryPage",value:function(){var t=this;return new Promise((function(e){t.currentCategoryPage>1&&t.context.dispatch("fetchCategory",{page:t.currentCategoryPage-1}),e(!0)}))}},{key:"categoryGotoPage",value:function(t){var e=this;return new Promise((function(a){e.currentCategoryPage>=1&&e.context.dispatch("fetchCategory",{page:t}),a(!0)}))}}]),a}(s["d"]);Object(u["a"])([s["c"]],f.prototype,"SET_MATERIAL_LIST",null),Object(u["a"])([s["c"]],f.prototype,"SET_CATEGORY_LIST",null),Object(u["a"])([s["a"]],f.prototype,"fetch",null),Object(u["a"])([s["a"]],f.prototype,"fetchCategory",null),Object(u["a"])([s["a"]],f.prototype,"save",null),Object(u["a"])([s["a"]],f.prototype,"saveCategory",null),Object(u["a"])([s["a"]],f.prototype,"destory",null),Object(u["a"])([s["a"]],f.prototype,"deleteCategory",null),Object(u["a"])([s["a"]],f.prototype,"nextMaterialPage",null),Object(u["a"])([s["a"]],f.prototype,"prevMaterialPage",null),Object(u["a"])([s["a"]],f.prototype,"materialGotoPage",null),Object(u["a"])([s["a"]],f.prototype,"nextCategoryPage",null),Object(u["a"])([s["a"]],f.prototype,"prevCategoryPage",null),Object(u["a"])([s["a"]],f.prototype,"categoryGotoPage",null),f=Object(u["a"])([s["b"]],f),e["default"]=f},"749d":function(t,e,a){"use strict";a.r(e);var n=a("5530"),r=a("d4ec"),c=a("bee2"),o=a("262e"),i=a("2caf"),u=(a("d3b7"),a("9ab4")),s=a("6fc5"),l=a("e738"),f=function(t){Object(o["a"])(a,t);var e=Object(i["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.rentList={data:[],current_page:0,last_page:0,per_page:0,total:0},t}return Object(c["a"])(a,[{key:"getRentList",get:function(){return this.rentList.data}},{key:"total",get:function(){return this.rentList.total}},{key:"lastPage",get:function(){return this.rentList.last_page}},{key:"currentPage",get:function(){return this.rentList.current_page}},{key:"SET_RENT_LIST",value:function(t){this.rentList=t}},{key:"fetch",value:function(t){var e=this;return new Promise((function(a){l["a"].get("rents",{params:Object(n["a"])(Object(n["a"])({},t),{},{per_page:10})}).then((function(t){e.context.commit("SET_RENT_LIST",t.data),a(!0)})).catch((function(){}))}))}},{key:"save",value:function(t){var e=this;return new Promise((function(a){Object(l["a"])({method:t.id?"put":"post",url:t.id?"rents/".concat(t.id):"rents",data:t}).then((function(){e.context.dispatch("fetch"),a(!0)})).catch((function(){}))}))}},{key:"destory",value:function(t){var e=this;return new Promise((function(a){l["a"].delete("rents/"+t).then((function(){e.context.dispatch("fetch"),a(!0)})).catch((function(){}))}))}},{key:"nextPage",value:function(){var t=this;return new Promise((function(e){t.currentPage<t.lastPage&&t.context.dispatch("fetch",{page:t.currentPage+1}),e(!0)}))}},{key:"prevPage",value:function(){var t=this;return new Promise((function(e){t.currentPage>1&&t.context.dispatch("fetch",{page:t.currentPage-1}),e(!0)}))}},{key:"gotoPage",value:function(t){var e=this;return new Promise((function(a){e.currentPage>=1&&e.context.dispatch("fetch",{page:t}),a(!0)}))}}]),a}(s["d"]);Object(u["a"])([s["c"]],f.prototype,"SET_RENT_LIST",null),Object(u["a"])([s["a"]],f.prototype,"fetch",null),Object(u["a"])([s["a"]],f.prototype,"save",null),Object(u["a"])([s["a"]],f.prototype,"destory",null),Object(u["a"])([s["a"]],f.prototype,"nextPage",null),Object(u["a"])([s["a"]],f.prototype,"prevPage",null),Object(u["a"])([s["a"]],f.prototype,"gotoPage",null),f=Object(u["a"])([s["b"]],f),e["default"]=f},"7f1d":function(t,e,a){"use strict";a.r(e);var n=a("5530"),r=a("d4ec"),c=a("bee2"),o=a("262e"),i=a("2caf"),u=(a("d3b7"),a("9ab4")),s=a("6fc5"),l=a("e738"),f=function(t){Object(o["a"])(a,t);var e=Object(i["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.userList={data:[],current_page:0,last_page:0,per_page:0,total:0},t}return Object(c["a"])(a,[{key:"getUserList",get:function(){return this.userList.data}},{key:"total",get:function(){return this.userList.total}},{key:"lastPage",get:function(){return this.userList.last_page}},{key:"currentPage",get:function(){return this.userList.current_page}},{key:"SET_USER_LIST",value:function(t){this.userList=t}},{key:"fetch",value:function(){var t=this,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],a=arguments.length>1?arguments[1]:void 0;return new Promise((function(r){var c=e?"admins":"users";t.context.commit("SET_USER_LIST",[]),l["a"].get(c,{params:Object(n["a"])(Object(n["a"])({},a),{},{per_page:10})}).then((function(e){t.context.commit("SET_USER_LIST",e.data),r(!0)})).catch((function(){}))}))}},{key:"destory",value:function(t){var e=this;return new Promise((function(a){l["a"].delete("users/"+t).then((function(){e.context.dispatch("fetchUser",!1),a(!0)})).catch((function(){}))}))}},{key:"nextPage",value:function(){var t=this;return new Promise((function(e){t.currentPage<t.lastPage&&t.context.dispatch("fetch",{page:t.currentPage+1}),e(!0)}))}},{key:"prevPage",value:function(){var t=this;return new Promise((function(e){t.currentPage>1&&t.context.dispatch("fetch",{page:t.currentPage-1}),e(!0)}))}},{key:"gotoPage",value:function(t){var e=this;return new Promise((function(a){e.currentPage>=1&&e.context.dispatch("fetch",{page:t}),a(!0)}))}}]),a}(s["d"]);Object(u["a"])([s["c"]],f.prototype,"SET_USER_LIST",null),Object(u["a"])([s["a"]],f.prototype,"fetch",null),Object(u["a"])([s["a"]],f.prototype,"destory",null),Object(u["a"])([s["a"]],f.prototype,"nextPage",null),Object(u["a"])([s["a"]],f.prototype,"prevPage",null),Object(u["a"])([s["a"]],f.prototype,"gotoPage",null),f=Object(u["a"])([s["b"]],f),e["default"]=f},afbc:function(t,e,a){"use strict";var n=a("2b0e"),r=a("8c4f"),c=(a("d3b7"),a("3ca3"),a("ddb0"),[{path:"/",name:"home",component:function(){return a.e("chunk-2d0e5f50").then(a.bind(null,"9762"))},meta:{layout:"simple",type:"unauthorized"}},{path:"/dashboard",name:"dashboard",component:function(){return a.e("chunk-2d0c8267").then(a.bind(null,"543e"))},meta:{layout:"default",type:"authorized"}},{path:"/login",name:"login",component:function(){return Promise.all([a.e("chunk-e4f79458"),a.e("chunk-2d0d7ab2")]).then(a.bind(null,"7894"))},meta:{layout:"simple",type:"unauthorized"}},{path:"/register",name:"register",component:function(){return Promise.all([a.e("chunk-e4f79458"),a.e("chunk-2d0d7ab2")]).then(a.bind(null,"7894"))},meta:{layout:"simple",type:"unauthorized"}},{path:"/login",name:"forgot-password",component:function(){return Promise.all([a.e("chunk-e4f79458"),a.e("chunk-2d0d7ab2")]).then(a.bind(null,"7894"))},meta:{layout:"simple",type:"unauthorized"}},{path:"/user",name:"user",component:function(){return a.e("chunk-6cab77ae").then(a.bind(null,"9f32"))},meta:{layout:"default",type:"authorized"}},{path:"/notification",name:"notification",component:function(){return a.e("chunk-2d0a441e").then(a.bind(null,"0657"))},meta:{layout:"default",type:"authorized"}},{path:"/realstate",name:"realstate",component:function(){return Promise.all([a.e("chunk-e4f79458"),a.e("chunk-326f9578"),a.e("chunk-04b7d073")]).then(a.bind(null,"aea4"))},meta:{layout:"default",type:"authorized"}},{path:"/material",name:"material",component:function(){return Promise.all([a.e("chunk-e4f79458"),a.e("chunk-326f9578"),a.e("chunk-4256027b")]).then(a.bind(null,"d3b1"))},meta:{layout:"default",type:"authorized"}},{path:"/setting",name:"setting",component:function(){return a.e("chunk-2d0a4b9e").then(a.bind(null,"0855"))},meta:{layout:"default",type:"authorized"}},{path:"/rent",name:"rent",component:function(){return Promise.all([a.e("chunk-e4f79458"),a.e("chunk-326f9578"),a.e("chunk-aadf2bb6")]).then(a.bind(null,"d7c6"))},meta:{layout:"default",type:"authorized"}},{path:"/training",name:"training",component:function(){return Promise.all([a.e("chunk-e4f79458"),a.e("chunk-326f9578"),a.e("chunk-aadc12ec")]).then(a.bind(null,"fd6c"))},meta:{layout:"default",type:"authorized"}},{path:"/:slug",name:"single_page",component:function(){return a.e("chunk-2d0d366a").then(a.bind(null,"5d38"))},meta:{layout:"simple",type:"unauthorized"}},{path:"*",name:"404",component:function(){return a.e("chunk-2d0decaa").then(a.bind(null,"86c9"))},meta:{layout:"simple",type:"none"}}]),o=c,i=a("0613"),u=function(t,e,a){var n=i["a"].getters["root/getToken"];n&&"null"!==n&&"undefined"!==n?a():a({name:"login"})},s=function(t,e,a){var n=i["a"].getters["root/getToken"];n&&"null"!==n&&a({name:"dashboard"}),a()},l=function(t,e,a){var n,r=null===t||void 0===t||null===(n=t.meta)||void 0===n?void 0:n.type;switch(r){case"authorized":u(t,e,a);break;case"unauthorized":s(t,e,a);break;default:a()}};n["a"].use(r["a"]);var f=new r["a"]({mode:"history",base:"/",routes:o});f.beforeEach(l);e["a"]=f},cd49:function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=a("d4ec"),c=a("bee2"),o=a("262e"),i=a("2caf"),u=a("9ab4"),s=a("1b40"),l=a("5530"),f=(a("b64b"),a("5aea"),a("d81d"),a("b0c0"),a("2f62")),d=[{name:"Users",path:"user"},{name:"Real State",path:"realstate"},{name:"Materials",path:"material"},{name:"Rent",path:"rent"},{name:"Training",path:"training"}],p=d,h=function(t){Object(o["a"])(a,t);var e=Object(i["a"])(a);function a(){return Object(r["a"])(this,a),e.apply(this,arguments)}return Object(c["a"])(a,[{key:"render",value:function(){var t=this,e=arguments[0];return e("header",{attrs:{id:"header"},class:"relative bg-gray-900 py-6"},[e("div",{class:"container flex justify-between items-center px-2 mx-auto"},[e("div",{class:"logo w-28"},[e("router-link",{class:"font-bold text-yellow-300",attrs:{to:{name:"home"}}},[e("img",{attrs:{src:"/img/logo.png",alt:"Maharjan Construction"}})])]),e("nav",{class:"hidden md:flex"},[e("ul",{class:"md:space-x-10 flex"},[p.map((function(a){return e("li",[e("router-link",{class:{"text-base font-medium hover:text-yellow-300":!0,"text-gray-500":t.$route.name!==a.path,"text-yellow-300":t.$route.name===a.path},attrs:{to:{name:a.path}}},[a.name])])})),e("li",[e("a",{attrs:{href:"#"},class:"text-base font-medium text-gray-500 hover:text-yellow-300",on:{click:this.makeLogout}},["Logout"])])])])])])}},{key:"makeLogout",value:function(t){var e=this;t.preventDefault(),this.logout().then((function(){e.$router.push({name:"login"})}))}}]),a}(s["c"]);h=Object(u["a"])([Object(s["a"])({methods:Object(l["a"])({},Object(f["b"])({logout:"root/logout"}))})],h);var b=h,g=function(t){Object(o["a"])(a,t);var e=Object(i["a"])(a);function a(){return Object(r["a"])(this,a),e.apply(this,arguments)}return Object(c["a"])(a,[{key:"mounted",value:function(){this.userDetail&&Object.keys(this.userDetail).length}},{key:"render",value:function(){var t=arguments[0];return t("div",{attrs:{id:"wrapper"},class:"bg-gray-800 text-gray-500 min-h-screen relative overflow-hidden"},[t(b),t("main",{attrs:{id:"main"}},[t("transition",{attrs:{name:"slide-fade",mode:"out-in"}},[t("router-view")])])])}}]),a}(s["c"]);g=Object(u["a"])([Object(s["a"])({computed:Object(l["a"])({},Object(f["c"])({userDetail:"root/getLoggedinUser"}))})],g);var m=g,j=function(t){Object(o["a"])(a,t);var e=Object(i["a"])(a);function a(){return Object(r["a"])(this,a),e.apply(this,arguments)}return Object(c["a"])(a,[{key:"render",value:function(){var t=arguments[0];return t("router-view")}}]),a}(s["c"]);j=Object(u["a"])([s["a"]],j);var y=j,v=function(t){Object(o["a"])(a,t);var e=Object(i["a"])(a);function a(){return Object(r["a"])(this,a),e.apply(this,arguments)}return Object(c["a"])(a,[{key:"render",value:function(){var t,e,a=arguments[0];return a("transition",{attrs:{name:"fade-transition"}},["default"===(null===this||void 0===this||null===(t=this.$route)||void 0===t||null===(e=t.meta)||void 0===e?void 0:e.layout)?a(m):a(y)])}}]),a}(s["c"]);v=Object(u["a"])([s["a"]],v);var k=v,O=a("afbc"),P=a("0613"),_=(a("159b"),a("7bb1")),w=a("4c93"),x=a("2593");Object.keys(w).forEach((function(t){Object(_["a"])(t,Object(l["a"])(Object(l["a"])({},w[t]),{},{message:x["a"][t]}))})),n["a"].directive("click-outside",{bind:function(t,e,a){if("function"!==typeof e.value){var n=a.context.name,r="[Vue-click-outside:] provided expression '".concat(e.expression,"' is not a function, but has to be");n&&(r+=" Found in component '".concat(n,"'")),console.warn(r)}var c=e.modifiers.bubble,o=function(a){(c||!t.contains(a.target)&&t!==a.target)&&e.value(a)};t.__vueClickOutside__=o,document.addEventListener("click",o)},unbind:function(t,e){document.removeEventListener("click",t.__vueClickOutside__),t.__vueClickOutside__=null}}),n["a"].config.productionTip=!1,n["a"].component("default",m),n["a"].component("simple",y),new n["a"]({router:O["a"],store:P["a"],render:function(t){return t(k)}}).$mount("#app")},e738:function(t,e,a){"use strict";a("b64b"),a("caad"),a("2532"),a("d3b7");var n=a("bc3a"),r=a.n(n),c=a("0613"),o=a("afbc"),i=Object.keys(window).length>0;i&&window.location.origin.includes("local");var u={baseURL:"http://api.mdreamcp.com/api"},s=r.a.create(u);s.interceptors.request.use((function(t){var e=c["a"].getters["root/getToken"];return e&&"null"!==e&&(t.headers.common["Authorization"]="Bearer ".concat(e)),t})),s.interceptors.response.use((function(t){return t}),(function(t){var e;return 403==(null===(e=t.response)||void 0===e?void 0:e.status)&&(c["a"].dispatch("root/resetUser"),o["a"].push({name:"login"})),new Promise((function(e,a){var n;a(null===(n=t.response)||void 0===n?void 0:n.data)}))})),e["a"]=s},f33f:function(t,e,a){"use strict";a.r(e);var n=a("5530"),r=(a("159b"),a("d3b7"),a("ddb0"),a("ac1f"),a("5319"),a("3f9b")),c={};r.keys().forEach((function(t){"./index.ts"!==t&&(c[t.replace(/(\.\/|\.ts)/g,"").toLowerCase()]=Object(n["a"])(Object(n["a"])({},r(t).default),{},{namespaced:!0}))})),e["default"]=c}});
//# sourceMappingURL=app.2ae56c2a.js.map
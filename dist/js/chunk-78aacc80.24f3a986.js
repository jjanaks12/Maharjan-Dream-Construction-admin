(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78aacc80"],{1276:function(e,t,r){"use strict";var i=r("d784"),n=r("44e7"),a=r("825a"),s=r("1d80"),c=r("4840"),l=r("8aa5"),o=r("50c4"),u=r("14c3"),d=r("9263"),f=r("9f7f"),h=r("d039"),v=f.UNSUPPORTED_Y,p=[].push,g=Math.min,b=4294967295,m=!h((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));i("split",(function(e,t,r){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,r){var i=String(s(this)),a=void 0===r?b:r>>>0;if(0===a)return[];if(void 0===e)return[i];if(!n(e))return t.call(i,e,a);var c,l,o,u=[],f=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),h=0,v=new RegExp(e.source,f+"g");while(c=d.call(v,i)){if(l=v.lastIndex,l>h&&(u.push(i.slice(h,c.index)),c.length>1&&c.index<i.length&&p.apply(u,c.slice(1)),o=c[0].length,h=l,u.length>=a))break;v.lastIndex===c.index&&v.lastIndex++}return h===i.length?!o&&v.test("")||u.push(""):u.push(i.slice(h)),u.length>a?u.slice(0,a):u}:"0".split(void 0,0).length?function(e,r){return void 0===e&&0===r?[]:t.call(this,e,r)}:t,[function(t,r){var n=s(this),a=void 0==t?void 0:t[e];return void 0!==a?a.call(t,n,r):i.call(String(n),t,r)},function(e,n){var s=r(i,this,e,n,i!==t);if(s.done)return s.value;var d=a(this),f=String(e),h=c(d,RegExp),p=d.unicode,m=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(v?"g":"y"),y=new h(v?"^(?:"+d.source+")":d,m),x=void 0===n?b:n>>>0;if(0===x)return[];if(0===f.length)return null===u(y,f)?[f]:[];var w=0,k=0,j=[];while(k<f.length){y.lastIndex=v?0:k;var O,M=u(y,v?f.slice(k):f);if(null===M||(O=g(o(y.lastIndex+(v?k:0)),f.length))===w)k=l(f,k,p);else{if(j.push(f.slice(w,k)),j.length===x)return j;for(var A=1;A<=M.length-1;A++)if(j.push(M[A]),j.length===x)return j;k=w=O}}return j.push(f.slice(w)),j}]}),!m,v)},2638:function(e,t,r){"use strict";function i(){return i=Object.assign||function(e){for(var t,r=1;r<arguments.length;r++)for(var i in t=arguments[r],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},i.apply(this,arguments)}var n=["attrs","props","domProps"],a=["class","style","directives"],s=["on","nativeOn"],c=function(e){return e.reduce((function(e,t){for(var r in t)if(e[r])if(-1!==n.indexOf(r))e[r]=i({},e[r],t[r]);else if(-1!==a.indexOf(r)){var c=e[r]instanceof Array?e[r]:[e[r]],o=t[r]instanceof Array?t[r]:[t[r]];e[r]=c.concat(o)}else if(-1!==s.indexOf(r))for(var u in t[r])if(e[r][u]){var d=e[r][u]instanceof Array?e[r][u]:[e[r][u]],f=t[r][u]instanceof Array?t[r][u]:[t[r][u]];e[r][u]=d.concat(f)}else e[r][u]=t[r][u];else if("hook"==r)for(var h in t[r])e[r][h]=e[r][h]?l(e[r][h],t[r][h]):t[r][h];else e[r]=t[r];else e[r]=t[r];return e}),{})},l=function(e,t){return function(){e&&e.apply(this,arguments),t&&t.apply(this,arguments)}};e.exports=c},"99af":function(e,t,r){"use strict";var i=r("23e7"),n=r("d039"),a=r("e8b5"),s=r("861d"),c=r("7b0b"),l=r("50c4"),o=r("8418"),u=r("65f0"),d=r("1dde"),f=r("b622"),h=r("2d00"),v=f("isConcatSpreadable"),p=9007199254740991,g="Maximum allowed index exceeded",b=h>=51||!n((function(){var e=[];return e[v]=!1,e.concat()[0]!==e})),m=d("concat"),y=function(e){if(!s(e))return!1;var t=e[v];return void 0!==t?!!t:a(e)},x=!b||!m;i({target:"Array",proto:!0,forced:x},{concat:function(e){var t,r,i,n,a,s=c(this),d=u(s,0),f=0;for(t=-1,i=arguments.length;t<i;t++)if(a=-1===t?s:arguments[t],y(a)){if(n=l(a.length),f+n>p)throw TypeError(g);for(r=0;r<n;r++,f++)r in a&&o(d,f,a[r])}else{if(f>=p)throw TypeError(g);o(d,f++,a)}return d.length=f,d}})},"9f32":function(e,t,r){"use strict";r.r(t);var i=r("5530"),n=r("d4ec"),a=r("bee2"),s=r("262e"),c=r("2caf"),l=(r("d81d"),r("9ab4")),o=r("1b40"),u=r("2f62"),d=r("2638"),f=r.n(d),h=(r("99af"),r("fb6a"),function(e){Object(s["a"])(r,e);var t=Object(c["a"])(r);function r(e){var i;return Object(n["a"])(this,r),i=t.call(this,e),i.checked=!1,i}return Object(a["a"])(r,[{key:"mounted",value:function(){this.checked=this.value}},{key:"render",value:function(){var e=this,t=arguments[0];return t("label",{class:"toggle"},[t("input",f()([{on:{change:[function(t){var r=e.checked,i=t.target,n=!!i.checked;if(Array.isArray(r)){var a=null,s=e._i(r,a);i.checked?s<0&&(e.checked=r.concat([a])):s>-1&&(e.checked=r.slice(0,s).concat(r.slice(s+1)))}else e.checked=n},this.changed]},attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.checked)?this._i(e.checked,null)>-1:e.checked}},{directives:[{name:"model",value:e.checked,modifiers:{}}]}])),t("span",{class:"toggle-knob"}),t("span",{class:"ml-3"},[this.$slots.default])])}},{key:"changed",value:function(e){this.$emit("input",this.checked)}}]),r}(o["c"]));Object(l["a"])([Object(o["b"])({required:!0})],h.prototype,"value",void 0),h=Object(l["a"])([o["a"]],h);var v=h,p=(r("b0c0"),r("a15b"),r("ac1f"),r("1276"),r("be07")),g=function(e){Object(s["a"])(r,e);var t=Object(c["a"])(r);function r(e){var i;return Object(n["a"])(this,r),i=t.call(this,e),i.name="UserCard",i.isDeleting=!1,i}return Object(a["a"])(r,[{key:"render",value:function(){var e=arguments[0];return e("div",{class:"lg:flex lg:items-center lg:justify-between bg-gray-900 rounded-lg"},[e("div",{class:"flex-grow lg:flex lg:items-center lg:justify-between p-3"},[e("div",{class:"flex-1 min-w-0 text-gray-200"},[e("h3",{class:"text-xl font-bold leading-7 capitalize sm:truncate"},[this.user.name," ",this.user.email_verified_at?e("span",{class:"text-green-400 text-xs"},["(verified)"]):null]),e("em",{class:"not-italic"},[this.user.email]),e("div",{class:"mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6"},[e("div",{class:"mt-2 flex items-center text-sm text-gray-500"},[e("svg",{class:"flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"}},[e("path",{attrs:{"fill-rule":"evenodd",d:"M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z","clip-rule":"evenodd"}})]),e("span",[Object(p["a"])(this.user.created_at)])])])]),this.isMaster?null:e("div",{class:"mt-5 flex lg:mt-0 lg:ml-4 md:space-x-5"},[e("button",{attrs:{type:"button"},class:"inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-red-900",on:{click:this.toggleDelete}},[e("svg",{class:"-ml-1 mr-2 h-5 w-5",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"}},[e("path",{attrs:{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"}})]),e("span",["Delete"])])])]),this.isDeleting?e("div",{class:"flex-grow-0 flex-shrink-0 h-full bg-black bg-opacity-30 w-40 flex flex-col p-4 items-center space-y-2 ml-3 rounded-md"},[e("a",{attrs:{href:"#"},class:"text-yellow-400 hover:text-gray-400 transition",on:{click:this.deleteUser}},["confirm"]),e("a",{attrs:{href:"#"},class:"text-green-400 hover:text-gray-400 transition",on:{click:this.toggleDelete}},["cancel"])]):null])}},{key:"getNameInitials",value:function(e){return e.split(" ").map((function(e){return e.charAt(0)})).join(" ")}},{key:"deleteUser",value:function(e){e.preventDefault(),this.$store.dispatch("user/destory",this.user.uuid)}},{key:"toggleDelete",value:function(e){e.preventDefault(),this.isDeleting=!this.isDeleting}}]),r}(o["c"]);Object(l["a"])([Object(o["b"])({required:!0})],g.prototype,"user",void 0),Object(l["a"])([Object(o["b"])({required:!0})],g.prototype,"isMaster",void 0),g=Object(l["a"])([o["a"]],g);var b=g,m=function(e){Object(s["a"])(r,e);var t=Object(c["a"])(r);function r(){var e;return Object(n["a"])(this,r),e=t.apply(this,arguments),e.isMaster=!1,e}return Object(a["a"])(r,[{key:"mounted",value:function(){this.$store.dispatch("user/fetchUser",this.isMaster)}},{key:"watchIsMaster",value:function(){this.$store.dispatch("user/fetchUser",this.isMaster)}},{key:"render",value:function(){var e=this,t=arguments[0];return t("div",{class:"py-8"},[t("div",{class:"container mx-auto px-2"},[t("header",{class:"text-gray-500 flex justify-between items-center mb-10"},[t("h2",{class:"text-3xl font-bold capitalize sm:truncate"},["User List"]),t(v,{model:{value:e.isMaster,callback:function(t){e.isMaster=t}}},[this.isMaster?"Showing Admins":"Showing Users"])]),t("transition-group",{attrs:{tag:"div",name:"fade-in"},class:"md:space-y-1"},[this.userList.map((function(r,i){return t(b,{attrs:{isMaster:e.isMaster,user:r},key:i,style:{"--transition-delay":.3*i+"s"}})}))])])])}}]),r}(o["c"]);Object(l["a"])([Object(o["d"])("isMaster")],m.prototype,"watchIsMaster",null),m=Object(l["a"])([Object(o["a"])({computed:Object(i["a"])({},Object(u["c"])({userList:"user/getUserList"}))})],m);t["default"]=m},a15b:function(e,t,r){"use strict";var i=r("23e7"),n=r("44ad"),a=r("fc6a"),s=r("a640"),c=[].join,l=n!=Object,o=s("join",",");i({target:"Array",proto:!0,forced:l||!o},{join:function(e){return c.call(a(this),void 0===e?",":e)}})},be07:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var i=r("c1df"),n=r.n(i),a=function(e){var t=n()(e).diff(n()(),"days");return t>=7?n()(e).local().format("DD/MM/YYYY"):t<1?n()(e).fromNow():t<7?t+"days ago":""},s=a},fb6a:function(e,t,r){"use strict";var i=r("23e7"),n=r("861d"),a=r("e8b5"),s=r("23cb"),c=r("50c4"),l=r("fc6a"),o=r("8418"),u=r("b622"),d=r("1dde"),f=d("slice"),h=u("species"),v=[].slice,p=Math.max;i({target:"Array",proto:!0,forced:!f},{slice:function(e,t){var r,i,u,d=l(this),f=c(d.length),g=s(e,f),b=s(void 0===t?f:t,f);if(a(d)&&(r=d.constructor,"function"!=typeof r||r!==Array&&!a(r.prototype)?n(r)&&(r=r[h],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return v.call(d,g,b);for(i=new(void 0===r?Array:r)(p(b-g,0)),u=0;g<b;g++,u++)g in d&&o(i,u,d[g]);return i.length=u,i}})}}]);
//# sourceMappingURL=chunk-78aacc80.24f3a986.js.map
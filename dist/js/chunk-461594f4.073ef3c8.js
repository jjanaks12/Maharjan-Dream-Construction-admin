(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-461594f4"],{2638:function(e,r,t){"use strict";function a(){return a=Object.assign||function(e){for(var r,t=1;t<arguments.length;t++)for(var a in r=arguments[t],r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);return e},a.apply(this,arguments)}var s=["attrs","props","domProps"],n=["class","style","directives"],o=["on","nativeOn"],i=function(e){return e.reduce((function(e,r){for(var t in r)if(e[t])if(-1!==s.indexOf(t))e[t]=a({},e[t],r[t]);else if(-1!==n.indexOf(t)){var i=e[t]instanceof Array?e[t]:[e[t]],l=r[t]instanceof Array?r[t]:[r[t]];e[t]=i.concat(l)}else if(-1!==o.indexOf(t))for(var u in r[t])if(e[t][u]){var d=e[t][u]instanceof Array?e[t][u]:[e[t][u]],f=r[t][u]instanceof Array?r[t][u]:[r[t][u]];e[t][u]=d.concat(f)}else e[t][u]=r[t][u];else if("hook"==t)for(var m in r[t])e[t][m]=e[t][m]?c(e[t][m],r[t][m]):r[t][m];else e[t]=r[t];else e[t]=r[t];return e}),{})},c=function(e,r){return function(){e&&e.apply(this,arguments),r&&r.apply(this,arguments)}};e.exports=i},7894:function(e,r,t){"use strict";t.r(r);var a=t("5530"),s=t("1da1"),n=t("2638"),o=t.n(n),i=t("d4ec"),c=t("bee2"),l=t("262e"),u=t("2caf"),d=(t("96cf"),t("d3b7"),t("9ab4")),f=t("f481"),m=t("7f7e"),p=t("7bb1"),b=t("1b40"),h=t("2f62"),g=function(e){Object(l["a"])(t,e);var r=Object(u["a"])(t);function t(){var e;return Object(i["a"])(this,t),e=r.call(this),e.isLoggingIn=!1,e.formData={email:"admin@gmail.com",password:"password"},e.errors={email:[],password:[]},e}return Object(c["a"])(t,[{key:"render",value:function(){var e=this,r=arguments[0];return r("div",{class:"min-h-screen flex items-center justify-center bg-gray-800"},[r("div",{class:"bg-gray-900 p-5 pb-8 max-w-md w-full space-y-8 rounded-lg"},[r("h1",{class:"mt-6 text-center text-3xl font-extrabold text-gray-500"},["Sign in to your account"]),r("form",{class:"mt-8 space-y-6",attrs:{action:"#",method:"POST",novalidate:!0},on:{submit:this.formSubmitted}},[r("div",{class:"rounded-md shadow-sm -space-y-px"},[r("div",[r("label",{attrs:{for:"email-address"},class:"sr-only"},["Email address"]),r("input",o()([{on:{input:function(r){r.target.composing||e.$set(e.formData,"email",r.target.value)}},attrs:{id:"email-address",name:"email",type:"email",autocomplete:"email",required:!0,placeholder:"Email address"},class:{"appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm":!0,"border-gray-300":0==this.errors.email.length,"border-red-300 placeholder-red-700 text-red-700":this.errors.email.length>0},domProps:{value:e.formData.email}},{directives:[{name:"model",value:e.formData.email,modifiers:{}}]}]))]),r("div",[r("label",{attrs:{for:"password"},class:"sr-only"},["Password"]),r("input",o()([{on:{input:function(r){r.target.composing||e.$set(e.formData,"password",r.target.value)}},attrs:{id:"password",name:"password",type:"password",autocomplete:"current-password",required:!0,placeholder:"Password"},class:{"appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm":!0,"border-gray-300":0==this.errors.password.length,"border-red-300 placeholder-red-700 text-red-700":this.errors.password.length>0},domProps:{value:e.formData.password}},{directives:[{name:"model",value:e.formData.password,modifiers:{}}]}]))])]),r("div",{class:"flex items-center justify-between"},[r("div",{class:"text-sm"},[r("router-link",{attrs:{to:"#"},class:"font-medium text-indigo-600 hover:text-indigo-500"},["Forgot your password?"])])]),r("button",{attrs:{type:"submit"},class:"group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"},[this.isLoggingIn?r("svg",{class:"h-5 w-5 mr-2 animate-spin",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[r("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"}})]):null,r("span",["Sign in"])])])]),this.hasError?r(f["a"],{attrs:{message:this.errorMessage}}):null])}},{key:"formSubmitted",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(r){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r.preventDefault(),this.resetErrorMessage(),e.next=4,Object(p["b"])(this.formData.email,"required|email|min:4",{name:"email"}).then((function(e){t.errors["email"]=e.errors}));case 4:return e.next=6,Object(p["b"])(this.formData.password,"required",{name:"password"}).then((function(e){t.errors["password"]=e.errors}));case 6:this.$nextTick((function(){t.hasError||(t.isLoggingIn=!0,t.login(t.formData).then((function(){t.$router.push({name:"dashboard"})})).finally((function(){t.isLoggingIn=!1})))}));case 7:case"end":return e.stop()}}),e,this)})));function r(r){return e.apply(this,arguments)}return r}()}]),t}(m["a"]);g=Object(d["a"])([Object(b["a"])({methods:Object(a["a"])({},Object(h["b"])({login:"root/login"}))})],g),r["default"]=g},"7f7e":function(e,r,t){"use strict";var a,s=t("d4ec"),n=t("bee2"),o=t("262e"),i=t("2caf"),c=(t("b64b"),t("159b"),t("9ab4")),l=t("1b40"),u=function(e){Object(o["a"])(t,e);var r=Object(i["a"])(t);function t(){return Object(s["a"])(this,t),r.apply(this,arguments)}return Object(n["a"])(t,[{key:"errorWatcher",value:function(){var e=this;a||(a=setTimeout((function(){e.resetErrorMessage()}),7e3))}},{key:"hasError",get:function(){var e=this;return Object.keys(this.errors).reduce((function(r,t){return r||e.errors[t].length>0}),!1)}},{key:"errorMessage",get:function(){var e="";for(var r in this.errors)if(this.errors[r].length>0)return e=this.errors[r][0],e;return e}},{key:"resetErrorMessage",value:function(){var e=this;Object.keys(this.errors).forEach((function(r){e.errors[r]=[]}))}}]),t}(l["c"]);Object(c["a"])([Object(l["d"])("errors",{deep:!0})],u.prototype,"errorWatcher",null),u=Object(c["a"])([l["a"]],u),r["a"]=u},f481:function(e,r,t){"use strict";var a=t("d4ec"),s=t("bee2"),n=t("262e"),o=t("2caf"),i=t("9ab4"),c=t("1b40"),l=function(e){Object(n["a"])(t,e);var r=Object(o["a"])(t);function t(e){return Object(a["a"])(this,t),r.call(this,e)}return Object(s["a"])(t,[{key:"render",value:function(){var e=arguments[0];return e("div",{class:"w-96 bg-red-900 fixed rounded-lg bottom-7 right-10 alert py-3 px-3"},[e("div",{class:"flex items-center justify-between flex-wrap"},[e("div",{class:"w-0 flex-1 flex items-center"},[e("p",{class:"text-white truncate"},[this.message])])])])}},{key:"closeBar",value:function(e){e.preventDefault()}}]),t}(c["c"]);Object(i["a"])([Object(c["b"])({required:!0})],l.prototype,"message",void 0),l=Object(i["a"])([c["a"]],l),r["a"]=l}}]);
//# sourceMappingURL=chunk-461594f4.073ef3c8.js.map
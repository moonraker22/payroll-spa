import{w as s,g as t,f as i,x as o,j as e,o as n,F as a}from"./index-24a35cdf.js";function d(){const r=s();if(t(),i(),console.log(r),o(r)){if(r.status===404)return e("div",{children:"This page doesn't exist!"});if(r.status===401)return e("div",{children:"You aren't authorized to see this"});if(r.status===503)return e("div",{children:"Looks like our API is down"});if(r.status===418)return e("div",{children:"🫖"})}return n(a,{children:[e("div",{children:"Something went wrong"}),e("div",{children:JSON.stringify(r)})]})}export{d as default};
//# sourceMappingURL=ErrorPage-7dcacfab.js.map
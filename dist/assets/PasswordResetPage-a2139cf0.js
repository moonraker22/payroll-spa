import{r as a,B as M,D as o,j as r,Q as q,M as A,v as L}from"./index.esm-09f2711e.js";import{u as z,s as T,f as U,I as n,F as p,a as u,b as f}from"./zod.module-1bddeb2b.js";import{c as V}from"./firebase-ccb7ec06.js";import{u as O}from"./store-51b217b0.js";import{S as Q}from"./isGoogleSlideIn-921f64e3.js";import{u as J}from"./usePasswordReset-4ca9ab81.js";import{m as x}from"./motion-6436106a.js";import{a as K,C,b as N,B as t,H as X,T as Y}from"./index.esm-471b626d.js";import{a as b}from"./index.esm-58215cd6.js";import"./index-75959897.js";import"./index.esm-2da43d16.js";import"./index.esm-d752f8ac.js";import"./index.esm-0dd58088.js";import"./index.esm-ac24b545.js";import"./constants-4856e09f.js";function fr(){const[P,S]=a.exports.useState(!1),w=O(),{register:d,handleSubmit:v,watch:h,setError:F,clearErrors:E,setFocus:R,formState:{errors:s,isDirty:I,isSubmitting:D,isValid:k,touchedFields:Z}}=z({resolver:T(U)}),{updatePass:B,error:_}=J(),G=async e=>{try{await B(e.password,e.currentPassword)}catch(i){console.log(i)}};a.exports.useEffect(()=>{R("password")},[]);const W=M("white"," gray.800"),l=h("password"),c=h("passwordConfirmation"),j=e=>{l!==e?F("passwordConfirmation",{type:"manual",message:"Passwords should match!"}):E("passwordConfirmation")};a.exports.useEffect(()=>{j(c)},[l,c]);const g=()=>{var i,y;const e=(i=V)==null?void 0:i.currentUser;return e!==null&&((y=e==null?void 0:e.providerData[0])==null?void 0:y.providerId)==="google.com"},H=!g()&&I&&k&&l===c;a.exports.useEffect(()=>{S(g())},[]);const m=a.exports.useRef(null);return a.exports.useEffect(()=>{m.current&&(m.current.value=w.userEmail)},[w.userEmail]),o(K,{maxW:"container.xl",centerContent:!0,mt:10,children:[r(C,{children:r(N,{mt:"10",as:x.h1,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},bgGradient:"linear(to-b, #42047e, #07f49e)",bgClip:"text",fontSize:["3xl","3xl","4xl"],fontWeight:"extrabold",children:"Update Password"})}),r(x.div,{initial:{opacity:0,y:80,scale:.8},animate:{opacity:1,y:0,scale:[.9,1.2,1]},transition:{type:"spring",stiffness:90,damping:15},exit:{opacity:0},children:r(t,{bg:W,border:"2px",borderColor:"gray.700",boxShadow:"dark-lg",p:"5",rounded:"md",mt:10,mb:10,w:"50vw",maxW:"500px",minW:"350px",children:r(t,{p:"3",children:o(q,{onSubmit:v(G),children:[o(t,{my:2,children:[r(n,{type:"hidden",autoComplete:"email",ref:m,placeholder:"username"}),o(p,{isInvalid:!!s.password,isRequired:!0,variant:"floating",children:[r(n,{...d("password"),id:"password",type:"password",placeholder:"Password",autoComplete:"new-password",mb:"3"}),r(u,{htmlFor:"password",children:"Password:"}),r(f,{children:s.password&&s.password.message})]})]}),r(t,{my:2,children:o(p,{isInvalid:!!s.passwordConfirmation,isRequired:!0,variant:"floating",children:[r(n,{...d("passwordConfirmation"),id:"passwordConfirmation",type:"password",placeholder:"Password Confirmation",autoComplete:"new-password",mb:"3"}),r(u,{htmlFor:"passwordConfirmation",children:"Password Confirmation:"}),r(f,{children:s.passwordConfirmation&&s.passwordConfirmation.message})]})}),r(t,{my:2,children:o(p,{isInvalid:!!s.currentPassword,isRequired:!0,variant:"floating",children:[r(n,{...d("currentPassword"),id:"currentPassword",type:"password",placeholder:"Current Password",autoComplete:"new-password",mb:"1"}),r(u,{htmlFor:"currentPassword",children:"Current Password:"}),r(f,{children:s.currentPassword&&s.currentPassword.message})]})}),r(C,{my:2,children:r(b,{my:4,w:"full",colorScheme:"cyan",isLoading:D,type:"submit",size:"lg",disabled:!H,variant:"outline",children:"Submit"})}),o(X,{spacing:"1",justify:"center",children:[r(Y,{color:"muted",children:"Go back to"}),r(b,{as:A,to:L.DASHBOARD,variant:"link",colorScheme:"cyan",children:"Dashboard"})]})]})})})}),r(Q,{isGoogle:P})]})}export{fr as default};
//# sourceMappingURL=PasswordResetPage-a2139cf0.js.map
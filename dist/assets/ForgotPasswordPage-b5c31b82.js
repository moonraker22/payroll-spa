import{d as S,r as s,j as e,p as i}from"./index-ad61e450.js";import{i as w,n as v,q as F,v as C,M as E,w as n,N as l,R as I,x as t,F as R,y as D,I as L,z as W,D as j,H as z,s as B,J as H,ax as M}from"./routes-3ee497c9.js";import{u as q}from"./usePasswordReset-ea3187d2.js";function G(){const o=w(B),{passwordResetEmail:m}=q(),c=S();s.exports.useEffect(()=>{o.userId&&c(v.DASHBOARD)},[o.userId]);const{register:d,handleSubmit:u,watch:A,setFocus:h,formState:{errors:a,isDirty:p,isSubmitting:r,isValid:g,touchedFields:N}}=F({resolver:H(M)}),x=C("white"," gray.800"),b=async y=>{try{m(y.email)}catch(f){console.log(f)}};return s.exports.useEffect(()=>{h("email")},[]),e(E,{maxW:"container.xl",centerContent:!0,mt:8,children:i(n.div,{initial:{opacity:0,y:80},animate:{opacity:1,y:0},exit:{opacity:0},children:[e(l,{mt:5,children:e(I,{mt:"10",fontSize:["3xl","3xl","4xl"],as:n.h1,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},bgGradient:"linear(to-b, #42047e, #07f49e)",bgClip:"text",fontWeight:"extrabold",children:"Reset Password"})}),e(t,{bg:x,border:"2px",borderColor:"gray.700",boxShadow:"dark-lg",p:"6",rounded:"md",mt:10,mb:10,w:"50vw",maxW:"450px",minW:"300px",children:e(t,{p:"3",children:i(R,{onSubmit:u(b),children:[e(t,{mb:2,children:i(D,{isInvalid:!!a.email,isRequired:!0,variant:"floating",children:[e(L,{...d("email"),id:"email",type:"email",placeholder:"Email",autoComplete:"email"}),e(W,{htmlFor:"email",children:"Email"}),e(j,{children:a.email&&a.email.message})]})}),e(l,{my:2,children:e(z,{mt:4,w:"full",colorScheme:"cyan",isLoading:r,type:"submit",size:"lg",disabled:!p||!g||r,loadingText:"Logging In",variant:"outline",_hover:{bg:"cyan.600",color:"white",scale:1.1},children:"Submit"})})]})})})]})})}export{G as default};
import{t as q,E as V,B as c,r as d,v as m,j as e,D as o,Q as N,M as x}from"./index.esm-09f2711e.js";import{u as Q,s as $,L as J,F as b,I as v,a as w,b as S,c as K,d as U}from"./zod.module-1bddeb2b.js";import{a as X}from"./useAuth-6a2822c4.js";import{u as Y,G as Z}from"./GoogleIcon-3ad8c40f.js";import{u as ee}from"./store-51b217b0.js";import{G as L}from"./iconBase-7b4876a9.js";import{m as p}from"./motion-6436106a.js";import{u as oe}from"./index.esm-ac24b545.js";import{C as i,b as re,B as t,T as C,F as ae}from"./index.esm-471b626d.js";import{I as ie,a as n}from"./index.esm-58215cd6.js";import"./index-75959897.js";import"./firebase-ccb7ec06.js";import"./index.esm-2da43d16.js";import"./index.esm-d752f8ac.js";import"./constants-4856e09f.js";function te(r){return L({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z",clipRule:"evenodd"}},{tag:"path",attr:{d:"M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"}}]})(r)}function le(r){return L({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor"},child:[{tag:"path",attr:{d:"M10 12a2 2 0 100-4 2 2 0 000 4z"}},{tag:"path",attr:{fillRule:"evenodd",d:"M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",clipRule:"evenodd"}}]})(r)}function Ie(){const r=ee();q();const R=V(),u=c("gray.800","gray.200"),g=c("gray.400","gray.500"),I=c("white"," gray.800");d.exports.useEffect(()=>{r.userId&&R(m.DASHBOARD)},[r.userId]);const{register:h,handleSubmit:F,watch:f,setFocus:E,formState:{errors:a,isDirty:z,isSubmitting:G,isValid:k,touchedFields:ne}}=Q({resolver:$(J)}),M=f("password"),B=f("email"),D=z&&k&&M&&B,{login:O,isLoading:se,error:ce}=X(),T=async l=>{try{O({email:l.email,password:l.password})}catch(_){console.log(_)}};d.exports.useEffect(()=>{E("email")},[]);const{isOpen:s,onToggle:A}=oe(),y=d.exports.useRef(null),W=()=>{A(),y.current&&y.current.focus({preventScroll:!0})},{googleLogin:j,isLoading:H,error:de}=Y(),P=async()=>{try{j()}catch(l){console.log(l)}};return e(i,{maxW:{base:"100%",sm:"95%"},mt:8,children:o(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[e(i,{mt:5,children:e(re,{mt:"10",fontSize:["4xl","4xl","5xl"],as:p.h1,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},bgGradient:"linear(to-b, #42047e, #07f49e)",bgClip:"text",fontWeight:"extrabold",children:"Login"})}),e(p.div,{initial:{opacity:0,y:80,scale:.8},animate:{opacity:1,y:0,scale:[.9,1.2,1]},transition:{type:"spring",stiffness:90,damping:15},exit:{opacity:0},children:e(t,{bg:I,border:"2px",borderColor:"cyan.600",boxShadow:"dark-lg",p:"6",rounded:"md",mt:10,mb:10,w:"50vw",maxW:"450px",minW:"350px",children:e(t,{p:"3",children:o(N,{onSubmit:F(T),children:[e(t,{mb:2,children:o(b,{isInvalid:!!a.email,isRequired:!0,variant:"floating",children:[e(v,{...h("email"),id:"email",type:"email",placeholder:"Email",autoComplete:"email",mb:"5",_placeholder:{color:g}}),e(w,{htmlFor:"email",children:"Email"}),e(S,{children:a.email&&a.email.message})]})}),e(t,{my:2,children:o(b,{isInvalid:!!a.password,isRequired:!0,variant:"floating",children:[o(K,{children:[e(U,{children:e(ie,{variant:"link","aria-label":s?"Mask password":"Reveal password",icon:s?e(te,{}):e(le,{}),onClick:W})}),e(v,{...h("password"),id:"password",name:"password",type:s?"text":"password",autoComplete:"current-password",required:!0,placeholder:"Password",mb:"2",_placeholder:{color:g}}),e(w,{htmlFor:"password",children:"Password"})]}),e(S,{children:a.password&&a.password.message})]})}),e(i,{my:2,children:e(n,{mt:4,w:"full",colorScheme:"cyan",isLoading:G,type:"submit",size:"lg",disabled:!D,loadingText:"Logging In",variant:"outline",_hover:{bg:"cyan.600",color:"white",scale:1.1},children:"Submit"})}),e(i,{mb:"8px",children:e(C,{color:u,children:"Or sign in with Google"})}),o(ae,{justify:"center",flexDir:"column",children:[e(t,{children:e(n,{width:"full",onClick:P,disabled:H,loadingText:"Logging In",variant:"outline",colorScheme:"cyan",size:"lg",children:e(Z,{boxSize:"5"})})}),o(t,{children:[o(i,{my:"6px",children:[e(C,{mt:"3px",mr:"5px",color:u,children:"Don't have an account?"}),o(n,{as:x,variant:"link",colorScheme:"cyan",to:m.REGISTER,children:[" ","Sign up"]})]}),e(i,{children:o(n,{mt:"8px",as:x,variant:"link",colorScheme:"cyan",to:m.FORGOT_PASSWORD,children:[" ","Forgot Password"]})})]})]})]})})})})]})})}export{Ie as default};
//# sourceMappingURL=LoginPage-075aa0f6.js.map
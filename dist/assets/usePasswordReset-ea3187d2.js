import{r as n,d as f}from"./index-ad61e450.js";import{ao as P,u as m,c as i,ap as w,n as u,aq as y,ar as b,as as h,at as v}from"./routes-3ee497c9.js";const x=()=>{const[d,e]=n.exports.useState(""),[c,o]=n.exports.useState(!1);P(i);const l=f(),s=m();return{error:d,loading:c,passwordResetEmail:async t=>{if(console.log("email",t),o(!0),!t){e("Please enter your email"),s({title:"Password reset failed",description:"Please enter your email",status:"error",isClosable:!0,position:"top",duration:5e3,variant:"solid"});return}try{await w(i,t),s({title:"Password reset email sent, please check your inbox",status:"success",isClosable:!0,position:"top",duration:5e3,colorScheme:"cyan",variant:"solid"}),l(u.LOGIN)}catch(r){e(r.message),s({title:"Password reset failed",description:r.message,status:"error",isClosable:!0,position:"top",duration:5e3,variant:"solid"})}finally{o(!1)}},confirmPassReset:async(t,r)=>{if(o(!0),!t){e("Please enter your code"),s({title:"Password reset failed",description:"Please enter your code",status:"error",isClosable:!0,position:"top",duration:5e3,variant:"solid"});return}if(!r){e("Please enter your new password"),s({title:"Password reset failed",description:"Please enter your new password",status:"error",isClosable:!0,position:"top",duration:5e3,variant:"solid"});return}if(r.length<6){e("Password must be at least 6 characters"),s({title:"Password reset failed",description:"Password must be at least 6 characters",status:"error",isClosable:!0,position:"top",duration:5e3,variant:"solid"});return}try{await y(i,t,r),s({title:"Password reset successful",status:"success",isClosable:!0,position:"top",duration:5e3,colorScheme:"cyan",variant:"solid"}),l(u.LOGIN)}catch(a){e(a.message),s({title:"Password reset failed",description:a.message,status:"error",isClosable:!0,position:"top",duration:5e3,variant:"solid"})}finally{o(!1)}},updatePass:async(t,r)=>{if(o(!0),!t){e("Please enter your new password"),s({title:"Password reset failed",description:"Please enter your new password",status:"error",isClosable:!0,position:"top",duration:5e3,variant:"solid"});return}if(!r){e("Password must be at least 6 characters"),s({title:"Password reset failed",description:"Password must be at least 6 characters",status:"error",isClosable:!0,position:"top",duration:5e3,variant:"solid"});return}try{const a=b.credential(i.currentUser.email,r);await h(i.currentUser,a);const p=await v(i.currentUser,t);console.log(p),s({title:"Password reset successful",status:"success",isClosable:!0,position:"top",duration:5e3,colorScheme:"cyan",variant:"solid"}),l("/login")}catch(a){e(a.message),s({title:"Password reset failed",description:a.message,status:"error",isClosable:!0,position:"top",duration:5e3,variant:"solid"})}finally{o(!1)}}}};export{x as u};
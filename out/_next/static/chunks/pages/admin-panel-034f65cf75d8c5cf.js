(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[653],{4452:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin-panel",function(){return t(8346)}])},8435:function(e,n,t){"use strict";var r=t(5893);t(7294);var i=t(2653),o=t(8069),a=t(4246),l=t(8163),c=t(3367),s=t(1664),d=t.n(s),h=t(2140),p=t(6820),u=t(1932);n.Z=()=>{let{toggleTheme:e,theme:n}=(0,h.T)();return(0,r.jsx)(i.Z,{position:"fixed",style:{backgroundColor:n.palette.background.paper,color:n.palette.text.primary},children:(0,r.jsxs)(o.Z,{children:[(0,r.jsx)(a.Z,{variant:"h6",style:{flexGrow:1,paddingRight:"2.5vw",paddingLeft:"5vw"},children:"Admin Panel"}),(0,r.jsx)(l.Z,{color:"inherit",children:(0,r.jsx)(d(),{href:"/contentBrowser",style:{color:"inherit",textDecoration:"none"},children:"Content"})}),(0,r.jsx)(c.Z,{color:"inherit",onClick:e,style:{marginRight:"5vw",marginLeft:"2.5vw"},children:"dark"===n.palette.mode?(0,r.jsx)(u.Z,{}):(0,r.jsx)(p.Z,{})})]})})}},1314:function(e,n,t){"use strict";var r=t(5893);t(7294);var i=t(6722),o=t(4246),a=t(9360),l=t(8655);n.Z=e=>{let{title:n}=e,t=(0,a.Z)();return(0,r.jsx)(i.Z,{textAlign:"center",marginY:2,padding:2,paddingY:4,bgcolor:(0,l.Fq)(t.palette.background.paper,.8),color:t.palette.primary.main,marginTop:"3rem",borderRadius:1,boxShadow:4,children:(0,r.jsx)(o.Z,{variant:"h3",style:{fontWeight:"bold",letterSpacing:"1.8x"},children:n})})}},8346:function(e,n,t){"use strict";t.r(n);var r=t(5893),i=t(7294),o=t(1163),a=t(8715),l=t(440),c=t(6722),s=t(4246),d=t(1314),h=t(8435);n.default=()=>{let e=(0,o.useRouter)();return(0,i.useEffect)(()=>{let n=localStorage.getItem("token");if(!n){e.push("/admin-login");return}(async()=>{try{(await fetch("".concat("https://savorsauce-backend.nathaniellybrand.workers.dev","/verify-token"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(n)},body:JSON.stringify({})})).ok||(localStorage.removeItem("token"),e.push("/admin-login"))}catch(n){console.error("Token verification error:",n),localStorage.removeItem("token"),e.push("/admin-login")}})()},[e]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(h.Z,{}),(0,r.jsx)(a.Z,{maxWidth:"sm",style:{marginTop:"5rem",paddingTop:"2rem"},children:(0,r.jsxs)(l.Z,{elevation:3,style:{padding:"2rem"},children:[(0,r.jsx)(d.Z,{title:"Admin Panel"}),(0,r.jsxs)(c.Z,{textAlign:"center",children:[(0,r.jsx)(s.Z,{variant:"h4",gutterBottom:!0,children:"Welcome to the Admin Panel"}),(0,r.jsx)(s.Z,{variant:"body1",children:"Here you can manage your application settings and data."})]})]})})]})}},1163:function(e,n,t){e.exports=t(9090)}},function(e){e.O(0,[243,645,888,774,179],function(){return e(e.s=4452)}),_N_E=e.O()}]);
(function(){
"use strict";
// ---------- config ----------
const SUPA_URL = "https://exfxqtgcvbfpvgiykupk.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZnhxdGdjdmJmcHZnaXlrdXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NzgzNjQsImV4cCI6MjA5MDQ1NDM2NH0.cCqvsJ1fgZ4xs0x-q57iHIjbpwrBBO8GvZ1X2h-6LBo";
const DEMO_SLUG = "demo";
const DEMO_KEY = "7d4ff772fa0a253cfabc7855"; // demo shop only: settings are locked on the server
const BASE = location.origin + location.pathname.replace(/index\.html$/,"");
const P = new URLSearchParams(location.search);
const SLUG = (P.get("s")||"").toLowerCase();
const VIEW = P.get("v") || (SLUG ? "customer" : "home");
const KEY = P.get("k") || "";

// ---------- i18n ----------
const T = {
ar:{
 tabHome:"الرئيسية",tabDemo:"عرض تجريبي",
 eyebrow:"نظام نداء ذكي للمقاهي والمطاعم",heroA:"جوال الزبون صار",heroB:"البيجر",
 heroP:"بدون تطبيق وبدون أجهزة. الزبون يمسح الكود على الكاونتر، يكتب رقم فاتورته، ويقعد مرتاح. لما الطلب يجهز، الكاشير يضغط زر واحد وجوال الزبون يرن ويهتز.",
 tryDemo:"جرّب العرض الكامل",artYour:"طلبك جاهز",artSub:"تفضل استلمه من الكاونتر",artOrder:"فاتورة رقم",
 howTitle:"كيف يشتغل",
 s1b:"الكاشير يطبع الفاتورة",s1:"زي ما هو معتاد، بدون أي تغيير بطريقة الشغل.",
 s2b:"الزبون يمسح الكود",s2:"QR على الكاونتر يفتح صفحة المحل مباشرة، بدون تحميل تطبيق.",
 s3b:"يكتب رقم الفاتورة",s3:"الطلب بينزل لحاله على شاشة الكاشير، والكاشير ما بيسجّل إشي.",
 s4b:"الكاشير يضغط «جاهز»",s4:"جوال الزبون يرن ويهتز، وبعد الاستلام نطلب منه تقييم على جوجل.",
 screensTitle:"جرّب الشاشات",
 scDemo:"العرض التجريبي",scDemoP:"جوال الزبون وشاشة الكاشير جنب بعض.",
 scCust:"صفحة الزبون",scCustP:"اللي بتفتح لما الزبون يمسح الكود. جرّبها من جوال ثاني.",
 scCash:"شاشة الكاشير",scCashP:"الطلبات بتنزل لحالها، وزر «جاهز» لكل طلب.",
 open:"افتح ←",
 whyTitle:"ليش UR TURN",
 w1:"ما في أجهزة بيجر تنكسر أو تضيع أو تحتاج شحن.",w2:"تقييمات أكثر على جوجل لأننا نطلبها لحظة الاستلام.",
 w3:"يشتغل مع أي كاشير، والكاشير شغله زر واحد.",w4:"كل محل باسمه وشعاره ولونه ورابطه.",
 trialTitle:"أسبوع تجربة مجاني",trialP:"التركيب بياخذ 5 دقايق. المحل بيجرّب النظام أسبوع كامل ببلاش، وبعدين بنحدد السعر سوا حسب النتيجة.",
 demoHint:"اكتب رقم فاتورة بجوال الزبون، بعدين اضغط «جاهز» من شاشة الكاشير. وجرّب كمان تفتح صفحة الزبون من جوال ثاني.",
 customerPhone:"جوال الزبون",
 welcome:"أهلاً فيك! اكتب رقم الفاتورة وخلّيك مرتاح، رح نبلغك لما يجهز طلبك.",
 receiptLabel:"رقم الفاتورة",receiptPh:"مثلاً 128",waitBtn:"انتظر دوري",
 waitingTitle:"طلبك قيد التحضير",waitingP:"خلّي هالصفحة مفتوحة. رح يرن جوالك ويهتز لما يجهز الطلب.",
 ahead:(n)=> n===0?"طلبك هو التالي":(n===1?"قبلك طلب واحد":"قبلك "+n+" طلبات"),
 tipSound:"خلّي صوت الجوال شغّال والشاشة مفتوحة.",cancel:"إلغاء ورقم مختلف",
 ready:"طلبك جاهز!",readyP:"تفضل استلمه من الكاونتر",gotIt:"استلمت طلبي",
 thanks:"بالعافية!",thanksP:"شكراً لزيارتك. كيف كانت تجربتك؟",rateGoogle:"قيّمنا على جوجل",
 rateThanks:"شكراً! رأيك بيوصل للإدارة مباشرة.",newOrder:"طلب جديد",powered:"يعمل بنظام",
 cashierTitle:"الطلبات",stWaiting:"قيد التحضير",stReady:"بانتظار الاستلام",stDone:"تم التسليم اليوم",
 addPh:"رقم فاتورة (اختياري)",addBtn:"إضافة",
 colWaiting:"قيد التحضير",colReady:"جاهز، بانتظار الزبون",
 readyBtn:"جاهز",ringAgain:"رنّ مرة ثانية",delivered:"تم التسليم",remove:"حذف",
 emptyWaiting:"ما في طلبات حالياً. لما الزبون يكتب رقم فاتورته بيظهر هون لحاله.",emptyReady:"ما في طلبات جاهزة.",
 since:(m)=> m<1?"الآن":("منذ "+m+" د"),fromCustomer:"سجّله الزبون",fromCashier:"أضافه الكاشير",
 readyFor:(m)=> m<1?"جاهز الآن":("جاهز منذ "+m+" د"),
 navCashier:"الكاشير",navOwner:"الإعدادات",
 ownerTitle:"إعدادات المحل",fName:"اسم المحل",fLogo:"الشعار",fLogoHint:"صورة مربعة أفضل.",
 upload:"رفع شعار",removeLogo:"إزالة",fColor:"لون المحل",
 fReview:"رابط تقييم جوجل",fReviewHint:"من Google Maps: صفحة المحل ← «اكتب مراجعة» ← انسخ الرابط.",
 fWelcome:"رسالة الترحيب (اختياري)",save:"حفظ",saved:"تم الحفظ ✓",demoLocked:"هذا محل تجريبي، الإعدادات مقفلة.",
 posterTitle:"ستاند الكاونتر",posterH:"امسح وانتظر دورك",posterP:"اكتب رقم فاتورتك وبنرن على جوالك لما يجهز طلبك",
 linksTitle:"الروابط",custLink:"رابط الزبون (هو نفسه الـ QR)",cashLink:"رابط شاشة الكاشير (سرّي)",ownLink:"رابط الإعدادات (سرّي)",
 copy:"نسخ",copied:"تم النسخ",
 statsTitle:"آخر 7 أيام",sOrders:"طلب",sWait:"متوسط الانتظار (د)",sRating:"متوسط التقييم",sRatings:"تقييم",
 setupTitle:"التركيب بـ5 دقايق",
 su1:"الاسم والشعار",su2:"لون المحل",su3:"رابط تقييم جوجل",su4:"اطبع الستاند وحطه على الكاونتر",su5:"افتح شاشة الكاشير وجرّب طلب",
 adminTitle:"لوحة UR TURN",newShop:"محل جديد",slug:"معرّف الرابط (إنجليزي بدون مسافات)",slugPh:"مثلاً brew-lab",
 shopName:"اسم المحل",create:"إنشاء",created:"جاهز! هاي روابط المحل. رابط الكاشير والإعدادات بيظهروا مرة وحدة، احفظهم أو ابعثهم لصاحب المحل.",
 shops:"المحلات",colShop:"المحل",colSlug:"المعرّف",colOrders:"طلبات 7 أيام",colRating:"التقييم",newKey:"رابط كاشير جديد",
 badLink:"الرابط غير صحيح أو منتهي. اطلب رابط جديد.",noShop:"ما لقينا هذا المحل. تأكد من الكود.",
 netErr:"في مشكلة بالاتصال، بنحاول مرة ثانية...",errGeneric:"صار خطأ، جرّب مرة ثانية.",
 badNumber:"اكتب أرقام بس.",editShop:"تعديل",edit:"تعديل",customColor:"أو اختار أي لون:",slugTaken:"هذا المعرّف مستخدم، اختار غيره."
},
en:{
 tabHome:"Home",tabDemo:"Live demo",
 eyebrow:"Smart pickup paging for cafes and restaurants",heroA:"The customer's phone is",heroB:"the pager",
 heroP:"No app and no hardware. The customer scans the counter QR, types their receipt number and relaxes. When the order is ready, the cashier taps one button and the phone rings and vibrates.",
 tryDemo:"Try the full demo",artYour:"Your order is ready",artSub:"Please pick it up at the counter",artOrder:"Receipt",
 howTitle:"How it works",
 s1b:"Cashier prints the receipt",s1:"Exactly as today.",
 s2b:"Customer scans the QR",s2:"Opens the shop's page. No app download.",
 s3b:"Types the receipt number",s3:"The order appears on the cashier screen by itself. The cashier types nothing.",
 s4b:"Cashier taps “Ready”",s4:"The phone rings and vibrates. After pickup we ask for a Google review.",
 screensTitle:"Try the screens",
 scDemo:"Live demo",scDemoP:"Customer phone and cashier screen side by side.",
 scCust:"Customer page",scCustP:"What opens after scanning the QR. Try it from another phone.",
 scCash:"Cashier screen",scCashP:"Orders appear by themselves, with a “Ready” button.",
 open:"Open →",
 whyTitle:"Why UR TURN",
 w1:"No pager devices to break, lose or charge.",w2:"More Google reviews, asked for at pickup.",
 w3:"Works with any cashier; one button to use.",w4:"Each shop with its own name, logo, color and link.",
 trialTitle:"Free first week",trialP:"Setup takes 5 minutes. The shop tries it free for a full week, then we agree on a price together.",
 demoHint:"Enter a receipt number on the customer phone, then tap “Ready” on the cashier screen. Also try opening the customer page on another phone.",
 customerPhone:"Customer phone",
 welcome:"Welcome! Enter your receipt number and relax. We'll alert you when your order is ready.",
 receiptLabel:"Receipt number",receiptPh:"e.g. 128",waitBtn:"Wait for my turn",
 waitingTitle:"Your order is being prepared",waitingP:"Keep this page open. Your phone will ring and vibrate when it's ready.",
 ahead:(n)=> n===0?"You're next":(n===1?"1 order ahead of you":n+" orders ahead of you"),
 tipSound:"Keep your sound on and the screen open.",cancel:"Cancel / different number",
 ready:"Your order is ready!",readyP:"Please pick it up at the counter",gotIt:"I picked it up",
 thanks:"Enjoy!",thanksP:"Thanks for visiting. How was your experience?",rateGoogle:"Rate us on Google",
 rateThanks:"Thank you! Your feedback goes straight to the manager.",newOrder:"New order",powered:"Powered by",
 cashierTitle:"Orders",stWaiting:"Preparing",stReady:"Awaiting pickup",stDone:"Served today",
 addPh:"Receipt number (optional)",addBtn:"Add",
 colWaiting:"Preparing",colReady:"Ready, waiting for customer",
 readyBtn:"Ready",ringAgain:"Ring again",delivered:"Picked up",remove:"Remove",
 emptyWaiting:"No orders yet. They appear here by themselves when a customer enters a receipt number.",emptyReady:"No ready orders.",
 since:(m)=> m<1?"just now":(m+" min ago"),fromCustomer:"added by customer",fromCashier:"added by cashier",
 readyFor:(m)=> m<1?"ready now":("ready "+m+" min"),
 navCashier:"Cashier",navOwner:"Settings",
 ownerTitle:"Shop settings",fName:"Shop name",fLogo:"Logo",fLogoHint:"Square works best.",
 upload:"Upload logo",removeLogo:"Remove",fColor:"Brand color",
 fReview:"Google review link",fReviewHint:"From Google Maps: shop page → “Write a review” → copy the link.",
 fWelcome:"Welcome message (optional)",save:"Save",saved:"Saved ✓",demoLocked:"This is a demo shop; settings are locked.",
 posterTitle:"Counter stand",posterH:"Scan & wait for your turn",posterP:"Enter your receipt number and we'll ring your phone when it's ready",
 linksTitle:"Links",custLink:"Customer link (same as the QR)",cashLink:"Cashier screen link (private)",ownLink:"Settings link (private)",
 copy:"Copy",copied:"Copied",
 statsTitle:"Last 7 days",sOrders:"orders",sWait:"avg wait (min)",sRating:"avg rating",sRatings:"ratings",
 setupTitle:"Set up in 5 minutes",
 su1:"Name and logo",su2:"Brand color",su3:"Google review link",su4:"Print the stand, put it on the counter",su5:"Open the cashier screen and test an order",
 adminTitle:"UR TURN admin",newShop:"New shop",slug:"Link id (letters, numbers, dashes)",slugPh:"e.g. brew-lab",
 shopName:"Shop name",create:"Create",created:"Shop created. Save the links; the cashier link is shown once.",
 shops:"Shops",colShop:"Shop",colSlug:"Id",colOrders:"Orders 7d",colRating:"Rating",newKey:"New cashier link",
 badLink:"This link is invalid or expired. Ask for a new one.",noShop:"We couldn't find this shop. Check the code.",
 netErr:"Connection problem, retrying...",errGeneric:"Something went wrong, try again.",
 badNumber:"Numbers only.",editShop:"Edit",edit:"Edit",customColor:"Or pick any color:",slugTaken:"That id is taken, pick another."
}};
let lang="ar"; try{ lang=localStorage.getItem("urturn.lang")||"ar"; }catch(e){}
const t=(k,...a)=>{ const v=(T[lang]||T.ar)[k]; return typeof v==="function"? v(...a) : (v ?? k); };
const esc=s=>String(s ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const $=sel=>document.querySelector(sel);
const mins=ts=>Math.max(0,Math.floor((Date.now()-new Date(ts).getTime())/60000));
const ls={ get(k){ try{return localStorage.getItem(k);}catch(e){return null;} }, set(k,v){ try{ v==null?localStorage.removeItem(k):localStorage.setItem(k,v);}catch(e){} } };

// ---------- API ----------
const H={"apikey":SUPA_KEY,"Authorization":"Bearer "+SUPA_KEY,"Content-Type":"application/json"};
async function rest(path){
  const r=await fetch(SUPA_URL+"/rest/v1/"+path,{headers:H,cache:"no-store"});
  if(!r.ok) throw new Error("http_"+r.status);
  return r.json();
}
async function rpc(name,args){
  const r=await fetch(SUPA_URL+"/rest/v1/rpc/"+name,{method:"POST",headers:H,body:JSON.stringify(args||{})});
  const txt=await r.text(); let data=null; try{ data=txt?JSON.parse(txt):null; }catch(e){ data=txt; }
  if(!r.ok){ const err=new Error((data&&data.message)||("http_"+r.status)); err.code=(data&&data.message)||""; throw err; }
  return data;
}
const Api={
  shop:slug=>rest("urturn_shops?select=*&slug=eq."+encodeURIComponent(slug)).then(r=>r[0]||null),
  orders:shopId=>rest("urturn_orders?select=*&shop_id=eq."+shopId+"&created_at=gte."+encodeURIComponent(new Date(Date.now()-12*3600e3).toISOString())+"&order=created_at.asc"),
  order:id=>rest("urturn_orders?select=*&id=eq."+id).then(r=>r[0]||null),
  week:shopId=>rest("urturn_orders?select=status,created_at,done_at,ready_at,rating&shop_id=eq."+shopId+"&created_at=gte."+encodeURIComponent(new Date(Date.now()-7*864e5).toISOString())),
};

// ---------- UI helpers ----------
let toastTimer=null;
function toast(msg){ const el=$("#toast"); el.textContent=msg; el.hidden=false; clearTimeout(toastTimer); toastTimer=setTimeout(()=>{el.hidden=true;},3000); }
function inkFor(hex){ const n=parseInt((hex||"#000000").slice(1),16); const r=(n>>16)&255,g=(n>>8)&255,b=n&255; return (0.299*r+0.587*g+0.114*b)/255>0.6?"#14181C":"#FFFFFF"; }
function applyShop(shop){ const c=(shop&&shop.color)||"#0E5E5A"; document.documentElement.style.setProperty("--shop",c); document.documentElement.style.setProperty("--shop-ink",inkFor(c)); }
function logoHTML(shop,extra){ if(shop&&shop.logo) return `<img class="shop-logo" src="${esc(shop.logo)}" alt="" ${extra||""}>`; return `<div class="shop-logo" aria-hidden="true" ${extra||""}>${esc(((shop&&shop.name)||"U").trim().charAt(0))}</div>`; }
function qrSVG(text){ const q=qrcode(0,"M"); q.addData(text); q.make(); return q.createSvgTag({cellSize:6,margin:2,scalable:true}); }
function copyBtn(btn,input){ btn.addEventListener("click",async()=>{ try{ await navigator.clipboard.writeText(input.value); btn.textContent=t("copied"); setTimeout(()=>btn.textContent=t("copy"),1500);}catch(e){ input.select(); } }); }
const custURL=slug=>BASE+"?s="+encodeURIComponent(slug);
const cashURL=(slug,k)=>BASE+"?s="+encodeURIComponent(slug)+"&v=cashier&k="+encodeURIComponent(k);
const ownURL=(slug,k)=>BASE+"?s="+encodeURIComponent(slug)+"&v=owner&k="+encodeURIComponent(k);
function googleG(){ return `<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>`; }

// ---------- sound + vibration ----------
const Ring={ ctx:null,timer:null,on:false,
  unlock(){ try{ if(!this.ctx){ const C=window.AudioContext||window.webkitAudioContext; if(C) this.ctx=new C(); } this.ctx&&this.ctx.resume&&this.ctx.resume(); }catch(e){} },
  chime(){ if(!this.ctx) return; const now=this.ctx.currentTime;
    [880,1175,1568,1175,1568].forEach((f,i)=>{ const o=this.ctx.createOscillator(),g=this.ctx.createGain(); o.type="sine"; o.frequency.value=f; o.connect(g); g.connect(this.ctx.destination);
      const s=now+i*0.16; g.gain.setValueAtTime(0.0001,s); g.gain.exponentialRampToValueAtTime(0.4,s+0.02); g.gain.exponentialRampToValueAtTime(0.0001,s+0.15); o.start(s); o.stop(s+0.16); }); },
  start(){ if(this.on) return; this.on=true; this.unlock(); const tick=()=>{ this.chime(); try{ navigator.vibrate&&navigator.vibrate([350,150,350,150,600]); }catch(e){} }; tick(); this.timer=setInterval(tick,1800); },
  stop(){ if(!this.on) return; this.on=false; clearInterval(this.timer); this.timer=null; try{ navigator.vibrate&&navigator.vibrate(0); }catch(e){} }
};
let wakeLock=null;
async function keepAwake(){ try{ if(navigator.wakeLock&&(!wakeLock||wakeLock.released)) wakeLock=await navigator.wakeLock.request("screen"); }catch(e){} }
document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible") keepAwake(); });

// ---------- shop store (polling) ----------
function ShopStore(shop){
  const st={shop,orders:[],listeners:new Set(),timer:null,failing:false};
  st.refresh=async()=>{
    try{ const [o,s]=await Promise.all([Api.orders(shop.id), Api.shop(shop.slug)]); st.orders=o; if(s){ st.shop=s; applyShop(s); } if(st.failing){ st.failing=false; } st.listeners.forEach(f=>f()); }
    catch(e){ if(!st.failing){ st.failing=true; toast(t("netErr")); } }
  };
  st.start=(ms)=>{ st.refresh(); st.timer=setInterval(()=>{ if(document.visibilityState==="visible") st.refresh(); },ms||2500); };
  st.byStatus=s=>st.orders.filter(o=>o.status===s);
  return st;
}

// ---------- customer ----------
function Customer(root,shop,opts){
  opts=opts||{};
  const lsKey="urturn.order."+shop.slug+(opts.suffix||"");
  let orderId=ls.get(lsKey), order=null, rated=0, lastKey="", seenRing=null, timer=null;
  const setOrder=id=>{ orderId=id; ls.set(lsKey,id); };
  async function poll(){
    if(!orderId){ order=null; render(); return; }
    try{
      order=await Api.order(orderId);
      if(!order){ setOrder(null); }
      if(order&&order.status==="waiting"){ const all=await Api.orders(shop.id); const ahead=all.filter(x=>x.status==="waiting"&&x.created_at<order.created_at).length; order._ahead=ahead; }
      render();
    }catch(e){ /* keep last state */ }
  }
  function render(){
    const s=opts.store?opts.store.shop:shop;
    const state=!order?"enter":order.status;
    const k=[state,order&&order.num,order&&order.ring_at,lang,rated,s.name,s.logo,s.color,s.welcome,s.review_url].join("|");
    if(state==="waiting"&&k===lastKey){ const el=root.querySelector("[data-ahead]"); if(el) el.textContent=t("ahead",order._ahead||0); return; }
    if(k===lastKey) return; lastKey=k;
    const head=`<div class="cust-head">${logoHTML(s)}<h2>${esc(s.name)}</h2></div>`;
    const foot=`<div class="powered">${t("powered")} <a href="${esc(BASE)}" target="_blank" rel="noopener">UR TURN</a> · <button class="link-btn" data-a="lang" type="button" style="font-size:12px;padding:0">${lang==="ar"?"English":"العربية"}</button></div>`;
    let body="";
    if(state==="enter"){
      Ring.stop();
      body=`<div class="cust-body"><p>${esc(s.welcome||t("welcome"))}</p>
        <form data-f="enter" style="display:grid;gap:12px"><label for="r-${esc(lsKey)}" style="font-weight:600">${t("receiptLabel")}</label>
        <input class="big-input" id="r-${esc(lsKey)}" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" placeholder="${t("receiptPh")}" required>
        <button class="btn shop" type="submit">${t("waitBtn")}</button></form></div>`;
    } else if(state==="waiting"){
      Ring.stop();
      body=`<div class="cust-body"><div class="wait-card"><small>${t("receiptLabel")}</small><div class="num">${esc(order.num)}</div>
        <b>${t("waitingTitle")}</b><span data-ahead>${t("ahead",order._ahead||0)}</span><div class="wait-anim" aria-hidden="true"><span></span><span></span><span></span></div></div>
        <p>${t("waitingP")}</p><div class="tip">${t("tipSound")}</div>
        <button class="link-btn" data-a="cancel" type="button">${t("cancel")}</button></div>`;
    } else if(state==="ready"){
      body=`<div class="cust-body"><div class="wait-card"><div class="num">${esc(order.num)}</div><b>${t("ready")}</b></div></div>
        <div class="ringing" role="alert"><div class="bell" aria-hidden="true">🔔</div><h2>${t("ready")}</h2><div class="num">${esc(order.num)}</div>
        <p style="margin:0">${t("readyP")}</p><button class="btn" data-a="got" type="button">${t("gotIt")}</button></div>`;
      if(seenRing!==order.ring_at){ seenRing=order.ring_at; Ring.start(); if(opts.inFrame){ const ph=root.closest(".phone"); if(ph) setTimeout(()=>ph.scrollIntoView({behavior:"smooth",block:"center"}),50); } }
    } else {
      Ring.stop();
      const url=s.review_url||"https://www.google.com/maps";
      const stars=[1,2,3,4,5].map(n=>`<button type="button" data-star="${n}" class="${n<=rated?"on":""}" aria-label="${n}">★</button>`).join("");
      const gbtn=`<a class="btn g-btn" href="${esc(url)}" target="_blank" rel="noopener">${googleG()} ${t("rateGoogle")}</a>`;
      body=`<div class="cust-body" style="text-align:center"><h2 style="font-size:28px">${t("thanks")}</h2><p>${t("thanksP")}</p>
        <div class="stars">${stars}</div>${rated>=4||rated===0?gbtn:`<div class="tip">${t("rateThanks")}</div>`}
        <button class="link-btn" data-a="new" type="button">${t("newOrder")}</button></div>`;
    }
    root.innerHTML=`<div class="cust">${head}${body}${foot}</div>`;
  }
  root.addEventListener("submit",async e=>{
    e.preventDefault(); const inp=root.querySelector(".big-input"); const v=(inp.value||"").replace(/\D/g,"");
    if(!v){ toast(t("badNumber")); inp.focus(); return; }
    Ring.unlock(); keepAwake(); rated=0;
    const btn=root.querySelector("button[type=submit]"); btn.disabled=true;
    try{ const id=await rpc("urturn_create_order",{p_slug:shop.slug,p_num:v}); setOrder(id); await poll(); }
    catch(err){ toast(t("errGeneric")); btn.disabled=false; }
  });
  root.addEventListener("click",async e=>{
    const st=e.target.closest("[data-star]"); if(st){ rated=+st.dataset.star; render(); if(orderId) rpc("urturn_rate",{p_id:orderId,p_rating:rated}).catch(()=>{}); return; }
    const a=e.target.closest("[data-a]"); if(!a) return;
    if(a.dataset.a==="lang"){ setLang(lang==="ar"?"en":"ar"); return; }
    if(a.dataset.a==="cancel"){ const id=orderId; setOrder(null); order=null; render(); rpc("urturn_cancel_order",{p_id:id}).catch(()=>{}); }
    if(a.dataset.a==="got"){ Ring.stop(); try{ await rpc("urturn_picked_up",{p_id:orderId}); }catch(err){} await poll(); }
    if(a.dataset.a==="new"){ setOrder(null); order=null; rated=0; render(); }
  });
  poll(); timer=setInterval(()=>{ if(orderId&&(!order||order.status!=="done")) poll(); },2500);
  return {render(){ lastKey=""; render(); }, poll};
}

// ---------- cashier ----------
function Cashier(root,store,key){
  root.innerHTML=`<div class="panel">
    <div class="panel-head"><h2>${t("cashierTitle")}</h2></div>
    <div class="stats"><div class="stat"><b data-s="w">0</b><span>${t("stWaiting")}</span></div><div class="stat"><b data-s="r">0</b><span>${t("stReady")}</span></div><div class="stat"><b data-s="d">0</b><span>${t("stDone")}</span></div></div>
    <div class="col-title">${t("colWaiting")} <span class="count" data-c="w">0</span></div><div class="orders" data-l="w"></div>
    <div class="col-title">${t("colReady")} <span class="count" data-c="r">0</span></div><div class="orders" data-l="r"></div>
    <form class="add-row" data-f="add" style="margin-top:18px"><input id="cash-add" inputmode="numeric" autocomplete="off" maxlength="8" placeholder="${t("addPh")}" aria-label="${t("addPh")}"><button class="btn" type="submit">${t("addBtn")}</button></form>
  </div>`;
  const slug=store.shop.slug;
  function row(o){
    if(o.status==="waiting") return `<div class="order"><div class="num">${esc(o.num)}</div>
      <div class="meta"><span class="pill">${t("colWaiting")}</span><span>${t("since",mins(o.created_at))} · ${o.source==="customer"?t("fromCustomer"):t("fromCashier")}</span></div>
      <div class="acts"><button class="btn small ghost" data-a="delete" data-id="${o.id}" type="button">${t("remove")}</button><button class="btn ready-btn" data-a="ready" data-id="${o.id}" type="button">${t("readyBtn")}</button></div></div>`;
    return `<div class="order ready"><div class="num">${esc(o.num)}</div><div class="meta"><span class="pill">${t("readyFor",mins(o.ready_at||o.created_at))}</span></div>
      <div class="acts"><button class="btn small" data-a="ring" data-id="${o.id}" type="button">${t("ringAgain")}</button><button class="btn small ok" data-a="done" data-id="${o.id}" type="button">${t("delivered")}</button></div></div>`;
  }
  function render(){
    const w=store.byStatus("waiting"), r=store.byStatus("ready").sort((a,b)=>String(a.ready_at).localeCompare(String(b.ready_at)));
    const today=new Date(); today.setHours(0,0,0,0);
    const d=store.byStatus("done").filter(o=>new Date(o.done_at||0)>=today).length;
    root.querySelector('[data-s="w"]').textContent=w.length; root.querySelector('[data-s="r"]').textContent=r.length; root.querySelector('[data-s="d"]').textContent=d;
    root.querySelector('[data-c="w"]').textContent=w.length; root.querySelector('[data-c="r"]').textContent=r.length;
    root.querySelector('[data-l="w"]').innerHTML=w.length?w.map(row).join(""):`<div class="empty">${t("emptyWaiting")}</div>`;
    root.querySelector('[data-l="r"]').innerHTML=r.length?r.map(row).join(""):`<div class="empty">${t("emptyReady")}</div>`;
  }
  root.addEventListener("submit",async e=>{
    e.preventDefault(); const inp=root.querySelector("#cash-add"); const v=(inp.value||"").replace(/\D/g,""); if(!v) return; inp.value="";
    try{ await rpc("urturn_staff_add",{p_slug:slug,p_key:key,p_num:v}); store.refresh(); }catch(err){ toast(t("errGeneric")); }
  });
  root.addEventListener("click",async e=>{
    const a=e.target.closest("[data-a]"); if(!a||!a.dataset.id) return;
    const o=store.orders.find(x=>x.id===a.dataset.id);
    if(o){ // optimistic
      if(a.dataset.a==="ready"){ o.status="ready"; o.ready_at=o.ring_at=new Date().toISOString(); }
      if(a.dataset.a==="done"){ o.status="done"; o.done_at=new Date().toISOString(); }
      if(a.dataset.a==="delete"){ store.orders=store.orders.filter(x=>x!==o); }
      render();
    }
    try{ await rpc("urturn_staff_set",{p_slug:slug,p_key:key,p_id:a.dataset.id,p_action:a.dataset.a}); }catch(err){ toast(t("errGeneric")); }
    store.refresh();
  });
  store.listeners.add(render); render();
  setInterval(render,30000);
  return {render};
}

// ---------- owner ----------
function Owner(root,store,key){
  const COLORS=["#0E5E5A","#7A2E1F","#1E3A8A","#3F3A33","#8A1C4A","#2F6B2A","#B45309","#14181C"];
  let draft={...store.shop};
  const slug=draft.slug, locked=slug===DEMO_SLUG;
  const sw=()=>COLORS.map(c=>`<button type="button" class="swatch" style="background:${c}" data-color="${c}" aria-label="${c}" aria-pressed="${draft.color===c}"></button>`).join("");
  root.innerHTML=`<div class="wrap owner">
    <div style="display:grid;gap:16px;min-width:0">
      <div class="panel"><div class="panel-head"><h2>${t("statsTitle")}</h2></div><div class="stats four" data-stats>
        <div class="stat"><b data-k="n">–</b><span>${t("sOrders")}</span></div><div class="stat"><b data-k="w">–</b><span>${t("sWait")}</span></div>
        <div class="stat"><b data-k="r">–</b><span>${t("sRating")}</span></div><div class="stat"><b data-k="c">–</b><span>${t("sRatings")}</span></div></div></div>
      <div class="panel"><div class="panel-head"><h2>${t("ownerTitle")}</h2></div>
      ${locked?`<div class="tip" style="margin-bottom:12px">${t("demoLocked")}</div>`:""}
      <form class="form" data-f="owner">
        <div class="field"><label for="o-name">${t("fName")}</label><input type="text" id="o-name" value="${esc(draft.name)}" maxlength="80"></div>
        <div class="field"><label>${t("fLogo")}</label><div class="logo-row"><div data-logo>${logoHTML(draft)}</div>
          <label class="btn small" for="o-logo" style="cursor:pointer">${t("upload")}</label><input type="file" id="o-logo" accept="image/*" hidden>
          <button type="button" class="btn small ghost" data-a="nologo">${t("removeLogo")}</button></div><small>${t("fLogoHint")}</small></div>
        <div class="field"><label>${t("fColor")}</label><div class="swatches" data-sw>${sw()}</div>
          <label style="display:flex;gap:8px;align-items:center;font-weight:500;font-size:14px">${t("customColor")} <input type="color" id="o-color" value="${esc(draft.color)}" style="width:44px;height:34px;border:0;background:none;padding:0"></label></div>
        <div class="field"><label for="o-review">${t("fReview")}</label><input type="url" id="o-review" dir="ltr" value="${esc(draft.review_url||"")}"><small>${t("fReviewHint")}</small></div>
        <div class="field"><label for="o-welcome">${t("fWelcome")}</label><input type="text" id="o-welcome" maxlength="280" value="${esc(draft.welcome||"")}" placeholder="${esc(t("welcome"))}"></div>
        <div style="display:flex;gap:12px;align-items:center"><button class="btn primary" type="submit" ${locked?"disabled":""}>${t("save")}</button><span class="saved" data-saved hidden>${t("saved")}</span></div>
      </form></div>
      <div class="panel"><div class="panel-head"><h2>${t("setupTitle")}</h2><span class="chip">⏱ 5:00</span></div>
        <ol class="setup">${[1,2,3,4,5].map(i=>`<li><span>${t("su"+i)}</span></li>`).join("")}</ol></div>
    </div>
    <div style="display:grid;gap:16px;align-content:start">
      <div><div class="label">${t("posterTitle")}</div><div class="poster" data-poster></div></div>
      <div class="panel links"><h2 style="font-size:18px">${t("linksTitle")}</h2>
        ${[["custLink",custURL(slug)],["cashLink",cashURL(slug,key)],["ownLink",ownURL(slug,key)]].map(([l,u],i)=>`<div><label>${t(l)}</label><div class="copy-row"><input id="lk${i}" readonly value="${esc(u)}"><button class="btn small" type="button" data-copy="lk${i}">${t("copy")}</button></div></div>`).join("")}
      </div>
    </div></div>`;
  root.querySelectorAll("[data-copy]").forEach(b=>copyBtn(b,root.querySelector("#"+b.dataset.copy)));
  function poster(){
    const p=root.querySelector("[data-poster]"); p.style.setProperty("--shop",draft.color); p.style.setProperty("--shop-ink",inkFor(draft.color));
    p.innerHTML=`${logoHTML(draft,`style="color:${esc(draft.color)}"`)}<h3>${t("posterH")}</h3><div class="qr">${qrSVG(custURL(slug))}</div><p>${t("posterP")}</p><b>${esc(draft.name)}</b><span class="ur">UR TURN</span>`;
  }
  async function stats(){
    try{
      const rows=await Api.week(store.shop.id);
      const waits=rows.filter(o=>o.ready_at).map(o=>(new Date(o.ready_at)-new Date(o.created_at))/60000);
      const rates=rows.filter(o=>o.rating).map(o=>o.rating);
      const q=k=>root.querySelector(`[data-k="${k}"]`);
      q("n").textContent=rows.length; q("w").textContent=waits.length?(waits.reduce((a,b)=>a+b,0)/waits.length).toFixed(1):"–";
      q("r").textContent=rates.length?(rates.reduce((a,b)=>a+b,0)/rates.length).toFixed(1):"–"; q("c").textContent=rates.length;
    }catch(e){}
  }
  function readForm(){ draft.name=root.querySelector("#o-name").value.trim()||draft.name; draft.review_url=root.querySelector("#o-review").value.trim(); draft.welcome=root.querySelector("#o-welcome").value.trim(); }
  poster(); stats(); setInterval(stats,60000);
  root.addEventListener("input",e=>{ if(e.target.id==="o-name"){ readForm(); poster(); } if(e.target.id==="o-color"){ draft.color=e.target.value; root.querySelector("[data-sw]").innerHTML=sw(); poster(); applyShop(draft); } });
  root.addEventListener("change",e=>{
    if(e.target.id!=="o-logo"||!e.target.files[0]) return;
    const fr=new FileReader();
    fr.onload=()=>{ const img=new Image(); img.onload=()=>{ const c=document.createElement("canvas"),S=200; c.width=S;c.height=S; const x=c.getContext("2d"); const m=Math.min(img.width,img.height);
      x.fillStyle="#fff"; x.fillRect(0,0,S,S); x.drawImage(img,(img.width-m)/2,(img.height-m)/2,m,m,0,0,S,S); draft.logo=c.toDataURL("image/jpeg",0.85);
      root.querySelector("[data-logo]").innerHTML=logoHTML(draft); poster(); }; img.src=fr.result; };
    fr.readAsDataURL(e.target.files[0]);
  });
  root.addEventListener("click",e=>{
    const s=e.target.closest("[data-color]"); if(s){ draft.color=s.dataset.color; root.querySelector("[data-sw]").innerHTML=sw(); poster(); applyShop(draft); return; }
    const a=e.target.closest("[data-a]"); if(a&&a.dataset.a==="nologo"){ draft.logo=null; root.querySelector("[data-logo]").innerHTML=logoHTML(draft); poster(); }
  });
  root.addEventListener("submit",async e=>{
    e.preventDefault(); if(locked) return; readForm();
    try{ await rpc("urturn_save_shop",{p_slug:slug,p_key:key,p_name:draft.name,p_color:draft.color,p_logo:draft.logo||"",p_review_url:draft.review_url||"",p_welcome:draft.welcome||""});
      const el=root.querySelector("[data-saved]"); el.hidden=false; setTimeout(()=>el.hidden=true,2500); store.refresh(); }
    catch(err){ toast(t("errGeneric")); }
  });
}

// ---------- admin ----------
function Admin(root,akey){
  const COLORS=["#0E5E5A","#7A2E1F","#1E3A8A","#3F3A33","#8A1C4A","#2F6B2A","#B45309","#14181C"];
  const blank=()=>({slug:"",name:"",color:"#0E5E5A",logo:null,review_url:"",welcome:""});
  let mode="new", draft=blank();
  const inputCss="border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--bg);width:100%";
  root.innerHTML=`<div class="wrap owner">
    <div style="display:grid;gap:16px;min-width:0">
      <div class="panel"><div class="panel-head"><h2 data-title></h2><button class="btn small ghost" type="button" data-a="new" hidden>+ ${t("newShop")}</button></div>
        <form class="form" data-f="shop">
          <div class="field"><label for="a-name">${t("shopName")}</label><input type="text" id="a-name" required maxlength="80" style="${inputCss}"></div>
          <div class="field" data-slugf><label for="a-slug">${t("slug")}</label><input type="text" id="a-slug" dir="ltr" pattern="[a-z0-9\\-]{2,40}" placeholder="${t("slugPh")}" style="${inputCss}"></div>
          <div class="field"><label>${t("fLogo")}</label><div class="logo-row"><div data-logo></div>
            <label class="btn small" for="a-logo" style="cursor:pointer">${t("upload")}</label><input type="file" id="a-logo" accept="image/*" hidden>
            <button type="button" class="btn small ghost" data-a="nologo">${t("removeLogo")}</button></div></div>
          <div class="field"><label>${t("fColor")}</label><div class="swatches" data-sw></div>
            <label style="display:flex;gap:8px;align-items:center;font-weight:500;font-size:14px">${t("customColor")} <input type="color" id="a-color" style="width:44px;height:34px;border:0;background:none;padding:0"></label></div>
          <div class="field"><label for="a-review">${t("fReview")}</label><input type="url" id="a-review" dir="ltr" placeholder="https://g.page/r/..." style="${inputCss}"><small>${t("fReviewHint")}</small></div>
          <div class="field"><label for="a-welcome">${t("fWelcome")}</label><input type="text" id="a-welcome" maxlength="280" placeholder="${esc(t("welcome"))}" style="${inputCss}"></div>
          <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><button class="btn primary" type="submit" data-submit></button><span class="saved" data-saved hidden>${t("saved")}</span></div>
        </form>
        <div data-result></div></div>
      <div class="panel"><div class="panel-head"><h2>${t("shops")}</h2></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t("colShop")}</th><th>${t("colSlug")}</th><th>${t("colOrders")}</th><th>${t("colRating")}</th><th></th></tr></thead><tbody data-rows></tbody></table></div></div>
    </div>
    <div style="display:grid;gap:16px;align-content:start"><div><div class="label">${t("posterTitle")}</div><div class="poster" data-poster></div></div>
      <div class="panel links" data-custbox hidden><label>${t("custLink")}</label><div class="copy-row"><input id="a-cust" readonly><button class="btn small" type="button" data-copy="a-cust">${t("copy")}</button></div></div></div>
  </div>`;
  const $r=s=>root.querySelector(s);
  copyBtn($r('[data-copy="a-cust"]'),$r("#a-cust"));
  const curSlug=()=> mode==="edit"?draft.slug:($r("#a-slug").value.trim().toLowerCase()||"your-shop");
  function swatches(){ $r("[data-sw]").innerHTML=COLORS.map(c=>`<button type="button" class="swatch" style="background:${c}" data-color="${c}" aria-label="${c}" aria-pressed="${draft.color===c}"></button>`).join(""); $r("#a-color").value=draft.color; }
  function poster(){
    const p=$r("[data-poster]"); p.style.setProperty("--shop",draft.color); p.style.setProperty("--shop-ink",inkFor(draft.color));
    const name=draft.name||t("shopName");
    p.innerHTML=`${logoHTML({...draft,name},`style="color:${esc(draft.color)}"`)}<h3>${t("posterH")}</h3><div class="qr">${qrSVG(custURL(curSlug()))}</div><p>${t("posterP")}</p><b>${esc(name)}</b><span class="ur">UR TURN</span>`;
    $r("[data-logo]").innerHTML=logoHTML({...draft,name},`style="color:${esc(draft.color)}"`);
    const cb=$r("[data-custbox]"); cb.hidden=!(mode==="edit"); $r("#a-cust").value=custURL(curSlug());
  }
  function fill(){
    $r("[data-title]").textContent= mode==="edit"? t("editShop")+": "+draft.name : t("newShop");
    $r("[data-a=new]").hidden= mode!=="edit";
    $r("[data-slugf]").hidden= mode==="edit"; $r("#a-slug").required= mode!=="edit";
    $r("[data-submit]").textContent= mode==="edit"? t("save") : t("create");
    $r("#a-name").value=draft.name||""; $r("#a-slug").value=mode==="edit"?draft.slug:""; $r("#a-review").value=draft.review_url||""; $r("#a-welcome").value=draft.welcome||"";
    swatches(); poster();
  }
  function read(){ draft.name=$r("#a-name").value.trim(); draft.review_url=$r("#a-review").value.trim(); draft.welcome=$r("#a-welcome").value.trim(); }
  function showLinks(slug,k){
    const box=$r("[data-result]");
    box.innerHTML=`<div class="tip" style="margin-top:14px">${t("created")}</div><div class="links" style="margin-top:12px">
      ${[["custLink",custURL(slug)],["cashLink",cashURL(slug,k)],["ownLink",ownURL(slug,k)]].map(([l,u],i)=>`<div><label>${t(l)}</label><div class="copy-row"><input id="al${i}" readonly value="${esc(u)}"><button class="btn small" type="button" data-copy2="al${i}">${t("copy")}</button></div></div>`).join("")}</div>`;
    box.querySelectorAll("[data-copy2]").forEach(b=>copyBtn(b,box.querySelector("#"+b.dataset.copy2)));
    box.scrollIntoView({behavior:"smooth",block:"center"});
  }
  async function load(){
    try{ const rows=await rpc("urturn_admin_shops",{p_admin:akey});
      $r("[data-rows]").innerHTML=rows.map(r=>`<tr><td>${esc(r.name)}</td><td dir="ltr"><a href="${esc(custURL(r.slug))}" target="_blank" rel="noopener">${esc(r.slug)}</a></td><td>${r.orders_7d}</td><td>${r.avg_rating??"–"}</td>
        <td style="display:flex;gap:6px"><button class="btn small" data-edit="${esc(r.slug)}" type="button">${t("edit")}</button><button class="btn small ghost" data-reset="${esc(r.slug)}" type="button">${t("newKey")}</button></td></tr>`).join("");
    }catch(e){ root.innerHTML=`<div class="center-msg"><h2>${t("badLink")}</h2></div>`; }
  }
  root.addEventListener("input",e=>{ if(["a-name","a-slug"].includes(e.target.id)){ read(); poster(); } if(e.target.id==="a-color"){ draft.color=e.target.value; swatches(); poster(); } });
  root.addEventListener("change",e=>{
    if(e.target.id!=="a-logo"||!e.target.files[0]) return;
    const fr=new FileReader();
    fr.onload=()=>{ const img=new Image(); img.onload=()=>{ const c=document.createElement("canvas"),S=200; c.width=S;c.height=S; const x=c.getContext("2d"); const m=Math.min(img.width,img.height);
      x.fillStyle="#fff"; x.fillRect(0,0,S,S); x.drawImage(img,(img.width-m)/2,(img.height-m)/2,m,m,0,0,S,S); draft.logo=c.toDataURL("image/jpeg",0.85); poster(); }; img.src=fr.result; };
    fr.readAsDataURL(e.target.files[0]);
  });
  root.addEventListener("submit",async e=>{
    e.preventDefault(); read();
    const args={p_admin:akey,p_name:draft.name,p_color:draft.color,p_logo:draft.logo||"",p_review_url:draft.review_url||"",p_welcome:draft.welcome||""};
    try{
      if(mode==="new"){
        const slug=$r("#a-slug").value.trim().toLowerCase();
        const k=await rpc("urturn_admin_create_shop",{p_admin:akey,p_slug:slug,p_name:draft.name});
        await rpc("urturn_admin_save_shop",{...args,p_slug:slug});
        draft.slug=slug; mode="edit"; fill(); showLinks(slug,k);
      } else {
        await rpc("urturn_admin_save_shop",{...args,p_slug:draft.slug});
        const s=$r("[data-saved]"); s.hidden=false; setTimeout(()=>s.hidden=true,2500); fill();
      }
      load();
    }catch(err){ toast(String(err.code||"").includes("duplicate")?t("slugTaken"):t("errGeneric")); }
  });
  root.addEventListener("click",async e=>{
    const sw=e.target.closest("[data-color]"); if(sw){ draft.color=sw.dataset.color; swatches(); poster(); return; }
    const a=e.target.closest("[data-a]");
    if(a&&a.dataset.a==="nologo"){ draft.logo=null; poster(); return; }
    if(a&&a.dataset.a==="new"){ mode="new"; draft=blank(); $r("[data-result]").innerHTML=""; fill(); return; }
    const ed=e.target.closest("[data-edit]");
    if(ed){ const s=await loadShop(ed.dataset.edit); if(s){ draft={...s}; mode="edit"; $r("[data-result]").innerHTML=""; fill(); root.scrollIntoView({behavior:"smooth"}); } return; }
    const b=e.target.closest("[data-reset]"); if(!b) return;
    try{ const k=await rpc("urturn_admin_reset_key",{p_admin:akey,p_slug:b.dataset.reset}); const s=await loadShop(b.dataset.reset); if(s){ draft={...s}; mode="edit"; fill(); } showLinks(b.dataset.reset,k); }catch(err){ toast(t("errGeneric")); }
  });
  fill(); load();
}

// ---------- pages ----------
const app=$("#app");
function topbar(active){
  $("#topbar").hidden=false;
  $("#tabs").innerHTML=[["./","tabHome","home"],["?v=demo","tabDemo","demo"]].map(([h,k,v])=>`<a href="${h}" ${v===active?'aria-current="page"':""}>${t(k)}</a>`).join("");
}
function staffHead(shop,active,key){
  return `<div class="staff-head"><div class="wrap" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;width:100%">
    ${logoHTML(shop)}<b>${esc(shop.name)}</b>
    <nav class="tabs"><a href="${esc(cashURL(shop.slug,key))}" ${active==="cashier"?'aria-current="page"':""}>${t("navCashier")}</a><a href="${esc(ownURL(shop.slug,key))}" ${active==="owner"?'aria-current="page"':""}>${t("navOwner")}</a></nav>
    <button class="btn lang" type="button" data-lang>${lang==="ar"?"English":"العربية"}</button></div></div>`;
}
function homePage(){
  topbar("home");
  app.innerHTML=`<div class="wrap">
    <section class="hero"><div><div class="eyebrow">${t("eyebrow")}</div><h1>${t("heroA")} <em>${t("heroB")}</em></h1><p>${t("heroP")}</p>
      <div class="cta"><a class="btn signal" href="?v=demo">${t("tryDemo")}</a></div></div>
      <div class="pager-art" aria-hidden="true"><div class="ring"><div class="pulse"></div><div><b style="font-family:var(--display);font-size:20px">${t("artYour")}</b><br><small>${t("artSub")}</small></div></div>
      <div><small>${t("artOrder")}</small><div class="big num">128</div></div></div></section>
    <section class="section"><h2>${t("howTitle")}</h2><ol class="steps">${[1,2,3,4].map(i=>`<li><b>${t("s"+i+"b")}</b><span>${t("s"+i)}</span></li>`).join("")}</ol></section>
    <section class="section"><h2>${t("screensTitle")}</h2><div class="screens">
      <a class="screen-card" href="?v=demo"><b>${t("scDemo")}</b><span>${t("scDemoP")}</span><i>${t("open")}</i></a>
      <a class="screen-card" href="${esc(custURL(DEMO_SLUG))}" target="_blank" rel="noopener"><b>${t("scCust")}</b><span>${t("scCustP")}</span><i>${t("open")}</i></a>
      <a class="screen-card" href="${esc(cashURL(DEMO_SLUG,DEMO_KEY))}" target="_blank" rel="noopener"><b>${t("scCash")}</b><span>${t("scCashP")}</span><i>${t("open")}</i></a></div></section>
    <section class="section cols"><div><h2>${t("whyTitle")}</h2><ul class="list">${[1,2,3,4].map(i=>`<li>${t("w"+i)}</li>`).join("")}</ul></div>
      <div class="trial"><h2>${t("trialTitle")}</h2><p>${t("trialP")}</p><div class="qr" style="background:#fff;padding:10px;border-radius:12px;width:max-content;margin-top:8px">${qrSVG(custURL(DEMO_SLUG))}</div></div></section>
  </div>`;
}
async function loadShop(slug){ try{ return await Api.shop(slug); }catch(e){ return undefined; } }
function msg(text){ app.innerHTML=`<div class="center-msg"><img src="icon.svg" width="56" height="56" alt="" style="margin:0 auto"><h2>${esc(text)}</h2></div>`; }
async function demoPage(){
  topbar("demo");
  const shop=await loadShop(DEMO_SLUG); if(!shop){ msg(t("netErr")); return; }
  applyShop(shop);
  app.innerHTML=`<div class="wrap demo"><div class="demo-hint">${t("demoHint")}</div>
    <div><div class="label">${t("customerPhone")}</div><div class="phone"><div class="cust" id="demoCust"></div></div></div><div id="demoCash"></div></div>`;
  const store=ShopStore(shop); Cashier($("#demoCash"),store,DEMO_KEY); const c=Customer($("#demoCust"),shop,{suffix:".frame",inFrame:true,store});
  store.listeners.add(()=>c.poll()); store.start(2000);
}
async function customerPage(){
  const shop=await loadShop(SLUG);
  if(shop===undefined){ msg(t("netErr")); setTimeout(customerPage,4000); return; }
  if(!shop){ msg(t("noShop")); return; }
  applyShop(shop); document.title=shop.name+" · UR TURN";
  app.innerHTML=`<div class="cust-full" id="fullCust"></div>`;
  Customer($("#fullCust"),shop,{});
}
async function staffPage(kind){
  const shop=await loadShop(SLUG);
  if(shop===undefined){ msg(t("netErr")); return; }
  let ok=false; try{ ok=shop && await rpc("urturn_staff_check",{p_slug:SLUG,p_key:KEY}); }catch(e){}
  if(!ok){ msg(t("badLink")); return; }
  applyShop(shop); document.title=shop.name+" · UR TURN";
  const store=ShopStore(shop);
  app.innerHTML=staffHead(shop,kind,KEY)+`<div id="staff"></div>`;
  app.querySelector("[data-lang]").addEventListener("click",()=>setLang(lang==="ar"?"en":"ar"));
  if(kind==="cashier"){ $("#staff").className="wrap"; $("#staff").style.cssText="padding-block:20px;max-width:760px"; $("#staff").innerHTML=`<div id="cash"></div>`; Cashier($("#cash"),store,KEY); store.start(2000); keepAwake(); }
  else { Owner($("#staff"),store,KEY); store.start(10000); }
}
function setLang(l){ lang=l; ls.set("urturn.lang",l); location.reload(); }

document.documentElement.lang=lang; document.documentElement.dir=lang==="ar"?"rtl":"ltr";
$("#langBtn").textContent=lang==="ar"?"English":"العربية";
$("#langBtn").addEventListener("click",()=>setLang(lang==="ar"?"en":"ar"));
if(VIEW==="home") homePage();
else if(VIEW==="demo") demoPage();
else if(VIEW==="admin"){ topbar(""); document.title="Admin · UR TURN"; Admin(app,KEY); }
else if(VIEW==="cashier"||VIEW==="owner") staffPage(VIEW);
else customerPage();
})();

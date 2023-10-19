import{_ as F}from"../chunks/preload-helper.a4192956.js";import{s as T,f as p,g as u,A as b,j as g,i as R,y,d as h,a as L,h as w,c as P,x as i,B as O,o as C,p as H}from"../chunks/scheduler.62e62842.js";import{S,i as D,b as k,d as U,m as N,a as $,t as j,e as M}from"../chunks/index.e6d13144.js";function V(f){let e,a='<a href="#" class="avatars__item svelte-1oweyhl"><img class="avatar svelte-1oweyhl" src="https://pbs.twimg.com/profile_images/1699794493342638080/CcUiL4Ie_400x400.jpg" alt=""/></a> <a href="#" class="avatars__item svelte-1oweyhl"><img class="avatar svelte-1oweyhl" src="https://pbs.twimg.com/profile_images/1395027028399771651/H8W2pnUN_400x400.jpg" alt=""/></a> <a href="#" class="avatars__item svelte-1oweyhl"><img class="avatar svelte-1oweyhl" src="https://pbs.twimg.com/profile_images/1651688795429822464/cmDeEncE_400x400.jpg" alt=""/></a> <a href="#" class="avatars__item svelte-1oweyhl"><img class="avatar svelte-1oweyhl" src="https://pbs.twimg.com/profile_images/1581014308397502464/NPogKMyk_400x400.jpg" alt=""/></a>';return{c(){e=p("div"),e.innerHTML=a,this.h()},l(t){e=u(t,"DIV",{class:!0,"data-svelte-h":!0}),b(e)!=="svelte-1wwcaj3"&&(e.innerHTML=a),this.h()},h(){g(e,"class","avatars svelte-1oweyhl")},m(t,c){R(t,e,c)},p:y,i:y,o:y,d(t){t&&h(e)}}}class K extends S{constructor(e){super(),D(this,e,null,V,T,{})}}function W(){return new Worker(""+new URL("../workers/editor.worker-94ffd778.js",import.meta.url).href)}function A(f){let e,a,t,c="ErgoScript",m,r,s,o,d,B,v,E=`<button class="btn-secondary flex items-center gap-2 m-2 px-3 py-2 svelte-9cudr2">Mainnet
            <svg width="16px" height="16px" fill="#000000" version="1.1" viewBox="0 0 330 330" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path fill="#bdbdbd" d="m325.61 229.39-150-150c-2.812-2.813-6.628-4.393-10.606-4.393-3.979 0-7.794 1.581-10.607 4.394l-150 150c-5.858 5.858-5.858 15.355 0 21.213 5.857 5.857 15.355 5.858 21.213 0l139.39-139.39 139.4 139.39c2.929 2.929 6.768 4.393 10.607 4.393s7.678-1.464 10.607-4.394c5.857-5.858 5.857-15.355-1e-3 -21.213z"></path></svg></button> <button class="btn flex items-center gap-2 m-2 px-3 py-2 svelte-9cudr2"><img src="command_line.png" class="w-4" alt=""/>
            compile</button>`,_;return s=new K({}),{c(){e=p("div"),a=p("div"),t=p("div"),t.textContent=c,m=L(),r=p("div"),k(s.$$.fragment),o=L(),d=p("div"),B=L(),v=p("div"),v.innerHTML=E,this.h()},l(l){e=u(l,"DIV",{class:!0});var n=w(e);a=u(n,"DIV",{class:!0});var x=w(a);t=u(x,"DIV",{class:!0,"data-svelte-h":!0}),b(t)!=="svelte-6o1sit"&&(t.textContent=c),m=P(x),r=u(x,"DIV",{class:!0});var I=w(r);U(s.$$.fragment,I),I.forEach(h),x.forEach(h),o=P(n),d=u(n,"DIV",{class:!0}),w(d).forEach(h),B=P(n),v=u(n,"DIV",{class:!0,"data-svelte-h":!0}),b(v)!=="svelte-9o2qx8"&&(v.innerHTML=E),n.forEach(h),this.h()},h(){g(t,"class","text-2xl font-bold p-4"),g(r,"class","pr-2"),g(a,"class","navbar flex justify-between items-center svelte-9cudr2"),g(d,"class","h-vh w-full svelte-9cudr2"),g(v,"class","footer w-full flex rounded-md justify-end p-2 gap-4 svelte-9cudr2"),g(e,"class","h-vh svelte-9cudr2")},m(l,n){R(l,e,n),i(e,a),i(a,t),i(a,m),i(a,r),N(s,r,null),i(e,o),i(e,d),f[1](d),i(e,B),i(e,v),_=!0},p:y,i(l){_||($(s.$$.fragment,l),_=!0)},o(l){j(s.$$.fragment,l),_=!1},d(l){l&&h(e),M(s),f[1](null)}}}function z(f,e,a){let t,c,m;O(),C(async()=>(self.MonacoEnvironment={getWorker(o,d){return new W}},m=await F(()=>import("../chunks/editor.main.b2589813.js").then(o=>o.e),["../chunks/editor.main.b2589813.js","../chunks/preload-helper.a4192956.js","../assets/editor.a99fd1e1.css"],import.meta.url),c=m.editor.create(t,{value:r,language:"scala",minimap:{enabled:!1},theme:"vs-dark",fontSize:16,automaticLayout:!0}),()=>{c.dispose()}));let r=`{
    // Constants
    // _contractDevPK
    // _oraclePoolNFT = "0fb1eca4646950743bc5a8c341c16871a0ad9b4077e3b276bf93855d51a042d1"
    
    val hodlTargetRate : Long      = SELF.R4[Long].get
    val maxHeight      : Int       = SELF.R5[Int].get
    val hodlerPK       : SigmaProp = SELF.R6[SigmaProp].get
    val uiFeePK        : SigmaProp = SELF.R7[SigmaProp].get
    
    val totalLockedNanoErg : Long = SELF.value
    
    val fees: Coll[(SigmaProp, BigInt)] = {
        val feeDenom : Long = 100000L
        val devFee   : Long = 500L         // 0.5%
        val uiFee    : Long = 500L         // 0.5%
            Coll(
                 (_contractDevPK, (devFee.toBigInt * totalLockedNanoErg.toBigInt) / feeDenom.toBigInt),
                 (uiFeePK, (uiFee.toBigInt * totalLockedNanoErg.toBigInt) / feeDenom.toBigInt)
            )
    }

    // Ensure that correct fee output boxes exist
    val feesPaid : Boolean = {
        val devFeesPaid: Boolean = {
            if(fees(0)._2 > 0){ // Dev fee is greater than 0
                val devOutput : Box   = OUTPUTS(1)
                allOf(
                    Coll(
                        devOutput.propositionBytes   == fees(0)._1.propBytes,
                        devOutput.value.toBigInt     >= fees(0)._2
                    )
                )
            }else{
                true // do nothing if dev fee doesn't add up greater than 0, prevents errors on low value bonds
            }
        }

        val uiFeesPaid : Boolean = {
            if(fees(1)._2 > 0){ // UI fee is greater than 0
                val uiOutput : Box    = OUTPUTS(2)
                allOf(
                    Coll(
                        uiOutput.propositionBytes   == fees(1)._1.propBytes,
                        uiOutput.value.toBigInt     >= fees(1)._2
                    )
                )
            }else{
                true // do nothing if ui fee doesn't end up greater than 0, prevents errors on low value bonds
            }
        }
        devFeesPaid && uiFeesPaid
    }

    val feesTotal : Long = fees(0)._2 + fees(1)._2

    val repaymentNanoErg : Long = totalLockedNanoErg - feesTotal

    val fundsReturned : Boolean = {
        OUTPUTS(0).propositionBytes == hodlerPK.propBytes && 
        OUTPUTS(0).value >= repaymentNanoErg &&
        OUTPUTS(0).R4[Coll[Byte]].get == SELF.id
    }

    val maxHeightReached : Boolean = {
        maxHeight <= HEIGHT
    }

    val priceTargetReached : Boolean = {
        if (CONTEXT.dataInputs.size > 0) {
            // validate Oracle box
            val oracleBox : Box = CONTEXT.dataInputs(0)
            val currentRate : Long = oracleBox.R4[Long].get
            val oracleHeight: Long = oracleBox.R5[Int].get

            val validDataInput: Boolean = HEIGHT <= oracleHeight + 30 && oracleBox.tokens(0)._1 == _oraclePoolNFT

            // check if the price reached target
            val targetPriceReached: Boolean = currentRate <= hodlTargetRate

            validDataInput && targetPriceReached
        } else {
            false
        }
    }

    if(priceTargetReached || maxHeightReached){
        sigmaProp(fundsReturned && feesPaid)
    } else {
        sigmaProp(false)
    }
}`;function s(o){H[o?"unshift":"push"](()=>{t=o,a(0,t)})}return[t,s]}class J extends S{constructor(e){super(),D(this,e,z,A,T,{})}}export{J as component};

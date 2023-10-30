var vn=Object.defineProperty;var mn=(A,y,S)=>y in A?vn(A,y,{enumerable:!0,configurable:!0,writable:!0,value:S}):A[y]=S;var b=(A,y,S)=>(mn(A,typeof y!="symbol"?y+"":y,S),S);import{m as _n,__tla as wn}from"./2.3613a565.js";let ee,ne,te,re,ie,oe,Ze,ae,se,ue,ce,de,ge,le,fe,C,$,en,_,R,kn=Promise.all([(()=>{try{return wn}catch{}})()]).then(async()=>{var A=Object.defineProperty,y=Object.getOwnPropertyDescriptor,S=Object.getOwnPropertyNames,nn=Object.prototype.hasOwnProperty,he=(n,r,i,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let e of S(r))!nn.call(n,e)&&e!==i&&A(n,e,{get:()=>r[e],enumerable:!(t=y(r,e))||t.enumerable});return n},tn=(n,r,i)=>(he(n,r,"default"),i&&he(i,r,"default")),c={};tn(c,_n);let pe,ve;pe=2*60*1e3,fe=class{constructor(n){b(this,"_defaults");b(this,"_idleCheckInterval");b(this,"_lastUsedTime");b(this,"_configChangeListener");b(this,"_worker");b(this,"_client");this._defaults=n,this._worker=null,this._client=null,this._idleCheckInterval=window.setInterval(()=>this._checkIfIdle(),30*1e3),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange(()=>this._stopWorker())}_stopWorker(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}dispose(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()}_checkIfIdle(){this._worker&&Date.now()-this._lastUsedTime>pe&&this._stopWorker()}_getClient(){return this._lastUsedTime=Date.now(),this._client||(this._worker=c.editor.createWebWorker({moduleId:"vs/language/css/cssWorker",label:this._defaults.languageId,createData:{options:this._defaults.options,languageId:this._defaults.languageId}}),this._client=this._worker.getProxy()),this._client}getLanguageServiceWorker(...n){let r;return this._getClient().then(i=>{r=i}).then(i=>{if(this._worker)return this._worker.withSyncedResources(n)}).then(i=>r)}},function(n){n.MIN_VALUE=-2147483648,n.MAX_VALUE=2147483647}(ve||(ve={}));var W;(function(n){n.MIN_VALUE=0,n.MAX_VALUE=2147483647})(W||(W={}));var k;(function(n){function r(t,e){return t===Number.MAX_VALUE&&(t=W.MAX_VALUE),e===Number.MAX_VALUE&&(e=W.MAX_VALUE),{line:t,character:e}}n.create=r;function i(t){var e=t;return s.objectLiteral(e)&&s.uinteger(e.line)&&s.uinteger(e.character)}n.is=i})(k||(k={}));var v;(function(n){function r(t,e,o,a){if(s.uinteger(t)&&s.uinteger(e)&&s.uinteger(o)&&s.uinteger(a))return{start:k.create(t,e),end:k.create(o,a)};if(k.is(t)&&k.is(e))return{start:t,end:e};throw new Error("Range#create called with invalid arguments["+t+", "+e+", "+o+", "+a+"]")}n.create=r;function i(t){var e=t;return s.objectLiteral(e)&&k.is(e.start)&&k.is(e.end)}n.is=i})(v||(v={}));var q;(function(n){function r(t,e){return{uri:t,range:e}}n.create=r;function i(t){var e=t;return s.defined(e)&&v.is(e.range)&&(s.string(e.uri)||s.undefined(e.uri))}n.is=i})(q||(q={}));var me;(function(n){function r(t,e,o,a){return{targetUri:t,targetRange:e,targetSelectionRange:o,originSelectionRange:a}}n.create=r;function i(t){var e=t;return s.defined(e)&&v.is(e.targetRange)&&s.string(e.targetUri)&&(v.is(e.targetSelectionRange)||s.undefined(e.targetSelectionRange))&&(v.is(e.originSelectionRange)||s.undefined(e.originSelectionRange))}n.is=i})(me||(me={}));var Q;(function(n){function r(t,e,o,a){return{red:t,green:e,blue:o,alpha:a}}n.create=r;function i(t){var e=t;return s.numberRange(e.red,0,1)&&s.numberRange(e.green,0,1)&&s.numberRange(e.blue,0,1)&&s.numberRange(e.alpha,0,1)}n.is=i})(Q||(Q={}));var _e;(function(n){function r(t,e){return{range:t,color:e}}n.create=r;function i(t){var e=t;return v.is(e.range)&&Q.is(e.color)}n.is=i})(_e||(_e={}));var we;(function(n){function r(t,e,o){return{label:t,textEdit:e,additionalTextEdits:o}}n.create=r;function i(t){var e=t;return s.string(e.label)&&(s.undefined(e.textEdit)||x.is(e))&&(s.undefined(e.additionalTextEdits)||s.typedArray(e.additionalTextEdits,x.is))}n.is=i})(we||(we={}));var P;(function(n){n.Comment="comment",n.Imports="imports",n.Region="region"})(P||(P={}));var ke;(function(n){function r(t,e,o,a,u){var l={startLine:t,endLine:e};return s.defined(o)&&(l.startCharacter=o),s.defined(a)&&(l.endCharacter=a),s.defined(u)&&(l.kind=u),l}n.create=r;function i(t){var e=t;return s.uinteger(e.startLine)&&s.uinteger(e.startLine)&&(s.undefined(e.startCharacter)||s.uinteger(e.startCharacter))&&(s.undefined(e.endCharacter)||s.uinteger(e.endCharacter))&&(s.undefined(e.kind)||s.string(e.kind))}n.is=i})(ke||(ke={}));var G;(function(n){function r(t,e){return{location:t,message:e}}n.create=r;function i(t){var e=t;return s.defined(e)&&q.is(e.location)&&s.string(e.message)}n.is=i})(G||(G={}));var T;(function(n){n.Error=1,n.Warning=2,n.Information=3,n.Hint=4})(T||(T={}));var be;(function(n){n.Unnecessary=1,n.Deprecated=2})(be||(be={}));var ye;(function(n){function r(i){var t=i;return t!=null&&s.string(t.href)}n.is=r})(ye||(ye={}));var V;(function(n){function r(t,e,o,a,u,l){var d={range:t,message:e};return s.defined(o)&&(d.severity=o),s.defined(a)&&(d.code=a),s.defined(u)&&(d.source=u),s.defined(l)&&(d.relatedInformation=l),d}n.create=r;function i(t){var e,o=t;return s.defined(o)&&v.is(o.range)&&s.string(o.message)&&(s.number(o.severity)||s.undefined(o.severity))&&(s.integer(o.code)||s.string(o.code)||s.undefined(o.code))&&(s.undefined(o.codeDescription)||s.string((e=o.codeDescription)===null||e===void 0?void 0:e.href))&&(s.string(o.source)||s.undefined(o.source))&&(s.undefined(o.relatedInformation)||s.typedArray(o.relatedInformation,G.is))}n.is=i})(V||(V={}));var F;(function(n){function r(t,e){for(var o=[],a=2;a<arguments.length;a++)o[a-2]=arguments[a];var u={title:t,command:e};return s.defined(o)&&o.length>0&&(u.arguments=o),u}n.create=r;function i(t){var e=t;return s.defined(e)&&s.string(e.title)&&s.string(e.command)}n.is=i})(F||(F={}));var x;(function(n){function r(o,a){return{range:o,newText:a}}n.replace=r;function i(o,a){return{range:{start:o,end:o},newText:a}}n.insert=i;function t(o){return{range:o,newText:""}}n.del=t;function e(o){var a=o;return s.objectLiteral(a)&&s.string(a.newText)&&v.is(a.range)}n.is=e})(x||(x={}));var D;(function(n){function r(t,e,o){var a={label:t};return e!==void 0&&(a.needsConfirmation=e),o!==void 0&&(a.description=o),a}n.create=r;function i(t){var e=t;return e!==void 0&&s.objectLiteral(e)&&s.string(e.label)&&(s.boolean(e.needsConfirmation)||e.needsConfirmation===void 0)&&(s.string(e.description)||e.description===void 0)}n.is=i})(D||(D={}));var m;(function(n){function r(i){var t=i;return typeof t=="string"}n.is=r})(m||(m={}));var I;(function(n){function r(o,a,u){return{range:o,newText:a,annotationId:u}}n.replace=r;function i(o,a,u){return{range:{start:o,end:o},newText:a,annotationId:u}}n.insert=i;function t(o,a){return{range:o,newText:"",annotationId:a}}n.del=t;function e(o){var a=o;return x.is(a)&&(D.is(a.annotationId)||m.is(a.annotationId))}n.is=e})(I||(I={}));var H;(function(n){function r(t,e){return{textDocument:t,edits:e}}n.create=r;function i(t){var e=t;return s.defined(e)&&z.is(e.textDocument)&&Array.isArray(e.edits)}n.is=i})(H||(H={}));var L;(function(n){function r(t,e,o){var a={kind:"create",uri:t};return e!==void 0&&(e.overwrite!==void 0||e.ignoreIfExists!==void 0)&&(a.options=e),o!==void 0&&(a.annotationId=o),a}n.create=r;function i(t){var e=t;return e&&e.kind==="create"&&s.string(e.uri)&&(e.options===void 0||(e.options.overwrite===void 0||s.boolean(e.options.overwrite))&&(e.options.ignoreIfExists===void 0||s.boolean(e.options.ignoreIfExists)))&&(e.annotationId===void 0||m.is(e.annotationId))}n.is=i})(L||(L={}));var j;(function(n){function r(t,e,o,a){var u={kind:"rename",oldUri:t,newUri:e};return o!==void 0&&(o.overwrite!==void 0||o.ignoreIfExists!==void 0)&&(u.options=o),a!==void 0&&(u.annotationId=a),u}n.create=r;function i(t){var e=t;return e&&e.kind==="rename"&&s.string(e.oldUri)&&s.string(e.newUri)&&(e.options===void 0||(e.options.overwrite===void 0||s.boolean(e.options.overwrite))&&(e.options.ignoreIfExists===void 0||s.boolean(e.options.ignoreIfExists)))&&(e.annotationId===void 0||m.is(e.annotationId))}n.is=i})(j||(j={}));var O;(function(n){function r(t,e,o){var a={kind:"delete",uri:t};return e!==void 0&&(e.recursive!==void 0||e.ignoreIfNotExists!==void 0)&&(a.options=e),o!==void 0&&(a.annotationId=o),a}n.create=r;function i(t){var e=t;return e&&e.kind==="delete"&&s.string(e.uri)&&(e.options===void 0||(e.options.recursive===void 0||s.boolean(e.options.recursive))&&(e.options.ignoreIfNotExists===void 0||s.boolean(e.options.ignoreIfNotExists)))&&(e.annotationId===void 0||m.is(e.annotationId))}n.is=i})(O||(O={}));var J;(function(n){function r(i){var t=i;return t&&(t.changes!==void 0||t.documentChanges!==void 0)&&(t.documentChanges===void 0||t.documentChanges.every(function(e){return s.string(e.kind)?L.is(e)||j.is(e)||O.is(e):H.is(e)}))}n.is=r})(J||(J={}));var K=function(){function n(r,i){this.edits=r,this.changeAnnotations=i}return n.prototype.insert=function(r,i,t){var e,o;if(t===void 0?e=x.insert(r,i):m.is(t)?(o=t,e=I.insert(r,i,t)):(this.assertChangeAnnotations(this.changeAnnotations),o=this.changeAnnotations.manage(t),e=I.insert(r,i,o)),this.edits.push(e),o!==void 0)return o},n.prototype.replace=function(r,i,t){var e,o;if(t===void 0?e=x.replace(r,i):m.is(t)?(o=t,e=I.replace(r,i,t)):(this.assertChangeAnnotations(this.changeAnnotations),o=this.changeAnnotations.manage(t),e=I.replace(r,i,o)),this.edits.push(e),o!==void 0)return o},n.prototype.delete=function(r,i){var t,e;if(i===void 0?t=x.del(r):m.is(i)?(e=i,t=I.del(r,i)):(this.assertChangeAnnotations(this.changeAnnotations),e=this.changeAnnotations.manage(i),t=I.del(r,e)),this.edits.push(t),e!==void 0)return e},n.prototype.add=function(r){this.edits.push(r)},n.prototype.all=function(){return this.edits},n.prototype.clear=function(){this.edits.splice(0,this.edits.length)},n.prototype.assertChangeAnnotations=function(r){if(r===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},n}(),Ee=function(){function n(r){this._annotations=r===void 0?Object.create(null):r,this._counter=0,this._size=0}return n.prototype.all=function(){return this._annotations},Object.defineProperty(n.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),n.prototype.manage=function(r,i){var t;if(m.is(r)?t=r:(t=this.nextId(),i=r),this._annotations[t]!==void 0)throw new Error("Id "+t+" is already in use.");if(i===void 0)throw new Error("No annotation provided for id "+t);return this._annotations[t]=i,this._size++,t},n.prototype.nextId=function(){return this._counter++,this._counter.toString()},n}();(function(){function n(r){var i=this;this._textEditChanges=Object.create(null),r!==void 0?(this._workspaceEdit=r,r.documentChanges?(this._changeAnnotations=new Ee(r.changeAnnotations),r.changeAnnotations=this._changeAnnotations.all(),r.documentChanges.forEach(function(t){if(H.is(t)){var e=new K(t.edits,i._changeAnnotations);i._textEditChanges[t.textDocument.uri]=e}})):r.changes&&Object.keys(r.changes).forEach(function(t){var e=new K(r.changes[t]);i._textEditChanges[t]=e})):this._workspaceEdit={}}return Object.defineProperty(n.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),n.prototype.getTextEditChange=function(r){if(z.is(r)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var i={uri:r.uri,version:r.version},t=this._textEditChanges[i.uri];if(!t){var e=[],o={textDocument:i,edits:e};this._workspaceEdit.documentChanges.push(o),t=new K(e,this._changeAnnotations),this._textEditChanges[i.uri]=t}return t}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var t=this._textEditChanges[r];if(!t){var e=[];this._workspaceEdit.changes[r]=e,t=new K(e),this._textEditChanges[r]=t}return t}},n.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new Ee,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},n.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},n.prototype.createFile=function(r,i,t){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var e;D.is(i)||m.is(i)?e=i:t=i;var o,a;if(e===void 0?o=L.create(r,t):(a=m.is(e)?e:this._changeAnnotations.manage(e),o=L.create(r,t,a)),this._workspaceEdit.documentChanges.push(o),a!==void 0)return a},n.prototype.renameFile=function(r,i,t,e){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var o;D.is(t)||m.is(t)?o=t:e=t;var a,u;if(o===void 0?a=j.create(r,i,e):(u=m.is(o)?o:this._changeAnnotations.manage(o),a=j.create(r,i,e,u)),this._workspaceEdit.documentChanges.push(a),u!==void 0)return u},n.prototype.deleteFile=function(r,i,t){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var e;D.is(i)||m.is(i)?e=i:t=i;var o,a;if(e===void 0?o=O.create(r,t):(a=m.is(e)?e:this._changeAnnotations.manage(e),o=O.create(r,t,a)),this._workspaceEdit.documentChanges.push(o),a!==void 0)return a},n})();var Ce;(function(n){function r(t){return{uri:t}}n.create=r;function i(t){var e=t;return s.defined(e)&&s.string(e.uri)}n.is=i})(Ce||(Ce={}));var xe;(function(n){function r(t,e){return{uri:t,version:e}}n.create=r;function i(t){var e=t;return s.defined(e)&&s.string(e.uri)&&s.integer(e.version)}n.is=i})(xe||(xe={}));var z;(function(n){function r(t,e){return{uri:t,version:e}}n.create=r;function i(t){var e=t;return s.defined(e)&&s.string(e.uri)&&(e.version===null||s.integer(e.version))}n.is=i})(z||(z={}));var Ie;(function(n){function r(t,e,o,a){return{uri:t,languageId:e,version:o,text:a}}n.create=r;function i(t){var e=t;return s.defined(e)&&s.string(e.uri)&&s.string(e.languageId)&&s.integer(e.version)&&s.string(e.text)}n.is=i})(Ie||(Ie={}));var N;(function(n){n.PlainText="plaintext",n.Markdown="markdown"})(N||(N={})),function(n){function r(i){var t=i;return t===n.PlainText||t===n.Markdown}n.is=r}(N||(N={}));var Y;(function(n){function r(i){var t=i;return s.objectLiteral(i)&&N.is(t.kind)&&s.string(t.value)}n.is=r})(Y||(Y={}));var f;(function(n){n.Text=1,n.Method=2,n.Function=3,n.Constructor=4,n.Field=5,n.Variable=6,n.Class=7,n.Interface=8,n.Module=9,n.Property=10,n.Unit=11,n.Value=12,n.Enum=13,n.Keyword=14,n.Snippet=15,n.Color=16,n.File=17,n.Reference=18,n.Folder=19,n.EnumMember=20,n.Constant=21,n.Struct=22,n.Event=23,n.Operator=24,n.TypeParameter=25})(f||(f={}));var Z;(function(n){n.PlainText=1,n.Snippet=2})(Z||(Z={}));var Ae;(function(n){n.Deprecated=1})(Ae||(Ae={}));var Se;(function(n){function r(t,e,o){return{newText:t,insert:e,replace:o}}n.create=r;function i(t){var e=t;return e&&s.string(e.newText)&&v.is(e.insert)&&v.is(e.replace)}n.is=i})(Se||(Se={}));var Re;(function(n){n.asIs=1,n.adjustIndentation=2})(Re||(Re={}));var Te;(function(n){function r(i){return{label:i}}n.create=r})(Te||(Te={}));var De;(function(n){function r(i,t){return{items:i||[],isIncomplete:!!t}}n.create=r})(De||(De={}));var X;(function(n){function r(t){return t.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}n.fromPlainText=r;function i(t){var e=t;return s.string(e)||s.objectLiteral(e)&&s.string(e.language)&&s.string(e.value)}n.is=i})(X||(X={}));var Me;(function(n){function r(i){var t=i;return!!t&&s.objectLiteral(t)&&(Y.is(t.contents)||X.is(t.contents)||s.typedArray(t.contents,X.is))&&(i.range===void 0||v.is(i.range))}n.is=r})(Me||(Me={}));var Pe;(function(n){function r(i,t){return t?{label:i,documentation:t}:{label:i}}n.create=r})(Pe||(Pe={}));var Fe;(function(n){function r(i,t){for(var e=[],o=2;o<arguments.length;o++)e[o-2]=arguments[o];var a={label:i};return s.defined(t)&&(a.documentation=t),s.defined(e)?a.parameters=e:a.parameters=[],a}n.create=r})(Fe||(Fe={}));var U;(function(n){n.Text=1,n.Read=2,n.Write=3})(U||(U={}));var Le;(function(n){function r(i,t){var e={range:i};return s.number(t)&&(e.kind=t),e}n.create=r})(Le||(Le={}));var h;(function(n){n.File=1,n.Module=2,n.Namespace=3,n.Package=4,n.Class=5,n.Method=6,n.Property=7,n.Field=8,n.Constructor=9,n.Enum=10,n.Interface=11,n.Function=12,n.Variable=13,n.Constant=14,n.String=15,n.Number=16,n.Boolean=17,n.Array=18,n.Object=19,n.Key=20,n.Null=21,n.EnumMember=22,n.Struct=23,n.Event=24,n.Operator=25,n.TypeParameter=26})(h||(h={}));var je;(function(n){n.Deprecated=1})(je||(je={}));var Oe;(function(n){function r(i,t,e,o,a){var u={name:i,kind:t,location:{uri:o,range:e}};return a&&(u.containerName=a),u}n.create=r})(Oe||(Oe={}));var Ne;(function(n){function r(t,e,o,a,u,l){var d={name:t,detail:e,kind:o,range:a,selectionRange:u};return l!==void 0&&(d.children=l),d}n.create=r;function i(t){var e=t;return e&&s.string(e.name)&&s.number(e.kind)&&v.is(e.range)&&v.is(e.selectionRange)&&(e.detail===void 0||s.string(e.detail))&&(e.deprecated===void 0||s.boolean(e.deprecated))&&(e.children===void 0||Array.isArray(e.children))&&(e.tags===void 0||Array.isArray(e.tags))}n.is=i})(Ne||(Ne={}));var Ue;(function(n){n.Empty="",n.QuickFix="quickfix",n.Refactor="refactor",n.RefactorExtract="refactor.extract",n.RefactorInline="refactor.inline",n.RefactorRewrite="refactor.rewrite",n.Source="source",n.SourceOrganizeImports="source.organizeImports",n.SourceFixAll="source.fixAll"})(Ue||(Ue={}));var We;(function(n){function r(t,e){var o={diagnostics:t};return e!=null&&(o.only=e),o}n.create=r;function i(t){var e=t;return s.defined(e)&&s.typedArray(e.diagnostics,V.is)&&(e.only===void 0||s.typedArray(e.only,s.string))}n.is=i})(We||(We={}));var Ve;(function(n){function r(t,e,o){var a={title:t},u=!0;return typeof e=="string"?(u=!1,a.kind=e):F.is(e)?a.command=e:a.edit=e,u&&o!==void 0&&(a.kind=o),a}n.create=r;function i(t){var e=t;return e&&s.string(e.title)&&(e.diagnostics===void 0||s.typedArray(e.diagnostics,V.is))&&(e.kind===void 0||s.string(e.kind))&&(e.edit!==void 0||e.command!==void 0)&&(e.command===void 0||F.is(e.command))&&(e.isPreferred===void 0||s.boolean(e.isPreferred))&&(e.edit===void 0||J.is(e.edit))}n.is=i})(Ve||(Ve={}));var He;(function(n){function r(t,e){var o={range:t};return s.defined(e)&&(o.data=e),o}n.create=r;function i(t){var e=t;return s.defined(e)&&v.is(e.range)&&(s.undefined(e.command)||F.is(e.command))}n.is=i})(He||(He={}));var Ke;(function(n){function r(t,e){return{tabSize:t,insertSpaces:e}}n.create=r;function i(t){var e=t;return s.defined(e)&&s.uinteger(e.tabSize)&&s.boolean(e.insertSpaces)}n.is=i})(Ke||(Ke={}));var ze;(function(n){function r(t,e,o){return{range:t,target:e,data:o}}n.create=r;function i(t){var e=t;return s.defined(e)&&v.is(e.range)&&(s.undefined(e.target)||s.string(e.target))}n.is=i})(ze||(ze={}));var Xe;(function(n){function r(t,e){return{range:t,parent:e}}n.create=r;function i(t){var e=t;return e!==void 0&&v.is(e.range)&&(e.parent===void 0||n.is(e.parent))}n.is=i})(Xe||(Xe={}));var Be;(function(n){function r(o,a,u,l){return new rn(o,a,u,l)}n.create=r;function i(o){var a=o;return!!(s.defined(a)&&s.string(a.uri)&&(s.undefined(a.languageId)||s.string(a.languageId))&&s.uinteger(a.lineCount)&&s.func(a.getText)&&s.func(a.positionAt)&&s.func(a.offsetAt))}n.is=i;function t(o,a){for(var u=o.getText(),l=e(a,function(M,B){var Ye=M.range.start.line-B.range.start.line;return Ye===0?M.range.start.character-B.range.start.character:Ye}),d=u.length,p=l.length-1;p>=0;p--){var w=l[p],E=o.offsetAt(w.range.start),g=o.offsetAt(w.range.end);if(g<=d)u=u.substring(0,E)+w.newText+u.substring(g,u.length);else throw new Error("Overlapping edit");d=E}return u}n.applyEdits=t;function e(o,a){if(o.length<=1)return o;var u=o.length/2|0,l=o.slice(0,u),d=o.slice(u);e(l,a),e(d,a);for(var p=0,w=0,E=0;p<l.length&&w<d.length;){var g=a(l[p],d[w]);g<=0?o[E++]=l[p++]:o[E++]=d[w++]}for(;p<l.length;)o[E++]=l[p++];for(;w<d.length;)o[E++]=d[w++];return o}})(Be||(Be={}));var rn=function(){function n(r,i,t,e){this._uri=r,this._languageId=i,this._version=t,this._content=e,this._lineOffsets=void 0}return Object.defineProperty(n.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),n.prototype.getText=function(r){if(r){var i=this.offsetAt(r.start),t=this.offsetAt(r.end);return this._content.substring(i,t)}return this._content},n.prototype.update=function(r,i){this._content=r.text,this._version=i,this._lineOffsets=void 0},n.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var r=[],i=this._content,t=!0,e=0;e<i.length;e++){t&&(r.push(e),t=!1);var o=i.charAt(e);t=o==="\r"||o===`
`,o==="\r"&&e+1<i.length&&i.charAt(e+1)===`
`&&e++}t&&i.length>0&&r.push(i.length),this._lineOffsets=r}return this._lineOffsets},n.prototype.positionAt=function(r){r=Math.max(Math.min(r,this._content.length),0);var i=this.getLineOffsets(),t=0,e=i.length;if(e===0)return k.create(0,r);for(;t<e;){var o=Math.floor((t+e)/2);i[o]>r?e=o:t=o+1}var a=t-1;return k.create(a,r-i[a])},n.prototype.offsetAt=function(r){var i=this.getLineOffsets();if(r.line>=i.length)return this._content.length;if(r.line<0)return 0;var t=i[r.line],e=r.line+1<i.length?i[r.line+1]:this._content.length;return Math.max(Math.min(t+r.character,e),t)},Object.defineProperty(n.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),n}(),s;(function(n){var r=Object.prototype.toString;function i(g){return typeof g<"u"}n.defined=i;function t(g){return typeof g>"u"}n.undefined=t;function e(g){return g===!0||g===!1}n.boolean=e;function o(g){return r.call(g)==="[object String]"}n.string=o;function a(g){return r.call(g)==="[object Number]"}n.number=a;function u(g,M,B){return r.call(g)==="[object Number]"&&M<=g&&g<=B}n.numberRange=u;function l(g){return r.call(g)==="[object Number]"&&-2147483648<=g&&g<=2147483647}n.integer=l;function d(g){return r.call(g)==="[object Number]"&&0<=g&&g<=2147483647}n.uinteger=d;function p(g){return r.call(g)==="[object Function]"}n.func=p;function w(g){return g!==null&&typeof g=="object"}n.objectLiteral=w;function E(g,M){return Array.isArray(g)&&g.every(M)}n.typedArray=E})(s||(s={})),te=class{constructor(n,r,i){b(this,"_disposables",[]);b(this,"_listener",Object.create(null));this._languageId=n,this._worker=r;const t=o=>{let a=o.getLanguageId();if(a!==this._languageId)return;let u;this._listener[o.uri.toString()]=o.onDidChangeContent(()=>{window.clearTimeout(u),u=window.setTimeout(()=>this._doValidate(o.uri,a),500)}),this._doValidate(o.uri,a)},e=o=>{c.editor.setModelMarkers(o,this._languageId,[]);let a=o.uri.toString(),u=this._listener[a];u&&(u.dispose(),delete this._listener[a])};this._disposables.push(c.editor.onDidCreateModel(t)),this._disposables.push(c.editor.onWillDisposeModel(e)),this._disposables.push(c.editor.onDidChangeModelLanguage(o=>{e(o.model),t(o.model)})),this._disposables.push(i(o=>{c.editor.getModels().forEach(a=>{a.getLanguageId()===this._languageId&&(e(a),t(a))})})),this._disposables.push({dispose:()=>{c.editor.getModels().forEach(e);for(let o in this._listener)this._listener[o].dispose()}}),c.editor.getModels().forEach(t)}dispose(){this._disposables.forEach(n=>n&&n.dispose()),this._disposables.length=0}_doValidate(n,r){this._worker(n).then(i=>i.doValidation(n.toString())).then(i=>{const t=i.map(o=>an(n,o));let e=c.editor.getModel(n);e&&e.getLanguageId()===r&&c.editor.setModelMarkers(e,r,t)}).then(void 0,i=>{console.error(i)})}};function on(n){switch(n){case T.Error:return c.MarkerSeverity.Error;case T.Warning:return c.MarkerSeverity.Warning;case T.Information:return c.MarkerSeverity.Info;case T.Hint:return c.MarkerSeverity.Hint;default:return c.MarkerSeverity.Info}}function an(n,r){let i=typeof r.code=="number"?String(r.code):r.code;return{severity:on(r.severity),startLineNumber:r.range.start.line+1,startColumn:r.range.start.character+1,endLineNumber:r.range.end.line+1,endColumn:r.range.end.character+1,message:r.message,code:i,source:r.source}}ee=class{constructor(n,r){this._worker=n,this._triggerCharacters=r}get triggerCharacters(){return this._triggerCharacters}provideCompletionItems(n,r,i,t){const e=n.uri;return this._worker(e).then(o=>o.doComplete(e.toString(),C(r))).then(o=>{if(!o)return;const a=n.getWordUntilPosition(r),u=new c.Range(r.lineNumber,a.startColumn,r.lineNumber,a.endColumn),l=o.items.map(d=>{const p={label:d.label,insertText:d.insertText||d.label,sortText:d.sortText,filterText:d.filterText,documentation:d.documentation,detail:d.detail,command:cn(d.command),range:u,kind:un(d.kind)};return d.textEdit&&(sn(d.textEdit)?p.range={insert:_(d.textEdit.insert),replace:_(d.textEdit.replace)}:p.range=_(d.textEdit.range),p.insertText=d.textEdit.newText),d.additionalTextEdits&&(p.additionalTextEdits=d.additionalTextEdits.map(R)),d.insertTextFormat===Z.Snippet&&(p.insertTextRules=c.languages.CompletionItemInsertTextRule.InsertAsSnippet),p});return{isIncomplete:o.isIncomplete,suggestions:l}})}},C=function(n){if(n)return{character:n.column-1,line:n.lineNumber-1}},$=function(n){if(n)return{start:{line:n.startLineNumber-1,character:n.startColumn-1},end:{line:n.endLineNumber-1,character:n.endColumn-1}}},_=function(n){if(n)return new c.Range(n.start.line+1,n.start.character+1,n.end.line+1,n.end.character+1)};function sn(n){return typeof n.insert<"u"&&typeof n.replace<"u"}function un(n){const r=c.languages.CompletionItemKind;switch(n){case f.Text:return r.Text;case f.Method:return r.Method;case f.Function:return r.Function;case f.Constructor:return r.Constructor;case f.Field:return r.Field;case f.Variable:return r.Variable;case f.Class:return r.Class;case f.Interface:return r.Interface;case f.Module:return r.Module;case f.Property:return r.Property;case f.Unit:return r.Unit;case f.Value:return r.Value;case f.Enum:return r.Enum;case f.Keyword:return r.Keyword;case f.Snippet:return r.Snippet;case f.Color:return r.Color;case f.File:return r.File;case f.Reference:return r.Reference}return r.Property}R=function(n){if(n)return{range:_(n.range),text:n.newText}};function cn(n){return n&&n.command==="editor.action.triggerSuggest"?{id:n.command,title:n.title,arguments:n.arguments}:void 0}ce=class{constructor(n){this._worker=n}provideHover(n,r,i){let t=n.uri;return this._worker(t).then(e=>e.doHover(t.toString(),C(r))).then(e=>{if(e)return{range:_(e.range),contents:gn(e.contents)}})}};function dn(n){return n&&typeof n=="object"&&typeof n.kind=="string"}function $e(n){return typeof n=="string"?{value:n}:dn(n)?n.kind==="plaintext"?{value:n.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:n.value}:{value:"```"+n.language+`
`+n.value+"\n```\n"}}function gn(n){if(n)return Array.isArray(n)?n.map($e):[$e(n)]}oe=class{constructor(n){this._worker=n}provideDocumentHighlights(n,r,i){const t=n.uri;return this._worker(t).then(e=>e.findDocumentHighlights(t.toString(),C(r))).then(e=>{if(e)return e.map(o=>({range:_(o.range),kind:ln(o.kind)}))})}};function ln(n){switch(n){case U.Read:return c.languages.DocumentHighlightKind.Read;case U.Write:return c.languages.DocumentHighlightKind.Write;case U.Text:return c.languages.DocumentHighlightKind.Text}return c.languages.DocumentHighlightKind.Text}ne=class{constructor(n){this._worker=n}provideDefinition(n,r,i){const t=n.uri;return this._worker(t).then(e=>e.findDefinition(t.toString(),C(r))).then(e=>{if(e)return[qe(e)]})}};function qe(n){return{uri:c.Uri.parse(n.uri),range:_(n.range)}}de=class{constructor(n){this._worker=n}provideReferences(n,r,i,t){const e=n.uri;return this._worker(e).then(o=>o.findReferences(e.toString(),C(r))).then(o=>{if(o)return o.map(qe)})}},ge=class{constructor(n){this._worker=n}provideRenameEdits(n,r,i,t){const e=n.uri;return this._worker(e).then(o=>o.doRename(e.toString(),C(r),i)).then(o=>fn(o))}};function fn(n){if(!n||!n.changes)return;let r=[];for(let i in n.changes){const t=c.Uri.parse(i);for(let e of n.changes[i])r.push({resource:t,versionId:void 0,textEdit:{range:_(e.range),text:e.newText}})}return{edits:r}}se=class{constructor(n){this._worker=n}provideDocumentSymbols(n,r){const i=n.uri;return this._worker(i).then(t=>t.findDocumentSymbols(i.toString())).then(t=>{if(t)return t.map(e=>({name:e.name,detail:"",containerName:e.containerName,kind:hn(e.kind),range:_(e.location.range),selectionRange:_(e.location.range),tags:[]}))})}};function hn(n){let r=c.languages.SymbolKind;switch(n){case h.File:return r.Array;case h.Module:return r.Module;case h.Namespace:return r.Namespace;case h.Package:return r.Package;case h.Class:return r.Class;case h.Method:return r.Method;case h.Property:return r.Property;case h.Field:return r.Field;case h.Constructor:return r.Constructor;case h.Enum:return r.Enum;case h.Interface:return r.Interface;case h.Function:return r.Function;case h.Variable:return r.Variable;case h.Constant:return r.Constant;case h.String:return r.String;case h.Number:return r.Number;case h.Boolean:return r.Boolean;case h.Array:return r.Array}return r.Function}Ze=class{constructor(n){this._worker=n}provideLinks(n,r){const i=n.uri;return this._worker(i).then(t=>t.findDocumentLinks(i.toString())).then(t=>{if(t)return{links:t.map(e=>({range:_(e.range),url:e.target}))}})}},ie=class{constructor(n){this._worker=n}provideDocumentFormattingEdits(n,r,i){const t=n.uri;return this._worker(t).then(e=>e.format(t.toString(),null,Qe(r)).then(o=>{if(!(!o||o.length===0))return o.map(R)}))}},ae=class{constructor(n){b(this,"canFormatMultipleRanges",!1);this._worker=n}provideDocumentRangeFormattingEdits(n,r,i,t){const e=n.uri;return this._worker(e).then(o=>o.format(e.toString(),$(r),Qe(i)).then(a=>{if(!(!a||a.length===0))return a.map(R)}))}};function Qe(n){return{tabSize:n.tabSize,insertSpaces:n.insertSpaces}}re=class{constructor(n){this._worker=n}provideDocumentColors(n,r){const i=n.uri;return this._worker(i).then(t=>t.findDocumentColors(i.toString())).then(t=>{if(t)return t.map(e=>({color:e.color,range:_(e.range)}))})}provideColorPresentations(n,r,i){const t=n.uri;return this._worker(t).then(e=>e.getColorPresentations(t.toString(),r.color,$(r.range))).then(e=>{if(e)return e.map(o=>{let a={label:o.label};return o.textEdit&&(a.textEdit=R(o.textEdit)),o.additionalTextEdits&&(a.additionalTextEdits=o.additionalTextEdits.map(R)),a})})}},ue=class{constructor(n){this._worker=n}provideFoldingRanges(n,r,i){const t=n.uri;return this._worker(t).then(e=>e.getFoldingRanges(t.toString(),r)).then(e=>{if(e)return e.map(o=>{const a={start:o.startLine+1,end:o.endLine+1};return typeof o.kind<"u"&&(a.kind=pn(o.kind)),a})})}};function pn(n){switch(n){case P.Comment:return c.languages.FoldingRangeKind.Comment;case P.Imports:return c.languages.FoldingRangeKind.Imports;case P.Region:return c.languages.FoldingRangeKind.Region}}le=class{constructor(n){this._worker=n}provideSelectionRanges(n,r,i){const t=n.uri;return this._worker(t).then(e=>e.getSelectionRanges(t.toString(),r.map(C))).then(e=>{if(e)return e.map(o=>{const a=[];for(;o;)a.push({range:_(o.range)}),o=o.parent;return a})})}},en=function(n){const r=[],i=[],t=new fe(n);r.push(t);const e=(...a)=>t.getLanguageServiceWorker(...a);function o(){const{languageId:a,modeConfiguration:u}=n;Je(i),u.completionItems&&i.push(c.languages.registerCompletionItemProvider(a,new ee(e,["/","-",":"]))),u.hovers&&i.push(c.languages.registerHoverProvider(a,new ce(e))),u.documentHighlights&&i.push(c.languages.registerDocumentHighlightProvider(a,new oe(e))),u.definitions&&i.push(c.languages.registerDefinitionProvider(a,new ne(e))),u.references&&i.push(c.languages.registerReferenceProvider(a,new de(e))),u.documentSymbols&&i.push(c.languages.registerDocumentSymbolProvider(a,new se(e))),u.rename&&i.push(c.languages.registerRenameProvider(a,new ge(e))),u.colors&&i.push(c.languages.registerColorProvider(a,new re(e))),u.foldingRanges&&i.push(c.languages.registerFoldingRangeProvider(a,new ue(e))),u.diagnostics&&i.push(new te(a,e,n.onDidChange)),u.selectionRanges&&i.push(c.languages.registerSelectionRangeProvider(a,new le(e))),u.documentFormattingEdits&&i.push(c.languages.registerDocumentFormattingEditProvider(a,new ie(e))),u.documentRangeFormattingEdits&&i.push(c.languages.registerDocumentRangeFormattingEditProvider(a,new ae(e)))}return o(),r.push(Ge(i)),Ge(r)};function Ge(n){return{dispose:()=>Je(n)}}function Je(n){for(;n.length;)n.pop().dispose()}});export{ee as CompletionAdapter,ne as DefinitionAdapter,te as DiagnosticsAdapter,re as DocumentColorAdapter,ie as DocumentFormattingEditProvider,oe as DocumentHighlightAdapter,Ze as DocumentLinkAdapter,ae as DocumentRangeFormattingEditProvider,se as DocumentSymbolAdapter,ue as FoldingRangeAdapter,ce as HoverAdapter,de as ReferenceAdapter,ge as RenameAdapter,le as SelectionRangeAdapter,fe as WorkerManager,kn as __tla,C as fromPosition,$ as fromRange,en as setupMode,_ as toRange,R as toTextEdit};
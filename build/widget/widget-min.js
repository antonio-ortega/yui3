YUI.add("widget",function(F){var T=F.Lang,P=F.Object,i=F.Node,Q=F.ClassNameManager,c="widget",N="content",e="visible",g="hidden",h="disabled",H="focus",D="blur",A="hasFocus",J="width",a="height",k="",b="-",j="boundingBox",W="contentBox",S="parentNode",C="firstChild",d="ownerDocument",f="body",E="tabIndex",I="locale",K="initValue",U="id",V="render",B="rendered",Z="destroyed",M="contentUpdate",X={};function G(L){this._yuid=F.guid(c);this._strings={};G.superclass.constructor.apply(this,arguments);}G._buildCfg={aggregates:["HTML_PARSER"]};G.NAME=c;G.UI_SRC="ui";var R=G.UI_SRC;G.ATTRS={rendered:{value:false,readOnly:true},boundingBox:{value:null,setter:function(L){return this._setBoundingBox(L);},writeOnce:true},contentBox:{value:null,setter:function(L){return this._setContentBox(L);},writeOnce:true},tabIndex:{value:0},hasFocus:{value:false},disabled:{value:false},visible:{value:true},height:{value:k},width:{value:k},moveStyles:{value:false},locale:{value:"en"},strings:{setter:function(L){return this._setStrings(L,this.get(I));},getter:function(){return this.getStrings(this.get(I));}}};G._NAME_LOWERCASE=G.NAME.toLowerCase();G.getClassName=function(){var L=F.Array(arguments,0,true);L.splice(0,0,this._NAME_LOWERCASE);return Q.getClassName.apply(Q,L);};G.getByNode=function(L){var O,Y=G.getClassName();L=i.get(L);if(L){L=(L.hasClass(Y))?L:L.ancestor("."+Y);if(L){O=X[L.get(U)];}}return O||null;};G.HTML_PARSER={};F.extend(G,F.Base,{getClassName:function(){var L=F.Array(arguments,0,true);L.splice(0,0,this._name);return Q.getClassName.apply(Q,L);},initializer:function(L){this.publish(M,{preventable:false});this._name=this.constructor.NAME.toLowerCase();var Y=this.get(j).get(U);if(Y){X[Y]=this;}var O=this._parseHTML(this.get(W));if(O){F.aggregate(L,O,false);}},destructor:function(){var L=this.get(j);F.Event.purgeElement(L,true);var O=L.get(U);if(O&&O in X){delete X[O];}},render:function(L){if(this.get(Z)){return;}if(!this.get(B)){this.publish(V,{queuable:false,defaultFn:this._defRenderFn});L=(L)?i.get(L):null;if(L&&!L.inDoc()){L=null;}this.fire(V,{parentNode:L});}return this;},_defRenderFn:function(L){this._renderUI(L.parentNode);this._bindUI();this._syncUI();this.renderer();this._set(B,true);},renderer:function(){this.renderUI();this.bindUI();this.syncUI();},bindUI:function(){},renderUI:function(){},syncUI:function(){},hide:function(){return this.set(e,false);},show:function(){return this.set(e,true);},focus:function(){return this.set(A,true);},blur:function(){return this.set(A,false);},enable:function(){return this.set(h,false);},disable:function(){return this.set(h,true);},_parseHTML:function(O){var L=this._getHtmlParser(),Y,l;if(L&&O&&O.hasChildNodes()){P.each(L,function(n,m,p){l=null;if(T.isFunction(n)){l=n.call(this,O);}else{if(T.isArray(n)){l=O.queryAll(n[0]);}else{l=O.query(n);}}if(l!==null&&l!==undefined){Y=Y||{};Y[m]=l;}},this);}return Y;},_moveStyles:function(m,o){var l=this.WRAP_STYLES,p=m.getStyle("position"),O=this.get(W),n=[0,0],Y,L;if(!this.get("height")){Y=O.get("offsetHeight");}if(!this.get("width")){L=O.get("offsetWidth");}if(p==="absolute"){n=m.getXY();o.setStyles({right:"auto",bottom:"auto"});m.setStyles({right:"auto",bottom:"auto"});}F.each(l,function(r,q){var t=m.getStyle(q);o.setStyle(q,t);if(r===false){m.setStyle(q,"");}else{m.setStyle(q,r);}});if(p==="absolute"){o.setXY(n);}if(Y){this.set("height",Y);}if(L){this.set("width",L);}},_renderBox:function(O){var Y=this.get(W),l=this.get(j),m=l.get(d)||Y.get(d),L;if(!l.compareTo(Y.get(S))){if(this.get("moveStyles")){this._moveStyles(Y,l);}if(Y.inDoc(m)){Y.get(S).replaceChild(l,Y);}l.appendChild(Y);}if(!l.inDoc(m)&&!O){L=i.get(f);if(L.get(C)){L.insertBefore(l,L.get(C));}else{L.appendChild(l);}}else{if(O&&!O.compareTo(l.get(S))){O.appendChild(l);}}},_setBoundingBox:function(L){return this._setBox(L,this.BOUNDING_TEMPLATE);},_setContentBox:function(L){return this._setBox(L,this.CONTENT_TEMPLATE);},_setBox:function(Y,O){Y=i.get(Y)||i.create(O);var L=F.stamp(Y);if(!Y.get(U)){Y.set(U,L);}return Y;},_renderUI:function(L){this._renderBoxClassNames();this._renderBox(L);},_renderBoxClassNames:function(){var m=this._getClasses(),Y=this.get(j),L=this.get(W),O,l;Y.addClass(G.getClassName());for(l=m.length-3;l>=0;l--){O=m[l].NAME;if(O){Y.addClass(Q.getClassName(O.toLowerCase()));}}L.addClass(this.getClassName(N));},_bindUI:function(){this.after("visibleChange",this._afterVisibleChange);this.after("disabledChange",this._afterDisabledChange);this.after("heightChange",this._afterHeightChange);this.after("widthChange",this._afterWidthChange);this.after("hasFocusChange",this._afterHasFocusChange);this._bindDOMListeners();},_bindDOMListeners:function(){this.get(j).on(H,F.bind(this._onFocus,this));this.get(j).on(D,F.bind(this._onBlur,this));},_syncUI:function(){this._uiSetVisible(this.get(e));this._uiSetDisabled(this.get(h));this._uiSetHeight(this.get(a));this._uiSetWidth(this.get(J));this._uiSetHasFocus(this.get(A));this._uiSetTabIndex(this.get(E));},_uiSetHeight:function(L){if(T.isNumber(L)){L=L+this.DEF_UNIT;}this.get(j).setStyle(a,L);},_uiSetWidth:function(L){if(T.isNumber(L)){L=L+this.DEF_UNIT;}this.get(j).setStyle(J,L);},_uiSetVisible:function(Y){var O=this.get(j),L=this.getClassName(g);if(Y===true){O.removeClass(L);}else{O.addClass(L);}},_uiSetDisabled:function(Y){var O=this.get(j),L=this.getClassName(h);if(Y===true){O.addClass(L);}else{O.removeClass(L);}},_uiSetHasFocus:function(l,Y){var O=this.get(j),L=this.getClassName(H);if(l===true){O.addClass(L);if(Y!==R){O.focus();}}else{O.removeClass(L);if(Y!==R){O.blur();}}},_uiSetTabIndex:function(L){this.get(j).set(E,L);},_afterVisibleChange:function(L){this._uiSetVisible(L.newVal);},_afterDisabledChange:function(L){this._uiSetDisabled(L.newVal);},_afterHeightChange:function(L){this._uiSetHeight(L.newVal);},_afterWidthChange:function(L){this._uiSetWidth(L.newVal);},_afterHasFocusChange:function(L){this._uiSetHasFocus(L.newVal,L.src);},_onFocus:function(L){this.set(A,true,{src:R});},_onBlur:function(L){this.set(A,false,{src:R});
},toString:function(){return this.constructor.NAME+"["+this._yuid+"]";},DEF_UNIT:"px",CONTENT_TEMPLATE:"<div></div>",BOUNDING_TEMPLATE:"<div></div>",WRAP_STYLES:{height:"100%",width:"100%",zIndex:false,position:"static",top:"0",left:"0",bottom:"",right:"",padding:"",margin:""},_setStrings:function(O,L){var Y=this._strings;L=L.toLowerCase();if(!Y[L]){Y[L]={};}F.aggregate(Y[L],O,true);return Y[L];},_getStrings:function(L){return this._strings[L.toLowerCase()];},getStrings:function(r){r=(r||this.get(I)).toLowerCase();var p=this.getDefaultLocale().toLowerCase(),O=this._getStrings(p),q=(O)?F.merge(O):{},o=r.split(b);if(r!==p||o.length>1){var L="";for(var m=0,Y=o.length;m<Y;++m){L+=o[m];var n=this._getStrings(L);if(n){F.aggregate(q,n,true);}L+=b;}}return q;},getString:function(Y,O){O=(O||this.get(I)).toLowerCase();var l=(this.getDefaultLocale()).toLowerCase(),m=this._getStrings(l)||{},n=m[Y],L=O.lastIndexOf(b);if(O!==l||L!=-1){do{m=this._getStrings(O);if(m&&Y in m){n=m[Y];break;}L=O.lastIndexOf(b);if(L!=-1){O=O.substring(0,L);}}while(L!=-1);}return n;},getDefaultLocale:function(){return this._conf.get(I,K);},_strings:null,_getHtmlParser:function(){if(!this._HTML_PARSER){var O=this._getClasses(),l={},L,Y;for(L=O.length-1;L>=0;L--){Y=O[L].HTML_PARSER;if(Y){F.mix(l,Y,true);}}this._HTML_PARSER=l;}return this._HTML_PARSER;}});G.PLUGINS=[];F.Widget=G;},"@VERSION@",{requires:["base","node","classnamemanager"]});
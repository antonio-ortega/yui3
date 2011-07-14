YUI.add("model-list",function(g){var e=g.Lang,d=g.Array,c="add",f="refresh",a="remove";function b(){b.superclass.constructor.apply(this,arguments);}g.ModelList=g.extend(b,g.Base,{model:null,initializer:function(i){i||(i={});var h=this.model=i.model||this.model;this.publish(c,{defaultFn:this._defAddFn});this.publish(f,{defaultFn:this._defRefreshFn});this.publish(a,{defaultFn:this._defRemoveFn});if(h){this.after("*:idChange",this._afterIdChange);}else{}this._clear();},destructor:function(){d.each(this._items,this._detachList,this);},add:function(i,h){if(e.isArray(i)){return d.map(i,function(j){return this._add(j,h);},this);}else{return this._add(i,h);}},create:function(j,i,k){var h=this;if(typeof i==="function"){k=i;i={};}if(!(j instanceof g.Model)){j=new this.model(j);}return j.save(i,function(l){if(!l){h.add(j,i);}k&&k.apply(null,arguments);});},getByClientId:function(h){return this._clientIdMap[h]||null;},getById:function(h){return this._idMap[h]||null;},invoke:function(i){var h=[this._items,i].concat(d(arguments,1,true));return d.invoke.apply(d,h);},load:function(i,j){var h=this;if(typeof i==="function"){j=i;i={};}this.sync("read",i,function(l,k){if(!l){h.refresh(h.parse(k),i);}j&&j.apply(null,arguments);});return this;},map:function(h,i){return d.map(this._items,h,i);},parse:function(h){if(typeof h==="string"){try{return g.JSON.parse(h)||[];}catch(i){g.error("Failed to parse JSON response.");return null;}}return h||[];},refresh:function(j,h){h||(h={});var i=g.merge(h,{src:"refresh",models:d.map(j,function(k){return k instanceof g.Model?k:new this.model(k);},this)});if(this.comparator){i.models.sort(g.bind(this._sort,this));}h.silent?this._defRefreshFn(i):this.fire(f,i);return this;},remove:function(i,h){if(e.isArray(i)){return d.map(i,function(j){return this._remove(j,h);},this);}else{return this._remove(i,h);}},sort:function(h){var j=this._items.concat(),i;if(!this.comparator){return this;}h||(h={});j.sort(g.bind(this._sort,this));i=g.merge(h,{models:j,src:"sort"});h.silent?this._defRefreshFn(i):this.fire(f,i);return this;},sync:function(){var h=d(arguments,0,true).pop();if(typeof h==="function"){h();}},toArray:function(){return this._items.concat();},toJSON:function(){return this.map(function(h){return h.toJSON();});},_add:function(i,h){var j;h||(h={});if(!(i instanceof g.Model)){i=new this.model(i);}if(this._clientIdMap[i.get("clientId")]){g.error("Model already in list.");return;}j=g.merge(h,{index:this._findIndex(i),model:i});h.silent?this._defAddFn(j):this.fire(c,j);return i;},_attachList:function(h){h.lists.push(this);h.addTarget(this);},_clear:function(){d.each(this._items,this._detachList,this);this._clientIdMap={};this._idMap={};this._items=[];},_detachList:function(i){var h=d.indexOf(i.lists,this);if(h>-1){i.lists.splice(h,1);i.removeTarget(this);}},_findIndex:function(l){var i=this.comparator,j=this._items,h=j.length,m=0,n,k,o;if(!i||!j.length){return j.length;}o=i(l);while(m<h){k=(m+h)>>1;n=j[k];if(i(n)<o){m=k+1;}else{h=k;}}return m;},_remove:function(j,i){var h=this.indexOf(j),k;i||(i={});if(h===-1){g.error("Model not in list.");return;}k=g.merge(i,{index:h,model:j});i.silent?this._defRemoveFn(k):this.fire(a,k);return j;},_sort:function(i,h){var k=this.comparator(i),j=this.comparator(h);return k<j?-1:(k>j?1:0);},_afterIdChange:function(h){h.prevVal&&delete this._idMap[h.prevVal];h.newVal&&(this._idMap[h.newVal]=h.target);},_defAddFn:function(i){var h=i.model,j=h.get("id");this._clientIdMap[h.get("clientId")]=h;if(j){this._idMap[j]=h;}this._attachList(h);this._items.splice(i.index,0,h);},_defRefreshFn:function(h){if(h.src==="sort"){this._items=h.models.concat();return;}this._clear();if(h.models.length){this.add(h.models,{silent:true});}},_defRemoveFn:function(i){var h=i.model,j=h.get("id");this._detachList(h);delete this._clientIdMap[h.get("clientId")];if(j){delete this._idMap[j];}this._items.splice(i.index,1);}},{NAME:"modelList"});g.augment(b,g.ArrayList);g.ArrayList.addMethod(b.prototype,["get","getAsHTML","getAsURL"]);},"@VERSION@",{requires:["array-extras","array-invoke","arraylist","base-build","json-parse","model"]});
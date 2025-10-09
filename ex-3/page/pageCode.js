
!Array.prototype._last&&Object.defineProperty(Array.prototype, "_last", {
                    enumerable: false,
                    value:function(){
                      return this[this.length-1]
                    }
                  });!Array.prototype._after&&Object.defineProperty(Array.prototype, "_after", {
                    enumerable: false,
                    value:function(a){
                      return this[this.indexOf(a)+1]
                    }
                  });!Array.prototype._before&&Object.defineProperty(Array.prototype, "_before", {
                    enumerable: false,
                    value:function(a){
                      return this[this.indexOf(a)-1]
                    }
                  });!Array.prototype._insertToSet&&Object.defineProperty(Array.prototype, "_insertToSet", {
                    enumerable: false,
                    value:function(a){
                      if(!this.includes(a)){
                        this.push(a);
                        return a
                      }
                   }
                 });!Array.prototype._spliceByData&&Object.defineProperty(Array.prototype, "_spliceByData", {
                    enumerable: false,
                    value:function(v,k,_all){
                      if(v&&v.constructor==Array){
                        v.forEach(x=>{
                          this._spliceByData(x,k,_all)
                        })
                      }else if(v&&v.constructor==Function){
                        for(var i=0;i<this.length;i++){
                          if(v(this[i],i)){
                            this.splice(i--,1)
                            if(!_all){
                              break;
                            }
                          }
                        }
                      }else{
                        _all=_all?"forEach":"find"
                        let vs=[...this],
                        n=0;
                        vs[_all]((x,i)=>{
                            if(x==v||(k&&x[k]==v[k])||(k&&x[k]==v)){
                                this.splice(i+n--,1)
                                return 1
                            }
                        })
                      }
                      return this;
                    }
                  });//bz-ignore
window._Util={
  _attrRegex:/\[(.+)\=('|)(\$label|\$header)('|)\]/,
  _bzJQFun:/\:(near|input|data|panel|Contains|textElement|afterEqual|after|before|endContains|contains|endEqual|equal|RowCol|rowcol|text)\((\$label|\$header)\)/,
  _allLetterAndNumber:/[\wÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC]+/,
  _allPrintableChr:/[\wÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC !"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]+/,
  _allSign:/[^\wÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC]+/,
  _jsNameRegex:/[\wÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC\_\$]/,
  _jsData:/([\wÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC\_\$]+|\.|\[\"|\[\'|\'\]|\"\])+/g,
  _matchAllLetterAndNumber:/[\wÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC]+/g,
  _matchAllSign:/[^$\_\wÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC]+/g,
  _trimSign:/(^[^\(\[\{\wÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC]+|[^\wÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC\)\]\}]+$)/g,
  _dataRegex:/(((\$(project|module|test|loop|data|group|action|parameter)((\.|\[|$)([a-zA-Z0-9\u4E00-\u9FCC_\$\'\"\(\)]+[\.|\[|\]]*)*)*|(\'|\").*(\'|\"))+( *(\+|\-|\*|\/) *)*)+)/g,
  _isVarName:function(n){
    return n.match(/^[a-z_\$\u4E00-\u9FCC][a-z0-9_\$\u4E00-\u9FCC]*$/i)
  },
  _insertOSClass:function(){
    let _userAgent=navigator.userAgent.toLowerCase(),c;
    if(_userAgent.match(/mac os|iphone|ipad/)){
      c="bz-apple"
    }else{
      c="bz-window"
    }
    document.body.classList.add(c)
  },
  _getNodeValue:function(v){
    return v&&(v.constructor!=Function||v())
  },
  _formatJSONToString:function(v,_level){
    let _list=[]
    _level=_level||""
    if(v&&v.constructor==Object){
      for(let k in v){
        if(k.match(/^[0-9]+|[^a-z0-9\u4E00-\u9FCC\_\$]/i)){
          k="\""+k+"\""
        }
        _list.push(k+": "+_Util._formatJSONToString(v[k],""))
      }
      return _join(_list,"{","}")
    }else if(v&&v.constructor==Array){
      _list=v.map(x=>_Util._formatJSONToString(x,_level))
      return _join(_list,"[","]")
    }else if($.isNumeric(v)){
      return v
    }else if(v==="true"||v===true||v==="false"||v===false){
      return v
    }else if(v.constructor==String){
      if(v.includes("\n")){
        return "`"+v.replace(/\n/g,"\n  ")+"`"
      }else{
        return JSON.stringify(v)
      }
    }else{
      return JSON.stringify(v)
    }
    function _join(vs,t1,t2){
      if(vs.find(x=>x.includes("\n")||x.length>50)||vs.length>4){
        vs="\n"+_level+vs.map(x=>{
          if(x.includes("\n")){
            x=x.split("\n").map((y,i)=>_level+y).join("\n")
          }
          return x
        }).join(",\n"+_level)+"\n"+_level
      }else{
        vs=vs.join(", ")
      }
      if(vs){
        vs=vs.trim().split("\n").map(x=>"\n  "+x).join("")+"\n"
      }
      return t1+vs+t2
    }
  },
  _isPopWin:function(){
    let w=window.outerWidth,ww=w
    if(w<screen.width/2){
      ww++
    }else{
      ww--
    }
    window.resizeBy(1,0)
    w= w!=window.outerWidth
    window.resizeBy(-1,0)
    return w
  },
  _getElementBestWidth:function(e){
    let sw=0,ms=0,r=e.getBoundingClientRect().width
    for(let o of e.children){
      sw+=_Util._getElementBestWidth(o)
    }
    if(!e.children.length&&e.innerText){
      sw= e.innerText.trim().split("\n")[0].length*5.7
    }
    ["margin-left","margin-right","padding-left","padding-right"].forEach(x=>{
      ms+=(parseInt($(e).css(x))||0)
    })
    if(sw){
      if(sw<r){
        if(!e.children.length){
          sw+=20
        }
        if(sw>r){
          return r+ms
        }
      }
    }else{
      sw=Math.min(r,30)
    }
    return sw+ms
  },
  _isBaseDataType:function(v){
    if(v!==null&&v!==undefined){
      return v.constructor==String||v.constructor==Number||v.constructor==Boolean
    }
  },
  _isBZTWOpened:function(){
    return BZ.TW//&&!BZ.TW.closed
    //&&!window.extensionContent
  },
  _openBZTW:function(_url,ws){
    BZ.TW=window.open(SERVER_HOST+"/empty.html?bzIde="+bzComm.getIdeTabId()+"#"+_url,"bz-client",ws);
  },
  _parseStdJson:function(v){
    try{
      if(v&&v.constructor==String){
        return JSON.parse(v)
      }
    }catch(e){}
    return v
  },
  _getColorByName:function(v){
    while(v.length<6){
      v+=v
    }
    let c="#"
    for(let i=0;i<6;i++){
      c+=(v.charCodeAt(i)%10)
    }
    return c
  },
  _clickNextElement:function(_doc,_event){
    if(_event){
      
      setTimeout(()=>{
        let e=_Util._getElementByXY(_doc.body,_event.clientX,_event.clientY)

        $(e).focus()
        // $util.triggerMouseEvents(e,"click")
        $(e).click()

      },100)
    }
  },
  _getBrowserTime:function(){
    return performance.now()
  },
  _animateDownUp:function(b){
    if(!b){
      return
    }
    let p=b.style.position,t=b.style.top;

    b.style.position="relative";
    $(b).animate({top: "10px"});
    setTimeout(()=>{
      $(b).animate({top: 0});
    },200)
  },
  _isAPISucessStatus:function(v){
    return v!="0"&&v&&v<400
  },
  _isRegexData:function(s){
    if(s && s.constructor==String){
      return !!s.match(/^[\/](.+)[\/][igs]*$/)
    }
  },
  _toRegExp:function(v){
    try{
      if(_Util._isRegexData(v)){
        v=eval(v)
      }
      if(v&&v.constructor==RegExp){
        return v
      }
    }catch(ex){}
  },
  _isXMLData:function(v){
    return v&&v.constructor==String&&v.trim().match(/^<([^ ]+).+<([^>]+)>$/s);
  },
  _joinMessage:function(a){
    a=[...a]
    a=a.filter(x=>x)
    let v=a.pop()
    a=a.join(", ")
    if(a){
      return _Util._formatMessage(_bzMessage._common._andMessage,[a,v])
    }
    return v
  },
  _getEnumFromRegex:function(v){
    if((v||"").match(/^\/([^\|]+\|)+.+\/$/)){
      v=v.substring(1,v.length-1).replace("\\.",".")
      let vv=v.match((/([^\(]*)\(([^\)]+)\)([^\)]*)/))
      if(vv){
        return vv[2].split("|").map(x=>vv[1]+x+vv[3])
      }else if(!v.match(/^\{.*\}$/)){
        return v.split("|")
      }else{
        return [v]
      }
    }
    return []
  },
  _findMissingId:function(ts){
    let v;
    ts.sort((a,b)=>a-b);
    ts.find((x,i)=>{
      if(x!=i+1){
        v=i+1
        return 1
      }
    })
    return v
  },
  _log:function(){
    let ps=[]
    for(var i=0;i<arguments.length;i++){
      let v=arguments[i]
      if([Object,Array].includes(v.constructor)){
        v=JSON.stringify(v,0,2)
      }
      ps.push(v+"")
    }
    let p=ps.shift()
    if(p.match(/\{[0-9]\}/)){
      p=_Util._formatMessage(p,ps)
    }else{
      ps.unshift(p)
      p=ps.join("\n")
    }
    if(window.extensionContent){
      bzComm.postToIDE({scope:"_Util",fun:"_log",ps:[p]});
      return p
    }
    if(p.startsWith("video-img:")){
      if(!BZ._isPlaying()){
        return
      }
    }else if(p.includes("miss-element-screenshot-md5")){
      _ideTask._setLastScreenshotMd5(p.split(":")[1].trim())
    }
    console.log("BZ-LOG: "+p)
    if(p&&p.length>1000&&BZ._isAutoRunning()){
      console.clear()
    }
    return p
  },
  _getElementSimplePath:function(o){
    let os=document.getElementsByTagName(o.tagName)
    for(var i=0;i<os.length;i++){
      if(os[i]==o){
        return ["BZ.TW.document",o.tagName,i]
      }
    }
  },
  _highlightKeywordsInHTML:function(w,k,_match){
    k=(k||"").trim()
    if(!k){
      return "<div></div>"
    }

    if(_match){
      let g=eval(_match._regex+"g"),
      s=eval(_match._regex)
      w=w.split("\n")
      w=w.map(x=>{
        let xx=x.match(g)
        x=x.replace(g,"\n").split("\n")
        return x.map((z,i)=>{
          let n=0
          if(!i){
            n=1
          }else if(x[i+1]){
            n=2
          }
          z=_Util._getStringBySize(z,30,n);
          if(xx[i]){
            let vs=xx[i].match(s)
            return z+xx[i].replace(vs[_match._idx],`<span class='bz-search-word'>${vs[_match._idx]}</span>`)
          }else{
            return z
          }
        }).join("")
      }).join("\n")
    }else{
      var fw=w.toLowerCase(),
          fd=k.toLowerCase().split(" ")
      let ws=[{w:w,fw:fw}]

      fd.forEach(y=>{
        let x=ws[ws.length-1]
        let ww=x.fw.indexOf(y)
        if(ww>=0){
          let nw=x.w.substring(ww+y.length)
          let nfw=x.fw.substring(ww+y.length)
          x.w=x.w.substring(0,ww)
          x.fw=x.fw.substring(0,ww)
          ws.push({k:y})
          ws.push({w:nw,fw:nfw})
        }
      })

      w=ws.map((x,i)=>{
        if(x.w){
          if(!i){
            i=1
          }else if(ws[i+1]){
            i=2
          }else{
            i=0
          }
          return x.w
          // return _Util._getStringBySize(x.w,30,i)
        }else if(x.k){
          return `<span class="bz-search-word">${x.k}</span>`
        }
      }).join("")
    }
    return `<div>${w}</div>`
  },
  _waitElement:function(e,_fun){
    if($(e)[0]){
      return _fun($(e)[0])
    }
    setTimeout(()=>{
      _Util._waitElement(e,_fun)
    },100)
  },
  _createItem:function({_title,_data,_fun}){
    let d={}
    _Util._confirmMessage({
      _tag:"div",
      _data:d,
      _items:[
        Object.keys(_data).map(k=>{
          return _stdComponent._getInputViewDef({
            _label:_data[k],
            _dataModel:function(){
              return "_data."+k
            }
          })
        })
      ]
    },[{
      _title:"_bzMessage._common._confirm",
      _class:"btn-primary",
      _click:function(c){
        _fun(d,c)
      }
    }],_title)
  },
  _findLabel:function(f,v,_removeSign){
    let o=_cssHandler._findNodeByTxt(f,v,_removeSign);

    if(!o.length){
      let os=$(f).find(":hidden").toArray()
      os.forEach(x=>{
        x=_cssHandler._findNodeByTxt(x,v,_removeSign);
        if(x.length){
          o.push(...x)
        }
      })
    }
    o.forEach(x=>{
      if(x.o.tagName!="LABEL"){
          x.e=x.o=_Util._getParentByTagName(x.o,"LABEL")||x.o
      }
    });

    if(o.length>1){
      o.forEach(x=>{
        x.w=x.w.trim().replace(/ +[*]$/,"").trim()
      })
      o.sort((a,b)=>{
        return a.w.length-b.w.length
      })
      if(o[1].w.length>o[0].w.length){
        return [o[0]]
      }
      let oo=o.filter(x=>{
        if(x.e.tagName=="LABEL"){
          return 1
        }else if(x.e.parentElement&&x.e.parentElement.tagName=="LABEL"){
          let p=x.e.parentElement
          if(p.children.length>1){
            for(let n of p.children){
              if(n!=x.e){
                if(_cssHandler._lookLikeInput(x.e,n)){
                  x.ks.push(n)
                }
              }
            }
          }
          x.e=p
          return 1
        }
      });
      if(oo.length){
        o=oo
      }
    }
    if(o.length>1&&!v.includes("|")){
      o.sort((a,b)=>a.w.length-b.w.length)
      o=o.filter(x=>x.w.length==o[0].w.length)
    }
    
    o.forEach(x=>{
      while(x.e.tagName!="LABEL"&&x.e.parentElement.children.length==1&&!x.ks.length){
        x.e=x.e.parentElement
      }
    })
    
    return o
  },
  _afterAppReady:function(_fun,_chkElement){
    if(!document.body.innerText){
      return setTimeout(()=>{
        _Util._afterAppReady(_fun)
      },100)
    }
    _domActionTask._isLoading(function(){
      _chk(_chkElement,0)
    })
    function _chk(e,i){
      if(e&&!$util.findDom(e)){
        if(i>20){
          _fun()
        }else{
          setTimeout(()=>{
            _chk(e,i+1)
          },100)
        }
      }else{
        _fun()
      }
    }
  },
  _getInputValue:function(o){
    let v=o.value
    if(["INPUT","SELECT","TEXTAREA"].includes(o.tagName)){
      if(o.type=="radio"){
        v=$("input[name="+o.name+"]").val()
      }else if(o.type=="checkbox"){
        v=o.checked
      }
    }else{
      v=$util.getElementText(o)
    }
    return v
  },
  _getTargetElement:function(os){
    os=os.toArray?os.toArray():os;
    let i=1
    while(os.length>i){
      if($(os[i-1]).find(os[i])[0]){
        os.splice(i-1,1)
      }else{
        i++
      }
    }
    return os
  },
  _testPerformance:function(_fun){
    let t=Date.now()
    _fun()
    console.log(Date.now()-t)
  },
  _getDataKeyMap:function(d){
    let m={};
    for(let k in d){
      let kk=_Util._toCamelWords(_Util._toSingularWord(_Util._parseCamelWords(_Util._toCamelWords(k))))
      m[kk]=k
    }
    return m
  },
  _isInMenu:function(o,p){
    while(!$(o).find(p)[0]){
      if(["fixed","absolute"].includes($(o).css("position"))){
        return 1
      }
      o=o.parentElement
    }
  },
  _getDiffWords:function(w1,w2,_splitRegex,_inSensitive,_noIgnoreNumber){
    w1=_initWordds(w1)
    w2=_initWordds(w2)
    let ds=[],ws1=w1.length,ws2=w2.length
    _chkEnd(w1,w2)
    while(w1.length&&w2.length){
      let p1=w1.shift(),
          p2=w2.shift()
      if(p1!=p2){
        let i1=w1.indexOf(p2),
            i2=w2.indexOf(p1)
        if(i1==-1){
          ds.push(p2)
          if(i2==-1){
            ds.push(p1)
          }else{
            w1.unshift(p1)
          }
        }else if(i2==-1){
          ds.push(p1)
          w2.unshift(p2)
        }else if(w1.length-i1>w2.length-i2){
          w2.unshift(p2)
          ds.push(p1)
        }else if(w1.length-i1<w2.length-i2){
          w1.unshift(p1)
          ds.push(p2)
        }else if(w1.length>w2.length){
          ds.push(p1)
          w2.unshift(p2)
        }else if(w1.length<w2.length){
          ds.push(p2)
          w1.unshift(p1)
        }else{
          ds.push(p1,p2)
        }
      }
    }
    ds.push(...w1)
    ds.push(...w2)
    return {ds:ds,p1:ds.length/ws1,p2:ds.length/ws2}
    
    function _chkEnd(_pop){
      while(w1.length&&w2.length){
        let p1=w1.pop(),
            p2=w2.pop()
        if(p1!=p2){
          w1.push(p1)
          w2.push(p2)
          return
        }
      }
    }
    
    function _initWordds(w){
      if(_inSensitive){
        w=w.toLowerCase()
      }
      if(!_noIgnoreNumber){
        w=w.replace(/[0-9]/g,"")
      }
      w=w.replace(_splitRegex||/ +/g," ").split(" ").filter(x=>x)
      return w
    }
  },
  _isSameElement:function(a,b,_simple){
    if(a==b){
      return 1
    }else if(!_Util._isHidden(a)&&!_Util._isHidden(b)){
      return
    }
    if(a.tagName==b.tagName&&a.type==b.type&&a.innerText==b.innerText){
      if(a.parentElement&&b.parentElement&&!a.innerText){
        if(!_Util._isSameElement(a.parentElement,b.parentElement,_simple)){
          return
        }
      }
      if(_simple){
        return 1
      }
      let d=0,s=0;
      for(let k in a.attributes){
        let av=k.value,
            bv=b.attributes[k.name];
        if(av!=bv){
          if(av&&bv){
            av=av.replace(/[0-9 ]/g,"")
            bv=bv.replace(/[0-9 ]/g,"")
            if(av!=bv){
              d++
              continue
            }
          }else if(k.name!="value"){
            d++
            continue
          }
        }
        s++
      }
      return d==0||s>d
    }
  },
  _filterEndElementList:function(_list){
    let n=0
    for(let i=n+1;i<_list.length;i++){
      let io=_list[i],no=_list[n]
      if(io.tagName!=no.tagName){
        if($(io).find(no).length){
          _list.splice(i--,1)
        }else if($(no).find(io).length){
          _list.splice(n,1)
          i--
        }
      }
    }
  },
  _drawArrow:function(c,x1,y1,x2,y2,_headlen,z){
    _headlen=_headlen||10;
    z=z||1
    var _angle = Math.atan2(y2-y1,x2-x1);
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.moveTo(x2-_headlen*Math.cos(_angle-Math.PI/12)*z,y2-_headlen*Math.sin(_angle-Math.PI/12)*z);
    c.lineTo(x2,y2);
    c.lineTo(x2-_headlen*Math.cos(_angle+Math.PI/12)*z,y2-_headlen*Math.sin(_angle+Math.PI/12)*z);
    c.stroke();
  },
  _showLargeImgOnMouseover:function(o){
    o._overTime=setTimeout(()=>{
      let s=o.style;
      if(o.clicked){
        o.clicked=0
        return
      }
      if(s.position!="absolute"){
        s.position="absolute";
        let r=o.getBoundingClientRect();
        if(r.right>window.innerWidth){
          s.right="10px"
        }else if(r.left>50){
          s.marginLeft="-40px";
        }

        let c=document.createElement("div")
        document.body.append(c)
        c.style="background-color: transparent;z-index: 2147483647;position: fixed;top: 0;left: 0;width: 100%;height: 100%;"
        c.onclick=function(){
          s.position=s.marginLeft=s.right="";
          c.remove();
          o.clicked=Date.now()
          setTimeout(()=>{
            o.clicked=0
          },500)
        }
      }
    },300)
  },
  _getListSum:function(_list){
    if(_list.length){
      return _list.reduce((a,b)=>a+b)
    }
    return 0
  },
  _getListAvg:function(_list){
    if(_list.length){
      return _list.reduce((a,b)=>a+b)/_list.length
    }
    return 0
  },
  _toSingularWord:function(w){
    w=w||""
    w=w.trim().plural().replace(/\s+/g," ").split(" ")
    return w.map(x=>x.plural(1)).join(" ")
  },
  _getPageRootNode:function(){
    let o=document.body.parentElement,os=[]
    for(let x of o.children){
      if(!_Util._isHidden(x)){
        os.push(x)
      }
    }
    return os
  },
  _invertObject:function(o){
    return Object.fromEntries(Object.entries(o).map(([k,v])=>[v,k]))
  },
  _changeObjectKeys:function(o,km){
    return Object.fromEntries(Object.entries(o).map(([k,v])=>[km[k]||k,v]))
  },
  _removeProtocol:function(_url){
    return _url.replace(/^(http|https)?:?[\/][\/]/,"")
  },
  _getSysObj:function(k){
    let d=window
    let ks=k.split(".")
    for(let i=0;i<ks.length;i++){
      let x=ks[i]
      d=d[x]
      if(d===undefined||d===null){
        break
      }
    }

    return d
  },
  _setSysObj:function(k,v){
    try{
      let ks=k.split(".")
      let d=window
      k=ks.pop()
      ks.forEach(x=>{
        if(d[x]===undefined){
          d[x]={}
        }
        d=d[x]
      })
      d[k]=v
    }catch(e){
      try{
        eval(k+"=v",{},"set",k,v)
      }catch(ee){}
    }
  },
  _assign:function(f,t,ks){
    for(let k in f){
      if(!ks||ks.includes(k)){
        if(!ks){
          if(t[k]&&f[k]&&t[k].constructor==Object&&f[k].constructor==Object){
            _Util._assign(f[k],t[k])
          }else{
            t[k]=f[k]
          }
        }else{
          t[k]=f[k]
        }
      }
    }
    return t
  },
  _overwriteObj:function(c,n){
    $.extend(true,c,n);
    _cleanData(c,n)
    function _cleanData(c,n){
      for(let k in c){
        if(n[k]===undefined){
          delete c[k]
        }else if(n[k].constructor==Object){
          _cleanData(c[k],n[k])
        }
      }
    }
  },
  _getEllipsisText:function(d,s){
    if(d){
      s=s||100
      if([Array,Object].includes(d.constructor)){
        d=JSON.stringify(d)
      }
      if(d.length>s){
        d=d.substring(0,s)+" ..."
      }
    }
    return d
  },
  _toErgodicList:function(o){
    let _list=[],d={}
    if(_Util._isEmpty(o)){
      return _list[o]
    }
    for(let k in o){
      let vs=o[k],_tmpList=_list
      _list=[]
      if(!vs||vs.constructor!=Array){
        vs=[vs]
      }
      let _init=!_tmpList.length
      vs.forEach(x=>{
        if(_init){
          d={}
          d[k]=x
          _tmpList.push(d)
        }else{
          _tmpList.forEach(y=>{
            y[k]=x
          })
          _list=_list.concat(_tmpList)
          _tmpList=_Util._clone(_tmpList)
        }
      })
      if(_init){
        _list=_tmpList
      }
    }
    return _list
  },
  _getDataByPath:function(d,p){
    p=p.split(".")
    p.find(x=>{
      try{
        d=d[x]
      }catch(e){
        d=undefined
        return 1
      }
    })
    return d
  },
  _setDataByPath:function(d,p,v,_initOnly){
    p=p.split(/[.]|[\[]'?"?|[\]]'?"?/).filter(x=>x)
    while(p.length){
      let k=p.shift()
      if(p.length){
        if(d[k]===undefined){
          if($.isNumeric(p[0])){
            d[k]=[]
          }else{
            d[k]={}
          }
        }
        d=d[k]
      }else{
        if(_initOnly){
          if(d[k]===undefined){
            d[k]=v
          }
        }else if(d){
          d[k]=v
          if(d.list){
            d.list.find((x,i)=>{
              if(x==v){
                d.list.splice(i,1)
                return 1
              }
            })
            d.list.unshift(v)
          }
        }
      }
    }
    p.find((x,i)=>{
      try{
        if(d[x]===undefined){
          
        }
        d=d[x]
      }catch(e){
        d=undefined
        return 1
      }
    })
    return d
  },
  _generateNewName:function(n){
    let nn=n.match(/(.+)\(?([0-9]+)\)?$/)
    if(nn){
      n=nn[1].replace(/\($/,"")
      nn=parseInt(nn[2])+1
    }else{
      nn=1
    }
    return n+"("+nn+")"
  },
  _getSameTextDom:function(os,w){
    if(os.length<2){
      return os
    }
    let vs=[],ws=[]
    w=w.replace(/\s+/g," ").toLowerCase().trim()
    os.forEach(x=>{
      ws.push(x.innerText.replace(/\s+/g," ").toLowerCase().trim())
    })
    ws.forEach((x,i)=>{
      if(x==w){
        vs.push(os[i])
      }
    })
    if(vs.length){
      return vs
    }
    
    ws.forEach((x,i)=>{
      if(x.includes(w)){
        vs.push(os[i])
      }
    })
    if(vs.length){
      return vs
    }
    return vs
  },
  _getCeilDom:function(_list){
    let os=[],_last
    while(_list.length){
      let o=_list.pop()
      if(_last){
        if(!$(o).find(_last)[0]){
          os.unshift(o)
        }
      }else{
        os.unshift(o)
      }
      _last=o
    }
    return os
  },
  _queryToObj:function(_url){
    if(_url){
      _url=_url.split("?")[1]
      if(_url){
        _url=_url.split("#")[0]
        if(_url){
          _url=_url.split("&")
          let v={}
          _url.forEach(x=>{
            x=x.split("=")
            if(x[1]){
              x[1]=decodeURIComponent(x[1])
            }
            v[x[0]]=x[1]
          })
          return v
        }
      }
    }
  },
  _randomList:function(ts){
    ts.forEach((x,i)=>{
      ts.splice(i,1)
      if(Math.random()>0.5){
        ts.unshift(x)
      }else{
        ts.push(x)
      }
    })
  },
  _isBlankIFrame:function(x){
    try{
      return x.contentWindow.location.href=="about:blank"||x.contentWindow.location.href==location.href
    }catch(e){}
  },
  //JSON style but include ref-data, like: $test.name ...
  _isSameMissJSON:function(v1,v2){
    v1=v1.replace(/ *\: */g,":")
    let s1=v1.match(/\:\"[^\"]+\"/g)
    let s2=v2.match(/\:\"[^\"]+\"/g)
    if(s1==s2){
    }else if(!s1||!s2){
      return
    }else{
      s1=s1.sort().join("\t")
      s2=s2.sort().join("\t")
      if(s1!=s2){
        return
      }
    }
    s1=v1.replace(/\:\"[^\"]+\"/g,":")
    s2=v2.replace(/\:\"[^\"]+\"/g,":")
    v1=s1
    v2=s2

    s1=v1.match(/[^\{\,]+\:/g)
    s2=v2.match(/[^\{\,]+\:/g)
    
    if(s1==s2){
    }else if(!s1||!s2){
      return
    }else{
      s1=s1.map(x=>{return x.trim().replace(/\"/g,"")}).sort().join("\t")
      s2=s2.map(x=>{return x.trim().replace(/\"/g,"")}).sort().join("\t")
      if(s1!=s2){
        return
      }
    }
    s1=v1.replace(/[^\{\,]+\:/g,"").replace(/[\{\}]/g,"").replace(/\s/g,"").split(",").sort().join(",")
    s2=v2.replace(/[^\{\,]+\:/g,"").replace(/[\{\}]/g,"").replace(/\s/g,"").split(",").sort().join(",")
    return s1==s2
  },
  //atob
  _b64DecodeUnicode:function(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    try{
      return atob(str)
    }catch(e){
      return decodeURIComponent(atob(str).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    }
  },
  //btoa
  _b64EncodeUnicode:function (str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    try{
      return btoa(str)
    }catch(e){
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
          function toSolidBytes(match, p1) {
              return String.fromCharCode('0x' + p1);
      }));
    }
  },
  _t36String:"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  _to36:function(v){
    let i=_Util._t36String.length
    let x=_Util._t36String[v%i]
    v=Math.round(v/i)||""
    if(v){
      v=_Util._to36(v)
    }
    return v+x
  },
  _t62String:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  _to62:function(v){
    let i=_Util._t62String.length
    let x=_Util._t62String[v%i]
    v=Math.round(v/i)||""
    if(v){
      v=_Util._to62(v)
    }
    return v+x
  },
  _formatJQSelection:function(v){
    if(v&&"#.".includes(v[0])){
      v=v[0]+v.substring(1).replace(/([^0-9a-z-_])/gi,"\\$1")
    }
    return v
  },
  //update css before/after 
  _updateCssContent:function(k,v){
    document.styleSheets[0]&&(document.styleSheets[0].addRule(k,v))
  },
  //For check _bzMessage data
  _getKeyList:function(d,p,w){
    w=w||[],p=p||""
    for(let k in d){
      w.push(k)
      if(d[k].constructor==Object){
        _getKeyList(d[k],p+"  ")
      }
    }
    return w
  },
  _getJSONErrorPosition:function(v,_startLine){
    v=v.split("\n")
    let w=[],_followKey;
    v.forEach((x,i)=>{
      x=x.trim()
      if(x.match(/^[\,\{\}\[\]]$/)){
        _followKey=0
        return
      }
      x=x.replace(/[\[ ]+$/,"")
      
      if(x.length>1&&!_followKey&&!x.endsWith(",")&&!x.endsWith("{")){
        if(!v[i+1]||!v[i+1].trim().match(/[\}\]]/)){
          _addErr(i)
          return
        }
      }

      x=x.replace(/[\, \{\[]+$/,"")

      if(x.endsWith(":")){
        _followKey=1
        x+="0"
      }
      if(x.endsWith("}")){
        if(x.length==1){
          if(_followKey){
            _addErr(i-1)
          }
          return
        }else if(x[0]!="{"){
          x="{"+x
        }
      }else if(x.includes(":")){
        if(x[0]=="{"){
          x+="}"
        }else if(x[0]=="["){
          if(x.length>1){
            x+="}]"
          }
        }else{
          x="{"+x+"}"
        }
      }else if(_followKey){
        if(x.match(/^[\wÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC\_\$]+$/)&&$.isNumeric(x)){
          _addErr(i)
        }else if(_isErr(x)){
          _addErr(i)
        }
        return
      }
      if(_isErr(x)){
        _addErr(i)
      }
    })
    return w
    function _addErr(i){
      let vv=v[i]
      if(_startLine!==undefined){
        vv=_startLine+i+": "+vv
      }
      w.push(vv)
    }
    function _isErr(v){
      try{
        let x;
        x=eval("x="+v)
      }catch(ex){
        return 1
      }
    }
  },
  _flashElement:function(o,i){
    if(o){
      i=i||200
      $(o).fadeOut(i/2).fadeIn(i/2)
    }
  },
  _inSelectOption:function(v){
    return v.tagName=="OPTION"&& (v.parentElement.tagName=="SELECT"||(v.parentElement.parentElement&&v.parentElement.parentElement.tagName=="SELECT"))
  },
  _isIgnoreElement:function(v){
    return ["HTML","SCRIPT","NOSCRIPT","LINK","HEAD","META","BASE","STYLE","BR","HR"].includes(v.tagName)||_Util._inSelectOption(v)
  },
  _isObjOrArray:function(v){
    return v&&[Array,Object].includes(v.constructor)
  },
  _handleRequestData:function(v){
    if(v&&[Object,Array].includes(v.constructor)){
      for(let k in v){
        if(v[k]=="bz-skip"){
          delete v[k]
        }else if(v[k]=="true"){
          v[k]=true
        }else if(v[k]=="false"){
          v[k]=false
        }else{
          _Util._handleRequestData(v[k])
        }
      }
    }
  },
  /*
  like: 
    s="lws ok"
    m=" "
    w="oo"
    result:"lwsoo ok"
  */
  _ajax:function(a,_proxy){
    a.async=!!a.async
    _Util._handleRequestData(a.data)
    let _jsonData
    $util.generateDataByRegex(a.query,0,(v)=>{
      a.query=v
      $util.generateDataByRegex(a.data,0,(v)=>{
        a.data=v
        if(_proxy){
          a={
            url:_proxy,
            method:"POST",
            headers:{
              "content-type":"application/json"
            },
            data:{
              method:a.method,
              url:a.url,
              data:a.data,
              headers:a.headers
            },
            complete:a.complete,
            async:a.async
          }
        }
        _doIt()
      })
    })
    
    function _doIt(){
      _jsonData=a.data
      if(Object.keys(a.headers||{}).find(x=>{
        if(x.toLowerCase()=="origin"){
          return 1
        }
      })){
        if(!_Util._isBZTWOpened()){
          BZ._launchCurEnvUrl(_IDE._data._setting.curEnvironment,function(){
            _Util._originAJax(a.complete,a)
          })
        }else{
          _Util._originAJax(a.complete,a)
        }
        return
      }
      try{
        if(_jsonData){
          if(!a.contentType||a.contentType.toLowerCase().includes("json")){
            a.data=JSON.stringify(a.data)
          }else if(a.contentType.toLowerCase().includes("form")&&_Util._isJsonValueString(_jsonData)){
            _jsonData=_Util._strToJson(_jsonData)
            if(_jsonData.constructor==Object){
              _jsonData=a.data=_Util._objToAPIParameter(_jsonData)
            }
          }
        }
      }catch(ex){
        a.complete({message:ex.stack})
      }

      if(a.headers&&a.headers["Content-Type"]){
        delete a.contentType
      }
      _callExtensionBackgroud()
  
    }
    function _showInfo(_status,_msg){
      _msg=_msg||""
      if(_msg.constructor!=String){
        _msg=JSON.stringify(_msg,0,2)
      }
      _msg=_Util._formatMessage(_bzMessage._system._error._ajaxFailed,[
        _status,
        a.url,
        a.headers?JSON.stringify(a.headers,0,2):"",
        a.query?JSON.stringify(a.query,0,2):"",
        a.body?JSON.stringify(a.body,0,2):"",
        _msg])
      alert(_msg)
    }
    function _callExtensionBackgroud(){
      if(!a.url.match(/^http/)){
        a.url="http:"+a.url
      }

      bzComm.postToBackground({
        fun:"ajax",
        scope:"bgUtil",
        insertCallFun:1,
        ps:[a],
        return:function(r){
          let ad={}
          for(var k in a){
            if(!["async","cache"].includes(k)||(a[k]!==null&&a[k]!==undefined&&!a[k].constructor==Function)){
              ad[k]=a[k]
            }
          }
          r.request={
            data:_jsonData,
            method:a.method,
            url:a.url,
            headers:a.headers
          }

          if(r.status!="error"&&_Util._isAPISucessStatus(r.status)){
            r.responseText=r.data
            let ro=_toData(r.data)
            if(ro){
              if(ro.constructor==Blob){
                r.data=ro
              }else if([Object,Array].includes(ro.constructor)){
                r.responseJSON=ro
              }
            }
            
            if(a.complete){
              a.complete(r)
            }else{
              a.success(r)
            }
          }else{
            if(a.error){
              a.error(r)
            }else if(a.complete){
              a.complete(r)
            }
            if(!BZ._isAutoRunning()){
              _showInfo(r.status,r.message||r.data)
              BZ._data._uiSwitch._apiResultTab="_result"
            }
          }
        }
      })
    }
    
    function _toData(v){
      if(a.responseType){
        v=new Blob([v.constructor==String?_stringToBinaryArray(v):v])
      }else{
        try{
          if(v&&"[{".includes(v.trim()[0])){
            v=eval("v="+v)
          }
        }catch(e){}
      }
      return v
    }

    function _stringToBinaryArray(str) {
      var buf = new ArrayBuffer(str.length*1); // 2 bytes for each char
      var bufView = new Uint8Array(buf);
      for (var i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }
  },
  _originAJax:function(d,_fun){
    if(!window.extensionContent){
      bzComm.postToAppExtension({
        fun:"_originAJax",
        scope:"_Util",
        ps:[d],
        insertCallFun:1
      },_fun);

      return
    }

    if(Object.keys(d.headers||{}).find(x=>{
      if(x.toLowerCase()=="origin"){
        if(d.headers[x].includes(location.host)){
          return 1
        }
      }
    })){
      let _jsonData=d.data
      d.request=_Util._clone(d)
      if(_jsonData){
        d.data=JSON.stringify(d.data)
      }
      d.complete=function(r){
        r.headers=d.headers
        r.request=d.request
        if(_jsonData){
          d.request.data=_jsonData
        }
        _fun(r)
      }
      $.ajax(d)
    }
  },
  _removeValueFromArray:function(a,v){
    while(1){
      let i=a.indexOf(v)
      if(i==-1){
        return
      }
      a.splice(i,1)
    }
  },
  _toggleArray:function(a,v){
    let i=a.indexOf(v)
    if(i>=0){
      a.splice(i,1)
    }else{
      a.push(v)
    }
  },
  _isSysButton:function(o){
    return o.tagName=="BUTTON"||(o.tagName=="INPUT"&&["submit","button","reset","image"].includes(o.type))
  },
  _getRandomSelection:function(p){
    let rv=_descAnalysis._retrieveTextForElementPathItem(p),ps=[],vv;
    if(rv.startsWith("/{random")){
      p.find(v=>{
        if(v.includes(rv)){
          vv=v
          return 1
        }
        ps.push(v)
      })
      if(ps.length){
        ps.push(0)
        ps=_Util._findDoms(ps)[0]
        if(ps){
          let e=rv.split(":")[1],f;
          if(e){
            e=e.split("|")
            f=e[0]
            e=e[1]
            if(e){
              e=e.substring(0,e.length-2).split(",")
            }else if(f){
              f=f.substring(0,f.length-2)
            }
          }
          if(!f){
            vv=vv.replace(rv,"")
            f=vv.replace(/(\:|\[)(near|input|data|text|panel|contains|Contains|textElement|afterEqual|after|before|endContains|endEqual|equal|RowCol|rowcol|name|title|placeholder)(\(|\"|\'|\=|)(\)|\"|\')?/,"")
            if(f==vv){
              f=vv.replace(/\:attr\([^=]+\=\)/,"")
            }
          }

          let pps=[]
          if(f&&f[0]=="!"){
            ps=$(ps).find("*").not(f.substring(1)).toArray()
          }else{
            ps=$(ps).find(f).toArray()
          }
          ps.forEach(x=>{
            let w=$util.getElementText(x)
            if(w&&(!e||!e.includes(w))){
              pps.push(x)
            }
          })

          let o=$util.randomItem(pps)
          if(o){
            p.find((v,i)=>{
              if(v.includes&&v.includes(rv)){
                p[i]=v.replace(rv,$util.getElementText(o.value))
                return
              }
            })
            return o.value
          }
          return
        }
      }
    }
  },
  _isCsvData:function(v){
    if(v.constructor==String){
      let vs=v.split("\n")
      if(vs.length>1){
        if(v.includes("\t")){
          vs=vs.map(x=>x.split("\t").length)
        }else if(v.includes(",")){
          vs=vs.map(x=>x.split(",").length)
        }
        vs=new Set(vs)
        return vs.size==1
      }
    }
  },
  //o: element
  //c: box css selector
  _getBox:function(o,c){
    c=$(c).toArray()
    return c.find(v=>{
      return $(v).find(o).length
    })
  },
  _csvToObj:function(c,_split){
    c=c||""
    _split=_split||"\t";
    var rs=c.trim().split("\n");
    rs[0]=_Util._toSBC(rs[0])
    var cs=rs[0].split(_split);
    var _data=[];
    var _start=0;
    if(cs[0]=="_key"){
      _data={};
      _start=1;
    }
    cs=cs.map(k=>{
      return _toKeyName(k,1)
    })

    if (rs.length>1) {
      for(var i=1;i<rs.length;i++){
        var d={};
        
        if (!rs[i]&&rs.length==i+1&&!_Util._isEmpty(_data)) {
          continue;
        }
        var vs=rs[i].split(_split);
        if (_start) {
          vs[0]=_toKeyName(vs[0],1);
          if (!_data[vs[0]]) {
            _data[vs[0]]=d;
          }else{
            _Util._alertMessage(_Util._formatMessage(_bzMessage._system._error._switchCsvToObjError,[" row: '"+d[cs[ii]]+"'"]));
            return;
          }
        }else{
          _data.push(d);
        }
        for(var ii=_start;ii<cs.length;ii++){
          if (d[cs[ii]]!=undefined) {
            _Util._alertMessage(_Util._formatMessage(_bzMessage._system._error._switchCsvToObjError,[" column: '"+d[cs[ii]]+"'"]));
            return;
          }
          let v=vs[ii]
          if (v) {
            d[cs[ii]]=_parseValue(v);
          }else{
            d[cs[ii]]="";
          }
        }
      }
    }
    return _data;
    
    function _parseValue(v){
      try{
        if(v.match(/^[\{\[].+[\}\]]$/)){
          v=JSON.parse(v)
          return v
        }
      }catch(ex){}
      try{
        if(v.match(_Util._dataRegex)){
          v=eval("v="+v)
        }
      }catch(ex){}
      return v
    }
    function _toKeyName(v){
      v=v.replace(/[ \-\;\@\#\&\^]/g,"_")
      if($.isNumeric(v)){
        v="_"+v
      }
      v=v.replace(/_+/g,"_").replace(/_$/g,"")

      return v
    }
  },
  _stringToData:function(v,_bkData,_bkKey){
    if(!v||[Object,Array].includes(v.constructor)){
      return _return(v)
    }
    let n=parseFloat(v);
    if(n==v){
      return _return(n)
    }
    if(v.constructor==String&&v.includes("\t")){
      n=_Util._csvToObj(v)
    }else{
      try{
        if(v.constructor==Function){
          n=v()
        }else if(v.constructor==String&&v.trim().match(/^[\{\[].+[\}\]]$/s)){
          n=_Util._strToJson(v)
        }else{
          if(_Util._isFunction(v)){
            n=eval("n="+v)
          }else{
            let vv=v.trim().split("\n")
            while(vv.length&&!vv[vv.length-1].trim().replace(/;/g,"")){
              vv.pop()
            }
            if(!_Util._isEmpty(vv)){
              let vvv=vv[vv.length-1].trim()
              if(!vvv.match(/^(var|let|const) /)){
                vv[vv.length-1]="return "+vv[vv.length-1]
              }
              vv=vv.join("\n")
              n=eval(`n=(()=>{\n${vv}\n})()`)
            }
          }
        }
        if(n===undefined||n===null){
          return _return(n)
        }else if($.isNumeric(n)){
          if(v.includes(",")){
            v=v.split(",")
            if($.isNumeric(v[0])){
              //This is a number array
              n=v.map(a=>{return a.trim()})
            }
          }
        }else if(n.constructor==RegExp){
          if(v.includes("/,/")){
            n=v.split(",")
            n=n.map(a=>{return a.trim()})
          }
        }else if(n&&n.constructor==Function){
          n=n()
        }else if(window._bzEval&&_bzEval._isFun(n)){
          n=_bzEval._exeFun(n)
        }
      }catch(e){
        if(e.message.includes("debugger")&&v.includes("debugger")){
          v=v.replace(/debugger;?/,"").trim()
          if(!BZ._isAutoRunning()){
            alert(_bzMessage._task._debuggerError+v)
          }
          return _Util._stringToData(v,_bkData,_bkKey)
        }
        if(v&&v.constructor==String&&_Util._hasCode(v)){
          console.error(e.stack)
        }

        if(v.includes(",")){
          n=v.split(",")
          n=n.map(a=>{return a.trim()})
        }else{
          n=v
        }
      }
    }
    n=$util.generateDataByRegex(n,0,_return)
    if($.isNumeric(n)){
      n=parseFloat(n)
    }
    return n
    
    function _return(v){
      if($.isNumeric(v)){
        n=parseFloat(v)
      }
      if(_bkData){
        if(_bkData.constructor==Function){
          _bkData(v)
        }else if(_bkKey){
          _bkData[_bkKey]=v
        }
      }
      return v
    }
  },
  _listToHtml:function(d,c){
    if(d&&d.constructor==Array&&d.length){
      let _header="<tr><th>"+Object.keys(d[0]).join("</th><th>")+"</tr>"
      _header=_header.replace("</th><th></tr>","</th></tr>")
      c=c||"table{width:100%}table,tr,td,th{border-collapse: collapse;border: 1px solid black;padding: 5px;}"
      return "<!DOCTYPE html><html><head><style>"+c+"</style></head><body><table>"+_header+d.map(o=>{
        let v="<tr>"
        for(var k in o){
          v+="<td>"+(o[k]&&o[k].constructor==String?o[k].replace(/\</g,'&lt;').replace(/\>/g,"$gt;"):o[k])+"</td>"
        }
        return v+"</tr>"
      }).join("")+"</table></body></html>"
    }
    return ""
  },
  _stringToJSONString:function(v){
    v=_Util._stringToData(v)
    if(v&&v.constructor!=String){
      v=JSON.stringify(v,0,2)
    }
    return v
  },
  async _asyncTimeout(v) {
    return new Promise(_fun=> {
      setTimeout(()=>{
        _fun()
      },v)
    });
  },
  async _asyncFun(_fun,_time,_bkFun){
    while(1){
      if(_fun()){
        return _bkFun&&_bkFun()
      }
      await _Util._asyncTimeout(_time)
    }
  },
  _getMixDataLevel:function(v,i){
    i=i||0
    var dp=i,_max=0;
    if(v&&[Object,Array].includes(v.constructor)){
      for(var k in v){
        var pp=_Util._getMixDataLevel(v[k],i+1)
        if(pp>_max){
          _max=pp
        }
      }
      return _max
    }else{
      return i
    }
  },
  _hasDeepArray:function(d){
    if(d&&[Object,Array].includes(d.constructor)){
      for(var k in d){
        var v=d[k]
        if(v&&v.constructor==Array){
          return 1
        }else if(v&&v.constructor==Object){
          var vv=_Util._hasDeepArray(v)
          if(vv){
            return 1
          }
        }
      }
    }
  },
  _toFileCSV:function(s){
    return s.split("\n").map(w=>{
      w=w.trim().split("\t")
      return w.map(v=>{
        if(v.includes(",")){
          return '"'+v.replace(/\"/g,'""')+'"'
        }else{
          return v
        }
      }).join(",")
    }).join("\n")
  },
  _spliceAll:function(vs,_fun){
    let _found=[]
    for(var i=0;vs&&i<vs.length;i++){
      var o=_fun(vs[i],i)
      if(o){
        _found.push(vs[i])
        vs.splice(i--,1)
      }
    }
    return _found
  },
  _findInObj:function(o,_fun){
    if(o&&[Object,Array].includes(o.constructor)){
      for(var k in o){
        if(_fun(o[k],k)){
          return {_value:o[k],_key:k}
        }
      }
    }
  },
  _findDeepObj:function(o,_fun,_stop,pk,ps){
    ps=ps||[]
    for(var k in o){
      ps.push(o[k])
      if(_fun(o[k],k,pk,ps,o)){
        if(_stop){
          if(ps){
            ps.pop()
          }
          return o[k]
        }
      }else if(_Util._isObjOrArray(o[k])){
        let v=_Util._findDeepObj(o[k],_fun,_stop,k,ps)!==undefined
        if(v){
          if(_stop){
            ps.pop()
            return v
          }
        }
      }
      ps.pop()
    }
  },
  _loopObj:function(o,_fun){
    if(o&&[Object,Array].includes(o.constructor)){
      for(var k in o){
        if(_fun(o[k],k)){
          return
        }
      }
    }
  },
  _findAll:function(vs,_fun){
    var os=[]
    vs.forEach((v,i)=>{
      if(_fun(v,i)){
        os.push(v)
      }
    })
    return os
  },
  _handlePrePanel:function(d){
    $(d).on("mousedown",".bz-pre-box",function(e){
      let p=e.target

      _Util._copyText(p.children[0]||p,this.ownerDocument)
    })
  },
  _loadTextFromFile:function(_file,_fun){
    let _reader = new FileReader();

    _reader.readAsText(_file);

    _reader.onload = function() {
      _fun(_reader.result)
    };

    _reader.onerror = function() {
      alert(_bzMessage._system._error._importFileError,_reader.error);
    };
  },
  _loadTextFromFiles:function(_files,_fun){
    let _reader = new FileReader(),
        rs=[];
    

    function _readFile(i) {
      if( i >= _files.length ) {
        return _fun(rs);
      }
      var _file = _files[i];
      _reader.onload = function(e) {  
        rs.push(e.target.result);
        _readFile(i+1)
      }
      _reader.readAsText(_file);
    }
    _readFile(0);

    _reader.onerror = function() {
      alert(_bzMessage._system._error._importFileError,_reader.error);
    };
  },
  _getZipFileContent:function(v,f){
    zip.createReader(new zip.BlobReader(v), function(zipReader) {
      zipReader.getEntries(function(_entries) {
        f(_entries)
			});
    }, function(a){alert(a)});
  },
  _extendViewDef:function(e,ex){
    var o=_Util._clone(e)
    for(var k in ex){
      if(k=="_jqext"){
        for(var kk in ex._jqext){
          o._jqext[kk]=ex._jqext[kk];
        }
      }else{
        o[k]=ex[k];
      }
    }
    return o;
  },
  // _insertTxtToEditor:function(o,w,_idx,_event){
  //   if($(o).hasClass("bz-js-editor")){
  //     return o._replaceSelectedText(o,w)
  //   }
  //   var start = o.selectionStart;
  //   var end = o.selectionEnd;
  //   _idx=_idx||w.length

  //   var $this = $(o);
  //   var value = $this.val();
    
  //   if(_idx<0){
  //     start+=_idx;
  //     _idx=w.length
  //   }

  //   $this.val(value.substring(0, start)+ w+ value.substring(end));

  //   o.selectionStart = o.selectionEnd = start + _idx;
  //   $(o).change();
  //   if(_event){
  //     _event.preventDefault()
  //   }
  //   if($(":focus")[0]!=o){
  //     $(o).focus();
  //   }
  // },
  _repeatLetter:function(w,i){
    let ws=""
    while(i--){
      ws+=w
    }
    return ws
  },
  _stringToObj:function(s){
    if(s&&s.constructor==String){
      try{
        s=eval("s="+s)
      }catch(e){}
    }
    return s
  },
  _getShareParent:function(o1,o2){
    if(o1.constructor==Array){
      return _getIn2(o1[0],o1[o1.length-1])
      let i1=parseInt((o1.length-1)/2)
    }else{
      return _getIn2(o1,o2)
    }
    
    function _getIn2(o1,o2){
      if($(o2).find(o1)[0]){
        return o2
      }
      while(o1.parentElement&&o1.tagName!="HTML"){
        if($(o1).find(o2).length){
          return o1
        }
        o1=o1.parentElement
      }
    }
  },
  _getPathFromUrl:function(v){
    let h=_Util._retrieveHostFromUrl(v)
    if(h){
      v=v.replace(h,"")
    }
    v=v.replace(/^[\/]/,"").split(/[\?\#]/)[0].split("/")
    _Util._spliceAll(v,x=>{return !x})
    return v
  },
  _retrieveHostFromUrl:function(v){
    if(!v){
      return
    }

    v=v.url||v.href||v
    v=v.match(/^(https*|wss):\/\/[^\/]+/)
    return v&&v[0]
  },
  _formatStrAsJson:function(w){
    try{
      v=eval("v="+w)
      if(JSON.stringify(v)==w){
        return JSON.stringify(v,0,2)
      }
    }catch(e){}
    return w
  },
  _jsonToStr:function(s){
    if(s){
      if(_Util._isObjOrArray(s)){
        s=JSON.stringify(s,0,2)
      }else if(s&&$.isNumeric(s)){
        s=s+""
      }else if(s.constructor==Function){
        s=s.toString()
      }
      if(s&&s.constructor==String&&s.includes("\n")){
        s=_Util._cleanPreSpace(s)
      }
    }
    return s
  },
  _cleanPreSpace:function(v){
    if(v&&v.constructor==String&&v.includes("\n")){
      v=v.split("\n")
      let ss=v._last()
      ss=(ss.match(/^( +)/)||[])[1]
      if(ss){
        v=v.map(x=>{
          return x.replace(ss,"")
        })
      }
      v=v.join("\n")
    }
    return v
  },
  _cleanJson:function(d){
    for(let k in d){
      let v=d[k]
      if(v){
        if(v.constructor==String){
          d[k]=_Util._cleanPreSpace(v)
        }else if(_Util._isObjOrArray(v)){
          _Util._cleanJson(v)
        }
      }
    }
  },
  _strToJson:function(s,_parameter){
    let $parameter=_parameter||window.$parameter
    if(s&&s.constructor==String&&(_Util._hasCode(s)||s.trim().match(/^[\{\[].*[\]\}]$/s))){
      s=s.trim()
      try{
        if(s.constructor==String){
          if(s.match(/^\{\{.+\}\}$/)){
            s=_JSHandler._prepareData(s)
          }else{
            s=eval("s="+s)
          }
          if(s&&s.constructor==RegExp){
            s=s.toString()
          }
        }
        if(s&&[Object,Array].includes(s.constructor)){
          _Util._findDeepObj(s,(v,k,ps,pk,o)=>{
            if(v&&v.constructor==String){
              o[k]=_JSHandler._prepareData(v,0,0,_parameter)
            }
          })
        }
      }catch(e){
        bzComm._log(e.message)
        s=_JSHandler._prepareData(s,0,0,_parameter)||s
      }
    }
    return s
  },
  _initDataFromFun:function(d){
    for(let k in d){
      let v=d[k];
      if(v&&v.constructor==Function){
        try{
          d[k]=d[k]()
        }catch(ex){
          alert(ex.message)
        }
      }else if(_Util._isObjOrArray(v)){
        _Util._initDataFromFun(v)
      }
    }
  },
  _hasCode:function(v){
    return v&&v.match&&v.match(/\$(loop|parameter|parentModule|test|module|project|data|util|script|group|action)([^a-zA-Z0-9\u4E00-\u9FCC_\$]|$)/)
  },
  _hasInsertCode:function(v){
    return v&&v.match&&v.match(/\{\{[^\{]*\$(parameter|test|module|project|loop|parentModule|data|loop|util|script|control|group|action).*\}\}/)
  },
  _hasInsertCodeOnly:function(v){
    if(_Util._hasCode(v)){
      return !_Util._hasCode(v.replace(/\{\{[^\{]*\$(parameter|test|module|project|loop|parentModule|data|loop|util|script|control|group|action).*\}\}/g,""))
    }
  },
  _parseCode:function(s){
    let vs=[]
    s=s.match(/\{\{[^}]+\}\}/g)||[]
    s.forEach(c=>{
      c=c.match(/\$(loop|parameter|test|module|project|group|action)[.\[]?[a-zA-Z0-9\u4E00-\u9FCC_\$\.\[\]]*/g)||[]
      vs=vs.concat(c)
    })
    return [...new Set(vs)]
  },
  _formatObjectToFinalData:function(o,_parameter){
    if(o&&[Object,Array].includes(o.constructor)){
      for(var k in o){
        if([Array,Object].includes(o[k].constructor)){
          _Util._formatObjectToFinalData(o[k])
        }else{
          let v= _ideDataManagement._initRandomValue(_JSHandler._prepareData(o[k]))
          let kk=_JSHandler._prepareData(k,0,0,_parameter)
          if(kk!=k&&kk){
            delete o[k]
            k=kk
          }
          o[k]=v
        }
      }
    }else{
      o=_JSHandler._prepareData(o+"",0,0,_parameter)
      o=_Util._strToJson(o,_parameter)
    }
    return o
  },
  _objToAPIParameter:function(v){
    if(v&&(_Util._isObjOrArray(v))){
      var ds=[]

      _getDataList(v,"",ds)
      return ds.join("&")
    }else{
      return v
    }

    function _getDataList(v,ks,ds){
      if(v&&_Util._isObjOrArray(v)){
        for(let k in v){
          _getDataList(v[k],ks?ks+"["+k+"]":k,ds)
        }
      }else{
        ds.push(encodeURIComponent(ks)+"="+encodeURIComponent(v))
      }
    }
  },
  _parameterToObj:function(v){
    if(v&&v.constructor==String){
      v=v.trim()
      try{
        v=eval("v="+v)
      }catch(e){
        if(v.includes("=")){
          v=v.split("&")
          var o={}
          v.forEach((a,i)=>{
            a=a.replace(/\+/g," ")
            a=a.split("=")
            let k=decodeURIComponent(a[0])
            let ks=k.split("[")
            if(ks.length>1){
              ks=ks.map(x=>x.replace("]",""))
              let oo=o
              ks.forEach((x,i)=>{
                oo[x]=oo[x]||{}
                if(i==ks.length-1){
                  oo[x]=decodeURIComponent(a[1])
                }else{
                  oo=oo[x]
                }
              })
            }else{
              o[k]=decodeURIComponent(a[1])
            }
          })
          v=o
        }
      }
    }
    return v
  },
  _speakCurWords:function(w){
    if(_Util.speakingWords){
      window.speechSynthesis.cancel()
    }
    _Util.speakingWords = new SpeechSynthesisUtterance(w);
    if(curUser.language=="cn"){
      _Util.speakingWords.lang="zh-CN"
    }
    _Util.speakingWords.onend=()=>{
      _Util.speakingWords=0
    };
    window.speechSynthesis.speak(_Util.speakingWords);
  },
  _focusNextByTab:function(_curElement){
    var os=$(BZ.TW.document).find("*"),_found=0;
    var _idx=os.index(_curElement)
    var _tIdx=_curElement.tabIndex
    while(!_found){
      for(var i=_idx+1;i<os.length;i++){
        var o=os[i]
        if(o==os[i]){
          if(_tIdx>0){
            _tIdx=0
            _idx=0
          }
        }
        if($(o).css("display")!="none"&&$(o).css("visibility")!="hidden"){
          if(["INPUT","SELECT","A","BUTTON","TEXTAREA"].includes(o.tagName)&&o.type!="hidden"){
            if(_tIdx<0){
              if(o.tabIndex==0){
                return o.focus()
              }
            }else if(_tIdx==0){
              if(o.tabIndex==0||o.tabIndex==1){
                return o.focus()
              }
            }else{
              if(o.tabIndex==_tIdx+1){
                return o.focus()
              }
            }
          }
        }
      }
      if(!_found){
        if(_idx>=0){
          _idx=-1
        }else{
          break
        }
      }
    }
  },
  _formatTimeInMinSecond2:function(t){
    let h=Math.floor(t/60/60)||""
    if(h){
      h+=":"
    }
    t=t%3600
    let m=_Util._formatNumberLength(Math.floor(t/60),2)+":"
    let s=_Util._formatNumberLength(t%60,2)
    return h+m+s
  },
  _toOneLevelJson:function(d){
    let ds=[]
    _findPath(d)
    return ds;
    function _findPath(d,p){
      if(!d||![Object,Array].includes(d.constructor)){
        let o={}
        o[p]=d
        ds.push(o)
      }else{
        if(d.constructor==Object){
          for(let k in d){
            let ks=k.split(",")
            ks.forEach(kk=>{
              let pp=p?p+"."+kk:kk
              _findPath(d[k],pp)
            })
          }
        }else{
          d.forEach(e => {
            _findPath(e,p)
          });
        }
      }
    }
  },
  _formatTimeInMinSecond:function(tt,_ignoreMs){
    tt=parseInt(tt)
    let p=""
    if(tt<0){
      p="- "
      tt=0-tt
    }
    var t=Math.floor(tt/1000)
    var s=Math.floor(t%60)
    var m=Math.floor(t/60)
    var h=Math.floor(m/60)
    m=m%60
    if(h){
      h+=":"
    }else{
      h=""
    }
    if(m){
      m+=":"
    }else{
      m=""
    }
    if(!s){
      s=0
    }
    if(!_ignoreMs){
      tt=tt%1000
    }else{
      tt=0
    }
    return p+h+m+s+(!h&&!m&&s<10&&tt?"."+tt:"")+(!h&&!m?"s":"")
  },
  _formatTimer:function(t){
    let h="",m=""
    if(t>3600000){
      h=parseInt(t/3600000)+"h "
      t=t%3600000
    }
    if(t>60000){
      m=parseInt(t/60000)+"m "
      t=t%60000
    }
    if(t>10000||m){
      t= (Math.floor(t/1000)||0)+"s"
    }else{
      t= (Math.round(t/100)/10||0)+"s"
    }
    return h+m+t
  },
  _changeFavicon:function(src) {
    src=location.protocol+"/"+"/"+location.host+"/"+src;
    document.head = document.head || document.getElementsByTagName('head')[0];
    var link = document.createElement('link'),
        oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = src;
    if (oldLink) {
      document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
  },  
  _copyText:function(w,_doc,ui){
    _doc=_doc||document
    let _isInput=["INPUT","TEXTAREA"].includes(w.tagName)
    let el =_isInput?w:$("<textarea readonly style='position:absolute;left:-9999px'></textarea>").appendTo(_doc.body);
    if(!_isInput){
      if(w.tagName=="SELECT"){
        w=$util.getElementValue(w)
      }
      w=w.innerText||w
      if([Object,Array].includes(w.constructor)){
        w=JSON.stringify(w,0,2)
      }
      el.val(w)
    }
    el.select();
    _doc.execCommand('copy');
    if(!_isInput){
      el.remove();
    }
    w=ui||w
    if(w.constructor!=String){
      _isInput=["INPUT","TEXTAREA"].includes(w.tagName)
      if(_isInput){
        w.select();
        w.focus()
      }else{
        let pu=w.parentElement||w,
            c="bz-enable-select"
        if(!$(pu).hasClass(c)){
          $(pu).addClass(c)
        }else{
          c=0
        }
        let _range = new Range(),
            _sel = w.ownerDocument.defaultView.getSelection();
            _sel.removeAllRanges();
            _range.collapse(true);
        _range.setStart(w, 0);
        _range.setEnd(w, 1);
        _sel.addRange(_range);
        setTimeout(()=>{
          _sel.removeAllRanges();
          if(c){
            $(pu).removeClass(c)
          }
        },100)
      }
    }
    if(!window.extensionContent){
      _infoManagement._addBZInfo(_bzMessage._method._copiedText)
    }
  },
  _selectInRows:function(d,e,_list,ss){
    if(!ss){
      ss=[]
      for(let x of d.parentElement.children){
        ss.push(x._data._item)
      }
      d=d._data._item
    }
    if(e.ctrlKey || e.metaKey){
      var i=_list.indexOf(d);
      if(i>=0){
        _list.splice(i,1);
        return
      }
    }else if(e.shiftKey&&_list[0]){
      let _start,_last=_list._last()
      for(let x of ss){
        if(!_start){
          _start=x==d||x==_last
        }else if(_start&&(x==d||x==_last)){
          break
        }else if(!_list.includes(x)){
          _list.push(x)
        }
      }
    }else{
      _list.length=0
    }
    if(!_list.includes(d)){
      _list.push(d);
    }
  },
  _copyData:function(o,_doc){
    _doc=_doc||document
    let d=$("<textarea readonly style='position:absolute;left:-9999px'></textarea>")
    d.appendTo(_doc.body);
    d.val(JSON.stringify(o))
    _Util._copyText(d[0],_doc)
    d.remove()
  },
  _objToURI:function(d){
    let q;
    for(let k in d){
      let w;
      if(d[k]&&[Object,Array].includes(d[k].constructor)){
        w=JSON.stringify(d[k]).replace(/\"/g,"")
      }else{
        w=(d[k]+"").replace(/^[\'\"]([^\'\"]+)[\'\"]$/,"$1")
      }
      if(w=="bz-skip"){
        continue
      }
      if(q){
        q+="&"
      }else{
        q="?"
      }
      if(!_Util._hasCode(w)){
        w=encodeURIComponent(w)
      }
      q+=k+'='+w;
    }
    return q
  },
  //d: data, t: with tab?
  _formatDataWithVariable:function(d,t){
    if(d){
      let w=d.trim()
      if(w.includes("\n")){
        return w
      }
      if(!("{[".includes(w[0])&&"}]".includes(w[w.length-1]))){
        return d
      }
      try{
        d=_Util._parseJSONWithRefDataToObj(d,1)
        d=_Util._refDataToJSON(d)
      }catch(ex){
      }
      return d
    }else{
      return d
    }
  },
  _isFocusable:function(o){
    return ["A","BUTTON","INPUT","SELECT","TEXTAREA"].includes(o.tagName)||o.contenteditable
  },
  _replaceObjValue:function(o,w,r){
    if(o&&[Object,Array].includes(o.constructor)){
      for(var k in o){
        o[k]=_Util._replaceObjValue(o[k],w,r)
      }
    }else if(o){
      o=o+""
      return (o+"").replace(w,r)
    }
    return o
  },
  _getExistItemInList:function(o,a,_list){
    for(var i=0;i<_list.length;i++){
      var v=_list[i]
      if(v[a]==o[a]){
        return v
      }
    }
  },
  _isEmpty:function(v){
    return !v||([Array,Object,Set].includes(v.constructor)&&$.isEmptyObject(v))
  },
  _findValueInObj:function(o,_fun){
    if(o){
      for(var k in o){
        if(_fun(o[k],k)){
          return o[k]
        }
      }
    }
  },
  _findKeyInObj:function(o,_fun){
    for(var k in o){
      if(_fun(o[k],k)){
        return k
      }
    }
  },
  _findIFrames:function(doc,fs){
    $(doc).find("*").each(function(i,v){
      if(v.tagName=="IFRAME"){
        fs.push(v)
        if(v.contentDocument){
          _Util._findIFrames(v.contentDocument,fs)
        }
      }else if(v.shadowRoot){
        _Util._findIFrames(v.shadowRoot,fs)
      }
    })
  },
  _getAllRadioValues:function( r ) {
    let _radios = document.getElementsByName( r.name ),vs=[];
    
    for( i = 0; i < _radios.length; i++ ) {
      vs.push(_radios[i].value);
    }
    return vs;
  },
  _getQuickPath:function(e){
    if(!e){
      return
    }
    var t=$util.getElementText(e)||""
    t=t.trim()
    if(t){
      t=t.split("\n")[0].substring(0,50)
      t=":Contains("+t+")"
    }

    while(e.parentElement){
      t=">"+_Util._getCurPath(e)+t
      e=e.parentElement
      if(e.tagName=="BODY"){
        return "BODY"+t
      }
    }
    return "BODY"
  },
  _filterOutHidden:function(os,_result){
    os=os||[]
    for(var i=0;i<os.length;i++){
      if(_Util._isHidden(os[i])){
        if(!_result){
          os.splice(i--,1)
        }
      }else if(_result){
        _result.push(os[i])
      }
    }
    
  },
  _elementTxtToPath:function(os){
    if(os.constructor==String){
      os=[os]
    }
    for(var i=0;i<os.length;i++){
      var v=(""+os[i]).trim();
      if(v===""){
        os.splice(i,1);
        i--;
      }else if(os[i].constructor==String && v.includes(" ")){
        var b=[],_map={"(":")","[":"]"};
        var vs="",vv=[];
        for(var n=0;n<v.length;n++){
          var c=v[n];
          if(c==" " && !b.length){
            vv.push(vs);
            vs="";
          }else if("([".includes(c)){
            b.unshift(_map[c]);
          }else if(c==b[0]){
            b.shift();
          }
          vs+=c;
        }
        vs=vs.trim()
        if(vs){
          vv.push(vs);
        }
        if(vv.length>1){
          os.splice(i,1)
          for(var n=0;n<vv.length;n++){
            os.splice(i+n,0,vv[n]);
          }
        }
      }
    }
    return os;
  },
  _getElementByQuickPath:function(p){
    if(p.constructor==Array){
      return $util.findDom(p)
    }else if(p.constructor!=String){
      return p
    }
    p=p.split(">")
    if(p[0]=="BODY"){
      p.shift()
    }
    var o=document.body
    p.find(function(v){
      v=v.split(":")
      var vv=v[1]
      if(vv&&vv.match(/[0-9]+/)){
        vv=parseInt(vv.match(/[0-9]+/)[0])
      }else{
        vv=0
      }
      for(var i=0;i<o.children.length;i++){
        var t=o.children[i]
        if(t.tagName==v[0]){
          if(!vv){
            o=t;
            return
          }else{
            vv--
          }
        }
      }
      o=0
      return 1
    })
    return o
  },
  _getCurPath:function(e){
    var i=0,t=e.tagName;
    while((e = e.previousSibling)!=null){
      if(e.tagName==t){
        i++;
      }
    }
    return i?t+":eq("+i+")":t
  },
  _toCompareableWord:function(w,splitChar){
    if(w){
      w=w.replace(/([^A-Z]+)([A-Z][^A-Z]+)/,"$1_$2").trim().toLowerCase().replace(/\s+/g,' ').replace(/[^0-9a-zA-Z\u4E00-\u9FCC]+/g,'_').replace(/[_]+/g,'_')
      w=w.split("_").map(x=>{return x.plural()}).join(splitChar||"_");
    }
    return w
  },
  _parseCamelWords:function(w){
    if(w){
      w=w.replace(/([^A-Z]*|[A-Z]+)([A-Z][^A-Z]+)/g,"$1 $2").replace(/([^A-Z ]+)([A-Z]+)/g,"$1 $2").replace(/( [A-Z][^A-Z])/g,function(v){return v.toLowerCase()});
      w=w.trim().replace(/\s+/g," ")
    }
    return w
  },
  _toCamelWords:function(w,_chkUpperCase){
    w=(w||"").toString().trim()
    if(w){
      w= w.split(/[^\wÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC]]|_+| +|-+/).map((v,i)=>{
        if(i){
          return _Util._toCapitalWord(v)
        }else{
          return v
        }
      }).join("")
      if(_chkUpperCase&&w[0]==w[0].toUpperCase()&&w[1]&&w[1]==w[1].toUpperCase()){
        return w
      }
      w=w[0].toLowerCase()+w.substring(1)
      return w
    }
    return ""
      
  },
  _idToName:function(w){
    return _Util._toCapitalWord(_Util._parseCamelWords(w).plural(1))
  },
  _getTagNameFromElementPath:function(p){
    for(var i=p.length-1;i>0;i--){
      if(!$.isNumeric(p[i])){
        return p[i]
      }
    }
  },
  _isDotableKey:function(k){
    return !k.match(/^[0-9]|[^_$a-zA-Z0-9\u4E00-\u9FCC]/)
  },
  //m:property map, o: object data, p: path
  _objToProperties:function(m,o,p,_noFunStr){
    if(o&&_Util._isObjOrArray(o)){
      for(var k in o){
        _Util._objToProperties(m,o[k],_Util._mergeDataPath(p,k),_noFunStr)
      }
    }else if(!o||o.constructor!=Function){
      if(o&&o.constructor==String){
        if(o.trim().startsWith("function")&&_noFunStr){
          return m
        }else if(o.length>100){
          o=o.trim().substring(0,100)
        }
      }
      if(p){
        m[p]=o
      }else{
        m=o
      }
    }
    return m
  },
  _mergeDataPath:function(p,k){
    var pk;
    if(!p){
      pk=k
    }else if(_Util._isDotableKey(k)){
      pk=p+"."+k
    }else if($.isNumeric(k)){
      pk=p+"["+k+"]"
    }else{
      pk=p+"['"+k+"']"
    }
    return pk
  },
  _hasChinese:function(w){
    return w.match(/[\u4E00-\u9FCC]/g)
  },
  _isChinese:function(w){
    return w.trim().match(/^[\u4E00-\u9FA5]+$/g)
  },
  _countWords:function(w){
    let ws=w.match(/[\u4E00-\u9FCC]/)
    if(ws){
      return ws.length
    }
    return w.split(/[^A-Za-z]/).length
  },
  _getDiffWord:function (o,n){
    o=o.replace(/\s/g," ")
    n=n.replace(/\s/g," ")
    if(BZ._data._curProject.language=="cn"){
      s=""
    }else{
      s=" "
    }

    o=o.split(s)
    n=n.split(s)

    while(o.length&&n.length&&o[0]==n[0]){
      o.shift()
      n.shift()
    }
    if(o.length&&n.length){
      o=o.join(s)
      n=n.join(s)
      return [
        {
          o:o.plural(),
          n:n.plural()
        },
        {
          o:o.plural(1),
          n:n.plural(1)
        },
        {
          o:_Util._toCapitalWord(o.plural()),
          n:_Util._toCapitalWord(n.plural())
        },
        {
          o:_Util._toCapitalWord(o.plural(1)),
          n:_Util._toCapitalWord(n.plural(1))
        }
      ]
    }
  },
  //s:soure words
  //r:remove word
  //ex. s="abc abcd xabc 中国abc abc中国", x="abc", y=" ", --> "abcd xabc 中国 中国"
  //ex. s="abc abcd xabc 中国abc abc中国", w="中", --> "abc abcd xabc 国abc abc国"
  _removeWord:function(s,r,_handleStar,i){
    var re,rr,ss=s,rs;
    if(!s){
      return s
    }
    if(BZ._data._curProject.language=="cn"){
      if(!r.match(/[a-z0-9] [0-9a-z]/)&&r.match(/\s/)){
        r=r.replace(/ /g,"")
        s=s.replace(/ /g,"")
      }
    }
    if(!i){
      r=r.replace(/([\+\?\$\^\(\)\[\]\{\}\|\\])/g,"\\$1")
      if(_handleStar){
        
      }else{
        r=r.replace(/([\*\.])/g,"\\$1")
      }
    }
    if(_Util._hasChinese(r)){
      re=new RegExp(r,"gi")
      rr=" "
    }else{
      re=new RegExp("(^|[^0-9a-z])"+r+"([^0-9a-z]|$)","gi")
      rr="$1 $2"
    }
    rs=s.replace(re,rr).trim()
    if(rs==s){
      return i?ss:_Util._removeWord(ss,r,_handleStar,1)
    }else{
      return i?rs:_Util._removeWord(rs,r,_handleStar,1)
    }
  },
  _getVisibleElements:function(_area,_css){
    if(_css&&_css.constructor==Array){
      _css=_css.join(",")
    }
    _css=_area.find(_css).toArray()
    _Util._filterOutHidden(_css)
    return _css
  },
  _includesWord:function(s,r,_handleStar){
    return s!=_Util._removeWord(s,r,_handleStar)
  },
  _includesWordWithoutSign:function(s,i){
    s=_Util._removeSign(s," ")
    i=_Util._removeSign(i," ")
    return s!=_Util._removeWord(s,i)
  },
  _generateIndentation:function(v){
    var s="";
    for(var i=0;i<v;i++){
      s+=" ... "
    }
    return s;
  },
  _strToRegex:function(v){
    if(v){
      if(!v.match(/^[\/].+[\/]$/)){
        v="/"+v+"/"
      }
      try{
        v=eval("v="+v)
        return v
      }catch(e){
        alert(e.message)
      }
    }
  },
  _replaceWord:function(w,x,y){
    if(!x || !y || !w){
      return w;
    }
    var x1=x[0],x2=x[x.length-1],r=x.replace(/([\(\)\{\}\[\].\$])/g,"\\$1");
    var c1=_Util._hasChinese(x1),c2=_Util._hasChinese(x2);
    
    if(c1&&c2){
      return w.replace(new RegExp(x,"g"),y).trim()
    }else if(c1){
      r=new RegExp("(.|^)"+r+"([^a-zA-Z0-9]|$)","g");
    }else if(c2){
      r=new RegExp("([^a-zA-Z0-9]|^)"+r+"(.|$)","g")
    }else{
      r=new RegExp("([^a-zA-Z0-9]|^)"+r+"([^a-zA-Z0-9]|$)","g")
    }
    return w.replace(r,"$1"+y+"$2")
  },
  //_nodes:childNodes, i: the first text node idx
  _pickTextFromNode:function(_nodes,i){
    var e=_nodes[i];
    var n,tw=e.textContent.trim();
    while(n=_nodes[i+1]){
      if(n.nodeType==3){
        var t=n.textContent.trim()
        if(t){
          tw+=" "+t
        }
      }else if(n.nodeType==1){
        break
      }
      i++
    }
    tw=_Util._filterTxt(tw)
    return {t:tw,i:i}
  },
  _pickAttrFromObj:function(o,ps){
    var oo={};
    if(ps.constructor==Object){
      ps=Object.keys(ps)
    }
    ps.forEach(function(v){
      try{
        v=v.split(".")
        let ood=oo,od=o;
        v.find((x,i)=>{
          if(i+1==v.length){
            ood[x]=od[x]
          }else{
            if(od[x]){
              ood[x]={}
              ood=ood[x]
              od=od[x]
            }else{
              return 1
            }
          }
        })
      }catch(e){}
    })
    return oo
  },
  _filterTxt:function(tw){
    return tw.replace(/[\(\)\[\]\{\}]/g," ").replace(/\s+/g," ").trim()
  },
  _insertInString:function(s,m,w){
    var i=s.indexOf(m);
    if(i>=0){
      return s.substring(0,i)+w+s.substring(i);
    }
  },
  _findCellElement:function(e,_parent){
    var k=_IDE._data._curVersion.setting.content.clickableElements;
    k=k?k+",":""
    k+="INPUT,TEXTAREA,SELECT,A,BUTTON,[contenteditable=true],[draggable=true]"
    var $e=$(e)
    try{
      if($e.is(k)){
        return e
      }
      if($e.find(k).length){
        return _parent?0:e
      }
      return _Util._findCellElement(e.parentElement,1)||(_parent?0:e)
    }catch(ee){}
  },
  _handleCodePoints:function(array) {
    var CHUNK_SIZE = 0x8000; // arbitrary number here, not too small, not too big
    var index = 0;
    var length = array.length;
    var result = '';
    var slice;
    while (index < length) {
      slice = array.slice(index, Math.min(index + CHUNK_SIZE, length)); // `Math.min` is not really necessary here I think
      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }
    return result;
  },
  _getParentElementByCss:function(p,o){
    p=$(p).toArray()
    return p.find(a=>{
      return $(a).find(o).length
    })
  },
  _findParentElementByCss:function(p,o){
    p=$(o.ownerDocument).find(p).toArray();
    let oo=0
    while(!oo){
      oo= p.find(a=>{
        return $(a).find(o)[0]
      })
      if(oo){
        return oo
      }
      p=p[0].parentElement
      if(!p){
        return
      }
      p=$(p).toArray();
    }
    return oo
  },
  _getParentByTagName:function(o,_name){
    while(o.parentElement && o.tagName!="BODY"){
      o=o.parentElement
      if(o.tagName==_name){
        return o
      }
    }
  },
  _focusNextInput:function(e){
    var _org=e, os=$(e.ownerDocument).find("INPUT,BUTTON,SELECT,TEXTAREA,SELECT,[contenteditable=true]");
    var i=os.index(e)+1,b;
    while(e){
      e=os[i++];
      
      if(e && !$(BZ.TW.document).find(".BZIgnore").find(e).length && !["file","hidden"].includes(e.type)&&!$(e).attr("disabled")&&!$(e).attr("readonly")){
        if(e.type=="radio" &&_org.type=="radio"&&e.name==_org.name){
          continue
        }
        if(e.tagName!="BUTTON"&&!["button","reset","submit"].includes(e.type)){
          break
        }else if(!b){
          b=e;
        }
      }
    }
    e=e||b
    if(e){
      e.focus()
    }
    return e
  },
  _formatTextToHTML:function(w){
    w=(w||"").toString()
    
    return w.replace(/\</g,"&lt;").replace(/\>/g,"&gt")
  },
  _isSameObj:function(a,b,ks){
    let av,bv;
    if(ks){
      return !ks.find(x=>!_Util._isSameObj(a[x],b[x]))
    }
    if(a&&b&&[Object,Array].includes(a.constructor)&&a.constructor==b.constructor){
      for(var k in a){
        av=a[k];
        bv=b[k]
        if(av&&[Object,Array].includes(av.constructor)&&bv&&bv.constructor==av.constructor){
          if(!_Util._isSameObj(av,bv)){
            return
          }
          continue
        }
        if(av!=bv){
          return
        }
      }
      for(var k in b){
        if(a[k]===undefined&&a[k]!=b[k]){
          return
        }
      }
      return 1
    }
    return a==b
  },
  _isSameArray:function(a,b,_key){
    if(a==b||(!a&&!b)){
      return 1
    }else if(!a||!b||a.constructor!=Array||b.constructor!=Array||a.length!=b.length){
      return 
    }
    for(var i=0;i<a.length;i++){
      if(!b.includes(a[i])){
        if(_key){
          var _found=0
          for(var j=0;j<b.length;j++){
            if(b[j][_key]==a[i][_key]){
              _found=1
              continue
            }
          }
          if(_found){
            continue
          }
        }
        return
      }
    }
    return 1
  },
  _isSameHost:function(u1,u2){
    u1=u1.split("/"+"/")
    u2=u2.split("/"+"/")
    
    if(u1[0]&&u2[0]){
      if(u1[0]!=u2[0]){
        return
      }
    }
    if(u1.length>1){
      u1=u1[1]
    }
    if(u2.length>1){
      u2=u2[1]
    }

    u1=u1.split(/[\/#]/)
    u2=u2.split(/[\/#]/)
    if(!u1[0]){
      u1.shift()
    }
    if(!u2[0]){
      u2.shift()
    }
    return u1[0]==u2[0]
  },
  _findBackground:function(d){
    var os=[];
    $(d).find("*").filter(function(i,v){
      if($(v).css("position")=="fixed" && !_Util._isHidden(v)){
        r=v.getBoundingClientRect();
        if(window.innerWidth-r.width<40 && window.innerHeight-r.height<40){
          os.push(v)
        }
      }
    })
    os.sort(function(a,b){
      return $(a).css("z-index")>=$(b).css("z-index")
    });

    return os.length?os[os.length-1]:d
  },
  _getBackgroundColor:function(e){
    var c=$(e).css("background-color");
    if((c.startsWith("rgba") && !c.endsWith(", 0)") && !c.startsWith("rgba(255, 255, 255, 0.")) || c!=="transparent"){
      return c;
    }
    
    if(e.tagName!="BODY"){
      return _Util._getBackgroundColor(e.parentElement)
    }
  },
  _toCapitalWord:function(w,_revert){
    if(w){
      if(_revert&&w.length>1&&w[1].toLowerCase()==w[1]){
        return w[0].toLowerCase()+w.substring(1)
      }else{
        return w[0].toUpperCase()+w.substring(1)
      }
    }else{
      return ""
    }
  },
  _isNoTextElement:function(e){
    return ["TEXTAREA","SELECT","IFRAME","SVG","LINK","TITLE","META","SCRIPT","NOSCRIPT","STYLE","HEAD","HTML"].includes(e.tagName.toUpperCase())||_Util._inSelectOption(e)
  },
  _isNoVisibleElement:function(e){
    return ["OPTION","IFRAME","SVG","LINK","TITLE","META","SCRIPT","NOSCRIPT","STYLE","HTML","HEAD"].includes(e.tagName.toUpperCase())
  },
  _isInContentEditable:function(e){
    if($(e).attr("contenteditable")){
      return 1;
    }
    if(e && e.tagName!="BODY"){
      return this._isInContentEditable(e.parentNode);
    }
  },
  _isInputObj:function(e,_chkReadonly){
    if(e.nodeType!=1){
      return
    }
    if((!_chkReadonly||!$(e).attr("readonly")||e.type=="file")&&this._isStdInputElement(e)||this._isInContentEditable(e)){
      return 1
    }
    
  },
  _isForm:function(c){
    return _Util._findInputs(c).length>1
  },
  _getElementContentText:function(e){
    if(e){
      let t=e.innerText||e.textContent
      if(!_Util._isInputObj(e)){
        e=_Util._findInputs(e)[0]
      }
      if(e){
        t=e.value||t
      }
      return t||""
    }
    return ""
  },
  _getAcceptFileType:function(f){
    return ((f.accept||"").split(",")[0]||"").split("/").pop().toLowerCase()
  },
  _isUrl:function(s){
    return s&&s.match(/^(https?:)?\/\/.+/)&&!s.includes("\n")
  },
  _findInputs:function(e,_inBz){
    let bz=e&&e.dataset&&e.dataset.bz,
        _css=_cssHandler._getInputCss(),
        os=[]
    if(_inBz||bz&&bz.includes("$form")){
      for(let o of e.children){
        if($(o).is(_css)){
          if(!_Util._isHidden(o)){
            os.push(o)
          }
        }else{
          let ob=o.dataset.bz
          if(ob&&ob.includes("$field")){
            os.push(o)
          }else if(ob&&ob.includes("$skip")){
            continue
          }else{
            os.push(..._Util._findInputs(o,1))
          }
        }
      }
      return os
    }else{
      return $(e).find(_css).toArray().filter(x=>{
        return !_Util._isHidden(x)||["radio","checkbox"].includes(x.type)
      });
    }
  },
  _isInputButton:function(e){
    return e.tagName=="INPUT" && ["image","button","submit","reset"].includes(e.type)
  },
  _setTabSize:function(v,ts){
    var vs=v.split(/[\t\n\r]/);
    var m=0;
    for(var i=0;i<vs.length;i++){
      if(m<vs[i].length){
        m=vs[i].length
      }
    }
    if(m<10){
      m=9;
    }
    m++;
    for(var i=0;ts&&i<ts.length;i++){
      var t=ts[i];
      if(t.tagName=="TEXTAREA" && t.value==v){
        t.style.tabSize=m;
      }else if(t.tagName=="PRE" && t.innerText==v){
        t.style.tabSize=m;
      }
    }
    return m
  },
  _getNewClass:function(v1,nv){
    v1=v1||"";
    v1=v1.split(" ");
    if(!nv || nv.constructor!=String){
      nv="";
    }

    nv=nv.split(" ");
    for(var n=0;n<v1.length;n++){
      var i=nv.indexOf(v1[n]);
      if(i>=0){
        nv.splice(i,1);
      }
    }
    return nv;
  },
  _formatAgo:function(t){
    t=Math.round((Date.now()-t)/1000);
    var m=_bzMessage._system._info
    if(t<60){
      m=m._secondAgo
    }else{
      t=Math.round(t/60)
      if(t<60){
        m=m._minuteAgo
      }else{
        t=Math.round(t/60)
        if(t<24){
          m=m._hourAgo
        }else{
          t=Math.round(t/24)
          if(t<7){
            m=m._dayAgo
          }else{
            if(t<30){
              t=Math.round(t/7)
              m=m._weekAgo
            }else if(t<365){
              t=Math.round(t/30)
              m=m._monthAgo
            }else{
              t=Math.round(t/365)
              m=m._yearAgo
            }
          }
        }
      }
    }
    return _Util._formatMessage(m,[t,t>1?"s":""])
  },
  _formatTimestamp:function(t,f){
    t=t||Date.now()
    if(t.constructor==String&&!$.isNumeric(t)){
      f=t
      t=Date.now()
    }else if(t.constructor==Date){
      t=t.getTime()
    }
    t=parseInt(t)
    f=f||"MM-dd hh:mm";
    var d=new Date(t);
    var mp={
      y:d.getFullYear()+"",
      M:_Util._formatNumberLength(d.getMonth()+1),
      d:_Util._formatNumberLength(d.getDate(),(f.match(/d+/)||[""])[0].length),
      h:_Util._formatNumberLength(d.getHours()),
      m:_Util._formatNumberLength(d.getMinutes()),
      s:_Util._formatNumberLength(d.getSeconds()),
      MMMM:_bzMessage._schedule._fullMonthMap[d.getMonth()],
      MMM:_bzMessage._schedule._monthMap[d.getMonth()],
    }
    let m=f.match(/M+/)
    
    _Util._buildDateRegex()
    f=f.replace(/y+/i,mp.y)
      .replace(/d+/i,mp.d)
      .replace(/h+/i,mp.h)
      .replace(/m+/,mp.m)
      .replace(/s+/i,mp.s)
      .replace(/MMMM/,mp.MMMM)
      .replace(/MMM/,mp.MMM)
      .replace(/MM/,mp.M)
      .replace(/M/,d.getMonth()+1)

    return f
  },
  _selectText:function(o) {
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(o);
      range.select();
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(o);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  },
  _getTopZIndex:function(_curDom,_parent){
    _curDom=_curDom||document.body
    var os=$(_parent||_curDom.ownerDocument).find("*"),zz=0;
    for(var i=0;i<os.length;i++){
      var o=os[i];
      try{
        var z=parseInt($(o).css("z-index"))||0;
        if(z>=zz && z<100000 && !$(o).hasClass("bz-modal-bg")){
          zz=z+1;
        }
      }catch(e){}
    }
    if(zz<=100&&!_parent){
      zz=200;
    }
    return zz;
  },
  _setToTop:function(_curDom,_parent){
    let dz=_parent?0:200
    var z=this._getTopZIndex(_curDom,_parent)||dz;
    var zz=parseInt($(_curDom).css("z-index"))||dz;
    if(!zz || z>zz){
      $(_curDom).css({"z-index":z})
    }
  },
  _setToTopInPanel:function(_curDom,_parent){
    let os=[]
    for(let o of _parent.children){
      os.push(o)
    }
    os.sort((a,b)=>{
      a=$(a).css("z-index")||0;
      b=$(b).css("z-index")||0;
      return a-b
    })
    os.forEach((o,j)=>{
      $(o).css({"z-index":j})
    })
    $(_curDom).css({"z-index":os.length+1})
  },
  _findInputByValue:function(v){
    return $("input,select,textarea").toArray().filter(x=>{
      if(x.value==v){
        return 1
      }else if(x.tagName=="SELECT"){
        for(let o of x.selectedOptions){
          if(o.text==v){
            return 1
          }
        }
      }
    })
  },
  _findTextBox:function(v,_fun){
    v=v.trim()
    v=v.split(":")
    let _tag="",_content=v[1]||v[0],vs;
    if(v[1]){
      _tag=v[0]
    }
    
    vs=$(_tag+":Contains("+_content+")").toArray()
    if(!_tag){
      let os=[]
      vs.forEach((x,i)=>{
        if(!x.children.length||!vs[i+1]||!$(x).find(vs[i+1])[0]){
          os.push(x)
        }
      })
      vs=os.map(x=>{
        while(x.parentElement){
          p=x.parentElement
          if(_fun($util.getElementText(p).replace(/\:/g," ").trim(),_content)){
            x=p
          }else{
            break
          }
        }
        return x
      })
    }

    return vs
  },
  _setDrag:function(_handlers,_curDom, _except,_fun){
    _curDom._position=$(_curDom).css("position")
    let _nsSlider=$(_curDom).css("cursor")=="row-resize"
    let _ewSlider=$(_curDom).css("cursor")=="col-resize"
    var _dPos,_mPos,_dSize,_tmpMouseMove,_tmpMouseUp,_tmpSelect,
        _uiSwitch=BZ._data._uiSwitch;
    for(var i=0;i<_handlers.length;i++){
      var h=_handlers[i];
      if(!h){
        continue;
      }
      h.onmousedown=function(e){
        _Util._setToTop(_curDom);
        if($("[draggable]").find(e.target)[0]){
          return
        }
        let c=this.parentElement.getBoundingClientRect(),
            r=this.getBoundingClientRect()
        // $(this).css({position:"fixed"})
        if(_ewSlider){
          $(this).css({top:c.top+"px",height:c.height+"px",left:r.left+"px"})
        }else if(_nsSlider){
          console.log("left:"+c.left+", top:"+r.top)
          $(this).css({left:c.left+"px",width:c.width+"px",top:r.top+"px"})
        }

        if(_curDom._data&&_curDom._data._noMoveable){
          return
        }
        if(_Util._isEventElement(e.target)){
          return;
        }
        if(_except){
          if(_except.constructor==String){
            if($(_except).find(e.target).length||$(_except).is(e.target)){
              return;
            }
          }else{
            for(var i=0;i<_except.length;i++){
              if(_except[i]==e.target || $(_except[i]).find("*").is(e.target)){
                return;
              }
            }
          }
        }
        _uiSwitch._inHandleSize=1
        
        
        _mPos=_Util._getMouseXY(e);
        _dPos=_Util._getDomXYForDrag(_curDom);
        _dSize=_Util._getDomSize(_curDom);
        
        if(this.ownerDocument.onmousemove!=_mousemove){
          _tmpMouseMove=this.ownerDocument.onmousemove;
        }
        
        if(this.ownerDocument.onmouseup!=_mouseup){
          _tmpMouseUp=this.ownerDocument.onmouseup;
        }
        if(this.ownerDocument.body.onselectstart!=_selectText){
          _tmpSelect=this.ownerDocument.body.onselectstart;
        }
        
        this.ownerDocument.onmousemove=_mousemove;
        this.ownerDocument.onmouseup=_mouseup;
        this.ownerDocument.body.onselectstart=_selectText;
      }
    }
    var _mousemove=function(e){
      if(_uiSwitch._inHandleSize && e.buttons){
        var _newMPos=_Util._getMouseXY(e);
        var x=_newMPos.x-_mPos.x+_dPos.x
        var y=_newMPos.y-_mPos.y+_dPos.y
        var _hSize=50;
        var ww=_curDom.ownerDocument.defaultView.innerWidth;
        var wh=_curDom.ownerDocument.defaultView.innerHeight;
        $(_curDom).css({transform:"unset"})
        if(x>0 && x+_hSize<ww&& y>0 && y+_hSize<wh){
          return _setNewPos(_curDom,x,y)
        }
        if(x>0 && x+_hSize>ww){
          x=ww-_hSize;
        }
        if(y>0 && y+_hSize>wh){
          y=wh-_hSize;
        }
        if(x<0){
          x=0;
        }
        if(y<0){
          y=0;
        }
        return _setNewPos(_curDom,x,y)
      }else if(_uiSwitch._inHandleSize){
        this.onmouseup(e)
      }
    };
    var _mouseup=function(e){
      _uiSwitch._inHandleSize=0;
      this.onmousemove=_tmpMouseMove;
      this.onmouseup=_tmpMouseUp;
      this.body.onselectstart=_tmpSelect;
      
      $(_curDom).css({position:_curDom._position})
      if(_nsSlider){
        $(_curDom).css({width:"100%"})
      }
      var _newMPos=_Util._getMouseXY(e);
      _fun&&_fun(_newMPos.x,_newMPos.y,_curDom,1)
    }
    
    function _setNewPos(o,x,y){
      if(!_fun||_fun(x,y,o)){
        if(_nsSlider){
          $(o).css({top:y+"px"});
        }else if(_ewSlider){
          $(o).css({left:x+"px"});
        }else{
          $(o).css({left:x+"px",top:y+"px"});
        }
      }
    }
    
    var _selectText=function(){return false};
    setTimeout(function(){
      _Util._setToTop(_curDom);
    },100)
  },
  _setDragDrop:function(_curDom,_selector,_area,_befFun,_AftFun,_diff){
    if(!_curDom){
      return;
    }
    var _mPos,_dPos,_inDraging,_scrollTop;
    var _tmpDiv;
    _diff=_diff||0;
    _curDom.onmousedown=function(e){
      if(["INPUT","TEXTAREA","BUTTON","PRE"].includes(e.target.tagName)){
        return
      }
      if((!_tmpDiv || !_tmpDiv.length || !_tmpDiv[0].children.length) && this.childNodes[0]){
        _tmpDiv=$(_curDom.childNodes[0].outerHTML);
        _tmpDiv.css({border:"1px dashed blue","background-color":"rgba(0, 50, 255, 0.07) !important;"});
        _tmpDiv.find("*").css({border:"1px dashed blue","background-color":"rgba(0, 50, 255, 0.07) !important;"});
        _tmpDiv.find("*").text("")
      }
      _mPos=_Util._getMouseXY(e);
      _scrollTop=_area.scrollTop-_diff;
      _dPos=_Util._getDomXYForDrag(_curDom);
      _curDom.onmousemove=function(e){
        if(!e.buttons){
          _inDraging=0
          return;
        }
        if(!_inDraging){
          if(_befFun){
            _befFun(this)
          }
//            $(this).on("selectstart","*",function(){return false});
        }
        var _curPos=_Util._getMouseXY(e);
        var dx=_mPos.x-_curPos.x;
        var dy=_mPos.y-_curPos.y;
        var os=$(_curDom).find(_selector);
        if(os.length && (dx>5 || dx<-5 || dy>5 || dy<-5 || _inDraging)){
          _inDraging=true;
          
          os.css({position:"fixed",width:os.parent().css("width")});
          _tmpDiv.css({position:""});
          var _last=null;
          var _moveItems=[];
          for(var i=0;i<os.length;i++){
            var o=os[i];
            _moveItems.push(o)
            if(i==0){
              _last=o;
              $(o).css({top:_curPos.y-10,left:_curPos.x-_mPos.x});
            }else{
              _size=_Util._getDomSize(_last);
              $(o).css({
                top:parseInt(_last.style.top)+_size._height,
                left:parseInt(_last.style.left)
              });
              _last=o;
            }
          }
          
          for(var i=0;i<_curDom.childNodes.length;i++){
            var o=_curDom.childNodes[i];
            if(!_moveItems.includes(o)){
              var _oPos=_Util._getDomXYForDrag(o);
              var _oSize=_Util._getDomSize(o);
              if((_oPos.y<_curPos.y && _oPos.y+_oSize._height>_curPos.y) || (i==_curDom.childNodes.length-1 && _oPos.y+_oSize._height<_curPos.y)){
                if(_oPos.y+_oSize._height/2>_curPos.y){
                  _tmpDiv.insertBefore(o);
                }else{
                  _tmpDiv.insertAfter(o);
                }
//                console.log("------------------------")
//                console.log(_moveItems[0]);
//                console.log(_tmpDiv[0]);
//                console.log(o)
//                console.log("========================")
                return;
              }
            }
          }
        }
      }
      var _tmpDocMouseUp=_curDom.ownerDocument.onmouseup;
      _curDom.ownerDocument.onmouseup=function(e){
        if(_inDraging){
          _inDraging=0;
          if($(_curDom).find(_tmpDiv).length){
            $(_curDom).find(_selector).insertAfter(_tmpDiv);
            $(_curDom).find(_selector).css({position:""});
            _tmpDiv.remove();
          }
          if(_AftFun){
            _AftFun(this)
          }
        }
        _curDom.ownerDocument.onmouseup=_tmpDocMouseUp;
        _curDom.onmousemove=null;
      }
    };
  },
  _checkJQueryEvent:function(e){
    try{
      return $["_"+"data"](e,"events") || {};
    }catch(e){}
    return {};
  },
  _loadInHash:function(_url,_location){
    return _url.startsWith(_location.origin+_location.pathname+"#");
  },
  _getStackTrace:function() {
    var obj = {};
    Error.captureStackTrace(obj, _Util._getStackTrace);
    return obj.stack;
  },
  _clone:function(o){
    if($.type(o)=="array"){
      return $.extend(true,[],o);
    }else if($.type(o)=="object"){
      return $.extend(true,{},o);
    }
    return o;
  },
  _simpleClone:function(o){
    if(o){
      let n={}
      if(o.constructor==Array){
        n=[]
      }else if(o.cloneNode){
        return o.cloneNode()
      }else if(o.constructor!=Object){
        return o
      }

      for(var k in o){
        n[k]=o[k]
      }
      return n
    }
    return o
  },
  _getSimpleJson:function(o){
    var d;
    if(o!==null&&o!==undefined){
      if(o.constructor==Object){
        d=Object.keys(o).length&&{}||undefined
      }else if(o.constructor==Array){
        d=o.length&&[]||undefined
      }else{
        return o===""?undefined:o
      }
      
      for(var i in o){
        var v=_Util._getSimpleJson(o[i])
        if(v!==undefined&&v!==null){
          d[i]=v
        }
      }
    }
    return d
  },
  _cloneSelectData:function(d,_ignore,_only){
    var dd={}
    if(_only&&_only.constructor==Array){
      _only=_only.join("|")
    }
    if(_ignore&&_ignore.constructor==Array){
      _ignore=_ignore.join("|")
    }
    for(var k in d){
      if(_only && k.match("^("+_only+")$")){
        dd[k]=d[k]
      }else if(_ignore && k.match("^("+_ignore+"$)")){
        
      }else if(!_only){
        dd[k]=d[k]
      }
    }
    return dd;
  },
  _setEscWindow:function(w){
    if(_Util._checkBrowserType().name=="ie"){
      if(w.document){
        w.document.onkeydown=_Util._escCloseWindow;
        w.document.tagWin=w;
      }else{
        this.tmpPopWin=w;
        setTimeout("_Util._setEscWindow(_Util.tmpPopWin)",100);
      }
    }else{
      w.onkeydown=_Util._escCloseWindow;
      w.tagWin=w;
    }
  },
  //To find the target input element scope.
  //1. in the scope, no other std input element and the same customize input element
  //2. only one label
  _findValueFromElementScope:function(e,v){
    let rv,vs=[],_break
    rv=_findValues(e)
    if(rv){
      return rv
    }
    while(!_hasValue(e)&&e.parentElement){
      for(let o of e.parentElement.children){
        if(o==e){
          continue
        }
        rv=_findValues(o)
        if(rv){
          return rv
        }
        if(_hasValue(o)){
          _break=1
        }
      }
      rv=_findValues(e.parentElement)
      if(rv){
        return rv
      }
      e=e.parentElement
      if(_break||_hasValue(e)){
        break
      }
    }
    return {e:e,vs:vs}

    function _findValues(e){
      let tx=(e.innerText||e.value||e.textContent||"").trim()
      if(tx){
        vs.push(tx)
        if(_isEqualValue(v,tx)){
          bzComm._log("Match: "+v+" vs "+tx)
          return {e:e,vs:vs,v:tx}
        }
      }
      if(e.attributes){
        for(let a of e.attributes){
          let av=(a.value||"").trim()
          if(av&&_Util._isTitleAttr(a.name)){
            vs.push(av)
            if(_isEqualValue(v,av)){
              bzComm._log("Match: "+v+" vs "+tx)
              return {e:e,vs:vs,v:av}
            }
          }
        }
      }
    }

    function _isEqualValue(tv,fv){
      if(tv.constructor==Date){
        fv=_Util._findDateFromString(fv)
        if(fv.length){
          return fv.find(x=>x.d.getTime()==tv.getTime())
        }
      }else{
        return v1==v2
      }
    }

    function _hasValue(e){
      return (e.innerText||e.textContent||e.value||"").trim()
    }
  },
  _isTitleAttr:function(e){
    return !["class","style","width","height","disabled","src","href","checked","name","type","readOnly","tabIndex","contentEditable","hidden",""].includes(e)
  },
  _formatMessage:function(_msg,_value){
    if(_value&&_value.constructor!=Array){
      _value=[_value]
    }
    _msg=(_msg||"")+""
    for(var i=0;_value && i<_value.length;i++){
      var s=new RegExp("\\{"+i+"\\}","g");
      _msg=_msg.replace(s,_value[i])
    }
    return _msg;
  },
  _escCloseWindow:function(e){
    if(e==undefined){
      e=null;
    }
    var k = _Util._checkKeycode(e);
    if(k==27){
      let os=$(e.srcElement.ownerDocument).find(".bz-modal-window .btn-cancel:last")
      if(os.length){
        os.click()
        return
      }
      try{
        this.tagWin.close();
        this.open("","bz-master");
      }catch(e){
      }
    }else if(k==116){
      this.open("","bz-master");
      parent.location.reload();
    }
  },
  _setFindDomJS:function(o){
    let s="document"
    let _bzPath=_Util._clone(o.bzTmp)
    
    if(_bzPath.find(x=>x=="shadowRoot")){
      while(_bzPath.length){
        let v=_bzPath.shift()
        if(!v||$.isNumeric(v)||v.includes("BZ.TW.document")){
          continue
        }
        if(v=="shadowRoot"){
          s+=_findShadowPath(_bzPath,document,o)
        }else{
          let t=v.split(/[:\[\.\#]/)[0]
          s+=_findElementPath(t,_bzPath,document,o)
        }
        break
      }
    }else{
      let os=document.getElementsByTagName(o.tagName)
      for(let i=0;i<os.length;i++){
        if(os[i]==o){
          s=`document.getElementsByTagName('${o.tagName}')[${i}]`
          break
        }
      }
    }

    o._jsPath=s

    function _findShadowPath(p,_root,o){
      let t=p.shift()
      t=t.split(/[:\[\.\#]/)[0]
      for(let i=0;i<_root.children.length;i++){
        let oo=_root.children[i]
        if(oo.getElementsByTagName(t).length){
          let s=_findElementPath(t,_Util._clone(p),oo,o)
          if(s){
            return ".children["+i+"]"+s
          }
        }
      }
    }
    
    function _findElementPath(_tagName,p,_root,o){
      let os=_root.getElementsByTagName(_tagName)
      let tt=p.shift(),s=`.getElementsByTagName("${_tagName}")`
      
      for(let i=0;i<os.length;i++){
        let oo=os[i]
        if(tt){
          if(tt=="shadowRoot"){
            if(oo.shadowRoot){
              let ss=_findShadowPath(_Util._clone(p),oo.shadowRoot,o)
              if(ss){
                return `${s}[${i}].shadowRoot${ss}`
              }
            }
          }else{
            tt=tt.split(/[:\[\.\#]/)[0]
            let ss=_findElementPath(tt,_Util._clone(p),oo,o)
            if(ss){
              return `${s}[${i}].getElementsByTagName("${_tagName}")[${i}]${ss}`
            }
          }
        }else if(o==oo){
          return `${s}[${i}]`
        }
      }
    }
  },
  _swapKeyValue:function(_json){
    var _result = {};
    for(var _key in _json){
      _result[_json[_key]] = _key;
    }
    return _result;
  },
  _findAllHiddenElements:function(o,os){
    o=o||document.body
    os=os||[]
    let r=o.getBoundingClientRect()
    if(!r.width&&!r.height&&!r.top&&!r.left){
      if(o.tagName!="INPUT"||["file","checkbox","radio"].includes(o.type)){
      // if($(o).is(":hidden")){
        os.push(o)
      }
    }else if($(o).css("visibility")=="hidden"){
      os.push(o)
    }else if(o.tagName!="SELECT"){
      for(let oo of o.children){
        _Util._findAllHiddenElements(oo,os)
      }
    }
    return os
  },
  _isHidden:function(o,_bParent,_chkBZElement){
    if(!o||_Util._isIgnoreElement(o)){
      return 1;
    }
    if($(o).is(".BZIgnore")||$(".BZIgnore").find(o)[0]){
      if(!_chkBZElement){
        return 1
      }
    }
    var n=o.tagName;
    if(n){
      if(n=="INPUT" && o.type=="hidden"){
        return 1;
      }else if(n=="INPUT" && o.type=="file"){
        return _Util._isHidden(o.parentElement,1);
      }else if($(o).css("display")=="none" || (($(o).css("visibility")=="hidden"||$(o).css("opacity")==0) && !_bParent)){
        if(o.tagName=="INPUT"&&["checkbox","radio"].includes(o.type)){
          
        }else{
          return 1;
        }
      }
      if(!_bParent){
        var a=o.getBoundingClientRect();
        if(o.offsetLeft+o.offsetWidth<0 || o.offsetTop+o.offsetHeight<0){
          return 1
        }
        if(a.width<2 && a.height<2){
          if(o.innerText!=undefined && !o.innerText.trim()){
            for(var i=0;i<o.children.length;i++){
              if(!_Util._isHidden(o.children[i])){
                return 0
              }
            }
            return 1
          }
        }
      }
      /*
      var _rect=o.getBoundingClientRect();
      var _minOffsetLeft=_minOffsetTop=0;
      while(o!=o.ownerDocument.body){
        if(_minOffsetLeft>o.offsetLeft){
          _minOffsetLeft=o.offsetLeft;
        }
        if(_minOffsetTop>o.offsetTop){
          _minOffsetTop=o.offsetTop;
        }
        o=o.parentElement;
        if(!o){
          return 1;
        }
      }
      
      if(_minOffsetTop+_rect.height<=0 || _minOffsetLeft+_rect.width<=0){
        return true;
      }
      */
      if(o.tagName!="BODY"){
        return _Util._isHidden(o.parentElement,1)
      }
      return !o.ownerDocument || !o.ownerDocument.defaultView;
    }
    return 1;
  },
  _isTooSmall:function(o){
    o=o.getBoundingClientRect()
    return o.width<10||o.height<10
  },
  _moveMenu:function(v,_from){
    let r=v.getBoundingClientRect();
    if(r.bottom>window.innerHeight){
      if(r.top>r.height){
        $(v).css({top:r.top-r.height+"px"})
      }else{
        $(v).css({top:0})
      }
    }
  },
  _setTabStyle:function(o){
    if(o&&o.parentElement){
      $(o.parentElement).css({display:"unset"})
      $(o).css({width:"unset"})
      let w=o.getBoundingClientRect().width+30
      $(o).css({width:w})
      o._width=w
      $(o.parentElement).css({display:"flex"})
    }
  },
  _isOpacity:function(o){
    while(o&&o.tagName!="BODY"&&$(o).css("opacity")!=0){
      o=o.parentElement
    }
    return o.tagName!="BODY"
  },
  _scrollToTop:function(o){
    while(o&&o.parentElement){
      o=o.parentElement
      o.scrollTop=0
      o.scrollLeft=0
    }
  },
  _focusElement:function(o){
    o&&o.scrollIntoView({block:"nearest"})
  },
  _getBackgroundColor:function(e){
    var c=$(e).css("background-color");
    if(c=="rgba(0, 0, 0, 0)"){
      return _Util._getBackgroundColor(e.parentElement)
    }
    return c
  },
  _isEqualValue:function(v1,v2){
    v1=v1===0?"0":v1||""
    v2=v2===0?"0":v2||""
    if(v1==v2){
      return 1
    }
    if(v1.constructor==v2.constructor){
      return _Util._isEqualData(v1,v2)
    }
  },
  _isEqualData:function(d1,d2,_ignoreKeys,_sameKey){
    d1=d1||"";
    d2=d2||""
    if(d1.constructor==Object&&!Object.keys(d1).length){
      d1=""
    }
    if(d2.constructor==Object&&!Object.keys(d2).length){
      d2=""
    }
    if(d1.constructor==Array&&!d1.length){
      d1=""
    }
    if(d2.constructor==Array&&!d2.length){
      d2=""
    }
    if(d1&&d2&&d1.constructor==d2.constructor&&[Object,Array].includes(d1.constructor)){
      var ks=[],kk=new Set()
      if(_sameKey&&d1[_sameKey]==d2[_sameKey]){
        return 1
      }
      for(var k in d1){
        if(_ignoreKeys&&_ignoreKeys.includes(k)){
          continue
        }else if(k=="key"&&!_sameKey&&!d2.key){
          continue
        }
        kk.add(k)
        if(!_Util._isEqualData(d1[k],d2[k],_ignoreKeys)){
          return
        }
        ks.push(k)
      }
      for(var k in d2){
        if(_ignoreKeys&&_ignoreKeys.includes(k)){
          continue
        }else if(k=="key"&&!_sameKey&&!d1.key){
          continue
        }
        if(!kk.has(k)){
          if(!_Util._isEqualData(d1[k],d2[k],_ignoreKeys)){
            return
          }
        }
      }
      return 1
    }else{
      return d1==d2
    }
  },
  //check whether o1 after o2;
  _positionAfterElement:function(o1,o2){
    o1=o1.getBoundingClientRect();
    o2=o2.getBoundingClientRect();
    return o1.top>=o2.bottom || (o1.bottom>o2.top && o1.left+o1.width>=o2.right);
  },
  _getWindowFromDom:function(o){
    return o.ownerDocument.defaultView;
  },
  _scrollUpSelectedItem:function(_uiBox,_selectedUI,_diffHeight,_maxMove){
    _diffHeight=_diffHeight||30;
    if(!_uiBox || !_selectedUI){return;}
    _uiBox=$(_uiBox)[0]
    var uiBoxHeight = _uiBox.offsetHeight;
    let d1 = _selectedUI.offsetTop,
        d2=d1+_selectedUI.offsetHeight,
        d3=_uiBox.scrollTop,
        d4=d3+uiBoxHeight;
    if(d1-_diffHeight<d3||d2>d4){
      d1-=_diffHeight
      if(d1>_maxMove){
        d1=_maxMove;
      }
      _uiBox.scrollTop=d1;
      return;
    }
  },
  _selectKeyWordsInInput:function(o){
    var i1=o.value.indexOf("{")
    if(i1>=0){
      o.selectionStart=i1
      var i2=o.value.indexOf("}")+1
      if(i2){
        o.selectionEnd=i2
      }
    }
  },
  _searchValueInJSON:function(j,v,_inSensitive,_include,_find,p,ks){
    p=p||""
    ks=ks||[]
    if(_inSensitive&&!ks){
      if(v.constructor==Array){
        v=v.map(x=>x.toString().trim().toLowerCase())
      }else{
        v=v.toString().trim().toLowerCase()
      }
    }
    if(j&&[Object,Array].includes(j.constructor)){
      for(var k in j){
        let pk=p?p+"."+k:k,d=j[k]
        if(_Util._isObjOrArray(d)){
          if(_Util._searchValueInJSON(d,v,_inSensitive,_include,_find,pk,ks).length&&_find){
            return ks
          }
        }else if(d){
          d=d.toString().trim()
          if(_inSensitive){
            d=d.toLowerCase()
          }

          if(d==v||(_include&&d.includes(v))){
            ks.push(pk)
          }
        }

        if(ks.length&&_find){
          return ks
        }
      }
    }
    return ks
  },
  _alertMessage:function(_msg){
    _Util._debugLocal()

    // try{
      // let _stack=new Error().stack
      // console.log("BZ-LOG:"+_stack.replace("Error","End"));
    // }catch(e){}
    if(BZ._isAutoRunning()){
      console.log("BZ-LOG:"+_msg)
      return
    }
    
    if(_bzMessage._system._error[_msg]){
      _msg=_bzMessage._system._error[_msg];
    }

    if($(".alert-msg").toArray().find(a=>{
      if(a.innerText==_msg){
        let v=$(a).attr("repeat")
        if(v){
          v=parseInt(v.split(":")[1])+1
        }else{
          v=1
        }
        $(a).attr("repeat","("+_bzMessage._api._repeat+": "+v+")")
        return 1
      }
    })){
      return
    }
    _msg="<div class='alert-msg'>"+_msg+"</div>"


    var _extraPara={};
    for(var i=1;i<arguments.length;i++) {
      var o=arguments[i];
      if ($.isFunction(o)) {
        _extraPara._fun=o;
      }else{
        _extraPara._exception=o;
      }
    }
    var d=_Util._clone(_Dialog),
        _winTagClass="bz-alert-window";
    d._viewDef._items[0]._attr.class+=" "+_winTagClass

    var _dialog={
      _title:_bzMessage._common._message,
      _modal:true,
      _moveable:true,
      _destroyOnClose:true,
      _buttons:[
        {
          _title:_bzMessage._common._ok,
          _class:"btn btn-primary bz-alert-btn",
          _click:function(){
            d._close()
          }
        }
      ],
      _afterClose:function(){
        if (_extraPara._fun) {
          _extraPara._fun();
        }
      }
    };
    _msg+=_extraPara._exception?"\n\nStack:"+_extraPara._exception.stack:"";
    
    if(!_Util._isBZTWOpened() || BZ.TW.focus || !BZ.TW.document.hasFocus() || _msg.indexOf("</")>0){
      if(_msg.indexOf("</")<0 && _msg.length<=50){
        _msg="<nobr>"+_msg+"</nobr>";
      }

      $(".alert-content").toArray().forEach(x=>{
        if(x._bzContent){
          _msg=x._bzContent+"\n<hr/>\n"+_msg  
        }
      });
      
      var o=$("<div class='alert-content' style='min-width:150px;max-width:100%;word-break:break-all;margin:0;float:left;white-space: pre-wrap;'></div>")
      o[0]._bzContent=_msg
      if(_msg.includes("</html>")){
        o=o.text(_msg);
      }else{
        o=o.html(_msg);
      }

      let _win=window;
      try{
        if(event){
          _win=event.srcElement.ownerDocument.defaultView
        }
      }catch(e){}
      $(".bz-modal-bg:has(.alert-msg) button").click()

      d._showMe(o[0],_dialog,_win.document.body,_winTagClass);
    }else{
      BZ.TW.alert(_msg);
    }
  },
  _attachResize:function(o,h){
    let _doc=_Util._getCurDocument()
    setTimeout(()=>{
      if(o.constructor==String){
        o=$(_doc).find(o)
      }
      o=$(o)[0];
      $(o).css({"min-height":"unset"});
      o=_Util._findParentElementByCss(".bz-modal-window",o);
      $(o).css({"max-height":"unset"});
      if(h){
        $(o).css({height:h+"px"})
      }
      _Util._attachResizeWindow(o)
    },100)
  },
  _attachResizeWindow:function(w){
    let _doc=w.ownerDocument
    let o=$("<div class='bz-corner-resize'></div>").appendTo(w)
    let p,wr=w.getBoundingClientRect();
    $(w).css({"max-width":"unset",left:wr.left+"px",top:wr.top+"px",transform:"unset"})
    o.mousedown(function(e){
      let x=this
      o.p=_Util._getMouseXY(e)
      wr=w.getBoundingClientRect()
      e.preventDefault()
      e.stopPropagation()


      let _onmousemove=_doc.body.onmousemove
      _doc.body.onmousemove=function(e){
        if(o.p&&e.buttons){
          if(!$(_doc.body).hasClass("prevent-select")){
            $(_doc.body).addClass("prevent-select")
          }
          let q=_Util._getMouseXY(e)
          let wl=(q.x-o.p.x),
              wh=(q.y-o.p.y)

          wl+=wr.width
          wh+=wr.height
          $(w).css({width:wl+"px",height:wh+"px"})
        }else{
          o.p=0
          _doc.body.onmousemove=_onmousemove
          $(_doc.body).removeClass("prevent-select")
        }
      }
    })
  },
  _getCurDocument:function(){
    if(window.document.hasFocus()){
      return document
    }
    if(BZ._curPopWin&&!BZ._curPopWin.closed){
      if(!BZ._curPopWin.document.hasFocus()){
        BZ._curPopWin.focus()
      }
      return BZ._curPopWin.document
    }
    return document

    function winEvent(w){
      if(w.event&&w.event.target){
        return w.event.target.ownerDocument||document
      }

    }
  },
  _replaceObjByMap:function(o,_map){
    if(_Util._isObjOrArray(o)){
      for(var k in o){
        o[k]=_Util._replaceObjByMap(o[k],_map)
      }
    }else if(o.constructor==String){
      let i=0;
      for(var k in _map){
        let v=_map[k]
        if(v){
          o=o.split(v).join(String.fromCharCode(--i))
        }
      }
      i=0
      for(var k in _map){
        let v=_map[k]
        if(v){
          o=o.split(String.fromCharCode(--i)).join(k)
        }
      }
    }
    return o
  },
  _confirmCancelUpdate:function(_fun,_msg,_cancelFun){
    _Util._confirmMessage(_msg||_bzMessage._system._info._cancelUpdate,[{
      _title:_bzMessage._method._yes,
      _click:function(c){
        _fun()
        c._ctrl._close()
      }
    }],0,0,0,_cancelFun)
  },
  //option:{list[],_msg:"",_title:"",_btns(?):[{_title:"",_class:"",_click:function(){}}]}
  _confirmList:function(_option){
    _Util._confirmMessage({
      _tag:"div",
      _attr:{
        style:"margin:10px;display: flex;flex-direction: column;"
      },
      _items:[
        {
          _tag:"div",
          _attr:{
            style:"display: flex;flex-direction: column;margin-top: 0;padding-top: 0;"
          },
          _items:[
            {
              _if:_option._msg&&_option._msg.constructor==String,
              _tag:"div",
              _attr:{
                style:"font-size: 15px;margin-bottom:10px;"
              },
              _html:function(){
                return _option._msg
              }
            },
            {
              _if:_option._msg&&_option._msg.constructor!=String,
              _tag:"div",
              _attr:{
                style:"font-size: 15px;margin-bottom:10px;"
              },
              _items:_option._msg&&_option._msg.constructor==Array?_option._msg:[_option._msg]
            },
            {
              _if:function(){
                return _option._note
              },
              _tag:"i",
              _attr:{
                class:"bz-note-text2"
              },
              _text:function(){
                return _option._note
              }
            }
          ]
        },
        {
          _if:!_Util._isEmpty(_option._list),
          _tag:"div",
          _attr:{
            class:"bz-list-box"
          },
          _items:[
            {
              _tag:"div",
              _attr:{
                class:function(d){
                  if(_option._click){
                    let c="bz-clickable-hover"
                    if(BZ._data._uiSwitch._curUtilListItem==d._item){
                      c+=" bz-selected"
                    }
                    return c
                  }
                }
              },
              _items:[
                {
                  _tag:"span",
                  _attr:{
                    class:"(_data._item._class||'')+' bz-right-space-5'",
                    style:"_data._item._style"
                  },
                  _text:"_data._idx+1+'.' "
                },
                {
                  _if:"_data._item._icon",
                  _tag:"span",
                  _attr:{
                    class:"_data._item._icon",
                    style:"margin-right:5px;font-size:11px;"
                  }
                },
                {
                  _tag:"span",
                  _attr:{
                  },
                  _text:"_data._item.name||_data._item.code||_data._item._title||_data._item"
                }
              ],
              _jqext:{
                click:function(){
                  if(_option._click){
                    BZ._data._uiSwitch._curUtilListItem=this._data._item
                    _option._click(this._data._item)
                  }
                }
              },
              _dataRepeat:_option._list
            }
          ]
        }
      ]
    },
    (_option._btns||[]).map(x=>{
      x._title=x._title||_bzMessage._method._yes
      x._class=x._class||"btn btn-primary "
      return x
    }),_option._title,0,0,0,_option._noModel)

  },
  _confirm:function(_txt,_fun){
    _Util._confirmMessage(_txt,[
      {
        _title:_bzMessage._method._yes,
        _class:"btn btn-primary",
        _click:_fun
      }
    ])
  },
  _confirmDelete:function(_fun,_msg,_list){
    _Util._confirmList({
      _msg:_msg||_bzMessage._system._info._confirmDelete,
      _list:_list,
      _title:_bzMessage._method._confirmDelete,
      _btns:[{
        _title:_bzMessage._method._delete,
        _class:"btn btn-warn",
        _click:_fun
      }]
    })
  },
  _toJQueryValue:function(v){
    return (v||"").replace(/(:|\.|\[|\]|,|=|@)/g,"\\$1")
  },
  _debugLocal:function(_force){
    if(BZ._debug||_force){
      //For developer debugger
      console.log("Debugger: "+Date.now(),new Error().stack.replace("Error",""))
    }
  },
  _confirmMessage:function(_msg,_btns,_title,_width,_noCancel,_cancelFun,_noModel,_body,_noMoreAsk){
    _Util._debugLocal()
    let _loading=_msg
    var d=_Util._clone(_Dialog),
        _winTagClass="bz-confirm-window";
    d._viewDef._items[0]._attr.class+=" "+_winTagClass
    let ww=window.innerWidth*0.618
    if(ww<400){
      ww=400
    }else if(_msg&&_msg.constructor==String){
      ww=Math.min(_msg.split("\n").filter(x=>x).sort((a,b)=>b.length-a.length)[0].length*8,ww)
      if(curUser.language=="cn"){
        ww*=1.5
      }
    }
    _width=(_width||Math.min(ww,600))+"";
    if(!_width.match(/\%/)){
      _width+="px"
    }
    _btns=_btns||[]
    _btns.forEach(b=>{
      b._class=b._class||"btn-primary "+(b._exClass||"")
      if(!(b._class||"").includes("pull-")){
        b._class+=" bz-left-space-10 btn pull-right"
      }
      b._title=b._title||_bzMessage._method._save
    })
    var _dialog=_CtrlDriver._buildProxy({
      _title:_title?_title:_bzMessage._common._confirm,
      _width:400,
      _height:200,
      _afterClose:_cancelFun,
      _modal:!_noModel,
      _moveable:1,
      _destroyOnClose:true,
      _buttons:_noCancel&&_noCancel!='_close'?[]:[
        {
          _title:_btns.length?_bzMessage._method[_noCancel||!_btns.length?"_close":'_cancel']:_bzMessage._common._close,
          _class:"btn-cancel btn btn-secondary bz-pull-right",
          _style:function(d){
            return "margin-right:5px;"
          },
          _click:function(_this){
            if(_cancelFun){
              _this._ctrl._data._afterClose=0
              if(_cancelFun(_this)===0){
                return
              }
            }
            _this._ctrl._close();
          }
        }
      ]
    });

    var _content=$("<pre class='pull-left bz-dlg-content' style='word-break: break-word;white-space: pre-wrap;max-width:100%;width:100%;margin: 0;'></pre>")
    
    try{
      if(bzComm._isAppExtension()){
        $("#bz-dialog").remove()
        let o=$("<div id='bz-dialog' style='position:fixed;width:0;height:0;z-index:"+Number.MAX_SAFE_INTEGER+"'></div>").appendTo(document.body.parentElement)
        _body=o[0].attachShadow({mode:"open"})
        _body.innerHTML=`<link rel='stylesheet' href='${bzComm.getResourceRoot()}/css/main.max.css'>`
                       +`<link rel='stylesheet' href='${SERVER_HOST}/ide/css/main.icons.css'>`
                       +`<style>.bz-bg>*{background:#FFF;box-shadow: inset 2px 2px 2px hsla(0,0%,100%,.25), inset -2px -2px 2px rgba(0,0,0,.25);border: 2px solid #CCC;border-radius: 10px;}</style>`
      }else{
        _body=_body||_Util._getCurDocument().body
      }
    }catch(e){}
    if(!_body){
      _body=window.document.body
    }
  
    if(_msg.constructor==String){
      _content.html(_msg); 
    }else if(_msg.constructor==Object){
      _msg=_CtrlDriver._execute({},{},_msg,_body);
      _content.append(_msg); 
    }else{
      _content.append(_msg); 
    }
    if(_noMoreAsk){
      _content.append("<label style='display:block;margin:20px 0;'><input type='checkbox' onclick='this.checked?localStorage.setItem(\"BZ:"+_noMoreAsk+"\",1):localStorage.clear()'/>"+_bzMessage._system._info._noMoreAsk+"</label>")
    }
    _content.css({opacity:0,position:"fixed"})
    $(_body).append(_content[0]);
    // $(document.body).append(_content[0]);
    var dm=_Util._getDomSize(_content[0]);
    _dialog._width=_width
    
    _dialog._height=parseInt(dm._height)+150;
    if(_dialog._height>700){
      _dialog._height-=10
    }
    _btns.forEach(b=>{
      b&&_dialog._buttons.unshift(b);
    })
    _dialog=d._showMe(_content[0],_dialog,_body,_winTagClass);
    _content.css({opacity:1,position:"unset"})
    //_Util._resizeModelWindow(_dialog,_body.ownerDocument)
    _waitExe()
    _chkSize()
    function _waitExe(i){
      var _timer=$(_body).find(".bz-dlg-timmer-btn")
      if(_timer[0]){
        var s=_timer.find(".bz-second-num")[0]
        if(!s){
          s=$(_body).find("<span class='bz-second-num'> (31 s)</span>")[0];
          _timer.append(s)
        }
        var v=parseInt(s.innerText.substring(2))-1
        if(!v){
          return _timer.click()
        }
        s.innerText=" ("+v+" s)"
        setTimeout(_waitExe,1000)
      }
    }

    function _chkSize(){
      if(_loading&&_loading._load){
        return setTimeout(()=>{
          _chkSize()
        },100)
      }
      _Util._resizeModelWindow(_dialog,_body.ownerDocument)
    }
  },
  _setMoveWindow:function(_noMove){
    $(".bz-modal-window").toArray().forEach(o=>{
      if(o._data){
        o._data._noMoveable=_noMove
      }
    })
  },
  _closeModelWindow:function(e){
     setTimeout(function(){
      if($(".bz-large-editor")[0]){
        $(".bz-textarea-ctr").click()
      }else if($(".bz-large")[0]){
        $(".bz-ui-switch").click()
      }else{
        while(_dialogList.find((v,i)=>{
          if(v&&!v._noEsc){
            if(!e||(e.target&&(e.target==document.body||v._isSameDlg(e.target)))||$(v).find(e)){
              v._close()
              return v
            }
          }
        })&&Date.now()-_lastCloseDlgTime<50){}
        _lastCloseDlgTime=Date.now()
     }
   },10)
  },
  _gotoPageFromModelWindow:function(v,o){
    BZ._setHash(v)
    _Util._closeModelWindow(o)
  },
  _gotoPageFromModelWindow:function(v,o){
    BZ._setHash(v)
    _Util._closeModelWindow(o)
  },
  _resizeModelWindow:function(o,_doc,_fun){
    clearTimeout(_Util._resizeWindowTimer)
    _Util._resizeWindowTimer=setTimeout(function(){
      _doc=_doc||window.document
      let os=$(_doc).find(".bz-modal-window").toArray()
      if(o){
        o=os.find(oi=>{
          return oi==o|| $(oi).find(o).length
        })
        _doIt(o)
      }else if(os.length){
        _doIt(os.pop())
      }
    },30)
    
    function _doIt(o,i){
      i=i||0
      o=$(o)
      let v=o.find(".bz-dlg-content")[0]
      if(v){
        let r=o[0].getBoundingClientRect(),
            wh=_doc.defaultView.innerHeight,_resize;

        if(r.top>wh-r.bottom){
          _resize=wh-r.bottom>20
        }

        o.css({height:"100px"})
        o.css({height:100+v.scrollHeight-v.getBoundingClientRect().height+40+"px"})
        if(!v.innerText&&i<10&&v.getBoundingClientRect().height<10){
          return setTimeout(()=>{
            _doIt(o,i+1)
          },100)
        }
        if(_resize){
          r=o[0].getBoundingClientRect()
          if(r.top>wh-r.bottom){
            if(wh-r.bottom<20){
              o.css({top:r.top-20+wh-r.bottom+"px"})
            }
          }
        }
        _fun&&_fun()
      }
    }
  },
  _getEndElementsByWord:function(_judgeFun,o,_inHidden,_checkingElement){
    o=$(document.body).find(o).toArray()
    let _last,_hiddens=[];;

    for(let i=0;i<o.length;i++){
      let x=o[i]
      if(_last&&$(_last).find(x)[0]){
        if(_hiddens.includes(_last)){
          if(_judgeFun(x.innerText)){
            _hiddens.push(x)
          }
        }
        o.splice(i--,1)
      }else if(!_judgeFun(x.innerText)){
        o.splice(i--,1)
        _last=x
      }else if(_Util._isHidden(x)){
        _hiddens.push(x)
        o.splice(i--,1)
        _last=x
      }else{
        _last=0
      }
    }
    if(_inHidden){
      _doIt(_hiddens)
      return _hiddens
    }else{
      _doIt(o)
      if(o.length){
        return o
      }
      _doIt(_hiddens)
      return _hiddens
    }
    function _doIt(o){
      _last=o[o.length-1]

      for(let i=o.length-2;i>=0;i--){
        if(!_Util._isCellElement(o[i])&&$(o[i]).find(_last)[0]){
          o.splice(i,1)
        }else{
          _last=o[i]
        }
      }
      // _Util._spliceAll(o,x=>{
        // if(!_Util._isCellElement(x)){
          // for(let i=0;i<x.childNodes.length;i++){
            // let n=x.childNodes[i]
            // if(n.nodeType==3&&_judgeFun(n.textContent||"")){
              // return
            // }
          // }
          // return 1
        // }
      // })
    }
    return o
  },
  //for shadowRoot
  _getRootDom:function(o){
    while(o.parentElement&&o.tagName!="BODY"){
      o=o.parentElement
    }
    return o
  },
  _getElementsByWord:function(_judgeFun,o,_inHidden,_root){
    if(o=="BODY"){
      o=[_root||document.body]
    }else{
      o=$(_root||document.body).find(o).toArray()
    }
    let _last,_hiddens=[];

    for(let i=0;i<o.length;i++){
      let x=o[i]
      if(_last&&$(_last).find(x)[0]){
        if(_hiddens.includes(_last)){
          if(_judgeFun(x.innerText)){
            _hiddens.push(x)
          }
        }
        o.splice(i--,1)
      }else if(!_judgeFun(x.innerText)){
        o.splice(i--,1)
        _last=x
      }else if(_Util._isHidden(x)){
        _hiddens.push(x)
        o.splice(i--,1)
        _last=x
      }else{
        _last=0
      }
    }
    if(_inHidden||!o.length){
      return _hiddens
    }
    return o
  },
  _getPageMD5:function(){
    return _calcMD5(document.body.outerHTML+location.href)
  },
  _getAppHTMLMD5:function(_fun){
    if(bzComm._isIDE()){
      bzComm.postToAppExtension({
        fun:"_getAppHTMLMD5",
        scope:"_Util",
        insertCallFun:1,
        return:function(v){
          _fun(v)
        }
      })
    }else{
      _fun(_Util._getPageMD5())
    }
  },
  _attachWordToImg:function({_word,_imgSrc,_fun}){
    if(!_imgSrc){
      return _fun()
    }
    bzComm._log("Attach word to image: "+_word+", "+(_imgSrc||"").length)
    let _canvas = document.createElement('canvas');
    let _ctx = _canvas.getContext('2d');
    let _img = new Image();
    _img.crossOrigin = 'anonymous'; 

    _img.onload = () => {
      _canvas.width=_img.width
      _canvas.height=_img.height+30

      _ctx.drawImage(_img, 0, 30);

      if(_word.includes(_bzMessage._common._failed)){
        _ctx.fillStyle = 'rgba(204, 0, 0, 1)'; 
      }else{
        _ctx.fillStyle = 'rgba(0, 204, 0, 1)'; 
      }
      _ctx.fillRect(0, 0, _img.width,30);

      _ctx.font = '18px Arial';
      _ctx.textAlign = 'center';
      _ctx.textBaseline = 'middle';
      _ctx.fillStyle = 'rgba(255,255,255, 1)'; 
      _ctx.fillText(_word, _canvas.width / 2, 15);
      _fun(_canvas.toDataURL('image/png'))
    };
    _img.onerror=()=>{
      bzComm._log("loading image got error")
      _fun()
    }
    _img.src = _imgSrc;
  },
  _isStdInputElement:function(v){
    return this._isInputTag(v.tagName) && !["image","button","reset","submit","hidden"].includes(v.type);
  },
  _isEventElement:function(v){
    return _Util._isInputObj(v)||$("[contenteditable=true]").find(v)[0]|| ["OPTION","BUTTON","A"].includes(v.tagName)
  },
  _isCellElement:function(v){
    return _Util._isEventElement(v)
  },
  _findAllCellsInPanel:function(p,os){
    os=os||[]
    if(p.constructor!=Array){
      p=[p]
    }
    p.filter(x=>x).forEach(o=>{
      _find(o,os)
    })
    function _find(p,os){
      let _found
      for(let i=0;i<(p.children||[]).length;i++){
        let o=p.children[i],r=o.getBoundingClientRect()
        if(!_Util._isHidden(o)&&r.width>=5&&r.height>=5){
          _found=1
          if(["SELECT","SVG","svg","BUTTON","A"].includes(o.tagName)||_Util._isInContentEditable(o)){
            os.push(o)
          }else{
            _find(o,os)
          }
        }
      }
      if(!_found){
        os.push(p)
      }else{
        for(let i=0;i<p.childNodes.length;i++){
          let o=p.childNodes[i]
          if(o.nodeType==3){
            let v=(o.textContent||"").trim()
            if(v){
              os.push(o)
            }
            break
          }
        }
      }
    }
    return os
  },
  _isInputTag:function(v){
    return ["INPUT","SELECT","TEXTAREA"].includes(v);
  },
  _popWin:function(url,name,_win,_width,_height,_viewDef,_title){
    _Util._debugLocal()

    var w=_width || screen.availWidth*0.50;
    var h=_height || screen.availHeight*0.50;
    var l=(screen.availWidth-w)/2;
    var t=(screen.availHeight-h)/2;
    if(!_win){
      _win=window;
    }
    w=(_win.BZ_PopOpen||_win.open)(url,name,"width="+w+",height="+h+",left="+l+",top="+t+",resizable=yes");
    
    var d=w.document;
    w.focus();
    var _host=SERVER_HOST;
    if(window.extensionContent&&_host.match(/^\/\/[0-9\.]+$/)){
      _host="/"+"/ai.boozang.com"
    }

    

    //Setup css
    if(_Util._style){
      d.write("<style>"+_Util._style+"</style>")
    }else{
      d.write("<link rel='stylesheet' type='text/css' href='"+bzComm.getResourceRoot()+"/css/icon.font.css'>");
      d.write("<link rel='stylesheet' type='text/css' href='"+bzComm.getResourceRoot()+"/css/js-editor.css'>");
      d.write("<link rel='stylesheet' type='text/css' href='"+bzComm.getResourceRoot()+"/css/main.max.css'>");
    }
    d.write("<link rel='stylesheet' type='text/css' href='"+_host+"/ide/css/main.icons.css'>");
    d.write("<style>input{font-family: Courier;}\n#_content span{color:blue;}\nul input{border: 0;margin: 2px;}</style>");

    d.write("<link type='image/x-icon' href='"+_host+"/favicon.ico'>");
    d.write(`<body style='min-width:unset;overflow:hidden;' class='bz-pop-win'></body>`);

    w.BZ=BZ;

    
    _Util._handlePrePanel(d)
    
    _Util._setEscWindow(w);
    d.title="BZ - "+_title
    if(!_viewDef._attr||!_viewDef._attr.disabled){
      _viewDef._attr=_viewDef._attr||{}
      _viewDef._attr.disabled=!BZ._isCheckout()
    }
    _CtrlDriver._setupKeyInput(d)
    _CtrlDriver._execute({},{},_viewDef,d.body);

    // d.insertBefore(d.implementation.createDocumentType('html','',''), d.childNodes[0]);
    setTimeout(function(){
      if(curUser.uiModel){
        $(w.document.body.parentElement).addClass("bz-in-"+curUser.uiModel)
      }
      $(w.document).contextmenu((e)=>{
        e=e.target
        _Util._copyText(e,e.ownerDocument,e)
        return false
      })
      w.onresize=function(){
        let _this=this
        clearTimeout(this._resizeTime)
        this._resizeTime=setTimeout(function(){
          $(w.document).find(".bz-resize").each(function(i,o){
            o._viewDef._resize(o,_this);
          })
        },100);
      }
      w.onclick=function(e){
        window.document.body.click()
      }
      w.onbeforeunload=function(){
        _bzJSEditor._addResizeObserver()
      }
      w.onresize();
    },10)
    BZ._curPopWin=w
    return w
  },
  _checkKeycode:function(e) {
    var _keycode;
    if (window.event) {
      _keycode = window.event.keyCode;
    }else if (e) {
      _keycode = e.which;
    }
    return _keycode;
  },
  _checkCharcode:function(e) {
    e=e||window.event;
    var _keycode=0;
    if (e) {
      _keycode = e.charCode;
    }
    if(!_keycode && e && e.key && e.key.length==1){
      _keycode=e.key.charCodeAt(0)
    }
    return _keycode;
  },
  _getDomXYForDrag:function(obj){
    let _nsSlider=$(obj).css("cursor")=="row-resize"
    let _ewSlider=$(obj).css("cursor")=="col-resize"
    if(obj.defaultView){
      return {x:0,y:0};
    }
    var o=obj.getBoundingClientRect()
    var x=o.x,
        y=o.y,
        t=$(obj).css("transform");
    if(!t||t=="none"){
      if(_nsSlider){
        $(obj).css({top:y+"px"})
      }else if(_ewSlider){
        $(obj).css({left:x+"px"})
      }else{
        $(obj).css({left:x+"px",top:y+"px"})
      }
      o=obj.getBoundingClientRect()
      var x1=o.x,
          y1=o.y;
      
      if(x1!=x||y1!=y){
        x=x+x-x1
        y=y+y-y1
        if(_nsSlider){
          $(obj).css({top:y+"px"})
        }else if(_ewSlider){
          $(obj).css({left:x+"px"})
        }else{
          $(obj).css({left:x+"px",top:y+"px"})
        }
      }
    }
    return {"x":x, "y":y};    
  },
  _inBrokenDom:function(o){
    while(o){
      if(o.tagName){
        o=o.parentElement
      }else{
        return 1
      }
    }
  },
  _getDomXY:function(obj){
    if(obj.defaultView){
      return {x:0,y:0};
    }
    
    var _box = obj.getBoundingClientRect();
    
    if((_box.width==0||_box.height==0)&&(_box.left==0&&_box.top==0)){
      if(_cssHandler._isInShadowDom(obj)){
        _box=obj.parentElement.getBoundingClientRect()
      }
    }
    return {"x":_box.left, "y":_box.top};
  },
  _trimSpace:function(v){
    return v.trim().replace(/\s+/g," ");
  },
  _BZContentToFormatedHtml:function(_view,_step){
    if(_view.tag){
      var _attr=""
      if(_view.id){
        _attr=" id=\""+_view.id+"\"";
      }
      if(_view.tagAttr){
        for(var k in _view.tagAttr){
          _attr+=" "+k+"=\""+_view.tagAttr[k]+"\"";
        }
      }
      var s=_step+"<"+_view.tag+_attr+">\r";
      var v="";
      if(_view.items){
        for(var i=0;i<_view.items.length;i++){
          var vv=_view.items[i];
          v += _Util._BZContentToFormatedHtml(vv,_step+"  ");
        }
      }
      var e=_step+"</"+_view.tag+">\r";
      return s+v+e;
    }else{
      return _step+_view.html+"\r";
    }    
  },  
  _getParentNode:function(_dom,_tag){
    while(_dom.parentNode){
      _dom=_dom.parentNode;
      if(_dom.tagName==_tag){
        return _dom;
      }else if(_dom.tagName=="HTML"){
        return null;
      }
    }
  },
  _objToArray:function(o){
    let a=[];
    Object.keys(o||{}).forEach(x=>{
      a.push({key:x,value:o[x]})
    })
    return a
  },
  _arrayToObj:function(a,k,v){
    let o={};
    k=k||"key";
    v=v||"value";
    (a||[]).forEach(x=>{
      let kk=x[k]
      if(kk===undefined&&!_Util._isObjOrArray(x)){
        kk=x
      }
      o[kk]=x[v]
    });
    return o
  },
  _getMouseOnChild:function(e,_pos){
    var os=e.children,o;
    for(var i=0;i<os.length;i++){
      o=os[i]
      if(!_Util._isHidden(os[i])){
        var e=o.getBoundingClientRect()
        if(_pos.x>=e.left&&_pos.y>=e.top&&_pos.x<=e.right&&_pos.y<=e.bottom){
          if(!$(o).hasClass("BZIgnore")){
            return o
          }
        }else if(o.children){
          var oo=_Util._getMouseOnChild(o,_pos)
          if(oo){
            return oo
          }
        }
      }
    }
  },
  _getMouseOnParent:function(e,_pos){
    while(e.parentElement){
      var o=e.getBoundingClientRect()
      if(_pos.x>=o.left&&_pos.y>=o.top&&_pos.x<=o.right&&_pos.y<=o.bottom){
        return e
      }
      e=e.parentElement
    }
  },
  _getMouseXY:function(e) {
    if(!e.target){
      return {x:0,y:0};
    }
    var _posx = 0;
    var _posy = 0;
    var _doc=e.target.ownerDocument;
    if (e.pageX || e.pageY)   {
      _posx = e.pageX;
      _posy = e.pageY;
    }else if (e.clientX || e.clientY)   {
      _posx = e.clientX;
      _posy = e.clientY;
    }
    _posx -= _doc.scrollingElement.scrollLeft;
    _posy -= _doc.scrollingElement.scrollTop;
    return {x:_posx,y:_posy};
  },
  _convertObj:function(v){
    if(!v){
      return v;
    }
    v=JSON.stringify(v);
    v=_compressJSON._convertToEntities(v);
    return JSON.parse(v);
  },
  _unConvertObj:function(o){
    if(!o){
      return o;
    }
    var t=JSON.stringify(o);
    var rs=t.match(/&#[0-9]+;/g);
    if (rs) {
      for(var i=0;i<rs.length;i++){
        t=t.replace(rs[i],String.fromCharCode(parseInt(rs[i].substring(2))));
      }
      return JSON.parse(t);

    }else{
      return o;
    }
  },
  _chkExistDataAttr:function(d,as){
    as.find(a=>{
      if(d[a]){
        if(d[a].constructor==Array){
          return d[a].length
        }else if(d[a].constructor==Object){
          return Object.keys(d[a]).length
        }
        return 1
      }
    })
  },
  _getDomSize:function(_dom){
    var _tmp=false;
    if(!_dom.parentElement){
      _tmp=$("<div></div>").appendTo(document.body)
      $(_dom).appendTo(_tmp);
    }
    var _size={_width:_dom.offsetWidth,_height:_dom.offsetHeight};
    if(_tmp){
      $(_tmp).remove();
    }
    return _size;
  },
  _isNumber:function(v){
    try{
      if(!isNaN(parseFloat(v))){
        return v+""==parseFloat(v)+"";
      }
    }catch(e){
    }
    return false;
  },
  _getScreenXYByClientXY:function(w,x,y){
    x+=4;
    y+=54;
    return {x:x,y:y};
  },
  _getSouElementFromEvent:function(_event,_window){
    if(!_event){
      _event=_window.event;
    }
    if(_event){
      if(_event.srcElement){
        return _event.srcElement;
      }else{
        return _event.target;
      }
    }
    return null;
  },
  _formatInnerText:function(v){
    v=v.replace("\r","\n");
    var vs=v.split("\n");
    var rv="";
    for(var i=0;i<vs.length;i++){
      v=this._replaceAll(vs[i].trim(),/  /g," ");
      if (v) {
        rv+=v+"\n";
      }
    }
    return rv.trim();
  },
  _replaceLast:function(w,r,s){
    if(s=="."){
      s="\\."
    }
    return w.replace(new RegExp(s+"[^"+s+"]+$"),r)
  },
  _replaceAll:function(w,r,v){
    return w.split(r).join(v)
  },
  _isFunIgnoreInBrowser:function(n){
    for(var i=0;i<n.length;i++){
      if(_Util._checkBrowserType().name.includes(n)){
        return 1
      }
    }
  },
  _checkBrowserType:function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name:"ie",version:(tem[1] || "")};
    }
    if(M[1]=== "Chrome"){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return {name:tem.slice(1).join(" ").replace("OPR", "Opera")};
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, "-?"];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return {name:M[0],version:M[1],letterWidth:M[0]=="firefox"?9:8};
  },
  _addCSSRule:function(v){
    let ss=document.styleSheets;
    for(let i=0;i<ss.length;i++){
      try{
        let s=ss[i];
      
        s.insertRule(v)
        return
      }catch(ex){}
    }
  },
  _removeCSSRule:function(v){
    let ss=document.styleSheets;
    for(let i=0;i<ss.length;i++){
      try{
        let s=ss[i];
        for(let j=0;j<s.cssRules.length;j++){
          if(s.cssRules[j].cssText==v){
            s.deleteRule(j)
            return
          }
        }
      }catch(ex){}
    }

  },
  _downloadFile:function(_name,_content,_type){
    _content=_content||""
    if(_Util._isObjOrArray(_content)){
      _content=JSON.stringify(_content,0,2)
    }
    _content=_content.toString();
    
    if(_Util._checkBrowserType().name=="ie"){
      var blobObject = new Blob([_content],_type?{type:_type}:undefined); 
      
      window.navigator.msSaveBlob(blobObject, _name);
    }else{
      var a=$("<a></a>");
      $(document.body).append(a[0]);
      a.attr("download",_name).attr("href","data:application/octet-stream," + encodeURIComponent(_content))[0].click();
      a.remove();
    }
  },
  _downloadAsHtmlFile:function(_name,_content){
    if(!_content.startsWith("<!DOCTYPE html>")){
      _content="<!DOCTYPE html><html><header><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'></header><body>"+_content+"</body></html>"
    }
    if(_Util._checkBrowserType().name=="ie"){
      var blobObject = new Blob([_content]); 
      
      window.navigator.msSaveBlob(blobObject, _name);
    }else{
      var a=$("<a></a>");
      $(document.body).append(a[0]);
      a.attr("download",_name).attr("href","data:application/octet-stream," + encodeURIComponent(_content))[0].click();
      a.remove();
    }
  },
  //w: doc content 
  //n: file name
  _downloadAsWordFile:function(_name,_content){
    let w1="http:/"+"/schemas.microsoft.com/office/2004/12/omml"
    let w2="http:/"+"/www.w3.org/TR/REC-html40"
    let _sourceHTML = `<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="${w1}" xmlns="${w2}">

      <head>
          <!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:TrackMoves>false</w:TrackMoves><w:TrackFormatting/><w:ValidateAgainstSchemas/><w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid><w:IgnoreMixedContent>false</w:IgnoreMixedContent><w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText><w:DoNotPromoteQF/><w:LidThemeOther>EN-US</w:LidThemeOther><w:LidThemeAsian>ZH-CN</w:LidThemeAsian><w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript><w:Compatibility><w:BreakWrappedTables/><w:SnapToGridInCell/><w:WrapTextWithPunct/><w:UseAsianBreakRules/><w:DontGrowAutofit/><w:SplitPgBreakAndParaMark/><w:DontVertAlignCellWithSp/><w:DontBreakConstrainedForcedTables/><w:DontVertAlignInTxbx/><w:Word11KerningPairs/><w:CachedColBalance/><w:UseFELayout/></w:Compatibility><w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel><m:mathPr><m:mathFont m:val="Cambria Math"/><m:brkBin m:val="before"/><m:brkBinSub m:val="--"/><m:smallFrac m:val="off"/><m:dispDef/><m:lMargin m:val="0"/> <m:rMargin m:val="0"/><m:defJc m:val="centerGroup"/><m:wrapIndent m:val="1440"/><m:intLim m:val="subSup"/><m:naryLim m:val="undOvr"/></m:mathPr></w:WordDocument></xml><![endif]-->

          <meta charset='utf-8'/>
          <title>${_name}</title>
          <style>
          @page {
            size: 4in 6in landscape;
          }
          @media print {
            html, body {
              width: 210mm;height: 297mm;
            }
          }
          page[size="A4"] {
            background: white;
            width: 21cm;
            height: 29.7cm;
            display: block;
            margin: 0 auto;
            margin-bottom: 0.5cm;
            box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
          }
tbody td:first-child,tbody td:last-child{
  text-align:center;
}
          </style>
      </head>
      <body>${_content}</body></html>`;
     
     var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(_sourceHTML);
     var _fileDownload = document.createElement("a");
     document.body.appendChild(_fileDownload);
     _fileDownload.href = source;
     _fileDownload.download = _name;
     _fileDownload.click();
     document.body.removeChild(_fileDownload);
  },
  _downloadAsPdfFile:function(title,o) {
    let w= window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
    let d=w.document,
        _txt=`<html><head><title>${title}</title></head><body>${o}</body></html>`;
    d.write(_txt);

    d.close(); // necessary for IE >= 10
    w.focus(); // necessary for IE >= 10
    setTimeout(function(){
      w.print();
      w.close();
    },100)

    return true;
  },
  _downloadAsZip:function(_files,_zipFileName,_fun){
    zip.createWriter(new zip.BlobWriter("application/zip"), function(_zipWriter) {
      _addFile(_zipWriter,0)
    }, function(_msg){
      alert(_msg)
    });

    function _addFile(_zipWriter,i){
      let f=_files[i]
      if(f){
        _zipWriter.add(f._name, new zip.BlobReader(f._data), function() {
          _addFile(_zipWriter,i+1)
        });
      }else{
        _zipWriter.close(function(blob) {
					var blobURL =URL.createObjectURL(blob);
          var _clickEvent = document.createEvent("MouseEvent");
          _clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          let _downloadButton=$("<a></a>").appendTo(document.body)[0]
          
          _downloadButton.href = blobURL;
          _downloadButton.download = _zipFileName;
          _downloadButton.dispatchEvent(_clickEvent);
					zipWriter = null;
          $(_downloadButton).remove()
				});
      }
    }
  },
  _getDomsByTagAndName:function(tag,name){
    if(BZ._autoRecording){
      return []
    }
    return $(tag+"[name='"+name+"']").toArray()
  },
  _removeAllLinkTarget:function(){
    $("A").toArray().forEach(a=>{
      _Util._removeLinkTarget(a)
    })
  },
  _setUrlFileToInput:function(_url,e,_fun){
    _Util._getFileFromUrl(_url,function(v){
      $util.triggerChangeEvent(e,v,1,0,0,0,_fun);
    })
  },
  _getFileFromUrl:function(_url,_fun){
    if(_url.match(/^[\/]?example\..+$/)){
      _url="http:"+SERVER_HOST.replace(/^https?:/,"")+"/file/"+_url.replace("/","")
    }else{
      _url=_url.replace("/"+"/www.dropbox.com/","/"+"/dl.dropbox.com/");
    }
    if(!_url.match(/^http/)){
      _url=location.protocol+_url
    }
    bzComm.postToBackground({
      scope:"bgUtil",
      fun:"ajax",
      ps:[{url:_url,method:"GET",responseType:'arraybuffer'}],
      return:_fun
    })
  },
  _isFileData:function(v){
    try{
      if(v && v.constructor==String){
        v=JSON.parse(v)[0]
      }
      return v.base64Link
    }catch(e){}
  },
  _removeLinkTarget:function(e){
    while(e){
      if(e.tagName=="A"){
        if($(".BZIgnore").find(e)[0]){
          return
        }
        var _target=$(e).attr("target");
        if(_target){
          if(!_target.match(/^_(parent|self|top)$/)&&!bzComm._getIframeByAttr("uId",_target)){
            $(e).attr("target","_"+"self")
          }
        }else{
          $(e).attr("target","_"+"self")
        }
      }
      if(e!=e.parentElement){
        e=e.parentElement;
      }else{
        return;
      }
    }
  },
  _toKey:function(v){
    v= v?v.replace(/[^a-zA-Z0-9_.]/g,"_"):"";
    if(v && v.match(/^[0-9.]/)){
      v="_"+v;
    }
    while(v.indexOf("..")>=0){
      v=v.replace("..",".");
    }
    if(v && v[v.length-1]=="."){
      v=v.substring(0,v.length-1);
    }
    return v.toLowerCase();
  },
  /*
  _formatPeriod:function(v){
    v=parseInt(v/1000);
    var h=parseInt(v/3600);
    v-=h*3600;
    var m=parseInt(v/60);
    v-=m*60;
    
    m=m<10?"0"+m:m;
    v=v<10?"0"+v:v;
    return h?h+":"+m+":"+v:parseInt(m)?parseInt(m)+":"+v:parseInt(v)+" s";
  },
  */
  _formatNumberLength:function(v,l){
    return (v+"").padStart(l||2,0);
  },
  _getAngularModelAttr:function(o){
    var _tmp=null;
    var _curWin=_Util._getWindowFromDom(o);
    if(_curWin.angular){
      var _scope=_curWin.angular.element(o).scope();
      if(_scope){
        for(var n=0;n<o.attributes.length;n++){
          var a=o.attributes[n];
          try{
            var _model=a.value.split(".");
            var _variable=_scope;
            for(var x=0;x<_model.length;x++){
              _variable=_variable[_model[x]];
            }
            if(_variable!=undefined || x>1){
              _tmp= a;
              if(a.name.indexOf("-model")>=0){
                break;
              }
            }
          }catch(e){}
        }
      }
    }
    return _tmp;
  },
  _retrieveFileName:function(v){
    v=v.replace(/[^-_ a-zA-Z0-9]/g,"\t").trim();
    v=v.split("\t");
    return v[v.length-2];
  },
  _retrieveCssProperty:function(e,_extra,_name){
    return window.getComputedStyle(e,_extra).getPropertyValue(_name);
  },
  _retrieveCssProperties:function(e,_extra,_names){
    if(_extra==true){
      _extra=":before"
    }else if(_extra){
      _extra=":after"
    }
    var c=window.getComputedStyle(e,_extra);
    var vs=[];
    for(var i=0;i<_names.length;i++){
      vs.push(c.getPropertyValue(_names[i]));
    }
    if(!_extra || _extra==":after"){
      return vs;
    }else{
      return vs.concat(this._retrieveCssProperties(e,_extra,_names));
    }
  },
  _pickAttrFromArray:function(vs,_name){
    var ps=[];
    for(var i=0;i<vs.length;i++){
      ps.push(vs[i][_name]);
    }
    return ps;
  },
  _getRealWord:function(o,v){
    if(o.maxLength<0){
      return v;
    }else{
      return v.substring(0,o.maxLength);
    }
  },
  _buildRefPath:function(n,k){
    var m=k.match(/[a-z_$][a-z0-9_$]*/i);
    if(m && m[0]==k){
      return n+"."+k;
    }else{
      return n+"['"+k+"']";
    }
  },
  _pickValuePath:function(d,_name){
    var ps=[];
    _name=_name||"";
    for(var k in d){
      var v=d[k];
      if(v){
        if(v.constructor==Object){
          ps.concat(this._pickObjPath(v,_name+"."+k))
        }else if(v.constructor==Array){
          
        }else{
          ps.push(_name+"['"+k+"']")
        }
      }
    }
    return ps;
  },
  _toSBC:function(v){
    var s = "",_len = (v||"").length;
    for(var i=0;i<_len;i++){
        var c = v.charCodeAt(i);
        if("“”".includes(v[i])){
          c=34;
        }else if("‘’".includes(v[i])){
          c=39;
        }
        c = (c>=0xFF01 && c<=0xFF5E)?(c - 65248) : c;
        c = (c==0x03000)?0x0020:c;
        s += String.fromCharCode(c);
    }
    return s;
  },
  _cleanObj:function(o){
    if(o){
      for(let k in o){
        delete o[k]
      }
    }
  },
  _cleanArray:function(vs){
    var v="";
    if(vs){
      for(var i=0;i<vs.length;i++){
        var v=vs[i].trim();
        if(v){
          vs[i]=v;
        }else{
          vs.splice(i,1)
        }
      }
    }
    return vs;
  },
  _clearEmptyAttr:function(o){
    let ks=Object.keys(o);
    ks.forEach(k=>{
      if(!o[k]&&o[k]!==0){
        delete o[k];
      }else if(_Util._isObjOrArray(o[k])){
        this._clearEmptyAttr(o[k])
      }
    })
  },
  _getAttributeCss:function(e,v,bv){
    if(!e.attributes){
      return ""
    }
    var o;
    for(var i=0;i<e.attributes.length;i++){
      var a=e.attributes[i];
      
      if(a.value.trim() && (!v || a.value.toLowerCase().includes(v.toLowerCase()))){
        var n=a.name.toLowerCase();
        if(n.match(/title|label/)){
          o=a;
          break;
        }else if(n.includes("alt")){
          o=a;
        }else if(n=="placeholder" && !o){
          o=a;
        }else if(n=="name" && !o){
          o=a;
        }
      }
    }
    if(o && !v){
      v=o.value.split("\n")[0].trim().substring(0,50)
    }else if(o && bv){
      v=bv;
    }
    return o && v?_Util._getAttrPath(o.name,v):""
  },
  _getDataPathByValue:function(d,v){
    var r,t;
    for(var k in d){
      t=d[k];
      if([Object].includes(t.constructor)){
        r=this._getDataPathByValue(t,v);
        if(r){
          return k+"."+r
        }
      }else if(t==v){
        return k;
      }
    }
  },
  _getAllVisableElements:function(){
    let hs=[]
    let os=($(document.body).find("*").toArray().filter(x=>{
      if(["file","checkbox","radio"].includes(x.type)){
        return 1
      }
      let r=x.getBoundingClientRect()
      if(r.width&&r.height&&$(x).css("visibility")!="hidden"&&$(x).css("opacity")!=0){
        if(r.left+r.width>0&&r.top+r.height>0){
          return 1
        }else{
          let p=$(x).css("position")
          if(p=="fixed"||p=="absolute"){
            hs.push(p)
            return
          }else{
            return !$(hs).find(p)[0]
          }
        }
      }
      //&&!$(x).hasClass("BZIgnore")//&&!bs.has(x)
    }));
    return os
  },
  _clearPreEventElements:function(){
    delete _Util.preEventElements
  },
  _getAllVisableElementsInJQ:function(){
    return $(_Util._getAllVisableElements())
  },
  _preTriggerEvent:function(){
    _Util.preEventElements=new Set(_Util._getAllVisableElements())
  },
  _getDiffAfterTriggerEvent:function(_continuePreTriggerEvent,_keepPreEventElements){
    let os=_Util._getAllVisableElements();
    let ps=_Util.preEventElements

    if(_continuePreTriggerEvent){
      if(!_keepPreEventElements||!ps){
        _Util.preEventElements=new Set(os)
      }
    }else{
      delete _Util.preEventElements
    }
    if(ps){
      os=os.filter(x=>!ps.has(x))
    }else{
      return []
    }
    return os
  },
  _clickToHidden:function(o,_fun){
    _Util._preTriggerEvent()
    $util.triggerMouseEvents(o,1,0,0,0,0,0,function(){
      setTimeout(function(){
        if(_Util._getHiddenAfterTriggerEvent(1).length){
          _fun&&_fun()
        }else if(o.parentElement){
          _Util._clickToHidden(o.parentElement,_fun)
        }else{
          _fun&&_fun()
        }
      },50)
    })
  },
  _getHiddenAfterTriggerEvent:function(_continuePreTriggerEvent){
    let os=new Set(_Util._getAllVisableElements())
    let ps=[..._Util.preEventElements]

    if(_continuePreTriggerEvent){
      _Util.preEventElements=new Set(os)
    }else{
      delete _Util.preEventElements
    }
    return ps.filter(x=>!os.has(x))
  },
  _findElementAfterChange:function(_inputList,v,_findTargetFun,_fun){
    _Util._preTriggerEvent()
    _changeElement(_clickList)
    function _changeElement(os){
      let o=os.shift()
      if(o){
        $util.triggerChangeEvent(o,v,0,0,0,0,function(){
          _foundElement(function(o){
            if(o){
              _fun(o)
            }else{
              _changeElement(os)
            }
          },0)
        })
      }else{
        _fun()
      }
    }


    function _foundElement(_fun,_wait){
      let os=_Util._getDiffAfterTriggerEvent(1)
      os=_findTargetFun(os)
      
      if(os.length){
        _fun(os)
      }else if((TWHandler._curRequestList||[]).length&&_wait<30){
        setTimeout(function(){
          _foundElement(_fun,_wait+1)
        },100)
      }else if(!_wait){
        setTimeout(function(){
          _foundElement(_fun,1)
        },100)
      }else{
        _fun()
      }
    }
  },
  _buildDateRegex:function(){
    if(!_Util._mmmm&&_IDE._data._setting){
      _Util._mmmm={}
      _IDE._data._setting.MMMM.split(",").map(x=>x.trim().toLowerCase()).forEach((x,i)=>{
        _Util._mmmm[x]=i+1
      })
      _Util._mmm={}
      _IDE._data._setting.MMM.split(",").map(x=>x.trim().toLowerCase()).forEach((x,i)=>{
        _Util._mmm[x]=i+1
      })
      let y="([0-9]{4})",
          d="([0-9]{1,2})",
          mm=Object.keys(_Util._mmmm).join("|")+"|"+Object.keys(_Util._mmm).join("|"),
          m="("+mm+"|[0-9]{1,2})",
          s=" ?[\\/\\-., ] ?"
          
      _Util._ymdRegex=new RegExp(`${y} ?[年\\/\\-., ] ?${m} ?[月\\/\\-,. ] ?${d}`,"i")
      _Util._ymdRegexAll=new RegExp(`${y} ?[年\\/\\-., ] ?${m} ?[月\\/\\-,. ] ?${d}`,"ig")
      if(_IDE._data._setting.mdParser=="mdy"){
        _Util._mdyRegex=new RegExp(`${m}${s}${d}${s}${y}`,"i")
        _Util._mdyRegexAll=new RegExp(`${m}${s}${d}${s}${y}`,"ig")
        _Util._mdRegex=new RegExp(`(${mm})${s}${d}`,"i")
        _Util._mdRegexAll=new RegExp(`(${mm})${s}${d}`,"ig")
      }else{
        _Util._mdyRegex=new RegExp(`${d}${s}${m}${s}${y}`,"i")
        _Util._mdyRegexAll=new RegExp(`${d}${s}${m}${s}${y}`,"ig")
        _Util._mdRegex=new RegExp(`${d}${s}(${mm})`,"i")
        _Util._mdRegexAll=new RegExp(`${d}${s}(${mm})`,"ig")
      }
    }
  },
  _findDateString:function(v){
    if(v&&v.constructor==String){
      _Util._buildDateRegex()
      return v.match(_Util._ymdRegexAll)||v.match(_Util._mdyRegexAll)||v.match(_Util._mdRegexAll)||[]
    }
  },
  _findDateFromString:function(v){
    return (_Util._findDateString(v)).filter(x=>x).map(x=>{
      return {d:_Util._toDate(x),v:x}
    })
  },
  _isDateValue:function(v){
    if(v){
      if(v.constructor==Date){
        return v
      }else if(v.constructor==String){
        return _Util._findDateString(v)[0]==v
      }
    }
  },
  _toDate:function(d){
    if(d){
      if(d instanceof Date){
        return d
      }else if(d.constructor==String){
        let y,m,dd,cd=new Date();
        d=d.split(/[ -.,\/年月日号]+/).map(x=>parseInt(x)||x)
        d.find((x,i)=>{
          if(x>31){
            y=x
            d.splice(i,1)
            return 1
          }
        })
        y=y||cd.getFullYear();
        d.find((x,i)=>{
          if(!$.isNumeric(x)){
            m=x
            d.splice(i,1)
            return 1
          }else if(x>12){
            dd=x
            d.splice(i,1)
            return 1
          }
        })

        if(d.length==1){
          if(m){
            dd=d[0]
          }else{
            m=d[0]
          }
        }else if(d.length){
          if(_IDE._data._curVersion.setting.mdParser=="dmy"){
            dd=d[0]
            m=d[1]
          }else{
            dd=d[1]
            m=d[0]
          }
        }
        return new Date(y+"/"+m+"/"+dd)
      }
    }
  },
  _findElementAfterClick:function(_clickList,_doWait,_findTargetFun,_fun){
    _Util._preTriggerEvent()
    _clickElement(_clickList)
    function _clickElement(os){
      let o=os.shift()
      if(o){
        $util.triggerMouseEvents(o,1,0,0,0,0,0,function(){
          setTimeout(()=>{
            _foundElement(function(o){
              if(o){
                _fun(o)
              }else{
                _clickElement(os)
              }
            },0)
          },250)
        })
      }else{
        _fun([])
      }
    }


    function _foundElement(_fun,_wait){
      let os=_Util._getDiffAfterTriggerEvent(1)
      os=_findTargetFun(os)
      
      if(os.length){
        _fun(os)
      }else if((TWHandler._curRequestList||[]).length&&_wait<30){
        setTimeout(function(){
          _foundElement(_fun,_wait+1)
        },100)
      }else if(!_wait&&_doWait){
        setTimeout(function(){
          _foundElement(_fun,1)
        },100)
      }else{
        _fun()
      }
    }
  },
  _getNewPanelFromNewElements:function(os){
    return os.find(o=>{
      return $(o).find(os).length>os.length/2
    })
  },
  _removeEndSign:function(v){
    var w="";
    for(var i=0;i<v.length;i++){
      var vv=v[i];
      var x=this._removeSign(vv,"");
      if(x){
        v=v.substring(i)
        break;
      }
    }
    if(i==v.length){
      return v;
    }
    for(var i=v.length-1;i>=0;i--){
      var vv=v[i];
      var x=this._removeSign(vv,"");
      if(x){
        v=v.substring(0,i+1);
        break;
      }
    }
    return v;
  },
  //v: words, it will be handle
  //r: replace word
  //k: keep sign
  //like: _removeSign("abc,xyz-网站  é#è&^êë"," ","-") --> "abc xyz-网站 é è  êë"
  _removeSign:function(v,r,k,_removeUnderscroe){
    r=r||"";
    k=k||"";
    v=this._toSBC(v);
    v= v.replace(/[^\wÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC\s$-]/g,r); 
    if(_removeUnderscroe){
      v=v.replace("_",r)
    }
    if(!k.includes("-")){
      v=v.replace(/\-/g,r)
    }
    if(!k.includes("$")){
      v=v.replace(/\$/g,r)
    }
    if(!k.includes(" ")&&r!=" "){
      v=v.replace(/ /g,r)
    }
    
    if(r==" "){
      v=v.replace(/\s+/g,r)
    }

    return v.trim()
  },
  //output function code
  _toString:function(os,n,_mini){
    var s="{";
    for(var k in os){
      var o=os[k];
      s+=k+":"
      if(!o){
        s+=o;
      }else if(o.constructor==Function){
        s+=o.toString()
      }else{
        try{
          s+=JSON.stringify(o)
        }catch(e){
          throw e;
        }
      }
      s+=","
    }
    s=s.substring(0,s.length-1)+"};";
    if(_mini){
      s=_JSHandler._cleanCode(s)
    }
    if(n){
      s="var "+n+"="+s;
    }
    return s;
  },
  _setFun:function(o,e,f){
    o=$(window.document).find(o);
    for(var i=0;i<o.length;i++){
      o[i][e]=f;
    }
  },
  _shareArray:function(a1,a2){
    a1=a1||[];
    a2=a2||[];
    if(a1.constructor!=Array){
      a1=[a1];
    }
    if(a2.constructor!=Array){
      a2=[a2];
    }
    var a=[];
    a1.forEach(function(v){
      if(a2.includes(v)){
        a.push(v);
      }
    });
    return a;
  },
  //o: old data, n: new data
  //_ignore: ignore data function
  //p: data key path
  _getSimpleDiffInJson:function(o,n,_ignore,_diffs,p){
    _diffs=_diffs||[]
    p=p||""
    let _found,_mapIdx=[];
    if(o&&n&&o.constructor==n.constructor&&[Array,Object].includes(o.constructor)){
      if(o.constructor==Array){
        if(!o.length){
          if(n.length){
            _diffs.push({
              key:p,
              from:o,
              to:n
            })
          }
        }else if(!n.length){
          _diffs.push({
            key:p,
            from:o,
            to:n
          })
        }else if(o[0].code||o[0].key){
          if(o.length==n.length){
            o.forEach((x,i)=>{
              if(!n.find((y,yi)=>{
                if(_mapIdx.includes(yi)){
                  return
                }
                if((y.code&&y.code==x.code)||(y.key&&y.key==x.key)){
                  if(i!=yi){
                    _diffs.push({
                      key:p,
                      from:i,
                      to:yi,
                      order:1
                    })
                  }else{
                    _mapIdx.push(yi)
                    _Util._getSimpleDiffInJson(x,y,_ignore,_diffs,p+"."+i)
                  }
                  return 1
                }
              })){
                _diffs.push({
                  key:p+"."+i,
                  from:x
                })
              }
            })
          }else if(o.length>n.length){
            let ds=[]
            o.forEach((x,i)=>{
              if(!n.find((y,yi)=>{
                if(_mapIdx.includes(yi)){
                  return
                }
                if((y.code&&y.code==x.code)||(y.key&&y.key==x.key)){
                  _mapIdx.push(yi)
                  _Util._getSimpleDiffInJson(x,y,_ignore,ds,p+"."+i)
                  return 1
                }
              })){
                ds.push({
                  key:p+"."+i,
                  from:x
                })
              }
            })
            ds.reverse()
            _diffs.push(...ds)
          }else{
            let ds=[]
            n.forEach((x,i)=>{
              if(!o.find((y,yi)=>{
                if(_mapIdx.includes(yi)){
                  return
                }
                if((y.code&&y.code==x.code)||(y.key&&y.key==x.key)){
                  _mapIdx.push(yi)
                  _Util._getSimpleDiffInJson(y,x,_ignore,ds,p+"."+i)
                  return 1
                }
              })){
                ds.push({
                  key:p+"."+i,
                  to:x
                })
              }
            })
            ds.reverse()
            _diffs.push(...ds)
          }
        }else if(o.length!=n.length){
          let no=o[0]||n[0]
          if(!no.key||!no.code){
            _diffs.push({
              key:p,
              from:o,
              to:n
            })
          }else{
            let _dIdx=0
            if(o.length>n.length){
              for(let k in o){
                let ds=[]
                _Util._getSimpleDiffInJson(o[k],n[parseInt(k)+_dIdx],_ignore,ds,p+"."+k)
                if(ds.length){
                  _diffs.push({
                    key:p+"."+k,
                    from:o[k]
                  })
                  _dIdx++
                  if(o.length==n.length+_dIdx+1){
                    break
                  }
                }
              }
            }else{
              for(let k in n){
                let ds=[]
                _Util._getSimpleDiffInJson(n[k],o[parseInt(k)+_dIdx],_ignore,ds,p+"."+k)
                if(ds.length){
                  _diffs.push({
                    key:p+"."+k,
                    to:n[k]
                  })
                  _dIdx++
                  if(o.length==n.length+_dIdx+1){
                    break
                  }
                }
              }
            }
          }
        }else{
          o.forEach((x,i)=>{
            _Util._getSimpleDiffInJson(x,n[i],_ignore,_diffs,p+"."+i)
          })
        }
      }else{
        for(let k in n){
          if(_ignore&&_ignore(k,p,o[k],n[k])){
            continue
          }
          _Util._getSimpleDiffInJson(o[k],n[k],_ignore,_diffs,p+"."+k)
        }
        for(let k in o){
          if(_ignore&&_ignore(k,p,n[k],o[k])){
            continue
          }
          if(!Object.keys(n).includes(k)){
            _diffs.push({
              key:p+"."+k,
              from:o[k]
            })
          }
        }
      }
    }else if(o!=n){
      _diffs.push({
        key:p,
        from:o,
        to:n
      })
    }
    return _diffs
  },
  _formatDiffJson:function(v1,v2,s,_csv){
    let w1="",w2="";
    s=s||""
    let ss=s+"  "

    if(v1&&v2&&v1.constructor==v2.constructor){
      if(v1.constructor==Object){
        w1+="{\n";w2+="{\n";
      }else if(v1.constructor==Array){
        w1+="[\n";w2+="[\n";
      }else{
        if(_csv){
          let v=_ideDiff._compareCSV(v1,v2,1)
          v1=v.fh+"\n";
          v2=v.th+"\n";
        }else{
          if(!_Util._isJsonValueString(v1)){
            v1=JSON.stringify(v1);
          }
          if(!_Util._isJsonValueString(v2)){
            v2=JSON.stringify(v2);
          }
  
          if(v1!==v2){
            if(v1&&v1.constructor==String&&v2&&v2.constructor==String){
              let w1=v1.split("\n"),
                  w2=v2.split("\n"),
                  _switch;
              if(w1.length==w2.length&&w1.length==1){
                w1=v1.split(/\\n/)
                w2=v2.split(/\\n/)
              }
              let r1=w1,
                  r2=w2
  
              if(w1.length<w2.length){
                _switch=1
                r1=w2
                r2=w1
                w1=r1
                w2=r2
              }
  
              r1.forEach((w,i)=>{
                let ww=w2[i]
                if(ww!=w){
                  r1[i]=_highlight(w);
                  r2[i]=_highlight(ww||"");
                }else{
                  r1[i]=w;
                  r2[i]=ww||"";
                }
              })
  
              v2=r2=r2.join("\n")
              v1=r1=r1.join("\n")
              if(_switch){
                v1=r2
                v2=r1
              }
            }else{
              v1=_highlight(v1);
              v2=_highlight(v2);
            }
          }
        }

        return {w1:v1,w2:v2}
      }
      Object.keys(v1).forEach(k=>{
        if(v1[k]!==undefined){
          let v;
          if(_csv&&k=="value"&&"cm".includes(v1.type)){
            v=_ideDiff._compareCSV(v1[k],v2[k],1)
            w1+=v.fh+"\n";
            w2+=v.th+"\n";
          }else{
            v=_Util._formatDiffJson(v1[k],v2[k],ss)
            w1+=ss;
            w2+=ss;
            if(v1.constructor==Object){
              w1+='"'+k+'": '
              w2+='"'+k+'": '
            }
            w1+=v.w1+",\n";
            w2+=v.w2+",\n";
          }
          w1=_addLine(w1,w2);
          w2=_addLine(w2,w1);
        }
      })
      Object.keys(v2).forEach(k=>{
        if(v1[k]===undefined){
          let v=_Util._formatDiffJson(v1[k],v2[k],ss)
          w1+=ss;
          w2+=ss;
          if(v1.constructor==Object){
            w1+='"'+k+'": '
            w2+='"'+k+'": '
          }
          w1+=v.w1+",\n";
          w2+=v.w2+",\n";
          w1=_addLine(w1,w2);
          w2=_addLine(w2,w1);
        }
      })
      w1=w1.replace(/(,)(\n*)$/,"$2")
      w2=w2.replace(/(,)(\n*)$/,"$2")
      w1+=s;
      w2+=s;
      if(v1.constructor==Object){
        w1+="}";
        w2+="}";
      }else{
        w1+="]";
        w2+="]";
      }
    }else{
      w1=_formatJsonWithIndent(v1,ss);
      w2=_formatJsonWithIndent(v2,ss);
      if(v1!==v2){
        w1=_highlight(w1);
        w2=_highlight(w2);
      }
    }
    return {w1:w1,w2:w2}

    function _addLine(w1,w2){
      return w1+"\n".repeat(Math.max(w2.split("\n").length-w1.split("\n").length,0))
    }

    function _highlight(v){
      return `<span class="bz-diff-item">${v}</span>`
    }
    function _formatJsonWithIndent(v,s){
      v=JSON.stringify(v,0,2)||""
      return v.replace(/^/gm,s).trim()
    }

  },
  _strToObj:function(vv){
    let v=vv||""
    if(v.constructor==String){
      v=v.trim()
      if(v.match(/(^\[.*\]$)|(^\{.*\}$)/s)){
        try{
          v=eval("v="+v)
          return v
        }catch(e){}
      }
    }
    return vv
  },
  _getDiffArray:function(a1,a2){
    var vs=[]
    for(var i=0;i<a1.length;i++){
      if(!a2.includes(a1[i])){
        vs.push(a1[i])
      }
    }
    for(var i=0;i<a2.length;i++){
      if(!a1.includes(a2[i])){
        vs.push(a2[i])
      }
    }
    return vs;
  },
  fetchBlob:function(uri, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', uri, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function(e) {
      if (_Util._isAPISucessStatus(this.status)) {
        var blob = this.response;
        if (callback) {
          callback(blob);
        }
      }
    };
    xhr.send();
  },
  _mergeURL:function(r,_url){
    _url= _url||"";
    r=r.trim()
    if(r && !_url.startsWith(r) && !_url.startsWith("http") && !_url.startsWith("/"+"/")){
      if(!_url){
        _url=r
      }else if(r.endsWith("/") && _url[0]=="/"){
        _url=r+_url.substring(1);
      }else if(!r.endsWith("/") && _url[0]!="/"){
        _url=r+"/"+_url;
      }else{
        _url=r+_url;
      }
    }
    return _url
  },
  _mergeDeep:function(_target, ..._sources) {
    if (!_sources.length) return _target;
    const _source = _sources.shift();

    if ((_target&&_target.constructor==Object) && (_source&&_source.constructor==Object)) {
      for (const _key in _source) {
        var o=_source[_key]
        if (o&&o.constructor==Object) {
          if(!_target[_key]||_target[_key].constructor!=Object){
            _target[_key]={}
          }
          _Util._mergeDeep(_target[_key], _source[_key]);
        } else if(!_target[_key]||_target[_key].constructor!=Function){
          _target[_key]=_source[_key];
        }
      }
    }

    return _Util._mergeDeep(_target, ..._sources);
  },
  _mergeDeepWithArray:function(_target, ..._sources) {
    if (!_sources.length) return _target;
    const _source = _sources.shift();

    if ((_target&&_target.constructor==Object) && (_source&&_source.constructor==Object)) {
      for (const _key in _source) {
        var o=_source[_key]
        if(o&&o.constructor==Array&&_target[_key]&&_target[_key].constructor==Array){
          _target[_key].push(...o)
        }else if (o&&o.constructor==Object) {
          if(!_target[_key]||_target[_key].constructor!=Object){
            _target[_key]={}
          }
          _Util._mergeDeepWithArray(_target[_key], _source[_key]);
        } else if(!_target[_key]||_target[_key].constructor!=Function){
          _target[_key]=_source[_key];
        }
      }
    }

    return _Util._mergeDeepWithArray(_target, ..._sources);
  },
  _clearAttributes:function(o){
    for(var k in o){
      if(!o[k]){
        delete o[k]
      }
    }
  },
  _findInInsensitive:function(r,p,_tmpPanel){
    try{
      if(_tmpPanel&&_tmpPanel.includes("BZ.TW")){
        _tmpPanel=0
      }
      return r&&r.find(p,_tmpPanel)
    }catch(e){
      BZ._reportAppInfo("Error on findInInsensitive: "+e.message)
      return r.find(_Util._updateAttrSelector(p))
    }
  },
  _getAttrPath:function(n,v){
    return ":attr("+n+"="+_Util._trimSpace(v.replace(/[\(\)\{\}\[\]]/g," "))+")"
  },
  _updateAttrSelector:function(v){
    return v.replace?v.replace(/(\[)([^=]+)(\=)([\"\']*)([^\]\"\']+)([\"\']*)( *)(i*)(\])/g,":attr($2$3$5)"):v
  },
  _getElementByXY:function(b,x,y,_ignoreElement){
    var _last;
    for(var i=0;i<b.children.length;i++){
      var o=b.children[i];
      var r=o.getBoundingClientRect();
      if(r.x<=x && r.x+r.width>=x && r.y<=y && r.y+r.height>=y){
        if(o!=_ignoreElement){
          _last=o;
        }
      }
      _last=this._getElementByXY(o,x,y,_ignoreElement)||_last;
    }
    return _last;
  },
  _isBetweenWords:function(w,i){
    if(w){
      if(i){
        w=w[0]
      }else{
        w=w[w.length-1]
      }
      return !w.match(/[a-z0-9]/i)
    }
    return 1
  },
  _splitWords:function(w,s){
    w=w.trim()
    s=s||"\n;,"
    for(var i=0;i<s.length;i++){
      if(w.includes(s[i])){
        s= w.split(s[i]);
        w=[]
        for(var i=0;i<s.length;i++){
          var ss=s[i].trim()
          if(ss){
            w.push(s)
          }
        }
        return w
      }
    }
    return [w]
  },
  _isDynamicValue:function(v){
    v=v.match(/[0-9]+/g);
    return !(!v || (v.length==1 && parseInt(v[0])<3))
  },
  _setBlankIFramePath:function(p,e){
    if(e.ownerDocument!=document){
      for(var i=0;i<window.frames.length;i++){
        if(window.frames[i]==e.ownerDocument.defaultView){
          p[0]="$(BZ.TW.document.body).find('IFRAME:eq("+i+")')[0].contentDocument"
        }
      }
    }
  },
  _findDomsWithSimplySolution:function(ps){
    let o=document.body,os,_lastX;
    try{
      ps.find(x=>{
        x=x||0
        if(x!="BZ.TW.document"){
          if(os&&os.toArray()){
            os=os.toArray()
            _Util._spliceAll(os,x=>_Util._isHidden(x))
            os=$(os)
          }
          if(os===undefined){
            if(x.match(/^body\>/i)){
              o=document
            }
            let xs=_matchTRTD(x,$(BZ.TW.document.body))
            if(xs){
              os=xs
              _lastX=x
              return
            }
            os=$(o).find(x)
          }else if(x&&!$.isNumeric(x)){
            let xos=[],_idx
            
            let xs=_matchTRTD(x,os)
            if(xs){
              os=xs
              _lastX=x
              return
            }
            if(x.match(/\:(eq\([0-9]+\)|last|first)$/)){
              x=x.split(":")
              _idx=x.pop()
              x=x.join(":")
            }
            if(_lastX.match(/contains/i)){
              os=os.toArray()
              let rs=[]
              while(os.length){
                let oo=os.pop();
                rs.push(oo)
                let xo=$(oo).find(x).toArray()
                if(xo.length){
                  xo.reverse()
                  xo.forEach(y=>{
                    xos.unshift(y)
                  })

                  _Util._spliceAll(os,xx=>$(xx).find(oo).length)
                }
              }
              while(!xos.length&&rs.length&&rs[0]&&rs[0].tagName!="BODY"){
                rs=rs.map(r=>r.parentElement)
                rs.forEach(r=>{
                  if(r){
                    let xo=$(r).find(x)
                    if(xo.length){
                      xo.reverse()
                      xo.forEach(y=>{
                        xos.unshift(y)
                      })
                    }
                  }
                })
              }
              os=$(xos)
            }else{
              os=os.find(x,os)
            }
            if(os.length){
              if(_idx=="first"){
                os=[os[0]]
              }else if(_idx=="last"){
                os=[os[os.length-1]]
              }else if(_idx){
                os=[os[_idx.match(/[0-9]+/)]]
              }
              if(_idx){
                os=$(os)
              }
            }
          }else if(os.length){
            if(_lastX.match(/contains/i)){
              os=os.toArray()
              let xo=[],lo
              while(os.length){
                let oo=os.pop();
                xo.unshift(oo)
                
                _Util._spliceAll(os,xx=>$(xx).find(oo).length)
              }
              os=xo
            }
            if(os[x]){
              os=[os[x]]
            }else{
              os=0
              return 1
            }
          }
          _lastX=x
        }
      })
    }catch(e){}
    return _Util._isEmpty(os)?0:os
    
    function _matchTRTD(x,os){
      if(x.match(/\>[a-zA-Z]+\:(eq\(|last|first|Contains|attr|endContains|equal)/)||x.match(/\>[a-zA-Z]+$/)||x.match(/\>[a-zA-Z]+[.#]/)){
        x=x.split(">")
        let ss=os
        x.forEach(y=>{
          ss=ss.find(y)
        })
        os=ss.toArray()
        return os
      }
      
    }
  },
  _formatFun:function(s,t){
    t=t||""
    let f="\"'`/",b,fs=[],w="",
        k={
          "(":")",
          "[":"]",
          "{":"}"
        },ks=[],_newLine;
    for(let i=0;i<s.length;i++){
      let c=s[i]
      if(c=="\\"){
        b=1
      }else if(b){
        b=0
      }else if(c=="\r"){
        continue
      }else if((c==" "||c=="\t")&&_newLine){
        continue
      }else if(f.includes(c)){
        if(fs[0]==c){
          fs.shift()
        }else{
          fs.unshift(c)
        }
      }else if(!fs.length){
        if(k[c]){
          ks.unshift({k:c,i:i})
          if(c=="{"){
            w+=c+"\n"
            _newLine=1
            t+="  "
            w+=t
            while(s[i+1]&&s[i+1].match(/\s/)){
              i++
            }
            continue
          }
        }else if(ks[0]&&k[ks[0].k]==c){
          let ck=ks.shift()
          if(c=="}"){
            t=t.substring(2)
            if(_newLine){
              w=w.trim()
            }
            w+="\n"+t+c
            while(s[i+1]&&s[i+1].match(/\s/)){
              i++
            }
            continue
          }
        }else if(c==";"&&(!ks[0]||ks[0].k=="{")){
          w+=c+"\n"+t
          _newLine=1
          while(s[i+1]&&s[i+1].match(/\s/)){
            i++
          }
          continue
        }
      }
      w+=c
      _newLine=c=="\n"
      if(_newLine){
        w+=t
      }
    }
    return w
  },
  _isFunction:function(s){
    if(s){
      if(s.constructor==String){
        s=s.trim()
        if(s.match(/^function\(.*\)\{.*\}$/s)){
          return 1
        }else if(s.match(/^\(.*\)=>\{.*\}$/s)){
          return 1
        }
      }else if(s.constructor==Function){
        return 1
      }
    }
  },
  _newFindDom:function(){
    document._Contains=document._input=document._link=document._near=document._after=document._before=document._endContains=document._rowcol=0
  },
  _findDoms:function(_paths,_errOnHidden,_bRetry,_toShow){
    extendJQuery()
    _Util._newFindDom()
    if(_paths.constructor==String){
      _paths=_paths.split("\n")
    }
    if(!bzComm._isIDE()){
      let p=_paths[0]
      if(p&&p.constructor==String&&p.includes("frame")){
        _paths[0]="BZ.TW.document"
      }else if(p&&p.constructor==String&&!p.includes("BZ.TW.document")){
        _paths.unshift("BZ.TW.document")
      }
    }

    if(!_paths){
      return
    }
    let _showIdx=_toShow?-1:_paths.findIndex(x=>x&&x.match&&x.match(/:show([\:\.\[\#]|$)/))
    if(_showIdx!=-1){
      let xs=_paths.splice(_showIdx+1)
      let oo=_Util._findDoms(_paths,_errOnHidden,_bRetry,1)
      oo.forEach(y=>{
        if(_Util._isHidden(y)&&!y.getBoundingClientRect().width){
          y._bzShow=1
          $(y).show()
        }
      })
      _paths.push(...xs)
      let o=_Util._findDoms(_paths,_errOnHidden,_bRetry,1)
      
      oo.forEach(y=>{
        if(y._bzShow){
          delete y._bzShow
          $(y).css({display:""})
        }
      })
      return o
    }

    let _orgPath=_Util._clone(_paths)
    
    var os,_root,_cells,_osInHidden=[]
    if(!_paths.find(x=>{
      return !$.isNumeric(x)&&(x.includes("shadowRoot")||x.match(/^canvas:/i))
    })&&_paths.find(x=>{
      return !$.isNumeric(x)&&x.match(/\:(first|last|eq)/)
    })){
      os=_Util._findDomsWithSimplySolution(_paths)
      if(os&&os.length){
        if(os.toArray){
          os=os.toArray()
        }
        return os
      }
      os=0
    }

    // let _idx=_paths.pop()||0;
    // if(!$.isNumeric(_idx)){
      // _paths.push(_idx)
      // _idx=null
    // }

    let _idx=null;
    _paths=_paths.filter(x=>{
      if($.isNumeric(x)){
        _idx=parseInt(x)
      }else{
        return 1
      }
    })

    let _sufIdx=_paths[_paths.length-1]
    if(!$.isNumeric(_sufIdx)){
      //for :input
      if(_paths.length>2&&_sufIdx.match(/:input\(/)){
        _paths.pop()
        _paths=_Util._findDoms(_paths);
        let os=[]
        _paths.forEach(x=>{
          $util._tmpFormForSearchingInput=x
          os.push(...$(x).find(_sufIdx).toArray())
        })
        if(os.length&&_idx!==undefined){
          os=[os[_idx||0]]
        }
        return os
      }
      //for quick path
      if(_sufIdx.match(/^body\>[^\>]+\>/i)){
        return [_Util._getElementByQuickPath(_sufIdx)]
      }
      _sufIdx=_sufIdx.split(":").pop()
      
      if(!_sufIdx.match(/last|first/)){
        _sufIdx=0
      }else{
        _paths[_paths.length-1]=_paths[_paths.length-1].replace(/[:](last|first)$/,"")
      }
    }

    try{
      if (_paths && _paths.length>0) {
        //for shadowRoot
        while(_paths.includes("shadowRoot")){
          if(os){
            let tmp=_paths.shift();
            if(tmp=="shadowRoot"){
              for(var i=0;i<os.length;i++){
                if(os[i].shadowRoot){
                  os=_root=$(os[i].shadowRoot)
                  break
                }
              }
            }else{
              os=_root=os.find(tmp)
            }
          }else{
            let ps=_paths.splice(0,_paths.indexOf("shadowRoot"))
            os=_Util._findDoms(ps)
            for(var i=0;i<os.length;i++){
              if(os[i].shadowRoot){
                os=_root=$(os[i].shadowRoot)
                break
              }
            }
            _paths.shift()
          }
        }
        if(!os){
          os=_paths[0];
          if(os.constructor==String){
            os=_root=$(document)
            if(_paths[1]&&_paths[1].toUpperCase().startsWith("IFRAME")){
              os=_root=$(os).find(_paths[1])
              if(os.length){
                os=_root=$(os.toArray().map(x=>{
                  return x.contentWindow.document
                }))
                _paths.splice(1,1)
              }else{
                return
              }
              
            }
          }else{
            os=_root=$(os)
          }
          if (_paths.length==1 || !_paths[1].toUpperCase) {
            return [os[0]];
          }else if(_paths[1]=="defaultView"){
            return [window.BZ?BZ.TW:window];
          }
        }
        /*
        var _cell=_Util._findElementFromParent(_root,_paths,_idx)
        if(_cell){
          return [_cell]
        }
        */
        
        let _curPath=_paths[_paths.length-1]

        _cells=_Util._findInInsensitive(_root,_curPath,_paths[_paths.length-2]);
        _cells=_cells.toArray?_cells.toArray():_cells

        if(_curPath.includes(":before")){
          _cells.reverse()
        }

        for(var i=0;i<_cells.length;i++){
          var o=_cells[i];
          if(_Util._isHidden(o)){
            _osInHidden.push(o)
            _cells.splice(i--,1)
          }
        }
        _cells=_Util._findChildrenDomFromList(_cells)
        _cells=_cells.toArray?_cells.toArray():_cells
        if(!_errOnHidden){
          _cells.push(..._osInHidden)
        }
        if(!_cells.length){
          return []
        }
        if(_paths.length>2){
          for(var i=1;i<_paths.length-1;i++){
            os=os.find(_Util._findInInsensitive(_root,_paths[i],_paths[i-1]));
            os=_getOffset(_paths[i],os)
          }
          if(!os.length){
            os=_root;
            for(var i=1;i<_paths.length-1;i++){
              os=os.find(_Util._findInInsensitive(_root,_paths[i].replace(/\:endContains\(/g,":Contains("),_paths[i-1]));
            }
          }
          if(!os.length){
            return []
          }else if(_cells.length==1&&$(os).find(_cells).length){
            return _getOffset(_curPath,_cells)
          }
          if(os.length>1&&_paths.find(x=>x&&x.match&&x.match(/\:(contains|endcontains|equal|endequal)\(/i))){
          // if(os.length>1&&$.isNumeric(_idx)){
            var nos=_Util._findChildrenDomFromList(os,_cells)
            if(!nos.length){
              return []
            }
            var oo=$(_root).find("*");
            var ii=oo.index(nos[0])
            for(var i=0;i<_cells.length;i++){
              if(oo.index(_cells[i])<ii && _cells.length){
                _cells.splice(i--,1)
              }
            }
            _cells.sort(function(a,b){
              var ba=Boolean(nos.find(a)[0]);
              var bb=Boolean(nos.find(b)[0]);
              if(ba==bb){
                return oo.index(a)-oo.index(b)
              }
              return ba?-1:1
            })
          }else{
            _cells=os.find(_cells)
          }
        }
        _cells=_cells.toArray?_cells.toArray():_cells

        if(_cells&&_cells[0]&&_cells[0].tagName=="CANVAS"&&_orgPath.join(" ").includes(":textElement")){
          let _txt=_descAnalysis._retrieveTextForElementPathItem(_orgPath)
          if(_idx===null){
            let n=0
            _cells.forEach((c,i)=>{
              c.bzTxtElement=c.bzTxtElement||TWHandler._getCanvasTextElement(c,_txt,0)
            })
            return _getOffset(_curPath,_cells)
          }else{
            let i=0;
            let cc=_cells.find(c=>{
              let cs=TWHandler._getCanvasTextElement(c,_txt)
              if(cs.length+i>_idx){
                c.bzTxtElement=cs[_idx-i]
                return 1
              }else{
                i+=cs.length
              }
            })
            if(!cc){
              cc=_cells[_cells.length-1]
              let cs=TWHandler._getCanvasTextElement(cc,_txt)
              cc.bzTxtElement=cs[cs.length-1]
            }
            return _getOffset(_curPath,[cc])
          }
        }else{
          if(_sufIdx=="first"){
            return _getOffset(_curPath,[_cells[0]])
          }else if(_sufIdx=="last"){
            return _getOffset(_curPath,[_cells.pop()])
          }else if(_idx===null){
            return _getOffset(_curPath,_cells)
          }else{
            return _getOffset(_curPath,[_cells[_idx]||_cells[_cells.length-1]])
          }
        }
      }
    }catch(e){
      BZ._reportAppInfo("Error on findDoms: "+e.message)
      console.log(e.stack)
      if(os && os.constructor==String && !_bRetry){
        return this._findDoms(_paths,_errOnHidden,1);
      }
    }
    return null;
    
    function _getOffset(v,os){
      let _toArray
      if(os&&os.toArray){
        _toArray=1
        os=os.toArray()
      }
      v=v.match(/(\[[^\]]+\])|(\:[^\(\.\#\[]+(\([^\)]*\)+([^:\.\#]+\))*)?)|([\.\#][^\:\[\.\#]+)/g)
      if(!v||!os){
        if(_toArray){
          os=$(os)
        }
        return os
      }
      os=os.filter(x=>x).map(o=>{
        v.forEach(x=>{
          if(o){
            if(x==":next"){
              o=o.nextElementSibling
            }else if(x==":previous"){
              o=o.previousElementSibling
            }else if(x==":parent"){
              o=o.parentElement
            }
          }
        })
        return o
      })
      if(_toArray){
        os=$(os)
      }
      return os
    }
  },
  _findDomWithPanels:function(d,ps,pp){
    ps=ps||[]
    if(d.constructor!=Array){
      d=[d]
    }
    var _idx=d.pop()
    if(!$.isNumeric(_idx)){
      d.push(_idx)
      _idx=0
    }
    var ds=_Util._findDoms(d,pp)
    if(!ds||!ds.length){
      return
    }else if(ds.length==1){
      return ds[0]
    }
    for(var i=ps.length-1;i>=0;i--){
      var p=ps[i]
      if(!p){
        continue
      }
      var pps=_Util._findDoms(p)
      var dds=$(pps).find(ds)
      if(!dds||!dds.length){
      }else if(dds.length==1){
        return dds[0]
      }else{
        ds=dds
      }
    }
    if(ds){
      return ds[_idx]||ds[0]
    }
  },
  _findAfterDoms:function(o){
    var os=[o];
    while(o.parentElement&&o.tagName!="BODY"){
      $(o).nextAll().each(function(i,oo){
        os.push(oo)
      })
      o=o.parentElement
    }
    return $(os)
  },
  _findChildrenDomFromList:function(os,_cells){
    var ns=[],_last;
    for(var i=os.length-1;i>=0;i--){
      if(_cells && !$(os[i]).find(_cells).length){
        continue
      }else if(!ns.length||!$(os[i]).find(ns).length){
        ns.unshift(os[i])
      }
    }
    return $(ns)
  },
  _findTextElement:function(e){
    while(e && !$(e).text().trim() && e.tagName!="BODY"){
      e=e.parentElement
    }
    return e
  },
  _mergeSummary:function(sd,d,k){
    if(d){
      if(!sd[k]){
        sd[k]=d
      }else if(sd[k]!=d){
        Object.keys(d).forEach(x=>{
          sd[k][x]+=d[x]
        })
      }
    }
  },
  _getClosestElement:function(p,o,c){
    if($(p).is(c)){
      return p
    }
    let e=$(p).find(c).toArray()
    if(e.length){
      let os=$(p).find("*")
      let oi=os.index(o),mi=0,mo;
      for(let i=0;i<e.length;i++){
        let ee=e[i]
        let x=Math.abs(oi-os.index(ee))
        if(x<mi||!mi){
          mi=x
          mo=ee
        }
      }
      return mo;
    }else if(p&&p.tagName!="BODY"){
      return _Util._getClosestElement(p.parentElement,o,c)
    }
  },
  // _findNearTxt:function(a,_compareWord){
    // let ar=a.getBoundingClientRect(),_org=a,_hide
    // _compareWord=(_compareWord||"").toLowerCase()
    // var _right=["radio","checkbox"].includes(a.type),_stop=0,_bkLabel="";
    
    // var match=0,_txt="";
    // while(a.tagName!="BODY" && a.parentNode&&!_stop){
      // var p=a.parentNode,
          // _start=!_right;
      // let w=(p.innerText||"").trim()
      // if(w){
        // for(let i=0;i<p.childNodes.length;i++){
          // let o=p.childNodes[i]
          // if(o==a){
            // _start=!_start
            // continue
          // }
          // if(_start){
            // if(o.nodeType==1){
              // _txt+=" "+_formatTxt($util.getElementText(o))
            // }else if(o.nodeType==3){
              // _txt+=" "+_formatTxt(o.textContent)
            // }
            // _txt=_txt.trim()
            // if(_txt==_compareWord||_txt.match(new RegExp(_compareWord))){
              // _txt=_compareWord
            // }
          // }else if(!_txt&&o.nodeType==1){
            // w=_formatTxt($util.getElementText(o))||""
            // if(w==_compareWord||w.match(new RegExp(_compareWord))&&_Util._positionAfterElement(a,o)){
              // _txt=w
              // break
            // }else if(w){
              // break
            // }
          // }else if(o.nodeType==3&&(o.textContent+"").trim()){
            // break
          // }
        // }
        // if(_txt){
          // break
        // }
      // }
      
      // a=p;
    // }
    
    // return _txt
    
    // function _formatTxt(w){
      // return _Util._trimSpace(_Util._filterTxt(w.toLowerCase()))
    // }
  // },
  _findNearTxt:function(a,_compareWord){
    let ar=a.getBoundingClientRect(),_org=a
    _compareWord=(_compareWord||"").toLowerCase()
    var _right=["radio","checkbox"].includes(a.type),_stop=0,_bkLabel="";

    var _start=!_right,_match=0,_txt;
    while(a.tagName!="BODY" && a.parentNode&&!_stop){
      var p=a.parentNode;
      let os=$(p).find(_org.tagName)
      if(!_bkLabel){
        let w=$util.getElementText(p)
        if(w){
          w=_Util._filterTxt(w.toLowerCase());
          w=_Util._trimSpace(w)
          if((w==_compareWord||w.match(new RegExp(_compareWord)))&&os.length==1){
            _txt=w
            break
          }
        }else{
          a=p
          continue
        }
      }
      let _first=os[0]
      if(_bkLabel&&_first!=_org&&!_Util._isHidden(_first)){
        _txt=_bkLabel
        break 
      }
      for(var i=0;i<p.childNodes.length;i++){
        var n=p.childNodes[i];
        if(n.nodeType==1&&_Util._isHidden(n)){
          continue
        }
        if(n==a){
          if(_start){
            break
          }else{
            _start=1
          }
        }else if(!_start){
          continue
        // }else if(n.nodeType==1&& _cssHandler._isInput(n)){
          // break
        }else if((n.nodeType==1||n.nodeType==3)){
//          _stop=1
          
          var v1=_Util._filterTxt($util.getElementText(n).toLowerCase()).trim();
          if(v1&&v1!=_bkLabel){
            _stop=_txt=v1
            if(!_right&&v1.length>50){
              _stop=0
            }
          }
          if(_right && _txt){
            break
          }
        }
      }

      if(!_bkLabel&&_compareWord&&_stop&&_txt&&_txt!=_compareWord&&!v1.includes(_compareWord)&&["INPUT","TEXTAREA"].includes(_org.tagName)&&!["radio","checkbox","submit","butt","image","reset"].includes(_org.type)){
        let nr=p.getBoundingClientRect()
        
        if(ar.top-nr.top<15&&ar.left-nr.left<20){
          _bkLabel=_txt
          _stop=_txt=""
          continue
        }
      }

      
      a=p;
    }

    return (_txt||"").replace(/\*+$/,"").replace(/\s+/g," ").trim()
  },
  _toTrimSign:function(v,n){
    v=(v||"").replace(_Util._trimSign,"")
    if(n){
      v=_Util._retrieveTopWords(v,n)
    }
    return (v||"").replace(_Util._trimSign,"")
  },
  /*
  d:data, pick attribute name from data
  {
    Name:$project.data,
    Age:15,
    data:{
      value:"abc"
    }
  }
  ==>
  ["Name","Age","data"]
  */
  _pickAttrFromStringJSON:function(d){
    if(d){
      if(d.constructor==String){
        let vs=[]
        d=d.trim()
        if(d[0]=="{"&&d[d.length-1]=="}"){
          d=d.substring(1,d.length-1).trim()
          let p=d.match(/$args\: *\[[^.]+\]/)
          if(p){
            d=d.replace(p[0],"")
          }
          while(d.includes("{")&&d.indexOf("{")<d.indexOf("}")){
            d=d.replace(/\{[^\{\}]*\}/g,"''")
          }
          while(d.includes("[")&&d.indexOf("[")<d.indexOf("]")){
            d=d.replace(/\[[^\[\]]*\]/g,"''")
          }
          d=d.replace(/\:[^,]*(,|$)/g,":''$1")
          d=d.replace(/:''/g,"")
          d=d.replace(/\s/g,"")
          d=d.split(",")
          
          _Util._spliceAll(d,v=>{return !v})

          vs=d
        }
        return vs
      }else{
        return Object.keys(d)
      }
    }
  },
  _retrieveTopWords:function(w,_size){
    if(w && w.length>_size){
      w=w.split(" ");
      var ww=w[0],i=1
      while(ww.length<_size){
        ww+=" "+w[i++]
      }
      w=ww
    }
    return w
  },
  _getElementRoot:function(e){
    let r=0;
    while(e.parentNode){
      e=e.parentNode;
      if(e.constructor==ShadowRoot){
        return e
      }else if(e.tagName=="BODY"){
        r=e
      }
    }
    return r||e
  },
  _hasDeepContent:function(e){
    var _hasNone=0
    for(var i=0;i<e.children.length;i++){
      var o=e.children[i];
      if($(o).css("pointer-events")=="none"){
        _hasNone=1
      }else if(!["STYLE","SCRIPT","NOSCRIPT","OPTION"].includes(o.tagName)){
        return 1
      }
    }
    return 0
  },
  _getStringBySize:function(v,i,_back){
    i=i||30
    if(v&&v.length>i){
      if(_back==1){
        return "... "+ v.substring(v.length-i)
      }else if(_back){
        i=parseInt(i/2)
        return v.substring(0,i)+"... "+ v.substring(v.length-i)
      }

      return v.substring(0,i)+" ..."
    }
    return v
  },
  getEONumList:function(n){
    let ls=[];
    for(let i=0;i<n;i++){
      ls.push(i)
    }
    let ns=[],w=0;
    while(ls.length){
      if(ls.length==1){
        ns.push(ls.pop())
      }else{
        let i=Math.ceil(ls.length/2)
        if(!w){
          ns.push(ls.splice(i,1).pop())
        }else if(w==1){
          ns.push(ls.splice(Math.ceil(parseInt(ls.length/2)/2),1).pop())
        }else if(w==2){
          ns.push(ls.splice(parseInt((ls.length+Math.ceil(ls.length/2))/2),1).pop())
        }
        w++
        if(w==3){
          w=0
        }
      }
    }
    return ns
  },  
  _compressBase64:function(bs){
    var q=9,_best;
    bs=bs.substring(22);
    
    while(1){
      var h="",hh="",k=0,j=0;
      s=bs
      while(s){
        var v=s.substring(0,q)
        var sss=s.substring(q)
        var ss=_Util._replaceAll(sss,v,"*"+j)
        if(sss!=ss){
          k+=(sss.length-ss.length)
          h+=v
          s=ss
          j++
        }else{
          hh+=s[0]
          s=s.substring(1)
        }
      }
      q++;
      if(!_best || _best>k){
        _best=k
        _bestQ=q
      }else{
        return _bestQ+"\n"+h+"\n"+hh
      }
    }
  },
  _isOverlapping:function(a,b){
    let ar=a.getBoundingClientRect()
    let br=b.getBoundingClientRect()
    if(ar.left<=br.left+10 && ar.right>=br.right-10 && ar.top<=br.top+10&&ar.bottom>=br.bottom-10){
      return 1
    }
    return br.left<=ar.left+10 && br.right>=ar.right-10 && br.top<=ar.top+10&&br.bottom>=ar.bottom-10
  },
  _unCompressBase64:function(s){
    
  },
  _removeNoJSONData:function(a){
    if(a&&![Number,String,Object,Array].includes(a.constructor)){
      return 
    }
    if(a&&[Array,Object].includes(a.constructor)){
      for(var k in a){
        if(!_Util._removeNoJSONData(a[k])){
          delete a[k]
        }
      }
    }
    return 1
  },
  _removeStringSign:function(v){
    return v?v.replace(/(^["'`])|(["'`]$)/,""):v
  },
  _refDataToJSON:function(vs,p){
    p=p||""
    let w=""
    vs.forEach(x=>{
      if(w){
        w+=",\n"
      }
      if(x._key){
        if(x._value.constructor==Array){
          w+=p+"  \""+x._key+"\" : "+_Util._refDataToJSON(x._value,p+"  ")
        }else{
          w+=p+"  \""+x._key+"\" : "+x._value
        }
      }else{
        if(x._value.constructor==Array){
          w+=p+_Util._refDataToJSON(x._value,p+"  ")
        }else{
          w+=p+"  "+x._value
        }
      }
    })
    if(vs[0]){
      if(vs[0]._key){
        w=p+"{\n"+w+"\n"+p+"}"
      }else{
        w=p+"[\n"+w+"\n"+p+"]"
      }
    }else{
      return "{}"
    }
    return w
  },
  _isJsonKey:function(s){
    return s&&(s.match(/^[0-9]*[.]?[0-9]*$/))||(!s.match(/^[0-9]/)&&s.match(/(^"[^"]*"$)|(^`[^`]*`$)|(^`[^`]*`$)|[\wÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC]+/))
  },
  _isJsonValueString:function(v){
    if(v&&v.constructor!=String){
      return
    }
    v=(v||"").trim()
    if(!v){
      return
    }else if(v.match(/(^".+"$)|(^'.+'$)|(^`.+`$)/)){
      let k=v[0]
      v=v.substring(1,v.length-1).replace(/[\\][\\]/g,"").replace(/[\\]['"`]/g,"")
      
      return !v.includes(k)
    }else if(v.match(/(^\{.+\}$)|(^\[.+\]$)/s)){
      return 1
    }else if(v.match(/(^\(.+\)$)/)){
      return _Util._isJsonValueString(v.substring(1,v.length-1))
    }else if(v.match(/(^["].*["]$)|(^['].*[']$)|(^[`].*[`]$)/)||$.isNumeric(v)){
    //}else if(v.match(/[^\?]+\:/)){
    }else{
      return
    }
    return 1
  },
  _parseJSONWithRefDataToObj:function(v,_throwError){
    v=v||""
    if(v.constructor!=String){
      v=JSON.stringify(v,0,2)
    }
    v=v.trim()
    if(!v){
      return []
    }
    
    if(v.replace(/\s/g,"")=="{}"){
      return []
    }
    let vs=[],
        _left=_bzJSEditor.bd,
        _right=_bzJSEditor.db,
        _key,_value,lc=[],rc=[],s="",b,_startIdx
    
    for(let i=0;i<v.length;i++){
      let c=v[i]
      if(c=="\\"){
        b=!b
      }else if(b){
        b=0
      }else if(c.match(/\s/)&&!s){
        continue
      }else if(c==':'&&lc[0]=="{"){
        let ss=s.trim()
        if(ss&&!_key){
          if(_Util._isJsonKey(ss)){
            _key=ss
            s=""
            continue
          }else{
            return _throw(v,i)
          }
        }else if(!ss){
          return _throw(v,i)
        }else if(!ss.includes("?")&&lc.length==1){
          return _throw(v,i)
        }
      }else if((c==","||c==_left[lc[0]])&&lc.length==1){
        s=s.trim()||""
        if(!_Util._isJsonValueString(s)&&!_Util._hasCode(s)&&!$.isNumeric(s)&&!s.match(/^(true|false)$/)){
          return _throw(v,i)
        }
        if(_key){
          vs.push({
            _key:_key,
            _value:s
          })
        }else if(lc[0]=="["){
          vs.push({_value:s})
        }else{
          return _throw(v,i)
        }
        _key=_value=s=""
        if(c!=","){
          lc.pop()
        }
        continue
      }else if(!lc[0]&&(c=="{"||c=="[")&&!vs.length){ //start
        lc.unshift(c)
        continue
      }else if(!lc[0]){ //not start { and [
        return _throw(v,i)
      }else if(c==_left[lc[0]]){
        lc.shift()
      // }else if(lc[0]=="{"&&!_key&&!s&&!c.match(/["'a-zA-ZÀ-Üà-øoù-ÿŒœ\u4E00-\u9FCC\$\_]/)){
        // return _throw(v,i)
      }else if(_left[c]){
        lc.unshift(c)
      }
      s+=c
    }
    if(s){
      return _throw(v,v.length-s.length)
    }
    if(vs.find(x=>{
      if(x._key&&"'\"`".includes(x._key[0])){
        x._key=x._key.substring(1,x._key.length-1)
      }
      if(x._value.match(/^[\{\[]/)){
        try{
          x._value=_Util._parseJSONWithRefDataToObj(x._value,1)
        }catch(ex){
          v=ex.message
          return 1
        }
      }
    })){
      return _throw(v,0)
    }
    return vs
    function _throw(v,i){
      return
      // if(i){
      //   i-=25
      //   if(i<0){
      //     i=0
      //   }
      // }
      // let _msg=_bzMessage._system._error._parseParameterError+": "+v.substring(i,i+50)
      // if(_throwError){
      //   throw new Error(_msg)
      // }
      // alert(_msg)
    }
  },
  _showLabelMenu:function(k,e,x,y,t,w){
    let o=$("#"+k)[0]
    if(!o){
      o=$(`<div id='${k}' onmouseleave='this.remove()' class='bz-menu-with-arrow-${w}'><div class='bz-menu-with-arrow-out-${w}'></div><div class='bz-menu-with-arrow-in-${w}'></div><pre class='bz-menu-with-arrow-box'></pre></div>`)[0]
    }
    if(o._curData&&o._curData.x==x&&o._curData.y==y&&o._curData.t==t){
      return
    }
    o._curData={x:x,y:y,t:t}
    o=$(o)
    o.css({opacity:0})
    o.appendTo(document.body)
    o.find(".bz-menu-with-arrow-box").text(t)
    let r=o[0].getBoundingClientRect()
    o.find(".bz-menu-with-arrow-out-"+w).css({top:r.height-5+"px",left:r.width/2-2+"px"})
    o.find(".bz-menu-with-arrow-in-"+w).css({top:r.height-6+"px",left:r.width/2-2+"px"})
    o.css({opacity:1,left:x-r.width/2+"px",top:y-r.height-7+"px"})
    return o[0]
  },
  _isCompleteBlock:function(w){
    w=w.replace(/\\\\/g,"").replace(/(\\\"|\\\'|\\\(|\\\)|\\\[|\\\]|\\\{|\\\})/g,"").replace(/(\"[^\"]*\"|\'[^\']*\')/g,"")
    let ks=_bzJSEditor._leftKeys;
    return !w.match(/[\"\']/)&&!['[','{','('].find(x=>{
      m1=w.match(new RegExp("[\\"+x+"]","g"))||[]
      m2=w.match(new RegExp("[\\"+ks[x]+"]","g"))||[]
      return m1.length!=m2.length
    })
  },
  _getRegexByBZName:function(r,_final){
    while(r&&r[0]=="/"&&r[r.length-1]=="/"){
      r=r.substring(1,r.length-1)
    }
    if(r&&r.match(/^BZ-/i)){
      var rr=r.toUpperCase()
      for(var i=0;i<_IDE._data._curVersion.setting.attributeMap.length;i++){
        var v=_IDE._data._curVersion.setting.attributeMap[i]
        if(rr=="BZ-"+v.key.toUpperCase()){
          r=v.regex
          r=r.substring(1,r.length-1)
          break
        }
      }
    }
    if(_final&&_IDE._data._curModule){
      r=r.replace("{module}",_IDE._data._curModule._data.name).replace("{num}","[0-9]+").replace("{timestamp}","[0-9]{13}").replace("{time}","[0-9]{6}")
    }
    return r
  },
  _readyExecute:function(_ckFun,_exeFun,_time){
    setTimeout(()=>{
      if(_ckFun()){
        _exeFun()
      }else{
        _Util._readyExecute(_ckFun,_exeFun,_time)
      }
    },_time||100);
  },
  _parseExpression:function(s,_headerSplit,_logic){
    let w="",b,p=[],g,gs=[],hs=[],pml={
      "'":"'",
      '"':'"',
      "{":"}",
      "(":")",
      "[":"]",
      "/":"/",
      "`":"`"
    },pmr=_Util._swapKeyValue(pml),_split=""
    
    for(let i=0;i<s.length;i++){
      let c=s[i]
      if(b){
        w+=c
        b=0
      }else if(c=="\\"){
        b=1
      }else if(p.length){
        w+=c
        if(pml[p[p.length-1]]==c){
          p.pop()
        }else if(pml[c]){
          p.push(c)
        }
      }else if(_headerSplit&&c.match(_headerSplit)){
        if(gs.length||w){
          hs=hs.concat(gs)
          w=w.trim()
          if(w){
            hs.push(w)
            w=""
          }
          gs=[]
          if(_split){
            continue
          }
        }
        _split+=c.match(_headerSplit)[0]
        _split=_split.replace("==","=")
      }else if(pml[c]){
        p.push(c)
        w+=c
      }else if(_logic&&(c=="|"||c=="&")){
        if(w){
          gs.push(w)
        }
        gs.push(c)
        w=""
      }else if(!c.match(/\s/)||w){
        w+=c
      } 
    }
    if(w){
      gs.push(w)
    }
    gs=gs.map(x=>{
      while(x.match(/^[\(](.+)[\)]$/)){
        x=x.substring(1,x.length-1)
      }
      return x
    })
    if(_headerSplit){
      if(hs.length){
        return {_headers:hs,_groups:gs,_split:_split}
      }else{
        return {_headers:gs,_groups:[],_split:_split}
      }
    }else{
      return gs
    }
  },
  _findRadioByText:function(os,_txt){
    let r,ss=[...os],t=_txt.trim().toLowerCase();
    while(1){
      os=os.map(x=>x.parentElement).filter(x=>x)
      let ss=new Set(os)
      if(os.length){
        r=os.find(x=>x.innerText.trim().toLowerCase()==t)||os.find(x=>x.innerText.trim().toLowerCase().includes(t));
        if(r){
          return r
        }
      }else{
        break
      }
    }
  }
};
window.BZ={
  _curShareData:0,
  // _codeToKeyDataMap:{
  //   "BZ._data._autoRunning":"autoRunning",
  //   "_IDE._data._setting":"ideSetting",
  //   "_config":"config",
  //   "BZ._curEnv":"curEnv",
  //   "_aiAuthHandler._data":"aiAuthHandler",
  //   "BZ._data._curProject":"curProject",
  //   "_IDE._data._curVersion":"curVersion",
  //   "_IDE._data._curModule._data":"curModule",
  //   "_IDE._data._curTest._data":"curTest",
  //   "_IDE._data._curAction":"curAction",
  //   "_aiDataHandler":"aiDataHandler",
  //   "_cooperatorHandler._data":"cooperatorHandler",
  //   "BZ._hasVideo":"hasVideo",
  //   _dictionaryConfig:"dictionaryConfig",
  //   "BZ._data._status":"bzStatus",
  //   "_ideDataBind._data._key":"ideDataBindKey",
  //   "_ideDataBind._data._limit":"ideDataBindLimit",
  //   "_innerWin._data._dataBind._showDataBind":"dataBindShowDataBind",
  //   "_comCss":"comCss",
  //   "curUser._curProject.setting":"curProjectSetting",
  //   "_appWordHandler._wordMap":"appWordHandlerWordMap",
  //   "_IDE._data._setting.curEnvironment":"settingCurEnvironment",
  //   "BZ._userHabit.toolbarPos":"userHabitToolbarPos",
  //   "BZ._data._checkout":"checkout",
  // },
  _data:{},
  _log:function(o){
    console.log("BZ._debug")
    if(BZ._debug||["staging-be.boozang.com","location"].includes(location.host)){
      for(var i=0;i<arguments.length;i++){
        console[i?'log':'warn'](arguments[i])
      }
    }
  },
  _reportAppInfo:function(v){
    if(window.extensionContent){
      bzComm.postToIDE({
        fun:"_receiveAPPInfo",
        scope:"_ideTask",
        ps:[v]
      })
    }
  },
  reload:function(v,_fun){
    document.body.innerHTML='';
    location.href==v?location.reload():location.href=v
    _fun&&_fun()
  },
  _getHostList:function(){
    return _IDE._getCurEnvironment().items
  },
  _getHostIdx:function(_url){
    _url=_Util._removeProtocol(_url)
    let _items=BZ._getHostList()
    let v=_items.filter((o,i)=>{
      return _url.startsWith(_Util._removeProtocol(o.host))
    }).sort((a,b)=>{return b.host.length-a.host.length})[0]
    
    
    if(v){
      return _items.indexOf(v)
    }
  },
  _setStatus:function(d,_done){
    if(bzComm._isAppExtension()){
      var p=_innerWin._data._pos;
      let s=BZ._data._status
      if(s!=d){
        if(!d){
          if(s=="record"){
            bzComm.postToIDE({fun:"_end",scope:"_ideRecorder"})
          }else if(s=="play"||s=="pause"){
            bzComm.postToIDE({fun:"_end",scope:"_ideTask",ps:[1]})
            p._inMin=p._inMin==2?1:0;
          }
        }else{
          if(d=="record"){
            bzComm.postToIDE({fun:"_start",scope:"_ideRecorder"})
          }else if(d=="play"){
            if(!s){
              bzComm.postToIDE({fun:"_start",scope:"_ideTask"})
            }else{
              bzComm.postToIDE({fun:"_continuePlay",scope:"_ideTestManagement"})
            }
            p._inMin=p._inMin?2:1;
          }else if(d=="pause"){
            bzComm.postToIDE({fun:"_pause",scope:"_ideTask"})
          }
        }
      }
    }else if(bzComm._isApp()){
      bzComm.postToAppExtension({
        fun:"_setStatus",
        scope:"BZ",
        ps:[d]
      })
    }else{
      BZ._data._status=d
      BZ._setSharedData({"BZ._data._status":d})
    }
  },
  focusMaster:function(){
    if(bzComm._isIDE()){
      window.focus()
      window.open("","bz-master")
    }else{
      bzComm.postToIDE({
        fun:"focusMaster",
        scope:"BZ"
      })
    }
  },
  toolbar:{
    resize:function(o){
      bzComm.postToAppExtension({
        fun:"resize",
        scope:"_innerWin",
        ps:[o]
      })
    },
    addValidation:function(){
      bzComm.postToIDE({
        fun:"_newItem",
        scope:"_ideActionManagement",
        ps:[0]
      })
    },
    addComment:function(){
      bzComm.postToIDE({
        fun:"_newItem",
        scope:"_ideActionManagement",
        ps:[5]
      })
    },
    exeCmd:function(o){
      if(o.className.includes("bz-play")){
        BZ._setStatus("play")
      }else if(o.className.includes("bz-pause")){
        BZ._setStatus("pause")
      }else if(o.className.includes("bz-stop")){
        BZ._setStatus("")
      }else if(o.className.includes("bz-record")){
        BZ._setStatus("record")
      }else if(o.className.includes("bz-validate")){
        BZ.toolbar.addValidation()
      }else if(o.className.includes("bz-comment")){
        BZ.toolbar.addComment()
      }
    }
  },
  _isPlaying:function(){
    return BZ._data._status=="play";
  },
  _isPausing:function(){
    return BZ._data._status=="pause";
  },
  _isRecording:function(){
    return BZ._data._status=="record";
  },
  _inProcessing:function(){
    return ['record','play','pause'].includes(BZ._data._status);
  },
  setDataBindSwitch:function(v){
    _innerWin._data._dataBind._showDataBind=v;
    bzComm.postToIDE("setDataBindSwitch","BZ",v);
  },
  initAppData:function(){
    if(window.extensionContent){
      if(!BZ._initAppData){
        BZ._initAppData=1
        console.log("initAppData",bzComm.getIframeId())
        bzComm.postToIDE({
          fun:"getSharedData",
          scope:"BZ",
          return:function(d){
            if(d){
              BZ.assignShareData(d)
              _aiDataHandler._init()
  
              if(BZ._isRecording()){
                setTimeout(()=>{
                  _domRecorder._handleFileInput()
                },100)
              }else if(BZ._data._status){
                bzComm.postToApp({
                  fun:"_takeoverWin",
                  scope:"TWHandler",
                  ps:[1]
                })
              }
  
              bzComm.postToApp({
                fun:"insertJQuery",
                scope:"insertScript",
                ps:[d],
                insertCallFun:1,
                return:function(){
                  if(BZ._isRecording()){
                    _domRecorder._refresh()
                  }
                  BZ._pageReady=1
                }
              })
              _end()
            }
          }
        })
      }else{
        _end()
      }
    }

    function _end(){
      bzComm._exeInIframes({
        fun:"initAppData",
        scope:"BZ"
      })
      if(!bzComm.getIframeId()){
        setTimeout(()=>{
          console.log("info IDE app ready .......")
          bzComm.postToIDE({
            fun:"infoAppReady",
            scope:"BZ"
          })
        },100)
      }
    }
  },
  _isAutoRunning:function(){
    return BZ._data._autoRunning
  },
  isIgnoreReq:function(r){
    let c=_IDE._data._curVersion.setting.content;
    var s=BZ._ignoreReqs,w=BZ._whiteReqs;

    if(!s){
      s=BZ._ignoreReqs=(c.ignoreRequest||"").trim().split("\n")
    }

    if(!w){
      if(c.whiteRequest=="*"){
        w=BZ._whiteReqs=BZ._getHostList().map(x=>x.host)
      }else{
        w=BZ._whiteReqs=(c.whiteRequest||"").trim().split("\n")
      }
    }

    if(!_Util._isEmpty(w)){
      if(!w.find(x=>r.includes(x))){
        return 1
      }
    }

    if(!_Util._isEmpty(s)){
      return s.find(x=>r.includes(x))
    }
  },
  _setSharedData:function(d){
    BZ._curShareData={...BZ._curShareData,...d}
    // d=_Util._changeObjectKeys(BZ._curShareData,BZ._codeToKeyDataMap)

    bzComm.postToAppExtension({
      fun:"assignShareData",
      scope:"BZ",
      ps:[d]
    })
  },
  _storeUserHabit:function(d){
    if(bzComm._isIDE()){
      if(d){
        Object.keys(d).forEach(k=>BZ._userHabit[k]=d[k])
      }
      _localStorageManagement._update("bz-habit",BZ._userHabit);
    }else{
      bzComm.postToIDE({fun:"_storeUserHabit",scope:"BZ",ps:[BZ._userHabit]});
    }
  },
  getSharedData:function(){
    let m=BZ._getCurModule(),t=BZ._getCurTest(),v=_IDE._data._curVersion;
    if(!BZ._curShareData||!BZ._curShareData.curUser){
      if(!BZ._data._curProject||!_IDE._data._curVersion){
        return
      }

      BZ._curShareData={
        SERVER_HOST:SERVER_HOST,
        curUser:curUser,
        "BZ._data._autoRunning":BZ._data._autoRunning,
        "BZ._data._curProject":{
          sharingRole:BZ._data._curProject.sharingRole,
          language:BZ._data._curProject.language,
          _id:pId
        },
        pId:pId,
        "_IDE._data._curVersion":{setting:v.setting,shield:v.shield,freezed:v.freezed},
        _config:_config,
        "_IDE._data._setting":_IDE._data._setting,
        "_aiAuthHandler._data":_aiAuthHandler._data,
        _dictionaryConfig:_dictionaryConfig
      }
    }
    
    let d={
      "BZ._curEnv":BZ._curEnv,
      "BZ._userHabit.toolbarPos":BZ._userHabit.toolbarPos,
      "BZ._data._status":BZ._data._status,
      "_aiAuthHandler._data":_aiAuthHandler._data,
      "_IDE._data._curModule._data":m&&_Util._cloneSelectData(m._data,0,"code|name|parentModule|bt"),
      "_IDE._data._curTest._data":t&&_Util._cloneSelectData(t._data,0,"code|name|actions|type"),
      "_IDE._data._curAction":_IDE._data._curAction,
      "BZ._data._checkout":t&&BZ._isCheckout()&&t._data.type=="unit",
    }
    d={...BZ._curShareData,...d}
    return d
    // return _Util._changeObjectKeys(d,BZ._codeToKeyDataMap)
  },
  assignShareData:function(dd,_ignoreSub){
    // BZ._keyToCodeDataMap=BZ._keyToCodeDataMap||_Util._invertObject(BZ._codeToKeyDataMap)
    // let d=_Util._changeObjectKeys(dd,BZ._keyToCodeDataMap)
    let d={...dd}
    for(var k in d){
      var v=d[k]
      let ks=k.split(".")
      _parseData(ks,v)
    }
    if(bzComm._isAppExtension()&&!bzComm.getIframeId()){
      _innerWin._insertCtrls()
      _innerWin._setToolbarStatus()
      if(!_ignoreSub){
        bzComm._exeInIframes({
          fun:"assignShareData",
          scope:"BZ",
          ps:[dd]
        })
      }
    }
    if(bzComm._isAppExtension()){
      bzComm.postToApp({
        fun:"assignShareData",
        scope:"BZ",
        ps:[dd]
      })
    }
    function _parseData(ks,d,r){
      let k=ks.shift()
      r=r||window
      if(ks.length){
        if(r[k]===undefined){
          r[k]={}
        }
        _parseData(ks,d,r[k])
      }else{
        r[k]=d
      }
    }
  },
  setCheckout:function(v,_done){
    BZ._data._checkout=v
    if(bzComm._isIDE()){
      bzComm.postToAppExtension({fun:"setCheckout",scope:"BZ",ps:[v]})
    }else{
      _innerWin._setToolbarStatus()
    }
  },
  test:function(v,_fun){
    v+="-1"
    _fun&&_fun(v)
    return v
  },
  closedApp:function(){
    BZ.TW=0
  }
};
window.bzComm={
  _shareData:{},
  _callBackMap:{},
  _newIdValue:Date.now(),
  _newId:function(){
    return bzComm._newIdValue++
  },
  _keyToCodeMap:{
    // _setSharedData:"setSharedData",
    // _timingInfo:"timingInfo",
    // _start:"start",
    // _end:"end",
    // _setStatus:"setStatus",
    // _flashTmpCover:"flashTmpCover",
    // _bzDomPicker:"bzDomPicker",
    // _ideRecorder:"ideRecorder",
    // _ideTask:"ideTask",
    // _domActionTask:"domActionTask",
    // _exeAction:"exeAction",
    // _newItem:"newItem",
    // _ideActionManagement:"ideActionManagement",
    // _storeUserHabit:"storeUserHabit",
    // _aiDataUpdateHandler:"aiDataUpdateHandler",
    // _updateActionCommentDesc:"updateActionCommentDesc",
    // _receiveAPPInfo:"receiveAPPInfo",
    // _ideTestManagement:"ideTestManagement",
    // _insertInitRefresh:"insertInitRefresh",
    // _setClickFileInput:"setClickFileInput",
    // _domRecorder:"domRecorder",
    // _setPopMsg:"setPopMsg",
    // _mergeToSetAction:"mergeToSetAction",
    // _addNewItem:"addNewItem",
    // _setRequestCount:"setRequestCount",
    // _attachReqData:"attachReqData",
    // _appReqRepHandler:"appReqRepHandler",
    // _setToken:"setToken",
    // _aiAuthHandler:"aiAuthHandler",
    // _Util:"Util",
    // _log:"log",
    // _doAfterComment:"doAfterComment",
    // _tipHandler:"tipHandler",
    // _takeoverWin:"takeoverWin",
    // _takeoverPopMsg:"takeoverPopMsg",
    // _setBackTestPage:"setBackTestPage",
    // _innerWin:"innerWin",
    // _pickElement:"pickElement",
    // _isElementReady:"isElementReady",
    // _cssHandler:"cssHandler",
    // _endRequire:"endRequire",
    // _domActionTask:"domActionTask",
    // _getCanvasData:"getCanvasData",
    // _postAPIData:"postAPIData",
    // _setAlert:"setAlert",
    // _setOnbeforeunload:"setOnbeforeunload",
    // _triggerConfirm:"triggerConfirm",
    // _triggerPrompt:"triggerPrompt",
    // _getUICompleteTime:"getUICompleteTime",
    // _transferMonitor:"transferMonitor",
    // _infoManagement:"infoManagement",
    // _showImportantInfo:"showImportantInfo",
    // _originAJax:"originAJax",
    // _flashMutipleTmpCover:"flashMutipleTmpCover",
    // _showTmpCover:"showTmpCover",
    // _showOffset:"showOffset",
    // _removeTmpCover:"removeTmpCover",
    // _setIdx:"setIdx",
  },
  pageType:{
    bzIdeExtension:{
      key:'bzIdeExtension',
      getTabId:function(){
        return bzComm.getIdeTabId()
      }
    },
    bzAppExtension:{
      key:'bzAppExtension',
      getTabId:function(){
        return bzComm.getAppTabId()
      }
    },
    bzIde:{
      key:'bzIde',
      getTabId:function(){
        return bzComm.getIdeTabId()
      }
    },
    bzApp:{
      key:'bzApp',
      getTabId:function(){
        return bzComm.getAppTabId()
      }
    },
    bzBg:{
      key:'bzBg',
      getTabId:function(){}
    }
  },
  init:function(d){
    if(d){
      bzComm.assignId(d)
    }

    if(window._startComm){
      return _end()
    }
    window._startComm=1
    let cp=bzComm.getCurPageType();

    window.addEventListener(cp.key, (event) => {
      // console.log("Received message on "+cp.key+" and from the same page",event.detail)
      bzComm.handleMessage(event.detail)
    });
    if(window.extensionContent){
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        // console.log("Received message on "+cp.key+" and from remote",message)
        bzComm.handleMessage(message)
        sendResponse(0)
      });
    }
    if(parent!=window){
      if(bzComm._isAppExtension()){
        iframeManagement._listenUpdateIdx()
      }
    }else{
      setTimeout(()=>{
        bzComm.postToBackground({
          fun:"updateIframeIdx",
          scope:"bgComm",
          ps:[0,0]
        })
      },100)
    }
    _end()
    function _end(){
      if(bzComm._isIDEExtension()){
        setTimeout(()=>{
          bzComm._log("Extension version: "+chrome.runtime.getManifest().version)
        },1000)

        console.log("BZ-LOG: Set loading checker")
        setTimeout(()=>{
          if(!localStorage.getItem("socket-connected")){
            let _html=document.body.innerHTML
            if(_html.length<100&&_html.includes('<pre>{"message":"_')){
              console.log("BZ-LOG: SHUTDOWN: Token setting is not correct or project is not exist!")
              return
            }else{
              console.log("BZ-LOG: Auto Reload IDE")
              location.reload()
            }
          }else{
            localStorage.removeItem("socket-connected")
            console.log("BZ-LOG: Loaded IDE")
          }
        },10000)
      }

      if(bzComm._isAppExtension()){
        bzComm.postToBackground({
          fun:"tabReady",
          scope:"bgComm"
        })
      }
    }
  },
  chkInit:function(_time,_inAppFun,_inOth){
    _time=_time||Date.now()
    if(bzComm.getIframeId()){
      bzComm.init()
      if(bzComm._isApp()){
        insertScript.insertJQuery()
      }
      _inAppFun&&_inAppFun()
    }else{
      setTimeout(()=>{
        if(Date.now()-_time<2000){
          bzComm.chkInit(_time,_inAppFun,_inOth)
        }else{
          _inOth&&_inOth()
        }
      },1)
    }
  },
  getBZId:function(){
    return document.documentElement.getAttribute("bz-id");
  },
  getIdeTabId:function(){
    return document.documentElement.getAttribute("ide");
  },
  getAppTabId:function(){
    return document.documentElement.getAttribute("app");
  },
  getAppIFrames:function(){
    let v=document.documentElement.getAttribute("appIFrames")
    if(v){
      v=v.replace(/'/g,'"');
      v=JSON.parse(v)
      return v
    }
  },
  _log:function(v,_showImportantMsg,_main){
    if(_showImportantMsg){
      _infoManagement._showImportantInfo(v,0,0,_main)
    }
    if(bzComm._isApp()||bzComm._isAppExtension()){
      bzComm.postToIDE({
        fun:"log",
        scope:"console",
        ps:["BZ-LOG: "+v+(bzComm._isIDEExtension()?"":" (APP)")]
      })
    }else{
      console.log("BZ-LOG: "+v)
    }
  },
  _focusTW:function(){
    //FOCUS THE TW!!!
    if(!BZ._isPlaying()){
      if(bzComm._isIDE()||bzComm._isIDEExtension()){
        bzComm.postToAppExtension({fun:"_focusTW",scope:"bzComm"})
      }else{
        bzComm.postToBackground({fun:"focusTab",scope:"bgUtil"})
      }
    }
  },  
  _focusIDE:function(){
    if(bzComm._isIDE()||bzComm._isIDEExtension()){
      bzComm.postToBackground({fun:"focusTab",scope:"bgUtil"})
    }else{
      bzComm.postToIDE({fun:"_focusIDE",scope:"bzComm"})
    }
  },
  _getIframePathById: function () {
    let ks=[],f=bzComm.getIframeId();
    _Util._findDeepObj(bzComm.getAppIFrames(),(v,k,pk,ps)=>{
      if(k==f){
        ks=ps.map(x=>x.idx)
      }
    })
    ks.shift()
    return ks.join(",")
  },
  _isInIFrame:function(e){
    if(e.element){
      e=e.element
    }
    if(e.constructor==Array){
      e=e[0]
    }
    return e&&e.constructor==String&&e.includes("findIframe")&&e
  },
  getResourceRoot:function(){
    return "chrome-extension:/"+"/"+bzComm.getBZId()
  },
  _getIframeIdByPath:function(p){
    let e=p&&bzComm._isInIFrame(p)
    if(e){
      e=e.match(/findIframe\(([^)]+)\)/)[1]
      if(e.match(/^[0-9, ]+$/)){
        e=e.split(",").map(x=>parseInt(x.trim()))
        e.unshift(0)
        let o=bzComm.getAppIFrames()
        while(e.length&&o){
          let fs=Object.keys(o).filter(x=>$.isNumeric(x))
          let ok=fs.find(k=>o[k].idx==e[0])
          if(e.length==1){
            return ok
          }
          if(o){
            o=o[ok]
            e.shift()
          }
        }
        return 0
      }else if(e.match(/^#.+/)){
        e=e.replace("#","")
        e=bzComm._findIFrame((x,k)=>{return x.id==e})
      }else{
        if(e.match(/^env:[0-9 ]+$/)){
          e=parseInt(e.match(/env:([0-9 ]+)/)[1].trim())
          if(e){
            e--
          }
          e=_ideVersionManagement._getHostById(e)
        }
        e=bzComm._findIFrame((x,k)=>{return (x.url||"").includes(e)})
      }
      return e?e.k:0
    }else if(p&&p[0]=="BZ.TW.document"){
      return 0
    }
  },
  _forEachIFrame:function(fun,fs){
    _doIt(fs||bzComm.getAppIFrames())
    function _doIt(d){
      for(let k in d){
        if(d[k]&&d[k].constructor==Object){
          fun(d[k],k)
          _doIt(d[k])
        }
      }
    }

  },
  _findIFrame:function(fun,fs){
    return _doIt(fs||bzComm.getAppIFrames())
    function _doIt(d){
      for(let k in d){
        if(d[k]&&d[k].constructor==Object){
          if(fun(d[k],k)){
            return {v:d[k],k:k}
          }
          let r=_doIt(d[k])
          if(r){
            return r
          }
        }
      }
    }
  },
  _filterIFrame:function(fun,fs){
    let r=[]
    bzComm._forEachIFrame((x,k)=>{
      if(fun(x,k)){
        r.push(x)
      }
    },fs)
    return r;
  },
  getIframeId:function(v){
    return window.curBZIframeId||parseInt(document.documentElement.getAttribute("iframeId")||0);
  },
  assignId:function(d){
    if(bzComm._isIDEExtension()){
      return bzComm.postToIDE({
        fun:"assignId",
        scope:"bzComm",
        ps:[d]
      })
    }
    if(!window.name&&parent==window){
      window.name="bz-client"
      location.reload()
      return
    }
    for(let k in d){
      let v=d[k]
      if(_Util._isObjOrArray(v)){
        v=JSON.stringify(v).replace(/"/g,"'")
      }
      document.documentElement.setAttribute(k,v)
    }
    if(!d.app){
      BZ.TW=0
    }
    if(window.curBZIframeId){
      document.documentElement.setAttribute("iframeId",curBZIframeId)
    }
    delete d.iframeId
    if(!bzComm._isIDE()){
      bzComm._exeInIframes({
        fun:"assignId",
        scope:"bzComm",
        ps:[d]
      })
    }
  },
  _exeInIframes:function(d){
    d.type="bz-exe"
    $("IFRAME").toArray().forEach((x)=>{
      if(!x.contentDocument||x.contentWindow.bzComm){
        x.contentWindow.postMessage(d, "*")
      }
    })
  },
  getIds:function(_fun){
    let v={
      ide:bzComm.getIdeTabId(),
      app:bzComm.getAppTabId(),
      appIFrames:bzComm.getAppIFrames()
    }
    _fun&&_fun(v)
    return v
  },  
  _getIframeByAttr:function(k,v,fs){
    fs=fs||bzComm.getAppIFrames()
    return _find(fs)
    function _find(f){
      if((v&&f[k]==v)){
        return f
      }else if(!v&&f[k]){
        return f[k]
      }
      let r;
      if(f.constructor==Object){
        Object.values(f).find((x)=>{
          r=_find(x)
          return r
        })
      }
      return r
    }
  },
  _updateIframe:function(k,v,fs){
    fs=fs||bzComm.getAppIFrames()
    _find(fs)
    bzComm.updateAppIFrameMap(fs)
    function _find(f){
      if(f[k]){
        f[k]=v
        return 1
      }

      if(f.constructor==Object){
        Object.values(f).find((x)=>{
          return _find(x)
        })
      }
    }
  },
  updateAppIFrameMap:function(v,_updateSubIframe){
    document.documentElement.setAttribute("appIFrames",JSON.stringify(v).replace(/"/g,"'"))
    if(_updateSubIframe){
      bzComm._exeInIframes({
        fun:"updateAppIFrameMap",
        scope:"bzComm",
        ps:[v,1]
      })
      // let d=bzComm._getIframeByAttr(bzComm.getIframeId(),0,v)
      // Object.keys(d).forEach((k)=>{
      //   k=parseInt(k)
      //   if(!Number.isNaN(k)){
      //     bzComm.postToAppExtension({
      //       fun:"updateAppIFrameMap",
      //       scope:"bzComm",
      //       toIFrameId:k,
      //       ps:[v,1]
      //     })
      //   }
      // })
    }
  },
  reportIFrameResize:function(v){
    let f=bzComm._curResizeIFrame
    if(f){
      delete bzComm._curResizeIFrame
      f._fun(v)
    }
  },  
  getCurPageType:function(){
    if(!bzComm._curPageType){
      let pt=bzComm.pageType,p,e="";
      if(window.name=="bz-master"){
        p="Ide"
      }else{
        p="App"
      }
      if(window.extensionContent){
        e="Extension"
      }
      bzComm._curPageType=pt["bz"+p+e];
    }
    return bzComm._curPageType;
  },
  _isIDE:function(){
    return window.name=="bz-master"&&!window.extensionContent
  },
  _isApp:function(){
    return window.name!="bz-master"&&!window.extensionContent
  },
  _isAppExtension:function(){
    return window.name!="bz-master"&&window.extensionContent
  },
  _isIDEExtension:function(){
    return window.name=="bz-master"&&window.extensionContent
  },
  handleMessage:function(v){
    if(!v){
      return
    }
    let cp=bzComm.getCurPageType();
    // if(!bzComm._isIDEExtension()){
    //   bzComm._codeToKeyMap=bzComm._codeToKeyMap||_Util._invertObject(bzComm._keyToCodeMap)
    //   v.scope=bzComm._codeToKeyMap[v.scope]||v.scope
    //   v.fun=bzComm._codeToKeyMap[v.fun]||v.fun
    // }

    if(v.toPage&&v.toPage!=cp.key){
      return bzComm._postMessage(v)
    }else if(v.result){
      return bzComm._handleResult(v)
    }
    try{
      if(v.eval){
        v.result={value:eval(v.eval)}
      }else if(v.insertCallFun){
        return window[v.scope][v.fun](...(v.ps||[]),(r)=>{
          v.result={value:r}
          _end(v)
        })
      }else{
        v.result={value:window[v.scope][v.fun](...(v.ps||[]))}
      }
    }catch(ex){
      v.result={error:ex.stack}
    }
    
    _end(v)
    function _end(v){
      if(v.callBack){
        v.callBack.ps=[v.result.value]
        _postCallBack(v.callBack,v)
      }else if(v.return){
        _postCallBack(v,v)
      }
    }
    
    function _postCallBack(rv,v){
      rv.toPage=v.fromPage
      rv.toId=v.fromId
      rv.toIFrameId=v.fromIFrameId
      delete rv.fromPage;
      delete rv.fromId;
      delete rv.fromIFrameId
      bzComm._postMessage(rv)
    }
  },
  _handleResult:function(v){
    if(v.return){
      let cp=bzComm.getCurPageType()
      let fun=bzComm._callBackMap[v.return]
      if(fun){
        fun=fun.return;
      }else{
        console.log("BZ-LOG: No callback function found for: "+v.return)
      }
      delete bzComm._callBackMap[v.return];
      if(v.result){
        if(v.result.error){
          if(cp.key=="bzIde"){
            alert(v.result.error)
          }else{
            console.log("BZ-LOG:"+v.result.error)
          }
        }

        fun&&fun(v.result.value,v.ps)
      }
    }else{
      window[v.scope][v.fun](v.result.value,v.ps)
    }
  },
  _postMessage:function(v,_retry){
    _retry=_retry||0
    let cp=bzComm.getCurPageType()
    // console.log("Send message from "+cp.key,v)
    if(cp.getTabId()==v.toId&&v.toIFrameId==bzComm.getIframeId()){
      window.dispatchEvent(new CustomEvent(v.toPage, {detail:v}));
    }else{
      if(window.extensionContent){
        chrome.runtime.sendMessage(v,_handleErr)
      }else if(window.name=="bz-master"){
        chrome.runtime.sendMessage(bzComm.getBZId(), v,_handleErr);
      }else{
        window.dispatchEvent(new CustomEvent("bzAppExtension", {detail:v}));
      }
    }

    function _handleErr(r){
      let err=chrome.runtime.lastError
      if(err){
        console.error("BZ-LOG:"+err.message)
        if(_retry>5){
          console.log("BZ-LOG:Retry post message failed")
          if(v.ps){
            console.log("BZ-LOG:"+v.scope+"."+v.fun+"("+v.ps.join(",")+")")
          }else{
            console.log("BZ-LOG:"+v.scope+"."+v.fun+"()")
          }
          if(v.return){
            v.ps=[err];
            bzComm._handleResult(v)
          }
          return
        }
        setTimeout(()=>{
          bzComm._postMessage(v,_retry+1)
        },1000)
      }
    }
  },
  _prepareDataAndPost:function(to,v,fun){
    let cp=bzComm.getCurPageType()
    if(cp==to&&v.toIFrameId==bzComm.getIframeId()){
      return
    }
    if(v.constructor==String){
      v={
        eval:v
      }
    }
    v.toPage=to.key;
    v.toId=to.getTabId();

    v.fromPage=cp.key;
    v.fromId=cp.getTabId();
    v.fromIFrameId=bzComm.getIframeId()||0
    if(v.toIFrameId===undefined||v.toIFrameId===null){
      if(to.getTabId()==cp.getTabId()){
        v.toIFrameId=v.fromIFrameId
      }else{
        v.toIFrameId=0
      }
    }
    // v.fun=bzComm._keyToCodeMap[v.fun]||v.fun
    // v.scope=bzComm._keyToCodeMap[v.scope]||v.scope

    bzComm._handleReturnFun(v,fun)
    bzComm._postMessage(v)
  },
  postToIDE:function(v,fun){
    bzComm._prepareDataAndPost(bzComm.pageType.bzIde,v,fun)
  },
  postToIDEExtension:function(v,fun){
    bzComm._prepareDataAndPost(bzComm.pageType.bzIdeExtension,v,fun)
  },
  postToApp:function(v,fun){
    bzComm._prepareDataAndPost(bzComm.pageType.bzApp,v,fun)
  },
  postToAppExtension:function(v,fun){
    bzComm._prepareDataAndPost(bzComm.pageType.bzAppExtension,v,fun)
  },
  postToBackground:function(v,fun){
    bzComm._prepareDataAndPost(bzComm.pageType.bzBg,v,fun)
  },
  _handleReturnFun:function(v,fun){
    fun=v.return||fun
    if(fun&&fun.constructor==Function){
      let rd=bzComm._newId();
      v.return=v.return||fun
      bzComm._callBackMap[rd]={...v}
      v.return=rd
    }
  },
  _transferCallBetweenIDEAndAppExtension:function(d,fun){
    let cp=bzComm.getCurPageType()
    if(cp.key=="bzIde"){
      bzComm.postToAppExtension(d,fun)
    }else{
      bzComm.postToIDE(d,fun)
    }
  },
  popIDE:function(){
    // window.name=""
    let p=localStorage.getItem("bz-ide")
    if(p){
      p=JSON.parse(p)
    }else{
      p={w:screen.availWidth/2,h:screen.availHeight}
    }
    window.name=""
    let v=location.href
    window.open(v,"bz-master","width="+p.w+",height="+p.h)
    location.href=location.origin;
  }
}
if(window.name=="bz-client"){
  bzComm.init()
}else if(window.name=="bz-master"||location.href.match(/(localhost|\.boozang\.com)\/extension/)){
  window.name="bz-master"
  if(!window.BZ){
    location.reload()
  }else if(window.extensionContent){
    bzComm.init()
  }
}else{
  bzComm.chkInit()
}

if(bzComm._isAppExtension()){
  eval=_bzEval._exe
};
window._bzEval={
  _leftKeys:{"{":"}","[":"]","(":")"},
  bd:{"{":"}","[":"]","(":")","'":"'",'"':'"','`':'`'},
  db:{"}":"{","]":"[",")":"(","'":"'",'"':'"','`':'`'},
  _tmpNum:1,
  exeGroupCode:function(d){
    if(!d||![String,Array].includes(d.constructor)){
      return d
    }
    if(d.constructor==String){
      return _bzEval._exeCode(d)
    }else if(d)
    d.forEach(x=>{
      if(x.f){
        x.ps=x.ps||[]
        let xx=_bzEval._exeCode(x.f,0,0,1)
        if(xx.n){
          xx.d[xx.n](...x.ps)
        }else{
          xx.v(...x.ps)
        }
      }else if(x.k){
        let xx=_bzEval._exeCode(x.k,0,0,1)
        if(xx.n){
          xx.d[xx.n]=x.v
        }else{
          window[xx.k]=x.v
        }
      }else{
        _bzEval._exeCode(x.c)
      }
    })
  },
  _getTmpDataName:function(){
    return "f"+(this._tmpNum++)
  },
  _throwErr:function(s){
    alert(_bzMessage._system._error._syntaxError+s)
  },
  _exeFun:function(f,p,_outMap,_inMap){
    _outMap=_bzEval._initOutMap(_outMap),_inMap=_inMap||{};
    p=(p||[]).map(x=>_bzEval._getFinalValue(x))
    if(f.constructor!=Function){
      if(_bzEval._isFun(f)){
        f={v:f}
      }
      if(f.v.constructor==Function){
        if(f.n){
          p=_buildTF(p)
          return f.d[f.n](...p)
        }else{
          f=f.v
        }
      }else if(f.v&&(f.v.k=="function"||f.v.k=="=>")){
        return _exe(f.v,f.d,p)
      }else{
        _bzEval._throwErr()
      }
    }
    p=_buildTF(p)
    p= f(...p)
    return p

    function _buildTF(p){
      p=p.map(x=>{
        if(x&&x._bzFun=="_bzFun"){
          return function(){
            return _exe(x,window,[...arguments])
          }
        }
        return x
      })
      return p
    }

    function _exe(f,d,p){
      let _map=_bzEval._buildScopeDataMap(_outMap,_inMap),
      _tmpMap={}
      f.e.forEach((x,i)=>{
        if(x.ps){
          _tmpMap[x.ps[0]]=p[i]
        }else{
          _tmpMap[x]=p[i]
        }
      })
      _tmpMap.arguments=[...p]
      _tmpMap.this=d
      f=_bzEval._exeCode(f.c,_map,_tmpMap)
      _bzEval._mergedataMap(_outMap,_inMap,_map)
      if(f&&f._throw=="_return"){
        f=_bzEval._getFinalValue(f)
        return f
      }
    }
  },
  _exeIfElse:function(v,vs,_map,_tmpMap){
    let r;
    if(v.k!="else"){
      r=_bzEval._exeCode(v.e,_map,_tmpMap)
    }
    if(v.k=="else"||r){
      r=_bzEval._exeCode(v.c,_map,_tmpMap)
      
      while(vs[0]&&["else","else if"].includes(vs[0].k)){
        vs.shift()
      }

    }
    return r
  },
  _exeLoop:function(v,_map,_tmpMap){
    let _first=1,r,rr;
    while(1){
      if(v.k=="for"&&_first){
        _bzEval._exeCode(v.e[0],_map,_tmpMap)
      }
      if(v.k=="for"){
        rr=_bzEval._exeCode(v.e[1],_map,_tmpMap)
      }else if(v.k!=="do"||!_first){
        rr=_bzEval._exeCode(v.e,_map,_tmpMap)
      }
      if((v.k=="do"&&_first)||rr){
        _first=0
        r=_bzEval._exeCode(v.c,_map,_tmpMap)
        if(r&&r._throw){
          if(r._throw!="_continue"){
            if(r._throw=="_break"){
              r=undefined
            }
            break
          }
          r._throw=0
        }
        if(v.k=="for"){
          _bzEval._exeCode(v.e[2],_map,_tmpMap)
        }
      }else{
        break
      }
    }
    return r
  },
  _exeTry:function(v,_map,_tmpMap){
    let r;
    try{
      r=_bzEval._exeCode(v.c,_map,_tmpMap)
      return r
    }catch(e){
      _tmpMap={}
      _tmpMap[v.e[0]]=e
      r=_bzEval._exeCode(v.ec,_map,_tmpMap)
      return r
    }finally{
      if(v.f){
        _tmpMap={}
        r=_bzEval._exeCode(v.f,_map,_tmpMap)
      }
      return r
    }
  },
  _exeSwitch:function(v,_map,_tmpMap){
    let vv=_bzEval._exeCode(v.e,_map,_tmpMap),_continue,r
    v.c.find(x=>{
      if(_continue||x.k=="default"||vv==_bzEval._getFinalValue(_bzEval._exeCode(x.v,_map,_tmpMap))){
        r=_bzEval._exeCode(x.cs,_map,_tmpMap)
        if(r&&_bzEval._isBzData(r)&&r._throw){
          if(r._throw!="_continue"){
            if(r._throw=="_break"){
              r._throw=0
            }
            return 1
          }
          _bzEval._throwErr()
        }
        _continue=1
      }
    })
    return r
  },
  _initOutMap:function(_outMap){
    _outMap=_outMap||{
      $parameter:window.$parameter,
      $module:window.$module,
      $project:window.$project,
      $test:window.$test,
      $loop:window.$loop,
      $result:window.$result,
      $element:window.$element
    }
    return _outMap
  },
  _exe:function(c,m,t,tn,tv){
    if(!c){
      return
    }else if(c.constructor==TrustedScript){
      return _bzEval._orgEval(c)
    }
    if(t=="set"){
      return _bzEval._setValue(tn,m,0,0,tv)
    }else if(t=="get"){
      return _bzEval._getValue(tn,m,0)
    }
    return _bzEval._exeCode(c,m)
  },
  _exeCode:function(vs,_outMap,_inMap,_inBzData){
    _outMap=_bzEval._initOutMap(_outMap),_inMap=_inMap||{};
    if(vs.constructor==String){
      vs=_bzEval._parseCode(vs)
    }else if(vs.constructor!=Array){
      vs=[vs]
    }
    let vvs=[],r,d,rs=[],_tmpFun
    vs.forEach(x=>{
      if(x.k=="function"||x.k=="=>"){
        if(x.n){
          _outMap[x.n]=x
        }else{
          _tmpFun=x
        }
        x._bzFun="_bzFun"
      }else{
        vvs.push(x)
      }
    })
    if(!vvs.length&&_tmpFun){
      return _tmpFun
    }
    while(vvs.length){
      let v=vvs.shift()
      if(["let","const","var","=","+=","-=","*=","/=","^=","%=","&=","|=","&&=","||="].includes(v.k)){
        rs=[]
        v.c=v.c||[]
        v.c=v.c.constructor==Array?v.c.map(y=>y.constructor==Array?y[0]:y):v.c;
        let vr=_bzEval._exeCode(v.c,_outMap,_inMap)
        if(v.k=="var"){
          _bzEval._setValue(v.n,_outMap,_inMap,_outMap,vr)
        }else if(["let","const"].includes(v.k)){
          _bzEval._setValue(v.n,_inMap,_inMap,_inMap,vr)
        }else{
          rs=[_bzEval._setValue(v.n,_outMap,_inMap,0,vr,v.k)]
        }
      }else if(["if","else if","else","for","while","do","try","switch"].includes(v.k)){
        rs=[]
        let _map=_bzEval._buildScopeDataMap(_outMap,_inMap),
            _tmpMap={}
        if(["if","else if","else"].includes(v.k)){
          r=_bzEval._exeIfElse(v,vvs,_map,_tmpMap)
        }else if(["for","while","do"].includes(v.k)){
          r=_bzEval._exeLoop(v,_map,_tmpMap)
        }else if(v.k=="try"){
          r=_bzEval._exeTry(v,_map,_tmpMap)
        }else{
          r=_bzEval._exeSwitch(v,_map,_tmpMap)
        }
        _bzEval._mergedataMap(_outMap,_inMap,_map)
        if(r&&_bzEval._isBzData(r)&&r._throw){
          return r
        }
        if(r){
          rs.push(r)
        }
      }else if(v.k=="..."){
        r=_bzEval._getFinalValue(_bzEval._exeCode(v.c,_outMap,_inMap))
        rs.push([...r])
      }else if(v.k=="return"){
        r=_bzEval._buildBzData(_bzEval._exeCode(v.c,_outMap,_inMap))
        r._throw="_return"
        return r
      }else if(v.k=="break"){
        r= _bzEval._buildBzData()
        r._throw="_break"
        return r
      }else if(v.k=="continue"){
        r= _bzEval._buildBzData()
        r._throw="_continue"
        return r
      }else if(v.k=="throw"){
        r=_bzEval._exeCode(v.c,_outMap,_inMap)
        throw r
      }else if(v.k=="delete"){
        r=_bzEval._exeCode(v.c,_outMap,_inMap,1)
        delete r.d[r.n]
        rs.push(true)
      }else if(v.k=="new"){
        let x=v.c[0],rrs=[...x.cs]
        r=rrs.shift().ps.map(y=>_bzEval._exeCode(y,_outMap,_inMap))
        
        if(x.dd.match(/[.\[\]]/)){
          let dd=x.dd.split(/[.\[\]"']+/).filter(x=>x)
          let rr=window[dd.shift()]
          while(dd.length>1){
            rr=rr[dd.shift()]
          }
          r=new rr[dd[0]](...r)
        }else{
          r=new window[x.dd](...r)
        }

        while(rrs.length){
          let rr=rrs.shift()
          rr=rr.substring(1)
          if(rrs.length){
            let pp=rrs.shift().ps.map(y=>_bzEval._exeCode(y,_outMap,_inMap))
            
            r=r[rr](...pp)
          }else{
            r-r[rr]
          }
        }
        rs.push(r)
      }else if(v.k=="typeof"){
        r=_bzEval._exeCode(v.c,_outMap,_inMap,1)
        r=typeof _bzEval._getFinalValue(r)

        rs.push(r)
      }else if(v.dd){
        let on=v.dd,nn;
        if(v.dd[0]=="."){
          r=_bzEval._getFinalValue(rs.pop())
          nn=_bzEval._getTmpDataName()
          _outMap[nn]=r
          v.dd=nn+v.dd
        }
        rs.push(_bzEval._getRefData(v,_outMap,_inMap))
        if(nn){
          v.dd=on
        }
      }else{
        if(v.k=="["){
          r=[];
          v.ps.forEach(x=>{
            x=x.constructor==Array?x.map(y=>y.constructor==Array?y[0]:y):x;
            let y=_bzEval._exeCode(x,_outMap,_inMap)
            if(x.k=="..."){
              r.push(...y)
            }else{
              r.push(y)
            }
          })
          if(rs.length){
            let rr=rs[rs.length-1]
            if(!_bzEval._isSign(rr)){
              r=r.pop()
              if(_bzEval._isBzData(rr)){
                if(rr.d&&r.n){
                  rr.d=rr.v
                  rr.n=r
                  rr.v=rr.d[rr.n]
                }else{
                  rr.v=rr.v[r]
                }
              }else{
                rr=rr[r]
                rs[rs.length-1]=rr
              }
              continue
            }
          }
          rs.push(_bzEval._buildBzData(r))
        }else if(v.k=="{"){
          r={}
          v.ps.forEach(x=>{
            Object.keys(x).forEach(y=>r[y]=_bzEval._exeCode(x[y],_outMap,_inMap))
          })
          rs.push(_bzEval._buildBzData(r))
        }else if(v.k=="("){
          if(rs.length){
            let rr=rs[rs.length-1]
            let fr=_bzEval._getFinalValue(rr)
            if(_bzEval._isFun(fr)){
              r=v.ps.map(x=>_bzEval._exeCode(x,_outMap,_inMap));
              rs[rs.length-1]=_bzEval._exeFun(rr,r,_outMap,_inMap)
              continue
            }
          }
          r=_bzEval._exeCode(v.ps,_outMap,_inMap)
          rs.push(_bzEval._buildBzData(r))
        }else if(v.constructor==Array){
          rs=[_bzEval._exeCode(v,_outMap,_inMap,1)]
        }else if("'\"\`".includes(v[0])){
          rs.push(_bzEval._buildBzData(v.substring(1,v.length-1)))
        }else if(v[0]=="/"&&v.length>1){
          let _idx=v.lastIndexOf("/"),op=v.substring(_idx+1)
          r=new RegExp(v.substring(1,_idx),op)
          rs.push(r)
        }else if(_bzEval._isNumeric(v)){
          rs.push(JSON.parse(v))
        }else if(_bzEval._isSign(v[0])){
          rs.push(v)
        }else if(v=="undefined"){
          rs.push(_bzEval._buildBzData(undefined))
        }else if(v=="null"){
          rs.push(_bzEval._buildBzData(null))
        }else if(v=="true"){
          rs.push(_bzEval._buildBzData(true))
        }else if(v=="false"){
          rs.push(_bzEval._buildBzData(false))
        }else if(v[0]=="."){
          v=v.split(/[.\[\]"']+/).filter(x=>x)
          r=rs[rs.length-1]
          v.forEach(x=>{
            r.d=_bzEval._getFinalValue(r.v)
            r.n=x
            r.v=r.d[x]
          })
        }else{
          if(_bzEval._isBzData(v)){
            rs.push(v)
          }else{
            rs.push(_bzEval._getValue(v,_outMap,_inMap))
          }
        }
      }
    }
    if(rs.find(x=>_bzEval._isSign(x))){
      r=_bzEval._countItems(rs)
    }else{
      r=rs.pop()
    }
    if(_bzEval._isBzData(r)&&r._throw){
      return r
    }else if(_bzEval._isFun(r)){
      return r
    }
    return _inBzData?_bzEval._buildBzData(r):_bzEval._getFinalValue(r)

  },
  _isFun:function(fr){
    return fr&&(fr.constructor==Function||fr._bzFun=="_bzFun")
  },
  _getRefData:function(v,_outMap,_inMap){
    let r=_bzEval._getValue(v.dd,_outMap,_inMap)
    v.cs.forEach(x=>{
      if(x.k){
        let d=x.ps.find(y=>_bzEval._isSign(y)||y[0]==".")?_bzEval._exeCode(x.ps,_outMap,_inMap):x.ps.map(y=>{
          if(y&&y.constructor==Array){
            y=y.map(z=>z&&z.constructor==Array?_bzEval._exeCode(z,_outMap,_inMap,1):z)
          }
          return _bzEval._exeCode(y,_outMap,_inMap)
        })
        if(x.k=="("){
          if(!d||d.constructor!=Array){
            d=[d]
          }
          if(r.n){
            r.v=_bzEval._exeFun(r,d,_outMap,_inMap)
            r.n=r.d=0
          }else{
            r.v=_bzEval._exeFun(r,d,_outMap,_inMap)
          }
        }else{
          if(d&&d.constructor==Array){
            d=d.pop()
          }
          r.d=r.v
          r.n=d
          r.v=r.d[d]
        }
      }else{
        x=x.split(/[.\[\]"']+/).filter(x=>x)
        x.forEach(y=>{
          r.d=r.v
          r.n=y
          r.v=r.d[y]
        })
      }
    })
    return r
  },
  _countItems:function(ps,c){
    let vs=[],r,s,prs,ss;
    ps.find((x,q)=>{
      if(x=="?"){
        vs=_bzEval._getFinalValue(_countGroup(vs))
        let qs=_bzEval._findKeyOuterBlock(ps,":",q+1,{"?":":"})
        if(vs){
          r=_bzEval._countItems(qs.p)
        }else{
          r=_bzEval._countItems(qs.e)
        }
        return 1
      }
      if(!["&&","||",">","<",">=","<=","==","===","!=","!==","^","&","|"].includes(x)){
        if(ss){
          if(_bzEval._isBzData(x)&&x.n){
            if(ss=="++"){
              vs.push(x)
              x.v+=1
              x.d[x.n]=x.v            
            }else if(ss=="--"){
              vs.push(x)
              x.v-=1
              x.d[x.n]=x.v            
            }else if(ss=="!"){
              vs.push(!x.v)
            }else if(ss=="!!"){
              vs.push(!!x.v)
            }else{
              vs.push(~x.v)
            }
            ss=0
          }else{
            if(ss=="!"){
              vs.push(!x)
              ss=0
            }else if(ss=="!!"){
              vs.push(!!x)
              ss=0
            }else if(ss=="~"){
              vs.push(~x)
              ss=0
            }else{
              _bzEval._throwErr()
            }
          }
          return
        }
        if(x=="*"||x=="/"||x=="%"){
            s=x
        }else if(s){
          vs[vs.length-1]=_bzEval._count(vs[vs.length-1],s,x)
          s=""
        }else if(x=="++"||x=="--"||x=="!"||x=="~"||x=="!!"){
          if(s||!vs.length||_bzEval._isSign(vs[vs.length-1])){
            ss=x
          }else{
            let rv=vs[vs.length-1]
            if(x=="++"){
              rv.d[rv.n]+=1
            }else{
              rv.d[rv.n]-=1
            }
          }
        }else{
          vs.push(x)
        }
      }else{
        vs=_bzEval._getFinalValue(_countGroup(vs))
        if(x=="&&"){
          if(!vs){
            r=_bzEval._buildBzData(vs)
            return 1
          }
        }else if(x=="||"){
          if(vs){
            r=_bzEval._buildBzData(vs)
            return 1
          }
        }else{
          prs={v:vs,c:x}
        }
        vs=[]
      }
    })
    if(!r){
      if(vs.length){
        r=_countGroup(vs)
      }
    }
    return _bzEval._getFinalValue(r)
    function _countGroup(vs){
      [["+","-"],[">>","<<"]].forEach(x=>vs=_countPs(vs,x))
      vs=vs[0]
      if(prs){
        vs=_bzEval._count(prs.v,prs.c,vs)
        prs=0
      }
      return vs
    }
    function _countPs(vs,c){
      let rs=[],s;
      for(let i=0;i<vs.length;i++){
        let v=vs[i]
        if(c.includes(v)){
          if(!i){
            if("+-".includes(v)){
              rs=[0]
              s=v
            }else if(_bzEval._isSign(v)){
              _bzEval._throwErr()
            }
          }else{
            if(s){
              _bzEval._throwErr()
            }
            s=v
          }
        }else if(s){
          let v1=_bzEval._getFinalValue(rs[rs.length-1])
          v=_bzEval._getFinalValue(v)
          rs[rs.length-1]=_bzEval._count(v1,s,v)
          s=""
        }else{
          rs.push(v)
        }
      }
      return rs
    }
  },
  _buildBzData:function(v,d,n){
    if(_bzEval._isBzData(v)){
      return v
    }
    return {
      _bzData:"_bzData",
      v:v,
      d:d,
      n:n
    }
  },
  _isBzData:function(v){
    return v&&v._bzData=="_bzData"
  },
  _getFinalValue:function(r){
    if(_bzEval._isBzData(r)){
      return r.v
    }
    return r
  },
  _isSign:function(c){
    return c&&"~!=><+-*/%^&|?:".includes(c[0])
  },
  _count:function(d1,c,d2){
    d1=_bzEval._getFinalValue(d1)
    d2=_bzEval._getFinalValue(d2)
    switch(c){
      case "+": return d1+d2
      case "-": return d1-d2
      case "*": return d1*d2
      case "/": return d1/d2
      case "==": return d1==d2
      case "===": return d1===d2
      case ">": return d1>d2
      case "<": return d1<d2
      case ">>": return d1>>d2
      case "<<": return d1<<d2
      case ">=": return d1>=d2
      case "<=": return d1<=d2
      case "!=": return d1!=d2
      case "!==": return d1!==d2
      case "&": return d1&d2
      case "|": return d1|d2
      case "&&": return d1&&d2
      case "||": return d1||d2
      case "%": return d1%d2
      case "^": return d1^d2
    }
  },
  _mergedataMap:function(_outMap,_inMap,_map){
    Object.keys(_map).forEach(k=>{
      if(Object.keys(_inMap).includes(k)){
        _inMap[k]=_map[k]
      }else{
        _outMap[k]=_map[k]
      }
    })
  },
  _isNumeric:function(a){
    var b = a && a.toString();
    return (!a||a.constructor!=Array) && b - parseFloat(b) + 1 >= 0
  },
  _getValue:function(n,_outMap,_inMap){
    let ns=n.split(/[.\[\]"']+/).filter(x=>x),_map;
    n=ns.shift()
    if(n=="eval"){
      return _bzEval._buildBzData(_bzEval._exeCode,_bzEval,"_exeCode");
    }else if(_bzEval._isNumeric(n)||n.match(/^['"`].*[`"']$/)){
      let nn=_bzEval._getTmpDataName()
      _outMap[nn]=_bzEval._exeCode(n)
      n=nn
    }
    if(Object.keys(_inMap).includes(n)){
      _map=_inMap
    }else if(Object.keys(_outMap).includes(n)){
      _map=_outMap
    }else{
      _map=window
    }
    while(ns.length){
      _map=_map[n]
      n=ns.shift()
    }

    return {
      d:_map,
      n:n,
      v:_map[n],
      _bzData:"_bzData"
    }
  },
  _setValue:function(n,_outMap,_inMap,_defMap,v,_sign){
    let _map,ns;
    if(n.constructor==String){
      ns=n.split(/[.\[\]"']+/).filter(x=>x)
      n=ns.shift()
  
      _map=_bzEval._getDataMap(n,_outMap,_inMap,_defMap)
    }else{
      _map=_bzEval._getRefData(n,_outMap,_inMap)
    }
    if(n.constructor!=String||!_defMap||_map==_defMap){
      if(n.constructor==String){
        while(ns.length){
          _map=_map[n]
          n=ns.shift()
        }
      }else{
        n=_map.n
        _map=_map.d
      }
      switch(_sign){
        case "+=":return _map[n]+=v;
        case "-=":return _map[n]-=v;
        case "*=":return _map[n]*=v;
        case "/=":return _map[n]/=v;
        case "%=":return _map[n]%=v;
        case "^=":return _map[n]^=v;
        case "&=":return _map[n]&=v;
        case "|=":return _map[n]|=v;
        case "&&=":return _map[n]&&=v;
        case "||=":return _map[n]||=v;
      }
      return _map[n]=v
    }else{
      throw new Error("")
    }
  },
  _getDataMap:function(n,_outMap,_inMap,_defMap){
    if(Object.keys(_inMap).includes(n)){
      return _inMap
    }
    if(Object.keys(_outMap).includes(n)){
      return _outMap
    }
    return _defMap||window
  },
  _buildScopeDataMap:function(_outMap,_inMap){
    let _map=Object.assign({},_outMap)
    _map=Object.assign(_map,_inMap)
    return _map
  },
  _findKeyOuterBlock:function(vs,tk,_start,bs,_noRegex){
    bs=bs||_bzEval.bd
    let k,b,c,s;
    _init()
    if(vs.push){
      vs=[...vs]
    }
    if(_start){
      vs=vs.push?vs.splice(_start):vs.substring(_start)
    }
    for(let i=0;i<vs.length;i++){
      c=vs[i]
      if(c=="\\"){
        b=!b
      }else if(b){
        b=0
      }else if(!_noRegex&&k=="/"&&c=="/"){
        _init()
        continue
      }else if(!_noRegex&&!k&&c=="/"&&(!s||s.trim().match(/[\(\[\=\?\:]$/))){
        k="/"
        continue
      }else if(k){
        if(k.r==c){
          if(k.n){
            k.n--
          }else{
            _init()
          }
        }else if(k.l==c){
          k.n++
        }
        continue
      }else if(bs[c]){ //([{
        k={l:c,r:bs[c],n:0,p:{k:c}}
      }
      s.push?s.push(c):s+=c;

      let kk=_isKey(s,c)
      if(kk){
        if(vs.pop){
          return {
            e:vs.splice(i+1),
            p:vs.splice(0,i),
            k:kk
          }
        }
        return {
          p:vs.substring(0,i-kk.length+1),
          k:kk,
          e:vs.substring(i+1)
        }
      }
    }

    function _init(){
      k=0
      s=vs.constructor==Array?[]:"";
    }

    function _isKey(s,c){
      if(tk.constructor==Function){
        return tk(s)
      }else if(tk.constructor==RegExp){
        s=s.match(tk)
        return s&&s[0]
      }
      return (tk==s||tk==c)&&tk
    }
  },
  _parseCode:function(v,_case){
    let vs=_bzEval._parseLine(v)
    if(_case){
      let ss=[]
      vs.forEach(x=>{
        while(1){
          let k=x.match(/^(case|default)(:|\s|\'\"\`\{)/)
          if(k){
            k=k[1]
            x=x.substring(k.length).trim()
            v=_bzEval._findKeyOuterBlock(x,":")

            if(v.e.match(/^(case|default)(:|\s|\'\"\`\{)/)){
              x=v.e
              ss.push({k:k,v:v.p.trim(),cs:[]})
              continue
            }
            ss.push({k:k,v:v.p.trim(),cs:[v.e]})
          }else if(ss[0]){
            ss[ss.length-1].cs.push(x)
          }
          break
        }
      })
      ss.forEach(x=>{
        x.cs=x.cs.map(y=>_bzEval._parseItem(y))
      })

      return ss
    }
    vs=vs.map(x=>_bzEval._parseItem(x))

    return vs
  },
  _parseItem:function(v){
    let ps=[],pps=[],
        b,p,
        c,cc=[],
        s="",_inpp,
        k,kk,inSingle,
        df, //var, let, const
        ok, //for, if, whilte, do, function,switch
        op; //delete, continue, break

    v=v.trim()

    ok=v.match(/^(if|for|while|function|do|try|switch|else +if|else)(\s|\(|\{)/)
    if(ok){
      ok={
        k:ok[1]
      }
      v=v.substring(ok.k.length).trim()
      if(ok.k=="function"){
        ok.n=v.substring(0,v.indexOf("("))
        v=v.substring(ok.n.length)
        ok.n=ok.n.trim()
      }
    }else{
      ok=v.match(/^\(?([^=,\(\)\{\}\[\]]*)\)?=>/)

      if(ok){
        let vv=v.substring(ok[0].length).trim();
        let e=_bzEval._findKeyOuterBlock(vv,")")
        if(!e){
          v=vv
          if(v[0]!="{"){
            v="return "+v
          }
          ok={
            k:"=>",
            e:_bzEval._parseItem(ok[1]||" ")
          }
        }else{
          ok=0
        }
      }else{
        let vv=v.match(/^(let|var|const)\s+([^=,\s]+)(\=|\,|$|;)/)
        if(vv){
          v=v.substring(vv[0].length)
          df={
            k:vv[1],
            n:vv[2]
          }
          ps.push(df)
        }else{
          df=v.match(/^([^=\{\[\("'`\!><\s]+\=)[^>=]/);
          if(df){
            v=v.substring(df[1].length)
            df={
              k:"=",
              n:df[1].replace("=","").trim()
            }
            k=df.n.match(/[\+\-\*\/\%\^]$/)
            if(k){
              k=k[0]
              df.k=k+df.k
              df.n=df.n.replace(k,"").trim()
            }
            ps.push(df)
          }else{
            df=v.match(/^(return|delete|throw|typeof|break|continue|new)(\s|$|\[|\{|\()/)||v.match(/^(\.\.\.)/)
            if(df){
              v=v.substring(df[1].length).trim()
              df={
                k:df[1]
              }
              if(["return","break","continue","throw"].includes(df.k)){
                df.c=_bzEval._parseCode(v)
                return df
              }
              op=df
              ps.push(op)
              df=0
            }else{
              df=v.match(/^(function)(\s|\()/)
              if(df){
                ok={
                  k:df[1]
                }
                v=v.substring(0,df[1].length).trim()
                df=v.match(/^([^\(]+)/)
                if(df){
                  ok.n=df[1].trim()
                  v=v.substring(0,ok.n.length).trim()
                }
              }
            }
          }
        }
      }
    }
    
    for(let i=0;i<v.length;i++){
      c=v[i]
      let p=ps[ps.length-1]
      if(c=="\\"){
        b=!b
      }else if(b){
        b=0
      }else if(kk){
        if(kk==c){
          kk=0
          if(_inpp){
            _inpp=0
            if(s){
              ps.push("+")
              ps.push('"'+s+'"')
            }
            continue
          }
        }else if(kk=="`"&&s.match(/\$\{$/)){
          let ss=_bzEval._findKeyOuterBlock(v,"}",i)
          if(ss){
            ps.push('"'+s.substring(1,s.length-2)+'"')
            ps.push("+")
            v=_bzEval._parseItem(ss.p)
            if(v.constructor==Array){
              v=v[0]
            }
            ps.push(v)
            v=ss.e
            i=-1
            _inpp=1
            s=""
            continue
          }
        }
      }else if("`'\"".includes(c)){
        kk=c
      }else if(k=="/"){
        if(c=="["){
          inSingle=1
        }else if(c=="]"){
          inSingle=0
        }else if(inSingle){
        }else if(c=="/"){
          k=0
        }
      }else if(!k&&!ps.length&&c=="/"&&(!s||s.trim().match(/[\(\[\=\?\:]$/))){
        k="/"
      }else if(!s&&(c==" "||c=="\n")){
        continue
      }else if(k){
        if(k.r==c){
          if(k.n){
            k.n--
          }else{
            if(ok){
              if(ok.k=="do"){
                if(ok.c){
                  ok.e=_bzEval._parseItem(s)
                  return ok
                }else if(s[0]=="{"){
                  ok.c=_bzEval._parseCode(s.substring(1))
                }else{
                  k=0
                  s+=c
                  continue
                }
              }else if(ok.k=="try"){
                if(!ok.c){
                  ok.c=_bzEval._parseCode(s)
                }else if(!ok.e){
                  ok.e=_bzEval._parseItem(s)
                }else if(!ok.ec){
                  ok.ec=_bzEval._parseCode(s)
                }else{
                  ok.f=_bzEval._parseCode(s)
                }
                if(i==v.length-1){
                  return ok
                }
                s=""
                k=0
                continue
              }else if(ok.k=="=>"){
                if(k.l=="{"){
                }else{
                  s+=c
                }
                k=0
                continue
              }else if(k.l=="("){
                if(ok.k=="for"){
                  ok.e=_bzEval._parseCode(s)
                }else{
                  ok.e=_bzEval._parseItem(s)
                }
                v=v.substring(i+1).trim()
                if(["for","if","else if"].includes(ok.k)){
                  if(v.match(/^\{.*\}$/s)){
                    v=v.substring(1,v.length-1)
                  }
                  ok.c=_bzEval._parseCode(v,ok.k=="switch")
                  return ok
                }else{
                  if(v.match(/^\{.*\}$/s)){
                    v=v.substring(1,v.length-1)
                    ok.c=_bzEval._parseCode(v,ok.k=="switch")
                    return ok
                  }
                }
                i=-1
              }else if(ok.k=="function"){
                k=0
                continue
              }else{
                ok.c=_bzEval._parseCode(s)
                return ok
              }
            }else if(df||op){
              s+=c
              k=0
              continue
            }else{
              k.p.ps=k.l=="{"?_parseObj(s):s?_bzEval._parseItem(s):[]
              if(k.p.ps.constructor!=Array){
                k.p.ps=[k.p.ps]
              }
            }
            k=0
            s=""
            continue
          }
        }else if(k.l==c){
          k.n++
        }
      }else if(_bzEval.bd[c]){ //([{
        k={l:c,r:_bzEval.bd[c],n:0,p:{k:c}}
        s=s.trim()
        if(ok&&ok.k=="do"){
          if(ok.c){
            s=""
            continue
          }
        }else if(ok&&["=>","function"].includes(ok.k)){
          if(s){
            s+=c
          }
          continue
        }else if(df||op){
        }else if(p&&p.cs){
          if(s){
            p.cs.push(s)
            s=""
          }
          k.p.d=1
          p.cs.push(k.p)
          continue
        }else if(s){
          k.p.d=1
          ps.push({
            dd:s,
            cs:[k.p]
          })
          s=""
          continue
        }else{
          ps.push(k.p)
          continue
        }
      }else if(c=="\n"){
        if(!df||op){
          _init()
          continue
        }
      // }else if(c==";"){
      //   if(df){
      //     df.c=_bzEval._parseItem(s)
      //     s=""
      //     ps.push(..._bzEval._parseItem(v.substring(i+1)))
      //     ps=ps.filter(x=>x)
      //     ps.forEach(x=>x.k=ps[0].k)
      //     return ps
      //   }else if(op){
      //     op.c=_bzEval._parseItem(s)
          
      //   }else if(ok&&(ok.k=="=>"||ok.k=="function")){
      //     ok.c=_bzEval._parseCode(s)
      //     ps.push(ok)
      //     ps.push(..._bzEval._parseItem(v.substring(i+1)))
      //     return ps
      //   }
      //   _init()
      //   continue
      }else if(c==","){
        if(df){
          df.c=_bzEval._parseItem(s)
          _parsePartItem(v.substring(i+1),ps)
          ps=ps.filter(x=>x)
          ps.forEach(x=>x.k=ps[0].k)
          return ps
        }else if(op){
          op.c=_bzEval._parseItem(s)
          _parsePartItem(v.substring(i+1),ps)
          return ps
        }else if(ok&&(ok.k=="=>"||ok.k=="function")){
          ok.c=_bzEval._parseCode(s)
          ps.push(ok)
          _parsePartItem(v.substring(i+1),ps)
          return ps
        }else if(!s.trim()){
          if(v.substring(0,i).trim().endsWith(",")){
            ps.push([])
          }
          _parsePartItem(v.substring(i+1),ps)
          return ps
        }else{
          s=`(${s})`
          p=_bzEval._parseItem(s)
          if(p.constructor==Array&&!ps.length){
            ps=p
          }else{
            ps.push(p)
            ps=[ps]
          }
          v=v.substring(i+1)
          while(1){
            let vv=_bzEval._findKeyOuterBlock(v,",")
            if(vv){
              ps.push(_bzEval._parseItem(`(${vv.p})`)[0])
              v=vv.e
            }else{
              ps.push(_bzEval._parseItem(`(${v})`)[0])
              return ps
            }
          }
        }
      }else if(df||ok||op){
      }else if(_bzEval._isSign(c)){
        if(df||op){
          s+=c
          continue
        }
        _init()
        p=ps[ps.length-1]
        if(!p||p.constructor!=String){
          ps.push(c)
        }else if("~!==+-*/<>&|".includes(p)){
          p+=c
          if(["--","++","==","===","!=","!==","+=","-=","*=","/=","&&","||",">=","<=",">>","<<","^=","&=","|=","!!","%="].includes(p)){
            ps[ps.length-1]=p
          }else{
            ps.push(c)
          }
        }else{
          ps.push(c)
        }
        p=ps[ps.length-1]
        if(v[i+1]!="="&&["=","+=","-=","/=","*=","^=","%=","&=","|=","&&=","||="].includes(p)){
          ps.pop()
          df={
            k:p,
            n:ps.pop()
          }
          ps.push(df)
        }
        continue
      }
      s+=c
    }
    _init()
    if(pps.length){
      if(!pps.includes(ps)){
        pps.push(ps)
      }
      return pps
    }
    if(!ps.length&&ok){
      return ok
    }
    return ps

    function _parsePartItem(v,ps){
      p=_bzEval._parseItem(v)
      if(!p||p.constructor!=Array){
        p=[p]
      }
      ps.push(...p)
    }

    function _init(){
      s=s.trim()
      if(s){
        if(ok&&ok.k=="do"){
          ok.c=_bzEval._parseCode(s)
        }else if(ok&&ok.k=="else"){
          if(!ok.c){
            ok.c=_bzEval._parseItem(s)
            s=""
          }
        }else if(ok&&(ok.k=="=>"||ok.k=="function")){
          ok.c=_bzEval._parseCode(s)
          ps.push(ok)
        }else if(df){
          df.c=_bzEval._parseItem(s)
        }else if(op){
          op.c=_bzEval._parseItem(s)
        }else if(s.match(/^(delete|typeof)\s/)||s.match(/^\.\.\./)){
          ps.push(_bzEval._parseItem(s))
        }else if(s.match(/^\./)){
          if(ps.length&&ps[ps.length-1].ps){
            ps[ps.length-1].ps.push(s)
          }else{
            ps.push(s)
          }
        }else{
          ps.push(s)
        }
        s=""
      }
    }

    function _parseObj(o){
      let d={},k,s="",b,ks=[],l;
      o=o.trim()
      if(!o){
        return d
      }
      for(let i=0;i<o.length;i++){
        let c=o[i]
        if(b){
        }else if(c=="\\"){
          b=!b
          continue
        }else if(!k){
          if(!ks.length&&c==":"){
            if(s=="null"){
              k=[null]
            }else if(s=="undefined"){
              k=[undefined]
            }else if(s=="false"){
              k=[false]
            }else if(s=="true"){
              k=[true]
            }else{
              s=s.trim().replace(/^['"]|['"]$/g,"")
              k=[s]
            }
            s=""
            continue
          }
        }else if(!s&&c.match(/\s/)){
          continue
        }else if(c==ks[0]){
          ks.shift()
        }else if("\"'`".includes(ks[0])){
        }else if("({['\"`".includes(c)){
          ks.unshift(_bzEval.bd[c])
        }else if(c==","&&!ks.length){
          d[k[0]]=_bzEval._parseItem(s)
          k=""
          s=""
          continue
        }
        s+=c
      }
      if(s){
        d[k[0]]=_bzEval._parseItem(s)
      }
      return d
    }
  },
  _parseLine:function(v){
    let s="",ps=[],b,k,kk,_endExpress=[],_comment,_inDo,_oneLine=[];
    v=v.trim()

    for(let i=0;i<v.length;i++){
      let c=v[i]

      if(_comment=="/"+"/"){
        if(c=="\n"){
          _comment=0
        }else{
          continue
        }
      }else if(_comment=="/"+"*"){
        if(c=="/"&&v[i-1]=="*"){
          _comment=0
        }
        continue
      }
      if(!s&&c.match(/\s/)){
        continue
      }else if(c=="\\"){
        b=!b
      }else if(b){
        b=0
      }else if(kk){
        if(kk==c){
          kk=0
        }
      }else if("`'\"".includes(c)){
        kk=c
      }else if(k=="/"&&c=="/"){
        k=0
      }else if(!k&&c=="/"&&s.trim().match(/[\(\[\=\?\:]$/)){
        k="/"
      // }else if(c==" "&&("+-*/([{%!\?\:".includes(v[i+1])||s.match(/([\s\(\{\[\+\-\*\?\:\/\%\&\|\^\~])$/))){
      //   continue
      }else if((c=="/"||c=="*")&&s.match(/[^\\]\/$/)){
        _comment="/"+c
        s=s.replace(/[\/]$/,"")
        continue
      }else if(k){
        if(k.r==c){
          if(k.n){
            k.n--
          }else{
            if(_endExpress[0]&&s.includes(_endExpress[0])&&s.substring(_endExpress[0].length).trim()[0]!="{"){
            }else if(k.l=="{"){
              if(s.match(/^(for|if|while|switch|function|else|do|try)[\s\(\{]/)){
                s+=c
                if(!s.match(/^(do|try)/)){
                  _init()
                }
                k=0
                continue
              }
            }else if(k.l=="("&&s.match(/^(if|for|while|switch|function|else if)[\s|\(]/)){
              _endExpress.unshift(s+")")
              let vv=v.substring(i+1).trim();
              if(vv.match(/^(for|if|while|do|try)(\s|\{|\(|$)/)){
                v=vv
                i=-1
                _oneLine.push(_endExpress[0])
                _endExpress=[]
                s=""
                continue
              }
            }
            k=0
          }
        }else if(k.l==c){
          k.n++
        // }else if(c.match(/\s/)){
        //   let vr=v.substring(i+1).trim(),
        //       vl=v.substring(0,i)
        //   if(_uselessSpace(vr,vl,c)){
        //     continue
        //   }
        }
      }else if(c=="\n"){
        if((_endExpress[0]||"").replace(/ /g,"")==(s||"").replace(/ /g,"")){
          continue
        }
        s=s.trim()
        if(s.match(/^do([\s\{]|$)/)&&!_inDo){
          if(!s.match(/^do\s*\{.+while.+\)/s)){
            s+=c
            _inDo=1
          }else{
            _init()
          }
          continue
        }


        let vr=v.substring(i+1).trim(),
            vl=v.substring(0,i)
        if(_uselessSpace(vr,vl,c)){
          continue
        }
        if(_inDo==1){
          if(!vr.match(/^while(\s|\()/)){
            _inDo=0
            _init()
          }else{
            s+=c
          }
          continue
        }
        if(vl.endsWith("}")&&vr.match(/^(catch|while)(\s|\()/)){
          continue
        }else if(s.trim()=="else"){
          s="else "
          continue
        }
        _init()
        continue
      }else if(c==";"){
        let vr=v.substring(i+1).trim()
        if((!_inDo||!vr.match(/^while(\s|\()/))&&_endExpress[0]!=s){
          ps.push(s.trim())
          s=""
          _init()
          continue
        }
      }else if(_bzEval.bd[c]){
        s=s.trim()
        k={l:c,r:_bzEval.bd[c],n:0}
      }
      s+=c
    }
    _init()
    return ps

    function _uselessSpace(vr,vl,c){
      if(vl.match(/([^-]-|[^+]\+|[^\/]\/|[\*=~!&\|\^%><?:,;\.\(\[\{])$/)||vr.match(/^(-[^-]|\!\=|\+[^+]|\/[^\/\*]|[\*%\^&|=><?:,;\.\(\)\[\]\}])/)||vl.match(/([\+][\+][\+]|---)$/)){
        return 1
      }else if(vr[0]=="{"){
        return c!="\n"
      }
    }

    function _init(){
      s=s.trim()
      if(_oneLine.length){
        s=_oneLine.join(" ")+s
        _oneLine=[]
      }
      if(s){
        ps.push(s)
        s=""
      }
      _endExpress.shift()
      _inDo=0
    }
  },
  /**/
  _chkParameter:function(){
    let vs=[]
    for(let i=0;i<arguments.length;i++){
      vs.push(arguments[i])
    }
    return vs
  },
  _testCode:function(_simpleExe,_repeat){
    let vs=[
      {c:`let a=/[a-z]+\\/[0-9]+/ig,b="89a/999B/3d2c/4";b.match(a)`,r:['a/999', 'B/3', 'c/4']},
      {c:"!1+2*3+(~4+5)/3*6+7%2+3^4+!!2<<2+3>>2",r:34},
      {c:"1<2*3&&(4+5)/3*6+7%2>3^4+2<<2+3>>2",r:49},
      {c:"let a=1;!a",r:false},
      {c:"let a=1;~a+5",r:3},
      {c:"_IDE._data._curTest._data.name",r:"demo"},
      {c:"_IDE._data._curTest._data.name+(9+6)*10+'px'",r:"demo150px"},
      {c:"_IDE._data._curTest._data.name+(9+6)*10+1",r:"demo1501"},
      {c:"[1,2,3,null,undefined,0]",r:[1,2,3,null,undefined,0]},
      {c:"({a:2}).a",r:2},
      {c:"[1,2,3][0]",r:1},
      {c:"_Util._replaceAll('lws','w','ok')",r:"loks"},
      {c:"_Util._replaceAll('lws','w','ok')[2]",r:"k"},
      {c:"_ideTestManagement._getStdDescription(_IDE._data._curTest)",r:"[m5.t4] demo"},
      {c:"_ideTestManagement._getStdDescription(_IDE._data._curTest)+' '+_ideTestManagement._getStdDescription(_IDE._data._curTest)",r:"[m5.t4] demo [m5.t4] demo"},
      {c:"_ideTestManagement._getStdDescription(_IDE._data._curTest).length+10*10",r:112},
      {c:"_bzEval._chkParameter(0)",r:[0]},
      {c:"_bzEval._chkParameter(undefined)",r:[undefined]},
      {c:"_bzEval._chkParameter()",r:[]},
      {c:"_bzEval._chkParameter(1,2,3)",r:[1,2,3]},
      {c:"_bzEval._chkParameter({})",r:[{}]},
      {c:"[]",r:[]},
      {c:"[0]",r:[0]},
      {c:"[undefined]",r:[undefined]},
      {c:"0",r:0},
      {c:"0.1",r:0.1},
      {c:"''",r:""},
      {c:"undefined",r:undefined},
      {c:"null",r:null},
      {c:"true",r:true},
      {c:"false",r:false},
      {c:`let a=true
        if(a){
          a=11
        }
      `,r:11},
      {c:"(1,2,3)",r:3},
      {c:"let a=3;a*_IDE._data._curTest._data.actions.length;",r:6},
      {c:`let a="lws",b="w",c=3;_Util._replaceAll(a,b,c)+5`,r:"l3s5"},
      {c:`let a={a:3},b=3,c=5;b=3+delete a.a+5,b`,r:9},
      {c:`let a={a:3},b=3,c=5;b=3+typeof a.a+5,b`,r:"3number5"},
      {
        c:`let a=1
        if(a){
          a=3
        }`,
        r:3
      },
      {
        c:`let a=1
        for (let i = 0; i < 10; i++) {
            a+=1
        }`,
        r:11
      },
      {
        c:`let a=1
        for (let i = 0; i < 10; i++) 
            a+=1
        `,
        r:11
      },
      {
        c:`let a=1,i=0
        do{
            a+=7
            i++
        }while(a<100)`,
        r:14
      },
      {
        c:`let a=1
        do
            a+=7
        while(a<100)`,
        r:106
      },
      {
        c:`
        let a=2,b=3;
        if(a){
          let b=222
          a+=b
        }
        `,
        r:224
      },
      {
        c:`
        let a=2,b=3;
        if(a)
          a+=b
        `,
        r:5
      },
      {
        c:`let a=3,b=34;
        lws(3,a,b)+lws(3,b,a)
        function lws(v,a,b) {
          if(a>b){
            a+=1
          }else{
            a+=b
          }
          return v+2+a*b
        }
        `,
        r:1373
      },
      {
        c:`let a=3,b=34;
        lws(3,a,b)+lws(3,b,a)
        function lws(v,a,b) {
          if(a>b)
            a+=1
          else
            a+=b
          
          return v+2+a*b
        }
        `,
        r:1373
      },
      {
        c:`let a=3,b=34;
        lws(function(x){return x*10},a,b)
        function lws(v,a,b) {
          if(a>b){
            a+=1
          }else{
            a+=b
          }
          v=v(a)
          return v+2+a*b
        }`,
        r:1630
      },
      {
        c:`let a=3,b=34;
        lws(x=>x*10,a,b)
        function lws(v,a,b) {
          if(a>b){
            a+=1
          }else{
            a+=b
          }
          v=v(a)
          return v+2+a*b
        }
        `,
        r:1630
      },
      {
        c:`let a=3,b=34;
        lws((x)=>x*10,a,b)
        function lws(v,a,b) {
          if(a>b){
            a+=1
          }else{
            a+=b
          }
          v=v(a)
          return v+2+a*b
        }
        `,
        r:1630
      },
      {
        c:`let a=3,b=34;
        lws(()=>10,a,b)
        function lws(v,a,b) {
          if(a>b){
            a+=1
          }else{
            a+=b
          }
          v=v(a)
          return v+2+a*b
        }
        `,
        r:1270
      },
      {
        c:`let lws=function(x){return x+9};lws(3)`,
        r:12
      // },
      // {
      //   c:`let lws=${_Util._replaceAll.toString()};lws(_bzEval._testCode.toString(),"a","999")`
      },
      {
        c:`b={c:33,d:334},a={a:function(){
          return b
        }}
        delete a.a().c
        b`,
        r:{d:334}
      },
      {c:"let a=[1,2,3];[a][0][1]",r:2},
      {c:"let a={a:3},b=3,c=5;b=[3+delete a.a+5,b,a];b",r:[9, 3, {}]},
      {c:"let a={a:3},b=3,c=5;b=[3+typeof a.a+5,b,a];b",r:["3number5", 3, {a:3}]},
      {c:`let a=function(){
              arguments[1]+=100;
              return [...arguments]
          }
          a(1,2,3)`,r:[1,102,3]
      },
      {c:"let a=new Date();a.getTime()>100",r:true},
      {
        c:`
        let i,j=10;
        for(i=0;i<10;i++){
          j++
          if(i>3){
            if(i){
               continue
            }
          }
          j++
        }
        j`,
        r:24
      },
      {
        c:`
        let i,j=10;
        for(i=0;i<10;i++){
          j++
          if(i>3){
            if(i){
               break
            }
          }
          j++
        }
        j`,
        r:19
      },
      {
        c:`let a=function(){
            let msg;
            try{
                let a=2;
            if(a){
              throw new Error("lws")
            }
                return 1
            }catch(ex){
                msg=ex.message
            }finally{
                return msg+3
            }
          }
          a()`,
        r:"lws3"
      },
      {
        c:`let a={
          v:"lws",
          a:function(v){
            return v+this.v+this.b(3)
          },
          b:function(v){
            return v*10
          }
        }
        a.a(10)`,
        r:"10lws30"
      },
      {
        c:`[0,1,2].filter(x=>x).map(x=>x*12)`,
        r:[12, 24]
      },
      {
        c:`let lws=function(a){
          let c;
          switch(a){
          case 1:c="+";break;
          case 2:c="-";break;
          case 3:
          case 4:c="*";break;
          default:c="%"
          }
          return eval(10+c+3)
          };
          ([0,1,2,3,4]).map(x=>lws(x))`,
        r:[1, 13, 7, 30, 30]
      },
      {
        c:`a=1,b=0;if(a)for(;a<10;a++)
        b+=3
        b`,
        r:27
      },
      {
        c:"(v=>v+1)(1)",
        r:2
      },
      {
        c:`[lws(10),lws(9),lws(2),lws(7)]
        function lws(v) {
            return v%2?v%3?11:21:v%5?111:112
        }`,
        r:[112, 21, 111, 11]
      },
      {
        c:`\`lws-\${_Util._replaceAll(name,'bz','123')}\``,
        r:"lws-123-master"
      },
      {
        c:"new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(22);",
        r:"$22.00"
      }
    ]
    let t=Date.now()
    if(!_simpleExe){
      vs.push(
        {
          c:`let a={a:3,b:3}
          debugger
  
          delete a.a
          a
          `,
          r:{b:3}
        },
        {c:"{a:33,b:'lws',c:{d:\"aa\",'e':[33,334,34],f:true,g:false}}",r:{a:33,b:'lws',c:{d:"aa",'e':[33,334,34],f:true,g:false}}},
        {c:"{a:0,b:undefined,c:null,'':1,null:2,undefined:2}",r:{a:0,b:undefined,c:null,'':1,null:2,undefined:2}}
      )
    }else if(_simpleExe=="bz"){
      vs.forEach(x=>x.c=_bzEval._parseCode(x.c))
      t=Date.now()
    }
    _repeat=_repeat||1
    for(let j=0;j<_repeat;j++){
      let v=vs.forEach(x=>{
        try{
          if(_simpleExe=="js"){
            eval(x.c)
          }else{
            let c=JSON.stringify(_bzEval._exeCode(x.c))
            if(!_simpleExe&&_repeat<2){
              if(c!=JSON.stringify(x.r)){
                console.log("Failed on:"+x.c+" ==> "+c)
                return 1
              }
            }else{

            }
          }
        }catch(ex){
          console.log("Get Error: "+ex.message+"\n\n"+x.c)
        }
      })
    }
    console.log("Spent time: "+(Date.now()-t))
  }
};

// try{
//   eval("")
// }catch(e){
//   _bzEval._orgEval=eval
//   eval=_bzEval._exe
// };
var $util={
  keyCodeMap:{
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: "Space",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    91: "MetaLeft",
    92: "MetaRight",
    93: "ContextMenu",
    96: "Numpad0",
    97: "Numpad1",
    98: "Numpad2",
    99: "Numpad3",
    100: "Numpad4",
    101: "Numpad5",
    102: "Numpad6",
    103: "Numpad7",
    104: "Numpad8",
    105: "Numpad9",
    106: "NumpadMultiply",
    107: "NumpadAdd",
    109: "NumpadSubtract",
    110: "NumpadDecimal",
    111: "NumpadDivide",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
  },
  extractData:function(d,k){
    return _extractData._extract(d,k)
  },
  wait:function(v){
    return (_fun)=>{
      setTimeout(_fun,v)
    }
  },
  continue:function(){

  },
  break:function(){
    
  },
  showJsonValidateResult:function(v,d){
    if(!d&&v.valid){
      d=v.valid
      v=v.data
    }
    _extractData._showTools(v,d)
  },
  refreshData:function(m,t,n){
    let d=$data(m,t)
    _ideDataHandler._takeData((_ideDataManagement._curMap[(m||"")+(t||"")]||[]).find(x=>x.name==n),d,m,t)
  },
  validateData:function(v,d,r){
    let url;
    r=r||[]
    if(!window.extensionContent){
      let url=location.protocol+"/"+"/"+location.host+location.pathname+"?id="+BZ._data._curProject._id+"#"+_ideLocation._getPath(0,_ideTask._data._curModule||_IDE._data._curModule,_ideTask._data._curTest||_IDE._data._curTest)
      if(_domActionTask._lastAction){
        // _domActionTask._lastAction._extractJsonData=v
        // _domActionTask._lastAction._validJsonData=d
        _domActionTask._lastAction._url=url
      }
    }
    v=_Util._unConvertObj(v)
    console.log("BZ-LOG: BZ-Start-Validating:"
                +"url: "+url
                +"-- Data --"
                +JSON.stringify(v)
                +"-- Validation --"
                +JSON.stringify(d)
                +"BZ-End-Validating");
    let rr= !!_extractData._checkData(v,d,r)
    if(!rr){
      if(window.$result){
        window.$result.msg=JSON.stringify(r,0,2)
      }
    }
    return rr
  },
  extendExtensionScript:function(c,_pos){
    let d={bz:1}
    if(_pos=="end"){
      _pos="extendEndScript"
    }else{
      _pos="extendTopScript"
    }
    d[_pos]=`try{${c}}catch(ex){alert(ex.message)}`
    bzComm.postToBackground({
      fun:"setTmpCode",
      scope:"bzUtil",
      ps:[_pos,c]
    })
  },
  extendExceptionScript:function(c,_pos){
    return $util.extendExtensionScript(c,_pos)
  },
  removeDuplicateData:function(d){
    if(d&&d.constructor==Array){
      let v,_idx=d.length-1;
      while(_idx>=0){
        v=d[_idx]
        for(let i=0;i<_idx;i++){
          if(_Util._isSameObj(d[i],v)){
            d.splice(_idx,1)
            break
          }
        }
        _idx--
      }
    }else if(d&&d.constructor==Object){
      Object.keys(lws).forEach(k=>{
        if(!lws[k]){
          delete lws[k]
        }
      })
    }
  },
  attachScreenshotToReport:function(v){
    v=v||["BZ.TW.document","BODY",0]
    let _curBack,r=_ideTask._data._curExeAction,
        w=_domActionTask._getActionResultName(r)
        
    $util.takeScreenshot(v,w,(x)=>{
      $util.attachInfoToReport(x,r)
      _curBack&&_curBack()
    })
    return function(_back){
      _curBack=_back
    }
  },
  attachInfoToReport:function(v,r){
    window._ideReport&&_ideReport._attachInfo(v,r)
  },
  jsonToXML:function(_obj,_root) {
    if(!_root||_root===1){
      _root="data"
    }
    let _xml = '';
    for (let _prop in _obj) {
      let v=_obj[_prop]
      if(v&&v.constructor==Function){
        continue
      }
      _xml += v instanceof Array ? '' : "<" + _prop + ">";
      if (v instanceof Array) {
        for (let _array in v) {
          _xml += "<" + _prop + ">";
          _xml += $util.jsonToXML(new Object(v[_array]),1);
          _xml += "</" + _prop + ">";
        }
      } else if (typeof v == "object") {
        _xml += $util.jsonToXML(new Object(v),1);
      } else {
        _xml += v;
      }
      _xml += v instanceof Array ? '' : "</" + _prop + ">";
    }
    _xml=_xml.replace(/<\/?[0-9]{1,}>/g, '');
    if(_root&&_root!==1){
      _xml=`<${_root}>${_xml}</${_root}>`
    }
    return _xml
  },
  xmlToJson:function(x) {
    let j = {},cj,ps=[j],k;
    let xo=x.match(/<[^< \n>]+(>| |\n)/g);

    if(xo){
      xo.forEach(o=>{
        let i=x.indexOf(o)
        if(i){
          let xx=x.substring(0,i).trim();
          x=x.substring(i)
          if(xx[xx.length-1]==">"){
            xx=xx.substring(0,xx.length-1).trim()
            _addNode(k)
            k=""
            if(xx.endsWith("/")){
              xx=xx.substring(0,xx.length-1).trim()
              _parseProperties(xx,j)
              ps.shift()
              j=ps[0]
            }else{
              _parseProperties(xx,j)
            }
          }else{
            if($.isNumeric(xx)){
              j[k]=parseFloat(xx)
            }else{
              j[k]=xx
            }
            k=""
          }
        }
        x=x.substring(o.length).trim()

        if(o[0]=="<"){
          o=o.substring(1)
        }
        if(o[o.length-1]==">"){
          o=o.substring(0,o.length-1)
        }
        if(o[o.length-1]=="/"){
          return
        }
        if(o[0]=="/"){
          o=_glossaryHandler._getVariableName(o.substring(1),0,1)
          if(ps[1]&&(ps[1][o]==j||(ps[1][o]&&ps[1][o].constructor==Array&&ps[1][o].includes(j)))){
            ps.shift()
            j=ps[0]
          }
          return
        }else{
          if(k){
            _addNode(k)
          }
          k=_glossaryHandler._getVariableName(o,0,1)
        }
      })
    }
    return j;

    function _addNode(k){
      let d={}
      if(j[k]){
        if(j[k].constructor!=Array){
          j[k]=[j[k]]
        }
        j[k].push(d)
      }else{
        j[k]=d
      }
      j=d
      ps.unshift(d)
    }

    function _parseProperties(xx,j){
      let xxo=xx.match(/[^\s=]+=\s*"/g)
      if(xxo){
        let k;
        xxo.forEach(o=>{
          if(k){
            let i=xx.indexOf(o)
            let v=xx.substring(0,i)
            xx=xx.substring(i)
            _parseValue(v,j,k)
          }
          xx=xx.substring(o.length)
          o=o.substring(0,o.length-1).trim()
          o=o.substring(0,o.length-1)
          k=o=_glossaryHandler._getVariableName(o,0,1)
        })
        _parseValue(xx,j,k)
      }
    }

    function _parseValue(v,j,k){
      v=v.trim()
      if(v){
        j[k]=v.substring(0,v.length-1)
        if($.isNumeric(j[k])){
          j[k]=parseFloat(j[k])
        }
      }
    }
  },
  resetClient:function(){
  },
  getHostIdxByUrl:function(_url){
    _url=_url||location.href
    return BZ._getHostList().findIndex(x=>_Util._isSameHost(x.host,_url))
  },
  openApp:function(_url){
    TWHandler._openUrl(_url)
  },
  isMatch:function(d1,d2){
    if(d1==d2){
      return !0
    }else if(d1=="bz-skip"||d2=="bz-skip"){
      return !0
    }else if(d1&&d2&&d1.constructor==d2.constructor){
      if(d1.constructor==Array){
        if(d1.length==d2.length){
          for(let i=0;i<d1.length;i++){
            if(!$util.isMatch(d1[i],d2[i])){
              return !1
            }
          }
          return !0
        }
        return !1
      }else if(d1.constructor==Object){
        for(let k in d1){
          if(!$util.isMatch(d1[k],d2[k])){
            return !1
          }
        }
        for(let k in d2){
          if(d1[k]===undefined){
            return !1
          }
        }
        return !0
      }
      return d1==d2
    }else if(d1&&d1.constructor==Array&&d1.length&&d2&&d2.constructor==Object){
      return !d1.find(x=>{
        return !$util.isMatch(x,d2)
      })
    }
    return !1
  },
  //search d1 in d2
  includes:function(d1,d2){
    if(d1==d2){
      return 1
    }else if($util.isMatch(d1,d2)){
      return 1
    }
    if(!d2){
      return
    }else if(d2.constructor==Array){
      if(!d1||![Object,Array].includes(d1.constructor)){
        return d2.find(x=>x==d1)
      }else if(d1.constructor==Object){
        return d2.find(x=>$util.includes(d1,x))
      }
      return !d2.find(x=>!$util.includes(x,d1))
    }else if(d2.constructor==Object){
      if(!d1||![Object,Array].includes(d2.constructor)){
        return
      }else{
        for(let k in d2){
          if($util.includes(d1,d2[k])){
            return 1
          }
        }
      }
    }
  },
  getElementValue:function(e,fun){
    if(fun){
      return fun(e)
    }
    let os=$(e).find("input,textarea,select").toArray()
    let v;
    if(!os.length){
      if($(e).is("input,textarea,select")){
        os=[e]
      }
    }
    os.forEach(x=>{
      if(x.type=="radio"){
        if(x.selected){
          v=x.value
        }
      }else if(x.type=="checkbox"){
        if(x.checked){
          v=x.value||"on"
        }
      }else if(x.tagName=="SELECT"){
        v=v||""
        for(a of x.selectedOptions){
          v+=","+a.text
        }
        v=v.substring(1)||""
      }else if(x.getBoundingClientRect().width){
        let vv=x.value
        if(!v||vv.length>v.length){
          v=vv
        }
      }
    })
    if(v===undefined){
      v=e.innerText.trim()
    }
    return v
  },
  //getLanguage
  // getLanguage:function(){
  //   return BZ._data._uiSwitch._curAppLanguage
  // },
  //translate
  // translate:function(v){
  //   let i=_IDE._data._setting.appLanguages.indexOf(BZ._data._uiSwitch._curAppLanguage)
  //   if(i){
  //     let w=_appWordHandler._wordMap[v]
  //     if(w){
  //       return w[i-1]||v
  //     }
  //   }
  //   return v
  // },
  //randomItem
  randomItem:function(d){
    let i=Math.floor(Math.random()*Object.keys(d).length)
    let k=Object.keys(d)[i]
    return {key:k,value:d[k]}
  },
  //addLogData
  addLogData:function(d){
    _ideTask._logData=_ideTask._logData||[]
    console.log("BZ-LOG: addLogData:")
    for(var i=0;i<arguments.length;i++){
      let v=arguments[i]
      _ideTask._logData.push(v)
      console.log("BZ-LOG: "+JSON.stringify(v))
    }
  },
  //setLogData
  setLogData:function(d){
    _ideTask._logData=[]
    for(var i=0;i<arguments.length;i++){
      _ideTask._logData.push(arguments[0])
    }
  },
  getClipboardValue:function(_fun,w){
    w||=window
    try{
      if(w.document.hasFocus()&&w.navigator.clipboard.readText){
        let x=w.navigator.clipboard.readText();
        x.then(text => {
          try{
            _fun(text);
          }catch(ex){}
        })
      }
    }catch(e){}
  },
  //cleanLogData
  cleanLogData:function(){
    _ideTask._logData=[]
  },
  //log
  log:function(){
    let v=_Util._log(...arguments)
    if(!bzComm._isIDE()){
      bzComm.postToIDE({scope:"console",fun:"log",ps:["BZ-LOG: App: "+v]});
      return
    }
    $console.output(v)
  },
  //takeScreenshot
  takeScreenshot:function(o,w,_fun){
    _bzDomPicker._flashTmpCover(o)
    let _callBack
    let f=(bf)=>{
      _callBack=bf
    }
    bzComm.postToBackground({
      scope:"bgUtil",
      fun:"getScreenshot",
      return:(v)=>{
        if(w&&v){
          _Util._attachWordToImg({_imgSrc:v,_word:w,_fun:(v)=>{
            _end(v)
          }})
        }else{
          _end(v)
        }
      },
      insertCallFun:1,
    })

    return f

    function _end(v){
      console.log(v)
      $util.CV=v
      _fun&&_fun(v)
      _callBack&&_callBack(v)
    }
  },
  //findDataInMap
  findDataInMap:function(map,o){
    for(let k in map){
      let v=map[k],found=1
      if(o){
        for(let kk in o){
          if(o[kk]!=v[kk]){
            found=0
            break
          }
        }
      }
      if(found){
        return v
      }
    }
  },
  exeTests:function(ts){
    console.log(ts)
    _ideTask._exeTmpTasks(ts)
  },
  //formatTimestamp
  formatTimestamp:function(t,f){
    return _Util._formatTimestamp(t,f)
  },
  addDate:function(d,v,u,f){
    if(d.constructor==String){
      d=new Date(d.replace(/(^|-|\/)([0])/g,"$1"))
    }
    if(u=="y"||u=="year"){
      d.setFullYear(d.getFullYear()+v)
    }else if(u=="m"||u=="month"){
      d.setMonth(d.getMonth()+v)
    }else if(u=="d"||u=="date"){
      d.setDate(d.getDate()+v)
    }
    if(f){
      d=$util.formatTimestamp(d.getTime(),f)
    }
    return d
  },
  parseBoolean:function(v){
    return !!v&&!v.toString().match(/^(false|0|off|undefined|null)$/i)
  },
  //getScenariosByTag
  getScenariosByTag:function(ts){
    return _ideObjHandler._getItemsByTag(ts,"scenario",1)
  },
  //getTestsBySuite
  getTestsBySuite:function(t,_fun){
    return _ideObjHandler._getRefTests(t,_fun)
  },
  //downloadFile
  downloadFile:function(_name,_content,_type){
    console.log("BZ-LOG: download-data-file:"+_name)
    _Util._downloadFile(_name,_content,_type)
  },
  //getTestsByTag
  getTestsByTag:function(ts){
    return _ideObjHandler._getItemsByTag(ts,"unit")
  },
  //isEmptyData
  isEmptyData:function(d){
    return d!==0&&(!d||$.isEmptyObject(d))
  },
  //gotoFlag
  gotoFlag:function(s){
    _ideTask._gotoFlag(s)
  },
  //getRoles
  getRoles:function(){
    try{
      let t=BZ._getCurTest(),
          m=BZ._getCurModule()
      
      return _aiAuthHandler._getRolesByHostId(t?t._data.hostId:m?m._data.defaultHostId:0)
    }catch(e){}
    return []
  },
  //getElementText
  getElementText:function(u,_chkSvg,_attachInputValue){
    if(u.constructor==Array){
      return u.map(v=>$util.getElementText(v,_chkSvg,_attachInputValue))
    }
  //    return u.innerText?u.innerText.trim():""
    /*
    if(!_back){
      var _time=Date.now()
    }
    */

    if(_attachInputValue&&u.nodeType==1){
      if(_Util._isStdInputElement(u)){
        if(_cssHandler._isCheckboxOrRadio(u)){
          return u.checked?"on":"off"
        }else if(u.tagName=="SELECT"){
          return u.selectedOptions[0].text
        }else{
          return u.value
        }
      }else if(_Util._isInContentEditable(u)){
        return u.innerText
      }
    }

    if(u.nodeType==3){
      return (u.textContent||"").trim()
    }else if(u.innerText===undefined){
      if(_chkSvg){
        u=$("<div>"+u.outerHTML+"</div>").appendTo(document.body);
        var v=u[0].innerText;
        u.remove()
        return v.trim()
      }else{
        return ""
      }
    }else if(!u.innerText||!u.innerText.trim()){
      return ""
    }
    if(["SCRIPT","NOSCRIPT","STYLE","SELECT","TEXTAREA"].includes(u.tagName)){
      return ""
    }else if(u.tagName=="BR"){
      return "\n"
    }
    var t="",co=0,lo=0,s,r=u.getBoundingClientRect();
    for(var i=0;i<u.childNodes.length;i++){
      var n=u.childNodes[i],tt="";
      if(n.nodeType==1){
        if(!_Util._isHidden(n)){
          tt=$util.getElementText(n,_chkSvg,_attachInputValue)
          co=n.getBoundingClientRect()
        }else{
          continue
        }
      }else if(n.nodeType==3){
        tt=n.textContent.trim()
        co=0
      }
      if(tt){
        if(lo){
          if(co){
            if(lo.bottom>co.top){
              s="\n"
            }else{
              s=" "
            }
          }else{
            if(lo.width+lo.left>=r.left+r.width-20){
              s="\n"
            }else{
              s=" "
            }
          }
        }else if(t){
          if(co){
            if(co.left==r.left){
              s="\n"
            }else{
              s=" "
            }
          }else{
            s=" "
          }
        }else{
          s=""
        }
        t+=s+tt
      }
    }
    /*
    if(!_back){
      $util._chkFunTime+=Date.now()-_time
    }
    */
    return t.trim()
  },
  //printDataToFile
  printDataToFile:function(f,d){
    if(f.toLowerCase().endsWith("csv")){
      d=_Util._toFileCSV($util.jsonToCSV(d))
    }else if(f.toLowerCase().endsWith("html")){
      d=_Util._toFileCSV(_Util._listToHtml(d))
    }else{
      d=JSON.stringify(d,0,2)
    }
    d=f+"\n"+d.trim()+"\n"
    console.log("BZ-OUTPUT-FILE:"+d+"BZ-OUTPUT-FILE-END")

  },
  //jsonToCSV
  jsonToCSV:function(d){
    if(d&&d.constructor==Array&&d.length){
        return Object.keys(d[0]).join(",")+"\n"+
      d.map(o=>{
        let v=""
        for(var k in o){
            let x=o[k]
            v+=x&&x.constructor==String?'"'+o[k].replace(/\"/g,'""')+'",':o[k]+','
        }
        return v.replace(/,(\n|$)/g,"\n").trim()
      }).join("\n")
    }
    return ""
  },
  //clearCookie
  clearCookie:function(_document){
    _document=_document||document;
    var cookies = _document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
      var d = window.location.hostname.split(".");
      var _name=encodeURIComponent(cookies[c].split(";")[0].split("=")[0])
      // console.log(_name)
      _document.cookie = _name + '=; Max-Age=-99999999;';
    }
  //    _document.cookie.split(";").forEach(function(c) { _document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  },
  clearLocalStorage:function(_document){
    var _bzData=localStorage.getItem("bz-data");
    localStorage.clear();
    localStorage.setItem("bz-data",_bzData);
  },
  //p: data path. like: "$test.data"
  //resetData
  resetData:function(pp){
    let d,p=pp.split(".")
    switch(p[0]){
      case "$project":d=$data(0,0,1);break;
      case "$module":d=$data(BZ._getCurModule()._data.code,0,1);break;
      case "$test":d=$data(BZ._getCurModule()._data.code,BZ._getCurTest()._data.code,1);break;
      case "$parameter":d=BZ._getCurTest()._data.defParameter;break;
    }
    if(d){
      try{
        if(d.constructor==String){
          d=eval(d)
          _ideDataManagement._initRandomValue(d)
        }
        if(p.length>1){
          for(let i=1;i<p.length;i++){
            d=d[p[i]]
          }
          eval(pp+"=d",{},"set",pp,d)
        }else{
          pp=eval(pp)
          for(var k in d){
            pp[k]=d[k]
          }
        }
      }catch(e){}
    }
  },
  //generateDataByRegex
  generateDataByRegex:function(d,key,dd,kk,_notParseInsertCode){
    let _apiData
    d=_handleData(d,key,dd,kk)
    function _handleData(d,_key,dd,kk){
      if(!d){
      }else if([String,RegExp].includes(d.constructor)){
        let s=d.toString()
        if(s.match(/^[\/].+[\/]$/)){
          d= $util.generateWordsByRegex(s,_key,dd,kk)
        }else{
          d=!_notParseInsertCode&&s.match(/\{\{.+\}\}/)?_JSHandler._prepareData(s):s
        }
        if(d&&!window.extensionContent&&d.constructor==BZApiDataPicker){
          _apiData=d
        }
      }else if([Object,Array].includes(d.constructor)){
        for(var k in d){
          d[k]= _handleData(d[k],k,d,k,1)
        }
      }
      return d
    }
    
    if(_apiData){
      _apiDataHandler._registerExeFun(function(){
        _doIt(d)
      })
    }else{
      _doIt(d)
    }
    return d
    
    function _doIt(d){
      if(dd){
        if(dd.constructor==Function){
          dd(d)
        }else if(kk){
          dd[kk]=d
        }
      }
    }
  },
    /*
    examples:
    let vs=[
      "[a-z]+[0-9]+",
      "BZ-name",
      "{today}",
      "{today-10}",
      "{today+10|MM/dd/yyyy}",
      "{today-1week|MM/dd/yyyy}",
      "{today+w}",
      "{today-1M}",
      "{today+M|MM/dd/yyyy}",
      "{today-1Y}",
      "{today+Y|MM/dd/yyyy}",
      "{today+10y+2M+1|MM/dd/yyyy}",
      "{this-month-first}",
      "{this-month-first+10|MM/dd/yyyy}",
      "{this-month-first+10M-2}",
      "{date:08/30/2020|MM/dd/yyyy|yyyy-MM-dd}",
      "{date:08/30/2020+y+1|MM/dd/yyyy|yyyy-MM-dd}",
      "{this-month,3}",
      "{date:08/20/2020+y+2M+12+7m+33s+3h|MM/dd/yyyy|yyyy-MM-dd hh:mm:ss}",
      "{last-month-first+y+2M+12+7m+33s+3h|MM/dd/yyyy|yyyy-MM-dd hh:mm:ss}"
    ]
    vs.forEach(v=>{
      console.log(v+": "+$util.generateWordsByRegex("/"+v+"/"))
    })
    */
  //generateWordsByRegex
  generateWordsByRegex(r,_key,_ddd,_kkk){
    try{
      if(!r){
        return _return(r)
      }
      r=r.toString()
      
      if(_Util._hasInsertCode(r)){
        r=_JSHandler._prepareData(r)
        return _return(r)
      }else if(_Util._hasCode(r)){
        r=eval(r)
        return _return(r)
      }
      
      if(r[0]=="/"&&r[r.length-1]=="/"){
        r=r.substring(1,r.length-1)
      }
      if(r[0]=="/"&&r[r.length-1]=="/"){
        return _return("/"+r+"/")
      }

      r=_Util._getRegexByBZName(r)
      let _std=r.match(/\{(label|random:?|search[\: ]|search-list[\: ]|new[\: ]|exist-new[\: ]|exist[\: ]|exist-list[\: ]|date[\: ]|time[\: ]|num|time|date|module|this|next|last|today|tomorrow|yesterday|timestamp|textstamp|longtextstamp)[^\}]*\}/g)
      if(_std){
        if(_std[0]=="{label}"){
          return _Util._idToName($util.generateWordsByRegex(r.replace("{label}",_key||_bzMessage._common._description)));
        }else if(_std[0]&&_std[0].startsWith("{random")){
          return _return(_getRandom(_std[0]))
        }else if(_std[0]&&_std[0].startsWith("{exist")){
          console.log("BZ-LOG: "+_std[0])
          let v= _return(_getExist(_std[0]))
          return v
        }else if(_std[0]&&_std[0].startsWith("{new")){
          console.log("BZ-LOG: "+_std[0])
          return _return(_getCreate(_std[0]))
        }else if(_std[0]&&_std[0].startsWith("{search")){
          console.log("BZ-LOG: "+_std[0])
          return _return(_getSearch(_std[0]))
        }
        _std.forEach(s=>{
          let _stdValue=getStandard(s)
          let vs=r.split(s)
          let _result=""
          for(var i=0;i<vs.length;i++){
            _result+=vs[i]
            if(i<vs.length-1){
              _result+=_stdValue
            }
          }
          r=_result
        })
        return $util.generateWordsByRegex(r,_key,_ddd,_kkk)
      }else{
        _std=r.match(/\{data[\: ](.+)\}/)
        if(_std){
          _std=_std[1]
          _std=_std.replace(/[\=\>\<\!]/g,"")
          return _return(_std)
        }else{
          var vs=[];
          var m=1;
          if(m.constructor!=Number){
            m=1
          }
          for(var i=0;i<m;i++){
            vs.push(new RandExp(r).gen())
          }
          vs=vs[0]
          
          return _return(vs)
        }
      }
    }catch(e){}
    
    function _return(v){
      if(_ddd){
        if(_ddd.constructor==Function){
          _ddd(v)
        }else{
          _ddd[_kkk]=v
          if(v&&v.constructor==Promise){
            v.then(x=>_ddd[_kkk]=x)
          }
        }
      }
      return v===null?undefined:v
    }
    function _getRandom(vv){
      let v=vv.split(":")[1]
      if(v){
        v=v.substring(0,v.length-1)
        v=v.split("|")
        if(v[0].match(/^[0-9-\.]+$/)||_Util._hasCode(v[0])){
          return _getRandomNumber(v[0],v[1])
        }else if(v.length>1){
          v=$util.randomItem(v)
          if(v){
            return v.value
          }
        }
      }
      return "/"+vv+"/"
    }
    
    function _getRandomNumber(vv,ee){
      let v1,v2,e,v=vv.split(/[-~]/)
      if(_Util._hasCode(vv)){
        v=vv.split(/~/)
      }
      if(v.length>1){
        v1=parseFloat(_Util._stringToData(v[0]))
        v2=parseFloat(_Util._stringToData(v[1]));
      }else{
        v1=0
        v2=v;
      }
      let vvv=Math.random()*(v2-v1)+v1,l=1;
      if(v[0].match(/[0-9]+\.[0-9]+/)){
        l=v[0].split(".")[1].length
        l=Math.pow(10,l)
      }else if(v[1].match(/[0-9]+\.[0-9]+/)){
        l=v[1].split(".")[1].length
        l=Math.pow(10,l)
      }
      vvv=vvv*l
      v= Math.round(vvv)/l
      if(v>v2){
        v=v2
      }
      if(ee){
        e=ee.split(",")
        if(e.includes(v+"")&&v1!=v2){
          return _getRandomNumber(vv,ee)
        }
      }
      return v
    }
    
    async function _getExist(v){
      let s={};
      if(v.match(/\{exist-list[ :]/)){
        s={_list:1}
        v=v.replace(/\{exist-list[ :](.+)\}/,"$1")
      }else if(v.match(/\{exist-new[ :]/)){
        s={_new:1}
        v=v.replace(/\{exist-new[ :](.+)\}/,"$1")
      }else{
        v=v.replace(/\{exist[ :](.+)\}/,"$1")
      }
      return await _aiAPI._getExistData(v,s,_ddd,_kkk)
    }
    
    async function _getCreate(v){
      let s;
      v=v.replace(/\{new[ \:](.+)\}/,"$1")
      return await _aiAPI._createData(v,_ddd,_kkk)
    }
    async function _getSearch(v){
      let s={};
      if(v.match(/\{search-list[ :]/)){
        s={_list:1}
        v=v.replace(/\{search-list[ :](.+)\}/,"$1")
      }else if(v.match(/\{search-new[ :]/)){
        s={_new:1}
        v=v.replace(/\{search-new[ :](.+)\}/,"$1")
      }else{
        v=v.replace(/\{search[ :](.+)\}/,"$1")
      }
      return await _aiAPI._searchData(v,s,_ddd,_kkk)
    }

    function getStandard(v){
      let now=new Date(),n,d=new Date();
      var y=d.getFullYear(),m=d.getMonth();
      
      v=v.substring(1,v.length-1)
      v=v.split("|")
      if(v.length>1&&v[0].startsWith("date:")){
        return _getDate(v[0],v[1],v[2])
      }
      var w=v[0].match(/[a-z-]+[a-z]/),c;
      if(!w){
        w=v[0]
      }else{
        w=w[0]
        c=v[0].substring(w.length)
      }
      switch(w){
        case "now": 
        case "this":
        case "this-month":
        case "today": 
          break;
        case "num": 
          $project._tmpIdx=$project._tmpIdx||1
          return $project._tmpIdx++
        case "module": 
          let _tmpModule=window._tmpTakeDataModule||BZ._getCurModule()
          if(_tmpModule){
            return _tmpModule._data.name.replace(/[ ,\.-]+/g,"-")
          }
          return "Module"
        case "timestamp": return Date.now();
        case "time": return _Util._formatTimestamp(0,"hh:mm:ss");
        case "date": return _Util._formatTimestamp(0,"yyyy-MM-dd");
        case "this-month-first": 
          d.setDate(1)
          break;
        case "this-month-end":
          d.setDate(_getLastDate(d.getMonth()+1,d.getYear()))
          break;
        case "this-year-first": 
          d.setDate(1)
          d.setMonth(0)
          break;
        case "this-year-end":
          d.setMonth(11)
          d.setDate(31)
          break;
        case "tomorrow": 
          d=new Date(d.getTime()+86400000);
          break;
        case "longtextstamp":
          w=_Util._to62(parseInt(Date.now()/1000))
          if(_cooperatorHandler._data.inService){
            w+=_cooperatorHandler._data.key
          }
          return w
        case "textstamp":
          w=_Util._to36(parseInt(Date.now()/1000))
          if(_cooperatorHandler._data.inService){
            w+=_cooperatorHandler._data.key
          }
          return w
        case "timestamp":
          w=parseInt(Date.now()/1000)+""
          if(_cooperatorHandler._data.inService){
            w+=_cooperatorHandler._data.key
          }
          return w
        case "yesterday":
          d=new Date(d.getTime()-86400000);
          break;
        case "last-year":
          d.setYear(y-1);
          break
        case "last-year-first":
          d.setMonth(0)
          d.setDate(1);
          d.setYear(y-1);
          break
        case "last-year-end":
          d.setMonth(11)
          d.setDate(31);
          d.setYear(y-1);
          break
        case "last-month": 
          if(d.getMonth()){
            d.setMonth(d.getMonth()-1);
          }else{
            d.setMonth(11);
            d.setYear(y-1)
          }
          break
        case "last-month-first": 
          d.setDate(1);
          d.setMonth(d.getMonth()-1);
          break
        case "last-month-end": 
          d.setDate(1);
          if(d.getMonth()){
            d.setMonth(d.getMonth()-1);
          }else{
            d.setMonth(11);
            d.setYear(y-1)
          }
          d.setDate(_getLastDate(d.getMonth()+1,d.getYear()));
          break
        case "last-hour":
          d=new Date(d.getTime()-3600000)
          break
        case "last-minute":
          d=new Date(d.getTime()-60000)
          break
        case "last-second":
          d=new Date(d.getTime()-1000)
          break
        case "last-mon":
          n=6
        case "last-tus":
        case "last-tue":
            n=n||5
        case "last-wed":
          n=n||4
        case "last-thu":
          n=n||3
        case "last-fri":
          n=n||2
        case "last-sat":
          n=n||1
        case "last-sun":
          n=n||7
          d=new Date(d.getTime()-86400000*(n+d.getDay()))
          break
        case "next-year":
          d.setYear(y+1);
          break
        case "next-year-first":
          d.setMonth(0)
          d.setDate(1);
          d.setYear(y+1);
          break
        case "next-year-end":
          d.setMonth(11)
          d.setDate(31);
          d.setYear(y+1);
          break
        case "next-month": 
          d.setMonth(d.getMonth()+1);
          break
        case "next-month-first":
          d.setDate(1);
          d.setMonth(d.getMonth()+1);
          break
        case "next-month-end": 
          d.setMonth(d.getMonth()+1);
          if(d.getMonth()+1==12){
            d.setDate(_getLastDate(0,d.getYear()+1));
          }else{
            d.setDate(_getLastDate(d.getMonth()+1,d.getYear()));
          }
          break
        case "next-hour":
          d=new Date(d.getTime()+3600000)
          break
        case "next-minute":
          d=new Date(d.getTime()+60000)
          break
        case "next-second":
          d=new Date(d.getTime()+1000)
          break
        case "next-mon":
          n=8-now.getDay();
        case "next-tus":
        case "next-tue":
          n=n||9-now.getDay();
        case "next-wed":
          n=n||10-now.getDay();
        case "next-thu":
          n=n||11-now.getDay();
        case "next-fri":
          n=n||12-now.getDay();
        case "next-sat":
          n=n||13-now.getDay();
        case "next-sun":
          n=n||7-now.getDay()
          d=new Date(d.getTime()+86400000*n)
          break
        case "this-mon":
          n=n||1
        case "this-tus":
        case "this-tue":
          n=n||2
        case "this-wed":
          n=n||3
        case "this-thu":
          n=n||4
        case "this-fri":
          n=n||5
        case "this-sat":
          n=n||6
        case "this-sun":
          n=n||0
          if(n){
            d=new Date(now.getTime()+86400000*(n-now.getDay()))
          }else{
            d=new Date(now.getTime()-86400000*now.getDay())
          }
      }
      
      if(c){
        if(c[0]==","){
          //for this month, last month, next month only
          d.setDate(parseInt(c.substring(1)))
        }else{
          d=_countDay(d,c)
        }
      }
      
      
      if(v.length==1){
        v.push(_IDE._data._setting.dateFormat||"yyyy-MM-dd")
      }
      return _Util._formatTimestamp(d.getTime(),v[1].replace(/Y/g,"y").replace(/D/g,"d"));
      // for(var i=1;i<v.length;i++){
        // if(v[i].match(/^[0-9]+$/)){
          // d.setDate(parseInt(v[1]))
        // }else if(v[i].match(/^[0-9]+-[0-9]+$/)){
          // var vv=v[i].split("-")
          // d.setDate(parseInt(vv[1]))
          // d.setMonth(parseInt(vv[0])-1)
        // }else if(v[i]=="end"){
          // d.setDate(_getLastDate(d.getMonth()+1,d.getFullYear()))
        // }else{
          // return v[i].replace(/yyyy/i,d.getFullYear())
                 // .replace(/yy/i,_Util._formatNumberLength(d.getFullYear()%100))
                 // .replace(/MM/,_Util._formatNumberLength(d.getMonth()+1))
                 // .replace(/dd/i,_Util._formatNumberLength(d.getDate()))
                 // .replace(/hh/i,_Util._formatNumberLength(d.getHours()))
                 // .replace(/mm/,_Util._formatNumberLength(d.getMinutes()))
                 // .replace(/ss/i,_Util._formatNumberLength(d.getSeconds()))
                 // .replace(/M/,d.getMonth()+1)
                 // .replace(/d/i,d.getDate())
                 // .replace(/h/i,d.getHours())
                 // .replace(/m/,d.getMinutes())
                 // .replace(/s/i,d.getSeconds())
        // }
      // }
      
    }
    
    function _getLastDate(m,y){
      if([1,3,5,7,8,10,12].includes(m)){
        return 31
      }else if(m==2){
        return y%4?28:29
      }
      return 30
    }
    
    function _countDay(d,v){
      if(v){
        v=v.match(/[+-]([0-9]*y|[0-9]*M|[0-9]*w|[0-9]*d|[0-9]*h|[0-9]*m|[0-9]*s|[0-9]+)/gi)
        v&&v.forEach(vv=>{
          vv=vv.match(/([-+])([0-9]*)(y|Y|M|w|W|h|H|d|D|m|S|s)*/)
          if(!vv[2]){
            vv[2]=1
          }
          v=parseInt(vv[1]+vv[2])
          
          switch(vv[3]){
            case "Y":
            case "y":d.setYear(d.getFullYear()+v);break;
            case "M":d.setMonth(d.getMonth()+v);break;
            case "W":
            case "w":d.setDate(d.getDate()+v*7);break;
            case "H":
            case "h":d.setHours(d.getHours()+v);break;
            case "m":d.setMinutes(d.getMinutes()+v);break;
            case "S":
            case "s":d.setSeconds(d.getSeconds()+v);break;
            case "d":
            case "D":
            default:
              d.setDate(d.getDate()+v)
          }
        })
      }      
      return d
    }
    //d: date, pf: parse date format, ft: format to
    function _getDate(d,pf,ft){
      d=d.substring(5)
      ft=ft||pf
      let f1=pf.split(_Util._allSign),
          f2=pf.split(_Util._allLetterAndNumber),
          d1=d.split(_Util._allSign),
          d2=d.split(_Util._allLetterAndNumber),c,ii=0,i=0,df={},fd="",
          ff=/yyyy|YYYY|yy|YY|MM|M|DD|dd|D|d|HH|H|hh|h|mm|m|SS|ss|S|s/g,
          di=["yy","yyyy","YY","YYYY","MM","M","DD","dd","D","d","HH","hh","H","h","mm","m","SS","ss","S","s"]
          
      _Util._spliceAll(f1,a=>{return !a})
      _Util._spliceAll(f2,a=>{return !a})
      _Util._spliceAll(d1,a=>{return !a})
      _Util._spliceAll(d2,a=>{return !a})
      d1.splice(f1.length)
      d2.splice(f2.length)
      if(f1.length){
        if(f1.length==1){
          i=f1[0].length
        }else{
          i=f1.reduce((v,o)=>{
            return (v.length||v)+(o?o.length:0)
          })
        }
      }
      if(f2.length){
        if(f2.length==1){
          ii=f2[0].length
        }else{
          ii=f2.reduce((v,o)=>{
            return (v.length||v)+(o?o.length:0)
          })
        }
      }
      i+=ii
      c=d.substring(i)
      d=d.substring(0,i)
      
      f1.forEach((v,j)=>{
        v=v.match(ff)
        v&&v.forEach(vv=>{
          if(v.length==1){
            df[vv]=d1[j]
          }else{
            df[vv]=d1[j].substring(0,vv.length)
            d1[j]=d1[j].substring(vv.length)
          }
        })
      })

      // di.forEach(v=>{
        // fd+=df[v]||""
        // if(
      // })
      d=new Date()
      d.setDate(1)
      for(let kk in df){
        let k=kk[0]
        if(k=="D"||k=="d"){
          let v=df[kk]
          delete df[kk]
          df[kk]=v
        }
      }
      for(let kk in df){
        let k=kk[0],
            v=df[kk]
            v=parseInt(v)||v
        switch(k){
          case "Y":
          case "y":
            if(kk.length==2){
              if(v>70){
                v+=1900
              }else{
                v+=2000
              }
            }
            d.setYear(v);
            break;
          case "M":d.setMonth(v-1); break;
          case "D":
          case "d":d.setDate(v);break;
          case "H":
          case "h":d.setHours(v);break;
          case "m":d.setMinutes(v);break;
          case "S":
          case "s":d.setSeconds(v);
        }
      }
      
      d=_countDay(d,c)
      return _Util._formatTimestamp(d.getTime(),ft)
    }
  },
  triggerHover:function(o){
    let cs=_cssHandler._findHoverCssByElement(o)||[]
    cs.forEach(x=>{
      let o=x.o
      o._tmpClass=o._tmpClass||("bz"+bzComm._newId())
      $(o).addClass(o._tmpClass)
      let c=x.v.split(":hover")
      let _last=c.pop()
      let _key=c.pop()
      c=c.join("")+_key+"."+o._tmpClass+_last
      let v=x.css.split("{")
      v.shift()
      v="{"+v.join("{")
      o._rule=c+v
      _Util._addCSSRule(o._rule)
    })

    return cs
  },
  //triggerKeyEvents
  triggerKeyEvents:function(o,k,ch,c,a,s,_fun){ //c:ctrl, a:alt, s:shift
    if(_Util._isSysButton(o)&&[13,32].includes(k)){
      return $util.triggerMouseEvents(o,"click",0,0,0,0,0,_fun)
    }

    $(o).focus();
    setTimeout(()=>{
      // o._bzSetKeyPress=0;
      try{
        $util.triggerKeyEvent(o,"keydown",k,ch,c,a,s)
      }catch(e){
        bzComm._log("util: "+1345+" "+e.stack)
      }
      _exe("_keydownDone",function(){
        if((!c && !a) || _Util._checkBrowserType().name=="firefox"){
          if(_Util._isHidden(o)){
            return _finalFun()
          }
          $util.triggerKeyEvent(o,"keypress",k,ch,c,a,s)
          _exe("_keypressDone",function(){
            if(_Util._isHidden(o)){
              return _finalFun()
            }
            $util.triggerKeyEvent(o,"textInput",k,ch,c,a,s);
            if(_Util._isHidden(o)){
              return _finalFun()
            }
            $util.triggerKeyEvent(o,"input",k,ch,c,a,s);
            if(_Util._isHidden(o)){
              return _finalFun()
            }
            try{
              $util.triggerKeyEvent(o,"keyup",k,ch,c,a,s);
              if(k==9 && ["INPUT","SELECT","A","LINK","BUTTON","TEXTAREA"].includes(o.tagName)){
                _Util._focusNextByTab(o)
              }
            }catch(ex){
            }
            _finalFun()
          })
        }else{
          $util.triggerKeyEvent(o,"keyup",k,ch,c,a,s);
          _finalFun()
        }
      })
    },1)
    function _exe(k,_next,_timer){
      _timer=_timer||Date.now()
      if(o[k]||Date.now()-_timer>50){
        o[k]=0
        console.log("next ...")
        return _next()
      }
      setTimeout(function(){
        console.log(k)
        _exe(k,_next,_timer)
      },1)
    }
    
    function _finalFun(){
      _fun&&_fun()
    }
  },
  triggerKeyEvent:function(o,e,k,ch,c,a,s){
    if(!bzComm._isApp()){
      o=_Util._getQuickPath(o)
      bzComm.postToApp({
        fun:"triggerKeyEvent",
        scope:"$util",
        ps:[o,e,k,ch,c,a,s]
      })
      return
    }else{
debugger
      o=_Util._getElementByQuickPath(o)

    }
    if(!o){
      return
    }

    $(o).focus()

    let d={
      key: $util.keyCodeMap[k],
      keyCode: k,
      code: $util.keyCodeMap[k],
      which: ch,
      bubbles: true,
      cancelable: true,
      view: window
    };
    // 创建并触发 keydown 事件
    e = new KeyboardEvent(e, d);
    o.dispatchEvent(e);
  },
  //o:element, e:event, b:button, x, y, c:ctrlKey, a:alt, s:shift, t:target,tr:dataTransfer
  //triggerMouseEvent
  triggerMouseEvent:function(o,e,b,x,y,c,a,s,tr,_fun){
    if(!o){
      return
    }else if(o.constructor==Array){
      o.forEach(oo=>{
        $util.triggerMouseEvent(oo,e,b,x,y,c,a,s,tr)
      })
      return _fun&&_fun()
    }

    var _curWin=_Util._getWindowFromDom(o);
    if(o.tagName=="CANVAS"&&o.bzTxtElement&&(["click","mousedown","dblclick"].includes(e)||("mouseup"==e&&x==-1&&y==-1))){
      let r=o.getBoundingClientRect(),
          te=o.bzTxtElement;
      if(o._offset){
        x=o._offset.x
        y=o._offset.y
      }else{
        x=r.left+te.x+te.w/2
        y=r.top+te.y+te.h/2
      }
    }
    b=parseInt(b||1);
    x=parseInt(x||0)
    y=parseInt(y||0)
    if(b==2 && e=="click"){
      e="contextmenu"
    }else if(e=="click"){
      b=0
    }
    if(o.tagName!="CANVAS"){
      let ro=o.getBoundingClientRect()
      if(ro.left>x||ro.top>y){
        x=ro.left+ro.width/2;
        y=ro.top+ro.height/2
      }
    }
    var ps={
      'view': _curWin,
      'bubbles':true,
      //composedPath:$util.getComposedPath(o),
      'cancelable': true,
      buttons:parseInt(b),
      ctrlKey:c,
      metaKey:false,
      altKey:a,
      shiftKey:s,
      clientX:x,
      clientY:y,
      pointerX:x,
      pointerY:y,
      relatedTarget:null
    },_event
    if(tr){
      ps.dataTransfer=tr;
      ps.target=o;
      _event = new DragEvent(e, ps);
    }else{
      _event = new MouseEvent(e, ps);
    }
    o.dispatchEvent(_event);
    if(e=="mouseover"){
      o.dispatchEvent(new MouseEvent("mouseenter",ps));
    }else if(e=="mousedown"){
      o.dispatchEvent(new MouseEvent("pointerdown",ps));
    }else if(e=="mouseup"){
      o.dispatchEvent(new MouseEvent("pointerup",ps));
    }else if(e=="mousemove"){
      o.dispatchEvent(new MouseEvent("pointermove",ps));
    }
    if(_fun){
      _fun()
    }
  },
  // getComposedPath:function(o){
    
  // },
  //triggerFocusEvent
  triggerFocusEvent:function(o){
    var _event=new FocusEvent("focus")
    o.dispatchEvent(_event)
  },
  //triggerWheelEvent
  triggerWheelEvent:function(o,x,y,z,c,a,s){
    var _event = new WheelEvent({
      'view': _curWin,
      'bubbles': true,
      'cancelable': true,
      ctrlKey:c,
      metaKey:false,
      altKey:a,
      shiftKey:s,
      deltaX:v,
      deltaY:v,
      deltaZ:v
    });
    o.dispatchEvent(_event);
    
  },
  //triggerDblClickEvents
  triggerDblClickEvents:function(o,b,x,y,c,a,s){
    $util.triggerMouseEvents(o,b,x,y,c,a,s)
    $util.triggerMouseEvents(o,b,x,y,c,a,s)
    $util.triggerMouseEvent(o,"dblclick",b,x,y,c,a,s);
  },
  //triggerMouseEvents
  triggerMouseEvents:function(o,b,x,y,c,a,s,_fun){
    x=x||1
    y=y||1
    _Util._focusElement(o)
    let _focus=$(":focus")[0]
    this.triggerMouseEvent(o,"mouseenter",0,x,y,c,a,s);
    this.triggerMouseEvent(o,"mouseover",0,x,y,c,a,s);
    this.triggerMouseEvent(o,"mousemove",0,x,y,c,a,s);
    this.triggerMouseEvent(o,"mousedown",b,x,y,c,a,s);
    if(o.tagName=="CANVAS"&&o.bzTxtElement){
      this.triggerMouseEvent(o,"mouseup",b,-1,-1,c,a,s);
    }else{
      this.triggerMouseEvent(o,"mouseup",b,x,y,c,a,s);
    }
    this.triggerMouseEvent(o,"click",b,x,y,c,a,s);
    let _focus2=$(":focus")[0]
    if(_Util._isFocusable(o)){
      if(!_focus2||_focus2==_focus){
        this.triggerFocusEvent(o)
      }
    }else if(_focus2){
      _focus2.blur()
    }
    if(_fun){
      _fun()
    }
  },
  //triggerChangeEvent
  triggerChangeEvent:function(o,v,_blur,_result,_withEnter,_withSubmit,_fun,_noAutoSelect){
    if(!_withEnter&&!_withSubmit&&o.tagName=="INPUT"&&o.type!="file"){
      _Util._preTriggerEvent()
    }else{
      _noAutoSelect=1 
    }
    var ff,ov=v;

    o.focus()
    _addDirtyMark()
    _doIt()
    // $util.triggerMouseEvents(o,1,0,0,0,0,0,function(){
    //   setTimeout(()=>{
    //   },v=="christina@pivohub"?3000:0)
    // })
  //    o.value=this._getRealWord(o,v);
    function _doIt(){
      try{
        if(!_Util._isStdInputElement(o)){
          if(!o.attributes["contenteditable"]&&(!v||$util.getElementText(o).includes(v)||v.startsWith("/{random"))){
            return $util.triggerMouseEvents(o,1,0,0,0,0,0)
          }else if(o.attributes["contenteditable"]){
            o.innerHTML=v;
          }
        }else if(o.tagName=="SELECT"){
          v=v.toLowerCase().trim()
          var _best=0,_found;
          for(var i=0;i<o.options.length;i++){
            var t=o.options[i].text || o.options[i].textContent||"";
            t=t.toLowerCase()
            if(v==t){
              o.options[i].selected=_found=true;
              break
            }else if(v.includes(t)){
              if(t.length>_best){
                _best=t.length
                o.options[i].selected=_found=true;
              }
            }else if(t.includes(v)){
              if(v.length>_best){
                _best=v.length
                o.options[i].selected=_found=true;
              }
            }
          }
          if(!_found&&_result){
            _result._type=2;
            _result._msg=_Util._formatMessage(_bzMessage._action._setValueFailed,[ov])
          }
        }else if(o.type=="file"){
          _uploadHandler._setFileValue(o,v);
        }
        
        try{
          if(o.type!="file"){
            //trigger react event
            if(o.tagName=="INPUT"){
              o.value=v
              var nativeInputValueSetter = Object.getOwnPropertyDescriptor(o.ownerDocument.defaultView.HTMLInputElement.prototype, "value").set;
              nativeInputValueSetter.call(o,v);
            }else if(o.tagName=="TEXTAREA"){
              o.value=v
              var nativeInputValueSetter = Object.getOwnPropertyDescriptor(o.ownerDocument.defaultView.HTMLTextAreaElement.prototype, "value").set;
              nativeInputValueSetter.call(o,v);
            }else if(o.tagName!="SELECT"){
              if(o.value!=v){
                o.value=v
              }
            }
          }
          var event = new Event("input", { bubbles: true });
          o.dispatchEvent(event);
        }catch(e){
          bzComm._log("util 1664: "+e.message)
          BZ._reportAppInfo("error on Set: "+e.stack)
        }
        try{
          var event = new Event("change", { bubbles: true });
          o.dispatchEvent(event);
        }catch(e){
          console.log(e.stack);
        }
        if(_withEnter){
          $util.triggerEnterEvent(o);
          _doFinal()
        }else if(_withSubmit){
          $util.triggerSubmitEvent(o,0,()=>{
            _doFinal()
          });
        }else if(!_noAutoSelect){
          return _autoClickMenuAfterSetValue(v,o,_doFinal)
        }else{
          return _doFinal()
        }
      }catch(eee){
        bzComm._log("util: "+eee.stack)
        console.log(eee.stack);
        _doFinal()
      }
    }

    // 
    function _doFinal(){
      bzComm._log("util: "+1709+(_fun?1:0))
      if(_blur){
        setTimeout(()=>{
          $util.triggerBlurEvent(o);
          _fun&&_fun()
        },1)
      }else{
        _fun&&_fun()
      }
    }
    function _autoClickMenuAfterSetValue(v,dom,_afterFun){
      if(!_handleDiff(v,dom,_afterFun)){
        if(!_Util._isHidden(dom)){
          $util.triggerKeyEvents(dom,null,null,false,false,false,_afterFun);
        }else{
          _afterFun&&_afterFun()
        }
        setTimeout(()=>{
          if(!_Util._isHidden(dom)){
            _handleDiff(v,dom)
          }
        },50)
      }else{
      }
    }

    function _handleDiff(v,dom,_afterFun){
      try{
        let _diff=_Util._getDiffAfterTriggerEvent()
        if(_diff){
          _diff=$(_diff).find(`:Contains(${v})`).toArray()
          if(_diff.length){
            _diff=_diff.filter((x,i)=>{
              if(_diff.length-i>1){
                return !$(_diff[i]).find(_diff[i+1])[0]&&x.getBoundingClientRect().width>20
              }else{
                return 1
              }
            })
            if(_diff.length){
              let ds=_diff.filter(x=>x.getBoundingClientRect().width&&x.innerText.trim())
              if(!ds.length){
                return
              }else{
                _diff=ds
              }
              ds=_diff.filter(x=>x.innerText.trim().toLowerCase().startsWith(v.toLowerCase()))
              if(ds.length){
                _diff=ds
              }
              if(_diff.find(x=>{
                if(_Util._isInMenu(x,o)){
                  bzComm._log("Click menu: "+x.outerHTML)
                  $util.triggerMouseEvents(x,1,0,0,0,0,0,function(){
                    $util.triggerKeyEvents(dom,null,null,false,false,false,_afterFun);
                  })
                  return 1
                }
              })){
                return 1
              }
            }
          }
        }
      }catch(ex){
        BZ._reportAppInfo("Set input 88: "+ex.message+"\n"+ex.stack)
      }
    }

    function _addDirtyMark(){
      let v=_IDE._data._setting.content.dirtyMarkOnSet||""
      if(v[0]=="."){
        v=v.substring(1)
        o.classList.add(v)
      }else if(v){
        v=v.split("=").map(x=>x.trim())
        $(o).attr(v[0],v[1]||"")
      }
    }
  },
  triggerSubmitEvent:function(_submitter,_form,_fun){
    if(!bzComm._isApp()){
      if(!_form){
        _form=_Util._getParentElementByCss("form",_submitter)
        if(!_form){
          _fun&&_fun()
        }
      }
      _form=_Util._getQuickPath(_form)
      if(_submitter){
        _submitter=_Util._getQuickPath(_submitter)
      }
      bzComm.postToApp({
        fun:"triggerSubmitEvent",
        scope:"$util",
        ps:[_submitter,_form],
        insertCallFun:1,
        return:_fun
      })
    }else{
      if(_submitter){
        _submitter=_Util._getElementByQuickPath(_submitter)
      }
      _form=_Util._getElementByQuickPath(_form)
      if(_form){
        _form.dispatchEvent(new SubmitEvent('submit', {
          bubbles: true,
          cancelable: true,
          submitter:_submitter
        }));
      }
      _fun&&_fun()
    }
  },
  triggerEnterEvent:function(o){
    //update for amol
    //https://eu.boozang.com/extension?id=5e418338bf3c4f7262a4b221#5e418338bf3c4f7262a4b221/Latest/m10/m18/t32/12/
    $util.triggerKeyEvent(o,"keydown",13,0);
    $util.triggerKeyEvent(o,"keypress",13,0);
    $util.triggerKeyEvent(o,"keyup",13,0);

    // 选择要触发事件的元素
    // let d={
    //   key: "Enter",
    //   keyCode: 13,
    //   code: "Enter",
    //   which: 13,
    //   bubbles: true,
    //   cancelable: true
    // }
    // // 创建并触发 keydown 事件
    // let e = new KeyboardEvent("keydown", d);
    // o.dispatchEvent(e);

    // // 创建并触发 keypress 事件
    // e = new KeyboardEvent("keypress", d);
    // o.dispatchEvent(e);

    // // 创建并触发 keyup 事件
    // e = new KeyboardEvent("keyup", d);
    // o.dispatchEvent(e);
  },
  triggerTabEvent:function(o){
    $util.triggerKeyEvent(o,"keydown",9,0);
    $util.triggerKeyEvent(o,"keypress",9,0);
    $util.triggerKeyEvent(o,"keyup",9,0);

  },
  //triggerBlurEvent
  triggerBlurEvent:function(o,_fun){
    window.focus();
    if(window.extensionContent){
      var _path=_Util._getQuickPath(o)
      bzComm.postToApp({
        fun:"triggerEventOnApp",
        scope:"$util",
        ps:[_path,"Event",["blur"]],
        insertCallFun:1,
        return:_fun
      })
    }else{
      $util.triggerEventOnApp(o,"Event",["blur"],_fun)
    }
  },
  triggerEventOnApp:function(o,e,eps,_fun){
    o=_Util._getElementByQuickPath(o)
    e=new window[e](...eps)
    o.dispatchEvent(e)
    o.blur()
    _fun&&_fun()
  },
  findDoms:function(p){
    let o=_Util._findDoms(p)
    return o.toArray?o.toArray():o
  },
  //findDom
  findDom:function(paths,_errOnHidden){
    var os=_Util._findDoms(paths,_errOnHidden)
    if(os){
      os=os[0]
    }
    return window.$element=os
  },
  getParameterFromUrl:function(k,_url){
    let p={}
    _url=(_url||location.search).substring(1)
    _url.split("&").forEach(function(v){
      v=v.split("=")

      if(v[0]){
        p[v[0]]=v[1]
      }
    })
    return k?p[k]:p
  },
  //isDomExist
  isDomExist:function(p){
    return Boolean($util.findDom(p))
  },
  //nextKey
  // nextKey:function(d,ck){
  //   var _bNext=!ck && ck!=0;
  //   for(var k in d){
  //     if(k==ck){
  //       _bNext=true;
  //     }else if(_bNext){
  //       return k;
  //     }
  //   }
  //   return null;
  // },
  //getCurEnvironment
  getCurEnvironment:function(){
    var v= _Util._clone(BZ._curEnv)
    v.items.forEach((o,i)=>{
      let t=_aiAuthHandler._data[i]
      if(t){
        o.token=t.tokenValue
      }
    })
    return v;
  },
  getTokenByHostId:function(i){
    if(i===undefined){
      i=BZ._getCurTest()
      if(i){
        i=i._data.hostId
        i=_aiAuthHandler._getTokenHostIdxByUIHostIdx(i)
      }
    }
    return _aiAuthHandler._getToken(i||0)
  },
  setToken:function(v,i){
    if(v){
      if(v.constructor==String){
        v=v.trim()
        v.replace(/^authorization[^a-z0-1](.+)/i,"$1");
        v={
          Authorization:v
        }
      }
      if(i===undefined){
        i=_IDE._getDefaultAPIHostIdx()||0
      }
      _aiAuthHandler._setToken({
        tokenValue:v,
        _tokenHost:i
      })
    }
  },
  //removeToken
  removeToken:function(i){
    $aiAPI.removeToken(i)
  },
  //getCurEnvironmentIdx
  getCurEnvironmentIdx:function(){
    return _IDE._data._setting.curEnvironment
  },
  //setEnvironment
  setEnvironment:function(v){
    _IDE._data._setting.curEnvironment=v
    BZ._curEnv=_IDE._data._setting.environments[v];
    BZ._setSharedData({
      "BZ._curEnv":BZ._curEnv,
      "_IDE._data._setting.curEnvironment":_IDE._data._setting.curEnvironment
    })
  },
  //getCoopStatus
  getCoopStatus:function(d,n){
    return _cooperatorHandler._getCoopStatus(d,n)
  },
  //getCoopStatus
  getCoopStatus:function(d,n){
    return _cooperatorHandler._getCoopStatus(d,n)
  },
  //getCoopStatus
  getCoopStatus:function(d,n){
    return _cooperatorHandler._getCoopStatus(d,n)
  },
  //getCoopKey
  getCoopKey:function(){
    return _cooperatorHandler._data.key||0
  },
  //getCoopScope
  getCoopScope:function(){
    return _cooperatorHandler._data.inService?_cooperatorHandler._data.scope:""
  },
  //getCoopGroup
  getCoopGroup:function(){
    return _cooperatorHandler._data.inService?_cooperatorHandler._data.group:""
  }
}
/*******************************************************************************
//AI Functions
*******************************************************************************/
$aiAPI={
  // getModelAlias:function(o){
  //   if(o.constructor!=String){
  //     o=_descAnalysis._retrieveTextForElementPathItem(_cssHandler._findPath(o))||_descAnalysis._retrieveTextForElementPathItem(_cssHandler._findInputPath(o))||""
  //   }
  //   return _Util._toCamelWords(_Util._toSingularWord(o))
  // },
  //To generate test case by parameter: key
  getAccessTest:function(p,m){
    return _aiAPI._getAccessTest(p,m)
  },
  isSkipValue:function(v){
    return _aiAPI._isSkipValue(v)
  },
  deleteRef:function(d,k,m){
    _aiAPI._deleteRef(d,k,m)
  },
  //updateDataStatus
  updateDataStatus:function(data,step){
    _aiAPI._updateDataStatus(data,step)
  },
  //getExeSolutionByParameter
  getExeSolutionByParameter:function(p,toCreate){
    return _aiAPI._getExeSolutionByParameter(p,toCreate)||[]
  },
  async getExistData(express,takeList,data,key){
    if(takeList&&takeList.constructor!=Object){
      takeList={_list:1}
    }
    return await _aiAPI._getExistData(express,takeList||{},data,key)
  },
  searchData:function(express,takeList,data,key){
    if(takeList&&takeList.constructor!=Object){
      takeList={_list:1}
    }
    _aiAPI._searchData(express,takeList||{},data,key)
  },
  searchOrNewData:function(express,data,key){
    _aiAPI._searchData(express,{_new:1},data,key)
  },
  newData:function(express,data,key){
    _aiAPI._createData(express,data,key)
  },
  async initCurModuleData(fun){
    let d=_IDE._data._curModule._data
    return await _aiAPI._getExistData(d.alias||d.code,{_list:1},fun)
  },
  //removeToken
  removeToken:function(i){
    return _aiAPI._removeToken(i)
  },
  //addData
  addData:function(p,m,k){
    return _aiAPI._addData(p,m,k)
  },
  getModuleDataMap:function(m){
    return _aiAPI._getSysCtrlDataMap(m)
  },
  //updateData
  updateData:function(p,m,k){
    return _aiAPI._updateData(p,m,k)
  },
  //deleteData
  deleteData:function(p,m,k){
    return _aiAPI._deleteData(p,m,k)
  },
  rebuildData:function(d){
    return _aiAPI._rebuildData()
  },
  removeData:function(m,d){
    return _aiAPI._removeData(m,d)
  },
  //preHandleParameter
  preHandleParameter:function(p,t,m){
    return _aiAPI._preHandleParameter(p,t,m)
  },
  //getAllDataOfCurModule
  getAllDataOfCurModule:function(p){
    return _aiAPI._getAllDataOfCurModule(p)
  },
  //getAllRelatedDataOfCurModule
  getAllRelatedDataOfCurModule:function(m,mc){
    return _aiAPI._getAllRelatedDataOfCurModule(m,mc)
  },
  //stopRegexAction
  // stopRegexAction:function(r,p,k){
  //   return _aiAPI._stopRegexAction(r,p,k)
  // },
  //getCurRefModuleData
  // getCurRefModuleData:function(d,dn,k){
  //   return _aiAPI._getCurRefModuleData(d,dn,k)
  // },
  //assignCurtUser
  assignCurtUser:function(p){
    return _aiAPI._assignCurtUser(p)
  },
  assignUserByRole:function(d){
    _aiAuthHandler._assignUserByRole(d)
  },
  assignUserByUsername:function(d){
    _aiAuthHandler._assignUserByUsername(d)
  },
  //getAuthFlowByRole
  getAuthFlowByRole:function(t){
    return _aiAPI._getAuthFlowByRole(t)
  },
  getAccount:function(d,p){
    if(_Util._isEmpty(p)){
      p=0
    }
    if(p&&p.constructor==Object){
      return p
    }
    if(!d){
      d=$data(_aiAuthHandler._getModule()).data
    }

    return d&&(d.find((x,i)=>{
      if(!p){
        return 1
      }else if(p.constructor==String){
        return x.role==p
      }else{
        for(var k in p){
          if(p[k]!=x[k]){
            return
          }
        }
        return 1
      }
    })||d.find(x=>x.username==p))
  },
  //overwriteExistValue
  overwriteExistValue:function(d){
    return _aiAPI._overwriteExistValue(d)
  },
  //parseInnerData
  parseInnerData:function(d){
    return _aiAPI._parseInnerData(d)
  },
  getModuleDataById:function(v,m){
    return _aiAPI._getModuleDataById(v,m)
  },
  retrieveExistData:function(m,f,d){
    return _aiAPI._retrieveExistData(m,f,d)
  },
  toJSONParameter:function(v,fn,_insertIgnoreSubmit){
    v=v===null||v===undefined?{}:v
    if(v.constructor!=Object){
      let vv={}
      vv[fn]=v
      v=vv
    }
    if(_insertIgnoreSubmit){
      v.$ignoreSubmit=1
    }
    return v
  },
  getUpdateParameter:function(d,p){
    let n={}
    for(let k in p){
      if(d[k]!=p[k]){
        n[k]=p[k]
      }
    }
    return n
  }
}
//---------------------------------------------------------------------------------------------//
//Remove output function content
for(let k in $util){
  $util[k].toString=function(){}
}

for(let k in $aiAPI){
  $aiAPI[k].toString=function(){}
}

var __=function(v,c,_tab){
  if(!v){
    if(_IDE._data._curAction){
      BZ._log("_IDE._data._curAction")
    }else if(_IDE._data._curTest){
      BZ._log("_IDE._data._curTest")
    }else if(_IDE._data._curModule){
      BZ._log("_IDE._data._curModule")
    }else{
      BZ._log("_IDE._data._curVersion")
    }
    BZ._log("_IDE._data._curProject,_curVersion,_curModule,_curTest,_curAction,_Util,_CtrlDriver,_setting,_debug")
  }
  v=v||_IDE._data._curAction

  if(!v){
    var t=_IDE._data._curTest,m=_IDE._data._curModule,s=_IDE._data._curVersion.setting;
    var k=BZ._data._curPage._key;
    if(t){
      t=t._data;
      switch (k){
        case "_actions":v=t.actions;break;
        case "_data":v=t.dataMap;break;
      }
    }else if(m){
      v=m._data.dataMap
    }else{
      switch (k){
        case "_defaultData":v=s.defaultData;break;
        case "_service":v=s.service;break;
        // case "_preferences":v=curUser._curProject.setting.subscriptions;break;
        // case "_dictionary":v=s.dictionary;break;
        // case "_objectLib":v=s.objectLib;break;
        case "_contentPolice":v=s.content;break;
        case "_alias":v=s.aliasMap;break;
        case "_record":v=s.record;break;
      }
    }
  }
  if(_tab===undefined){
    _tab=2
  }
  return JSON.stringify(v,c,_tab);
}

function extendJQuery(){
  if(jQuery.expr[":"].include){
    return
  }

  var _bzExJQueryFun=/\:(attr|Contains|contains|hidden|show|input|data|link|near|panel|afterEqual|after|before|containCss|css|endContains|endEqual|equal|RowCol|rowcol|bz|textElement|blank|Attr|text) *(=|$)/g;

  /**
   * includes other element
   */
  jQuery.expr[":"].include= function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    m=m[3]

    if(!document._include||document._include.k!=m||Date.now()-document._include._time>1000){
      document._include={_time:Date.now(),k:m}
      
      m=m.replace(/\\:/g,":\r")
      let s=m.match(/[\-]? *\{[^\}]+\}/g)||[m]
      s=s.map(x=>{
        let n=x.match(/^([\-]? *)\{/)||""
        if(n){
          n=n[1].trim()
          if(n){
            x=x.substring(1)
          }
        }
        x=x.trim()
        if(x.match(/^\{.+\}$/)){
          x=x.substring(1,x.length-1)
        }

        let v=x.match(_bzExJQueryFun),vs=[]
        if(v){
          v.forEach(y=>{
            let i=x.indexOf(y)
            vs.push(x.substring(0,i))
            x=x.substring(i+y.length)
          })
          vs.push(x)
          x=vs.map((y,i)=>{
            y=y.trim().replace(/[:]\r/g,":")
            if(i){
              let vv=v[i-1].replace(/=$/,"").trim()
              if(y){
                y=vv+"("+y+")"
              }else{
                y=vv
              }
            }
            return y
          }).join("")
        }
        x=$(x).toArray()
        return {n:n,x:x}
      })
      document._include.os=s
    }
    return !document._include.os.find(x=>{
      let xx=$(a).find(x.x)[0]
      return x.n?xx:!xx
    })
  }

  jQuery.expr[":"].text=function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    var v2=m[3].toLowerCase().trim();
    if(!v2){
      return
    }
    v2=v2.replace(/\s+/," ")
    if(a.nodeType!=1){
      return
    }

    if(!document._text||document._text.k!=m[3]||Date.now()-document._text._time>1000){
      let f=document.body;

      // let o=_Util._findLabel(f,v2)

      // if(!o.length&&!_Util._isRegexData(v2)&&!v2.includes("|")){
      //   let vv=_Util._removeSign(v2," ")
      //   o=_Util._findLabel(f,vv,1)
      // }
      // o=o.map(x=>_cssHandler._findCellElement(x.o))

      let o=$(":Contains("+v2+")",f).toArray() 
      o=o.filter((x,i)=>{
        let n=o[i+1]
        return o.tagName=="LABEL"||_Util._isCellElement(o)||!n||!$(x).find(n)[0]
      })
      let _label=o.filter(x=>x.tagName=="LABEL")
      o=o.filter(x=>x.tagName!="LABEL")
      o.unshift(..._label)
      
      if(!o.length||!o.find(x=>x.innerText.trim().toLowerCase()==v2.toLowerCase())){
        let ks=_IDE._data._setting.content.contentAttribute.replace("placeholder","").replace(/\|\|/g,"|")
        let oa=$(`:attr(${ks}=${v2})`).toArray()
        if(!oa.length){
          oa=$(`input:attr(value=${v2})`).toArray()
          ks=["value"]
        }else{
          ks=ks.split("|")
        }
        if(oa.length){
          oa.forEach(x=>x._bzWordLength=_findBestAttrValue(x,ks))
          oa.sort((a,b)=>a._bzWordLength-b._bzWordLength)
          
          o=oa.filter(x=>x._bzWordLength==oa[0]._bzWordLength)
        }
      }

      document._text={
        _time:Date.now(),
        k:m[3],
        as:o
      }
    }

    let as=document._text.as
    return as.includes(a)||$(as).find(a)[0]||(["A","BUTTON"].includes(a.tagName)&&$(a).find(as)[0])
    function _findBestAttrValue(a,ks){
      let aa="";
      ks.forEach(x=>{
        x=a.attributes[x]||{}
        x=x.value
        if(x){
          if(x.toLowerCase().includes(v2.toLowerCase())){
            if(!aa||aa.length>x.length){
              aa=x
            }
          }
        }

      })
      a._bzWordLength=aa.length
      return aa.length
    }
  }

  jQuery.expr[":"].attr=function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    return _chkAttr(a,i,m)
  }

  jQuery.expr[":"].Attr=function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    return _chkAttr(a,i,m,1)
  }

  function _chkAttr(aa,i,m,_full){
    var v2=m[3],a=aa;
    v2=v2.split("=")
    var v1=v2.shift()
    v2=v2.join("=")

    v1=v1.replace("*","").trim()
    v1=v1.split("|")
    return v1.find(v1=>{
      if(v1=="checked"){
        if(v2=="false"){
          v2=false
        }
        if(v2==="true"){
          v2=true
        }
        return aa.checked==v2
      }
      if(v1!="value"){
        a=aa.attributes[v1]
      }
      if(a && a.value){
        try{
          if(_Util._isRegexData(v2)){
            v2=eval(v2)
            return a.value.match(v2)
          }
          if(v2.endsWith("\" i")||v2.endsWith("\i i")){
            v2=v2.substring(1,v2.length-3)
          }
          v2=_Util._filterTxt(v2)
          v2=_Util._trimSpace(v2)
          v1=_Util._filterTxt(a.value)
          
          if(v1==v2||(!_full&&v1.toLowerCase().includes(v2.toLowerCase()))){
            a._bzJq="attr"
            a._bzJqVal=v1
            return true
          }
        }catch(e){
          if(v1==v2){
            a._bzJq="attr"
            a._bzJqVal=_Util._filterTxt(a.value)
            return true
          }
        }
      }
    })
  }

  jQuery.expr[":"].Contains = function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    m=m[3]

    if(!document._Contains||document._Contains.k!=m||!document._Contains._tag.includes(a.tagName)||a._Contains||Date.now()-document._Contains._time>1000){
      // console.log("pre-handle-dom: "+m)
      // console.log("init Contains: "+a.tagName+","+m)
      let v2=m;
      if(!document._Contains||document._Contains.k!=m||Date.now()-document._Contains._time>1000){
        document._Contains=0
      }
      let _inHidden=jQuery._inHidden
      
      let _inRegex=_Util._isRegexData(v2)
      if(_inRegex){
        v2=v2.substring(1,v2.length-1)
        v2=new RegExp(v2,"im")
      }else{
        v2=v2.trim().toLowerCase();
        v2=_Util._filterTxt(v2)
        v2=v2.replace(/\*/g,".*")
      }
      let os=_Util._getElementsByWord(function(w){
        w=(w||"").trim().toLowerCase();
        if(_inRegex){
          return w.match(v2)
        }else{
          w=_Util._filterTxt(w)
          return _Util._includesWord(w,v2,1)
        }
      },a.tagName,document._Contains?document._Contains._inHidden:_inHidden,_Util._getRootDom(a))
      if(document._Contains){
        document._Contains._tag.push(a.tagName)
        document._Contains.os=document._Contains.os.concat(os)
      }else{
        document._Contains={
          _inHidden:_inHidden,
          _tag:[a.tagName],
          k:m,
          os:os,
          _time:Date.now()
        }
        jQuery._inHidden=_inHidden
      }
    }
    return document._Contains.os.includes(a)
  };

  jQuery.expr[":"].hidden= function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    return _Util._isHidden(a)
  }

  jQuery.expr[":"].show= function(a,i,m){
    return true
  }

  jQuery.expr[":"].panel=function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    var v2=_Util._toTrimSign(m[3].toLowerCase());
    if(!v2){
      return
    }
    v2=v2.replace(/\s+/," ")
    if(a.nodeType!=1){
      return
    }

    if(!document._panel||document._panel.k!=m[3]||Date.now()-document._panel._time>1000){
      let os=_cssHandler._findNodeByTxt(document.body,v2),oo=new Set();
      if(!os.length&&!_Util._isRegexData(v2)&&!v2.includes("|")){
        let vv=_Util._removeSign(v2," ")
        os=_cssHandler._findNodeByTxt(document.body,vv,1)
      }
      os.forEach(x=>{
        let ss=[]
        _findPanelByHeader(x,ss)
        ss.forEach(y=>oo.add(y))
      })

      document._panel={
        _time:Date.now(),
        k:m[3],
        as:[...oo],
        _tags:new Set()
      }
    }
    
    return document._panel.as.includes(a)
    function _findPanelByHeader(x,ss){
      let e=x.e,
  //        c=_cssHandler._getUniqueClass(x.o),
          f=_cssHandler._retrieveFontInfo(x.o),
          _start,_hasPreHeader,
          pp=_cssHandler._getBetterParent(x.e);
      while(e.parentElement){
        let p=e.parentElement
        for(let c of p.children){
          if(c==e){
            _start=1
            ss.push(c)
          }else if(!_Util._isHidden(c)){
            if(_start){
              
              let os=$(c).find(x.o.tagName).toArray()
              if(x.o.tagName==c.tagName){
                os.unshift(c)
              }
              if(!os.find(y=>{
                if(!_Util._isHidden(y)){
                  y=_cssHandler._retrieveFontInfo(y)
                  return _Util._isSameObj(f,y)
                }
              })){
                ss.push(c)
              }else{
                return ss
              }
            }else{
              _hasPreHeader=1
            }
          }
        }
        if(p==pp||_cssHandler._isFixedAbsoluteElement(p)||p.previousElementSibling||p.tagName=="BODY"){
          if(_hasPreHeader){
            return ss
          }
          ss.length=0
          ss.push(p)
          return ss
        }
        e=p
      }

    }
  }

  jQuery.expr[":"].match=function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    m=m[3]
    if(!_Util._isRegexData(m)){
      m="/"+m+"/"
    }
    m=eval(m)
    return (a.innerText||"").trim().match(m)
    
  }
  jQuery.expr[":"].input=function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    var v2=m[3].toLowerCase().trim();
    if(!v2){
      return
    }
    v2=v2.replace(/\s+/," ")
    if(a.nodeType!=1){
      return
    }

    if($util._tmpFormForSearchingInput||!document._input||document._input.k!=m[3]||Date.now()-document._input._time>1000){
      let f=$util._tmpFormForSearchingInput||_cssHandler._findForm()||document.body;
      $util._tmpFormForSearchingInput=0
      let o=_Util._findLabel(f,v2),
          os=new Set()

      if(!o.length&&!_Util._isRegexData(v2)&&!v2.includes("|")){
        let vv=_Util._removeSign(v2," ")
        o=_Util._findLabel(f,vv,1)
      }
      o.forEach(x=>{
        let ss=[]
        _findInputByLabel(x,ss)
        ss.forEach(y=>os.add(y))
      })
      os=[...os]

      if(!os.length||!os.find(x=>_Util._isStdInputElement(x)||_Util._isInContentEditable(x))){
        let oos=$(`:attr(${_IDE._data._setting.content.contentAttribute}=${v2})`).toArray()
        _Util._spliceAll(oos,x=>{
          if(!_Util._isInputObj(x)||(_Util._isHidden(x)&&!["checkbox","radio"].includes(x.type))){
            return 1
          }
        })
        if(oos.length){
          os=oos
        }
      }

      let ios=$(os).find("input").toArray().filter(x=>["checkbox","radio"].includes(x.type))
      if(ios.length){
        os=ios
      }

      document._input={
        _time:Date.now(),
        k:m[3],
        as:os,
        _tags:new Set()
      }
    }

    
    return document._input.as.includes(a)||$(document._input.as).find(a)[0]
    
    function _findInputByLabel(o,os){
      if(o.e&&o.e.tagName=="LABEL"){
        let k=o.e.attributes.for
        if(k){
          k=$("#"+k.value.replace(/([^0-9a-zA-Z\_\-])/g,"\\$1"))[0]
          if(k){
            os.push(k)
            return
          }
        }
        let oo=_Util._findInputs(o.e,1)
        if(oo.length){
          os.push(...oo)
          return
        }
      }
      if(o.ks.length){
        o.ks.find(x=>{
          let oo=_Util._findInputs(x,1)
          if(oo.length){
            os.push(...oo)
            return 1
          }
        })
      }
      if(os.length){
        return
      }
      let e=o.e
      while(e&&e.tagName!="TD"&&e.nextElementSibling){
        if(_cssHandler._findSamilarElementByStyle(e.nextElementSibling,o.o).length){
          break
        }
        if(_cssHandler._findSamilarElementByStyle(e.nextElementSibling,o.e).length){
          break
        }
        if(e==o.e){
          let _chkbox=_findCheckboxInPreviousElement(e)
          if(_chkbox){
            os.push(_chkbox)
            break
          }
        }
        let oo=_Util._findInputs(e.nextElementSibling,1)
        oo=oo.filter(x=>!_Util._isHidden(x))
        os.push(...oo);
        
        if(!os.length){
          if(_cssHandler._lookLikeInput(o.e,e.nextElementSibling)){
            os.push(e.nextElementSibling)
            break
          }
        }else{
          break
        }
        e=e.nextElementSibling
      }
      if(os.length){
        return
      }
      if(o.ks.length==1){
        os.push(...o.ks)
      }else if(o.ks.length>1){
        os.push(_Util._getShareParent(o.ks[0],o.ks[1]))
      }
      if(!os.length&&o.e){
        o.e=o.e.parentElement
        _findInputByLabel(o,os)
      }
    }
    
    function _findCheckboxInPreviousElement(e){
      let p=e.previousElementSibling
      if(p){
        if(p.tagName=="INPUT"&&p.type=="checkbox"){
          return p
        }else if(!p.innerText){
          let cs=$(p).find("input[type=checkbox]")
          if(cs.length){
            return cs[cs.length-1]
          }else{
            return _findCheckboxInPreviousElement(p)
          }
        }
      }
    }
    
  }


  jQuery.expr[":"].data=function(a,i,m){
    let r=jQuery.expr[":"].input(a,i,m)
    if(r){
      var vv=_Util._removeSign(m[3]).toLowerCase().trim();
      if(_Util._isInputObj(a)){
        if(a.type=="checkbox"){
          a.bzData=a.checked
        }else if(a.type=="radio"){
          a.bzData=$(`input[name=${a.value}]:checked`).val()
        }else if(_Util._isInContentEditable(a)){
          a.bzData=a.innerText
        }else{
          a.bzData=$(a).val()
        }
      }else{
        let v=a.innerText
        v=v.split(/[:：]/)
        if(v.length>1){
          if(vv==_Util._removeSign(v[0].toLowerCase())){
            a.bzData=v[1]
          }
        }else{
          a.bzData=a.innerText
        }
      }
    }
    return r
  }

  jQuery.expr[":"].link=function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    var v2=_Util._toTrimSign(m[3].toLowerCase());
    if(!v2){
      return
    }
    v2=v2.replace(/\s+/," ")
    if(a.nodeType!=1){
      return
    }

    /******************* New Code start *****************************************/
    if(!document._link||document._link.k!=v2||Date.now()-document._link._time>1000){
      let vs=v2.split("|"),oo=[]
      vs.forEach(v=>{
        let o=_Util._getTargetElement($(":endContains("+v+")")),os=[],ss=$("*")

        if(!o.length){
          o=$(":Contains("+v+")").toArray()
          o=_Util._getCeilDom(o)
        }
        if(!o.find(x=>x.innerText==v)){
          os=$("INPUT").toArray().filter(x=>["image","submit","button","reset"].includes(x.type)&&_Util._toTrimSign(x.value.toLowerCase())==v2)
          if(!os.length){
            os=$(`:attr(${_IDE._data._setting.content.contentAttribute}=${v2})`).toArray()
          }
          if(!os.length){
            os=o
          }
        }else{
          os=o
        }
        oo=oo.concat(os)
      })
      
      let os=oo.filter(x=>["A","BUTTON","INPUT"].includes(x.tagName))
      
      if(!os.length){
        os=oo.map(x=>_Util._getParentElementByCss("button,a",x)).filter(x=>x)
        if(!os.length){
          os=oo
        }
      }

      document._link={
        _time:Date.now(),
        k:v2,
        as:os,
        _tags:new Set()
      }
    }

    
    return document._link.as.includes(a)
  }

  jQuery.expr[":"].near = function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    let v2=m[3]
    let _inRegex=_Util._isRegexData(v2)
    if(!v2){
      return
    }
    if(!_inRegex){
      v2=_Util._toTrimSign(v2.toLowerCase());
      v2=v2.replace(/\s+/," ")
    }else{
      _inRegex=eval(v2)
    }
    if(a.nodeType!=1){
      return
    }

    /******************* New Code start *****************************************/
    if(!document._near||document._near.k!=v2||a._near||Date.now()-document._near._time>1000){
      let _inHidden=jQuery._inHidden
      let o=_Util._getTargetElement($(":endContains("+v2+")"))
      _Util._spliceAll(o,x=>{
        return _Util._isHidden(x)
      })
      if(!o.length){
        o=$(":Contains("+v2+")").toArray()
        o=_Util._getCeilDom(o)
        _Util._spliceAll(o,x=>{
          return _Util._isHidden(x)
        })
      }

      document._near={
        _inHidden:_inHidden,
        o:o,
        _time:Date.now(),
        k:v2,
        as:new Set(),
        _tags:new Set()
      }
    }  

    if(document._near._inHidden){
      if(!_Util._isHidden(a)){
        return
      }
    }else{
      if(_Util._isHidden(a)){
        return
      }
    }
    _searchCandiate(a)
    if(!document._near.as.has(a)){
      return
    }
    /******************* New Code end *********************************************/
    v2=_Util._toTrimSign(v2,30)
    if(BZ._tmpNearRegexKey!=v2){
      BZ._tmpNearRegexKey=v2
      v2=_Util._filterTxt(v2);
      v2=_Util._trimSpace(v2)
      BZ._tmpNearRegex=v2.replace(/\*/g,".*")
    }
    var v1=_Util._findNearTxt(a,BZ._tmpNearRegex)
    if(v1){
      if((_inRegex&&v1.match(_inRegex))||(!_inRegex&&_Util._includesWord(v1,BZ._tmpNearRegex,1))){
        a._bzJq="near"
        a._bzJqVal=v1
        return true
      }
    }
    return false
    
    function _searchCandiate(a){
      let d=document._near
      if(d._tags.has(a.tagName)){
        return
      }
      d._tags.add(a.tagName)
      let o=Object.assign([],d.o)
      let oo=o.map(x=>x.getBoundingClientRect()),as=new Set(),_loop=0;
      while(oo.length&&_loop<3){
        
        for(let i=0;i<o.length;i++){
          let x=o[i]
          let p=x.parentElement
          if(!p||p.tagName=="BODY"){
            return
          }
          o[i]=p
          let os=$(p).find(a.tagName).toArray()
          if(os.length){
            os.forEach(y=>as.add(y))
            if(_Util._isCellElement(a)){
              o.splice(i,1)
              oo.splice(i--,1)
            }
          }
        }
        if(!o[0]||o[0].tagName=="BODY"){
          break
        }
        if(as.size){
          if(d._inHidden){
            break
          }
          _loop++
          for(let i=0;i<oo.length;i++){
            let or=o[i].getBoundingClientRect()
            if(or.width- oo[i].width>100&&or.height- oo[i].height>100){
              oo.splice(i,1)
              o.splice(i--,1)
            }
          }
        }
      }
      as=[...as]
      as.forEach(x=>d.as.add(x))
    }
  };

  jQuery.expr[":"].next= function(a,i,m){
    return a.nextElementSibling
  }

  jQuery.expr[":"].previous= function(a,i,m){
    return a.previousElementSibling
  }

  jQuery.expr[":"].parent= function(a,i,m){
    return a.parentNode
  }

  jQuery.expr[":"].afterEqual= function(a,i,m){
    return jQuery.expr[":"].after(a,i,m,"endEqual")
  }
  jQuery.expr[":"].after= function(a,i,m,_equal){
    if(_Util._isIgnoreElement(a)){
      return
    }
    m=m[3]
    if(a.nodeType!=1 ||a.type=="hidden"){
      return
    }

    if(!document._after||document._after.k!=m||a._after||Date.now()-document._after._time>1000){
      let _inHidden=jQuery._inHidden,
          _panel=jQuery.tmpPanel
      if(_panel&&_panel.constructor!=jQuery){
        _panel=$(_panel)
      }
      let o,os=_inHidden?$("*"):_Util._getAllVisableElementsInJQ();
      if(_isSubSelector(m)){
        o=$(m)[0]
      }else{
        o=_Util._getTargetElement($(":"+(_equal||"endContains")+"("+m+")"))
        
        _Util._spliceAll(o,x=>{
          return (_panel&&!_panel.find(x)[0])||_Util._isHidden(x)
        })
        if(!o.length){
          o=$(":Contains("+m+")").toArray()
          _Util._spliceAll(o,x=>{
            return (_panel&&!_panel.find(x)[0])||_Util._isHidden(x)
          })
          o=o.pop()
        }else{
          o=o[0]
        }
        jQuery._inHidden=_inHidden
      }

      document._after={
        _panel:_panel,
        _inHidden:_inHidden,
        o:o,
        _time:Date.now(),
        k:m,
        os:os,
        _idx:os.index(o)
      }
    }
    if(!document._after._inHidden&&_Util._isHidden(a)){
      return
    }
    if(document._after.os.index(a)>document._after._idx){
      return 1
    }
  };

  jQuery.expr[":"].before= function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    return _findBeforeElement(a,i,m)
  };

  function _findBeforeElement(a,i,m){
    m=m[3]
    if(a.nodeType!=1 ||a.type=="hidden"){
      return
    }
    let _timer=Date.now()

    if(!document._before||document._before.k!=m||a._before||Date.now()-document._before._time>1000){
      let _inHidden=jQuery._inHidden
      let o=$(":endEqual("+m+")").toArray(),
          os=_inHidden?$("*"):_Util._getAllVisableElementsInJQ()
          
      if(!o.length){
        o=_Util._getTargetElement($(":endContains("+m+")"))
        _Util._spliceAll(o,x=>{
          return _Util._isHidden(x)
        })
      }
      if(!o.length){
        o=$(":Contains("+m+")").toArray()
        _Util._spliceAll(o,x=>{
          return _Util._isHidden(x)
        })
        o=_Util._getSameTextDom(_Util._getCeilDom(o),m)
      }
      jQuery._inHidden=_inHidden
      document._before={
        _inHidden:_inHidden,
        _time:Date.now(),
        k:m,
        os:os,
        o:o.map(x=>{
          return {
            o:x,
            _idx:os.index(x),
            r:x.getBoundingClientRect()
          }
        })
      }
    }
    if(!document._before._inHidden&&_Util._isHidden(a)){
      return
    }
    let n=document._before.os.index(a)
    return document._before.o.find(x=>{
      let _idx=x._idx
      if(a.tagName=="INPUT"&&a.type=="checkbox"&&$(x.o).find(a.tagName)[0]){
        return !!$(x.o).find(a)[0]
      }
      if(_idx>n){
        if(x._idx-n==1){
          return 1
        }
        for(let j=n+1;j<_idx;j++){
          let c=document._before.os[j]
          if((c.innerText||"").trim()&&!_Util._isHidden(c)){
            if($(c).find(x.o)[0]){
              continue
            }
            return
          }else if(c.tagName==a.tagName&&c.type!=="hidden"){
            return
          }else{
            c=c.getBoundingClientRect()

            if(c.top>x.r.bottom||c.right>x.r.right){
              return
            }
          }
        }
        return 1
      }else if(n-x._idx==1){
        return _Util._positionAfterElement(x.o,a)
      }
    })
  }
  jQuery.expr[":"].containCss = function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    return $(a).find(m[3].trim()).length>0;
  };

  jQuery.expr[":"].css=function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    let v=m[3].toLowerCase().split("|"),
        c=""
    return v.find(vv=>{
      if(vv[0]=="."){
        if(a.className&&a.className.constructor==String){
          return _includes(a.className,vv)
        }
      }else if(vv[0]=="#"){
        if(a.id&&a.id.constructor==String){
          return _includes(a.id,vv)
        }
      }
    })&&true
    
    function _includes(c,vv){
      c=c.toLowerCase()
      vv=vv.substring(1)
      let v2=vv.split(/[^a-z0-9]/)
      if(v2.length==1){
        return c.split(/[^a-z0-9]/).includes(vv)
      }else{
        return c.includes(vv)
      }
    }
    return $(a).find(m[3].trim()).length>0;
  };

  jQuery.expr[":"].noCss=function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    let v=m[3].toLowerCase().split("|"),
        c=""
    return v.find(vv=>{
      if(vv[0]=="."){
        if(a.className&&a.className.constructor==String){
          return !_includes(a.className,vv)
        }
      }else if(vv[0]=="#"){
        if(a.id&&a.id.constructor==String){
          return !_includes(a.id,vv)
        }
      }
    })&&true
    
    function _includes(c,vv){
      c=c.toLowerCase()
      vv=vv.substring(1)
      let v2=vv.split(/[^a-z0-9]/)
      if(v2.length==1){
        return c.split(/[^a-z0-9]/).includes(vv)
      }else{
        return c.includes(vv)
      }
    }
  };

  jQuery.expr[":"].endContains = function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    let o= _checkEndContains(a,i,m)
    if(o){
      a._bzJq="endContains"
    }
    return o
  };

  function _checkEndContains(a,i,m){
    m=m[3]

    if(!document._endContains||document._endContains.k!=m||!document._endContains._tag.includes(a.tagName)||a._endContains||Date.now()-document._endContains._time>1000){
      let _inHidden=jQuery._inHidden
      // console.log("init endContains:"+a.tagName+","+m)
      let v2=m;
      if(!document._endContains||document._endContains.k!=m||Date.now()-document._endContains._time>1000){
        document._endContains=0
      }
      let _inRegex=_Util._isRegexData(v2)
      if(_inRegex){
        v2=v2.substring(1,v2.length-1)
        v2=new RegExp(v2,"im")
      }else{
        v2=v2.trim().toLowerCase();
        v2=_Util._filterTxt(v2)
        v2=v2.replace(/\*/g,".*")
      }
      let os=_Util._getEndElementsByWord(function(w){
        w=(w||"").trim().toLowerCase();
        if(_inRegex){
          return w.match(v2)
        }else{
          w=_Util._filterTxt(w)
          return _Util._includesWord(w,v2,1)
        }
      },a.tagName,document._Contains?document._Contains._inHidden:_inHidden,a)
      if(document._endContains){
        document._endContains._tag.push(a.tagName)
        document._endContains.os=document._endContains.os.concat(os)
      }else{
        document._endContains={
          _inHidden:_inHidden,
          _tag:[a.tagName],
          k:m,
          os:os,
          _time:Date.now()
        }
        jQuery._inHidden=_inHidden
      }
    }
    return document._endContains.os.includes(a)
  }

  jQuery.expr[":"].endEqual = function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    if(_Util._isNoTextElement(a)){
      return
    }
    var os=a.childNodes;
    var v2=m[3],_inRegex=_Util._isRegexData(v2)
    if(_inRegex){
      v2=v2.substring(1,v2.length-1)
      v2=new RegExp(v2,"i")
    }else{
      v2=v2.trim().toLowerCase();
      v2=_Util._trimSpace(v2)
    }
    for(var i=0;i<os.length;i++){
      var o=os[i];
      if(o.nodeType==3){
        var t=_Util._pickTextFromNode(os,i);
        i=t.i;
        var v1=_Util._trimSpace(t.t.toLowerCase()).replace(/^\*|\*$/,"").trim()
        if(_inRegex){
          if(v1.match(v2)){
            a._bzJq="endEqual"
            a._bzJqVal=t.t
            return true
          }else{
            return 
          }
        }else{
          try{
            if(v1==v2){
              a._bzJq="endEqual"
              a._bzJqVal=t.t
              return true;
    //          return $(a.ownerDocument.body).find(a).length;
    //          return !_Util._isHidden(a);
            }
          }catch(e){
            if(v1.includes(v2)){
              a._bzJq="endEqual"
              a._bzJqVal=t.t
              return true;
    //          return $(a.ownerDocument.body).find(a).length;
    //          return !_Util._isHidden(a);
            }
          }
        }
      }
    }
  };

  jQuery.expr[":"].equal = function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    if(_Util._isNoTextElement(a)){
      return
    }
    let t=jQuery(a).text().trim().toLowerCase(),_match
    m=m[3].trim().toLowerCase()
    if(_Util._isRegexData(m)){
      m=eval(m)
      return !!t.match(m)
    }
    return t==m
  };

  //simplar(include)
  jQuery.expr[":"].RowCol=function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    return _findRowCol(a,i,m,(v1,v2)=>{
      return v1.toLowerCase()==v2.toLowerCase()
    })
  }

  jQuery.expr[":"].rowcol=function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    return _findRowCol(a,i,m,(v1,v2)=>{
      return v1==v2
    })
  }

  function _findRowCol(a,i,m,_fun){
    m=m[3].replace(/^\[(.+)\]$/,"$1")
    let rs,cs,k=m;
    let _timer=Date.now()

    if(!document._rowcol||document._rowcol.k!=m||a._rowcol||Date.now()-document._rowcol._time>1000){

      m=m.split("|")
      if(m[0]){
        rs=_Util._findTextBox(m[0],_fun)||[]
      }else{
        rs=$("*").toArray()
      }
      if(!rs.length){
        rs=_Util._findInputByValue(m[0])
      }
      rs=[...new Set(rs)]
      
      cs=_Util._findTextBox(m[1],_fun)||[]
      if(!cs.length){
        cs=_Util._findInputByValue(m[1])
      }
      cs=[...new Set(cs)]
      let _founds=[]
      if(rs.length&&cs.length){
        let ss=$("*").toArray()
        let mi=ss.indexOf(ss[0])
        rs.find((x,i)=>{
          if(ss.indexOf(x)<mi){
            return
          }
          let os1=_getCloser(x,cs,1),cc=[]
          os1.forEach(y=>{
            let os2=_getCloser(y,rs)
            if(os2.includes(x)){
              cc.push(y)
            }
          })
          if(cc.length){
            rs[i]={
              o:x,
              r:x.getBoundingClientRect(),
              cs:cc.map(y=>y.getBoundingClientRect()),
              cc:cc
            }
            return 1
          }
        });
        rs.forEach(r=>{
          if(r.cs){
            let xo=r.o,_chkRow
            while(1){
              let os=$(xo).find(a.tagName).toArray(),_found=[]
              if(!os.length){
                if($(xo).is(a.tagName)){
                  os=[xo]
                }
              }
              os.find(o=>{
                let or=o.getBoundingClientRect();
                if(_match([r],or)){
                  _found.push(o)
                }else if(_found.length){
                  return 1
                }
              })
              _chkRow=os.length
              _founds=_founds.concat(_found)
              if(_found.length||r.cs.find(c=>{return c.right-5<=xo.getBoundingClientRect().right})){
                break
              }
              xo=xo.parentElement
            }
          }
        })
      }

      document._rowcol=a._rowcol={
        _time:Date.now(),
        rs:rs,
        k:k,
        _founds:_founds
      }
    }
    return document._rowcol._founds.includes(a)

    function _match(rs,ar,_chkRow){
      let md=(ar.left+ar.right)/2
      return rs&&rs.find(y=>{
        return (y.r.right<=ar.left||y.r.left<=ar.left)
              &&(!_chkRow||(y.r.top-5<ar.top&&y.r.bottom+5>ar.bottom))
              &&y.cs.find(x=>{
                if(x.bottom<=ar.top){
                  if(x.left<=md&&x.right>=md){
                    return 1
                  }
                  x=(x.left+x.right)/2
                  return x>=ar.left&&x<=ar.right
                }
              })
      })
    }
    
    function _getCloser(x,os,_before){
      let xr=x.getBoundingClientRect(),
          vs=[]
      os.forEach(o=>{
        if(o.getBoundingClientRect){
          let or=o.getBoundingClientRect()
          if(_before){
            if(or.bottom<xr.top+5&&xr.left<=or.left+5){
              vs.push(o)
            }
          }else{
            if(or.top+5>xr.bottom&&xr.left+5>or.left){
              vs.push(o)
            }
          }
        }
      })
      while(vs.length){
        let cs=$(x).find(vs).toArray()
        if(!cs.length){
          x=x.parentElement
        }else{
          return cs
        }
      }
      return []
    }
  }
  //canvas text
  jQuery.expr[":"].textElement=function(a,i,m){
    if(_Util._isIgnoreElement(a)){
      return
    }
    if(a.tagName!="CANVAS"){
      return
    }
    if(TWHandler._getCanvasTextElement(a,m[3])){
      return true
    }
  }



  // jQuery.expr[":"].bz=function(a,i,m){
  //   let v=a.dataset.bz
  //   if(!v){
  //     return
  //   }

  //   m=m[3]
  //   m=m.split("=")
  //   a=_cssHandler._getBzPath(a)
  //   return a.bz.find(x=>x.k==m[0]&&(x.v==m[1]||!m[1]))
  // }

  jQuery.expr[":"].value=function(a,i,m){
    let v=m[3],vv=(a.value||"").toString()
    if(_Util._isRegexData(v)){
      v=eval(v)
      return vv.match(v)
    }
    return v==vv
  }

  jQuery.expr[":"].val=function(a,i,m){
    let v=m[3],vv=(a.value||"").toString()
    if(_Util._isRegexData(v)){
      v=eval(v)
      return vv.match(v)
    }
    return vv.includes(v)
  }

  for(var k in jQuery.expr[":"]){
    jQuery.expr[":"][k].toString=function(){}
  }

  //get sub iframe
  jQuery.fn.findIframe=function(a){
    return _findIFrame(arguments)
  }

  function _findIFrame(ii,n,d){
    d=d||BZ.TW;
    var i=0
    while(ii.length>i){
      var v=ii[i++]
      d=d.frames[v]
      if(!d){
        return
      }
    }
    return d.document
  }

  _isSubSelector=function(v){
    return v.match(/:(include|text|attr|Attr|Contains|hidden|show|panel|match|input|data|link|near|next|previous|parent|afterEqual|after|before|containCss|css|noCss|endContains|contains|endEqual|equal|RowCol|rowcol|textElement|blank|bz|value|val)\([^\)]*\)/)
  }
}
if(window.jQuery){
  extendJQuery()
};
var _domRecorder={
  _uploadFileTypes:["avi","bat", "css", "docx", "epub", "gif", "html", "jpg", "js", "json", "odt","ogv","pdf", "png", "rtf", "sh", "txt", "zip"],
  _tmpPath:[],
  _curAPI:0,
  _listenEvents:{
    change: "1",
    dblclick: "1",
    dragDrop: "1",
    click: "1"
  },
  unTmpClass:new Set(),
  _monitorList:[],
  _start:function(){
    if(!bzComm.getIframeId()){
      bzComm.postToIDE({scope:"_ideTestManagement",fun:"_insertInitRefresh",ps:[location.href]});
    }
    _domRecorder._lastStep=null;
    _domRecorder._refresh();
    bzComm._exeInIframes({
      fun:"_start",
      scope:"_domRecorder"
    })
  },
  _refresh:function(){
    _domRecorder._setEventListenerOnAllDoms();
  },
  _end:function(){
    // _elementMonitor._handleMonitor();
    // _elementMonitor._close();
    _domRecorder._closeObserver();
    _bzDomPicker._removeTmpCover();

    _domRecorder._removeDomEventListener(document);
    
    _domRecorder._setBackPopMsg();
    BZ._recording=0;
    
  },
  _observerTime:Date.now(),
  _observer:new MutationObserver(function(_mutations) {
    let _hasNew;
    if(_mutations.find(_mutation=>{
      let a=_mutation.addedNodes[0]
      
      return a&&a.nodeType==1&&!_domRecorder._isBZElement(a)
    })){
      if(_domRecorder._clickInputStep){
        _domRecorder._createRecordAction(_domRecorder._clickInputStep,1)
        _domRecorder._clickInputStep=0
      }
      clearTimeout(_domRecorder._newInsertTrigger);
    }
  }),
  _isBZElement:function(t){
    return t&&($(t).hasClass("BZIgnore")||$(".BZIgnore").find(t).length)
  },
  _handleFileInput:function(){
    $("input[type=file]").off("click",_domRecorder._clickFileFun)
    $("input[type=file]").on("click",_domRecorder._clickFileFun)
  },
  _clickFileFun:function(e){
    if(BZ._isRecording()){
      bzComm.postToIDE({scope:"_domRecorder",fun:"_setClickFileInput"});
      e.stopPropagation()
      e.preventDefault()
      _domRecorder._selectUploadFileOption(this)
    }else if(BZ._isPlaying()){
      e.stopPropagation()
      e.preventDefault()
    }
  },
  _getCurFileData:function(){
    let ds={
          $test:$test||{},
          $module:$module||{},
          $project:$project||{}
        },
        fs=[];
    Object.keys(ds).forEach(x=>{
      for(let k in ds[x]){
        let v=ds[x][k]
        if(_Util._isFileData(v)){
          fs.push(x+"."+k)
        }
      }
    })
    return fs
  },
  _selectUploadFileOption:function(e){
    window._uiSwitch=_CtrlDriver._buildProxy({_uploadFileFrom:"std"});
    
    let fs=_domRecorder._getCurFileData()
    
    if(fs.length){
      _uiSwitch._uploadFileFrom="_exist"
    }
    if(this._domPickerWindow){
      this._domPickerWindow.close()
    }
    let _viewDef={
      _tag:"div",
      _attr:{
        style:"flex-direction: column;display: flex;line-height: 30px;height:350px;font-size:13px;padding:10px;"
      },
      _items:[
        {
          _tag:"div",
          _text:"_bzMessage._action._ifUploadFile"
        },
        //exist file data
        {
          _if:function(){
            return fs.length
          },
          _tag:"label",
          _attr:{
            style:"height: 25px;padding: 8px;line-height: normal;line-height: normal;"
          },
          _items:[
            {
              _tag:"input",
              _attr:{
                style:"margin-right:10px;height: 10px;",
                type:"radio",
                value:"_exist"
              },
              _dataModel:"_uiSwitch._uploadFileFrom"
            },
            {
              _text:"_bzMessage._action._existFileData"
            }
          ]
        },
        {
          _if:function(){
            return _uiSwitch._uploadFileFrom=='_exist'&&fs.length
          },
          _tag:"div",
          _attr:{
            style:"display:flex;"
          },
          _items:[
            {
              _tag:"select",
              _attr:{
                style:"height:25px;width:100%;margin-left:30px;margin-right:10px;"
              },
              _dataModel:"_uiSwitch._uploadUrl",
              _items:[
                {
                  _tag:"option",
                  _attr:{
                    style:"font-size:13px",
                    value:function(d){
                      return '{{'+d._item+'}}'
                    }
                  },
                  _text:function(d){
                    d=d._item
                    let v=eval(d)
                    if(v.constructor==Function){
                      v=_ideDataHandler._getOrgDataSettingFromNamePath(d).url
                    }
                    if(v.constructor==String){
                      d=`${d} (${v})`
                    }
                    return d
                  },
                  _dataRepeat:function(){
                    return fs
                  }
                }
              ]
            }
          ]
        },
        //std files
        {
          _tag:"label",
          _attr:{
            style:"height: 25px;padding: 8px;line-height: normal;"
          },
          _items:[
            {
              _tag:"input",
              _attr:{
                style:"margin-right:10px;height: 10px;",
                type:"radio",
                value:"std"
              },
              _dataModel:"_uiSwitch._uploadFileFrom"
            },
            {
              _text:"_bzMessage._action._uploadInStdFiles"
            }
          ]
        },
        {
          _if:"_uiSwitch._uploadFileFrom=='std'",
          _tag:"div",
          _attr:{
            style:"display:flex;"
          },
          _items:[
            {
              _tag:"select",
              _attr:{
                style:"height:25px;width:100%;margin-left:30px;margin-right:10px;"
              },
              _dataModel:"_uiSwitch._uploadUrl",
              _items:[
                {
                  _tag:"option",
                  _attr:{
                    style:"font-size:13px",
                    value:function(d){
                      return d._item
                    }
                  },
                  _text:function(d){
                    return d._item
                  },
                  _dataRepeat:function(){
                    let vs=_domRecorder._uploadFileTypes
                    return vs.map(x=>'example.'+x)
                  }
                }
              ]
            }
          ]
        },
        //url
        {
          _tag:"label",
          _attr:{
            style:"height: 25px;padding: 8px;line-height: normal;"
          },
          _items:[
            {
              _tag:"input",
              _attr:{
                style:"margin-right:10px;height: 10px;",
                type:"radio",
                value:"url"
              },
              _dataModel:"_uiSwitch._uploadFileFrom"
            },
            {
              _text:"_bzMessage._action._uploadInUrlFile"
            }
          ]
        },
        {
          _if:function(){
            let r=_uiSwitch._uploadFileFrom=='url'
            if(r&&!_uiSwitch._uploadUrl){
              _uiSwitch._uploadUrl="/"+"/"
            }
            return r
          },
          _tag:"div",
          _attr:{
            style:"display:flex;"
          },
          _items:[
            {
              _tag:"input",
              _attr:{
                style:"flex:1;height:25px;margin-left:30px;margin-right:10px;"
              },
              _dataModel:"_uiSwitch._uploadUrl",
            }
          ]
        },
        {
          _tag:"label",
          _attr:{
            style:"height: 25px;padding: 8px;line-height: normal;"
          },
          _items:[
            {
              _tag:"input",
              _attr:{
                style:"margin-right:10px;height: 10px;",
                type:"radio",
                value:"local"
              },
              _dataModel:"_uiSwitch._uploadFileFrom"
            },
            {
              _text:"_bzMessage._action._uploadFromDesk"
            }
          ]
        },
        {
          _if:"_uiSwitch._uploadUrl&&_uiSwitch._uploadFileFrom!='local'",
          _tag:"div",
          _items:[
            {
              _if:"_uiSwitch._uploadUrl&&_uiSwitch._uploadUrl.match(/[.](docx|html|odt|epub|avi|pdf|rtf|zip)$/)",
              _tag:"a",
              _attr:{
                style:"cursor:pointer;",
                href:"_uiSwitch._uploadUrl",
                target:"_"+"blank"
              },
              _text:"_bzMessage._action._reviewByDownload"
            },
            {
              _if:"_uiSwitch._uploadUrl&&_uiSwitch._uploadUrl.endsWith('.ogv')",
              _tag:"video",
              _attr:{
                width:200,
                controls:1,
                style:"margin-top:5px;"
              },
              _items:[
                {
                  _tag:"source",
                  _attr:{
                    src:"_uiSwitch._uploadUrl"
                  },
                  _text:"Your browser does not support HTML video."
                }
              ]
            },
            {
              _if:"_uiSwitch._uploadUrl&&_uiSwitch._uploadUrl.match(/[.](png|jpg|gif)$/)",
              _tag:"img",
              _attr:{
                onerror:"this.style.display='none'",
                onload:"this.style.display='block'",
                src:function(){
                  return SERVER_HOST.replace(/^https?:/,"")+"/file/"+_uiSwitch._uploadUrl
                },
                style:"max-width:50px;max-height:50px;",
                onmouseover:"this.style.position='fixed';this.style.maxWidth='unset';this.style.maxHeight='unset';",
                onmouseout:"this.style.position='unset';this.style.maxWidth='50px';this.style.maxHeight='50px';",
              }
            },
            {
              _if:function(){
                let s=_uiSwitch._uploadUrl
                if(s&&s.match(/[.](bat|js|sh|css|json|txt)$/)){
                  $.get(s,function(d){
                    _uiSwitch._tmpContent=d
                  })
                  return 1
                }
              },
              _tag:"div",
              _attr:{
                style:"line-height:20px;padding:10px 0;"
              },
              _text:function(){
                if(_uiSwitch._uploadUrl.endsWith(".json")){
                  return JSON.stringify(_uiSwitch._tmpContent,0,2)
                }else{
                  return _uiSwitch._tmpContent
                }
              }
            }
          ]
        },
        {
          _tag:"div",
          _attr:{
            style:"display:flex;justify-content: space-between;margin-top:10px;bottom: 10px;position: fixed;width: calc(100% - 40px);border-top: var(--bz-border);padding: 10px 10px 0 10px;"
          },
          _items:[
            {
              _tag:"button",
              _attr:{
                class:"btn btn-primary",
              },
              _text:"_bzMessage._method._continue",
              _jqext:{
                click:function(c){
                  if(_uiSwitch._uploadFileFrom!="local"&&!_uiSwitch._uploadUrl){
                    return alert(_bzMessage._action._missingUploadFile)
                  }else if(_uiSwitch._uploadFileFrom=="local"){
                    _uiSwitch._uploadUrl=""
                    $(e).click()
                  }else{
                    let _url=_uiSwitch._uploadUrl
                    if(_uiSwitch._uploadFileFrom=="_exist"){
                      _url=eval(_url.replace(/[\{\}]/g,""))
                    }
                    if(_url.constructor==String){
                      _Util._setUrlFileToInput(_url,e)
                    }else{
                      $util.triggerChangeEvent(e,_url,1);
                    }
                  }
                  setTimeout(()=>{
                    _uiSwitch._uploadFileFrom=""
                    this.ownerDocument.defaultView.close()
                  },100)
                }
              }
            },
            {
              _tag:"button",
              _attr:{
                class:"btn btn-secondary",
              },
              _text:"_bzMessage._method._cancel",
              _jqext:{
                click:function(c){
                  _uiSwitch._uploadFileFrom=0
                  _uiSwitch._uploadUrl=0
                  this.ownerDocument.defaultView.close()
                }
              }
            }
          ]
        }
      ]
    }
    this._domPickerWindow = _Util._popWin("","_selectFile",null,400,400,_viewDef,_bzMessage._action._selectUploadFile);

    // _Util._confirmMessage(,[{
    //   _title:_bzMessage._method._continue,
    //   _style:"background-color: #0069FF !important;color: #FFF !important;border: 1px solid #999 !important;border-radius: 6px !important;padding: 6px 10px !important;font-size:15px !important;",
    //   _click:function(c){
    //     if(_uiSwitch._uploadFileFrom!="local"&&!_uiSwitch._uploadUrl){
    //       return alert(_bzMessage._action._missingUploadFile)
    //     }else if(_uiSwitch._uploadFileFrom=="local"){
    //       _uiSwitch._uploadUrl=""
    //       $(e).click()
    //     }else{
    //       let _url=_uiSwitch._uploadUrl
    //       if(_uiSwitch._uploadFileFrom=="_exist"){
    //         _url=eval(_url.replace(/[\{\}]/g,""))
    //       }
    //       if(_url.constructor==String){
    //         _Util._setUrlFileToInput(_url,e)
    //       }else{
    //         $util.triggerChangeEvent(e,_url,1);
    //       }
    //     }
    //     setTimeout(()=>{
    //       _uiSwitch._uploadFileFrom=""
    //     },100)
    //     c._ctrl._close()
    //   }
    // },{
    //   _title:_bzMessage._method._cancel,
    //   _style:"background-color: #FFF !important;color: #000 !important;float: right !important;border: 1px solid #999 !important;border-radius: 6px !important;padding: 6px 10px !important;font-size:15px !important;",
    //   _click:function(c){
    //     _uiSwitch._uploadFileFrom=0
    //     _uiSwitch._uploadUrl=0
        
    //     c._ctrl._close()
    //   }
    // }],0,0,1,0,1)
    // setTimeout(()=>{
    //   $(".bz-modal-window").css({height:"480px","font-size":"11px"})
    // },20)
  },
  _setClickFileInput:function(){
    _domRecorder._lastClickFileInput=Date.now()
    if(_domRecorder._lastNewActionTime&&_domRecorder._lastClickFileInput-_domRecorder._lastNewActionTime.t<200){
      let a=_domRecorder._lastNewActionTime.a,
          t=_IDE._data._curTest,
          g=_ideActionManagement._getCurGroup(a),
          _idx=_ideActionManagement._getCurIdx(a)

      _preAction=_ideActionManagement._getPreAction(t,_ideActionManagement._findActionByPath(t,_idx));
      _ideTestManagement._removeAction(t,a)
      
      // if(!a){
      //   a=g.actions._last()||g
      // }
      _ideTestManagement._refreshActionIdx(t)
      if(_preAction){
        BZ._setHash(_preAction)
      }else{
        BZ._setHash(t)
      }
    }
  },
  _setBackPopMsg:function(){
    if(window.extensionContent){
      return window.postMessage({bz:1,_setBackPopMsg:1}, "*");
    }
    _doIt(window)
    function _doIt(w){
      try{
        w.alert=w.BZ_Recording_Alert;
        w.confirm=w.BZ_Recording_Confirm;
        w.prompt=w.BZ_Recording_Prompt;
        
        if(w.BZ_Recording_Onbeforeunload){
          w.onbeforeunload= w.BZ_Recording_Onbeforeunload;
        }
        
        w.BZ_Recording_Alert=w.BZ_Recording_Confirm=w.BZ_Recording_Confirm=0
        
        if(w.XMLHttpRequest.prototype.BZ_Ajax){
          w.eval("window.XMLHttpRequest.prototype.open=window.XMLHttpRequest.prototype.BZ_Ajax");
          w.eval("window.XMLHttpRequest.prototype.send=window.XMLHttpRequest.prototype.BZ_AjaxSend");
          w.eval("window.XMLHttpRequest.prototype.setRequestHeader=window.XMLHttpRequest.prototype.BZ_SetHeader");
        }
      }catch(e){
      }
    }
  },
  _closeObserver:function(){
    try{
      this._observer.disconnect();
    }catch(e){}
    this._monitorList=[];
  },
  _setEventListenerOnAllDoms:function(){
    _domRecorder._setDomEventListener(document)
  },
  _setDomEventListener:function(_document){
    let b=_document
    if(b._inListening){
      return;
    }
    b._inListening=true;
    if(window.extensionContent){
      bzComm.postToApp({
        fun:"_takeoverPopMsg",
        scope:"_domRecorder"
      }, "*");
    }else{
      _domRecorder._takeoverPopMsg(b.defaultView);
    }
    _domRecorder._removeDomEventListener(_document);
    _domRecorder._monitor(b);
    _domRecorder._handleFileInput();

    $(b).on("mousedown","*",_domRecorder._bindFun);
    
    $(b).on("mouseup","*",_domRecorder._bindFun);
    $(b).on("mousemove","*",_domRecorder._bindFun);
    $(b).on("dblclick","*",_domRecorder._bindFun);
    $(b).on("click","*",_domRecorder._bindFun);
    $(b).on("keyup","*",_domRecorder._bindFun);
    $(b).on("keydown","*",_domRecorder._bindKeydown);
    $(b).on("change","input,textarea,select",_domRecorder._bindFun);
    $(b).on("focus","input,textarea,select",_domRecorder._bindFocus);
    $(b).on("blur","[contenteditable=true]",_domRecorder._bindContentEditable);
    // $(b).on("mouseenter","iframe",_domRecorder._bindEnterIframe);

    $(_document).find("*").toArray().forEach(function(e){
      e=e.shadowRoot
      if(e){
        e=$(e).find("*")
        e.on("mousedown",_domRecorder._bindFun);
        e.on("mouseup","*",_domRecorder._bindFun);
        e.on("mousemove","*",_domRecorder._bindFun);
        e.on("dblclick","*",_domRecorder._bindFun);
        e.on("click","*",_domRecorder._bindFun);
        e.on("keyup","*",_domRecorder._bindFun);
        e.on("keydown","*",_domRecorder._bindKeydown);
        e.on("change","input,textarea,select",_domRecorder._bindFun);
        e.on("focus","input,textarea,select",_domRecorder._bindFocus);
        e.on("blur","[contenteditable=true]",_domRecorder._bindContentEditable);
      }
    })
  },
  _buildTmpPath:function(o,_last){
    _last=_last||[]
    if(_last[0]==o){
      return _last
    }
    var _tmpPath=[]
    while(o && o.tagName!="BODY"){
      _tmpPath.push(o)
      o=o.parentNode||o.host
    }
    return _tmpPath
  },
  _retrievePath:function(p,x,y,_ignoreTxt){
    var _removedElement=[],_body
    if(p.length){
      delete p[0].bzTxtElement
      _body=p[0].ownerDocument.body
    }else{
      return
    }
    if(!_cssHandler._isInShadowDom(p[0])){
      let _lastPath=p[0].bzTmp
      while(p[0]&&!$(p[0].ownerDocument).find(p[0]).length){
        _removedElement.push(p.shift())
        if(!p.length){
          p=this._lastPaths
          _removedElement=[]
        }
      }
      if(!p[0]){
        return {
          _elementPath:_lastPath,
          W:{
            HH:[],
            LL:{}
          }
        }
      }
    }else{
      while(!p[0].getBoundingClientRect().width){
        p.shift()
      }
    }
    if(!p.length){
      p.push(_body)
    }
    let pp=0;
    if(p[0].tagName=="CANVAS"){
      p[0].bzTxtElement=TWHandler._getCanvasTextElementByMousePos(p[0],x,y,_ignoreTxt)
      pp=p[0]
    }
    p[0].bzShortCut=0
    p=_cssHandler._findPath(p[0],1,_removedElement.length?2:0);
    if(p&&_removedElement.length){
      var i=p._elementPath.pop();
      if(!$.isNumeric(i)){
        p._elementPath.push(i)
      }
      var e=_cssHandler._findCellElement(_removedElement[0]);
      var i=_removedElement.indexOf(e);
      _removedElement.splice(i+1)
      while(_removedElement.length){
        if(_removedElement[0]==e){
          break
        }
        _removedElement.shift()
      }
      while(_removedElement.length){
        e=_removedElement.pop()
        var d={e:e,oe:e,ps:[],ee:1,_headers:[]};
        _cssHandler._findAttributes(d)
        d=d._result._main
        if(d){
          d=d.join("")
        }else{
          d=e.tagName
        }
        p._elementPath.push(d);
      }
      if(e&&!_cssHandler._isInput(e)){
        var w=_Util._filterTxt($util.getElementText(e))
        if(w){
          p._elementPath[p._elementPath.length-1]+=":Contains("+w+")"
        }
      }
      p._elementPath.push(0)
    }

    return p;
  },
  _takeoverPopMsg:function(){
    let w=window
    try{
      var _beforeunload=w.onbeforeunload || (_checkJQueryEvent().beforeunload?_checkJQueryEvent().beforeunload[0].handler:null);
      if((!w.BZ_Recording_Onbeforeunload && _beforeunload) || (w.BZ_Recording_Onbeforeunload_fun && w.BZ_Recording_Onbeforeunload_fun!=_beforeunload)){
        w.BZ_Recording_Onbeforeunload=_beforeunload;
        if(_beforeunload){
          _beforeunload=function(){
            var _msg=w.BZ_Recording_Onbeforeunload();
            if(_msg){
              _domRecorder._curPopMsg={_type:"onbeforeunload",_msg:_msg,_time:Date.now()};
              var r=_domRecorder._curPopMsg._returnValue=_domRecorder._curPopMsg._msg;
              _domRecorder._setPopMsg();
              return r;
            }
          }
          if(w.onbeforeunload){
            w.onbeforeunload=_beforeunload;
          }else{
            _checkJQueryEvent().beforeunload[0].handler=_beforeunload;
          }
        }
        w.BZ_Recording_Onbeforeunload_fun=_beforeunload;
      }
      TWHandler._takeoverCanvas(w)
      
      if(!w.BZ_Recording_Alert||w.BZ_Recording_Alert==w.alert){
        w.BZ_Recording_Alert=w.alert
        w.alert=function(m){
          _domRecorder._curPopMsg={_type:"alert",_msg:m,_time:Date.now()};
          _domRecorder._setPopMsg();
          w.BZ_Recording_Alert(m);
        }
      }
      if(!w.BZ_Recording_Confirm||w.BZ_Recording_Confirm==w.confirm){
        w.BZ_Recording_Confirm=w.confirm
        w.confirm=function(m){
          _domRecorder._curPopMsg={_type:"confirm",_msg:m,_time:Date.now()};
          var r=_domRecorder._curPopMsg._returnValue=w.BZ_Recording_Confirm(m);
          _domRecorder._setPopMsg();
          return r
        }
      }
      if(!w.BZ_Recording_Prompt||w.BZ_Recording_Prompt==w.prompt){
        w.BZ_Recording_Prompt=w.prompt
        w.prompt=function(m){
          _domRecorder._curPopMsg={_type:"prompt",_msg:m,_time:Date.now()};
          var r=_domRecorder._curPopMsg._returnValue=w.BZ_Recording_Prompt(m);
          _domRecorder._setPopMsg();
          return r
        }
      }
    }catch(e){}
    function _checkJQueryEvent(e){
      try{
        return $["_"+"data"](e,"events") || {};
      }catch(e){}
      return {};
    }
  },
  _setPopMsg:function(_popMsg){
    _popMsg=_popMsg||_domRecorder._curPopMsg;
    _domRecorder._curPopMsg=null;
    if(!bzComm._isIDE()){
      bzComm.postToIDE({
        fun:"_setPopMsg",
        ps:[_popMsg],
        scope:"_domRecorder"
      });
    }else{
      _domRecorder._curPopMsg=_popMsg;
    }
  },
  _showSetAlert:function(v){
    _Util._confirmMessage({
      _tag:"div",
      _data:v,
      _items:[
        {
          _tag:"div",_attr:{"class":"input-group"},
          _items:[
            {
              _tag:"div",_attr:{"class":"input-group-addon"},
              _items:[
                {
                  _tag:"label",
                  _text:"_bzMessage._action._popType"
                }
              ]
            },
            {
              _tag:"select",
              _attr:{
                "disabled":"!BZ._isCheckout()",
                "class":"form-control",
              },
              _dataModel:"_data.popType",
              _items:[
                {
                 _tag:"option",
                  _attr:{
                    value:"_data._item"
                  },
                  _text:"_data._item",
                  _dataRepeat:["","alert","confirm","prompt","onbeforeunload"]
                }
              ]
            }
          ]
        },
        //Compare
        {
          _tag:"div",_attr:{"class":"input-group"},
          _items:[
            {
              _tag:"div",_attr:{"class":"input-group-addon"},
              _items:[
                {
                  _tag:"label",_text:"_bzMessage._action._compare"
                }
              ]
            },
            {
              _tag:"select",
              _attr:{
                "disabled":"!BZ._isCheckout()",
                "class":"form-control"
              },
              _items:[
                {
                  _tag:"option",
                  _attr:{
                    value:"_data._item"
                  },
                  _text:function(d){
                    return d._item.includes("clude")?_bzMessage._common[d._item]:d._item;
                  },
                  _dataRepeat:["==",">",">=","<","<=","!=","regex","include","exclude"]
                }
              ],
              _dataModel:"_data.compareMark"
            }
          ]
        },
        {
          _tag:"div",
          _attr:{
            "class":"input-group"
          },
          _items:[
            {
              _tag:"div",_attr:{"class":"input-group-addon"},
              _items:[
                {
                  _tag:"label",
                  _text:"_bzMessage._action._expectation"
                },
              ]
            },
            //expectation value
            {
              _tag:"input",
              _attr:{
                "class":"form-control",
                placeholder:"_bzMessage._action._dataSizeWarning"
              },
              _dataModel:"_data.expectation"
            }
          ]
        },
        //return value
        {
          _if:function(d){
            return d.popType=='confirm' || d.popType=='prompt';
          },
          _tag:"div",_attr:{"class":"input-group"},
          _items:[
            {
              _tag:"div",_attr:{"class":"input-group-addon"},
              _items:[
                {
                  _tag:"label",
                  _text:"_bzMessage._action._returnValue"
                }
              ]
            },
            {
              _tag:"input",
              _attr:{
                "disabled":"!BZ._isCheckout()",
                type:"text",
                "class":"form-control"
              },
              _dataModel:"_data.returnValue"
            }
          ]
        }
      ]
    },[{
      _title:_bzMessage._method._close,
      _click:function(c){
        c._ctrl._close()
        _ideTestManagement._save()
      }
    }],0,0,1,0,1)
  },
  _isIgnoreClickElement:function(e){
    return ["TEXTAREA","SELECT","OPTION"].includes(e.tagName) //&& !["reset","submit","button","image"].includes(e.type)
  },
  _monitorSetInputActions:{
    _mergeForSetAction:function(e,a){
      let _this=this
      if(e._coverChkRadio){
        setTimeout(()=>{
          a._txt=e._coverChkRadio.checked&&"on"
          _buildMergeData([a],e._coverChkRadio)
        },100)
      }else if(!_cssHandler._isCover(e)&&_this._isInMonitoredScope(e)&&(a._type=="click"||a._type=="change")){
        let as=_this._curMonitorElement._actions
        if(as.length==2){
          if(a._type!="click"||as[1]._type=="click"){
            _setLastAction(a)
            return
          }
        }else if(as.length>2){
          _setLastAction(a)
          return
        }
        as.push(a)
        if(a._type=="click"){
          _Util._clearPreEventElements()
          _this._curMonitorElement._diffList=[]
          clearTimeout(_domRecorder._mergeSetActionTime)
          _Util._preTriggerEvent()

          _domRecorder._mergeSetActionTime=setTimeout(()=>{
            _doIt(as)
          },500)
        }
      }else{
        _setLastAction(a)
      }
            
      function _doIt(as){
        if(_Util._isHidden(_this._curMonitorElement._element)&&_domRecorder._lastAction._tmpUrl==location.href){
          let _targetElement=as[0]._element
          if(_Util._isHidden(_targetElement)||(_targetElement.innerText||_targetElement.value||"").toLowerCase().trim().includes((a._element.innerText||a._element.value||"").toLowerCase().trim())){
            _buildMergeData(as,_targetElement)
          }
          _this._lastAction=_this._curMonitorElement=0
        }else{
          _this._lastAction=a
          _this._curMonitorElement._actions=[a]
        }
      }

      function _buildMergeData(as,_targetElement){
        as={
          _actions:as,
          _data:{
            _value:a._txt,
            _elementType:_targetElement.type||_targetElement.tagName,
          }
        }
        
        if(_innerWin._data._dataBind._showDataBind&&_targetElement){
          if(_Util._isHidden(_targetElement)){
            let ee=$(":text("+a._txt+")")
            if(ee.length==1){
              _targetElement=ee[0]||_targetElement
            }else{
              _targetElement=_Util._getClosestElement(a._element,a._element,ee)||ee[0]
            }
          }

          as._data._inputPath=_cssHandler._findInputPath(_targetElement)
          
          let p=_ideDataBind._getBindData(_targetElement)
          if(p){
            if(p.includes("$")){
              p="{{"+p+"}}"
            }
            as._data._name=p
          }
        }
        if(!window.extensionContent){
          _ideActionManagement._mergeToSetAction(as);
        }else{
          bzComm.postToIDE({ps: [as],scope:"_ideActionManagement",fun:"_mergeToSetAction"});
        }
        _Util._preTriggerEvent()
      }

      function _setLastAction(a,_noclear){
        if(a._type=="click"){
          _this._lastAction=a
        }else{
          if(Date.now()-_domRecorder._monitorSetInputActions._chkTime>300){
            _Util._clearPreEventElements()
          }
          _this._lastAction=0
        }
        _this._curMonitorElement=0
      }
    },
    _chkElementUpdate:function(e){
      if(this._isInMonitoredScope(e)){
        return
      }

      let ds=_Util._getDiffAfterTriggerEvent(1,1)
      this._chkTime=Date.now()
      if(ds.includes(e)&&this._lastAction){
        this._curMonitorElement={
          _element:e,
          _diffList:ds,
          _actions:[this._lastAction]
        }
      }else{
        this._curMonitorElement=0
        this._lastAction=0
      }
    },
    _isInMonitoredScope:function(e){
      return this._curMonitorElement&&this._curMonitorElement._diffList.includes(e)
    }
  },
  _recordEvent:function(_action,_value){
    // if(_domRecorder._lastChkAction){
    //   if(_domRecorder._lastChkAction._type==_action.type&&_domRecorder._lastChkAction._target==_action.target){
    //     return
    //   }
    // }
    // _domRecorder._lastChkAction={
    //   _type:_action.type,
    //   _target:_action.target
    // }
    if(!_domRecorder._hiddenItems){
      _domRecorder._hiddenItems=_Util._findAllHiddenElements()
    }else{
      let v=_Util._findAllHiddenElements()
      if(v.length>_domRecorder._hiddenItems.length){
        _domRecorder._hiddenItems=v
      }
    }
    if(_action.type=="mousemove"&&!_action.target._coverChkRadio&&!_Util._isStdInputElement(_action.target)&&!_Util._isInContentEditable(_action.target)){
      _action.target._coverChkRadio=_cssHandler._findChkRadio(_action.target)
    }

    var _element=_action.currentTarget;
    if(["mousedown"].includes(_action.type)){
      _domRecorder._monitorSetInputActions._chkElementUpdate(_element)
    }

    if(_action.type=="change"){
      _element=_action.target;
      if(_element.type=="hidden"){
        return;
      }
    }
    _Util._removeLinkTarget(_element);

    if(_cssHandler._isInput(_element) && !_element.readOnly && !$("#BZ_Win").find(_element).length && "focusin"==_action.type){
      // setTimeout(function(){
        // _ideDataBind._showMe(_element)
      // },100);
      return
    }else if(_Util._isInContentEditable(_element) && !$("#BZ_Win").find(_element).length && "mousedown"==_action.type){
      // setTimeout(function(){
        // _ideDataBind._showMe(_element)
      // },100);
    }else if(!$(BZ.TW.document).find(".BZIgnore").find(_element).length){
      if(_action.type=="blur" && !_domRecorder._typed){
        return;
      }
    }
    //ignore tab on input/select
    var _keyCode=_Util._checkKeycode(_action)
    if(_keyCode==9 && ["A","BUTTON","INPUT","SELECT","TEXTAREA"].includes(_element.tagName)){
      return
    }else if([40,38,39,37].includes(_keyCode) && ["SELECT","TEXTAREA"].includes(_element.tagName)){
      return
    // }else if(13==_keyCode && ["TEXTAREA"].includes(_element.tagName)){
    //   return 
    }
    var _paths;
    if(!this._lastPaths || this._lastPaths[0]!=_element){
      this._lastPaths=_paths=_domRecorder._buildTmpPath(_element);
    }else{
      _paths=this._lastPaths
    }

    if(["click","dblclick","mousedown"].includes(_action.type) && this._isIgnoreClickElement(_element)){
      if(_element.type=="file"){
        console.log("click file")
      }else if(_element.tagName!="SELECT"){
        this._lastStep._action=_action.type=="mousedown"?"click":_action.type;
        this._clickInputStep=this._lastStep
      }
      this._lastStep=0
      return;
    }

    var _step={
      _element:_element,
      _type:_ideActionData._type._triggerEvent,
      _paths:_paths,
      _action:_action.type,
      _ctrl:_action.ctrlKey,
      _alt:_action.altKey,
      _code:_keyCode,
      _char:_Util._checkCharcode(_action),
      _shift:_action.shiftKey,
      _value:_value,
      _button:_action.buttons||_action.button,
      _pageX:_action.pageX,
      _pageY:_action.pageY,
      _time:Date.now(),
      _tmpUrl:BZ.TW.location.href,
      _domXY:_Util._getDomXY(_element),
      _keyName:_action.key
    };

    if(_action.type=="mouseup"){
      if(!this._lastStep){
      }else if(this._listenEvents.dragDrop && this._lastStep._inDragdrop){
        _step._element=this._lastStep._element;
        _step._paths=this._lastStep._paths;
        _step._action="dragdrop";
        _step._orgPath=this._lastStep._orgPath;
        _step._tmpUrl=this._lastStep._tmpUrl;
        _step._startPos=_domRecorder._mousedownStep._domXY
        _domRecorder._createRecordAction(_step);
        this._lastStep=_step
      }else if(this._lastStep._action=="mousemove"){
        this._lastStep._action="click";
        _domRecorder._createRecordAction(this._lastStep);
        this._lastStep=0
      }
      return;
    }
    var _this=this;
    if (_action.type=="mousedown") {
      this._lastStep=_domRecorder._mousedownStep=_step;
      _step._orgPath=_domRecorder._retrievePath(_step._paths,_action.pageX,_action.pageY)
      return;
    }else if(_action.type=="mousemove"){
      if(!_step._button){
        if(this._lastStep && this._lastStep._action=="mousedown"){
          if(this._lastStep._element.draggable && (Math.abs(_step._pageX-this._lastStep._pageX)>10||Math.abs(_step._pageY-this._lastStep._pageY)>10)){
            this._lastStep._action="dragdrop";
            this._lastStep._pageX=_action.clientX
            this._lastStep._pageY=_action.clientY
            this._lastStep._targetElement=_Util._getElementByXY(this._lastStep._element.ownerDocument,_action.clientX,_action.clientY,this._lastStep._element)
            if(this._lastStep._targetElement){
              this._lastStep._targetElement=_cssHandler._findPath(this._lastStep._targetElement)
            }
          }else{
            this._lastStep._action="click";
          }
          _domRecorder._createRecordAction(this._lastStep);
          this._lastStep=0
        }else{
          this._lastStep=_step;
        }
      }else{
        if(this._lastStep && this._lastStep._element==_step._element && (this._lastStep._domXY.x!=_step._domXY.x || this._lastStep._domXY.y!=_step._domXY.y)){
          this._lastStep._inDragdrop=1
        }
      }
      return;
    }else if(_action.type=="click"){
      if(!this._lastStep){
        return
      }else if(this._lastStep._action=="dragdrop"){
        this._lastStep=0;
        return;
      }
      
      if(this._lastStep._action!=="mousedown"){
        return _domRecorder._createRecordAction(_step);
        /*
        var _tmpClick=_step;
        return setTimeout(function(){
          _domRecorder._createRecordAction(_tmpClick);
        },100)
        */
      }else if(this._lastStep && this._lastStep._action=="mousedown"){
        if((_action.pageX||_action.pageY)&&(Math.abs(_action.pageX-_domRecorder._lastStep._pageX)>50||Math.abs(_action.pageY-_domRecorder._lastStep._pageY)>50)){
          this._lastStep._action="dragdrop"
          this._lastStep._pageX=_action.pageX
          this._lastStep._pageY=_action.pageY
          if(this._lastStep._element.tagName=="CANVAS"){
            let _ignoreTxt=_descAnalysis._retrieveTextForElementPathItem(this._lastStep._orgPath._elementPath)
            let ee=_domRecorder._retrievePath(_step._paths,_action.pageX,_action.pageY,_ignoreTxt)
            if(ee){
              this._lastStep._targetElement=ee._elementPath
            }
          }
        }else{
          this._lastStep._action="click"
        }
        _domRecorder._createRecordAction(_domRecorder._lastStep);
        this._lastStep=0;
        return;
      }
    }
    if(!(this._lastStep && this._lastStep._action=="mousedown" && _step._element!=this._lastStep._element)){
      this._lastStep=_step;
    }
    _domRecorder._createRecordAction(_step);
  },
  _setPopInfo:function(_popMsg,a){
    if(!_popMsg){
      return;
    }
    a=a||_IDE._data._curAction;
    if(a){
      if(!a.event.popType){
        a.event.popType=_popMsg._type;
        a.expectation=_popMsg._msg;
        a.event.returnValue=_popMsg._returnValue;
        a.event.popFollow=""
      }else{
        if(!a.event.alerts){
          a.event.alerts=[]
          a.event.alerts.push({
            popType:a.event.popType,
            expectation:a.expectation,
            returnValue:a.event.returnValue,
            popFollow:""
          })
        }
        a.event.alerts.push({
          popType:_popMsg._type,
          expectation:_popMsg._msg,
          returnValue:_popMsg._returnValue,
          popFollow:""
        })
      }
    }
  },
  _insertHoverAction:function(e){
    if(_inHidden(e)){
      let p=e.parentNode,ee
      while(_inHidden(p)){
        e=p
        p=e.parentNode
      }
      if(!p||p.tagName=="BODY"){
        return
      }

      for(let o of p.children){
        if(o!=e&&!_Util._isIgnoreElement(o)){
          if(!ee||_Util._getElementContentText(o)){
            ee=o
          }
        }else{
          break
        }
      }
      ee=ee||p
      if(_domRecorder._lastElement==(ee)){
        return
      }
      if(_cssHandler._findHoverCssByElement(ee).length){
        let a={
          type:1,
          element:_cssHandler._findPath(ee),
          event:{
            type:"mouse",
            action:"hover",
          }
        }

  
        _domRecorder._sendData(a)
      }
    }

    function _inHidden(o){
      return _domRecorder._hiddenItems.includes(o)||$(_domRecorder._hiddenItems).find(o).length
    }
  },
  _addData:function(d){
    if(_isIgnoreElement(d._element,d._action)){
      return
    }
    let ld=_domRecorder._lastData
    if(!BZ._autoRecording && ld && ld._element==d._element && ld._action==d._action && d._action=="click"&&Date.now()-ld._time<200){
      return
    }else{
      _domRecorder._lastData={_element:d._element,_action:d._action,_time:Date.now()}
    }
    if(d._action=="change"){
      _domRecorder._typed=0;
    }
    if(!d._orgPath){
      d._orgPath=_domRecorder._retrievePath(d._paths,d._pageX,d._pageY);
      if(!d._orgPath){
        return
      }
    }

    var a={
      "type":d._type,
      "element":d._orgPath._elementPath||d._orgPath.element||d._orgPath,
      // qpath:_Util._getQuickPath(d._element),
      // css:d._orgPath.W||d._orgPath.css,
      event:{
        type:["change","focus","blur"].indexOf(d._action)>=0?d._action:d._action.indexOf("key")==0?"key":"mouse",
        ctrl:d._ctrl,
        alt:d._alt,
        shift:d._shift,
        button:d._button,
        x:d._pageX,
        y:d._pageY,
        keyCode:d._code,
        charCode:d._char,
        _customize:d._element._customize,
        value:BZ._autoRecording?d._value:_domActionTask._curValueDataBind||d._value
      },
      _tmpUrl:d._tmpUrl,
      inUpload:d.inUpload,
      _uploadFile:d._uploadFile,
      _uploadUrl:d._uploadUrl
    };
    if(_isComElement(a.element)){
      let tt=_getComTarget(d._element)
      let tw=_descAnalysis._retrieveTextForElementPathItem(a.element)
      a.event.type="change"
      if(!tt){
        a.event.value="{{$parameter."+_glossaryHandler._getVariableName(tw)+"}}"
      }else if(tt.type=="radio"){
        a.event.value=tw
      }else{
        a.event.value="true"
      }
    }
    
    if(d._element.bzTxtElement){
      a.offset=d._element.bzTxtElement.offset
      delete d._element.bzTxtElement
    }
    
    if(d._targetElement){
      a.event.element=d._targetElement
      if(a.offset){
        a.event.offset=a.offset
        delete a.offset//={x:0,y:0,origin:"mc"}
      }
    }
    if(d._action=="dragdrop"&&d._startPos&&d._domXY){
      a.event.way=Math.abs(d._startPos.x-d._domXY.x)>Math.abs(d._startPos.y-d._domXY.y)?"H":"V"
    }
    if(!BZ._autoRecording){
      _domActionTask._curValueDataBind=0;
    }
    _domRecorder._setPopInfo(this._curPopMsg,a);
    this._curPopMsg=0;
    
    if(d._action=="change" && d._element.type!="file"){
      a.event.autoBlur="on";
    }else if(d._action=="keyup"){
      a.event.action="group";
      a.event.keyName=d._keyName
      delete a.event.value;
    }
    if(d._button==2){
      a.event.action="click";
    }else if (!["keyup","change","focus","blur"].includes(d._action)) {
      a.event.action=d._action;
    }
    
    if(d._element.tagName=="CANVAS"&&a.event.action=="click"&&!_descAnalysis._retrieveTextForElementPathItem(a.element)){
      
    }
    
    _domRecorder._lastAction=a;
    _domRecorder._insertHoverAction(d._element)
    _domRecorder._lastElement=d._element;
    _domRecorder._clickInputStep=0
    setTimeout(()=>{
      _domRecorder._hiddenItems=0
    },100)
    // if(!BZ._autoRecording && a.event.type!="change"){
      // _ideDataBind._hideMe()
    // }
    if(this._lastStep&&d._action=="change"){
      if(this._lastStep._action!="mousedown"){
        this._lastStep=0
      }
    }else{
      this._lastStep=0
    }
    if(_IDE._data._setting.autoMergeToSetValue){
      a.mergeId=Date.now()
      _domRecorder._monitorSetInputActions._mergeForSetAction(d._element,{
        _action:a,
        _element:d._element,
        _type:d._action,
        _txt:d._element.innerText||_descAnalysis._retrieveTextForElementPathItem(d._element),
        _elementScope:_cssHandler._getElementScope(d._element)
      })
    }
    if(BZ._autoRecording){
      BZ._storeData(a)
    }else if(!window.extensionContent){
      _ideActionManagement._addItem(a);
    }else{
      //Call background to set back recording action
      console.log("send click event")
      _domRecorder._sendData(a)
    }
    _timingInfo._setTmpInfo([_ideActionManagement._getAutoDescription(a,1)])
    setTimeout(function(){
      _descAnalysis._clearTmpPath(1);
    },200)

    function _getComTarget(o){
      while(o){
        let os=$(o).find("INPUT")
        if(os.length){
          if(os.length>1){
            return
          }else{
            return os[0]
          }
        }else if(o.tagName=="BODY"){
          return
        }
        o=o.parentNode
      }
    }

    function _isComElement(p){
      return p[1][0]==":"&&!p[1].match(/^\:(input|text|Contains|RowCol|equal)/i)
    }

    function _isIgnoreElement(e,_action){
      if(_action=="click"&&e){
        if(e.tagName!="LABEL"&&e.tagName!="INPUT"){
          e=_Util._getParentNode(e,"LABEL")
        }
        
        if(e&&e.tagName=="LABEL"){
          e=$(e).find("input")[0]
        }

        if(e&&e.tagName=="INPUT"&&e.getBoundingClientRect().width&&(["checkbox","radio"].includes(e.type))){
          return 1
        }
      }
    }
  },
  _sendDataList:[],
  _sendData:function(a,_fun){
    if(!BZ._isRecording()){
      return _fun&&_fun()
    }
    this._lastData=a;
    BZ._formatInIFramePath(a.element)
    _domRecorder._sendDataList.push({action: a})
    _doIt()
    function _doIt(){
      if(!_domRecorder._waitSendData){
        let o=_domRecorder._sendDataList.shift()
        if(o){
          _domRecorder._waitSendData=1
          bzComm.postToIDE({
            ps:[o.action],
            scope:"_ideRecorder",
            fun:"_addNewItem",
            insertCallFun:1,
            return:function(){
              _domRecorder._waitSendData=0
              _doIt()
            }
          });
        }else{
          _fun&&_fun()
        }
      }else{
        setTimeout(()=>{
          _doIt()
        },100)
      
      }
    }
  },
  _isIgnoreEvent:function(d){
    var _tagName=d.tagName;
    if(!d.readOnly){
      if((_tagName=="INPUT" && !["button","submit","radio","image"].includes(d.type)) || ["TEXTAREA","SELECT"].includes(_tagName)){
        //ignore click on input event
        return _tagName=="SELECT" || !_cssHandler._getParentSelect(d);
      }
    }
    return _Util._inSelectOption(d)
  },
  _insertPrepareChange:function(){
    if(this._prepareChange){
      var a=this._prepareChange;
      a._time=Date.now()
      this._prepareChange=0;
      this._createRecordAction(a)
      this._lastPrepareChangeElement={_element:a._element,_time:Date.now()}
    }
  },
  _createRecordAction:function(d,_force){
    if(this._lastPrepareChangeElement&&this._lastPrepareChangeElement._element==d._element&&Date.now()-this._lastPrepareChangeElement._time<500){
      if(d._code!=13||(this._lastAction&&this._lastAction.event.type!="change")){
        return
      }
    }
    if(!d || d._action=="focusin"){
      return;
    }
    if(d._action=="blur" && !_domRecorder._typed){
      return;
    }
    if(d._action=="keyup"){
      if(!d._code){
        return;
      }
      if(d._char==0 && ([13,40,38,33,34,9].includes(d._code) || d.code>111)){
        this._insertPrepareChange();
      }else if(_Util._isStdInputElement(d._element)){
        d._action="change"
        d._value=d._element.value;
        if(d._code==13 && !d._value){
          this._insertPrepareChange();
        }else{
          return this._prepareChange=d;
        }
      }else if($(d._element).attr("contenteditable")){
        return;
      }
    }else if(this._prepareChange && d._action._element!=this._prepareChange._element){
      this._insertPrepareChange();
    }else{
      this._prepareChange=0;
    }
    if(d._action=="click" && this._lastStep && this._lastStep._action=="keyup"){
      return;
    }
    if(["change","blur","focusout"].includes(d._action)){
      if(this._lastChangeStep && this._lastChangeStep._element==d._element && d._time-this._lastChangeStep._time<500){
        return;
      }else{
        this._lastChangeStep=d;
      }
    }else{
      this._lastChangeStep=0;
    }
    
    if(!_force&&"click,mousedown,mouseup".includes(d._action)){
      // if(this._isIgnoreEvent(d._element)){
      //   return;
      // }
    }else if(d._action=="change" && d._element.tagName=="SELECT"){
      var vs=""
      for(var i=0;i<d._element.selectedOptions.length;i++){
        var o=d._element.selectedOptions[i];
        v=o.textContent || o.text;
        vs+="\n"+v;
      }
      d._value=vs.substring(1);
    }
    var _changeOnFile=d._action=="change" && d._element.tagName=="INPUT" && d._element.type=="file";
    if(_changeOnFile){
      _uploadHandler._inputFileToBase64Obj(d._element.files,function(_result){
        var uf=_uiSwitch._uploadUrl
        d._uploadFile=_result
        _result=JSON.stringify(_result,0,2)
        if(uf||_ideActionManagement._checkFileSize(_result)){
          d._value=uf||("{{"+_result+"}}");
          d.inUpload=1
          d._uploadUrl=uf
          if(uf){
            delete d._uploadFile
          }
          _domRecorder._addData(d);
        }
      })
    }else if(d._action=="change" && d._element.tagName=="INPUT" && d._element.type=="checkbox"){
      if(!d._element.checked){
        d._value=null;
      }
    }else if(["focusout","blur"].includes(d._action) && !_Util._isStdInputElement(d._element) && d._element.contentEditable){
      d._action="change"
    }
    if(!_changeOnFile){
      _domRecorder._addData(d);
    }
  },
  _bindKeydown:function(a){
    if(!a.keyCode){
      return;
    }
    if($(BZ.TW.document).find(".BZIgnore").find(a.target).length){
      return;
    }
    // _elementMonitor._handleMonitor();
    if(_Util._isInContentEditable(a.currentTarget || a.target)){
      _domRecorder._typed=1;
    }
    clearTimeout(_domRecorder._keyDownTime);
    _domRecorder._keyDownTime=setTimeout(function(){
      _ideDataBind._filter(a.target)
    },100)
  },
  _bindFun:function(a){
    if(!BZ._isRecording()){
      return;
    }
    if(a.type=="mousemove"&&a.target.tagName=="CANVAS"&&!a.target._bindFun){
      a.target._bindFun=1
      $(a.target).bind("mousedown",_domRecorder._bindFun);
    }
    if($(BZ.TW.document).find(".BZIgnore").find(this).length){
      return;
    }else if(!_IDE._data._setting.disableShadowRootRecording&&a.target.shadowRoot&&_Util._hasDeepContent(a.target.shadowRoot)){
      if(!a.target.shadowRoot._inListening){
        a.target.shadowRoot._path=_cssHandler._findPath(a.target)
        _domRecorder._setDomEventListener(a.target.shadowRoot)
      }
      return
    }else if(a.target==this){
      _domRecorder._recordEvent(a,this.value);
    }else if(a.type=="change"){
      _domRecorder._recordEvent(a,a.target.value);
    }
  },
  _bindContentEditable:function(a){
    if(!BZ._isRecording()){
      return;
    }
    if(a.target==this){
      _domRecorder._recordEvent(a,this.innerHTML);
    }
  },
  _bindEnterIframe:function(a){
    bzComm._assignIFrameIdx(a)
  },
  _bindFocus:function(a){
    if(!BZ._isRecording()){
      return;
    }
    if(a.target==this && !$(BZ.TW.document).find(".BZIgnore").find(this).length){
      _domRecorder._recordEvent(a,this.value);
    }
  },
  _removeDomEventListener:function(_document){
    try{
      let b=_document

      b._inListening=false;
      $(b).off("mousedown","*",_domRecorder._bindFun);
    
      $(b).off("mouseup","*",_domRecorder._bindFun);
      $(b).off("mousemove","*",_domRecorder._bindFun);
      $(b).off("dblclick","*",_domRecorder._bindFun);
      $(b).off("click","*",_domRecorder._bindFun);
      $(b).off("keyup","*",_domRecorder._bindFun);
      $(b).off("keydown","*",_domRecorder._bindKeydown);
      $(b).off("change","input,textarea,select",_domRecorder._bindFun);
      $(b).off("focus","input,textarea,select",_domRecorder._bindFocus);
      $(b).off("blur","[contenteditable=true]",_domRecorder._bindContentEditable);
      
      $(b).find("CANVAS").unbind("mousedown",_domRecorder._bindFun);

      $(b).find("*").toArray().forEach(function(e){
        e=e.shadowRoot
        if(e){
          e=$(e).find("*")
          e.off("mousedown",_domRecorder._bindFun);
          e.off("mouseup","*",_domRecorder._bindFun);
          e.off("mousemove","*",_domRecorder._bindFun);
          e.off("dblclick","*",_domRecorder._bindFun);
          e.off("click","*",_domRecorder._bindFun);
          e.off("keyup","*",_domRecorder._bindFun);
          e.off("keydown","*",_domRecorder._bindKeydown);
          e.off("change","input,textarea,select",_domRecorder._bindFun);
          e.off("focus","input,textarea,select",_domRecorder._bindFocus);
          e.off("blur","[contenteditable=true]",_domRecorder._bindContentEditable);
        }
      })      
    }catch(e){
      
    }
  },
  _monitor:function(_doc){
    var ds=_domRecorder._monitorList;
    if(!ds.includes(_doc)){
      ds.push(_doc);
      _domRecorder._observer.disconnect();
      for(var i=ds.length-1;i>=0;i--){
        var d=ds[i];
        if(!d.defaultView || d.defaultView.closed || !d.body){
          ds.splice(i,1);
        }else{
          _domRecorder._observer.observe(d.body,{
            childList:true,
            subtree:true,
            characterData: true,
            attributes:true,
            attributeFilter: ['style','class'],
            attributeOldValue:true
          });    
        }
      }
    }
  }
};
var TWHandler={
  _resetTime:60000,
  _lastPageInfo:{},
  _curRequestList:[],
  BZ_sent:0,
  _popExpected:{alert:[],confirm:[],prompt:[],onbeforeunload:[]},
  _popActual:{alert:[],confirm:[],prompt:[],onbeforeunload:[]},
  _init:function(){
    this.BZ_sent=0;
    this._lastPageInfo={};
    this._popExpected={alert:[],confirm:[],prompt:[],onbeforeunload:[]};
    this._popActual={alert:[],confirm:[],prompt:[],onbeforeunload:[]};
    if(window.name!="bz-master"){
      if(window.extensionContent){
        $(document.body).on("mouseover","a",function(){
          _Util._removeLinkTarget(this)
        })
      }else{
        let w=window
        TWHandler._takeoverAddEventListener();
        TWHandler._takeoverCanvas(w);
        TWHandler._takeoverOpenWin(w);
        TWHandler._takeoverSocket(w);
        TWHandler._takeoverAjax(w)
        TWHandler._takeoverConsole(w);

      }
    }
    if(bzComm._isAppExtension()){
      TWHandler._monitorScrollEvent();
    }
  },
  _monitorScrollEvent:function(){
    $(document.body).on('mouseover', function(e){
      $(e.target).off("scroll",TWHandler._scrollFun);
      $(e.target).on("scroll",TWHandler._scrollFun);
    });
  },
  _scrollFun:function(event) {
    clearTimeout(document._bzWheelEventTimer)
    _doIt()
    function _doIt(){
      document._bzWheelEventTimer=setTimeout(function(){
        $(".BZCover").toArray().forEach(x=>{
          let r=x.o.getBoundingClientRect()
          if(r.width||r.height){
            $(x).css({left:r.left,top:r.top})
          }else{
            x.remove()
          }
        })
      },300)
    }
  },
  _chkPopInfo:function(_action,_second){ //for alert, confirm, prompt
    var a=TWHandler._popActual;
    var e=TWHandler._popExpected;

    for(var k in a){
      var aa=a[k].shift();
      var ee=e[k].shift();
      if (aa===undefined && (ee===undefined || ee.expectation===undefined)) {
      }else if (aa===undefined) {
        if(!_second){
          e[k].unshift(ee);
          return "wait"
        }
        return _Util._formatMessage(_bzMessage._test._error._missPop,[k,ee.expectation]);
      }else if (ee===undefined) {
        return _Util._formatMessage(_bzMessage._test._error._unexpectedPop,[k,aa]);
      }else if (aa.trim()!=ee.expectation.toString().trim()) {
        return _Util._formatMessage(_bzMessage._test._error._unMatchPop,[k,ee.expectation,aa]);
      }
    }
  },
  _setBackTestPage:function(){
    w=window;
    if(document.documentElement.getAttribute("bzOverrideMark")){
      w.alert=w.BZ_Alert;
      w.confirm=w.BZ_Confirm;
      w.prompt=w.BZ_Prompt;
      if(w.onbeforeunload){
        w.onbeforeunload=w.BZ_Onbeforeunload;
      }else if(TWHandler._checkJQueryEvent().beforeunload){
        TWHandler._checkJQueryEvent().beforeunload[0].handler=w.BZ_Onbeforeunload;
      }
      
      w.BZ_Alert=0;
      w.BZ_Confirm=0;
      w.BZ_Prompt=0;
      w.BZ_Onbeforeunload=0;
      delete w.BZ_Onbeforeunload_fun;
      document.documentElement.removeAttribute("bzOverrideMark");
    }
  },
  _takeoverWin:function(){
    if(window.extensionContent){
      return bzComm.postToApp({fun:"_takeoverWin",scope:"TWHandler",ps:[]});
    }
    
    try{
      TWHandler._takeoverPopMsg(window);
      document.documentElement.setAttribute("bzOverrideMark",1)
    }catch(e){
    }
  },
  _takeoverConsole:function(w){
    if(!w._orgAssert){
      w._orgAssert=w.console.assert;
      var _this=this;
      w.console.assert=function(a,b){
        if(!a){
          _this._assertList=_this._assertList||[];
          _this._assertList.push(b)
        }
      }
    }
  },
  _takeoverCanvas:function(w){
    w=w||window
    if(window.name=="bz-master"){
      return
    }
    let _CanvasRenderingContext2D="Ca"+"nvas"+"Render"+"ingCont"+"ext2D",
        _prototype="pro"+"tot"+"ype",
        _fillText="fi"+"llTe"+"xt",
        _strokeText="st"+"rokeT"+"ext",
        _clearRect="cle"+"arR"+"ect",
        _reset="r"+"es"+"et",
        _setTransform="se"+"tTr"+"ansfo"+"rm",
        _transform="tr"+"ansfo"+"rm",
        _scale="sca"+"le",
        _translate="tra"+"nsla"+"te",
        _getTransform="ge"+"tTra"+"nsfo"+"rm",
        _drawImage="dra"+"wIma"+"ge",
        _putImageData="pu"+"tIma"+"geD"+"ata",
        _createImageData="cr"+"eateI"+"mageD"+"ata",
        _HTMLCanvasElement="HT"+"MLCan"+"vasEl"+"eme"+"nt",
        _width="wi"+"dth",
        _height="he"+"ig"+"ht",
        _setAttribute="setAttribute";
        
    if(!w[_CanvasRenderingContext2D][_prototype]._bzFillText){
      w[_HTMLCanvasElement][_prototype]._bzSetAttribute=w[_HTMLCanvasElement][_prototype][_setAttribute];
      w[_HTMLCanvasElement][_prototype][_setAttribute]=function(a,b){
        if(a=="width"||a=="height"){
          _clearMap(this["ge"+"tCon"+"tex"+"t"]("2"+"d"))
        }
        this._bzSetAttribute(a,b)
      }

      w[_CanvasRenderingContext2D][_prototype]._bzFillText=w[_CanvasRenderingContext2D][_prototype][_fillText];
      w[_CanvasRenderingContext2D][_prototype][_fillText]=function(a,b,c,d){
//        console.log("fill text: "+a+","+b)
        _handleFillText(this,a,b,c,d)
        this._bzFillText(a,b,c,d)
      }

      w[_CanvasRenderingContext2D][_prototype]._bzStrokeText=w[_CanvasRenderingContext2D][_prototype][_strokeText];
      w[_CanvasRenderingContext2D][_prototype][_strokeText]=function(a,b,c,d){
        _handleFillText(this,a,b,c,d)
        this._bzStrokeText(a,b,c,d)
      }


      w[_CanvasRenderingContext2D][_prototype]._bzClearRect=w[_CanvasRenderingContext2D][_prototype][_clearRect]
      w[_CanvasRenderingContext2D][_prototype][_clearRect]=function(a,b,c,d){
        // console.log("_clearMap:"+a+":"+b+":"+c+":"+d)
        _clearMap(this,a,b,c,d)
        this._bzClearRect(a,b,c,d)
      }

      w[_CanvasRenderingContext2D][_prototype]._bzReset=w[_CanvasRenderingContext2D][_prototype][_reset]
      w[_CanvasRenderingContext2D][_prototype][_reset]=function(a,b,c,d){
        // console.log("_clearMap:"+a+":"+b+":"+c+":"+d)
        _clearMap(this)
        this._bzReset(a,b,c,d)
      }

      if(!w[_CanvasRenderingContext2D][_prototype][_getTransform]){
        w[_CanvasRenderingContext2D][_prototype]._bzSetTransform=w[_CanvasRenderingContext2D][_prototype][_setTransform]
        w[_CanvasRenderingContext2D][_prototype][_setTransform]=function(a,b,c,d,e,f){
          TWHandler._curTransform={
            a:a,b:b,c:c,d:d,e:e,f:f
          }
          this._bzSetTransform(a,b,c,d,e,f)
        }

        w[_CanvasRenderingContext2D][_prototype]._bzTransform=w[_CanvasRenderingContext2D][_prototype][_transform]
        w[_CanvasRenderingContext2D][_prototype][_transform]=function(a,b,c,d,e,f){
          let v=TWHandler._curTransform=TWHandler._curTransform||{a:1,b:0,c:0,d:1,e:0,f:0}
          v.e+=e*v.a
          v.f+=f*v.d
          v.a*=a
          v.b+=b
          v.c+=c
          v.d*=d
          // console.log("transform:"+v.a+":"+v.b+":"+v.c+":"+v.d+":"+v.e+":"+v.f)
          
          this._bzTransform(a,b,c,d,e,f)
        }

        w[_CanvasRenderingContext2D][_prototype]._bzScale=w[_CanvasRenderingContext2D][_prototype][_scale]
        w[_CanvasRenderingContext2D][_prototype][_scale]=function(a,b){
          let v=TWHandler._curTransform=TWHandler._curTransform||{a:1,b:0,c:0,d:1,e:0,f:0}
          v.a*=a
          v.d*=b
          // console.log("scale:"+v.a+":"+v.d)
          this._bzScale(a,b)
        }

        w[_CanvasRenderingContext2D][_prototype]._bzTranslate=w[_CanvasRenderingContext2D][_prototype][_translate]
        w[_CanvasRenderingContext2D][_prototype][_translate]=function(a,b){
          let v=TWHandler._curTransform=TWHandler._curTransform||{a:1,b:0,c:0,d:1,e:0,f:0}
          v.e+=a
          v.f+=b
          // console.log("translat:"+v.e+":"+v.f)
          this._bzTranslate(a,b)
        }

        w[_CanvasRenderingContext2D][_prototype]._bzGetTransform=w[_CanvasRenderingContext2D][_prototype][_getTransform]
        w[_CanvasRenderingContext2D][_prototype][_getTransform]=function(){
          if(this._bzGetTransform){
            return this._bzGetTransform()
          }else{
            return TWHandler._curTransform||{a:1,b:0,c:0,d:1,e:0,f:0}
          }
        }
      }
      /*
      w[_CanvasRenderingContext2D][_prototype]._bzDrawImage=w[_CanvasRenderingContext2D][_prototype][_drawImage];
      w[_CanvasRenderingContext2D][_prototype][_drawImage]=function(a,b,c,d,e,f,g,h,j){
        let r=this[_getTransform]()
        if(a.src){
          let dd={
            t:a.src.split("/").pop().split(".")[0],
            w:h*r.a,
            h:j*r.d,
            x:f+r.e,
            y:g+r.f,
            _img:1
            // bg:bg
          }
          dd.c={x:dd.x+dd.w/2,y:dd.y+dd.h/2}
          _addData(this,dd)
        }
        this._bzDrawImage(a,b,c,d,e,f,g,h,j)
      }
      
      // w[_CanvasRenderingContext2D][_prototype]._bzMoveTo=w[_CanvasRenderingContext2D][_prototype].moveTo;
      // w[_CanvasRenderingContext2D][_prototype].moveTo=function(a,b){
        // // console.log("--------moveTo--------")
        // // let r=this[_getTransform]()
        // // console.log(r)
        // // console.log(a+":"+b)
        // // console.log("----------------------------")
        // this._bzMoveTo(a,b)
      // }
      
      // w[_CanvasRenderingContext2D][_prototype]._bzLineTo=w[_CanvasRenderingContext2D][_prototype].lineTo;
      // w[_CanvasRenderingContext2D][_prototype].lineTo=function(a,b){
        // // console.log("--------lineTo--------")
        // // console.log(this.canvas.getAttribute("bzTxtId"))
        // // console.log("strokeStyle: "+this.strokeStyle)
        // // console.log("lineWidth"+this.lineWidth)
        // // let r=this[_getTransform]()
        // // console.log(r)
        // // console.log(a+":"+b)
        // // console.log("----------------------------")
        // // if(a>10||b>10){
          // // return
        // // }
        // this._bzLineTo(a,b)
      // }

      w[_CanvasRenderingContext2D][_prototype]._bzCreateImageData=w[_CanvasRenderingContext2D][_prototype][_createImageData];
      w[_CanvasRenderingContext2D][_prototype][_createImageData]=function(a,b,c){
        // console.log("------CreateImageData------")
        // console.log(a+":"+b+":"+c)
        // console.log("----------------------------")
        this._bzCreateImageData(a,b,c)
      }

      w[_CanvasRenderingContext2D][_prototype]._bzPutImageData=w[_CanvasRenderingContext2D][_prototype][_putImageData];
      w[_CanvasRenderingContext2D][_prototype][_putImageData]=function(a,b,c,d,e,f){
        // console.log("-------[_putImageData]---------")
        // console.log(a+":"+b+":"+c+":"+d+":"+e+":"+f)
        // console.log("----------------------------")
        this._bzPutImageData(a,b,c,d,e,f)
      }
      /**/
    }else{
      return
    }

    function _handleFillText(cc,a,b,c,d){
      let h=parseInt(cc.font.match(/[0-9\.]+/)[0])
      // console.log(a+":"+b+":"+c+":"+h+":"+cc.measureText(a).width)
      // let bg=cc.getImageData(b, c-h, 1, 1)
      // bg=bg.data
      // bg=[bg[0],bg[1],bg[2],bg[3]]
      
      let r=cc[_getTransform](),
          ww=cc.measureText(a).width

      let dd={
        t:a,
        w:ww*r.a,
        h:h*r.d,
        x:b+r.e,
        y:c-h+r.f
        // bg:bg
      }
      
      // console.log(JSON.stringify(dd))
      // console.log(JSON.stringify(r))
      
      dd.c={x:dd.x+dd.w/2,y:dd.y+dd.h/2}
      if(cc.textAlign=="center"){
        dd.x-=dd.w/2
      }else if(cc.textAlign=="right"){
        dd.x-=dd.w
      }
      if(!cc._bzSetTransform||(dd.x>0&&dd.y>0)){
        _addData(cc,dd)
      }
    }

    function _clearMap(c,x,y,w,h){
      if(!TWHandler._canvasDataMap){
        return
      }
      let _map=TWHandler._canvasDataMap[c.canvas.getAttribute("bzTxtId")]
      if(_map){
        if(x===undefined){
          for(let k in _map){
            delete _map[k]
          }
        }else{
          let wx=w+x,hy=h+y
          for(var k in _map){
            let d=_map[k]
            _Util._spliceAll(d,v=>{
              return v.x>=x&&v.x<=wx&&v.y>=y&&v.y<=hy
            })
            if(!d.length){
              delete _map[k]
            }
          }
        }
        TWHandler._buildCanvasDataPath()
      }
    }
    function _addData(c,d){
      d.t=(d.t||"").trim()
      if(!d.t){
        return
      }
      
      if(!d.t.match(_Util._allPrintableChr)){
        return 
      }

      let _key=c.canvas.getAttribute("bzTxtId")
      if(!_key||!TWHandler._canvasDataMap[_key]){
        _key="bz"+Date.now()
        c.canvas.setAttribute("bzTxtId",_key)
        
        if(!TWHandler._canvasDataMap){
          TWHandler._canvasDataMap={}
        }

        TWHandler._canvasDataMap[_key]={}
      }
      _clearMap(c,d.x,d.y,d.w,d.h)
      
      let _map=TWHandler._canvasDataMap[_key]
      let dd=_map[d.t]
      if(!dd){
        dd=_map[d.t]=[]
      }
      
      dd.push(d)
      dd.sort((a,b)=>{
        let v=a.y-b.y
        if(!v){
          v=a.x-b.x
        }
        if(!v){
          v=a.w-b.w
        }
        if(!v){
          v=a.h-b.h
        }
        return v
      })
      TWHandler._buildCanvasDataPath()
    }
  },
  _buildCanvasDataPath:function(){
    clearTimeout(TWHandler._buildCanvasDataPathTimer)
    TWHandler._buildCanvasDataPathTimer=setTimeout(()=>{
      _clean()
      TWHandler._getCanvasData()
    },100)
    function _clean(){
      let cs=document.getElementsByTagName("CANVAS")
      for(var k in TWHandler._canvasDataMap){
        let _found=0
        for(var i=0;i<cs.length;i++){
          if(cs[i].getAttribute("bzTxtId")==k){
            _found=1
            break
          }
        }
        if(!_found){
          delete TWHandler._canvasDataMap[k]
        }
      }
    }
  },
  _getCloseCanvasItem:function(o,_list){
    let _min,x,y,vv;
    _list.forEach(v=>{
      if(o.x+o.w<=v.x||v.x+v.w<o.x){
        x=v.x-o.x-o.w
      }else{
        x=v.c.x-o.c.x
      }
      if(o.y+o.h<=v.y||v.y+v.h<o.y){
        y=v.y-o.y-o.h
      }else{
        y=v.c.y-o.c.y
      }
      
      vv=Math.pow(x*x+y*y,0.5)
      if(!_min||_min.v>vv){
        _min={
          o:v,
          v:vv
        }
      }
    })
    return _min
  },
  _getCanvasData:function(_map){
    if(!window.extensionContent){
      bzComm.postToAppExtension({
        fun:"_getCanvasData",
        ps:[TWHandler._canvasDataMap],
        scope:"TWHandler"
      })
    }else if(_map){
      TWHandler._canvasDataMap=_map
    }else{
      return TWHandler._canvasDataMap
    }
  },
  _getCanvasTextElement:function(c,t,i){
    if(TWHandler._canvasDataMap){
      let m=TWHandler._canvasDataMap[c.getAttribute("bzTxtId")]
      if(m){
        m=m[t]
        if(m){
          if(i!==undefined){
            return m[i]
          }
          return m
        }else{
          let tt=t.split(">"),ts=[]
          for(let j=0;j<tt.length;j++){
            let tv=tt[j]
            if(tv.endsWith("\\")&&j<tt.length-1){
              tv=tv.replace("\\",">")+tt[j+1]
              j--
            }
          }
          tt=tt.map(x=>x.trim())
          while(tt.length){
            let tv=tt.pop().replace(/\)$/,"")
            tv=TWHandler._getCanvasTextElement(c,tv)
            if(tv){
              ts.unshift(tv)
            }else{
              return
            }
          }
          let kt=ts.shift(),_min
          while(ts.length){
            let to=ts.shift()
            kt.forEach((kk,i)=>{
              let mm=TWHandler._getCloseCanvasItem(kk,to)
              if(!i||mm.v<_min.v){
                _min=mm
              }
            })
            if(_min){
              kt=[_min.o]
            }
          }
          if(i===undefined){
            return [_min.o]
          }else{
            return _min.o
          }
        }
      }
    }
  },
  _getCanvasTextElementIdx:function(c,d){
    if(TWHandler._canvasDataMap){
      let m=TWHandler._canvasDataMap[c.getAttribute("bzTxtId")]
      if(m){
        m=m[d.t]
        if(m){
          return m.findIndex(v=>{
            return v==d
          })
        }
      }
    }
  },
  _getCanvasTextElementByMousePos:function(c,x,y,_ignoreTxt){
    if(TWHandler._canvasDataMap){
      let m=TWHandler._canvasDataMap[c.getAttribute("bzTxtId")]
      if(m){
        let r=c.getBoundingClientRect(),_min;
        x-=r.left;
        y-=r.top;
        
        for(var k in m){
          let ds=m[k]
          for(var i=0;i<ds.length;i++){
            let d=ds[i]
            
            if(_ignoreTxt==d.t){
              continue
            }

            if(d.x<=x&&d.x+d.w>=x&&d.y<=y&&d.y+d.h>=y){
              return d
            }else{
              let v=Math.pow(Math.pow(d.c.x-x,2)+Math.pow(d.c.y-y,2),0.5)
              if(!_min||_min.v>v){
                _min={v:v,d:d}
              }
            }
          }
        }
        if(_min){
          let d=_min.d
          d.offset=0
          if(x<d.x||x>d.x+d.w||y<d.y||y>d.y+d.h){
            d.offset={
              X:parseInt(x-d.c.x),
              Y:parseInt(y-d.c.y),
              origin:"mc"
            }
          }
          return d
        }
      }
    }
  },
  _takeAssertInfo:function(){
    var v=this._assertList||[];
    this._assertList=[];
    return v;
  },
  _takeoverPopMsg:function(w){
    var _beforeunload=w.onbeforeunload || (TWHandler._checkJQueryEvent().beforeunload?TWHandler._checkJQueryEvent().beforeunload[0].handler:null);
    
    if((!w.BZ_Onbeforeunload && _beforeunload) || (w.BZ_Onbeforeunload_fun && w.BZ_Onbeforeunload_fun!=_beforeunload)){
      w.BZ_Onbeforeunload=_beforeunload;
      if(_beforeunload){
        _beforeunload=function(){
          TWHandler._setOnbeforeunload(w.BZ_Onbeforeunload());
        };
        if(w.onbeforeunload){
          w.onbeforeunload=_beforeunload;
        }else{
          TWHandler._checkJQueryEvent().beforeunload[0].handler=_beforeunload;
        }
      }
      w.BZ_Onbeforeunload_fun=_beforeunload;
    }
    if(w.BZ_Alert){
      return;
    }
    w.BZ_Alert=w.alert;
    w.BZ_Confirm=w.confirm;
    w.BZ_Prompt=w.prompt;
    
    w.alert=function(m){
      TWHandler._setAlert(m);
    };
    w.confirm=function(_msg){
      var v= TWHandler._triggerConfirm(_msg);
      return v;
    };
    w.prompt=function(_msg){
      var v=TWHandler._triggerPrompt(_msg)
      return v
    };
  },
  _takeoverAjax:function(_win){
    console.log("TWHandler._takeoverAjax ....")
    var p=_win.XMLHttpRequest.prototype
    if(!p.BZ_Ajax||p.open==p.BZ_Ajax){
      p.BZ_Ajax=p.open;
      p.open=function(a,b,c){
        var o=this;
        var _host=_Util._retrieveHostFromUrl(b)
        if(!_host){
          _host=location.protocol+"/"+"/"+location.host;
        }
        o.url=b;

        o.m=a;
        TWHandler._curAPI={url:b,method:a,host:_host}

        this.BZ_ReceiveAjax=function(url){
          if((o.readyState==4 || o._time && Date.now()-o._time>1000) && url==o.url){
            bzComm.postToAppExtension({
              fun:"_setRequestCount",
              ps:{_url:o.url,i:-1,_type:"api"},
              scope:"TWHandler"
            });
          }else{
            if(o._send && o.readyState==0 && !o._time){
              o._time=Date.now()
            }
            var a=this;
            _win.setTimeout(function(){
              a.BZ_ReceiveAjax(url)
            },0);
          }
        };
        _win.setTimeout(function(){
          o.BZ_ReceiveAjax(b)
        },0);
        if(c!==undefined){
          return this.BZ_Ajax(a,b,c);
        }else{
          return this.BZ_Ajax(a,b);
        }
      };

      if(!p.BZ_SetHeader||p.BZ_SetHeader==p.setRequestHeader){
        p.BZ_SetHeader=p.setRequestHeader;
        
        p.setRequestHeader=function(a,b){
          this._headers=this._headers||{}
          if(this._headers[a]!==b){
            this._headers[a]=b
          }
          this.BZ_SetHeader(a,b)
        }
      }

      if(!p.BZ_AjaxSend||p.BZ_AjaxSend==p.send){
        p.BZ_AjaxSend=p.send;
        p.send=function(a,b,c){
          bzComm.postToAppExtension({
            fun:"_setRequestCount",
            ps:[{_url:this.url,i:1,_type:"api"}],
            scope:"TWHandler"
          });
          this._send=1;
          TWHandler._setAjaxRequest(a,this._headers)
          return this.BZ_AjaxSend(a,b,c);
        };
      }
      
      let _bzFetch=_win.fetch
      _win.fetch=function(a,b,c){
        let _url=a.url||a
        let _host=_Util._retrieveHostFromUrl(_url)
        let m=a.method?a.method:b?b.method:"GET"
        let _body=(a&&a.body)||(b&&b.body)||b
        let _headers=(a&&a.headers)||(b&&b.headers)||b||{}
        TWHandler._curAPI={url:_url,method:m,host:_host}
        bzComm.postToAppExtension({
          fun:"_setRequestCount",
          ps:[{_url:_url,i:1,_type:"fetch"}],
          scope:"TWHandler"
        });

        let _featchResult=_bzFetch(a,b,c)
        _featchResult.then(x=>{
          x=x.clone()
          TWHandler._setAjaxRequest(_body,_headers)
          setTimeout(()=>{
            bzComm.postToAppExtension({
              fun:"_setRequestCount",
              ps:[{_url:_url,i:-1,_type:"fetch"}],
              scope:"TWHandler"
            });
            try{
              let _contentType=x.headers.get('content-type')||""
              if(_contentType.includes("json")){
                x.json().then(xx=>{
                  let d={data:xx,url:_url,m:m,status:x.status,host:_host}
                })
              }
            }catch(e){}
          },100)
        },_err=>{
          bzComm.postToAppExtension({
            fun:"_setRequestCount",
            ps:[{_url:_url,i:-1,_type:"fetch"}],
            scope:"TWHandler"
          });
         // throw _err
        })
        return _featchResult
      }
    }
  },
  _setRequestCount:function(v){
    if(BZ.isIgnoreReq(v._url)){
      return
    }
    if(v.i==-1){
      TWHandler._curRequestList.find((x,i)=>{
        if(x._url==v._url){
          TWHandler._curRequestList.splice(i,1)
          return 1
        }
      })
    }else{
      TWHandler._curRequestList.push(v)
    }
    if(window.extensionContent&&v._type=="socket"){
      bzComm.postToIDE({
        fun:"_setRequestCount",
        scope:"TWHandler",
        ps:[v]
      })
    }
  },
  _takeoverSocket:function(_win){
    var p=_win.WebSocket.prototype
    if(!p._bzSocketSend||p._bzSocketSend==p.send){
      p._bzSocketSend=p.send
      p.send=function(_msg,bz){
        if(!bz){
          bzComm.postToAppExtension({
            fun:"_setRequestCount",
            ps:[{_url:this.url,i:1,_type:"socket"}],
            scope:"TWHandler"
          });

          if(!_win._bzSocket){
            _win._bzSocket=this
            _win._bzSocket.addEventListener("message",function(e){
              var o=_win._bzSocket
              bzComm.postToAppExtension({
                fun:"_setRequestCount",
                ps:[{_url:this.url,i:1,_type:"socket"}],
                scope:"TWHandler"
              });
            })
          }
        }
        this._bzSocketSend(_msg)
      }
    }
  },
  _setAjaxRequest:function(v,_headers){
    if(!window.extensionContent){
      if(v){
        if(TWHandler._curAPI){
          TWHandler._curAPI.data=v
        }else{
          TWHandler._curAPI=v
        }
      }
      
      v=TWHandler._curAPI
      if(_headers&&v){
        v.contentType=_headers["Content-Type"]||_headers["content-type"]
        v.headers=JSON.stringify(_headers)
      }
      TWHandler._curAPI=0
      bzComm.postToAppExtension({
        fun:"_postAPIData",
        ps:[v],
        scope:"TWHandler"
      });
    }
  },
  _postAPIData:function(v){
    v.url=_Util._mergeURL(location.protocol+"/"+"/"+location.host,v.url)
    TWHandler._setToken(v)
    bzComm.postToIDE({
      fun:"_attachReqData",
      scope:"_appReqRepHandler",
      ps:[v]
    })
  },
  _setToken:function(v){
    if(v.headers){
      try{
        let r={_tokenHost:BZ._getHostIdx(v.url),tokenValue:""}
        if(r._tokenHost===undefined){
          return
        }
        var h=_Util._strToJson(v.headers)
        let a=_IDE._data._setting.authList.find(x=>x.hostToken==r._tokenHost)
        var ts=a.tokenKey.split(/, */)
        if(ts.find(t=>{
          if(h[t]){
            if(!r.tokenValue){
              r.tokenValue={}
            }
            r.tokenValue[t]=h[t]
          }else{
            return 1
          }
        })){
          return
        }
        
        if(_Util._isSameObj(_aiAuthHandler._getToken(r._tokenHost),r.tokenValue)){
          return
        }
        TWHandler._token=r

        bzComm.postToIDE({fun:"_setToken",scope:"_aiAuthHandler",ps:[r]})
      }catch(e){}
    }
  },
  _bzOnBeforeUnload:function(){
    _bzDomPicker._endRequire();
  },
  _setUnload:function(){
    window.onbeforeunload=TWHandler._bzOnBeforeUnload;
    
  },
  _takeoverOpenWin:function(_win){
    _win=_win||window
    
    _win=_win||window
    if(_win.BZ_PopOpen&&_win.BZ_PopOpen!=_win.open){
      // console.log("3:"+_key)
      return;
    }
    _win.BZ_PopOpen=_win.open;
    _win.open=function(_url,_name,_option,_replace){
      // console.log("BZ open: "+_key)
      if(!TWHandler._isSameDomain(_url) && !window.extensionContent && window.BZ){
        if(!confirm(_bzMessage._system._info._outDomainWarning)){
          return;
        }
      }
      if(_name!="BZ-In-Testing" && !window.BZ){
        var fs=window.document.getElementsByTagName("IFRAME");
        for(var i=0;i<fs.length;i++){
          if(fs[i].name==_name){
            return _win.BZ_PopOpen(_url,_name,_option,_replace);
          }
        }
      }else if(_name=="BZ-In-Testing" || _Util._getDomsByTagAndName("IFRAME",_name).length){
        return _win.BZ_PopOpen(_url,_name,_option,_replace);
      }
      var _pop=_win.BZ_PopOpen(_url,"_"+"self",_option,_replace);

      setTimeout(function(){
        if(_pop&&_pop.closed){
          _win.BZ_PopOpen(_url,"_"+"self",_option,_replace);
        }
      },1000)
      return _pop
    }
  },
  _setAlert:function(_msg){
    if(!window.extensionContent){
      bzComm.postToAppExtension({
        fun:"_setAlert",
        ps:[_msg],
        scope:"TWHandler"
      })
    }else{
      TWHandler._popActual.alert.push(_msg+"");
    }
  },
  _setOnbeforeunload:function(_msg){
    if(_msg){
      if(!window.extensionContent){
        bzComm.postToAppExtension({
          fun:"_setOnbeforeunload",
          ps:[_msg],
          scope:"TWHandler"
        })
      }else{
        TWHandler._popActual.onbeforeunload.push(_msg+"");
      }
    }
  },
  _triggerConfirm:function(_msg){
    if(!window.extensionContent){
      bzComm.postToAppExtension({
        fun:"_triggerConfirm",
        ps:[_msg],
        scope:"TWHandler"
      })
      return true
    }
    var a = TWHandler._popActual.confirm;
    a.push(_msg+"");
    var aa=TWHandler._popExpected.confirm;
    var rv=true;
    if(aa && aa[a.length-1]!==undefined){
      rv=aa.pop().returnValue;
      a.pop();
    }
    return rv;
  },
  _triggerPrompt:function(_msg){
    if(!window.extensionContent){
      bzComm.postToAppExtension({
        fun:"_triggerPrompt",
        ps:[_msg],
        scope:"TWHandler"
      });
      return;
    }
    var a = TWHandler._popActual.prompt;
    a.push(""+_msg);
    var b=TWHandler._popExpected.prompt;
    
    var rv=false;
    
    if(b && b.length){
      rv=b[0].returnValue;
      if(b.length>1){
        b.shift()
      }
    }
    return rv;
  },
  _waitFollowingPop:function(_result,_fun,_time){
    if(TWHandler._popExpected){
      // console.log("has alert setting")

      for(var k in TWHandler._popExpected){
        var v=TWHandler._popExpected[k];
        if(v && v.length){
          _time=_time||0;
          _time+=1000;
          if(_time>2000){
            return _fun();
          }
          return setTimeout(function(){
            _ideTask._addRealtimeInfo(_bzMessage._log._info._checkingPopup)
            TWHandler._waitFollowingPop(_result,_fun,_time)
          },1000);
        }
      }
    }
    _fun();
  },
  _isAfterHashLoad:function(w){
    if(w.location.pathname==TWHandler._lastPageInfo._pathname && (w.location.hash || w.location.href.endsWith("#"))){
      if(w.location.hash==TWHandler._lastPageInfo._hash){
        return true;
      }else if(w.location.hash && $(w.document.body).html()!=TWHandler._lastPageInfo.html){
        return true;
      }else if(Date.now()-TWHandler._lastPageInfo.time>2000){
        return true;
      }
    }
    return false;
  },
  _getPopWinSize:function(h){
    window.moveTo(-7+screen.availLeft,0);
    var ws=BZ._userHabit.popSize[h],
        w=screen.width-window.outerWidth
    if(!ws){
      ws="height="+screen.availHeight+",top=0,";
      if(window.outerWidth>screen.width*0.7){
        ws+="left=0,width="+screen.width
      }else{
        ws+="left="+window.outerWidth+window.screenX+",width="+(w)
      }
    }else if(ws.match(/^[0-9 x#%]+$/)){
      ws=ws.split("x").map(x=>x.trim())
      if(!ws[1]){
        ws[1]=screen.height
      }
      if(ws[0].includes("%")){
        ws[0]=screen.width*(parseInt(ws[0])/100)
      }
      ws=`width=${ws[0]},height=${ws[1]},top=0,left=${w>ws[0]?window.outerWidth+window.screenX:screen.width-ws[0]}`
    }
    return ws;
  },
  _takeoverAddEventListener:function(){
    if(!EventTarget.prototype._addEventListener){
      let _fun=EventTarget.prototype.addEventListener;
      EventTarget.prototype._addEventListener = _fun
      
      EventTarget.prototype.addEventListener=function(t,f,c){
        if(this==window&&t=="beforeunload"){
          this._addEventListener(t,function(event){
            let play=localStorage.getItem("playModel")
            if(t=="beforeunload"&&play=="play"){
            }else{
              return f(event)
            }
          },c)
        }else{
          console.log("addEventListener:"+t)
          this._addEventListener(t,f,c)
        }
      }
  
    }
  },
  _chkAppReady:function(){
    if(!_ideTask._appReady){
      if(!TWHandler._chkAppReadyTimer){
        console.log("Checking app ready")
        bzComm.postToAppExtension({
          fun:"initAppData",
          scope:"BZ",
          ps:[1]
        })

        TWHandler._chkAppReadyTimer=setTimeout(()=>{
          TWHandler._chkAppReadyTimer=0
          TWHandler._chkAppReady()
        },3000)
      }
    }
  },
  //h:window size,
  _openUrl:function(_enterPointValue,_callBack,h){
    window.$project&&(window.$project.$flag="")
    if(_enterPointValue){
      _enterPointValue=_ideTask._setCurValue(_enterPointValue)
    }

    if(h===undefined&&!_ideTestManagement._getCurHost()){
      BZ._setStatus("")
      BZ._setHash("settingEnvironment")
      return alert(_bzMessage._system._error._missHost)
    }
    var ws=this._getPopWinSize(h),_infoTimer=setTimeout(()=>{
      TWHandler._chkAppReady()
    },3000);

    _ideTask._addTWChecker(_finalFun);

    if(!_IDE._alertExtensionRequest()){
      _openURL(_enterPointValue,ws);
    }else if(BZ._isAutoRunning()){
      // console.log("BZ-LOG: No extension issue and stop task!")
      _ideTask._end()
    }
  
    function _finalFun(a,b,c){
      if(_callBack){
        bzComm._log("Call back after open url")
        _callBack(a,b,c)
      }else{
        bzComm._log("Completed open url")
      }
    }

    function _openURL(_enterPointValue,ws){
      console.log("BZ-LOG: open url - "+_enterPointValue)
      if(window.$project){
        $project.$flag=""
      }
      _ideTask._appReady=0

      if(_Util._isBZTWOpened()){
        if(BZ._twInError){
          BZ._twInError=0
          BZ.TW.location.href=_enterPointValue
        }else{
          bzComm.postToAppExtension({
            fun:"reload",
            scope:"BZ",
            ps:[_enterPointValue]
          })
          bzComm._focusTW()
        }
      }else{
        _Util._openBZTW(_enterPointValue,ws);

        if(!BZ._isAutoRunning()&&_IDE._data._curTest){
          setTimeout(function(){
            _IDE._layout()
            _CtrlDriver._refreshDom($(".bz-action-list-content")[0])
          },100)
        }
      }
      _finalFun()
    }


  },
  _isSameDomain:function(_url){
    if(_url && _url.indexOf("http")!=0 && _url.includes(":/"+"/")){
      return false;
    }
    return !_url || _url.startsWith("javascript:") || (_url.indexOf("http")!=0 && _url.indexOf("/"+"/")!=0) || _url.indexOf(location.origin)==0;
  },
  _checkJQueryEvent:function(e){
    try{
      return $["_"+"data"](e,"events") || {};
    }catch(e){}
    return {};
  }
};
if(window.name=="bz-client"){
  TWHandler._init();
};
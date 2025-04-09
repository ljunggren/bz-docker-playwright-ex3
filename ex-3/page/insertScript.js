
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
                  });window.insertScript={
  _getPageRoot:function(){
    return `chrome-extension:/`+`/${bzComm.getBZId()}/`
  },
  insertJQuery:function(d,_fun){
    if(!window.jQuery || !jQuery.fn||!jQuery.fn.jquery){
      insertScript.insertJS("lib/jquery.min.v1.12.4.js",()=>{
        d&&BZ.assignShareData(d);
        extendJQuery()
        _fun&&_fun()
      })
    }else{
      _fun&&_fun()
    }
  },
  insertIDE:function(appLang,ideLang,_fun){
    if(document.body){
      insertScript.insertCss(()=>{
        insertScript.insertJS("ide/"+appLang+"/config.js",()=>{
          insertScript.insertJS("ide/"+ideLang+"/word.js",()=>{
            insertScript.insertJS("ide/main.js",()=>{
              _fun&&_fun()
            })
          })
        })
      })
    }else{
      setTimeout(function(){
        insertScript.insertIDE(appLang,ideLang,_fun)
      },100)
    }
  },
  insertCss:function(_fun){
    ["js-editor.css","main.max.css","main.icons.css"].forEach(x=>{
      var _style=document.createElement("link")
      _style.rel="stylesheet"
      _style.href=bzComm.getResourceRoot()+'/css/'+x
      document.body.appendChild(_style)
    })
    _fun()
  },
  insertJS:function(d,_fun){
    var _script=document.createElement("script")
    _script.src=insertScript._getPageRoot()+d
    _script.onload=function(){
      _fun&&_fun()
    }
    if(document.body){
      document.body.appendChild(_script)
    }else{
      setTimeout(function(){
        insertScript.insertJS(d,_fun)
      },100)
    }
  },
  exeScript:function({script,$loop,$parameter,$test,$module,$project,$action,$group,$element,funMap},_fun){
    bzComm.postToIDE({
      fun:"log",
      scope:"console",
      ps:["exe-script"]
    })
    if(eval!=_bzEval._exe){
      try{
        eval("")
      }catch(e){
        _bzEval._orgEval=eval
        eval=_bzEval._exe
      }
    }

    if($element){
      $element=$util.findDom($element)
      console.log($element)
    }
    if(funMap){
      Object.keys(funMap).forEach(k=>{
        eval(k+"="+funMap[k])
      })
    }
    try{
      let r=eval(script,{
        $element:$element,
        $project:$project,
        $module:$module,
        $test:$test,
        $action:$action,
        $loop:$loop,
        $group:$group,
        $parameter:$parameter
      })
      if(r&&r.constructor==Promise){
        r.then(_end)
      }else if(r&&r.constructor==Function){
        r(_end)
      }else{
        _end(r)
      }
    }catch(e){
      console.log(e.stack)
      Object.keys(funMap).forEach(k=>{
        eval("delete "+k)
      })
      _fun({
        _type:1,
        _msg:e.message
      })
    }

    function _end(v){
      Object.keys(funMap).forEach(k=>{
        eval("delete "+k)
      })
      _fun({
        _type:4,
        _returnValue:v
      })
    }
  }
};
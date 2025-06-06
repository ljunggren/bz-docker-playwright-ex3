class BZTab{
  appIFrames={}
  constructor(t,_inBuilding){
    if(t.url.match(/(localhost|boozang\.com)\/extension/)){
      this.ide=1
    }else{
      this.app=0
      let v=t.url.match(/^(.+)\/empty\.html\?bzIde=([0-9]+)\#/)
      if(v){
        this.app=1
        this.myIde=parseInt(v[2])
        _tabManagement._getTabById(this.myIde,(v)=>{
          if(v){
            v.myApp=t.tabId||t.id
            this.appIFrames=v.appIFrames
          }
        })
      }else if(!_inBuilding){
        return
      }
    }
    this.url=t.url

    this.id=t.tabId||t.id
    this.windowId=t.windowId
    let o=this
    if(!t.windowId){
      chrome.tabs.query({}, (tabs) => {
        tabs.find(x=>{
          if(x.id==o.id){
            o.windowId=x.windowId
            return 1
          }
        })
      })
    }
  }

  forEachIframe(fun){
    _forEachIframe(this.appIFrames)
    function _forEachIframe(d){
      for(let k in d){
        if(d[k]&&d[k].constructor==Object){
          fun(d[k],parseInt(k))
          _forEachIframe(d[k])
        }
      }
    }
  }

  findIframe(fun){
    return _findIframe(this.appIFrames)
    function _findIframe(d){
      for(let k in d){
        if(d[k]&&d[k].constructor==Object){
          k=parseInt(k)
          if(fun(d[k],k)){
            return {v:d[k],k:k}
          }
          let r=_findIframe(d[k])
          if(r){
            return r
          }
        }
      }
    }
  }

  getIframeById(id){
    let r=this.findIframe((v,k)=>k==id)
    return r&&r.v
  }

  getIframeIds(){
    let r=[]
    this.forEachIframe((v,k)=>{
      r.push(k)
    })
    return r
  }

  _getParentFrame(f){
    return this.findIframe((v,k)=>v[f])
  }
}
const _tabManagement={
  _map:{},
  init:function(){
    chrome.storage.local.clear()
    chrome.tabs.onRemoved.addListener((t, removeInfo) => {
      _tabManagement._loadData(function(){
        let td=t.tabId||t
        let a=_tabManagement._map[td]
        if(!a){
          return
        }
        let i=_tabManagement._map[a.myIde]
        if(i){
          if(t.frameId){
            console.log("remove iframe",t.frameId)
            let p=i.getIframeById(t.parentFrameId)
            if(p){
              cf=p[t.frameId]
              delete p[t.frameId]
              Object.values(p).forEach(v=>{
                delete v.idx
              })
            }
            a.appIFrames=i.appIFrames
            _tabManagement._assignId({
              appIFrames:i.appIFrames
            },a.id)
          }else if(i.myApp==td){
            delete _tabManagement._map[td]
            i.myApp=""
            i.appIFrames={}
          }
          _tabManagement._assignId({
            app:i.myApp,
            appIFrames:i.appIFrames
          },i.id)
        }else if(!t.frameId){
          delete _tabManagement._map[td]
          _closeApp(a)
        }
      })
    });

    chrome.webNavigation.onErrorOccurred.addListener((t) => {
      console.log("error",t)
      // _tabManagement._loadData(function(){
      //   let td=t.tabId||t
      //   let a=_tabManagement._map[td]
      //   if(!a){
      //     return
      //   }
      //   let i=_tabManagement._map[a.myIde]
      //   if(i){
      //     bgComm.postMessageToIDE(a.myIde,{
      //       scope:"BZ",
      //       fun:"infoLoadPageError",
      //       ps:[t]
      //     })
      //   }
      // })
    })

    chrome.webNavigation.onCommitted.addListener((t) => {
      _tabManagement._loadData(function(){
        _loadTab(t)
      })
    });


    function _loadTab(t){
      let a=_tabManagement._map[t.tabId||t.id]||new BZTab(t),
          f=t.frameId,
          pf=t.parentFrameId;

      if(!a.url){
        return
      }else{
        _closeSameIDE(a)
      }
      _tabManagement._map[a.id]=a
      a.url=f?a.url:t.url
      if(a.ide){
        if(t.frameId||t.documentLifecycle=="prerender"){
          return
        }else if(!t.url.includes("token=")&&t.transitionType!="link"&&t.transitionType!="reload"){
          delete _tabManagement._map[a.id]

          chrome.scripting.executeScript({
            target: { tabId: parseInt(a.id) },
            function: () => {
              _doIt(Date.now())
              function _doIt(t){
                if(window.bzComm){
                  bzComm.popIDE()
                }else{
                  if(Date.now()-t<3000){
                    setTimeout(()=>{
                      _doIt(t)
                    },1)
                  }
                }
              }
            }
          },(r)=>{
            _sendResponse&&_sendResponse(r);
          });

          return
        }
        _closeApp(a)
        _tabManagement._assignId({ide:a.id,appIFrames:a.appIFrames},a.id)
        delete a.myApp
        _tabManagement._store()
      }else if(a.app){
        let i=_tabManagement._map[a.myIde]
        if(i){

          let fs=i.appIFrames
          if(!f){
            fs[0]={idx:0}
            bgComm.postMessageToIDE(a.myIde,{
              fun:"infoLoadingNewPage",
              scope:"BZ"
            })
          }else{
            console.log("add iframe",f)
            let p=i.getIframeById(pf)
            if(p){
              p[f]={
                url:t.url,
                // idx:Object.keys(p).filter(x=>parseInt(x)).length,
              }
              if(t.url!="about:blank"){
                bgComm.postMessageToIDE(a.myIde,{
                  fun:"infoLoadingNewPage",
                  scope:"BZ"
                })      
              }
              // Object.values(p).forEach(v=>{
              //   delete v.idx
              // })
            }
          }
          a.appIFrames=fs
          _tabManagement._assignId({
            app:a.id,
            appIFrames:fs
          },i.id)
          let d={
            "bz-id":chrome.runtime.id,
            app:a.id,
            ide:i.id,
            appIFrames:fs
          };
          _tabManagement._assignId(d,a.id)
          if(f){
            _tabManagement._initIframe(a,f,d)
          }

          _tabManagement._store()
        }
      }
    }

    function _closeSameIDE(a){
      let v=a.url.match(/\/\/([^\/]+\.boozang\.com|location)\/extension\?/)
      if(v){
        Object.values(_tabManagement._map).forEach(x=>{
          if(a!=x&&x.url&&x.url.includes(v[0])){
            debugger
            bgComm.postToTab({
              toPage:"bzIde",
              toId:x.id,
              fun:"close",
              scope:"window",
              toIFrameId:0
            })
          }
        })
      }
    }

    function _closeApp(a){
      if(a.myApp){
        bgComm.postToTab({
          toPage:"bzApp",
          toId:a.myApp,
          fun:"close",
          scope:"window",
          toIFrameId:0
        })
      }
    }

  },
  _initIframe:function(t,f,d,_fun){
    let ti=parseInt(t.myApp||t.id)
    f=parseInt(f)
    
    d=d||{
      "bz-id":chrome.runtime.id,
      app:t.myApp||t.id,
      ide:t.myIde||t.id,
      appIFrames:t.appIFrames,
      iframeId:f||0
    };

    chrome.scripting.executeScript({
      target: { tabId: ti,frameIds:[f] },
      function: (d) => {
        _doIt(d,Date.now())
        function _doIt(d,t){
          if(window.bzComm){
            bzComm.init(d)
          }else{
            if(Date.now()-t<3000){
              setTimeout(()=>{
                _doIt(d,t)
              },1)
            }
          }
        }
      },
      args: [d]
    },(r)=>{});

    chrome.scripting.executeScript({
      target: { tabId: ti,frameIds:[f] },
      function: (f) => {
        window.curBZIframeId=f
      },
      args: [f]
    });
    setTimeout(()=>{
      _fun&&_fun()
    },100)
  },
  _tabReady:function(tId,iframeId){
    _tabManagement._getTabById(tId,function(t){
      if(t){
        let f=t.getIframeById(iframeId)
        if(f){
          _tabManagement._store()
          _tabManagement._buildIFrameMap(t)
        }
      }
    })
  },
  _updateIframeIdx:function(tId,iframeId,idx){
    _tabManagement._getTabById(tId,function(t){
      if(t){
        let f=t.getIframeById(iframeId)
        if(f){
          f.idx=idx
          _tabManagement._getTabById(t.myIde,function(v){
            v.appIFrames=t.appIFrames
            _tabManagement._store()
            _tabManagement._reportReady(t)
          })
        }
      }
    })
  },
  _reportReady:function(t){
    console.log("report ready",t)
    t=t||Object.values(_tabManagement._map).find(x=>x.app)
    clearTimeout(t._reInitIframeTimer)
    t._reInitIframeTimer=setTimeout(()=>{
      bgComm.postMessageToAppExtension(t.myApp||t.id,{
        fun:"updateAppIFrameMap",
        scope:"bzComm",
        toIFrameId:0,
        ps:[t.appIFrames,1]
      })
      bgComm.postMessageToIDE(t.myIde||t.id,{
        fun:"updateAppIFrameMap",
        scope:"bzComm",
        toIFrameId:0,
        ps:[t.appIFrames]
      })
      t._reInitIframeTimer=setTimeout(()=>{
        bgComm.postMessageToAppExtension(t.id,{
          fun:"initAppData",
          scope:"BZ"
        })
      },100)
    },100)
  },
  _buildIFrameMap:function(t){
    clearTimeout(t._buildIFrameTimer)
    t._buildIFrameTimer=setTimeout(()=>{
      bgComm.postMessageToAppExtension(t.id,{
        fun:"buildIFrameMap",
        scope:"iframeManagement",
        toIFrameId:0,
        ps:[]
      })
    },100)
  },
  _buildMap:function(fun){
    if(Object.keys(_tabManagement._map).length){
      return fun&&fun()
    }
    _tabManagement._map={"":{}}
    chrome.tabs.query({}, (tabs) => {
      tabs=tabs.map(x=>new BZTab(x,1))

      tabs.forEach(t=>{
        _tabManagement._map[t.id]=t
      })
      _loadTabs(tabs)
    })

    function _loadTabs(ts){
      let t=ts.shift()
      if(t){
        if(t.ide){
          _tabManagement._askBZInfo(t,function(){
            let id=_tabManagement._getIdeAppId(t)
            if(id){
              let a=_tabManagement._map[id]
              if(a){
                a.myIde=t.id
                a.app=1
                a.appIFrames=t.appIFrames
              }
            }
            _loadTabs(ts)
          })
        }else{
          _loadTabs(ts)
        }
      }else{
        Object.keys(_tabManagement._map).forEach(k=>{
          let t=_tabManagement._map[k]
          if(k&&t&&!t.app&&!t.ide){
            delete _tabManagement._map[k]
          }
        })
        fun&&fun()
      }
    }
  },
  _getTabById: function(id,fun){
    _tabManagement._buildMap(function(){
      fun(_tabManagement._map[id])
    })
  },
  _getParentIFrameId:function(id,iframeId,fun){
    _tabManagement._getTabById(id,function(v){
      v.appIFrames=v.appIFrames||{}
      v=_findParent(v.appIFrames)
      fun(v)
      function _findParent(a){
        for(let k in a){
          if(a[k]&&a[k].constructor==Object){
            if(a[k][iframeId]){
              return k
            }
            let r=_findParent(a[k])
            if(r){
              return r
            }
          }
        }
      }
    })
  },
  _assignId:function(d,id){
    chrome.scripting.executeScript({
      target: { tabId: id},
      function: (d) => {
        _doIt(d,Date.now())
        function _doIt(d,t){
          if(window.bzComm){
            bzComm.assignId(d)
          }else{
            if(Date.now()-t<3000){
              setTimeout(()=>{
                _doIt(d,t)
              },1)
            }
          }
        }
      },
      args: [d]
    },(r)=>{});

  },
  _askBZInfo:function(t,_fun){
    bgComm.postMessageToIDE(t.id,{
      scope:"bzComm",
      fun:"getIds",
      return:function(v){
        t.myApp=v.app
        t.appIFrames=v.appIFrames

        _fun()
      }
    })
  },
  _store:function(){
    chrome.storage.local.set({ "bz-tabs": _tabManagement._map });
  },
  _loadData:function(fun){
    if(!Object.keys(_tabManagement._map).length){
      chrome.storage.local.get("bz-tabs",function(d){
        if(d&&d["bz-tabs"]){
          _tabManagement._map=d["bz-tabs"]
          console.log("tabs loaded",_tabManagement._map)
          fun()
        }else{
          _tabManagement._buildMap(fun)
        }
      })
    }else{
      fun()
    }
  },
  _getIdeAppId:function(ide){
    if(ide.myApp){
      return ide.myApp
    }
    let o=Object.values(_tabManagement._map).find(x=>x.myIde==ide.id)
    if(o){
      ide.myApp=o.id
      return o.id
    }
  },
  _getAppIdeId:function(app){
    if(app.myIde){
      return app.myIde
    }
    let o=Object.values(_tabManagement._map).find(x=>x.myApp==app.id)
    if(o){
      app.myIde=o.id
      return o.id
    }

  }
}
_tabManagement.init()
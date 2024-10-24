var _config={
  _modules:{
    //The order is match to roles and words.common._modules
    _users:0,
    _companies:1,
    _departments:2,
    _projects:3,
    _versions:4,
    _modules:5,
    _tests:6,
    _trs:7,
    _system:8,
    _requirements:9
  },
  _permissionActions:{
    _readEntity:1,
    _readList:2,
    _add:4,
    _update:8,
    _delete:16,
    _sysManage:32,
    _selfCtrl:64 //If user has the permission, he always be able to handle (modify, delete) the created resources by himself.
  },
  _roles:{
    sysAdmin:{
      _defaultPermissionMap:{
        _users:1|2|4|16|32,
        _companies:1|2|4|16|32,
        _departments:0,
        _projects:0,
        _versions:0,
        _modules:0,
        _tests:0,
        _trs:0,
        _system:1|2|4|8|16|32,
        _requirements:0
      },
      _disableMap:{
        _users:8|64,
        _companies:8|64,
        _departments:1|2|4|8|16|32|64,
        _projects:1|2|4|8|16|32|64,
        _versions:1|2|4|8|16|32|64,
        _modules:1|2|4|8|16|32|64,
        _tests:1|2|4|8|16|32|64,
        _trs:1|2|4|8|16|32|64,
        _system:64,
        _requirements:1|2|4|8|16|32|64
      }
    },
    owner:{
      _defaultPermissionMap:{
        _users:1|2|32,
        _companies:1|8,
        _departments:1|2|4|8|16|32,
        _projects:1|2|4|8|16|32,
        _versions:1|2|4|8|16|32,
        _modules:1|2|4|8|16|32,
        _tests:1|2|4|8|16|32,
        _trs:1|2|4|8|16|32,
        _system:0,
        _requirements:1|2|4|8|16|32
      },
      _disableMap:{
        _users:4|8|16|64,
        _companies:2|4|16|32|64,
        _departments:64,
        _projects:64,
        _versions:0,
        _modules:0,
        _tests:0,
        _trs:0,
        _system:1|2|4|8|16|32|64,
        _requirements:0
      }
    },
    admin:{ //only for company
      _defaultPermissionMap:{
        _users:1|2|4|32,
        _companies:1|8,
        _departments:1|2|4|8|32,
        _projects:1|2|4|8|32,
        _versions:1|2|4|8|32,
        _modules:1|2|32,
        _tests:1|2,
        _trs:1|2,
        _system:0,
        _requirements:1|2|32
      },
      _disableMap:{
        _users:8|16|64,
        _companies:2|4|16|32|64,
        _departments:64,
        _projects:64,
        _versions:0,
        _modules:0,
        _tests:0,
        _trs:0,
        _system:1|2|4|8|16|32|64,
        _requirements:0
      }
    },
    manager:{
      _defaultPermissionMap:{
        _users:1|2,
        _companies:1,
        _departments:1|2|8,
        _projects:1|2|4|8,
        _versions:1|2|4|8,
        _modules:1|2|32,
        _tests:1|2,
        _trs:1|2|32,
        _system:0,
        _requirements:1|2|16|32
      },
      _disableMap:{
        _users:4|8|16|32|64,
        _companies:2|4|16|32|64,
        _departments:64,
        _projects:64,
        _versions:0,
        _modules:0,
        _tests:0,
        _trs:0,
        _system:1|2|4|8|16|32|64,
        _requirements:0
      }
    },
    teamLeader:{
      _defaultPermissionMap:{
        _users:1|2,
        _companies:1,
        _departments:1|2,
        _projects:1|2,
        _versions:1|2,
        _modules:1|2|32,
        _tests:1|2|4|8|16,
        _trs:1|2|4|8|16|32,
        _system:0,
        _requirements:1|2|4|8|16|32
      },
      _disableMap:{
        _users:4|8|16|32|64,
        _companies:2|4|16|32|64,
        _departments:64,
        _projects:4|16|64,
        _versions:0,
        _modules:0,
        _tests:0,
        _trs:0,
        _system:1|2|4|8|16|32|64,
        _requirements:0
      }
    },
    architect:{
      _defaultPermissionMap:{
        _users:1|2,
        _companies:1,
        _departments:1|2,
        _projects:1|2,
        _versions:1|2|4|8,
        _modules:1|2|4|8|16|32,
        _tests:1|2|4|8|16,
        _trs:1|2|4|8,
        _system:0,
        _requirements:1|2|4|8|16|32
      },
      _disableMap:{
        _users:4|8|16|32|64,
        _companies:2|4|8|16|32|64,
        _departments:4|8|16|32|64,
        _projects:4|16|64,
        _versions:0,
        _modules:0,
        _tests:0,
        _trs:0,
        _system:1|2|4|8|16|32|64,
        _requirements:0
      }
    },
    qa:{
      _defaultPermissionMap:{
        _users:1|2,
        _companies:1,
        _departments:1|2,
        _projects:1|2,
        _versions:1|2,
        _modules:1|2|32,
        _tests:1|2|4|8|16,
        _trs:1|2|4|8|16|32,
        _system:0,
        _requirements:1|2
      },
      _disableMap:{
        _users:4|8|16|32|64,
        _companies:2|4|8|16|32|64,
        _departments:4|8|16|32|64,
        _projects:4|16|64,
        _versions:0,
        _modules:0,
        _tests:0,
        _trs:0,
        _system:1|2|4|8|16|32|64,
        _requirements:0
      }
    },
    developer:{
      _defaultPermissionMap:{
        _users:1|2,
        _companies:1,
        _departments:1|2,
        _projects:1|2,
        _versions:1|2,
        _modules:1|2|32,
        _tests:1|2|4|8|16,
        _trs:1|2|4|8,
        _system:0,
        _requirements:1|2
      },
      _disableMap:{
        _users:4|8|16|32|64,
        _companies:2|4|8|16|32|64,
        _departments:4|8|16|32|64,
        _projects:4|16|64,
        _versions:0,
        _modules:0,
        _tests:0,
        _trs:0,
        _system:1|2|4|8|16|32|64,
        _requirements:0
      }
    },
    ci:{
      _defaultPermissionMap:{
        _users:1|2,
        _companies:1,
        _departments:1|2,
        _projects:1|2,
        _versions:1|2,
        _modules:1|2,
        _tests:1|2,
        _trs:1|2,
        _system:0,
        _requirements:1|2
      },
      _disableMap:{
        _users:4|8|16|32|64,
        _companies:2|4|8|16|32|64,
        _departments:4|8|16|32|64,
        _projects:4|8|16|32|64,
        _versions:0,
        _modules:0,
        _tests:0,
        _trs:0,
        _system:1|2|4|8|16|32|64,
        _requirements:4|8|16|32|64
      }
    },
    viewer:{
      _defaultPermissionMap:{
        _users:1|2,
        _companies:1,
        _departments:1|2,
        _projects:1|2,
        _versions:1|2,
        _modules:1|2,
        _tests:1|2,
        _trs:1|2,
        _system:0,
        _requirements:1|2
      },
      _disableMap:{
        _users:4|8|16|32|64,
        _companies:2|4|8|16|32|64,
        _departments:4|8|16|32|64,
        _projects:4|8|16|32|64,
        _versions:0,
        _modules:0,
        _tests:0,
        _trs:0,
        _system:1|2|4|8|16|32|64,
        _requirements:4|8|16|32|64
      }
    }
  },
  _status:{
    prepare:"prepare",
    active:"active",
    inactive:"inactive",
    archive:"archive"
  },
  _testType:{
    cell:"cell",
    bug:"bug",
    com:"com",
    unit:"unit",
    api:"api",
    "int":"int",
    scenario:"scenario"
  },
  _testSubType:{
    ctrl:"Control",
    operation:"Operation",
    validation:"Validation"
  },
  _businessType:{
    module:[null,"","auth","feature","setting","account","tools","data","group","summary"],
    test:[null,"","scenario","add","attach","edit","delete","archive","update-status","execute","other"]
  },
  _trStatus:{
    created:0,
    assigned:1,
    answered:2,
    rejected:3,
    noReproduced:4,
    noFixed:5,
    pending:6,
    pendingByClient:7,
    fixed:8,
    closed:9,
    archived:10
  },
  _requirementStatus:{
    created:0,
    assigned:1,
    working:2,
    rejected:3,
    pending:4,
    pendingByClient:5,
    completed:6,
    closed:7,
    archived:8
  }
};

const _projectSetting={
  dataVersion:"2.2",
  aiSwitchAuth:"",
  language:"",
  dateFormat:"YYYY-MM-DD",
  ymdParser:"on",
  mdParser:"mdy",
  MMM:"",
  MMMM:"",
  environments:[
    {name:"Default",items:[{name:"App",host:"",defaultRoot:""}]}
  ],
  //Mapping to environment items
  authList:[{inAuth:""}],
  aliasMap:{},
  tagFilterMap:{},
  advanced:[{
    popWindowStyle:"",
    expectReactionTime:3000,
    stepDelay:250,
    performanceReminder:2000,
    onPoorPerformance:"",
    maxRequestTime:60000,
    loadPageTime:60000,
  }],
  windowOptions:["100%","70%","60%","50%","1024","800","768 x 1024#1","375 x 812"],
  content: {
    defFailResponse:"..",
    ignoreRequest:"",
    whiteRequest:"*",
    ignorePopValidation:"",
    ignoreClasses:"ng-, active, checked, change, dirty, modify, modified, update, highlight, over, hvr, hover, cursor, show, focus, pressed, pushed, select, selected, open, desktop, mobile, col-, row-, pull-, form-control",
    contentAttribute:"title|label|placeholder|alt|name",
    clickableElements:"A,BUTTON,INPUT[type=submit],INPUT[type=reset],INPUT[type=button],INPUT[type=image]",
    loadingElement:"",
    hideDataName:"password",
    aiControlAction:"",
    aiControlActionRetry:"",
    completeActionOnRender:"",
    hiddenAsUnexist:"",
    disableAutoOneAction:"",
    ignoreRenderElement:"",
    priorityElementItems:"",
    aiApp:{
      menu:"",
      requiredField:"",
      customize:[""],
      formTab:[""]
    }
  },
  supportMSCooperationTest:"",
  appLanguages:[""],
  appWords:[],
  customizeInputs:[],
  objectLib:{
    element:[
      {key:"button",css:"BUTTON,INPUT[type=submit],INPUT[type=reset],INPUT[type=button],INPUT[type=image]"},
      {key:"link",css:"A",hide:1},
      {key:"input",css:"INPUT:not([type=image],[type=button],[type=submit],[type=reset],[type=hidden]),SELECT,TEXTAREA,[contenteditable=true]",input:1},
      {key:"textarea",css:"TEXTAREA,DIV[contenteditable=true],BODY[contenteditable=true]",hide:1,input:1},
      {key:"dropdownList",css:"SELECT",hide:1,input:1},
      {key:"checkbox",css:"INPUT[type=checkbox]",hide:1,input:1},
      {key:"radio",css:"INPUT[type=radio]",hide:1,input:1},
      {key:"file",css:"INPUT[type=file]",hide:1,input:1},
      {key:"mainHeading",css:"H1,H2,H3,.title,.caption,.subject,.modal-header"},
      {key:"subHeading",css:"H4,H5,H6"},
      {key:"panel",css:""}
    ],
    message:[
      {key:"missData",css:""},
      {key:"dataType",css:""},
      {key:"tooLong",css:""},
      {key:"tooShort",css:""},
      {key:"dataFormat",css:""},
      {key:"dataLocked",css:""},
      {key:"noResponse",css:""}
    ],
    component:[
      {key:"dropdownInput",items:[],input:1},
      {key:"rangeSlider",items:[],input:1},
      {key:"checkbox",items:[]},
      {key:"radio",items:[]},
    ],
    operation:[
      {key: "add",css: ""},
      {key: "edit",css: ""},
      {key: "delete",css: ""},
      {key: "attach",css: ""},
      {key: "archive",css: ""},
      {key: "view",css: ""},
      {key: "report",css: ""},
      {key: "enter",css: ""},
      {key: "preview",css: ""},
      {key: "submit",css: ""},
      {key: "confirm",css: ""},
      {key: "execute",css: ""},
      {key: "close",css: ""},
      {key: "cancel",css: ""},
      {key: "reset",css: ""},
      {key: "search",css: ""},
      {key: "filter",css: ""},
      {key: "next",css: ""},
      {key: "previous",css: ""}
    ],
    status:[
      {key:"active",css:".active"},
      {key:"highlight",css:".highlight"},
      {key:"required",css:".required"},
      {key:"error",css:".error"},
      {key:"warning",css:".warning"},
      {key:"success",css:".success"},
      {key:"waiting",css:""}
    ]
  },
  defaultData:[],
  service:{
    feature:{},
    trReport:{},
    screenshot:{},
    email:{},
    postReport:{format:"jk",target:"console"}
  },
  cooperation:{
    groups:[],
    scopes:[]
  }
}

const _personalSetting={
  curEnvironment:0,
  timeFormat: "hh-mi-ss",
  noAlertAIRepire:"",
  ignoreALFErr:"on",
  autoDataBind:"on",
  disableShadowRootRecording:"",
  autoMergeToSetValue:"on",
  acceptMonitor:"",
  debugOneAction:"",
  noAutoFocus:"",
  useTmpData:"no",
  speakOnRecording:"",
  infoRunningTest:"on",
  disableScreenshot:"",
  elementFilters:[{filter:"[data-bz]",chk:"on",bz:1}],
  record: {
    // autoAIValidation:"",
    // ignoreAIValidateArea:""
  },
  personalData:[],
  bookmarkList:[],
  subscriptions:[],
  monitorLog:{
    filter:"",
    attachScreenshot:""
  },
  autoSave:"",
  autoDownloadReport:{
    report:"",pfd:"",fs:"",fd:""
  },
  defaultRole:[],
  showRequestDetails:""
};
//Build _defaultPermissions for each role
(function(){
  for(var k in _config._roles){
    var v=_config._roles[k];
    v._name=k;
    var ms=_config._modules;
    v._defaultPermissions=[];
    v.disablePermissions=[];
    for(var kk in ms){
      v._defaultPermissions[ms[kk]]=v._defaultPermissionMap[kk];
      v.disablePermissions[ms[kk]]=v._disableMap[kk];
    }
    
  };
})();

try{
  exports._enum =_config;
  exports._projectSetting=_projectSetting;
}catch(e){};
var _attributeMap=[
  {key: "id",sys:1,regex:"/[0-9a-fA-F]{6,32}/",valid:".+",value:"id|key"},
  {key: "name",sys:1,regex:"/{module}-{timestamp}/",value:"name|surname|username"},
  {key: "password",sys:1,regex:"/[a-z]{2}[A-Z]{2}[0-9]{2}[$@#%^&]{2}/",valid:".+",value:"password|pwd"},
  {key: "serialNumber",sys:1,regex:"/[A-Z0-9]{1,5}((-|[.]|)[A-Z0-9]{1,5}){1,3}/",valid:"^\\d*$",value:"serial number"},
  {key: "number",sys:1,regex:"/{random:1-100}/",valid:"^\\d*$",value:"num|number|no|from|to"},
  {key: "time",sys:1,regex:"/[0-2][0-9]:[0-5][0-9]/",value:"time"},
  {key: "date",sys:1,regex:"/20[0-9]{2}-(0[1-9]|10|11|12)-([0-2][0-9]|30|31)/",value:"date"},
  {key: "week",sys:1,regex:"/MON|TUE|WED|THU|FRI|SAT|SUN/",value:"day"},
  {key: "price",sys:1,regex:"/{random:0.01-1000}/",valid:"^[0-9]+[.][0-9]{2}$",value:"price"},
  {key: "decimal",sys:1,regex:"/{random:1.00-100}/",valid:"^[0-9]+[.][0-9]{2}$",value:"decimal|value|percentage|rate"},
  {key: "text",sys:1,regex:"/[a-z0-9 ]{10,30}/",valid:".*",value:"text|comment|note|description"},
  {key: "email",sys:1,regex:"/[a-z]{3,10}@bzmail[.]com/",valid:"^[a-z0-9._+-]+@[a-z0-9]+\\.[a-z0-9]+$",value:"email|e-mail"},
  {key: "phone",sys:1,regex:"/[1-9][0-9]{8}/",valid:"^[1-9][0-9 -]{7,15}$",value:"phone|cell|mobile|fax"},
  {key: "address",sys:1,regex:"/[1-9][0-9]{2,4} [A-Z][aeiou][a-z]{2}[aeiou][a-z]{2}/",valid:".*",value:"street|address|address 1|address 2|line 1|line 2|city|state|country"},
  {key: "postcode",sys:1,regex:"/[A-Z][0-9][A-Z] [0-9][A-Z][0-9]/",value:"post code|postcode|zip"},
  {key: "file",sys:1,regex:"/example\.(jpg|docx|pdf|gif|bat|css|html|js|json|odt|ogv|png|rtf|sh|txt|zip)/",value:"file|image|img|picture|photo|document|doc|archive|zip"},
  {key: "role",sys:1,regex:"/administrator|user|manager|customer|client/",value:"role|position"},
  {key: "link",sys:1,regex:"/(http|https):\\/\\/[a-z]{3,8}[.][a-z]{3,8}[.](com|org)/",valid:"^(http|https):\\/\\/.+$",value:"link|url"}
];

var _ergodicMap=[
  {
    key:"Name",
    success:"Tom",
    error:[
      {value:"",message:"This is a request field"},
      {value:"234",message:"The format is not correct"}
    ]
  },
  {
    key:"Mobile",
    success:"1381542698",
    error:[
      {value:"",message:"This is a request field"},
      {value:"ttttt",message:"The format is not correct"}
    ]
  },
  {
    key:"Phone",
    success:"01064332657",
    error:[
      {value:"",message:"This is a request field"},
      {value:"hhhhh",message:"The format is not correct"}
    ]
  },
  {
    key:"Email",
    success:"abc@qq.com",
    error:[
      {value:"",message:"This is a request field"},
      {value:"abc#qq.com",message:"The format is not correct"}
    ]
  },
  {
    key:"Address",
    success:"3232 asdf, asdsdf",
    error:[
      {value:"",message:"This is a request field"}
    ]
  },
  {
    key:"ZIP",
    success:"H1A 2S3",
    error:[
      {value:"",message:"This is a request field"},
      {value:"rrr",message:"The format is not correct"}
    ]
  },
  {
    key:"Price",
    success:"26.88",
    error:[
      {value:"",message:"This is a request field"},
      {value:"xyz",message:"The format is not correct"}
    ]
  },
  {
    key:"Quantity",
    success:"5",
    error:[
      {value:"",message:"This is a request field"},
      {value:"abc",message:"The format is not correct"}
    ]
  }
]

var _dictionaryConfig={
  ignore:"from|about|up|in|on|at|over|under|below|above|of|off|for|with|to"+"|I|my|me|myself|mine|he|she|his|her|you|your|yours|yourself|self|we|us|our|ours|they|their|theirself|theirselves|it|its|this|that|these|those|which|here|there|where|what|how|when"+"|be|is|are|was|were|do|does|did|will|would|may|maybe|should|can|could|able|dair|must|need|isn't|doesn't|didn't|cannot"+"|the|a|an",
  operation:[
    {key: "add",sys:1,value:"add|new|create"},
    {key: "edit",sys:1,value:"edit|modify|update|set"},
    {key: "delete",sys:1,value:"delete|remove|quit|del|clean"},
    {key: "attach",sys:1,value:"attach|attachment"},
    {key: "archive",sys:1,value:"archive"},
    {key: "view",sys:1,value:"details|view|review"},
    {key: "report",sys:1,value:"report|list"},
    {key: "enter",sys:1,value:"$module"},
    {key: "validate",sys:1,value:"validate|check"},
    {key: "preview",sys:1,value:"preview"},
    {key: "submit",sys:1,value:"submit|save|store|complete|done|post|send"},
    {key: "execute",sys:1,value:"go|run|start|execute|exe|play"},
    {key: "confirm",sys:1,value:"yes|ok|confirm"},
    {key: "close",sys:1,value:"close|end"},
    {key: "cancel",sys:1,value:"cancel|no"},
    {key: "reset",sys:1,value:"reset"},
    {key: "search",sys:1,value:"search|find|query|looking for"},
    {key: "filter",sys:1,value:"filter"},
    {key: "next",sys:1,value:"next"},
    {key: "previous",sys:1,value:"previous|prev"}
  ],
  fun:[
    {key: "home",sys:1,value:"Home"},
    {key: "sign-out",sys:1,value:"Sign out|logout|log out"},
    {key: "sign-in",sys:1,value:"Sign in|login|log in"},
    {key: "has-sign",sys:1,value:"Set sign-in status to"},
    {key: "sign-out-api",sys:1,value:"Sign out - API"},
    {key: "sign-in-api",sys:1,value:"Sign in - API"},
    {key: "sign-up",sys:1,value:"Sign up|register|create account"},
    {key: "token",sys:1,value:"Retrieve API Token"},
    {key: "sign-in-link",sys:1,value:"I am <role>"},
    {key: "forgot-password",sys:1,value:"forgot password"},
    {key: "change-password",sys:1,value:"change password"},
    {key: "upload",sys: 1,value:"upload"},
    {key: "download",sys: 1,value:"download"},
    {key: "export",sys: 1,value:"export"},
    {key: "import",sys: 1,value:"import"}
  ],
  info:[
    {key: "success",sys:1,value:"success|completed|closed|done|passed|pass|saved|stored|successful|succeed"},
    {key: "fail",sys:1,value:"fail|failed"},
    {key: "error",sys:1,value:"error"},
    {key: "info",sys:1,value:"information|info"},
    {key: "warning",sys:1,value:"warning"},
    {key: "disabled",sys:1,value:"disabled|disable"},
    {key: "enabled",sys:1,value:"enabled|enable"},
    {key: "active",sys:1,value:"active|activate|highlight"},
    {key: "locked",sys:1,value:"locked|lock"},
    {key: "unlocked",sys:1,value:"unlocked"},
    {key: "updated",sys:1,value:"updated|modified|changed"},
    {key: "created",sys:1,value:"created"},
    {key: "deleted",sys:1,value:"deleted|removed|cleaned|cleared"}
  ]
};

var _scenarioSentences={
  auth:"Set sign-in status to <role>",
  given:"#test-description/#test-name： #parameter-list",
  when:"#test-description/#test-name： #parameter-list",
  then:"#test-description/#test-name： #parameter-list",
  and:"#test-description/#test-name： #parameter-list",
  reverse:"Failed on #sentence"
};
/*
var _scenarioSentences={
  auth:"I am <role>",
  given:"I have one #module： #parameter-list",
  when:"#test-description/#test-name (#module)： #parameter-list",
  then:"Validate the #module： #parameter-list",
  reverse:"Failed on #sentence"
};
*/
try{
  exports._dictionaryConfig =_dictionaryConfig;  
  exports._attributeMap=_attributeMap;
  exports._scenarioSentences=_scenarioSentences;
}catch(e){};var sysVersion='1';
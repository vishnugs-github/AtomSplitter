'use strict';

var utilService = angular.module('myApp.utilServices', []);

utilService.value('version', '0.1');

utilService.factory('Constants',['$log',function($log){
	// env
	var env = "qa";
	//var env = "dev";
	// pubnub key
	var publish_key = 'pub-c-d3ac13ed-c7c1-4998-ab20-1b35279e2537';
    var subscribe_key = 'sub-c-2786f95e-30bc-11e3-8450-02ee2ddab7fe';
    //channels
	var analyticsChannel = "analyticsData";
	var chatChannel = "chat";	
	var msgTypeChatClose = 99; // Clinet closes window
	var msgTypeChat = 1; // Chat
	var msgTypePush = 21; // Push
	//session key
	var session_key_userProfile = "userProfile";
	var session_key_ruleProfile = "ruleProfile";
	//other
	var seperator = '_';
	// error message
	var maxWindowLimit = {id: 1 , msg:"Reached max chat window limit of : "};
	// device names
	var androidDevice = "Android",
		iOSDevice = "iOS",
		winDevice = "IEMobile";		
	var desktopDevice = "Desktop";
	//device img url
	var urlWindows = "img/icons/desktop.png",
		urlAndroid ="img/icons/android.png" ,
		urlWinMobile="img/icons/metro.png" ,
		urlIOs = "img/icons/ios.png";
	// Rule Column Name
	var ruleColName = "Rule Name";
	return{	
		PUB_KEY:publish_key,
		SUB_KEY:subscribe_key,		
		PUBNUB_ANALYTICS_CHANNEL:analyticsChannel,
		PUBNUB_CHAT_CHANNEL: chatChannel,
		SEPERATOR: seperator,
		SESS_KEY_USER_PROFILE:session_key_userProfile,
		SESS_KEY_RULE_PROFILE:session_key_ruleProfile,
		MSG_TYP_CHAT_CLOSE:msgTypeChatClose,
		MSG_TYP_CHAT:msgTypeChat,
		MSG_TYP_PUSH : msgTypePush,
		ERR_MSG_MAX_WINDOW:maxWindowLimit,
		ANDROID_DEVICE:androidDevice,
		I_OS_DEVICE:iOSDevice,	
		WIN_DEVICE : winDevice,
		DESKTOP:desktopDevice,
		URL_WIN:urlWindows,
		URL_ANDROID:urlAndroid,
		URL_IOS:urlIOs,
		URL_WINMOB:urlWinMobile,
		ENV:env,
		RULE_COL_NAME:ruleColName
      };
}]);

utilService.factory('SessionManager',['$log','Constants','RuleData','AnalyticsData',function($log,Constants,RuleData,AnalyticsData){
	$log.info("inside Sessionmanager");
	return{	
		clearSession:function(key){
			$log.info("inside Sessionmanager>clearSession");
			if(sessionStorage){		  
				sessionStorage.clear(key);			
			}			
		},
		resetOnLogOut:function(){
			$log.info("resetOnLogOut");
			//** clear user profile from session **//			
			if(sessionStorage){		  
				sessionStorage.clear(Constants.SESS_KEY_USER_PROFILE);			
			}
			//** reset rule profile array **//
			RuleData.resetRuleConfig();
			//**reset rule array**//
			RuleData.resetRuleData();
			//**reset analtics data**//
			AnalyticsData.resetAnalyticsData();
			
			
		},
		getSessionData:function(key){
			$log.info("inside Sessionmanager>getrSession");
			if(sessionStorage){		  
				return JSON.parse(sessionStorage.getItem(key));		
			}
		}
      };
}]);

utilService.factory('UtilService',['$log','Constants',function($log,Constants){
return{
	getDeviceImgUrl :function(device){
		switch (device) {
		case "Desktop":
			return Constants.URL_WIN;
			break;
		case "iOS":
			return Constants.URL_IOS;
			break;
		case "Android":
			return Constants.URL_ANDROID;
			break;
		case "IEMobile":
			return Constants.URL_WINMOB;
			break;
		default:
			return Constants.URL_WIN;
			break;
		}
	}	
};
	
}]);

utilService.factory('UserAgentService',['$log',function($log){
	$log.info("UserAgentService");
	var uAgent = null;	
	
	 return{
		 getBrowserType:function(){
				$log.info("UserAgentService > getBrowserType");
				var browser = uAgent.match(/(Firefox|Chrome|Safari|Opera|;MSIE)/i);
				if(browser!=null){
					return browser[0];
				}
				else {
					return "Other";
				}				
			},
		getDeviceType:function(){
			var device = "Desktop";
			$log.info("UserAgentService > getDevice");
			var mobDevice = uAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/i);			
			
			if(mobDevice){
				device = mobDevice[0];
				if(device =="iPhone"||device =="iPad"||device =="iPod" ){
					device = "iOS";					
				}
			}
			return device;
		},
		setUserAgent:function(uaString){
			$log.info("UserAgentService > setUserAgent");
			uAgent = uaString;		
		},
		getUserAgent:function(){
			return uAgent;
		},
		isMobile:function(){
			var device = uAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/);			
			var isMobile = false;			
			if(device){				
				isMobile = true;
			}
			return isMobile;
		}
      };
}]);
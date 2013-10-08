'use strict';

var pubNubModule = angular.module('myApp.pubNubServices', []);

pubNubModule.factory('PubnubService',['$log','$rootScope','Constants','AuthService',function($log,$rootScope,Constants,AuthService){
	var pubnub = PUBNUB.init({
	      publish_key   : Constants.PUB_KEY,
	      subscribe_key : Constants.SUB_KEY,
	      uuid          : 'admin'
	  });
	var userProfile = $rootScope.USER_PROFILE;
	
	return{
			log:function(){
				$log.info("inside PubnubService Service");
				console.log(AuthService.getUserProfile());
				console.log(AuthService.getUserProfile().orgId+Constants.SEPERATOR+Constants.PUBNUB_ANALYTICS_CHANNEL);
			},
			PUBNUB:pubnub,
			PUBNUB_ANALYTICS_CHANNEL:AuthService.getUserProfile().orgId+Constants.SEPERATOR+Constants.PUBNUB_ANALYTICS_CHANNEL,
			PUBNUB_PUB:function(msgType,msg,channel){
						pubnub.publish({
				            channel : channel,
				            message : {msgType:msgType,msg:msg}
				        });		  
			},
			PUBNUB_SUB:function(channel){
			return message;				
			}
	      };
	
}]);
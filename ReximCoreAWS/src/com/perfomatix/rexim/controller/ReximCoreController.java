package com.perfomatix.rexim.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.perfomatix.rexim.Util.Constants;
import com.perfomatix.rexim.Util.RuleConfig;
import com.perfomatix.rexim.model.Org;
import com.perfomatix.rexim.model.RuleProfile;
import com.perfomatix.rexim.model.ScreenShot;
import com.perfomatix.rexim.model.User;
import com.perfomatix.rexim.model.UserProfile;

@Controller
public class ReximCoreController {

	@RequestMapping("/loggedin")
	public @ResponseBody
	UserProfile generateJsonResponse(HttpServletRequest request,
			HttpServletResponse response, HttpSession session) {

		UserProfile userProfile = new UserProfile();
		userProfile = (UserProfile) session.getAttribute("Constants.SESS_KEY_USER_PROFILE");
		if (userProfile == null || userProfile.getFirstName() == "") {

			response.setStatus(HttpServletResponse.SC_FORBIDDEN);

		}
		System.out.println("Printing user profile in /loggedin --- > ");
		return userProfile;

	}

	@RequestMapping("/login")
	public @ResponseBody
	UserProfile login(@RequestBody User user, HttpServletResponse response,
			HttpSession session) {
		int userNo = 0;
		UserProfile userProfile = new UserProfile();
		System.out.println(user.getUserName() + "--- " + user.getPassword());
		if(user.getUserName().equals("admin")
				&& user.getPassword().equals("realtime")){
			userNo = 1;
		}
		else if(user.getUserName().equals("bondi")
				&& user.getPassword().equals("admin")){
			userNo = 2;
		}
		switch (userNo) {
		case 1:
			userProfile.setFirstName("Perfomatix");
			userProfile.setLastName("Admin");
			userProfile.setRole("Admin");
			userProfile.setOrg("Perfomatix");
			userProfile.setOrgId("bbather");
			session.setAttribute("Constants.SESS_KEY_USER_PROFILE", userProfile);
			return userProfile;						
		case 2:
			userProfile.setFirstName("Bondi");
			userProfile.setLastName("Bather");
			userProfile.setRole("Admin");
			userProfile.setOrg("Bondi Bather");
			userProfile.setOrgId("bbather");
			session.setAttribute("Constants.SESS_KEY_USER_PROFILE", userProfile);
			return userProfile;
		default:
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			break;
		}		
		return userProfile;
	}
	
	@RequestMapping("/getrule")
	public @ResponseBody
	ArrayList<RuleProfile> getrule(@RequestBody Org org, HttpServletResponse response,HttpServletRequest request,
			HttpSession session) {	
		
		String orgId = org.getOrgId();
		StringBuffer file = new StringBuffer();
		UserProfile userProfile = new UserProfile();
		userProfile = (UserProfile) session.getAttribute("Constants.SESS_KEY_USER_PROFILE");
		
		System.out.println(orgId+"" + userProfile.getOrgId());
		if(orgId.equals(userProfile.getOrgId())){
			file.append(Constants.file);
			file.append(orgId);	
			file.append(".json");	
			System.out.println(file);
		}
		
		String filePath = request.getSession().getServletContext().getRealPath(file.toString());
		System.out.println("The paath -- "+ filePath);		
		RuleConfig ruleConfig = new RuleConfig();		
		System.out.println(org.getOrgName() + "--- " + org.getOrgId());
		
		return ruleConfig.getRule(org.getOrgId(),filePath);
	}

	@RequestMapping("/logout")
	public void logOut(HttpSession session, HttpServletResponse response,
			HttpServletRequest request) {
		session.invalidate();
		response.setStatus(HttpServletResponse.SC_OK);
	}
	
	
	@RequestMapping(value="/screenShot")//,  = {"application/x-javascript", "application/json", "application/xml"})
	public @ResponseBody ScreenShot
	 screenShot(HttpSession session, HttpServletResponse response,HttpServletRequest request) {
		response.setContentType("application/x-javascript");
		System.out.println("inside callback");
		ScreenShot screenShot = new ScreenShot();
		screenShot.setSuccess("200");
		return screenShot;
	}
}

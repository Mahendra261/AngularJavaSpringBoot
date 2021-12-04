package com.example.project.controller;

// import static com.example.project.security.SecurityConstant.JWT_TOKEN_HEADER;



//import static com.example.constant.SecurityConstant.JWT_TOKEN_HEADER;

import static org.springframework.http.HttpStatus.OK;

import java.lang.reflect.InvocationTargetException;
// import java.util.HashMap;
import java.util.HashMap;

// import javax.mail.MessagingException;

//import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.Model.ApplicationUser;
// import com.example.project.Model.UserPrincipal;
//import com.example.exception.domain.EmailExistException;
//import com.example.exception.domain.UserNotFoundException;
//import com.example.exception.domain.UsernameExistException;
import com.example.project.service.ApplicationUserService;
//import com.example.project.service.;
import com.example.project.security.JwtUtil;

//import com.example.Model.ApplicationUser;
//import com.example.service.ApplicationUserService;

import ch.qos.logback.core.net.SyslogOutputStream;

@RestController
//@RequestMapping(path = "/app")
public class ApplicationUserController {
	
	
	
	 public static final String EMAIL_SENT = "An email with a new password was sent to: ";
	    public static final String USER_DELETED_SUCCESSFULLY = "User deleted successfully";
	   
	    @Autowired
	    AuthenticationManager authenticationManager;
	   // private ApplicationUserService userService;
	   @Autowired
	   JwtUtil jwtTokenProvider;
	   
	   
	   


	@Autowired
	ApplicationUserService userService;
	/*
	 * {
"user_name": "user1",
"user_email": "user@gmail.com",
"password": "user",
"user_mobile": "9089089999",
"location": "HYD"
}
	 */
	
	@PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody ApplicationUser user)throws Exception{//throws UserNotFoundException, UsernameExistException, EmailExistException, MessagingException {
       
       if(user.user_name == "usffds")
       return new ResponseEntity<>("Registration succesful", OK);
       else
    	   return new ResponseEntity<>("Passsword or username policy failed", OK);
    }
	//@CrossOrigin(origins="http://localhost:4200")
	@PostMapping("/login")
    public ResponseEntity<HashMap<String, String>> login(@RequestBody ApplicationUser user) {
        HashMap<String, String> map = new HashMap<>();
		 if(user.password != "Passwddd4!")
		 {
		
		    map.put("message", "Authentication Successful!");
		    map.put("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQGhjcy5jb20iLCJuYmYiOjE1OTA1NzAxMzIsImV4cCI6MTU5MTE3NDkzMiwiaWF0IjoxNTkwNTcwMTMyfQ.5kdqQdVj");
		    map.put("Id", String.valueOf("d5b3464f-54bb-4692-86d1-086becf938fa"));
		    return new ResponseEntity<>(map, OK);
		 }else
		 {
			 map.put("message", "Username or password incorrect");
			 return new ResponseEntity<>(map, OK);
		 }

    }
	
	@PostMapping("/signin")
	    public ResponseEntity<HashMap<String, String>> signin(@RequestBody ApplicationUser user)throws Exception {
		//  ApplicationUser dbUser = userService.login(user);
		//  String jwtToken = userService.jwtTokenGen(user);
		 HashMap<String, String> map = new HashMap<>();
		// String id=dbUser.getId();
		 
		 if(user.password != "Passwddd4!")
		 {
		
		    map.put("message", "Authentication Successful!");
		    map.put("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQGhjcy5jb20iLCJuYmYiOjE1OTA1NzAxMzIsImV4cCI6MTU5MTE3NDkzMiwiaWF0IjoxNTkwNTcwMTMyfQ.5kdqQdVj");
		    map.put("Id", String.valueOf("d5b3464f-54bb-4692-86d1-086becf938fa"));
		    return new ResponseEntity<>(map, OK);
		 }else
		 {
			 map.put("message", "Username or password incorrect");
			 return new ResponseEntity<>(map, OK);
		 }
	}
	 
	 
	//  @GetMapping("/viewprofile/{userid}")
	//     public ResponseEntity<?> viewProfile(@PathVariable(value="userid") Long userid)throws Exception {
	// 	 ApplicationUser dbUser = userService.viewProfileById(userid);
	// 	 return new ResponseEntity<>(dbUser, OK);
	//     }
	 
	//  @GetMapping("/editprofile/{userid}")
	//     public ResponseEntity<?> editProfile(@PathVariable(value="userid") Long userid)throws Exception {
	// 	 ApplicationUser dbUser = userService.viewProfileById(userid);
	// 	 return new ResponseEntity<>(dbUser, OK);
	//     }
		
	
	
}
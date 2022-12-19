package com.example.demo.Controller;

import com.example.demo.DTO.User;
import com.example.demo.Service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@CrossOrigin("*")
public class SignUpController {

    @Autowired
    private MailService mailService;

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public ResponseEntity<Object> SignUp(@RequestBody final User request){

        mailService.sendSignUpCode(request.getEmail());


        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}

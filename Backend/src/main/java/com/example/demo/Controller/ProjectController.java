package com.example.demo.Controller;

import com.example.demo.DTO.Funding;
import com.example.demo.DTO.FundingCategory;
import com.example.demo.DTO.Response.ProjectCategory;
import com.example.demo.DTO.User;
import com.example.demo.Service.ProjectService;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@CrossOrigin("*")
public class ProjectController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    /**
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/project", method = RequestMethod.POST)
    public ResponseEntity<Object> createProject(@RequestBody Funding funding, HttpServletRequest request){
        if (request.getAttribute("userNum") == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        User user = userService.setUserToHttpServletRequestAttribute(request);
        funding.setUserId(user);
        if (projectService.createProject(funding)){
            return new ResponseEntity<>(funding,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(funding,HttpStatus.BAD_REQUEST);
        }





    }


    /**
     * 프로젝트 카테고리 호출
     * @return 정상 = 200 + 카테고리 목록, 비정상 = 400
     */
    @RequestMapping(value = "/category", method = RequestMethod.GET)
    public ResponseEntity<Object> getCategory(){
        ProjectCategory category = new ProjectCategory();
        category.setCategoryList(projectService.getCategoryList());

        if (category.getCategoryList().size() == 0){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(category,HttpStatus.OK);
        }
    }


}

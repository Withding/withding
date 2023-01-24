package com.example.demo.Controller;

import com.example.demo.DTO.Funding;
import com.example.demo.DTO.FundingCategory;
import com.example.demo.DTO.Response.GetProject_0Level;
import com.example.demo.DTO.Response.GetProject_1Level;
import com.example.demo.DTO.Response.ProjectCategory;
import com.example.demo.DTO.Thumbnail;
import com.example.demo.DTO.User;
import com.example.demo.Service.FileService;
import com.example.demo.Service.ProjectService;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

@Controller
@CrossOrigin("*")
public class ProjectController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private FileService fileService;


    /**
     * 프로젝트 작성 0단계
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return
     */
    @RequestMapping(value = "/project", method = RequestMethod.GET)
    public ResponseEntity<Object> createProject_0Level(HttpServletRequest request){
        User user = userService.setUserToHttpServletRequestAttribute(request);
        GetProject_0Level getProject_0Level = new GetProject_0Level(projectService.createProject_0Level(user));
        if (getProject_0Level != null){
            return new ResponseEntity<>(getProject_0Level ,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 프로젝트 1단계 호출 {projectNum} 부분에는 호출할 프로젝트 Id
     * @return
     */
    @RequestMapping(value = "/project/{projectNum}", method = RequestMethod.GET)
    public ResponseEntity<Object> getProject_1Level(@PathVariable("projectNum") final Long projectId,
                                                    HttpServletRequest request){
        User user = userService.setUserToHttpServletRequestAttribute(request);
        GetProject_1Level getProject_1Level = projectService.getProject_1Level(projectId);
        if (getProject_1Level.getUserId() != user.getUserId()){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } else if (getProject_1Level != null ) {
            return new ResponseEntity<>(getProject_1Level, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    

    /**
     * 프로젝트 작성 1단계
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return
     */
    @RequestMapping(value = "/project", method = RequestMethod.POST)
    public ResponseEntity<Object> createProject_1Level(
            @RequestParam(value = "Id", required = false) Long id,                                                      // 프로젝트 번호
            @RequestParam("title") String title,                                                                        // 프로젝트 이름
            @RequestParam("bestImage") MultipartFile thumbnailImage,                                                    // 프로젝트 썸네일
            @RequestParam("category") Long fundingCategoryId,                                                           // 프로젝트 카테고리
            @RequestParam("targetAmount") Long maxAmount,                                                               // 프로잭트 목표 금액
            //@RequestParam("startDate") Long start,                                                                    // 프로젝트 시작 일자
            //@RequestParam("endDate") Long dead,                                                                       // 프로젝트 종료 일자
            HttpServletRequest request)
    {
        //Timestamp startEnd = new Timestamp(start);
        //Timestamp deadLine = new Timestamp(dead);

        Timestamp nowTime = new Timestamp(System.currentTimeMillis());                                                  // 현재 시간
        if (request.getAttribute("userNum") == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        //else if (nowTime.before(startEnd) || nowTime.before(deadLine)){                                               // 프론트에서 한번 걸러주겠지만 혹시나 과거의 시간을 설정할 경우를 대비
        //  return new ResponseEntity<>(HttpStatus.CONFLICT);
        //}
        else {
            // 형식상 else 둠
        }

        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (projectService.isUserToProject(user, id) == false) {                                                         // 기존에 글을 작성하던 작성자인지 확인 해당 함수
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");                               // 썸네일 파일 저장에 사용할 양식 획득
        String thumbnailImageName =                                                                                     // 썸네일 저장할 때 사용할 이름
                dateFormat.format(nowTime)
                + "_"
                + thumbnailImage.getOriginalFilename().replaceAll(" ","");



        dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");                                                // 기존의 파일 양식을 DB에 저장할 양식으로 교체
        //System.out.println(startEnd.getTime());
        // ---------------------------------- 펀딩 세팅 -------------------------------------------------------------------
        Funding funding = new Funding();
        funding.setId(id);
        funding.setUserId(user);
        funding.setTitle(title);
        funding.setFundingCategory(new FundingCategory(fundingCategoryId));
        funding.setThumbnail(new Thumbnail(thumbnailImageName, thumbnailImage.getOriginalFilename()));
        funding.setMaxAmount(maxAmount);
        //funding.setStartEnd(dateFormat.format(startEnd));
        //funding.setDeadline(dateFormat.format(deadLine));
        funding.setCreatedAt(dateFormat.format(nowTime));
        // -------------------------------------------------------------------------------------------------------------


        if (projectService.createProject_1Level(funding) &&                                                           // 프로젝트 저장 및 덮어쓰기
                fileService.createThumbnailImage(thumbnailImage, thumbnailImageName)) {                                 // && 썸네일 이미지 저장
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
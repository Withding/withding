package com.example.demo.Controller;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.*;
import com.example.demo.DTO.Request.createProject_2Level;
import com.example.demo.DTO.Response.*;
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

@Controller
@CrossOrigin("*")
public class ProjectController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private BeanConfig beanConfig;



    /**
     * 프로젝트 작성 0단계
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return
     */
    @RequestMapping(value = "/projects", method = RequestMethod.POST)
    public ResponseEntity<Object> createProject_0Level(HttpServletRequest request){
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        GetProject_0Level getProject_0Level = new GetProject_0Level(projectService.createProject_0Level(user));

        if (getProject_0Level != null) {
            return new ResponseEntity<>(getProject_0Level ,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 프로젝트 1단계 호출
     * @return 인증 실패 401, 정상 처리 200 + getProject_1Level, 비정상처리 400
     */
    @RequestMapping(value = "/projects/1/{projectNum}", method = RequestMethod.GET)
    public ResponseEntity<Object> getProject_1Level(@PathVariable("projectNum") final Long projectId,
                                                    HttpServletRequest request){
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------

        GetProject_1Level getProject_1Level = projectService.getProject_1Level(projectId);
        if (getProject_1Level.getUserId() != user.getUserId()){                                                         // 작성자가 다름
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } else if (getProject_1Level != null ) {                                                                        // 정상
            getProject_1Level.setUserId(null);
            return new ResponseEntity<>(getProject_1Level, HttpStatus.OK);
        } else {                                                                                                        // 그 외에 모든 경우
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    

    /**
     * 프로젝트 1단계 저장
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return 인증실패 401, 정상 처리 204, 비정상 처리 400
     */
    @RequestMapping(value = "/projects/1/{projectNum}", method = RequestMethod.PUT)
    public ResponseEntity<Object> createProject_1Level(
            @PathVariable("projectNum") Long id,                                                                        // 프로젝트 번호
            @RequestParam(value = "title", required = false) String title,                                                                        // 프로젝트 이름
            @RequestParam(value = "bestImage", required = false) MultipartFile thumbnailImage,                                                    // 프로젝트 썸네일
            @RequestParam(value = "category", required = false) Long fundingCategoryId,                                                           // 프로젝트 카테고리
            @RequestParam(value = "targetAmount", required = false) Long maxAmount,                                                               // 프로잭트 목표 금액
            @RequestParam(value = "startDate", required = false) String start,                                                                    // 프로젝트 시작 일자
            @RequestParam(value = "endDate", required = false) String dead,                                                                       // 프로젝트 종료 일자
            HttpServletRequest request)
    {
        Timestamp nowTime = new Timestamp(System.currentTimeMillis());                                                  // 현재 시간
        System.out.println("startDate = " + start);
        System.out.println("endDate = " + dead);

        System.out.println(fundingCategoryId);
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if ((user == null) || (projectService.isUserToProject(user, id) == false) ){                                    // 인증 || 기존에 글을 작성하던 작성자인지 확인 해당 함수
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        //else if (nowTime.before(startEnd) || nowTime.before(deadLine)){                                               // 프론트에서 한번 걸러주겠지만 혹시나 과거의 시간을 설정할 경우를 대비
        //  return new ResponseEntity<>(HttpStatus.CONFLICT);
        //}
        else {
            // 형식상 else 둠
        }
        String thumbnailImageName;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");                               // 썸네일 파일 저장에 사용할 양식 획득

        if (thumbnailImage == null){
            thumbnailImageName = null;
        }else {
            thumbnailImageName =                                                                                        // 썸네일 저장할 때 사용할 이름
                    dateFormat.format(nowTime)
                            + "_"
                            + thumbnailImage.getOriginalFilename().replaceAll(" ","");
        }

        dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");                                                // 기존의 파일 양식을 DB에 저장할 양식으로 교체
        //System.out.println(startEnd.getTime());
        // ---------------------------------- 펀딩 세팅 -------------------------------------------------------------------
        Funding funding = new Funding();
        funding.setId(id);
        funding.setUserId(user);
        funding.setTitle(title);
        if (fundingCategoryId == null){
            funding.setFundingCategory(new FundingCategory(-1L));
        } else {
            funding.setFundingCategory(new FundingCategory(fundingCategoryId));
        }

        if (thumbnailImage == null){
            funding.setThumbnail(null);
        }else {
            funding.setThumbnail(new Thumbnail(thumbnailImageName, thumbnailImage.getOriginalFilename()));
        }

        funding.setMaxAmount(maxAmount);

        if (start.equals("")){
            funding.setStartEnd(null);
        }else {
            funding.setStartEnd(start + " 00:00:00");
        }

        if (dead.equals("")){
            funding.setDeadLine(null);
        }else {
            funding.setDeadLine(dead + " 00:00:00");
        }


        funding.setCreatedAt(dateFormat.format(nowTime));
        // -------------------------------------------------------------------------------------------------------------
        if (projectService.createProject_1Level(funding, thumbnailImage, thumbnailImageName)) {                         // 프로젝트 덮어쓰기, 기존 썸네일 이미지 삭제, 새로운 썸네일 이미지 저장
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 프로젝트 2단계 저장
     * @param projectId 저장할 프로젝트 Id
     * @param project2Level 저장할 내용이 담긴 객체
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return 인증실패 401, 정상 처리 204, 비정상 처리 400
     */
    @RequestMapping(value = "/projects/2/{projectNum}", method = RequestMethod.PUT)
    public ResponseEntity<Object> createProject_2Level(@PathVariable("projectNum") Long projectId,
                                                @RequestBody createProject_2Level project2Level,
                                                HttpServletRequest request)
    {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if ((user == null) || (projectService.isUserToProject(user, projectId) == false) ){                                    // 인증 || 기존에 글을 작성하던 작성자인지 확인 해당 함수
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------

        if (projectService.createProject_2Level(projectId, project2Level.getContent()) == true){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 프로젝트 2단계 호출
     * @param projectId 저장할 프로젝트 Id
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return 인증실패 401, 정상 처리 200 + content, 비정상 처리 400
     */
    @RequestMapping(value = "/projects/2/{projectNum}", method = RequestMethod.GET)
    public ResponseEntity<Object> getProject_2Level(@PathVariable("projectNum") Long projectId,
                                                    HttpServletRequest request)
    {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if ((user == null) || (projectService.isUserToProject(user, projectId) == false) ){                             // 인증 || 기존에 글을 작성하던 작성자인지 확인 해당 함수
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        GetProject_2Level getProject_2Level = new GetProject_2Level();
        String content = projectService.getProject_2Level(projectId);
        if (content == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            getProject_2Level.setContent(content);
            return new ResponseEntity<>(getProject_2Level, HttpStatus.OK);
        }
    }


    /**
     * 프로젝트 3단계 저장하는 컨트롤러
     * @param projectId 저장할 프로젝트 Id
     * @param article 저장할 물품
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return
     */
    @RequestMapping(value = "/projects/3/{projectNum}", method = RequestMethod.PUT)
    public ResponseEntity<Object> createProject_3Level(@PathVariable("projectNum") Long projectId,
                                                    @RequestBody Article article,
                                                    HttpServletRequest request)
    {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if ((user == null) || (projectService.isUserToProject(user, projectId) == false) ){                             // 인증 || 기존에 글을 작성하던 작성자인지 확인 해당 함수
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        if (projectService.createProject_3Level(projectId, article)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 프로젝트 3단계 호출
     * @param projectId 저장할 프로젝트 Id
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return
     */
    @RequestMapping(value = "/projects/3/{projectNum}", method = RequestMethod.GET)
    public ResponseEntity<Object> getProject_3Level(@PathVariable("projectNum") Long projectId,
                                                       HttpServletRequest request)
    {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if ((user == null) || (projectService.isUserToProject(user, projectId) == false) ){                             // 인증 || 기존에 글을 작성하던 작성자인지 확인 해당 함수
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        GetProject_3Level getProject_3Level = new GetProject_3Level(projectService.getProject_3Level(projectId));

        if (getProject_3Level.getArticles().size() != 0){
            return new ResponseEntity<>(getProject_3Level, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }


    /**
     * 프로젝트 3단계 삭제
     * @param projectId 프로젝트 Id
     * @param article 삭제할 물품 Id가 담긴 Article 객체
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return
     */
    @RequestMapping(value = "/projects/3/{projectNum}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteArticle(@PathVariable("projectNum") Long projectId,
                                                @RequestBody Article article,
                                                HttpServletRequest request){
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if ((user == null) || (projectService.isUserToProject(user, projectId) == false) ){                             // 인증 || 기존에 글을 작성하던 작성자인지 확인 해당 함수
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------

        if (projectService.deleteProject_3Level(projectId, article.getArticleId()) == true){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 프로젝트 내용에 삽입되는 이미지 파일을 저장하는 컨트롤러
     * @param imageFile 삽입된 이미지 파일
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return
     */
    @RequestMapping(value = "/content/image", method = RequestMethod.PUT, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> createContentImage(@RequestParam(value = "image") MultipartFile imageFile, HttpServletRequest request){
        System.out.println(request.getAttribute("userNum"));
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String imageFileName = dateFormat.format(
                new Timestamp(System.currentTimeMillis()))
                + "_"
                + imageFile.getOriginalFilename().replaceAll(" ", "");

        if (projectService.createContentImage(imageFile, imageFileName)){
            return new ResponseEntity<>(
                    CreateContentImage.builder().preview(beanConfig.SERVER_URL + ":" + beanConfig.SERVER_PORT + beanConfig.CONTENT_IMAGE_URL + imageFileName).build(),
                    HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }



    /**
     * 프로젝트 카테고리 호출
     * @return 정상 = 200 + 카테고리 목록, 비정상 = 400
     */
    @RequestMapping(value = "/categorys", method = RequestMethod.GET)
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

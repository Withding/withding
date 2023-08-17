package com.example.demo.Controller.ProjectController;

import com.example.demo.Config.BeanConfig;
import com.example.demo.Controller.PageNation;
import com.example.demo.Controller.ProjectController.DTO.*;
import com.example.demo.DTO.*;
import com.example.demo.Controller.ProjectController.DTO.createProject_2Level;
import com.example.demo.Service.FileService;
import com.example.demo.Service.ProjectService;
import com.example.demo.Service.UserService;
import lombok.Synchronized;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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
    @PostMapping(value = "/projects")
    public ResponseEntity<Object> createProject_0Level(HttpServletRequest request){
        System.out.println("프로젝트 0단계 저장 진입");
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
    @GetMapping(value = "/projects/1/{projectNum}")
    public ResponseEntity<Object> getProject_1Level(@PathVariable("projectNum") final Long projectId,
                                                    HttpServletRequest request){
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null || (projectService.isUserToProject(user, projectId) == false)){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------

        GetProject_1Level getProject_1Level = projectService.getProject_1Level(projectId);
        if (getProject_1Level != null )
        {                                                                                                               // 정상
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
    @PutMapping(value = "/projects/1/{projectNum}")
    public ResponseEntity<Object> createProject_1Level(
            @PathVariable("projectNum") Long id,                                                                        // 프로젝트 번호
            @RequestParam(value = "title", required = false) String title,                                              // 프로젝트 이름
            @RequestParam(value = "bestImage", required = false) MultipartFile thumbnailImage,                          // 프로젝트 썸네일
            @RequestParam(value = "category", required = false) Long fundingCategoryId,                                 // 프로젝트 카테고리
            @RequestParam(value = "targetAmount", required = false) Long maxAmount,                                     // 프로잭트 목표 금액
            @RequestParam(value = "startDate", required = false) String start,                                          // 프로젝트 시작 일자
            @RequestParam(value = "endDate", required = false) String dead,                                             // 프로젝트 종료 일자
            HttpServletRequest request)
    {
        System.out.println("프로젝트 1단계 저장 진입");
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        System.out.println(user);
        if ((user == null) || (projectService.isUserToProject(user, id) == false)){                                     // 인증 || 기존에 글을 작성하던 작성자인지 확인 해당 함수
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date nowDate = null;
        Date startDate = null;
        Date endDate = null;
        Timestamp now = new Timestamp(System.currentTimeMillis());                                                      // 현재 시간
        String nowTime = dateFormat.format(now);

        String strStart = "";
        String strEnd = "";
        try {
            if (!start.equals("") && start.length() <= 10) {
                start = start + " 00:00:00";
                System.out.println("start = " + start);
                startDate = dateFormat.parse(start);
                System.out.println("startDate = " + startDate);
                strStart = dateFormat.format(startDate.getTime());
            }
            else {
                start = "";
            }

            if (!dead.equals("") && dead.length() <= 10){
                System.out.println("dead = " + dead);
                dead = dead + " 23:59:59";
                endDate = dateFormat.parse(dead);
                System.out.println("endDate = " + endDate);
                strEnd = dateFormat.format(endDate.getTime());
            } else {
                dead = "";
            }
            nowDate = dateFormat.parse(nowTime);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }


        if (startDate != null && endDate != null) {
            if ((startDate.after(nowDate) == false) || (endDate.after(startDate) == false)) {                           // 프론트에서 한번 걸러주겠지만 혹시나 과거의 시간을 설정할 경우를 대비
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }
        else {
            // 형식상 else 둠
        }

        String thumbnailImageName;
        dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");                               // 썸네일 파일 저장에 사용할 양식 획득

        // 기존 썸네일 유지
        if (thumbnailImage == null){
            thumbnailImageName = null;
        }
        // 썸네일 변경
        else {
            thumbnailImageName =                                                                                        // 썸네일 저장할 때 사용할 이름
                    dateFormat.format(now)
                            + "_"
                            + thumbnailImage.getOriginalFilename().replaceAll(" ","");
        }

        dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");                                                // 기존의 파일 양식을 DB에 저장할 양식으로 교체

        // ---------------------------------- 펀딩 세팅 -------------------------------------------------------------------
        Funding funding = new Funding();
        funding.setId(id);
        funding.setUserId(user);
        funding.setTitle(title);
        funding.setMaxAmount(maxAmount);
        funding.setCreatedAt(dateFormat.format(now));
        if (start.equals("")){
            funding.setStartEnd(null);
        }else {
            funding.setStartEnd(strStart);
        }
        if (dead.equals("")){
            funding.setDeadLine(null);
        }else {
            funding.setDeadLine(strEnd);
        }


        if (fundingCategoryId == null){
            funding.setFundingCategory(new FundingCategory(-1L));
        } else {
            funding.setFundingCategory(new FundingCategory(fundingCategoryId));
        }


        // ============== 의미 없어보임
        if (thumbnailImage == null){
            funding.setThumbnail(null);
        }else {
            funding.setThumbnail(new Thumbnail(thumbnailImageName, thumbnailImage.getOriginalFilename()));
        }
        // ========================


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
    @PutMapping(value = "/projects/2/{projectNum}")
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
    @GetMapping(value = "/projects/2/{projectNum}")
    public ResponseEntity<Object> getProject_2Level(@PathVariable("projectNum") Long projectId,
                                                    HttpServletRequest request)
    {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if ((user == null) || (projectService.isUserToProject(user, projectId) == false) ){                             // 인증 || 기존에 글을 작성하던 작성자인지 확인하고 해당 프로젝트 글이 작성중인 상태인지 확인
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
    @PostMapping(value = "/projects/3/{projectNum}")
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
        article = projectService.createProject_3Level(projectId, article);
        if (article != null){
            article.setFundingId(null);
            return new ResponseEntity<>(article, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 프로젝트 3단계 호출
     * @param projectId 저장할 프로젝트 Id
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return 해당 프로젝트 Id에 등록된 물품들을 담은 List<Article> 타입을 반환
     */
    @GetMapping(value = "/projects/3/{projectNum}")
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
        return new ResponseEntity<>(getProject_3Level, HttpStatus.OK);

    }


    /**
     * 프로젝트 3단계 수정
     * @param projectId 저장할 프로젝트 Id
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return 인증실패 401, 정상 처리 204, 비정상 처리 400
     */
    @PutMapping(value = "/projects/3/{projectNum}")
    public ResponseEntity<Object> changeProject_3Level(@PathVariable("projectNum") Long projectId,
                                                       @RequestBody Article article,
                                                       HttpServletRequest request){
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if ((user == null) || (projectService.isUserToProject(user, projectId) == false) ){                             // 인증 || 기존에 글을 작성하던 작성자인지 확인 해당 함수
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        if (projectService.changeProject_3Level(projectId, article) == true){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
    @DeleteMapping(value = "/projects/3/{projectNum}")
    public ResponseEntity<Object> deleteArticle(@PathVariable("projectNum") Long projectId,
                                                @RequestBody Article article,
                                                HttpServletRequest request) {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if ((user == null) || (projectService.isUserToProject(user, projectId) == false) ){                             // 인증 || 기존에 글을 작성하던 작성자인지 확인 해당 함수
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------

        if (projectService.deleteProject_3Level(projectId, article.getId()) == true){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 프로젝트 최종 검사 후 등록하는 컨트롤러
     * @param projectId 프로젝트 Id
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return
     */
    @PatchMapping(value = "/projects/{ProjectNum}")
    public ResponseEntity<Object> validateProject(@PathVariable("ProjectNum")Long projectId,
                                                HttpServletRequest request){

        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if ((user == null) || (projectService.isUserToProject(user, projectId) == false) ){                             // 인증 || 기존에 글을 작성하던 작성자인지 확인 해당 함수
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        String responseCode = projectService.validateProject(projectId);


        switch (responseCode){
            case "0":
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            case "1":
            case "2":
            case "3":
                ResponseValidateFunding responseValidateFunding = new ResponseValidateFunding();
                responseValidateFunding.setErrorCode(responseCode);
                return new ResponseEntity<>(responseValidateFunding ,HttpStatus.BAD_REQUEST);
            default:                                                                                                    // 트라이 캣치 같은 곳에서 에러난 경우
                return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }


    /**
     * 마이페이지 메이커에서 내가 작성한 프로젝트 호출
     * @param page 호출할 페이지가
     * @param cursor 마지막을 가리키는 커서
     * @param request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @param count 페이지당 글 갯수
     * @return 정상 처리 200 + List<GetMyProject> 객체, 비정상 200, 비어있는 List<GetMyProject> 객체
     */
    @GetMapping(value = "/myprojects")
    public ResponseEntity<Object> getMyProjects(@RequestParam(value = "page",required = false , defaultValue = "1")Long page,
                                                @RequestParam(value = "cursor", required = false, defaultValue = "0")Long cursor,
                                                @RequestParam(value = "count") int count,
                                                HttpServletRequest request)
    {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------

        Long lastPage = 0L;

        Long fundingCount = projectService.getFundingCountToUserId(user.getUserId(), cursor);
        GetMyProjectsFinal getMyProjectsFinal = new GetMyProjectsFinal();
        getMyProjectsFinal.setFundingCount(fundingCount);
        getMyProjectsFinal.setFundingList(projectService.getMyProjects(user, page, cursor, count));
        if (fundingCount % count == 0){
            lastPage = fundingCount / count;
        } else {
            lastPage = (fundingCount / count) + 1;
        }
        getMyProjectsFinal.setLastPage(lastPage);

        return new ResponseEntity<>(getMyProjectsFinal, HttpStatus.OK);
    }


    /**
     * 특정 유저의 펀딩 목록 호출
     * @param userNum
     * @param page 호출할 페이지가
     * @param cursor 마지막을 가리키는 커서
     * @param count 페이지당 글 갯수
     * @return
     */
    @GetMapping(value = "/users/{userId}/projects")
    public ResponseEntity<Object> getProjectsToUser(@PathVariable(value = "userId") Long userNum,
                                                    @RequestParam(value = "page", required = false) Long page,
                                                    @RequestParam(value = "cursor", required = false) Long cursor,
                                                    @RequestParam(value = "count") int count)
    {
        ResponseProjectList fundingList = new ResponseProjectList();
        User findUser = userService.getUserToUserId(userNum);
        fundingList.setSmallProjectList(projectService.getFundingListToUserNum(findUser, page, cursor, count));
        Long fundingCount;
        fundingCount = projectService.getFundingCountToUserIdAndFundingState(userNum, "진행중") + projectService.getFundingCountToUserIdAndFundingState(userNum, "종료");
        if (fundingCount % count == 0){
            fundingList.setLastPage(fundingCount / count);
        } else {
            fundingList.setLastPage((fundingCount / count) + 1);
        }

        return new ResponseEntity<>(fundingList, HttpStatus.OK);
    }


    /**
     * 프로젝트 카테고리 호출
     * @return 정상 = 200 + 카테고리 목록, 비정상 = 400
     */
    @Synchronized
    @GetMapping(value = "/categorys")
    public ResponseEntity<Object> getCategory()
    {
        ProjectCategory category = new ProjectCategory();
        category.setCategoryList(projectService.getCategoryList());

        if (category.getCategoryList().size() == 0){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(category,HttpStatus.OK);
        }
    }


    /**
     * 프로젝트 1단계에서 썸네일을 삭제하는 API
     * @return 인증실패 401, 정상 204, 실패 400
     */
    @DeleteMapping(value = "/projects/thumbnail/{projectNum}")
    public ResponseEntity<Object> deleteThumbnail(@PathVariable(value = "projectNum") Long id,
                                                  HttpServletRequest request)
    {
        // ------------------------------ 인증 --------------------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        System.out.println(user);
        if ((user == null) || (projectService.isUserToProject(user, id) == false)){                                     // 인증 || 기존에 글을 작성하던 작성자인지 확인 해당 함수
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------

        if (projectService.deleteThumbnail(id)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 프로젝트 리스트 호출
     * @return 성공 200 프로젝트 목록
     */
    @GetMapping(value = "/projects")
    public ResponseEntity<Object> getProjects(@RequestParam(value = "page", required = false, defaultValue = "1") final Long page,
                                              @RequestParam(value = "cursor", required = false, defaultValue = "0") final Long cursor,
                                              @RequestParam(value = "count", required = false , defaultValue = "5") final Long count,
                                              @RequestParam(value = "state", defaultValue = "진행중") final String state) {
        PageNation pageNation = new PageNation(Long.valueOf(page), Long.valueOf(count), Long.valueOf(cursor));
        List<Funding> projectList = projectService.getProjects(pageNation);

        ResponseProjectList response = new ResponseProjectList();
        response.setFullProjectList(projectList);

        response.setFundingCount(projectService.getFundingCountFundingState(state));

        if (response.getFundingCount() % count > 0){
            response.setLastPage(response.getFundingCount() / count + 1);
        } else {
            response.setLastPage(response.getFundingCount() / count);
        }


        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}

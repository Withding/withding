package com.example.demo.Controller.VoteController;

import com.example.demo.Controller.VoteController.DTO.VoteList;
import com.example.demo.DTO.CompoSitekey.VotePK;
import com.example.demo.DTO.User;
import com.example.demo.DTO.Vote;
import com.example.demo.Service.UserService;
import com.example.demo.Service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Controller
@CrossOrigin("*")
public class VoteController {

    @Autowired
    private UserService userService;

    @Autowired
    private VoteService voteService;


    /**
     * 찜
     *
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @param fundingId 찜할 펀딩의 fundingId
     * @return 인증실패 = 401, 성공 204, 실패 400
     */
    @PostMapping(value = "/votes/{fundingId}")
    public ResponseEntity<Object> createVote(HttpServletRequest request,
                                             @PathVariable("fundingId") Long fundingId){
        // -------------------------------------------- 인증 ------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        Vote vote = new Vote();
        vote.setFundingId(fundingId);
        vote.setUserId(user.getUserId());

        if (voteService.createVote(vote)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 특정 글 찜 확인
     *
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @param fundingId 확인할 펀딩 아이디
     * @return 인증실패 = 401, 특정 글을 팔로우 상태 204, 특정 글을 팔로우하지 않는 상태 401
     */
    @GetMapping("/votes/{fundingId}")
    public ResponseEntity<Object> getVote(HttpServletRequest request,
                                          @PathVariable("fundingid") Long fundingId){
        // -------------------------------------------- 인증 ------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        VotePK votePk = new VotePK();
        votePk.setFundingId(fundingId);
        votePk.setUserId(user.getUserId());
        if (voteService.getVote(votePk)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 나의 찜 목록 호출
     *
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @return 인증실패 = 401, 정상 = (200, List<Vote>)
     */
    @GetMapping("/my/votes")
    public ResponseEntity<Object> getVotes(HttpServletRequest request){
        // -------------------------------------------- 인증 ------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        VoteList voteList = new VoteList();
        voteList.setVotes(voteService.getVotes(user.getUserId()));
        return new ResponseEntity<>(voteList, HttpStatus.OK);
    }


    /**
     * 찜 해제
     *
     * @param request request userNum, nickName, loginTime이 속성으로 들어있는 HttpServletRequest 객체
     * @param fundingId 찜을 해제할 펀딩의 fundingId
     * @return 인증실패 = 401, 삭제 성공 = 204, 삭제 실패 = 400
     */
    @DeleteMapping("/votes/{fundingId}")
    public ResponseEntity<Object> deleteVote(HttpServletRequest request,
                                             @PathVariable("fundingId") Long fundingId){
        // -------------------------------------------- 인증 ------------------------------------------------------------
        User user = userService.setUserToHttpServletRequestAttribute(request);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // -------------------------------------------------------------------------------------------------------------
        VotePK votePK = new VotePK();
        votePK.setUserId(user.getUserId());
        votePK.setFundingId(fundingId);
        if (voteService.deleteVote(votePK)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}

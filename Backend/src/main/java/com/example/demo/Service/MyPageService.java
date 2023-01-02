package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.Response.MyPage;
import com.example.demo.DTO.User;
import com.example.demo.Repository.InvestRepo;
import com.example.demo.Repository.VoteRepo;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@Data
@NoArgsConstructor
public class MyPageService {

    @Autowired
    private VoteRepo voteRepo;

    @Autowired
    private InvestRepo investRepo;

    @Autowired
    private BeanConfig beanConfig;

    public User setUserToHttpServletRequestAttribute(HttpServletRequest request){
        User user = new User();
        user.setUserId((Long) request.getAttribute("userNum"));
        user.setNickName((String) request.getAttribute("nickName"));
        user.setLoginTime((String) request.getAttribute("loginTime"));
        return user;
    }


    public MyPage setMyPage(User user){
        MyPage myPage = new MyPage();
        myPage.setUser_id(user.getUserId());
        myPage.setNickName(user.getNickName());
        myPage.setPoint(user.getPoint());
        myPage.setFundingCount(investRepo.getCountToUserId(user.getUserId()));
        myPage.setVoteCount(voteRepo.getCountToUserId(user.getUserId()));
        myPage.setProfileImage(beanConfig.SERVER_URL + beanConfig.SERVER_PORT + beanConfig.PROFILE_IMAGE_URL + user.getProfileImage());

        return myPage;
    }



}

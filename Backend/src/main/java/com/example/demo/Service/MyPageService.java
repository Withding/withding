package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.Response.MyPageMaker;
import com.example.demo.DTO.Response.MyPageSupporter;
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


    public MyPageSupporter setMyPageSupporter(User user){
        MyPageSupporter myPageSupporter = new MyPageSupporter();
        myPageSupporter.setNickName(user.getNickName());
        myPageSupporter.setPoint(user.getPoint());
        myPageSupporter.setFundingCount(investRepo.getCountToUserId(user.getUserId()));
        myPageSupporter.setVoteCount(voteRepo.getCountToUserId(user.getUserId()));
        myPageSupporter.setProfileImage(beanConfig.SERVER_URL + beanConfig.SERVER_PORT + beanConfig.PROFILE_IMAGE_URL + user.getProfileImage());
        return myPageSupporter;
    }

    public MyPageMaker setMyPageMaker(User user){
        MyPageMaker myPageMaker = new MyPageMaker();
        myPageMaker.setFundingCount(investRepo.getCountToUserId(user.getUserId()));
        myPageMaker.setFollowCount(0L);
        return myPageMaker;
    }

}

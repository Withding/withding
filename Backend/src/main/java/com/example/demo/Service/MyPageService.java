package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import com.example.demo.Controller.MyPageController.DTO.MyPageMaker;
import com.example.demo.Controller.MyPageController.DTO.MyPageSupporter;
import com.example.demo.DTO.User;
import com.example.demo.Repository.FollowerRepo;
import com.example.demo.Repository.VoteRepo;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Data
@NoArgsConstructor
public class MyPageService {

    @Autowired
    private VoteRepo voteRepo;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private FollowerRepo followerRepo;

    @Autowired
    private BeanConfig beanConfig;


    /**
     * 마이페이지 서포터 정보 세팅에 사용
     * @param user 특정 사용자의 정보가 담긴 객체
     * @return
     */
    public MyPageSupporter setMyPageSupporter(User user){
        MyPageSupporter myPageSupporter = new MyPageSupporter();
        myPageSupporter.setNickName(user.getNickName());
        myPageSupporter.setPoint(user.getPoint());
        myPageSupporter.setFundingCount(projectService.getCountToUserId(user.getUserId()));
        myPageSupporter.setProfileImage(beanConfig.SERVER_URL + ":" + beanConfig.SERVER_PORT + beanConfig.PROFILE_IMAGE_URL + user.getProfileImage().getProfileImage());
        return myPageSupporter;
    }


    /**
     * 마이페이지 메이커 정보 세팅에 사용
     * @param user 특정 사용자의 정보가 담긴 객체
     * @return
     */
    public MyPageMaker setMyPageMaker(User user){
        MyPageMaker myPageMaker = new MyPageMaker();
        myPageMaker.setFollowerCount(followerRepo.getCountToUserId(user.getUserId()));
        return myPageMaker;
    }

}

package com.example.demo.Controller.FileController.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ImageAuth {

    private Long userId;
    private String fundingState;



    public ImageAuth(Long userId, String fundingState){
        this.userId = userId;
        this.fundingState = fundingState;
    }


    /**
     * 물품 이미지, 컨텐츠에 사용된 이미지, 썸네일 이미지를 호출시 fundungState를 확인하여 이미지 노출 여부 확인
     * fundingState가 진행중, 종료 상태인 경우만 보여줄수 있다.
     *
     * @return 권한문제 없음(보여줘도 됨) = true, 권한문제 있음(보여주면 안 됨) = false
     */
    public boolean isVisibleFuningState(){
        // fundingStateCode가 진행중, 종료 상태가 아닌 경우 보여주면 안됨. 그러므로 false 반환
        switch (this.fundingState) {
            case "진행중":
            case "종료":
                return true;
            default:
                return false;
        }

    }

    /**
     * 물품 이미지, 컨텐츠에 사용된 이미지, 썸네일 이미지를 호출시 UserId를 확인하여 이미지 노출 여부 확인
     * userId는 해당 물품 이미지가 사용된 펀딩을 작성한 유저와 같은 경우만 보여줄 수 있다.
     *
     * @param userId 이미지를 요청한 User의 Id
     * @return
     */
    public boolean isVisibleUser(Long userId){
        // 작성자와 이미지를 호출한 사람이 같음
        if (this.userId.equals(userId)) {
            return true;
        } else {
            return false;
        }
    }




}

package com.example.demo.Controller;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@NoArgsConstructor
@Data
public class PageNation {
    private Long page;  // default 1
    private Long count; // default 5
    private Long cursor; // default 0

    public PageNation(@Nullable final Long page, final Long count, @Nullable final Long cursor){
        this.page = page;
        this.count = count;
        this.cursor = cursor;
    }

    /**
     * count 검증 함수
     * count의 값이 1보다 작거나 21보다 크면 5로 세팅
     */
    private void isValidateCount(){
        if (1L > this.count || this.count > 21L) {
            this.count= 5L;
        }
    }

    /**
     * page 검증 함수
     * page의 값이 음수일 경우 1로 세팅
     */
    private void isValidatePage(){
        if (1L > this.page) {
            this.count= 1L;
        }
    }

    /**
     * cursor 검증 함수
     * cursor의 값이 음수일 경우 0으로 세팅
     */
    private void isValidateCursor() {
        if (0L > this.cursor) {
            this.cursor = 0L;
        }
    }

    /**
     * PageNation에 존재하는 검증을 통합으로 묶은 함수 이상한 값이 들어올 경우 기본 값으로 세팅
     */
    public void isValidatePageNation(){
        this.isValidateCount();
        this.isValidatePage();
        this.isValidateCursor();
    }

}

package com.example.demo.Controller;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@NoArgsConstructor
@Data
public class PageNation {
    private Long page;
    private Long count;
    private Long cursor;

    public PageNation(@Nullable final Long page, final Long count, @Nullable final Long cursor){
        this.page = page;
        this.count = count;
        this.cursor = cursor;
    }
}

package com.example.demo.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Data
@Entity
@Table(name = "funding_state_code")
public class FundingStateCode {
    @Id
    @Column(name = "state_code")
    private Integer stateCode;

    @Column(name = "state")
    private String state;

    public FundingStateCode(int stateCode){
        this.stateCode = stateCode;
    }


}

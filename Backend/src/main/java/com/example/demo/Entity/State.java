package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "state")
public class State {

    public State(int code){
        this.stateCode = code;
    }


    @Id
    @Column(name = "state_code")
    private Integer stateCode;
    private String state;

}

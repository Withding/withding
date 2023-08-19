package com.example.demo.Entity.IdType;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "id_type")
public class IdType {

    public IdType(int code){
        this.Code = code;
    }


    @Id
    @Column(name = "id_type_code")
    private Integer Code;

    @Column(name = "id_type")
    private String Type;

}

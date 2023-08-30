package com.example.demo.Entity.PointType;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@Entity
@Table(name = "point_type")
public class PointType {

    public PointType(Long typeCode){
        this.typeCode = typeCode;
    }


    @Id
    @Column(name = "type_code")
    private Long typeCode;

    @Column(name = "type")
    private String type;
}
package com.example.demo.DTO;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "emailauth")
public class EmailAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emailauth_id")
    private Long emailAuth_id;

    private String email;

    private String code;

    @Column(name = "deadline")
    private String deadLine;
}

package com.example.demo.DTO;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    @Column(name = "code")
    private String authCode;

    @Column(name = "secretkey")
    private String secretKey;

    @Column(name = "deadline")
    private String deadLine;
}

package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "profileimage")
public class ProfileImage {



    @Id
    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "origin_profile_image")
    private String originProfileImage;
}

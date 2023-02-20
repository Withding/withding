package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "point_history")
public class PointHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_history_id")
    private Long pointHistoryId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "point")
    private Long point;

    @Column(name = "at_time")
    private String atTime;

    @ManyToOne
    @JoinColumn(name = "type_code")
    private PointType pointType;

    @Column(name = "source")
    private String source;


}

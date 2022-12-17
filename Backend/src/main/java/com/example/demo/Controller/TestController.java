package com.example.demo.Controller;

import com.example.demo.DTO.State;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;


@org.springframework.stereotype.Controller
@CrossOrigin("*")
public class TestController {



    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public ResponseEntity<Object> test(){
/*
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

        System.out.println("timestamp : " + timestamp);
        System.out.println("dateFormat : " + dateFormat.format(timestamp));

        State state = new State();
        //state.setStateCode(0);
        //state.setState("활성화");

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("jpabook");
        EntityManager em = emf.createEntityManager();
        EntityTransaction tr = em.getTransaction();

        try{
            tr.begin();
            state = em.find(State.class, 0);
            System.out.println(state.toString());

            em.persist(state);
            state.setState("활성화");
            tr.commit();

        }catch (Exception e){
            e.printStackTrace();
            tr.rollback();
            System.out.println("캣치로 빠짐");
        }
        em.close();
        emf.close();


*/

        return new ResponseEntity<>(HttpStatus.OK);
    }

}

package com.example.demo.Service;

import com.example.demo.Config.BeanConfig;
import com.example.demo.DTO.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.*;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@Service
public class JwtService {

    @Autowired
    private BeanConfig beanConfig;

    private final Long expiredTime = 1000 * 60L * 60L * 24L * 365L; // 유효시간 365일 (밀리초 1000 = 1초 * 60 * 60  = 1시간 * 24 = 24시간 * 365L = 365일)

    //
    // 헤더 만드는부분
    //
    private Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256"); // 해시 256 사용하여 암호화
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    //
    // 토큰 생성
    //
    public String generateJwtToken(Long userNum, String nickName, String loginTime) {
        Date now = new Date();
        return Jwts.builder()
                //.setSubject()                                         // 보통 username
                .setHeader(createHeader())
                .claim("userNum", userNum)
                .claim("nickName", nickName)                              //
                .claim("loginTime", loginTime)
                //.setClaims(createClaims(usernum))                     // 클레임, 토큰에 포함될 정보
                .setExpiration(new Date(now.getTime() + expiredTime))   // 만료일
                .signWith(SignatureAlgorithm.HS256, beanConfig.getJwtKey())
                .compact();
    }


    //
    // 토큰 유효성 검사
    //
    public void validateToken(String jwt) {
        try {
            Claims claims = Jwts.parser().setSigningKey(beanConfig.getJwtKey()).parseClaimsJws(jwt).getBody();
        } catch ( io.jsonwebtoken.SignatureException | MalformedJwtException e) {
            System.out.println("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            System.out.println("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            System.out.println("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            System.out.println("JWT 토큰이 잘못되었습니다.");
        }
    }


    //
    // JWT에서 정보를 얻어내는 함수
    //
    public Map<String,String> getClaimsFromJwt(String jwt) {
        Map<String, String> map = new HashMap<>();

        if (jwt == null) {
            System.out.println("JwtService -> getClaimsFromJwt()에서 토큰 == null");
            System.out.println("토큰이 null임");
            return map;
        }
        try {
            //String userNum = claims.getBody().get("userNum", String.class);
            Claims claims = Jwts.parser().setSigningKey(beanConfig.getJwtKey()).parseClaimsJws(jwt).getBody();

            map.put("userNum", claims.get("userNum",String.class));
            map.put("nickName", claims.get("nickName",String.class));
            map.put("loginTime", claims.get("loginTime",String.class));
            return map;
        } catch (Exception err) {
            //err.printStackTrace();
            System.out.println("JwtService -> getClaimsFromJwt()에서 예외처리로 빠짐");
            return map;

        }
    }



    //
    // JWT에서 정보를 얻어내서 User로 반환하는 함수
    //
    public User getClaimsFromJwtToUser(String jwt) {
        User user = new User();

        if (jwt == null) {
            System.out.println("JwtService -> getClaimsFromJwtToUser()에서 토큰 == null");
            return user;
        }
        try {
            //String userNum = claims.getBody().get("userNum", String.class);
            Claims claims = Jwts.parser().setSigningKey(beanConfig.getJwtKey()).parseClaimsJws(jwt).getBody();
            user.setUserId(claims.get("userNum", Long.class));
            user.setNickName(claims.get("name", String.class));
            user.setLoginTime(claims.get("loginTime", String.class));

            return user;
        } catch (Exception err) {
            //err.printStackTrace();
            System.out.println("JwtService -> getClaimsFromJwtToUser()에서 예외처리로 빠짐");
            return user;

        }
    }


}

package com.example.demo.Service;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Value;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@Data
@Configurable
@NoArgsConstructor
public class JwtService implements InitializingBean {

    @Value("${spring.security.oauth2.resourceserver.jwt.public-key-location}")
    private String secretKey;

    private Key key;

    private final Long expiredTime = 1000 * 60L * 60L * 24L * 365L; // 유효시간 365일 (밀리초 1000 = 1초 * 60 * 60  = 1시간 * 24 = 24시간 * 365L = 365일)




    //
    //
    //
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("애프터 프로퍼티 셋 실행");
        key = new SecretKeySpec(Base64.getEncoder().encode(secretKey.getBytes()), SignatureAlgorithm.HS256.getJcaName());
        System.out.println("key : " + key);
        System.out.println("secretKey : " + secretKey);
    }

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
                .setHeader(createHeader())                              //
                .claim("userNum", userNum)                        //
                .claim("nickName", nickName)                      //
                .claim("loginTime", loginTime)                    //
                //.setClaims(createClaims(usernum))                     // 클레임, 토큰에 포함될 정보
                .setExpiration(new Date(now.getTime() + expiredTime))   // 만료일
                .signWith(key)
                .compact();
    }



    //
    // 토큰 유효성 검사, 정보로 변환
    //
    public Map<String, Object> validateToken(String jwt) {
        try {
            if (jwt == null) {
                return null;
            }
            Map<String, Object> map = new HashMap<>();
            System.out.println("this.key : " + key.getEncoded());
            System.out.println("validateToken jwt = " + jwt);
            Claims claims = (Claims) Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt.replace("bearer", "")) // jwt에서 "bearer " 제거
                    .getBody();

            map.put("userNum", claims.get("userNum",Long.class));
            map.put("nickName", claims.get("nickName",String.class));
            map.put("loginTime", claims.get("loginTime",String.class));
            return map;
        } catch ( io.jsonwebtoken.SignatureException | MalformedJwtException e) {
            e.printStackTrace();
            System.out.println("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            e.printStackTrace();
            System.out.println("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            e.printStackTrace();
            System.out.println("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            System.out.println("JWT 토큰이 잘못되었습니다.");
        }
        return null;
    }


    //
    // JWT에서 정보를 얻어내는 함수
    //
    public Map<String,Object> getClaimsFromJwt(String jwt) {
        Map<String, Object> map = new HashMap<>();

        if (jwt == null) {
            return map;
        }
        try {
            //String userNum = claims.getBody().get("userNum", String.class);
            // Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwt).getBody();
            Claims claims = (Claims) Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();

            return map;
        } catch (Exception err) {
            return map;
        }
    }




}

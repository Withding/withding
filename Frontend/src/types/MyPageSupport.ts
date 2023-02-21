
/**
 * @description 마이페이지 서포터 ReponseDataType
 */
interface MyPageSupport{
    // voteCount: 0,
    fundingCount?: number; // 펀딩 갯수
    profileImage?: string; // 프로필 이미지
    point?: number // 내 포인트
    nickName?: string // 유저 닉네임
}

export default MyPageSupport;
/**
 * Funding interface
 * @interface Funding
 * @property {number} id - 펀딩 아이디
 * @property {string} image - 펀딩 이미지
 * @property {string} title - 펀딩 제목
 * @property {string} state - 펀딩 상태
 * @property {boolean} isDeleteAble - 펀딩 삭제 가능 여부
 */
interface Funding {
    id: number;
    image: string;
    title: string;
    state: string;
    isDeleteAble: boolean;
}

export default Funding;
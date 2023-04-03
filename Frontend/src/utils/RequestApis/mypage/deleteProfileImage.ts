import httpClient from "@/utils/httpClient";
/**
 * 프로필 이미지 삭제 API
 * @returns 
 */
function replaceProfileImage(): Promise<{ profileImage: string}> {
    return httpClient({
        url: "/user/image",
        method: "DELETE",
    }).then(res => res.data);
}

export default replaceProfileImage;
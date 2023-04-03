import httpClient from "@/utils/httpClient";

/**
 * 프로필 이미지 변경 API
 * @returns 
 */
function replaceProfileImage(image: File): Promise<{ profileImage: string}> {
    return httpClient({
        url: "/user/image",
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: {
            image: image
        }
    }).then(res => res.data);
}

export default replaceProfileImage;
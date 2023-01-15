import customAxios from "@/utils/customAxios";
/**
 * 프로필 이미지 변경 API
 * @returns 
 */
function replaceProfileImage(image: File): Promise<{ image: string}> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: "/user/image",
        method: "PUT",
        headers: {
            "authorization": accessToken,
            "Content-Type": "multipart/form-data",
        },
        data: {
            image: image
        }
    }).then(res => res.data);
}

export default replaceProfileImage;
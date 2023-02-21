import customAxios from "@/utils/customAxios";
/**
 * 프로필 이미지 삭제 API
 * @returns 
 */
function replaceProfileImage(): Promise<{ profileImage: string}> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: "/user/image",
        method: "DELETE",
        headers: {
            "authorization": accessToken,
        },
    }).then(res => res.data);
}

export default replaceProfileImage;
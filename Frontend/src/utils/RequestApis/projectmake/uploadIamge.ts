import customAxios from "@/utils/customAxios";
/**
 * 프로젝트 생성 본문 내용 글 작성도중 이미지 업로드시 사용하는 API
 * @returns 
 */
function uploadImage(image: Blob): Promise<{ preview: string}> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: "/content/image",
        method: "PUT",
        headers: {
            "authorization": accessToken,
            "Content-Type": "multipart/form-data",
        },
        data: {
            image
        }
    }).then(res => res.data);
}

export default uploadImage;
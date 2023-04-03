import httpClient from "@/utils/httpClient";

/**
 * 프로젝트 생성 본문 내용 글 작성도중 이미지 업로드시 사용하는 API
 * @returns 
 */
function uploadImage(image: Blob): Promise<{ preview: string}> {
    return httpClient({
        url: "/content/image",
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: {
            image
        }
    }).then(res => res.data);
}

export default uploadImage;
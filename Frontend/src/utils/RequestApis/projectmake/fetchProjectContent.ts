import customAxios from "@/utils/customAxios";

/**
 * 특정 프로젝트의 내용을 가져오는 API
 * @returns 
 */
function fetchProjectContent(id: number | string): Promise<{
    content: string;
}> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: `/projects/2/${id}`,
        method: "GET",
        headers: {
            "authorization": accessToken,
        },
    }).then(res => res.data);
}

export default fetchProjectContent;
import customAxios from "@/utils/customAxios";
/**
 * 프로젝트 생성후 프로젝트 번호를 받아오는 API
 * @returns 
 */
function createProject(): Promise<{ id: string}> {
    const axios = customAxios();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = user?.accessToken;
    return axios({
        url: "/projects",
        method: "POST",
        headers: {
            "authorization": accessToken,
        },
    }).then(res => res.data);
}

export default createProject;
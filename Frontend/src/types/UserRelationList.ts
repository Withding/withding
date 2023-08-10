
interface User {
    name: number;
    relation: boolean,
    id: number,
}

interface UserRelationListResponse {
    list: User[],
    lastPage: number,
    currentPage: number,
}

export default UserRelationListResponse;
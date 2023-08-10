
interface RelationUser {
    name: number;
    relation: boolean,
    userId: number,
}

interface UserRelationListResponse {
    list: RelationUser[],
    lastPage: number,
    currentPage: number,
}

export { UserRelationListResponse, RelationUser };
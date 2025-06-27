export const GET_FOLLOW_STATUS = `
    query GetFollowStatus($source:String!,$target:String!){
    getFollowStatus(source:$source,target:$target)
    }
`;

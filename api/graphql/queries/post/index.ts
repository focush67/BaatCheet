export const GET_ALL_POSTS = `
 query fetchAllPosts{
    getAllPosts{
        id
        caption
        coverPhoto
        likes {
            owner {
                id
                email
                username
            }
        }
        comments {
            content
            owner {
                username
                email
            }
        }
        tags {
            referenceUser {
                email
                username
            }
        }
    }
 }
`;

export const GET_POST_BY_ID = `
    query getIndividualPost($postID:String!){
        getPostById(postID:$postID){
        id
        caption
        coverPhoto
        likes {
            owner {
                id
                email
                username
            }
        }
        comments {
            content
            owner {
                username
                email
            }
        }
        tags {
            referenceUser {
                email
                username
            }
        }
    }
    }
`;

export const GET_POSTS_FOR_USER = `
    query getPersonalPosts($userID:String!){
        getPostsForUser(userID:$userID){
        id
        caption
        coverPhoto
        likes {
            owner {
                id
                email
                username
            }
        }
        comments {
            content
            owner {
                username
                email
            }
        }
        tags {
            referenceUser {
                email
                username
            }
        }
    }
`;

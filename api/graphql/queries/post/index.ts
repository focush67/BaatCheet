export const GET_ALL_POSTS = `
 query fetchAllPosts{
    getAllPosts{
        id
        caption
        coverPhoto
        owner {
            email
            username
            profilePicture
        }
        createdAt
        likes {
            owner {
                id
                email
                username
                profilePicture
            }
        }
        comments {
            content
            owner {
                id
                username
                email
                profilePicture
            }
        }
        tags {
            referenceUser {
                id
                email
                username
                profilePicture
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

export const GET_COMMENTS_ON_POST = `
    query GetCommentsOnPost($postID:ID!){
        getCommentsOnPost(postID:$postID){
            id
            content
            createdAt
            owner {
                email
                username
                profilePicture
            }
            replyTo {
                content
                owner {
                    email
                    username
                    profilePicture
                }
            }
            post {
                caption
                owner {
                    username
                    email
                    profilePicture
                }
            }
            likes {
                owner {
                    username
                    email
                    profilePicture
                }
            }
            replies {
                content
                owner {
                    email
                    username
                    profilePicture
                }
            }

        }
    }
`;

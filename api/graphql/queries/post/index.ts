export const GET_ALL_POSTS = `
 query fetchAllPosts($email:String!){
    getAllPosts(email:$email){
        id
        caption
        coverPhoto
        isBookmarked
        owner {
            email
            username
            name
            bio
            profilePicture
        }
        createdAt
        likes {
            owner {
                id
                email
                name
                username
                profilePicture
            }
        }
        comments {
            id
            content
            owner {
                id
                username
                name
                email
                profilePicture
            }
        }
        tags {
            referenceUser {
                id
                email
                name
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
    query GetPersonalPosts($email:String,$username:String){
        getPostsForUser(email:$email,username:$username){
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
        owner {
            username
            email
            name,
            profilePicture
            bio
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
                id
                content
                owner {
                    email
                    username
                    profilePicture
                }
            }
            post {
                id
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
                id
                content
                createdAt
                owner {
                    email
                    username
                    profilePicture
                }
                likes {
                    owner {
                        username
                        email
                        profilePicture
                    }
                }
            }

        }
    }
`;

export const GET_COLLECTIONS_FOR_USER = `
    query GetCollections($email:String!){
        getCollectionsForUser(email:$email){
            id
            title
            coverPhoto
            posts {
                post {
                    id
                }
            }
        }
    }
`;

export const GET_POSTS_IN_COLLECTIONS = `
    query GetPostsSaved($email:String,$username:String){
        getPostsSavedByUser(email:$email,username:$username){
            id
            caption
            coverPhoto
            owner{
                username
                profilePicture
            }
            likes{
                owner {
                username
                }
            }
            comments {
            owner {
            username
                }
            }
        }
    }
`;

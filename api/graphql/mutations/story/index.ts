export const CREATE_USER_STORY = `
    mutation CreateStory($input:CreateStoryInput!){
        createNewStory(input:$input){
            id
            content
            coverPhoto
            owner {
                email
                username
                profilePicture
            }
            
            likes {
                owner {
                    email
                    username
                    profilePicture
                }
            }

            comments {
                content
                owner {
                    username
                    email
                    profilePicture
                }
            }
        }
    }
`;

export const LIKE_STORY = `
    mutation LikeStory($storyID:ID!,$email:String!){
        addLikeToStory(storyID:$storyID,email:$email){
            storyId,
            owner {
                email
                username
                name
                profilePicture
            }
        }
    }
`;

export const UNLIKE_STORY = `
    mutation UnLikeStory($storyID:ID!,$email:String!){
        removeLikeFromStory(storyID:$storyID,email:$email){
            storyId,
            owner {
                email
                username
                name
                profilePicture
            }
        }
    }
`;

export const REPLY_TO_STORY = `
    mutation ReplyToStory($storyID:ID!,$email:String!,$content:String!){
        addCommentToStory(storyID:$storyID,email:$email,content:$content){
            id
            owner {
                id
                email
                profilePicture
                username
                name
            }
        }
    }
`;

export const DELETE_REPLY_FROM_STORY = `
    mutation DeleteReplyFromStory($storyID:ID!,$email:String!,commentID:ID!){
        addCommentToStory(storyID:$storyID,email:$email,commentID:$commentID){
            id
            owner {
                id
                email
                profilePicture
                username
                name
            }
        }
    }
`;

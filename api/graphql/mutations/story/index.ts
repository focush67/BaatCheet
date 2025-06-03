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

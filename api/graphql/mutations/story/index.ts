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

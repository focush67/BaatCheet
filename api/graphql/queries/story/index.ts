export const GET_ALL_STORIES = `
    query fetchAllStories{
        getAllStories{
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
                }
            }

            comments {
                content
                owner {
                    username
                    email
                }
            }
        }
    }
`;

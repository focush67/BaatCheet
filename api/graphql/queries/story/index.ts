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

export const GET_STORIES_FOR_USER = `
    query getPersonalStories($email:String!){
        getStoriesForUser(email:$email){
            id    
            coverPhoto
            content

            likes {
                owner {
                    email,
                    bio
                    username,
                    profilePicture
                }
            }
            
            comments {
                owner {
                    email,
                    bio
                    username,
                    profilePicture
                }
            }
        }
    }
`;

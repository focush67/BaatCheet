export const UPDATE_USER_BY_EMAIL = `
  mutation UpdateUserByEmail($email: String!, $input: UpdateUserInput!) {
    updateUserByEmail(email: $email, input: $input) {
      id
      name
      profilePicture
      bio
      username
      email
    }
  }
`;

export const FOLLOW_USER = `
  mutation FollowUser($source:String!,$target:String!){
    followUser(source: $source, target: $target) {
      id
      name
      profilePicture
      bio
      username
      email
      following {
        id
        name
        profilePicture
        bio
        username
        email
      }
      followers {
        id
        name
        profilePicture
        bio
        username
        email
      }
    }
  }
`;

export const UNFOLLOW_USER = `
  mutation UnFollowUser($source:String!,$target:String!){
    unfollowUser(source: $source, target: $target) {
      id
      name
      profilePicture
      bio
      username
      email
      following {
        id
        name
        profilePicture
        bio
        username
        email
      }
      followers {
        id
        name
        profilePicture
        bio
        username
        email
      }
    }
  }
`;

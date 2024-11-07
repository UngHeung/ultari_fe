import {
  ContentTypes,
  ImageBase,
  OrderByTypes,
  OrderTypes,
  PostImagesProps,
  PostListProps,
  PostProps,
  PostsProps,
  ProfileProps,
  TeamListProps,
  TeamProps,
  UserBase,
  UserProps,
  UserPropsForPost,
  UserPropsForTeam,
  VisibilityTypes,
} from './common-interfaces';

/**
 * User initial values
 */
interface UserInitialProps {
  userBase: UserBase;
  user: UserProps;
  userForTeam: UserPropsForTeam;
  userForPost: UserPropsForPost;
}

export const userInitials: UserInitialProps = {
  userBase: {
    id: -1,
    name: '',
    role: 'ROLE_USER',
    path: '',
    community: '',
  },

  user: {
    id: -1,
    name: '',
    role: 'ROLE_USER',
    path: '',
    community: '',
    account: '',
    phone: '',
    email: '',
  },

  userForTeam: {
    id: -1,
    name: '',
    community: '',
    profile: undefined,
  },

  userForPost: {
    id: -1,
    name: '',
    profile: { id: -1, path: '' },
  },
};

/**
 * Team initial values
 */
interface TeamInitialProps {
  team: TeamProps;
  teamList: TeamListProps;
}

export const teamInitials: TeamInitialProps = {
  team: {
    id: -1,
    name: '',
    community: '',
    description: undefined,
    member: [],
    applicants: [],
    leader: userInitials.userForTeam,
    isActive: false,
    teamCode: '',
  },

  teamList: {
    id: -1,
    name: '',
    community: '',
    description: '',
    leader: userInitials.userForTeam,
    isActive: false,
  },
};

/**
 * Image initial values
 */
interface ImageInitialProps {
  imageBase: ImageBase;
  postImage: PostImagesProps;
  profile: ProfileProps;
}

export const imageInitials: ImageInitialProps = {
  imageBase: {
    id: -1,
    order: -1,
    path: '',
  },

  postImage: {
    id: -1,
    order: -1,
    path: '',
    post: { id: -1 },
  },

  profile: {
    id: -1,
    path: '',
  },
};

/**
 * Post initial values
 */
interface PostInitialProps {
  post: PostProps;
  posts: PostsProps;
}

export const postInitials: PostInitialProps = {
  post: {
    id: -1,
    author: { id: -1, name: '', profile: undefined },
    title: '',
    content: '',
    contentType: 'TYPE_FREE',
    visibility: 'SCOPE_PUBLIC',
    likeCount: 0,
    likers: [],
    viewCount: 0,
    images: [],
    comments: [],
    firstLoad: false,
  },

  posts: {
    id: -1,
    title: '',
    author: { id: -1, name: '', profile: undefined },
    likeCount: 0,
    viewCount: 0,
    firstLoad: false,
  },
};

interface PostListInitialProps {
  postList: PostListProps;
  order: OrderTypes;
  orderBy: OrderByTypes;
  contentType: ContentTypes;
  visibility: VisibilityTypes;
}

export const postListInitials: PostListInitialProps = {
  postList: {
    data: [],
    nextCursor: {
      id: -1,
      value: -1,
    },
  },

  order: 'id',
  orderBy: 'DESC',
  contentType: 'TYPE_FREE',
  visibility: 'SCOPE_PUBLIC',
};

/**
 * # 유저 관련 interface
 * 로그인시 반환받는 유저 정보
 */
export interface UserBase {
  id: number;
  name: string;
  role: RoleTypes;
  path: string; // profile path
  community: string;
}

export type RoleTypes =
  | 'ROLE_ADMIN'
  | 'ROLE_USER'
  | 'ROLE_SHEPHERD'
  | 'ROLE_SHEEP';
export type ContentTypes =
  | 'TYPE_FREE'
  | 'TYPE_SHARE'
  | 'TYPE_PRAYER'
  | 'TYPE_THANKS';
export type VisibilityTypes = 'SCOPE_PUBLIC' | 'SCOPE_TEAM' | 'SCOPE_PRIVATE';

/**
 * 유저 인증시 반환받는 유저 정보
 */
export interface UserProps extends UserBase {
  account: string;
  phone: string;
  email: string;
  profile?: ProfileProps;
  team?: Pick<TeamProps, 'id'>;
  lead?: Pick<TeamProps, 'id'>;
  subLead?: Pick<TeamProps, 'id'>;
  applyTeam?: Pick<TeamProps, 'id'>;
}

export interface UserPropsForTeam
  extends Pick<UserProps, 'id' | 'name' | 'profile' | 'community'> {}

export interface UserPropsForPost
  extends Pick<UserProps, 'id' | 'name' | 'profile'> {}

export interface ProfileProps {
  id: number;
  path: string;
}

/**
 * # 팀 관련 interface
 * 팀 상세 요청 시 반환받는 팀 정보
 */
export interface TeamProps {
  id: number;
  name: string;
  community: string;
  description?: string;

  member: UserPropsForTeam[];
  applicants: UserPropsForTeam[];
  leader: UserPropsForTeam;
  subleader?: UserPropsForTeam;
  isActive: boolean;
  teamCode: string;
}

/**
 * 팀 목록 요청 시 반환받는 팀 정보
 */
export interface TeamListProps
  extends Pick<
    TeamProps,
    'id' | 'name' | 'community' | 'description' | 'leader' | 'isActive'
  > {}

/**
 * 이미지 베이스
 */
export interface ImageBase {
  id: number;
  order: number;
  path: string;
}

/**
 * 댓글 베이스
 */
export interface CommentBase {
  id: number;
  content: string;
  writer: UserPropsForPost;
}

/**
 * 게시물 관련 interface
 * 게시물 상세 요청시 반환받는 게시물 정보
 */
export interface PostProps {
  id: number;
  author: UserPropsForPost;
  title: string;
  content: string;
  contentType: ContentTypes;
  visibility?: VisibilityTypes;
  likeCount: number;
  likers: Pick<UserProps, 'id'>[];
  viewCount: number;
  images: PostImagesProps[];
  comments: PostCommentsProps[];
  firstLoad?: boolean;
}

/**
 * 게시물 목록 요청시 반환받는 게시물 정보
 */
export interface PostsProps extends Partial<PostProps> {
  id: number;
  title: string;
  author: UserPropsForPost;
  likeCount: number;
  viewCount: number;
  firstLoad: boolean;
}

export interface PostImagesProps extends ImageBase {
  post: Pick<PostProps, 'id'>;
}

export interface PostCommentsProps extends CommentBase {
  post: Pick<PostProps, 'id'>;
}

/**
 * 게시물 목록 요청시 반환받는 게시물 목록 정보
 */
export interface PostListProps {
  data: PostsProps[];
  nextCursor: { id: number; value: number };
}

export type OrderTypes = 'id' | 'likes' | 'views';
export type OrderByTypes = 'DESC' | 'ASC';

import style from './styles/post.module.css';
import PostItem from './PostItem';
import { PostOptions } from './interfaces/postInterfaces';

const PostList = ({ posts }: { posts: PostOptions[] }) => {
  return (
    <ul className={style.postList}>
      {posts ? (
        posts.map((post: PostOptions, idx: number) => {
          return <PostItem {...post} key={idx} />;
        })
      ) : (
        <li>게시물이 없습니다.</li>
      )}
    </ul>
  );
};

export default PostList;

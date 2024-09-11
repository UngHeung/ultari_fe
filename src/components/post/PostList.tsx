import ListItem from './ListItem';
import { PostOptions } from './interfaces/postInterfaces';
import style from './styles/list.module.css';

const PostList = ({ posts }: { posts: PostOptions[] }) => {
  return (
    <ul className={style.postList}>
      {posts ? (
        posts.map((post: PostOptions, idx: number) => {
          return <ListItem {...post} key={idx} />;
        })
      ) : (
        <li>게시물이 없습니다.</li>
      )}
    </ul>
  );
};

export default PostList;

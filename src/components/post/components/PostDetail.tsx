// import Comment from '@/components/comments/components/Comment';
// import usePostStore, { PostStore } from '@/components/stores/post/postStore';
// import { useEffect } from 'react';
// import handleGetPost from '../handlers/handleGetPost';
// import style from '../styles/detail.module.css';
// import DetailContent from './DetailContent';
// import DetailLikeCount from './DetailLikeCount';

// const PostDetail = ({ postId }: { postId: number }) => {
//   const setPost = usePostStore((state: PostStore) => state.setPost);
//   const post = usePostStore((state: PostStore) => state.post);

//   useEffect(() => {
//     (async () => {
//       const { success, data } = await handleGetPost(postId);

//       if (success && post) {
//         setPost(data);
//       }
//     })();
//   }, []);

//   return (
//     <div className={style.detailWrap}>
//       {post && <DetailContent postData={post} />}
//       {post && <DetailLikeCount postData={post} />}
//       {post && post.comments && (
//         <Comment comments={post.comments} targetId={postId} />
//       )}
//     </div>
//   );
// };

// export default PostDetail;

import Comment from '@/components/comments/components/Comment';
import { PostState } from '@/components/stores/interfaces/stateInterface';
import { setPost } from '@/components/stores/reducer/postReducer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import handleGetPost from '../handlers/handleGetPost';
import DetailContent from './DetailContent';
import DetailLikeCount from './DetailLikeCount';

const PostDetail = ({ postId }: { postId: number }) => {
  const [postData, setPostData] = useState<PostState>();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { success, data } = await handleGetPost(postId);

      if (success) {
        setPostData(data);
        dispatch(setPost(postData));
      }
    })();
  }, []);

  return (
    <>
      {postData && <DetailContent postData={postData} />}
      {postData && <DetailLikeCount postData={postData} />}
      {postData && postData.comments && <Comment postData={postData} />}
    </>
  );
};

export default PostDetail;

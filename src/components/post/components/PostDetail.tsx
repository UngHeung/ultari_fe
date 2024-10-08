import { PostState } from '@/components/stores/interfaces/stateInterface';
import { useEffect, useState } from 'react';
import DetailLikeCount from './DetailLikeCount';
import DetailContent from './DetailContent';
import handleGetPost from '../handlers/handleGetPost';

const PostDetail = ({ postId }: { postId: number }) => {
  const [postData, setPostData] = useState<PostState>();

  useEffect(() => {
    (async () => {
      const { success, data } = await handleGetPost(postId);

      if (success) {
        setPostData(data);
      }
    })();
  }, []);

  return (
    <>
      {postData && <DetailContent postData={postData} />}
      {postData && <DetailLikeCount postData={postData} />}
    </>
  );
};

export default PostDetail;

'use client';

import { ParamsOptions } from '@/components/common/interfaces/paramsOptions';
import DetailLikeCount from '@/components/post/components/DetailLikeCount';
import handleGetPost from '@/components/post/handlers/handleGetPost';
import { PostState } from '@/components/stores/interfaces/stateInterface';
import { useEffect, useState } from 'react';
import Detail from '../../../../components/post/Detail';

const PostPage = ({ params }: ParamsOptions) => {
  const { id } = params;
  const [postData, setPostData] = useState<PostState>();

  useEffect(() => {
    (async () => {
      const { status, success, data } = await handleGetPost(id);

      if (success) {
        setPostData(data);
      }
    })();
  }, []);

  return (
    <>
      {postData && <Detail postData={postData} />}
      {postData && <DetailLikeCount postData={postData} />}
    </>
  );
};

export default PostPage;

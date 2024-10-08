'use client';

import { ParamsOptions } from '@/components/common/interfaces/paramsOptions';
import PostDetail from '@/components/post/components/PostDetail';

const PostPage = ({ params }: ParamsOptions) => {
  return (
    <>
      <PostDetail postId={params.id} />
    </>
  );
};

export default PostPage;

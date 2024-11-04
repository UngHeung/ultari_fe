import { ParamsOptions } from '@/components/common/interfaces/paramsOptions';
import PostDetail from '@/components/post/components/PostDetail';

const page = ({ params }: ParamsOptions) => {
  const postId = params.id;
  return (
    <>
      <PostDetail postId={postId} />
    </>
  );
};

export default page;

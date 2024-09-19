import { ParamsOptions } from '@/components/common/interfaces/paramsOptions';
import Detail from '../../../components/post/Detail';

const postPage = ({ params }: ParamsOptions) => {
  const postId = params[':id'];

  return (
    <>
      <Detail postId={postId} />
    </>
  );
};

export default postPage;

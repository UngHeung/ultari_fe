'use client';

import { ParamsOptions } from '@/components/common/interfaces/paramsOptions';
import DeletePost from '@/components/post/components/DeletePost';

const DeletePage = ({ params }: ParamsOptions) => {
  return (
    <>
      <DeletePost postId={params.id} />
    </>
  );
};

export default DeletePage;

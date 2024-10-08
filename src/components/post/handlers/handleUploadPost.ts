import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { FormEvent } from 'react';
import { PostWriteTypes } from '../interfaces/postInterfaces';
import { authAxios } from '@/apis/axiosInstance';

const handleUploadPost = async (
  event: FormEvent<HTMLFormElement>,
  type: PostWriteTypes,
  images?: string[],
  updatePostId?: number,
) => {
  const formData = new FormData(event.currentTarget);
  const title = formData.get('title');
  const content = formData.get('content');
  const visibility = formData.get('visibility');
  const contentType = formData.get('contentType');
  const data = { title, content, images, visibility, contentType };
  const url = `/post?${type === 'update' ? updatePostId : ''}`;

  try {
    const response =
      type === 'new'
        ? await authAxios.post(url, data)
        : await authAxios.patch(url, data);

    return makeResponseResult(
      response,
      `$게시물 ${type === 'new' ? '등록' : '수정'}`,
    );
  } catch (error: any) {
    return makeResponseResult(error);
  }
};

export default handleUploadPost;

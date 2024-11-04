'use server';

import { baseAxios } from '@/apis/axiosInstance';
import Comment from '@/components/comments/components/Comment';
import ImagesSlider from '@/components/common/components/ImagesSlider';
import { ParamsOptions } from '@/components/common/interfaces/paramsOptions';
import DetailLikeCount from '@/components/post/components/DetailLikeCount';
import mapContentType from '@/components/post/functions/mapContentType';
import mapVisibility from '@/components/post/functions/mapVisibility';
import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import style from '@/components/post/styles/detail.module.css';
import UserProfile from '@/components/user/components/UserProfile';
import { revalidatePath } from 'next/cache';

const page = async ({ params }: ParamsOptions) => {
  const postId = params.id;

  revalidatePath(`/post/detail/${postId}`, 'page');

  try {
    const response = await baseAxios.get(
      `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DB_HOST}/api/post/${postId}/detail`,
    );

    const postData: PostOptions = response.data;

    return (
      <section className={style.detailWrap}>
        <section className={style.head}>
          <h2 className={style.title}>{postData.title}</h2>
          <span className={style.type}>
            {`#${mapContentType(postData.contentType)}`}
          </span>
          <span className={style.visibility}>
            {`#${mapVisibility(postData.visibility)}`}
          </span>
          <div className={style.authorWrap}>
            <span>
              <UserProfile path={postData.author.profile?.path} size={25} />
            </span>
            <span>{postData.author.name}</span>
          </div>
        </section>

        <section className={style.main}>
          {postData.images && postData.images?.length > 0 && (
            <ImagesSlider folder={'post'} images={postData.images} />
          )}
          <pre className={style.content}>{postData?.content}</pre>
        </section>
        {postData && <DetailLikeCount postData={postData} />}
        <Comment comments={postData.comments} targetId={postId} />
      </section>
    );
  } catch (error: any) {
    <section>
      <h2>{'Not Found 404'}</h2>
    </section>;
  }
};

export default page;

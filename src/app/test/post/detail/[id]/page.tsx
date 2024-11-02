'use server';

import Comment from '@/components/comments/components/Comment';
import ImagesSlider from '@/components/common/components/ImagesSlider';
import { ParamsOptions } from '@/components/common/interfaces/paramsOptions';
import DetailLikeCount from '@/components/post/components/DetailLikeCount';
import mapContentType from '@/components/post/functions/mapContentType';
import mapVisibility from '@/components/post/functions/mapVisibility';
import { PostOptions } from '@/components/post/interfaces/postInterfaces';
import style from '@/components/post/styles/detail.module.css';
import UserProfile from '@/components/user/components/UserProfile';
import axios from 'axios';

const page = async ({ params }: ParamsOptions) => {
  const postId = params.id;

  try {
    const response = await axios.get(
      `http://${process.env.NEXT_PUBLIC_DB_HOST}/api/post/${postId}`,
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

        <section className={'content'}>
          <pre>{postData.content}</pre>
        </section>

        <section className={style.main}>
          {postData.images && postData.images?.length > 0 && (
            <ImagesSlider folder={'post'} images={postData.images} />
          )}
          <pre className={style.content}>{postData?.content}</pre>
        </section>
        {postData && <DetailLikeCount postData={postData} />}
        {postData && postData.comments && (
          <Comment comments={postData.comments} targetId={postId} />
        )}
      </section>
    );
  } catch (error: any) {
    console.log(error);
  }
};

export default page;

import style from './styles/post.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PostOptions } from './interfaces/postInterfaces';

const PostItem = (
  {
    id,
    title,
    content,
    visibility,
    type,
    likeCount,
    viewCount,
    author,
  }: PostOptions,
  key: number,
) => {
  const router = useRouter();

  return (
    <>
      <li key={key}>
        <Link href={`post/${id}`} className={style.postItem}>
          <section className={style.mainContentWrap}>
            <strong className={style.title}>{title}</strong>
            <p className={style.content}>{content}</p>
          </section>

          <section className={style.subContentWrap}>
            <div className={style.typesWrap}>
              <span className={style.visibility}>{visibility}</span>
              <span className={style.type}>{type}</span>
            </div>

            <div className={style.countsWrap}>
              <span className={style.likeCount}>{likeCount}</span>
              <span className={style.viewCount}>{viewCount}</span>
            </div>

            <strong className={style.author}>{author.name}</strong>
          </section>
        </Link>
      </li>
    </>
  );
};

export default PostItem;

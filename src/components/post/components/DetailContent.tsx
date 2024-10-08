import ImagesSlider from '../../common/ImagesSlider';
import { PostState } from '../../stores/interfaces/stateInterface';
import { getDate } from '../../team/TeamList';
import mapContentType from '../functions/mapContentType';
import mapVisibility from '../functions/mapVisibility';
import style from '../styles/detail.module.css';

const DetailContent = ({ postData }: { postData: PostState }) => {
  return (
    <>
      <section className={style.titleWrap}>
        <h2 className={style.title}>{postData?.title}</h2>
        <span>{mapContentType(postData?.contentType)}</span>
        <span>{mapVisibility(postData?.visibility)}</span>
        <span>{getDate(postData?.createAt)}</span>
      </section>
      <section className={style.contentWrap}>
        {postData && postData.images && (
          <ImagesSlider
            folder={'post'}
            images={postData.images}
            width={600}
            height={400}
          />
        )}
        <pre className={style.content}>{postData?.content}</pre>
      </section>
    </>
  );
};

export default DetailContent;

/*

<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_13_21)">
<path d="M9.99999 1.11108C7.19443 1.11108 4.9479 2.38886 3.31249 3.90969C1.68749 5.41664 0.600681 7.22219 0.086792 8.46178C-0.0277913 8.73608 -0.0277913 9.04164 0.086792 9.31594C0.600681 10.5555 1.68749 12.3611 3.31249 13.868C4.9479 15.3889 7.19443 16.6666 9.99999 16.6666C12.8055 16.6666 15.0521 15.3889 16.6875 13.868C18.3125 12.3576 19.3993 10.5555 19.9167 9.31594C20.0312 9.04164 20.0312 8.73608 19.9167 8.46178C19.3993 7.22219 18.3125 5.41664 16.6875 3.90969C15.0521 2.38886 12.8055 1.11108 9.99999 1.11108ZM4.99999 8.88886C4.99999 7.56278 5.52677 6.29101 6.46445 5.35333C7.40213 4.41565 8.6739 3.88886 9.99999 3.88886C11.3261 3.88886 12.5978 4.41565 13.5355 5.35333C14.4732 6.29101 15 7.56278 15 8.88886C15 10.2149 14.4732 11.4867 13.5355 12.4244C12.5978 13.3621 11.3261 13.8889 9.99999 13.8889C8.6739 13.8889 7.40213 13.3621 6.46445 12.4244C5.52677 11.4867 4.99999 10.2149 4.99999 8.88886ZM9.99999 6.66664C9.99999 7.89233 9.00346 8.88886 7.77776 8.88886C7.53124 8.88886 7.29513 8.84719 7.0729 8.77428C6.88193 8.71178 6.65971 8.82983 6.66665 9.03122C6.67707 9.27081 6.71179 9.51039 6.77776 9.74997C7.25346 11.5278 9.08332 12.5833 10.8611 12.1076C12.6389 11.6319 13.6944 9.80206 13.2187 8.02428C12.8333 6.58331 11.559 5.61456 10.1423 5.55553C9.94096 5.54858 9.8229 5.76733 9.8854 5.96178C9.95832 6.184 9.99999 6.42011 9.99999 6.66664Z" fill="#6A6A6A"/>
</g>
<defs>
<clipPath id="clip0_13_21">
<rect width="20" height="17.7778" fill="white"/>
</clipPath>
</defs>
</svg>

 */

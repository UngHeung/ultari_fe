// 'use client';

// import ImagesSlider from '@/components/common/components/ImagesSlider';
// import useMenuBoxChildStore, {
//   MenuBoxChildStore,
// } from '@/components/stores/common/menuboxChildrenStore';
// import UserProfile from '@/components/user/components/UserProfile';
// import { useEffect } from 'react';
// import { PostState } from '../../stores/interfaces/stateInterface';
// import mapContentType from '../functions/mapContentType';
// import mapVisibility from '../functions/mapVisibility';
// import style from '../styles/detail.module.css';
// import InnerNav from './InnerNav';

// const DetailContent = ({ postData }: { postData: PostState }) => {
//   const setMenuBox = useMenuBoxChildStore(
//     (state: MenuBoxChildStore) => state.setChild,
//   );
//   const resetMenuBox = useMenuBoxChildStore(
//     (state: MenuBoxChildStore) => state.resetChild,
//   );

//   useEffect(() => {
//     setMenuBox(<InnerNav type={'detail'} postData={postData} />);

//     return () => {
//       resetMenuBox();
//     };
//   }, []);

//   return (
//     <>
//       <section className={style.head}>
//         <h2 className={style.title}>{postData?.title}</h2>
//         <span className={style.type}>
//           {`#${mapContentType(postData?.contentType)}`}
//         </span>
//         <span className={style.visibility}>
//           {`#${mapVisibility(postData?.visibility)}`}
//         </span>
//         <div className={style.authorWrap}>
//           <span>
//             <UserProfile path={postData.author.profile?.path} size={25} />
//           </span>
//           <span>{postData?.author.name}</span>
//         </div>
//       </section>

//       <section className={style.main}>
//         {postData.images && postData.images?.length > 0 && (
//           <ImagesSlider folder={'post'} images={postData.images} />
//         )}
//         <pre className={style.content}>{postData?.content}</pre>
//       </section>
//     </>
//   );
// };

// export default DetailContent;

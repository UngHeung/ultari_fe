import defaultProfile from '@/public/images/profile_default.png';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import ImageInput from '../post/elements/ImageInput';
import { SliceOptions } from '../stores/interfaces/stateInterface';
import style from './styles/update.module.css';

const ProfileUpload = () => {
  const path = useSelector((state: SliceOptions) => state.user.path);

  const defaultMyProfileImage = path
    ? `${process.env.NEXT_PUBLIC_BUCKET_HOST}/${process.env.NEXT_PUBLIC_BUCKET_NAME}/public/images/profile/${path}`
    : '';

  const [profileImage, setProfileImage] = useState<string>(
    defaultMyProfileImage,
  );

  function toggleImageBlob(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    if (file) {
      const selectedImage = window.URL.createObjectURL(file);
      setProfileImage(selectedImage);
    }
  }

  return (
    <section className={style.updateInputWrap}>
      <ImageInput
        useLabel={true}
        isMultiple={false}
        labelStyleClass={style.selectButton}
        labelValue={
          <Image
            src={profileImage.length ? profileImage : defaultProfile}
            alt="프로필 기본"
            width={50}
            height={50}
          />
        }
        name={'profile'}
        id={'imageUpload'}
        accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
        onChange={toggleImageBlob}
      />
    </section>
  );
};

export default ProfileUpload;

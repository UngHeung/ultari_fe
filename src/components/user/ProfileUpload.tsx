import defaultProfile from '@/public/images/profile_default.png';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import ImageInput from '../post/elements/ImageInput';
import style from './styles/update.module.css';

const ProfileUpload = ({ currentProfile }: { currentProfile?: string }) => {
  const [selectedImageBlob, setSelectedImageBlob] = useState<string>('');

  function toggleImageBlob(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    if (file) {
      const selectedImage = window.URL.createObjectURL(file);
      setSelectedImageBlob(selectedImage);
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
            src={
              selectedImageBlob
                ? selectedImageBlob
                : currentProfile
                  ? currentProfile
                  : defaultProfile
            }
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

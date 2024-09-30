import defaultProfile from '@/public/images/profile_default.png';
import Image from 'next/image';
import React, { ChangeEvent, SetStateAction, useState } from 'react';
import ImageInput from '../post/elements/ImageInput';
import style from './styles/update.module.css';

const ProfileUpload = ({ currentProfile }: { currentProfile?: string }) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedImageBlob, setSelectedImageBlob] = useState<string>('');

  return (
    <section className={style.fileInputWrap}>
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
        onChange={event => {
          handleImageBlob(
            event,
            selectedFile!,
            setSelectedFile,
            setSelectedImageBlob,
          );
        }}
      />
    </section>
  );
};

export default ProfileUpload;

function handleImageBlob(
  event: ChangeEvent<HTMLInputElement>,
  selectedFile: File,
  setSelectedFile: React.Dispatch<File>,
  setSelectedImageBlob: React.Dispatch<SetStateAction<string>>,
) {
  event.preventDefault();

  if (!event.target.files) {
    return;
  }

  const file = event.target.files[0];

  if (file) {
    setSelectedFile(file);

    const selectedImage = window.URL.createObjectURL(file);
    setSelectedImageBlob(selectedImage);
  }
}

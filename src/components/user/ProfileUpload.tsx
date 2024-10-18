import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import ImageInput from '../post/elements/ImageInput';
import { SliceOptions } from '../stores/interfaces/stateInterface';
import UserProfile from './components/UserProfile';
import style from './styles/update.module.css';

const ProfileUpload = () => {
  const path = useSelector((state: SliceOptions) => state.user.path);

  const [profileImage, setProfileImage] = useState<string>(path ?? '');

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
        labelValue={<UserProfile path={profileImage} />}
        name={'profile'}
        id={'imageUpload'}
        accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
        onChange={toggleImageBlob}
      />
    </section>
  );
};

export default ProfileUpload;

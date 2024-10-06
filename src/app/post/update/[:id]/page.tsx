'use client';

import ImageUploadForm from '@/components/post/ImageUploadForm';
import WriteForm from '@/components/post/WriteForm';
import { useState } from 'react';

const UpdatePage = () => {
  const [selectedFilenames, setSelectedFilenames] = useState<string[]>([]);

  return (
    <>
      <ImageUploadForm setSelectedFilenames={setSelectedFilenames} />
      <WriteForm type={'update'} selectedFilenames={selectedFilenames} />
    </>
  );
};

export default UpdatePage;

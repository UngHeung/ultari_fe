'use client';

import ImageUploadForm from '@/components/post/ImageUploadForm';
import WriteForm from '@/components/post/WriteForm';
import { useState } from 'react';

const WritePage = () => {
  const [selectedFilenames, setSelectedFilenames] = useState<string[]>([]);

  return (
    <>
      <ImageUploadForm setSelectedFilenames={setSelectedFilenames} />
      <WriteForm type={'new'} selectedFilenames={selectedFilenames} />
    </>
  );
};

export default WritePage;

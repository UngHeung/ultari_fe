'use client';

import ImageUploadForm from '@/components/post/components/ImageUploadForm';
import WriteForm from '@/components/post/components/PostWriteForm';
import { useState } from 'react';

const UpdatePage = () => {
  return (
    <>
      <WriteForm type={'update'} />
    </>
  );
};

export default UpdatePage;

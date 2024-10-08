import { ChangeEvent, SetStateAction } from 'react';

function handleImageBlob(
  event: ChangeEvent<HTMLInputElement>,
  selectedFiles: File[],
  setSelectedFiles: React.Dispatch<File[]>,
  setSelectedImageBlob: React.Dispatch<SetStateAction<string[]>>,
) {
  event.preventDefault();

  const files = event.target.files;

  if (files) {
    if (files.length > 5) {
      return;
    } else {
      setSelectedFiles([...(selectedFiles ?? []), ...Array.from(files)]);

      for (const file of files) {
        const selectedImage = window.URL.createObjectURL(file);
        setSelectedImageBlob(prevFiles => [...prevFiles, selectedImage]);
      }
    }
  }
}

export default handleImageBlob;

import Image from 'next/image';

const ImageBlobItem = ({
  image,
  idx,
  className,
  selectedImageBlobs,
  setSelectedImageBlobs,
  selectedFiles,
  setSelectedFiles,
  readOnly,
}: {
  image: string;
  idx: number;
  className: string;
  selectedImageBlobs: string[];
  setSelectedImageBlobs: React.Dispatch<string[]>;
  selectedFiles: File[] | undefined;
  setSelectedFiles: React.Dispatch<File[]>;
  readOnly: boolean;
}) => {
  function selectedItemRemoveProcess() {
    setSelectedImageBlobs(selectedImageBlobs.filter((_, id) => id !== idx));
    setSelectedFiles(selectedFiles!.filter((_, id) => id !== idx));
  }

  return (
    <li className={className}>
      <button
        type={'button'}
        onClick={selectedItemRemoveProcess}
        disabled={readOnly}
      >
        <Image src={image} alt={'선택된 이미지'} width={80} height={80}></Image>
      </button>
    </li>
  );
};

export default ImageBlobItem;

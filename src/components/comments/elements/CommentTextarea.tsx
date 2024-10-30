import BaseTextarea from '@/components/common/elements/BaseTextarea';
import { BaseTextareaOptions } from '@/components/common/interfaces/baseElementsInterfaces';

interface CommentTextareaOptions extends BaseTextareaOptions {}

const CommentTextarea = ({
  id,
  name,
  setValue,
  value,
  placeholder,
}: CommentTextareaOptions) => {
  return (
    <BaseTextarea
      id={id}
      rows={1}
      name={name}
      setValue={setValue}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default CommentTextarea;

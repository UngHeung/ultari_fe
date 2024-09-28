import style from './styles/mypage.module.css';

const SecretInfoItem = ({
  name,
  value,
}: {
  name: string;
  value: string | undefined;
}) => {
  return (
    <div className={`${style.secretItem} ${!value && style.isBlurred}`}>
      <span>{name}</span>
      <strong>{value}</strong>
    </div>
  );
};

export default SecretInfoItem;

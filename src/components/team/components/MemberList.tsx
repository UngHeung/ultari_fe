import UserProfile from '@/components/user/components/UserProfile';
import { UserOptions } from '../../auth/interfaces/authInterface';
import style from '../styles/teamDetail.module.css';

const MemberList = ({ member }: { member?: UserOptions[] }) => {
  return (
    <ul className={style.memberList}>
      {member ? (
        member.map((member, idx) => {
          return (
            <li key={idx}>
              <div className={style.profileWrap}>
                <UserProfile path={member?.profile?.path} size={25} />
                <span className={style.memberName}>{member.name}</span>
              </div>
            </li>
          );
        })
      ) : (
        <li>{'목장원이 없습니다.'}</li>
      )}
    </ul>
  );
};

export default MemberList;

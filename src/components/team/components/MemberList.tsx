import defaultProfile from '@/public/images/profile_default.png';
import Image from 'next/image';
import style from '../styles/teamDetail.module.css';
import { UserOptions } from '../../auth/interfaces/authInterface';

const MemberList = ({ member }: { member?: UserOptions[] }) => {
  return (
    <ul className={style.memberList}>
      {member ? (
        member.map((member, idx) => {
          return (
            <li key={idx}>
              <div className={style.profileWrap}>
                <span className={style.memberProfile}>
                  <Image
                    src={member?.profile?.path ?? defaultProfile}
                    alt={'목장원_프로필'}
                    width={25}
                    height={25}
                  />
                </span>
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

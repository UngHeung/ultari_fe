import { TeamOptioins } from '@/app/team/detail/[:id]/page';
import Image from 'next/image';
import style from './styles/teamDetail.module.css';
import defaultProfile from '@/public/images/profile_default.png';

const TeamDetail = (props: TeamOptioins) => {
  return (
    <section className={style.detailWrap}>
      <section className={style.titleWrap}>
        <h2 className={style.teamName}>{props.name}</h2>
        <p className={style.teamDescription}>{props.description}</p>
      </section>

      <section className={style.memberListWrap}>
        <section className={style.leaderWrap}>
          <h3 className={style.subTitle}>목자</h3>
          <div className={style.profileWrap}>
            <span className={style.leaderProfile}>
              <Image
                src={props.leader?.profile ?? defaultProfile}
                alt={'목자_프로필'}
                width={30}
                height={30}
              />
            </span>
            <span className={style.leaderName}>{props.leader?.name}</span>
          </div>
        </section>

        <section className={style.subLeaderWrap}>
          <h3 className={style.subTitle}>부목자</h3>
          <div className={style.profileWrap}>
            <span className={style.leaderProfile}>
              <Image
                src={props.subLeader?.profile ?? defaultProfile}
                alt={'부목자_프로필'}
                width={30}
                height={30}
              />
            </span>
            <span className={style.subLeaderName}>
              {props.subLeader?.name ?? '부목자가 임명되지 않았습니다.'}
            </span>
          </div>
        </section>

        <section className={style.memberWrap}>
          <h3 className={style.subTitle}>목장원</h3>
          <ul className={style.memberList}>
            {props.member ? (
              props.member.map((member, idx) => {
                return (
                  <li key={idx}>
                    <div className={style.profileWrap}>
                      <span className={style.memberProfile}>
                        <Image
                          src={member?.profile ?? defaultProfile}
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
        </section>
      </section>
    </section>
  );
};

export default TeamDetail;

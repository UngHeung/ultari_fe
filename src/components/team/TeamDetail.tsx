import { TeamOptioins } from '@/app/team/detail/[:id]/page';
import style from './styles/teamDetail.module.css';

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
          <span className={style.leaderName}>{props.leader?.name}</span>
        </section>

        <section className={style.subLeaderWrap}>
          <h3 className={style.subTitle}>부목자</h3>
          <span className={style.subLeaderName}>
            {props.subLeader?.name ?? '부목자가 임명되지 않았습니다.'}
          </span>
        </section>

        <section className={style.memberWrap}>
          <h3 className={style.subTitle}>목장원</h3>
          <ul className={style.memberList}>
            {props.member ? (
              props.member.map((member, idx) => {
                return <li key={idx}>{member.name}</li>;
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

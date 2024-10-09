import defaultProfile from '@/public/images/profile_default.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserOptions } from '../../auth/interfaces/authInterface';
import MemberList from './MemberList';
import { ModalState } from '../../stores/interfaces/stateInterface';
import { setModal } from '../../stores/reducer/modalRducer';
import handleGetTeamById from '../handlers/handleGetTeamById';
import style from '../styles/teamDetail.module.css';

export interface TeamOptioins {
  id: number;
  name: string;
  community: string;
  description?: string;
  member: UserOptions[];
  leader: UserOptions;
  subLeader: UserOptions;
  active: boolean;
  createAt?: string;
  updateAt?: string;
}

const TeamDetail = ({ teamId }: { teamId: number }) => {
  const [teamData, setTeamData] = useState<TeamOptioins>();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { success, data, message } = await handleGetTeamById(teamId);

      if (success) {
        setTeamData(data);
      } else {
        const modalData: ModalState = {
          title: '에러',
          success,
          type: 'alert',
          routerType: 'back',
          message: message!,
          modalIsShow: true,
        };

        dispatch(setModal(modalData));
      }
    })();
  }, []);

  return (
    <section className={style.detailWrap}>
      <section className={style.titleWrap}>
        <h2 className={style.teamName}>{teamData?.name}</h2>
        <p className={style.teamDescription}>{teamData?.description}</p>
      </section>

      <section className={style.memberListWrap}>
        <section className={style.leaderWrap}>
          <h3 className={style.subTitle}>목자</h3>
          <div className={style.profileWrap}>
            <span className={style.leaderProfile}>
              <Image
                src={teamData?.leader.profile ?? defaultProfile}
                alt={'목자_프로필'}
                width={30}
                height={30}
              />
            </span>
            <span className={style.leaderName}>{teamData?.leader.name}</span>
          </div>
        </section>

        <section className={style.subLeaderWrap}>
          <h3 className={style.subTitle}>부목자</h3>
          <div className={style.profileWrap}>
            <span className={style.leaderProfile}>
              <Image
                src={teamData?.subLeader?.profile ?? defaultProfile}
                alt={'부목자_프로필'}
                width={30}
                height={30}
              />
            </span>
            <span
              className={style.subLeaderName}
              style={{
                fontSize: !teamData?.subLeader?.name
                  ? 'var(--font-size-content)'
                  : 'var(--font-size-sub-title)',
              }}
            >
              {teamData?.subLeader?.name ?? '부목자가 임명되지 않았습니다.'}
            </span>
          </div>
        </section>

        <section className={style.memberWrap}>
          <h3 className={style.subTitle}>목장원</h3>
          <MemberList member={teamData?.member} />
        </section>
      </section>
    </section>
  );
};

export default TeamDetail;
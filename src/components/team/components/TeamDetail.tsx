import {
  defaultProfile,
  profilePath,
} from '@/components/common/constants/pathConst';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserOptions } from '../../auth/interfaces/authInterface';
import { ModalState } from '../../stores/interfaces/stateInterface';
import { setModal } from '../../stores/reducer/modalRducer';
import JoinTeamButton from '../elements/JoinTeamButton';
import TeamButton from '../elements/TeamButton';
import handleGetTeamById from '../handlers/handleGetTeamById';
import style from '../styles/teamDetail.module.css';
import MemberList from './MemberList';

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
  const dispatch = useDispatch();
  const router = useRouter();

  const [teamData, setTeamData] = useState<TeamOptioins>();

  async function teamDetailProcess() {
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
  }

  useEffect(() => {
    teamDetailProcess();
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
                src={
                  teamData?.leader.profile?.path
                    ? `${profilePath}/${teamData?.leader?.profile.path}`
                    : defaultProfile
                }
                width={30}
                height={30}
                alt={'목자_프로필'}
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
                src={
                  teamData?.subLeader?.profile?.path
                    ? `${profilePath}/${teamData?.subLeader?.profile.path}`
                    : defaultProfile
                }
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

      <section className={style.buttonWrap}>
        <JoinTeamButton teamId={teamData?.id} />
        <TeamButton type={'button'} value={'취소'} onClick={router.back} />
      </section>
    </section>
  );
};

export default TeamDetail;

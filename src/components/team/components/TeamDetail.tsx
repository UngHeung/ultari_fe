import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import useUserStore, { UserStore } from '@/components/stores/user/userStore';
import UserProfile from '@/components/user/components/UserProfile';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserOptions } from '../../auth/interfaces/authInterface';
import { ModalState } from '../../stores/interfaces/stateInterface';
import JoinTeamButton from '../elements/JoinTeamButton';
import TeamButton from '../elements/TeamButton';
import handleGetTeamById from '../handlers/handleGetTeamById';
import style from '../styles/teamDetail.module.css';
import JoinTeamApplicantList from './JoinTeamApplicantList';
import MemberList from './MemberList';

export interface TeamOptioins {
  id: number;
  name: string;
  community: string;
  description?: string;
  member: UserOptions[];
  applicants: UserOptions[];
  leader: UserOptions;
  subLeader: UserOptions;
  active: boolean;
  createAt?: string;
  updateAt?: string;
}

const TeamDetail = ({ teamId }: { teamId: number }) => {
  const router = useRouter();

  const [teamData, setTeamData] = useState<TeamOptioins>();
  const [memberList, setMemberList] = useState<UserOptions[]>([]);
  const [applicantList, setApplicantList] = useState<UserOptions[]>([]);

  const userId = useUserStore((state: UserStore) => state.user.id);
  const setModal = useModalStore((state: ModalStore) => state.setModal);

  async function teamDetailProcess() {
    const { success, data, message } = await handleGetTeamById(teamId);

    if (success) {
      setTeamData(data);
      setMemberList(data.member ?? []);
      setApplicantList(data.applicants ?? []);
    } else {
      const modalData: ModalState = {
        title: '에러',
        success,
        type: 'alert',
        routerType: 'back',
        message: message!,
        modalIsShow: true,
      };

      setModal(modalData);
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
            <UserProfile path={teamData?.leader.profile?.path} size={30} />
            <span className={style.leaderName}>{teamData?.leader.name}</span>
          </div>
        </section>

        <section className={style.subLeaderWrap}>
          <h3 className={style.subTitle}>부목자</h3>
          <div className={style.profileWrap}>
            <span className={style.leaderProfile}>
              <UserProfile
                path={teamData?.subLeader?.profile?.path}
                size={30}
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
          <h3 className={style.subTitle}>
            {`목장원(${teamData?.member.length})`}
          </h3>
          <MemberList member={memberList} />
        </section>
      </section>

      {teamData && (
        <JoinTeamApplicantList
          teamData={teamData}
          applicantList={applicantList!}
          setApplicantList={setApplicantList!}
          setMemberList={setMemberList}
        />
      )}

      <section className={style.buttonWrap}>
        {(userId !== teamData?.leader.id ||
          userId !== teamData?.subLeader?.id) && (
          <JoinTeamButton
            teamId={teamData?.id}
            setApplicantList={setApplicantList!}
          />
        )}
        <TeamButton type={'button'} value={'뒤로가기'} onClick={router.back} />
      </section>
    </section>
  );
};

export default TeamDetail;

import { authAxios } from '@/apis/axiosInstance';
import { UserOptions } from '@/components/auth/interfaces/authInterface';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { ModalState } from '@/components/stores/interfaces/stateInterface';
import useModalStore, {
  ModalStore,
} from '@/components/stores/modal/modalStore';
import useUserStore, { UserStore } from '@/components/stores/user/userStore';
import UserProfile from '@/components/user/components/UserProfile';
import modalSuccess from '@/public/images/modal_success.png';
import Image from 'next/image';
import React, { SetStateAction, useState } from 'react';
import TeamButton from '../elements/TeamButton';
import style from '../styles/joinTeamApplicant.module.css';
import { TeamOptioins } from './TeamDetail';

const JoinTeamApplicantItem = ({
  setApplicantList,
  setMemberList,
  applicant,
  teamData,
}: {
  setApplicantList: React.Dispatch<SetStateAction<UserOptions[]>>;
  setMemberList: React.Dispatch<SetStateAction<UserOptions[]>>;
  applicant: UserOptions;
  teamData: TeamOptioins;
}) => {
  const setModal = useModalStore((state: ModalStore) => state.setModal);
  const connectorId = useUserStore((state: UserStore) => state.user.id);

  const [disabled, setDisabled] = useState<boolean>(false);

  async function approveOrDisapproveProcess(isApprove: boolean) {
    const { success, message } = await handleApproveOrDisApprove(
      isApprove,
      teamData.id,
      applicant.id,
    );

    setDisabled(true);

    const modalData: ModalState = {
      type: 'alert',
      message,
      success,
      routerType: undefined,
      modalIsShow: true,
    };

    if (success) {
      if (isApprove) {
        modalData.message = '가입 승인 완료';
        setMemberList(prevList => [...prevList, applicant]);
      } else {
        modalData.message = `${connectorId === applicant.id ? '신청 취소' : '거절'} 완료`;
      }

      setApplicantList(prevList =>
        prevList.filter(user => user.id !== applicant.id),
      );
    }

    setModal(modalData);

    setDisabled(false);
  }

  async function handleApproveOrDisApprove(
    type: boolean,
    teamId: number,
    userId: number,
  ) {
    const url = type ? '/team/member/sign' : `/user/team/cancel/${userId}`;
    const data = {
      userId,
      teamId,
    };

    try {
      const response = await authAxios.put(url, data);

      return makeResponseResult(response, '가입승인여부');
    } catch (error: any) {
      return makeResponseResult(error);
    }
  }

  return (
    <>
      <UserProfile path={applicant.profile?.path} size={25} />
      <strong>{applicant.name}</strong>
      <span>{applicant.community}</span>
      <section className={style.buttonWrap}>
        {teamData.leader.id === connectorId && (
          <TeamButton
            type={'button'}
            value={approveImage}
            onClick={() => approveOrDisapproveProcess(true)}
            disabled={disabled}
          />
        )}
        {(teamData.leader.id === connectorId ||
          connectorId === applicant.id) && (
          <TeamButton
            type={'button'}
            value={disapprovedImage}
            onClick={() => approveOrDisapproveProcess(false)}
            disabled={disabled}
          />
        )}
      </section>
    </>
  );
};

export default JoinTeamApplicantItem;

const approveImage = (
  <Image
    src={modalSuccess}
    className={style.approve}
    width={15}
    height={15}
    sizes={'100%'}
    alt={'승인'}
    style={{ objectPosition: '0px' }}
  />
);

const disapprovedImage = (
  <Image
    src={modalSuccess}
    className={style.approve}
    width={15}
    height={15}
    sizes={'100%'}
    alt={'거절'}
    style={{ objectPosition: '-15px' }}
  />
);

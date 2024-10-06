'use client';

import { UserOptions } from '@/components/auth/interfaces/authInterface';
import { ParamsOptions } from '@/components/common/interfaces/paramsOptions';
import { ModalState } from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import handleGetTeamById from '@/components/team/handlers/handleGetTeamById';
import TeamDetail from '@/components/team/TeamDetail';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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

const TeamPage = ({ params }: ParamsOptions) => {
  const { id } = params;

  const [teamData, setTeamData] = useState<TeamOptioins>();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status, success, data, message } = await handleGetTeamById(id);

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
    <>
      <TeamDetail {...teamData!} />
    </>
  );
};

export default TeamPage;

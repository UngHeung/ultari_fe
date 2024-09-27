'use client';

import { authAxios } from '@/apis/axiosAuth';
import { UserOptions } from '@/components/auth/interfaces/authInterface';
import { BASE_URL } from '@/components/common/constants/pathConst';
import { ParamsOptions } from '@/components/common/interfaces/paramsOptions';
import { ModalState } from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
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

const TeamMainPage = ({ params }: ParamsOptions) => {
  const teamId = params[':id'];

  const [teamData, setTeamData] = useState<TeamOptioins>();

  const dispatch = useDispatch();

  async function handleGetTeamById(teamId: number) {
    const url = `${BASE_URL}/team/${teamId}`;

    try {
      const response = await authAxios.get(url);
      return {
        status: response.status,
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        status: error.status,
        success: false,
        message: error.response.data.message,
      };
    }
  }

  useEffect(() => {
    (async () => {
      const { status, success, data, message } =
        await handleGetTeamById(teamId);

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

export default TeamMainPage;

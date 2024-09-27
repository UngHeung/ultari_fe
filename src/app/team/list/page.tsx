'use client';

import { authAxios } from '@/apis/axiosAuth';
import { BASE_URL } from '@/components/common/constants/pathConst';
import TeamList from '@/components/team/TeamList';
import { useEffect, useState } from 'react';
import { TeamOptioins } from '../detail/[:id]/page';
import { useDispatch } from 'react-redux';
import { ModalState } from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';

const TeamListPage = () => {
  const [teamList, setTeamList] = useState<TeamOptioins[]>([]);
  const dispatch = useDispatch();

  async function handleGetTeamList() {
    const url = `${BASE_URL}/team`;

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
      const { status, success, data, message } = await handleGetTeamList();
      if (success) {
        setTeamList([...(data || [])]);
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
      <TeamList teamList={teamList} />
    </>
  );
};

export default TeamListPage;

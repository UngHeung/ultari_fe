'use client';

import { authAxios } from '@/apis/axiosAuth';
import { ModalState } from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import TeamList from '@/components/team/TeamList';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TeamOptioins } from '../detail/[id]/page';

const TeamListPage = () => {
  const [teamList, setTeamList] = useState<TeamOptioins[]>([]);
  const dispatch = useDispatch();

  async function handleGetTeamList() {
    const url = `/team`;

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
        message: error.response?.data.message ?? '서버에 에러 발생',
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

'use client';

import { authAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { ModalState } from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import TeamList from '@/components/team/TeamList';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TeamOptioins } from '../detail/[id]/page';

const TeamListPage = () => {
  const [teamList, setTeamList] = useState<TeamOptioins[]>([]);
  const dispatch = useDispatch();

  async function teamListProcess() {
    try {
      const response = await authAxios.get('/team');

      return makeResponseResult(response);
    } catch (error: any) {
      return makeResponseResult(error);
    }
  }

  useEffect(() => {
    (async () => {
      const { success, data, message } = await teamListProcess();
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

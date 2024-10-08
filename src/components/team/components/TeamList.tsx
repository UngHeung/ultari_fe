import Link from 'next/link';
import style from '../styles/teamList.module.css';
import { TeamOptioins } from './TeamDetail';
import { authAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { ModalState } from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const TeamList = () => {
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
    <ul className={style.list}>
      {teamList.length ? (
        teamList.map((team, idx) => {
          const createAt = getDate(team.createAt!, 'y-m-d');

          return (
            <li key={idx} className={style.listItem}>
              <Link href={`detail/${team.id}`}>
                <div>
                  <strong className={style.teamName}>{team.name}</strong>
                  <span className={style.teamCommunity}>{team.community}</span>
                  <span className={style.teamCreateAt}>{createAt}</span>
                  <span
                    className={style.teamLeader}
                  >{`목자 : ${team.leader.name}`}</span>
                </div>
              </Link>
            </li>
          );
        })
      ) : (
        <li>목장이 없습니다.</li>
      )}
    </ul>
  );
};

export function getDate(dateData: string, type?: 'y-m-d' | 'y-m-d h:m:s') {
  if (!dateData) return;

  const [date, time] = dateData.toString().split('T');

  if (type === 'y-m-d') {
    return date;
  }

  return `${date} ${time.split('.')[0]}`;
}

export default TeamList;

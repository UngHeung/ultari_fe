import Link from 'next/link';
import { useEffect, useState } from 'react';
import handleTeamList from '../handlers/handleTeamList';
import style from '../styles/teamList.module.css';
import { TeamOptioins } from './TeamDetail';

const TeamList = () => {
  const [teamList, setTeamList] = useState<TeamOptioins[]>([]);

  useEffect(() => {
    teamListProcess();
  }, []);

  async function teamListProcess() {
    const { data } = await handleTeamList();

    setTeamList([...(data || [])]);
  }

  return (
    <ul className={style.list}>
      {teamList?.length ? (
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

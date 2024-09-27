import { TeamOptioins } from '@/app/team/detail/[:id]/page';
import style from './styles/teamList.module.css';

const TeamList = ({ teamList }: { teamList: TeamOptioins[] }) => {
  return (
    <ul className={style.list}>
      {teamList.length ? (
        teamList.map((team, idx) => {
          const createAt = getDate(team.createAt!, 'y-m-d');

          return (
            <li key={idx} className={style.listItem}>
              <strong className={style.teamName}>{team.name}</strong>
              <span className={style.teamCommunity}>{team.community}</span>
              <span className={style.teamCreateAt}>{createAt}</span>
              <span
                className={style.teamLeader}
              >{`목자 : ${team.leader.name}`}</span>
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

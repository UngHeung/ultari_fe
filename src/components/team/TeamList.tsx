import { TeamOptioins } from '@/app/team/detail/[:id]/page';
import style from './styles/teamList.module.css';

const TeamList = ({ teamList }: { teamList: TeamOptioins[] }) => {
  return (
    <ul className={style.list}>
      {teamList.length ? (
        teamList.map((team, idx) => {
          return (
            <li key={idx} className={style.listItem}>
              <strong>{team.name}</strong>
              <span>{team.community}</span>
              <span>{team.leader.name}</span>
              <span>{getDate(team.createAt!, 'y-m-d')}</span>
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

'use client';

import { UserOptions } from '@/components/auth/interfaces/authInterface';
import { SetStateAction } from 'react';
import style from '../styles/joinTeamApplicant.module.css';
import JoinTeamApplicantItem from './JoinTeamApplicantItem';
import { TeamOptioins } from './TeamDetail';

const JoinTeamApplicantList = ({
  teamData,
  applicantList,
  setApplicantList,
  setMemberList,
}: {
  teamData: TeamOptioins;
  applicantList: UserOptions[];
  setApplicantList: React.Dispatch<SetStateAction<UserOptions[]>>;
  setMemberList: React.Dispatch<SetStateAction<UserOptions[]>>;
}) => {
  return (
    <section>
      <h3 className={style.title}>{`가입신청자(${applicantList.length})`}</h3>
      <ul className={style.applicantList}>
        {applicantList.length > 0 ? (
          applicantList.map((applicant, idx) => {
            return (
              <li className={style.applicantItem} key={idx}>
                {
                  <JoinTeamApplicantItem
                    setApplicantList={setApplicantList}
                    setMemberList={setMemberList}
                    applicant={applicant}
                    teamData={teamData}
                  />
                }
              </li>
            );
          })
        ) : (
          <li>신청자가 없습니다.</li>
        )}
      </ul>
    </section>
  );
};

export default JoinTeamApplicantList;

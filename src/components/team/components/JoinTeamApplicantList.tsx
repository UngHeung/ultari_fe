'use client';

import { authAxios } from '@/apis/axiosInstance';
import { UserOptions } from '@/components/auth/interfaces/authInterface';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { useEffect, useState } from 'react';
import style from '../styles/joinTeamApplicant.module.css';
import JoinTeamApplicantItem from './JoinTeamApplicantItem';

const JoinTeamApplicantList = ({ teamId }: { teamId: number }) => {
  const [applicantList, setApplicantList] = useState<UserOptions[]>([]);

  useEffect(() => {
    joinTeamApplicantsProcess();
  }, []);

  async function joinTeamApplicantsProcess() {
    const { success, message, data } = await handleApplyTeamList(teamId);

    if (!success) {
      return;
    }

    setApplicantList(data.applicants);
  }

  return (
    <section>
      <h3 className={style.title}>가입신청자</h3>
      <ul className={style.applicantList}>
        {applicantList.length > 0 ? (
          applicantList.map((applicant, idx) => {
            return (
              <li className={style.applicantItem} key={idx}>
                <JoinTeamApplicantItem
                  applicantList={applicantList}
                  setApplicantList={setApplicantList}
                  applicant={applicant}
                  teamId={teamId}
                />
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

async function handleApplyTeamList(teamId: number) {
  try {
    const response = await authAxios(`/team/applicant/${teamId}`);

    return makeResponseResult(response, '신청자목록');
  } catch (error: any) {
    return makeResponseResult(error);
  }
}

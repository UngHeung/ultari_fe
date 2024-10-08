'use client';

import { ParamsOptions } from '@/components/common/interfaces/paramsOptions';
import TeamDetail from '@/components/team/components/TeamDetail';

const TeamPage = ({ params }: ParamsOptions) => {
  return (
    <>
      <TeamDetail teamId={params.id} />
    </>
  );
};

export default TeamPage;

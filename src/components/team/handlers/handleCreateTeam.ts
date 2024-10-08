import { authAxios } from '@/apis/axiosInstance';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { FormEvent } from 'react';

async function handleCreateTeam(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const data = {
    name: formData.get('name'),
    community: formData.get('community'),
    description: formData.get('description'),
  };

  try {
    const response = await authAxios.post('/team', data);

    return makeResponseResult(response, '목장 생성');
  } catch (error: any) {
    return makeResponseResult(error);
  }
}

export default handleCreateTeam;

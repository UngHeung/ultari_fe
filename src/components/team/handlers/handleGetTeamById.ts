import { authAxios } from '@/apis/axiosAuth';

async function handleGetTeamById(teamId: number) {
  const url = `/team/${teamId}`;

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
      message: error.response.data.message,
    };
  }
}

export default handleGetTeamById;

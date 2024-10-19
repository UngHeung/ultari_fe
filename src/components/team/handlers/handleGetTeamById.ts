import { authAxios } from '@/apis/axiosInstance';
import axios from 'axios';

async function handleGetTeamById(teamId: number) {
  try {
    const response = await authAxios.get(`/team/applicant/${teamId}`);

    return {
      status: response.status,
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.status,
        success: false,
        message: error.response?.data.message || '서버에 문제 발생',
      };
    } else {
      return {
        status: 500,
        success: false,
        message: '서버에 문제 발생',
      };
    }
  }
}

export default handleGetTeamById;

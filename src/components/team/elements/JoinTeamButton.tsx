import { authAxios } from '@/apis/axiosInstance';
import { UserOptions } from '@/components/auth/interfaces/authInterface';
import mapModalMessage from '@/components/common/functions/mapModalMessage';
import { makeResponseResult } from '@/components/common/functions/returnResponse';
import { ModalState } from '@/components/stores/interfaces/stateInterface';
import { setModal } from '@/components/stores/reducer/modalRducer';
import { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import TeamButton from './TeamButton';

const JoinTeamButton = ({
  teamId,
  setApplicantList,
}: {
  teamId?: number;
  setApplicantList: React.Dispatch<SetStateAction<UserOptions[]>>;
}) => {
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState<boolean>(false);

  async function JoinTeamProcess() {
    setDisabled(true);

    const { success, message, data } = await handleApplyJoinTeam(teamId);

    if (!success) {
      return {
        success,
        message,
      };
    }

    const modalData: ModalState = {
      title: '목장원신청',
      success,
      message,
      modalIsShow: true,
      type: success ? 'confirm' : 'alert',
      routerType: undefined,
    };

    modalData.message = mapModalMessage(modalData);
    dispatch(setModal(modalData));
    setApplicantList(prevList => [...prevList, data]);
    setDisabled(false);
  }

  return (
    <TeamButton
      type={'button'}
      value={'가입신청'}
      onClick={JoinTeamProcess}
      disabled={disabled}
    />
  );
};

export default JoinTeamButton;

async function handleApplyJoinTeam(teamId?: number) {
  const data = {
    id: teamId,
  };

  try {
    const response = await authAxios.post('/user/team/join', data);

    return makeResponseResult(response, '목장원신청');
  } catch (error: any) {
    return makeResponseResult(error);
  }
}

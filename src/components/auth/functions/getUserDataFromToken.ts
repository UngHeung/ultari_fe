import { getAccessToken } from './tokenInteract';

function getUserDataFromToken() {
  const payload = getAccessToken().split('.')[1];
  const buffer = Buffer.from(payload, 'base64');
  const dataString = buffer.toString().replaceAll(/['"]/g, '');
  const dataParts = dataString.split(',');

  return {
    id: +dataParts[0].split(':')[1],
    name: dataParts[1].split(':')[1],
    role: dataParts[2].split(':')[1],
  };
}

export default getUserDataFromToken;

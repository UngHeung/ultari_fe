import { RoleTypes } from '../interfaces/authInterface';
import { getAccessToken } from './tokenInteract';

function getUserDataFromToken() {
  const payload = getAccessToken().split('.')[1];
  const buffer = Buffer.from(payload, 'base64');
  const dataString = buffer.toString().replaceAll(/['"]/g, '');
  const dataParts = dataString.split(',');

  const result = {
    id: +dataParts[0].split(':')[1],
    name: dataParts[1].split(':')[1],
    role: dataParts[2].split(':')[1] as RoleTypes,
    path: dataParts[3].split(':')[1],
    community: dataParts[4].split(':')[1],
  };

  if (result.path === 'null') {
    result.path = '';
  }

  return result;
}

export default getUserDataFromToken;

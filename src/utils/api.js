import axios from 'axios';
import { getIdToken, getProfile } from '@/auth';

axios.defaults.baseURL = 'http://localhost:3000';

if (getIdToken()) {
  axios.defaults.headers.common.Authorization =
    `Bearer ${getIdToken()}`;
}

const getUserId = () => {
  const user = getProfile();
  return user.user_id;
};

const getProjects = () => axios.get('/projects', {
  params: {
    user: getUserId(),
  },
}).then(response => response.data);

export default {
  getProjects,
};

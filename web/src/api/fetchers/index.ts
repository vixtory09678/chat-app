import { api } from '../../../services/apiInstance';

export const userFetcher = (path: string) => {
  return api.instance.get('api/users' + path).then((response) => response.data);
};

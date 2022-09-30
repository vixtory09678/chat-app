import { api } from '../../../services/apiInstance';
import { RoomResponse } from '../data-contracts';

export const userFetcher = (path: string) => {
  return api.instance.get('api/users' + path).then((response) => response.data);
};

export const roomsFetcher = (path: string) => {
  return api.instance.get<RoomResponse[]>(path).then((response) => response.data);
};

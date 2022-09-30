/* eslint-disable @next/next/no-img-element */
import { UserResponse } from '../../src/api/data-contracts';
import { AvatarColor } from './AvatarColor';
import EditIcon from '@mui/icons-material/Edit';
import { KeyboardEvent, useEffect, useState } from 'react';
import { api } from '../../services/apiInstance';
import { toastMessage } from '../../src/api/error-handling';
import { useSnackbar } from 'notistack';
import { ConnectionStatus } from './ConnectionStatus';

interface UserProfileProps {
  profile: UserResponse;
  updateProfile: () => void;
}

export function UserProfile({ profile, updateProfile }: UserProfileProps) {
  const [canEdit, setEdit] = useState<boolean>(false);
  const [displayName, setDisPlayName] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const saveDisplayName = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const res = await api.userControllerUpdateUser({ displayName });
      if (res.status !== 200) {
        toastMessage('Cannot save display name', { variant: 'error' }, enqueueSnackbar);
        return;
      }
      await updateProfile();
      setEdit(false);
    }
  };

  useEffect(() => {
    setDisPlayName(profile.displayName);
  }, [profile.displayName]);

  return (
    <div className="flex flex-col w-[310px] border-l-2 items-center gap-4 pt-5 px-2">
      <div className="cursor-pointer hover:bg-slate-200 p-4 rounded-full">
        {profile.profileImageUrl ? (
          <img
            src={'mock/team-profile.jpeg'}
            height={200}
            width={200}
            alt=""
            className="rounded-full pt-5"
          />
        ) : (
          <AvatarColor profile={profile} />
        )}
      </div>

      <div className="flex gap-2 items-center">
        {canEdit ? (
          <input
            type="text"
            onChange={(e) => setDisPlayName(e.currentTarget.value)}
            value={displayName}
            onKeyDown={(e) => saveDisplayName(e)}
            className="p-2 border-2"
          />
        ) : (
          <>
            <ConnectionStatus />
            <p className="font-light text-xl text-center break-all">{profile.displayName}</p>
          </>
        )}

        <div onClick={() => setEdit(true)}>
          <EditIcon className="cursor-pointer" color={'info'} fontSize={'small'} />
        </div>
      </div>
    </div>
  );
}

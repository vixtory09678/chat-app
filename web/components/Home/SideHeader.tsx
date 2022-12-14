import { Autocomplete, Box, Button, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { api } from '../../services/apiInstance';
import { RoomResponse, UserResponse } from '../../src/api/data-contracts';
import { errorHandler, toastMessage } from '../../src/api/error-handling';
import { useUserContext } from '../../src/contexts/AuthContext';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

interface SideHeaderProps {
  onCreateNewRoom: (room: RoomResponse) => void;
}

export function SideHeader({ onCreateNewRoom }: SideHeaderProps) {
  const [open, setOpen] = useState(false);
  const { profile } = useUserContext();
  const [friendList, setFriendList] = useState<UserResponse[]>();
  const [selectedFriend, setSelectedFriend] = useState<UserResponse[]>();
  const { enqueueSnackbar: toastProvider } = useSnackbar();
  const [createNewRoomLoading, setCreateNewRoomLoading] = useState(false);

  useEffect(() => {
    api
      .userControllerGetUsers()
      .then((response) => response.data)
      .then((users) => {
        const friends = users.filter((user) => (profile?.id ? profile?.id !== user.id : false));
        setFriendList(friends);
      });
  }, [open, profile?.id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const createNewRoom = () => {
    setCreateNewRoomLoading(true);
    if (!selectedFriend) {
      errorHandler({ message: 'Please select a friend at least one' }, toastProvider);
      setCreateNewRoomLoading(false);
      return;
    }

    api
      .roomControllerCreateRoom({ participants: selectedFriend })
      .then((response) => response.data)
      .then((createdRoom) => {
        onCreateNewRoom(createdRoom);
        toastMessage('Successfully created room.', { variant: 'success' }, toastProvider);
      })
      .catch((error) => {
        errorHandler(error, toastProvider);
      })
      .finally(() => {
        setCreateNewRoomLoading(false);
        handleClose();
      });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-2">
            <div className="p-4 items-center border-b-2">
              <h1 className="text-2xl">New chat</h1>
            </div>
            <div className="flex flex-col p-4 gap-5">
              <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={friendList ?? []}
                getOptionLabel={(option) => option.displayName}
                onChange={(_, values: UserResponse[]) => {
                  setSelectedFriend([...values]);
                }}
                renderInput={(params) => {
                  return <TextField {...params} label="Search friend" autoFocus placeholder="Type the name" />;
                }}
                sx={{ width: '100%' }}
              />

              <button
                disabled={createNewRoomLoading ? true : false}
                className={`py-2 px-4 ${
                  createNewRoomLoading ? 'bg-green-600 opacity-50' : 'bg-green-600 hover:bg-green-700'
                } text-white  rounded-[3px]`}
                onClick={createNewRoom}
              >
                {createNewRoomLoading ? 'Processing..' : 'Create'}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="flex flex-between items-center w-full">
        <h1 className="m-5 text-2xl font-bold flex-grow">Friends</h1>
        <span
          className="w-7 h-7 rounded-full mr-5 bg-green-500 hover:bg-green-400 text-white text-center hover:cursor-pointer"
          onClick={handleOpen}
        >
          +
        </span>
      </div>
    </>
  );
}

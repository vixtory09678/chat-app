import { UserResponse } from '../../src/api/data-contracts';

interface AvatarColorProps {
  profile?: UserResponse;
  type?: 'small' | 'medium' | 'large';
}

export function AvatarColor({ profile, type = 'large' }: AvatarColorProps) {
  const getSizeProfile = () => {
    if (type === 'large') {
      return 'h-40 w-40 border-8';
    } else if (type === 'medium') {
      return 'h-11 w-14 border-4';
    } else if (type === 'small') {
      return 'h-[40px] w-[40px] border-2';
    }
  };

  const getSizeTextProfile = () => {
    if (type === 'large') {
      return 'text-5xl';
    } else if (type === 'medium') {
      return 'text-xl';
    } else if (type === 'small') {
      return 'text-xs';
    }
  };

  return (
    <>
      <div
        className={`${getSizeProfile()} rounded-full flex justify-center items-center border-blue-400`}
        style={{ backgroundColor: `#${profile?.profileColor}` }}
      >
        <div className={`text-black ${getSizeTextProfile()} stroke-slate-700 opacity-50`}>
          {profile?.displayName[0]?.toUpperCase()}
        </div>
      </div>
    </>
  );
}

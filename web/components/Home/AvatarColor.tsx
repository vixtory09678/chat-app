import { UserResponse } from '../../src/api/data-contracts';

interface AvatarColorProps {
  profile: UserResponse;
}

export function AvatarColor({ profile }: AvatarColorProps) {
  return (
    <>
      <div
        className="h-40 w-40 rounded-full flex justify-center items-center border-8 border-blue-400"
        style={{ backgroundColor: `#${profile.profileColor}` }}
      >
        <div className="text-black text-5xl stroke-slate-700 stroke-[5px] opacity-50">
          {profile.displayName[0]?.toUpperCase()}
        </div>
      </div>
    </>
  );
}

import Icons from '@/components/atoms/Icons';
import Image from 'next/image';

type AvatarProps = {
  first_name: string;
  last_name: string;
  avatar: string;
};

const Avatar = ({
  first_name,
  last_name,
  avatar,
}: AvatarProps): JSX.Element => {
  return (
    <div className='flex flex-row gap-1 py-2 pl-3 pr-5 gap-2 rounded-xl bg-red-300 items-center'>
      <div className='bg-white flex rounded-full w-9 h-9 text-xs items-center justify-center'>
        Image
      </div>
      <span className='text-md'>
        {first_name} {last_name}
      </span>
    </div>
  );
};

export default Avatar;

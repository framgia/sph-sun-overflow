import Icons from '@/components/atoms/Icons';

type PillProps = {
  name: string;
  is_tag: boolean;
};

const Pill = ({ name, is_tag }: PillProps): JSX.Element => {
  return (
    <div className='flex flex-row min-w-fit gap-1 text-xs py-1 px-3 rounded-full bg-red-300 items-center'>
      {is_tag ? <Icons name='pill_eye' /> : ''}
      <span>{name}</span>
    </div>
  );
};

export default Pill;

import Pill from '../Pill';

type TagsProps = {
  values: { id: number; name: string; is_tag: boolean }[];
};

const Tags = ({ values }: TagsProps): JSX.Element => {
  return (
    <div className='flex w-full justify-start gap-2'>
      {values.map((value) => {
        return <Pill key={value.id} name={value.name} is_tag={value.is_tag} />;
      })}
    </div>
  );
};

export default Tags;

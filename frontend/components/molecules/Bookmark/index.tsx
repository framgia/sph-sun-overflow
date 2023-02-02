import Icons from '@/components/atoms/Icons';

type BookmarkProps = {
  is_bookmark: boolean;
};

const Bookmark = ({ is_bookmark }: BookmarkProps): JSX.Element => {
  return (
    <div className='flex justify-center'>
      <Icons name={is_bookmark ? 'bookmark_fill' : 'bookmark_outline'} />
    </div>
  );
};

export default Bookmark;

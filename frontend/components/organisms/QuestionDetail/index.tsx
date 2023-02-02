import Icons from '@/components/atoms/Icons';
import Avatar from '@/components/molecules/Avatar';
import Bookmark from '@/components/molecules/Bookmark';
import Tags from '@/components/molecules/Tags';
import Votes from '@/components/molecules/Votes';
import Link from 'next/link';
import { Fragment } from 'react';

type QuestionDetailProps = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  view_count: string;
  tags: { id: number; name: string; is_tag: boolean }[];
  user: { id: number; first_name: string; last_name: string; avatar: string };
  votes: { value: number };
  is_bookmark: boolean;
};

const QuestionDetail = ({
  id,
  title,
  content,
  created_at,
  view_count,
  tags,
  user,
  votes,
  is_bookmark,
}: QuestionDetailProps): JSX.Element => {
  return (
    <Fragment>
      <div className='w-full flex flex-col'>
        <div className='w-full flex flex-col relative gap-3'>
          <Link href='#' className='absolute top-0 right-0 cursor-pointer'>
            <Icons name='square_edit' />
          </Link>
          <div className='w-full text-2xl font-bold'>{title}</div>
          <div className='w-full text-xs font-semibold flex flex-row gap-3'>
            <div className='flex gap-1'>
              <span>Asked</span>
              <span className='text-gray-500'>{created_at}</span>
            </div>
            <div className='flex gap-1'>
              <span>Viewed</span>
              <span className='text-gray-500'>{view_count}</span>
            </div>
          </div>
          <div className='w-full flex flex-row'>
            <div className='w-14 flex flex-col items-start'>
              <div className='flex flex-col items-center gap-2'>
                <Votes count={votes.value} />
                <Bookmark is_bookmark={is_bookmark} />
              </div>
            </div>
            <div className='w-full flex flex-col gap-3 justify-between'>
              <div className='w-full flex flex-col gap-3'>
                <div className='w-full'>{content}</div>
                <div className='w-full'>
                  <Tags values={tags} />
                </div>
              </div>
              <div className='w-full flex flex-row justify-between'>
                <div className='flex justify-start items-end'>
                  <div className='flex gap-3 items-center'>
                    <Link
                      href='#'
                      className='text-xs text-blue-600 hover:underline'
                    >
                      Share
                    </Link>
                    <Link
                      href='#'
                      className='text-xs text-blue-600 hover:underline'
                    >
                      Close
                    </Link>
                    <Link
                      href='#'
                      className='text-xs text-blue-600 hover:underline'
                    >
                      Delete
                    </Link>
                  </div>
                </div>
                <div className='flex flex-row min-w-fit'>
                  <Avatar
                    first_name={user.first_name}
                    last_name={user.last_name}
                    avatar={user.avatar}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default QuestionDetail;

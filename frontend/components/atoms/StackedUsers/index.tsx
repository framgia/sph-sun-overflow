interface StackedUsersProps {
  images: string[];
}

const StackedUsers = ({ images }: StackedUsersProps) => {
  if (images.length === 0) {
    return <div className="flex">No Members yet</div>;
  }
  return (
    <div className="hidden lg:flex flex-row -space-x-7">
      {images.length &&
        images.map((imageUrl, index) => {
          return (
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={imageUrl}
              alt="user photo"
            />
          );
        })}
    </div>
  );
};
export default StackedUsers;

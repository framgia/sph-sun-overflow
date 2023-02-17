import SearchInput from '@/components/molecules/SearchInput'
import SortDropdown from '@/components/molecules/SortDropdown'
import UserTab from '@/components/molecules/UserTab'
import Paginate from '@/components/organisms/Paginate'
const initialUserList = [
    {
        id: 1,
        first_name: 'Ian',
        last_name: 'Urriza',
        avatar: '/../../public/images/sun_logo.png',
        reputation: 0,
        role: 'Team Lead',
    },
    {
        id: 1,
        first_name: 'Ian',
        last_name: 'Urriza',
        avatar: '/../../public/images/sun_logo.png',
        reputation: 0,
        role: 'Team Lead',
    },
    {
        id: 1,
        first_name: 'Ian',
        last_name: 'Urriza',
        avatar: '/../../public/images/sun_logo.png',
        reputation: 10000,
        role: 'Team Lead',
    },
    {
        id: 1,
        first_name: 'Ian',
        last_name: 'Urriza',
        avatar: '/../../public/images/sun_logo.png',
        reputation: 0,
        role: 'Team Lead',
    },
    {
        id: 1,
        first_name: 'Ian',
        last_name: 'Urriza',
        avatar: '/../../public/images/sun_logo.png',
        reputation: 0,
        role: 'Team Lead',
    },
    {
        id: 1,
        first_name: 'Ian',
        last_name: 'Urriza',
        avatar: '/../../public/images/sun_logo.png',
        reputation: 10000,
        role: 'Team Lead',
    },
    {
        id: 1,
        first_name: 'Ian',
        last_name: 'Urriza',
        avatar: '/../../public/images/sun_logo.png',
        reputation: 0,
        role: 'Team Lead',
    },
    {
        id: 1,
        first_name: 'Ian',
        last_name: 'Urriza',
        avatar: '/../../public/images/sun_logo.png',
        reputation: 0,
        role: 'Team Lead',
    },
    {
        id: 1,
        first_name: 'Ian',
        last_name: 'Urriza',
        avatar: '/../../public/images/sun_logo.png',
        reputation: 10000,
        role: 'Team Lead',
    },
    {
        id: 1,
        first_name: 'Ian',
        last_name: 'Urriza',
        avatar: '/../../public/images/sun_logo.png',
        reputation: 0,
        role: 'Team Lead',
    },
    {
        id: 1,
        first_name: 'Ian',
        last_name: 'Urriza',
        avatar: '/../../public/images/sun_logo.png',
        reputation: 0,
        role: 'Team Lead',
    },
    {
        id: 1,
        first_name: 'Ian',
        last_name: 'Urriza',
        avatar: '/../../public/images/sun_logo.png',
        reputation: 10000,
        role: 'Team Lead',
    },
]

const roleFilters = [
    { id: 1, name: 'Admin', onClick: function () {} },
    { id: 2, name: 'Team Leader', onClick: function () {} },
    { id: 3, name: 'Member', onClick: function () {} },
]

const scoreSort = [
    { id: 1, name: 'Most Score', onClick: function () {} },
    { id: 2, name: 'Least Score', onClick: function () {} },
]

const UsersPage = () => {
    return (
        <div className="ml-6 mr-6 flex h-full w-full flex-col ">
            <div className="mt-10 w-full  pl-14">
                <div className="text-3xl font-bold">Overflow Users</div>
                <div className="mt-4 w-full border-b-2 border-b-gray-300"></div>
            </div>
            <div className="mt-3 flex w-full flex-row pl-16 pr-2">
                <div className="mr-auto">
                    <SearchInput usage="Users" placeholder="Search by name" />
                </div>
                <div className="flex flex-row justify-end gap-1">
                    <SortDropdown filters={roleFilters} selectedFilter="Sort by Role" />
                    <SortDropdown filters={scoreSort} selectedFilter="Sort by Score" />
                </div>
            </div>
            <div className="mt-3 w-full">
                <div className=" mr-4 ml-20 grid  grid-cols-3 ">
                    {initialUserList.map((user) => (
                        <UserTab user={user} usage="UserList" />
                    ))}
                </div>

                <div className="mt-10 ">
                    <Paginate />
                </div>
            </div>
        </div>
    )
}
export default UsersPage

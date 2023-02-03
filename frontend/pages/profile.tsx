import { RightSideBar } from '@/components/organisms/Sidebar'
import { getUserToken } from '@/helpers/localStorageHelper'

const profile = () => {
    return (
        <div className="flex flex-row-reverse">
            <RightSideBar usage="profile" />
        </div>
    )
}
export default profile

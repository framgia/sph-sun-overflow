import Button from '@/components/atoms/Button'
import { parseHTML } from '../../../helpers/htmlParsing'
interface AboutMeProps {
    about_me: string
}

const AboutMe = ({ about_me }: AboutMeProps) => {
    return (
        <div className="align-center flex w-full flex-col gap-4">
            <div className="flex h-12 w-full flex-row items-center">
                <div className="align-middle text-2xl font-semibold">About Me</div>
            </div>
            <div className="text-justify text-sm line-clamp-4"> {parseHTML(about_me)}</div>
        </div>
    )
}
export default AboutMe

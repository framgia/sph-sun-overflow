import { TailSpin } from 'react-loader-spinner'

type LoadingProps = {
    height?: number
    width?: number
    color?: string
    additionalClass?: string
}

const Loading = ({
    width = 20,
    height = 20,
    color = '#FF2200',
    additionalClass = '',
}: LoadingProps): JSX.Element => {
    return (
        <TailSpin
            height={width}
            width={height}
            color={color}
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass={additionalClass}
            visible={true}
        />
    )
}

export default Loading

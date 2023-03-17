import ThreeCirclesSpinner from '@/components/atoms/Loader/ThreeCirclesSpinner'

export const loadingScreenShow = (color = '#FF2200'): JSX.Element => (
    <ThreeCirclesSpinner color={color} />
)

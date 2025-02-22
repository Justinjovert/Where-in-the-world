import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoading = ({ ...props }) => {
    return (
        <Skeleton {...props} baseColor="#e0e0e0" highlightColor="#f5f5f5" />
    )
}

export default SkeletonLoading
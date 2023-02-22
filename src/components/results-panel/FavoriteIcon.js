import { useSelector, useDispatch } from 'react-redux';
import { FaStar, FaRegStar} from 'react-icons/fa';
import { addFavorite, removeFavorite } from '../../features/auth/authSlice';

function FavoriteIcon({resortData, favoriteStatus}) {
    const dispatch = useDispatch();
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);


    const toggleFavorite = () => {
        let selected = {
            locId: resortData.refId,
            userId: user._id
        }
        console.log(selected);
        if (favoriteStatus) {
            dispatch(removeFavorite(selected));
        } else {
            dispatch(addFavorite(selected));
        }
    }


    if (favoriteStatus) {
        return (
                <div className="header-icon favorite" onClick={toggleFavorite}>
                    <FaStar/>
                </div>
        )
    } else {
        return (
            <div className="header-icon" onClick={toggleFavorite}>
                <FaRegStar/>
            </div>
        )
    }
};

export default FavoriteIcon;

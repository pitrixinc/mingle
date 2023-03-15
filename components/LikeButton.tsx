import React, { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';

import useAuthStore from '../store/authStore';

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  const formattedLikes = formatNumber(likes?.length || 0);

  return (
    <div className="flex flex-wrap justify-between gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div className="bg-primary rounded-full p-2 md:p-4" onClick={handleLike}>
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        <p className="text-md font-semibold">{formattedLikes}</p>
      </div>
    </div>
  );
};

export default LikeButton;

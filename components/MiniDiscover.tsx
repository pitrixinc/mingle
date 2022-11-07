import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from '../utils/constants';

const MiniDiscover = () => {
    const router = useRouter();
    const { topic } = router.query;

    const activeTopicStyle = "border-2 hover:bg-primary border-[#F51997] px-3 py-2 rounded rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997] "

    const topicStyle ="p-4 border-2 hover:border-[#F51997] border-gray-300 px-3 py-2 rounded rounded-full flex items-center gap-2 justify-center cursor-pointer text-black hover:text-white hover:bg-[#F51997]"

  return (
    <div className="border-b-2 border-gray-200 pb-6 mb-0">
      
      <div className="flex gap-0 flex-row">
        {topics.map((item) => (
              <Link href={`/?topic=${item.name}`} key={item.name}>
                <div className={topic === item.name ? activeTopicStyle : topicStyle}>
                    <span className="font-bold text-gray-400 text-2xl xl:text-md">
                        {item.icon}
                    </span>
                    <span className="font-bold text-sm block capitalize">
                        {item.name}
                    </span>
                </div>
             </Link>
        ))}
      </div>
    </div>
  )
}

export default MiniDiscover
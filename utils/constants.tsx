import { BsCode, BsEmojiSunglasses } from 'react-icons/bs';
import { GiCakeSlice, GiGalaxy, GiLipstick } from 'react-icons/gi';
import { FaPaw, FaMedal, FaGamepad } from 'react-icons/fa';
import Link from 'next/link';

export const topics = [
  {
    name: 'coding',
    icon: <BsCode />,
  },
  {
    name: 'comedy',
    icon: <BsEmojiSunglasses />,
  },
  {
    name: 'gaming',
    icon: <FaGamepad />,
  },
  {
    name: 'food',
    icon: <GiCakeSlice />,
  },
  {
    name: 'dance',
    icon: <GiGalaxy />,
  },
  {
    name: 'beauty',
    icon: <GiLipstick />,
  },
  {
    name: 'animals',
    icon: <FaPaw />,
  },
  {
    name: 'sports',
    icon: <FaMedal />,
  },
];

export const footerList1 = [<Link href="../components/about-us-1.html">About</Link>, 'Newsroom', 'Store', 'Contact', 'Carriers', 'ByteDance', 'Creator Directory']
export const footerList2 = [ 'Mingle for Good','Advertise','Developers','Transparency','Mingle Rewards' ]
export const footerList3 = [ 'Help', 'Safety', 'Terms', 'Privacy', 'Creator Portal', 'Community Guidelines' ]
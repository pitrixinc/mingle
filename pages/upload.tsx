import React, { useEffect, useState, useRef } from 'react';
import { SanityAssetDocument } from '@sanity/client';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';

import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';
import { client } from '../utils/client';
import { topics } from '../utils/constants';

const Upload = () => {
  const [caption, setCaption] = useState('');
  const [topic, setTopic] = useState<String>(topics[0].name);
  const [loading, setLoading] = useState<Boolean>(false);
  const [savingPost, setSavingPost] = useState<Boolean>(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongFileType, setWrongFileType] = useState<Boolean>(false);

  const userProfile: any = useAuthStore((state) => state.userProfile);
  const router = useRouter();

  useEffect(() => {
    if (!userProfile) router.push('/');
  }, [userProfile, router]);

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    // uploading asset to sanity
    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setLoading(true);

      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };

const [error, setError] = useState(null);

const [hashtags, setHashtags] = useState([]);
  const handlePost = async () => {
  if (caption && videoAsset?._id && topic) {
    setSavingPost(true);
    
    const words = caption.trim().split(' ');
  if (words.length < 10) {
    setError('Please enter at least ten words');
    return;
  } else {
    // Submit the form
    setSavingPost(true);
  }

    // Extract hashtags from caption
    const hashtagRegex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    const hashtags = [];
    let match;
    while ((match = hashtagRegex.exec(caption))) {
      hashtags.push(match[1]);
    }

    setHashtags(hashtags);

    const doc = {
      _type: 'post',
      caption: hashtags.length > 0
    ? caption.replace(hashtagRegex, '#$1')
    : caption,
      video: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: videoAsset?._id,
        },
      },
      userId: userProfile?._id,
      postedBy: {
        _type: 'postedBy',
        _ref: userProfile?._id,
      },
      topic,
      hashtags, // include hashtags in the document
      createdAt: new Date().toISOString() // add createdAt property with current date and time
    };

    await axios.post(`${BASE_URL}/api/post`, doc);

    router.push('/');
  }
};

const handleDiscard = () => {
  setSavingPost(false);
  setVideoAsset(undefined);
  setCaption('');
  setTopic('');
  setHashtags([]);
};

const handleKeyPress = (event) => {
  if (event.key === '#') {
    // Show list of hashtags
  }
};

const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleButtonClick = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiClick = (emoji) => {
  const emojiValue = emoji.emoji;
  setCaption(caption + emojiValue);
  inputRef.current.focus();
};


  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowPicker(false);
    }
  };


  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
      <div className=' bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Video</p>
            <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
          </div>
          <div className=' border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {loading ? (
              <p className='text-center text-3xl text-red-400 font-semibold'>
                Uploading...
              </p>
            ) : (
              <div>
                {!videoAsset ? (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col justify-center items-center'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                        </p>
                        <p className='text-xl font-semibold'>
                          Select video to upload
                        </p>
                      </div>

                      <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                        MP4 or WebM or ogg <br />
                        720x1280 resolution or higher <br />
                        Up to 10 minutes <br />
                        Less than 2 GB
                      </p>
                      <p className='bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                        Select file
                      </p>
                    </div>
                    <input
                      type='file'
                      name='upload-video'
                      onChange={(e) => uploadVideo(e)}
                      className='w-0 h-0'
                    />
                  </label>
                ) : (
                  <div className=' rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center'>
                    <video
                      className='rounded-xl h-[462px] mt-16 bg-black'
                      controls
                      loop
                      src={videoAsset?.url}
                    />
                    <div className=' flex justify-between gap-20'>
                      <p className='text-lg'>{videoAsset.originalFilename}</p>
                      <button
                        type='button'
                        className=' rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                        onClick={() => setVideoAsset(undefined)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {wrongFileType && (
            <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[260px]'>
              Please select a video file (mp4 or webm or ogg)
            </p>
          )}
        </div>
        <div className='flex flex-col gap-3 pb-10' ref={inputRef}>
          
      <label className='text-md font-semibold'>Caption</label>
      <div className="flex items-center relative">
<input
  type='text'
  value={caption}
  onChange={(e) => setCaption(e.target.value)}
  onKeyPress={handleKeyPress}
  className='flex-1  rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2'
/>
<button
          className='absolute right-0 top-0 h-full px-3'
          onClick={handleButtonClick}
        >
          {showPicker ? '❌' : '❤️'}
        </button>
        {showPicker && <div className="absolute top-[100%] left-0 z-index-1"> <EmojiPicker onEmojiClick={handleEmojiClick} /> </div>}
</div>
{error && <p className="text-red-500">{error}</p>}
{hashtags.length > 0 && (
  <ul>
    {hashtags.map((tag) => (
      <li key={tag}>#{tag}</li>
    ))}
  </ul>
)}
          <label className='text-md font-semibold '>Choose a topic</label>

          <select
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            className='outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
          >
            {topics.map((item) => (
              <option
                key={item.name}
                className=' outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
          <div className='flex gap-6 mt-10'>
            <button
              onClick={handleDiscard}
              type='button'
              className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none mb-8'
            >
              Discard
            </button>
            <button
              disabled={videoAsset?.url ? false : true}
              onClick={handlePost}
              type='button'
              className='bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none mb-8'
            >
              {savingPost ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

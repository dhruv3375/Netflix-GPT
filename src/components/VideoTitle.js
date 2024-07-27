import React from 'react'

const VideoTitle = ({title , overview}) => {
  return (
    <div className= "w-screen aspect-video pt-[18%]  px-24 absolute  text-white bg-gradient-to-r from-black">
        <h1 className= "text-5xl font-bold">{title}</h1>
        <p className='py-6 text-lg w-[25%]'>{overview}</p>

        <div className=''>
            <button className=' mx-2 bg-gray-500 bg-opacity-70  text-white p-3 px-12 text-xl rounded-lg hover:bg-opacity-35' >▶ Play</button>
            <button className=' mx-2 bg-gray-500 bg-opacity-70  text-white p-3 px-12 text-xl rounded-lg hover:bg-opacity-35'>More Info</button>
        </div>
    </div>
  );
};

export default VideoTitle
import React from 'react';
import { useState } from 'react';

const Card = ({user}) => {

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(prev => !prev);
    // const card = e.target.closest('.profile_card');
    // const details = card.querySelector('.viewmore_details');
    // details.classList.toggle('hidden');
  };

  return (
    <>
    <div className='profile_card'>
      {/* <div className='profile_image'>
        
    </div> */}
            <h2 className='text-base font-bold'>Name: {user.name}</h2>
               <p className='text-sm'>Email: {user.email}</p>
      <p className='text-sm'>Company: {user.company.name}</p>
      <p className='text-sm'>City: {user.address.city}</p>

            <div>
              <button onClick={toggleDetails} className='viewmore_btn text-sm bg-cyan-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 border border-blue-700 rounded' >
                {showDetails ? 'View Less' : 'View More'}
              </button>
            </div>
            
            {showDetails && (
               <div className='viewmore_details'>
         <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
    </div>
            )}
   
        </div>

    </>
  )
};

export default Card;
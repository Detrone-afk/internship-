import React, { useState } from 'react';
import Cardslist from '../data/Cardslist';
import Image from 'next/image';

function Cards() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-[14px] font-semibold">Payment Method</h2>
      <div className="grid grid-cols-5 mt-2 gap-2">
        {Cardslist.map((item, index) => (
          <div 
            key={index} 
            className={`w-[50px] border-[1px] flex items-center justify-center rounded-md cursor-pointer 
              ${activeIndex === index ? 'border-blue-400 border-[2px]' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <Image 
              src={item.image}
              alt={item.name}
              width={40}
              height={60}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;

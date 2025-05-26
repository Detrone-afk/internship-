import React, { useState } from 'react';
import Image from 'next/image';
import Carlist from '../data/Carlist';

function Cars() {
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

  const handleCarSelect = (index: number) => {
    setSelectedCar(index);
    // Saved both car and fare to localStorage
    localStorage.setItem('selectedCar', Carlist[index].name);
    localStorage.setItem('fare', (Carlist[index].charges * 10).toString());
  };

  return (
    <div className='mt-3'>
      <h2 className='font-semibold'>Select Car</h2>
      <div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3'>
        {Carlist.map((item, index) => (
          <div 
            key={index} 
            className={`m-2 p-2 border-[1px] rounded-md cursor-pointer ${
              selectedCar === index ? 'border-blue-400 border-[2px]' : ''
            }`}
            onClick={() => handleCarSelect(index)}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={75}
              height={90}
              className='w-fit'
            />
            <h2 className='text-[16px]'>
              {item.name} 
              <span className='float-right text-blue-500 font-medium'>
                {item.charges * 10}₹
              </span>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
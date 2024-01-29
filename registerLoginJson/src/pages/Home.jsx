import React from 'react'
import { useState,useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Home() {
    const [products, setProducts] = useState([]);
    const {isAuth} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
          .then((result) => result.json())
          .then((resp) => setProducts(resp));
      }, []);    

      useEffect(()=>{
        if(isAuth === false){
            navigate('/login')
        }
      })
  return (
    <div className=''>
             <div className="product-cont w-[100%] grid lg:grid-cols-5 max-[770px]:grid-cols-3 max-[330px]:grid-cols-1 gap-5  justify-center items-center px-5">
        {products.map((productItem, productIndex) => (
          <div key={productIndex} className='mt-5 mb-5 w-[100%]'>
            <div className="product-item w-52 bg-white flex justify-center items-center flex-col p-5 text-center shadow-xl hover:shadow-2xl m-auto">
              <img src={productItem.image} alt="image" className='h-36 w-36 object-contain' />
              <p className='text-xl'>{productItem.title.slice(0, 20)}</p>
              <br />
              <hr className='w-[100%]' />
              <p className='text-xl'>Rs.{productItem.price}/-</p>
              <br />
              <p className='text-xl'>{productItem.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
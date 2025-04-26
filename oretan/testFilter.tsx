// // components/ProductFilter.jsx
// import React, { useState } from 'react';
// import { useFilter } from '../hooks/useFilter';

// const ProductFilter = () => {
//   const {
//     handleCheckboxFilter,
//     handleButtonFilter,
//     handleInputFilter,
//     isCheckboxSelected,
//     isButtonActive,
//     getInputValue,
//     resetAllFilters
//   } = useFilter();

//   // State lokal untuk menyimpan nilai input sebelum disubmit
//   const [minPrice, setMinPrice] = useState(getInputValue('minPrice'));
//   const [maxPrice, setMaxPrice] = useState(getInputValue('maxPrice'));

//   // Kategori untuk checkbox filter
//   const categories = [
//     { id: 'electronics', name: 'Elektronik' },
//     { id: 'fashion', name: 'Fashion' },
//     { id: 'books', name: 'Buku' },
//     { id: 'home', name: 'Rumah Tangga' }
//   ];

//   // Size untuk button filter
//   const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

//   // Submit handler untuk price range
//   const handlePriceSubmit = (e) => {
//     e.preventDefault();
//     handleInputFilter('minPrice', minPrice);
//     handleInputFilter('maxPrice', maxPrice);
//   };

//   return (
//     <div className="product-filter">
//       <h2>Filter Produk</h2>

//       {/* 1. CHECKBOX FILTER (Multi-select) */}
//       <div className="filter-section">
//         <h3>Kategori</h3>
//         <div className="checkbox-filters">
//           {categories.map(category => (
//             <div key={category.id} className="filter-item">
//               <input
//                 type="checkbox"
//                 id={cat-${category.id}}
//                 checked={isCheckboxSelected('categories', category.id)}
//                 onChange={(e) => handleCheckboxFilter('categories', category.id, e.target.checked)}
//               />
//               <label htmlFor={cat-${category.id}}>{category.name}</label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 2. BUTTON FILTER (Single-select) */}
//       <div className="filter-section">
//         <h3>Ukuran</h3>
//         <div className="button-filters">
//           {sizes.map(size => (
//             <button
//               key={size}
//               className={size-button ${isButtonActive('size', size) ? 'active' : ''}}
//               onClick={() => {
//                 // Toggle active state
//                 handleButtonFilter('size', size, !isButtonActive('size', size));
//               }}
//             >
//               {size}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 3. INPUT RANGE FILTER */}
//       <div className="filter-section">
//         <h3>Rentang Harga</h3>
//         <form onSubmit={handlePriceSubmit} className="price-range-form">
//           <div className="price-inputs">
//             <div className="input-group">
//               <label htmlFor="min-price">Min</label>
//               <input
//                 type="number"
//                 id="min-price"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//                 placeholder="Min Harga"
//               />
//             </div>
//             <div className="input-group">
//               <label htmlFor="max-price">Max</label>
//               <input
//                 type="number"
//                 id="max-price"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//                 placeholder="Max Harga"
//               />
//             </div>
//           </div>
//           <button type="submit" className="apply-button">T



//           // Contoh penggunaan untuk rentang sewa
// import React from 'react';
// import { useFilter } from '../hooks/useFilter';

// const RentDurationFilter = () => {
//   const {
//     handleMultiButtonFilter,
//     isValueInMultiParam
//   } = useFilter();

//   const rentOptions = [
//     { id: 'harian', label: 'Harian' },
//     { id: 'mingguan', label: 'Mingguan' },
//     { id: 'bulanan', label: 'Bulanan' }
//   ];

//   return (
//     <div className="rent-duration-filter">
//       <h3>Rentang Sewa</h3>
//       <div className="button-group">
//         {rentOptions.map(option => (
//           <button
//             key={option.id}
//             className={filter-button ${isValueInMultiParam('rentang_sewa', option.id) ? 'active' : ''}}
//             onClick={() => {
//               // Toggle status active
//               handleMultiButtonFilter(
//                 'rentang_sewa', 
//                 option.id, 
//                 !isValueInMultiParam('rentang_sewa', option.id)
//               );
//             }}
//           >
//             {option.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RentDurationFilter;
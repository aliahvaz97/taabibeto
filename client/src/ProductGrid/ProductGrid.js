import React from 'react';
import './ProductGrid.css';
// ایمپورت تصاویر محلی
import image1 from '../assests/818fca25b022998113320dd005d688b685aeea4a_1691389556.jpg';
import image2 from '../assests/Digital-sphygmomanometer-1.jpg';

const ProductCard = ({ imageUrl, title, description, price, originalPrice, discount, soldOut }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        {soldOut && <div className="sold-out-overlay">فروخته شده</div>}
        <img src={imageUrl} alt={title} />
        {discount && <div className="discount-badge">-{discount}%</div>}
      </div>
      <h3 className="product-title">{title}</h3>
      <p className="product-description">{description}</p>
      <div className="price-container">
        <span className="product-price">{price} تومان</span>
        {originalPrice && <span className="original-price">{originalPrice} تومان</span>}
      </div>
    </div>
  );
};

const ProductGrid = () => {
  return (
    <div className="product-grid">
      <h2 className="grid-title">فروشگاهمون</h2>
      <div className="products">
        <ProductCard
          imageUrl={image1}  // تصویر پوشک بزرگسال
          title="پوشک بزرگسال"
          description="پوشک.سالمندان...."
          price="۱,۱۰۰,۰۰۰"
          originalPrice="۱,۴۵۰,۰۰۰"
          discount={24}
        />
        <ProductCard
          imageUrl={image2}  // تصویر دستگاه فشار خون
          title="دستگاه فشار خون"
          description="فشار خون-سالمند"
          price="۳۴۹,۸۰۰"
          originalPrice="۳۷۰,۰۰۰"
          discount={6}
        />
        <ProductCard
          imageUrl={image1}  // تکرار تصویر پوشک بزرگسال
          title="پوشک بزرگسال"
          description="پوشک.سالمندان...."
          price="۱,۱۰۰,۰۰۰"
          originalPrice="۱,۴۵۰,۰۰۰"
          discount={24}
        />
        <ProductCard
          imageUrl={image2}  // تکرار تصویر دستگاه فشار خون
          title="دستگاه فشار خون"
          description="فشار خون-سالمند"
          price="۳۴۹,۸۰۰"
          originalPrice="۳۷۰,۰۰۰"
          discount={6}
        />
      </div>
    </div>
  );
};

export default ProductGrid;

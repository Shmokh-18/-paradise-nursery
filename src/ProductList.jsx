
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

const img = (text, color) =>
  'https://placehold.co/300x300/' + color + '/ffffff?text=' + encodeURIComponent(text);

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('Snake Plant', '2e7d32'), description: 'Produces oxygen at night and removes toxins.', cost: 15 },
      { name: 'Spider Plant', image: img('Spider Plant', '388e3c'), description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: img('Peace Lily', '43a047'), description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: img('Boston Fern', '4caf50'), description: 'Adds humidity and removes pollutants.', cost: 20 },
      { name: 'Rubber Plant', image: img('Rubber Plant', '2e7d32'), description: 'Easy to grow and great at cleaning indoor air.', cost: 17 },
      { name: 'Aloe Vera', image: img('Aloe Vera', '388e3c'), description: 'Purifies the air and soothes skin burns.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: img('Lavender', '7b1fa2'), description: 'Calming scent used for relaxation and sleep.', cost: 20 },
      { name: 'Jasmine', image: img('Jasmine', '8e24aa'), description: 'Sweet floral fragrance that lifts the mood.', cost: 18 },
      { name: 'Rosemary', image: img('Rosemary', '6a1b9a'), description: 'Fragrant herb used in cooking and aromatherapy.', cost: 15 },
      { name: 'Mint', image: img('Mint', '00897b'), description: 'Fresh smell, perfect for teas and desserts.', cost: 12 },
      { name: 'Lemon Balm', image: img('Lemon Balm', '009688'), description: 'Lemon scent that helps reduce stress.', cost: 14 },
      { name: 'Hyacinth', image: img('Hyacinth', 'ab47bc'), description: 'Strong, sweet spring fragrance.', cost: 22 },
    ],
  },
  {
    category: 'Insect Repellent Plants',
    plants: [
      { name: 'Citronella', image: img('Citronella', 'ef6c00'), description: 'Well known for keeping mosquitoes away.', cost: 18 },
      { name: 'Marigold', image: img('Marigold', 'f57c00'), description: 'Repels aphids and many garden pests.', cost: 10 },
      { name: 'Basil', image: img('Basil', 'fb8c00'), description: 'Keeps flies and mosquitoes away.', cost: 9 },
      { name: 'Catnip', image: img('Catnip', 'ff9800'), description: 'Natural repellent for mosquitoes and cockroaches.', cost: 13 },
      { name: 'Lemongrass', image: img('Lemongrass', 'ef6c00'), description: 'Citrus smell that insects dislike.', cost: 14 },
      { name: 'Chrysanthemum', image: img('Chrysanthemum', 'f57c00'), description: 'Contains pyrethrum, a natural insecticide.', cost: 16 },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }));
  };

  const handlePlantsClick = () => setShowCart(false);
  const handleCartClick = () => setShowCart(true);

  return (
    <div className="product-list-page">
      <nav className="navbar">
        <div className="navbar-brand" onClick={handlePlantsClick}>
          <img className="logo" src="https://placehold.co/50x50/2e7d32/ffffff?text=PN" alt="Paradise Nursery logo" />
          <div>
            <h3>Paradise Nursery</h3>
            <i>Where Green Meets Serenity</i>
          </div>
        </div>
        <div className="navbar-links">
          <button className="nav-btn" onClick={handlePlantsClick}>Plants</button>
          <button className="nav-btn" onClick={handleCartClick} aria-label="Shopping cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#ffffff">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={handlePlantsClick} />
      ) : (
        <div className="product-list-body">
          {plantsArray.map((category) => (
            <div key={category.category}>
              <h2 className="category-title">{category.category}</h2>
              <div className="product-grid">
                {category.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="product-button"
                      disabled={isInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;

import { useState } from 'react';

const FeelingForm = () => {
  const [feeling, setFeeling] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [favoritePlace, setFavoritePlace] = useState('');

  // Generate 10 random colors
  const colors = Array.from({ length: 10 }, () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { feeling, selectedColor, favoritePlace });
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="feeling" style={{ display: 'block', marginBottom: '0.5rem' }}>
          How are you feeling today?
        </label>
        <input
          type="text"
          id="feeling"
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          What color speaks to you the most?
        </label>
        {colors.map((color, index) => (
          <label key={index} style={{ display: 'block', marginBottom: '0.25rem' }}>
            <input
              type="radio"
              name="color"
              value={color}
              checked={selectedColor === color}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{ marginRight: '0.5rem' }}
            />
            <span
              style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                backgroundColor: color,
                border: '1px solid #000',
                marginRight: '0.5rem',
                verticalAlign: 'middle'
              }}
            ></span>
            {color}
          </label>
        ))}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="favoritePlace" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Write a sentence about your favorite place.
        </label>
        <textarea
          id="favoritePlace"
          value={favoritePlace}
          onChange={(e) => setFavoritePlace(e.target.value)}
          rows="3"
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default FeelingForm;
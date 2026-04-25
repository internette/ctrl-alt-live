import { useState, FormEvent, ChangeEvent } from 'react';
import OpenAI from "openai";
import classnames from 'classnames';
import styles from './FeelingForm.module.scss';

interface NamedColor {
  name: string;
  hex: string;
}

interface FormData {
  feeling: string;
  selectedColorName: string;
  selectedColorHex: string;
  favoritePlace: string;
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY
});

async function generateMonster({ formData }: { formData: FormData }) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: `With the following information, generate a cute monster as an SVG and includes ${formData.selectedColorHex}: Feeling: ${formData.feeling}, Color: ${formData.selectedColorName} (${formData.selectedColorHex}), Favorite Place: ${formData.favoritePlace}` },
    ],
  });

  console.log(completion.choices[0].message.content);
}

const FeelingForm = () => {
  const [feeling, setFeeling] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [favoritePlace, setFavoritePlace] = useState<string>('');

  // Predefined colors with emotional/feeling associations - mix of bold and bright
  const colorPalette: NamedColor[] = [
    { name: "Ocean Blue", hex: "#1e40af" },
    { name: "Sunset Orange", hex: "#ea580c" },
    { name: "Forest Green", hex: "#15803d" },
    { name: "Rose Pink", hex: "#be185d" },
    { name: "Golden Yellow", hex: "#ca8a04" },
    { name: "Lavender Purple", hex: "#7c3aed" },
    { name: "Coral Red", hex: "#dc2626" },
    { name: "Mint Green", hex: "#059669" },
    { name: "Sky Blue", hex: "#0284c7" },
    { name: "Warm Peach", hex: "#ea580c" },
    { name: "Deep Purple", hex: "#8b5cf6" },
    { name: "Emerald Green", hex: "#06b6d4" },
    { name: "Crimson Red", hex: "#dc2626" },
    { name: "Amber Gold", hex: "#f59e0b" },
    { name: "Indigo Blue", hex: "#6366f1" },
    { name: "Teal Blue", hex: "#14b8a6" },
    { name: "Magenta Pink", hex: "#ec4899" },
    { name: "Olive Green", hex: "#84cc16" },
    { name: "Royal Blue", hex: "#3b82f6" },
    { name: "Burnt Orange", hex: "#f97316" }
  ];

  // Generate 10 random colors with names
  const colors: NamedColor[] = [];
  const shuffledPalette = [...colorPalette].sort(() => Math.random() - 0.5);
  for (let i = 0; i < 10 && i < shuffledPalette.length; i++) {
    colors.push(shuffledPalette[i]);
  }

  const isFormValid = feeling.trim() && selectedColor && favoritePlace.trim();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      const selectedColorData = colors.find(color => color.hex === selectedColor);
      const formData = { 
        feeling, 
        selectedColorName: selectedColorData?.name || selectedColor,
        selectedColorHex: selectedColorData?.hex || selectedColor,
        favoritePlace 
      };

      console.log('Form submitted:', { 
        feeling, 
        selectedColor: selectedColorData ? `${selectedColorData.name} (${selectedColorData.hex})` : selectedColor,
        favoritePlace 
      });
      // Handle form submission here
    }
  };

  const handleFeelingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFeeling(e.target.value);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  const handlePlaceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFavoritePlace(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.feelingForm}>
      <div className={classnames(styles.formGroup)}>
        <label htmlFor="feeling" className={styles.formLabel}>
          How are you feeling today?
        </label>
        <input
          type="text"
          id="feeling"
          value={feeling}
          onChange={handleFeelingChange}
          className={styles.formInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          What color speaks to you the most?
        </label>
        <div className={styles.feelingGroup}>
          {colors.map((color, index) => (
            <label key={index} className={classnames(styles.colorOption, {
              [styles.colorOptionSelected]: selectedColor === color.hex
            })}>
              <input
                type="radio"
                name="color"
                value={color.hex}
                checked={selectedColor === color.hex}
                onChange={handleColorChange}
                className={styles.colorRadio}
              />
              <span
                className={styles.colorSwatch}
                style={{ backgroundColor: color.hex }}
              ></span>
              {color.name}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="favoritePlace" className={styles.formLabel}>
          Write a sentence about your favorite place.
        </label>
        <textarea
          id="favoritePlace"
          value={favoritePlace}
          onChange={handlePlaceChange}
          rows={3}
          className={styles.formTextarea}
        />
      </div>

      <button
        type="submit"
        className={classnames(styles.submitButton, {
          [styles.submitButtonDisabled]: !isFormValid
        })}
        disabled={!isFormValid}
      >
        Submit
      </button>
    </form>
  );
};

export default FeelingForm;
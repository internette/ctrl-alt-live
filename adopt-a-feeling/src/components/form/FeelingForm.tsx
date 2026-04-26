import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
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

interface FeelingFormProps {
  setMonster: (monster: string) => void;
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function generateMonster({ formData }: { formData: FormData }): Promise<string> {
  const response = await openai.images.generate({
    model: "gpt-image-1.5",
    background: "transparent",
    output_format: "png",
    prompt: `Create an SVG that features a cute monster in the style of hololive, where the monster is inspired by the following information: Feeling: ${formData.feeling}, Color: ${formData.selectedColorHex}, Favorite Place: ${formData.favoritePlace}. Make sure you include ${formData.selectedColorHex} in the color scheme. Only illustrate the monster, no background or additional elements.`
  });
  const image_base64 = response.data[0].b64_json;
  const mimeType = "image/png";
  const dataUri = `data:${mimeType};base64,${image_base64}`;

  return dataUri || '';
}

const FeelingForm: React.FC<FeelingFormProps> = ({ setMonster }) => {
  const [feeling, setFeeling] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [favoritePlace, setFavoritePlace] = useState<string>('');
  const [colors, setColors] = useState<NamedColor[]>([]);

  // Predefined colors with emotional/feeling associations - mix of bold and bright
  const colorPalette: NamedColor[] = [
    { name: "Ocean Blue", hex: "#1e40af" },
    { name: "Sunset Orange", hex: "#ea580c" },
    { name: "Forest Green", hex: "#15803d" },
    { name: "Golden Yellow", hex: "#ca8a04" },
    { name: "Lavender Purple", hex: "#7c3aed" },
    { name: "Sky Blue", hex: "#0284c7" },
    { name: "Emerald Green", hex: "#06b6d4" },
    { name: "Crimson Red", hex: "#dc2626" },
    { name: "Olive Green", hex: "#84cc16" },
    { name: "Hot Pink", hex: "#ff69b4" },
    { name: "Pale Yellow", hex: "#fde68a" },
    { name: "Pastel Blue", hex: "#bfdbfe" },
    { name: "Midnight Black", hex: "#000000" },
    { name: "Pure White", hex: "#ffffff" }
  ];

  // Generate 10 random colors on component mount
  useEffect(() => {
    const shuffledPalette = [...colorPalette].sort(() => Math.random() - 0.5);
    const selectedColors: NamedColor[] = [];
    for (let i = 0; i < 10 && i < shuffledPalette.length; i++) {
      selectedColors.push(shuffledPalette[i]);
    }
    setColors(selectedColors);
  }, []);

  // Function to regenerate colors (can be called on form submit for fresh colors)
  const regenerateColors = () => {
    const shuffledPalette = [...colorPalette].sort(() => Math.random() - 0.5);
    const selectedColors: NamedColor[] = [];
    for (let i = 0; i < 10 && i < shuffledPalette.length; i++) {
      selectedColors.push(shuffledPalette[i]);
    }
    setColors(selectedColors);
  };

  const isFormValid = feeling.trim() && selectedColor && favoritePlace.trim();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      const selectedColorData = colors.find(color => color.hex === selectedColor);
      const formData = { 
        feeling, 
        selectedColorName: selectedColorData?.name || selectedColor,
        selectedColorHex: selectedColorData?.hex || selectedColor,
        favoritePlace 
      };

      try {
        const monsterContent = await generateMonster({ formData });
        console.log(monsterContent)
        setMonster(monsterContent);
        // Generate new colors for next submission
        regenerateColors();
      } catch (error) {
        console.error('Error generating monster:', error);
        setMonster('');
      }
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
          Write a sentence or two about your favorite place and why it's your favorite place.
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
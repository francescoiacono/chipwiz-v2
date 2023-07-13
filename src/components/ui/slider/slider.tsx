interface SliderProps {
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  value?: number;
  disabled?: boolean;
}

const Slider = ({ onChange, min, max, value, disabled }: SliderProps) => {
  return (
    <div>
      <input
        disabled={disabled}
        type='range'
        min={min || 1}
        max={max || 100}
        value={value || 1}
        id='raiseSlider'
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </div>
  );
};

export default Slider;

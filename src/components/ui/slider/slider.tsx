interface SliderProps {
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  value?: number;
}

const Slider = ({ onChange, min, max, value }: SliderProps) => {
  return (
    <div>
      <input
        type='range'
        min={min || 1}
        max={max || 100}
        id='raiseSlider'
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </div>
  );
};

export default Slider;

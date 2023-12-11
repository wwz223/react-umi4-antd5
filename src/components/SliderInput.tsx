import { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';

const SliderInput = ({
  value = 0,
  max = 100,
  min = 0,
  step = 1,
  onChange,
  noInput,
}: any) => {
  const [inputValue, setInputValue] = useState(value || min);

  const handleChange = (newValue: number | null) => {
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <Row>
      <Col span={16}>
        <Slider
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      {!noInput && (
        <Col span={6}>
          <InputNumber
            min={min}
            max={max}
            style={{ margin: '0 4px' }}
            value={inputValue}
            onChange={handleChange}
          />
        </Col>
      )}
    </Row>
  );
};

export default SliderInput;

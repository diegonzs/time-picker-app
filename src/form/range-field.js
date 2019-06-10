import React from 'react';
import TimeField from './time-field';
// import { TimePicker } from 'antd';
import connectField from 'uniforms/connectField';

const Range = (props) => {
  return (
  <section>
    <TimeField
      name="start"
      value={props.value.start}
      onChange={({ start, end }) => {
        props.onChange({ start, end: props.value.end })
      }}
    />
    <TimeField
      name="end"
      value={props.value.end}
      onChange={({start, end}) => {props.onChange({start: props.value.start, end})}} />
  </section>
)};

const RangeField = connectField(Range, { initialValue: true });

export default RangeField;


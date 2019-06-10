import connectField from 'uniforms/connectField';
import moment from 'moment';
import React from 'react';
import { TimePicker } from 'antd';

const format = 'HH:mm';

const TimeField = (props) => {
	return (
		<TimePicker
			disabled={props.disabled}
			id={props.id}
			name={props.name}
			onChange={
				(start, end) => {
					props.onChange({
						start: typeof start === 'string' ? start : start.format(format).toString(),
						end: typeof end === 'string' ? end : end.format(format).toString(),
					});
					// props.onChange(time.format(format).toString())
				}
			}
			placeholder={props.placeholder}
			ref={props.inputRef}
			value={props.value && moment(props.value, format)}
			format={format}
			required
		/>
	);
};

TimeField.displayName = 'TimeField';

export default connectField(TimeField, { ensureValue: false });

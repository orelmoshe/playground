import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { changeFormat } from './utils/dates.util';
import DatePicker from './components/DatePicker';

const App = () => {
	const [value, setValue] = useState(new Date());

	return (
		<Grid container justify="center" alignItems="center">
			<DatePicker
				value={value}
				setValue={setValue}
				disablePast
				id="datepicker-popover"
				renderInput={(props) => (
					<TextField
						id="input-date"
						label="Selected Date"
						value={changeFormat(value)}
						onClick={props.onClick}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<CalendarTodayIcon />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="start">
									<ExpandMoreIcon />
								</InputAdornment>
							),
						}}
					/>
				)}
			/>
		</Grid>
	);
};

export default App;

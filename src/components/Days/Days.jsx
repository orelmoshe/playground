import React, { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DayOfWeeks } from '../../consts';
import { checkIfSameDate } from '../../utils/dates.util';
import daysStyles from './daysStyles';

const Days = (props) => {
	const { year, month, selectedDay, setSelectedDay, language, handleClose, disablePast } = props;
	const classes = daysStyles();

	const daysTable = useMemo(() => {
		const startDate = new Date(year, month, 1);
		const endDate = new Date(year, month + 1, 0);
		const numberOfWeeks = Math.ceil(((endDate - startDate) / (24 * 3600 * 1000) + 1) / 7) + 1;

		const table = [];
		for (let i = 0; i < numberOfWeeks; i++) {
			table.push([]);
			for (let j = 0; j < 7; j++) {
				if (startDate.getMonth() === month && j === startDate.getDay()) {
					table[i].push(startDate.getDate());
					startDate.setDate(startDate.getDate() + 1);
				} else {
					table[i].push(null);
				}
			}
		}
		return table;
	}, [year, month]);

	const checkDayEqualSelected = useCallback((day) => checkIfSameDate(new Date(year, month, day), selectedDay), [selectedDay, year, month]);

	const checkIfPast = useCallback(
		(day) => {
			const today = new Date();
			const date = new Date(year, month, day);
			const isSame = checkIfSameDate(today, date);
			return disablePast && date.getTime() < today.getTime() && !isSame;
		},
		[year, month, disablePast]
	);

	const handleClick = useCallback(
		(day) => () => {
			if (checkIfPast(day)) {
				return;
			}
			setSelectedDay(new Date(year, month, day));
			handleClose();
		},
		[year, month, handleClose, checkIfPast, setSelectedDay]
	);

	return (
		<Grid container>
			<Grid container justify="space-around" alignItems="center">
				{DayOfWeeks[language].map((dayOfWeek, index) => {
					return (
						<Grid key={index} container justify="center" alignItems="center" item xs={1}>
							<Typography className={classes.holidays}>{dayOfWeek}</Typography>
						</Grid>
					);
				})}
			</Grid>
			<Grid container>
				{daysTable.map((line, indexRow) => {
					return (
						<Grid key={indexRow} container justify="space-around" alignItems="center">
							{line.map((day, indexCol) => {
								return (
									<Grid key={`${indexRow}_${indexCol}`} container item justify="center" alignItems="center" xs={1}>
										<Typography
											className={`${classes.day} ${day && !checkIfPast(day) ? classes.cursor : ''} ${checkDayEqualSelected(day) ? classes.selected : ''} ${checkIfPast(day) ? classes.disable : ''}`}
											onClick={handleClick(day)}
										>
											{day}
										</Typography>
									</Grid>
								);
							})}
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
};

Days.defaultProps = {
	selectedDay: new Date(),
	setSelectedDay: () => {},
	language: 'en',
	handleClose: () => {},
	disablePast: false,
};

Days.propTypes = {
	year: PropTypes.number.isRequired,
	month: PropTypes.number.isRequired,
	selectedDay: PropTypes.instanceOf(Date),
	setSelectedDay: PropTypes.func,
	language: PropTypes.oneOf(['he', 'en', 'ru']),
	handleClose: PropTypes.func,
	disablePast: PropTypes.bool,
};

export default memo(Days);

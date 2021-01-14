import React, { useCallback, useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import Header from '../Header';
import Days from '../Days';
import Months from '../Months';
import { Types, ArrayOfMonths } from '../../consts';
import datePickerStyles from './datePickerStyles';

const DatePicker = (props) => {
	const { value, setValue, language, id: currentId, disablePast, renderInput: RenderInput } = props;
	const classes = datePickerStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = useCallback((event) => {
		setAnchorEl(event.currentTarget);
	}, []);

	const handleClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const open = Boolean(anchorEl);
	const id = open ? currentId : undefined;

	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentView, setCurrentView] = useState(Types.CALENDER);

	const onChangeCurrentView = useCallback((view) => {
		setCurrentView(view);
	}, []);

	const onChangeCurrentYearAndMonth = useCallback((year, month) => {
		setCurrentYear(year);
		setCurrentMonth(month);
	}, []);

	const handleClickPrevious = useCallback(() => {
		if (currentView === Types.MONTHS) {
			setCurrentYear((prev) => prev - 1);
		} else {
			setCurrentMonth((prev) => prev - 1);

			if (currentMonth < 1) {
				setCurrentMonth(11);
				setCurrentYear((prev) => prev - 1);
			}
		}
	}, [currentView, currentMonth]);

	const handleClickNext = useCallback(() => {
		if (currentView === Types.MONTHS) {
			setCurrentYear((prev) => prev + 1);
		} else {
			setCurrentMonth((prev) => prev + 1);

			if (currentMonth > 10) {
				setCurrentMonth(0);
				setCurrentYear((prev) => prev + 1);
			}
		}
	}, [currentView, currentMonth]);

	useEffect(() => {
		if (!value) {
			setValue(new Date());
		}
	}, [value, setValue]);

	return (
		<>
			<RenderInput aria-describedby={id} onClick={handleClick} />

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				classes={{ paper: classes.paper }}
				disablePortal
			>
				<Grid container>
					<Grid container item justify="center" alignItems="center" xs={3}>
						<IconButton onClick={handleClickPrevious}>
							<KeyboardArrowLeft />
						</IconButton>
					</Grid>

					<Grid container item justify="center" alignItems="center" xs={6}>
						<Header year={currentYear} month={currentMonth} currentView={currentView} onChangeCurrentView={onChangeCurrentView} language={language} />
					</Grid>

					<Grid container item justify="center" alignItems="center" xs={3}>
						<IconButton onClick={handleClickNext}>
							<KeyboardArrowRight />
						</IconButton>
					</Grid>
				</Grid>
				{currentView === Types.CALENDER && (
					<Days year={currentYear} month={currentMonth} selectedDay={value} setSelectedDay={setValue} language={language} handleClose={handleClose} disablePast={disablePast} />
				)}
				{currentView === Types.MONTHS && (
					<Months
						arrayOfMonths={ArrayOfMonths[language]}
						onChangeCurrentView={onChangeCurrentView}
						onChangeCurrentYearAndMonth={onChangeCurrentYearAndMonth}
						month={currentMonth}
						year={currentYear}
						language={language}
					/>
				)}
			</Popover>
		</>
	);
};

DatePicker.defaultProps = {
	value: new Date(),
	setValue: () => {},
	language: 'en',
	id: 'datePicker',
	disablePast: false,
	renderInput: () => <>test</>,
};

DatePicker.propTypes = {
	value: PropTypes.instanceOf(Date),
	setValue: PropTypes.func,
	language: PropTypes.oneOf(['he', 'en', 'ru']),
	id: PropTypes.string,
	disablePast: PropTypes.bool,
	renderInput: PropTypes.func,
};

export default memo(DatePicker);

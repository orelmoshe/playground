import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Types, NumberOfMonths } from '../../consts';
import headerStyles from './headerStyles';

const Header = (props) => {
	const { currentView, year, month, onChangeCurrentView, language } = props;
	const classes = headerStyles();

	const getNameOfMonth = useMemo(() => NumberOfMonths[language][month], [month, language]);

	const handleClickMonths = useCallback(() => {
		if (currentView === Types.CALENDER) {
			onChangeCurrentView(Types.MONTHS);
			return;
		}
		onChangeCurrentView(Types.CALENDER);
	}, [currentView, onChangeCurrentView]);

	return (
		<Grid container justify="center" alignItems="center" onClick={handleClickMonths}>
			<Typography className={classes.title}>{currentView === Types.MONTHS ? year : `${getNameOfMonth} ${year}`}</Typography>
		</Grid>
	);
};

Header.defaultProps = {
	currentView: Types.CALENDER,
	onChangeCurrentView: () => {},
	language: 'en',
};

Header.propTypes = {
	currentView: PropTypes.string,
	year: PropTypes.number.isRequired,
	month: PropTypes.number.isRequired,
	onChangeCurrentView: PropTypes.func,
	language: PropTypes.oneOf(['he', 'en', 'ru']),
};

export default memo(Header);

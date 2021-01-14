import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Types, NameOfMonths } from '../../consts';
import monthsStyles from './monthsStyles';

const Months = (props) => {
	const { arrayOfMonths, onChangeCurrentView, onChangeCurrentYearAndMonth, year, month, language } = props;
	const classes = monthsStyles();

	const getNumberOfMonth = useCallback((nameMonth) => NameOfMonths[language].indexOf(nameMonth), [language]);

	const handleClickMonth = useCallback(
		(nameMonth) => () => {
			const numberOfChosenMonth = getNumberOfMonth(nameMonth);
			onChangeCurrentView(Types.CALENDER);
			onChangeCurrentYearAndMonth(year, numberOfChosenMonth);
		},
		[onChangeCurrentView, onChangeCurrentYearAndMonth, year, getNumberOfMonth]
	);

	const isSelectedMonth = useCallback((nameMonth) => year === new Date().getFullYear() && getNumberOfMonth(nameMonth) === month, [year, month, getNumberOfMonth]);

	return (
		<Grid container>
			{arrayOfMonths.map((months, indexRow) => {
				return (
					<Grid container key={indexRow} className={classes.row}>
						{months.map((month, indexCol) => {
							return (
								<Grid
									container
									item
									key={indexCol}
									justify="center"
									alignItems="center"
									xs={4}
									onClick={handleClickMonth(month)}
									className={`${classes.column} ${isSelectedMonth(month) ? classes.selected : ''}`}
								>
									<Typography className={classes.text}>{month}</Typography>
								</Grid>
							);
						})}
					</Grid>
				);
			})}
		</Grid>
	);
};

Months.defaultProps = {
	arrayOfMonths: {
		he: [],
		en: [],
		ru: [],
	},
	onChangeCurrentView: () => {},
	onChangeCurrentYearAndMonth: () => {},
	language: 'en',
};

Months.propTypes = {
	arrayOfMonths: PropTypes.shape({
		he: PropTypes.arrayOf(PropTypes.string),
		en: PropTypes.arrayOf(PropTypes.string),
		ru: PropTypes.arrayOf(PropTypes.string),
	}),
	onChangeCurrentView: PropTypes.func,
	onChangeCurrentYearAndMonth: PropTypes.func,
	year: PropTypes.string.isRequired,
	month: PropTypes.string.isRequired,
	language: PropTypes.oneOf(['he', 'en', 'ru']),
};

export default memo(Months);

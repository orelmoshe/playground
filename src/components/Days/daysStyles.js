import { makeStyles } from '@material-ui/core/styles';

const daysStyles = makeStyles((theme) => ({
	holidays: {
		fontSize: '12px',
		fontWeight: '400',
		lineHeight: '1.66',
		color: theme.palette.grey[400],
	},
	day: {
		height: '36px',
		width: '36px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '5px 0',
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '1.66',
		color: theme.palette.common.black,
		borderRadius: '50px',
		[theme.breakpoints.down('xs')]: {
			height: '30px',
			width: '30px',
			fontSize: '12px',
		},
	},
	selected: {
		backgroundColor: theme.palette.primary.light,
	},
	cursor: {
		cursor: 'pointer',
	},
	disable: {
		color: theme.palette.grey[400],
	},
}));

export default daysStyles;

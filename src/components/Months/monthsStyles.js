import { makeStyles } from '@material-ui/core/styles';

const monthsStyles = makeStyles((theme) => ({
	row: {
		height: '40px',
	},
	column: {
		cursor: 'pointer',
	},
	selected: {
		backgroundColor: theme.palette.primary.light,
	},
	text: {
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '1.66',
		color: theme.palette.common.black,
	},
}));

export default monthsStyles;

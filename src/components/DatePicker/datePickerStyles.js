import { makeStyles } from '@material-ui/core/styles';

const datePickerStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: '420px',
		height: '344px',
		[theme.breakpoints.down('xs')]: {
			maxWidth: '385px',
			height: '315px',
		},
	},
}));

export default datePickerStyles;

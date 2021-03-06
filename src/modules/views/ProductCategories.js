import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';


const styles = (theme) => ({
  root: {

	marginBottom: theme.spacing(4),
  },
  images: {
	marginTop: theme.spacing(6),
	display: 'flex',
	flexWrap: 'wrap',
  },
  imageWrapper: {
	position: 'relative',
	display: 'block',
	padding: 0,
	borderRadius: 0,
	height: '40vh',
	[theme.breakpoints.down('sm')]: {
	  width: '100% !important',
	  height: 100,
	},
	'&:hover': {
	  zIndex: 1,
	},
	'&:hover $imageBackdrop': {
	  opacity: 0.15,
	},
	'&:hover $imageMarked': {
	  opacity: 0,
	},
	'&:hover $imageTitle': {
	  border: '4px solid currentColor',
	},
  },
  imageButton: {
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	color: theme.palette.common.white,
  },
  imageSrc: {
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundSize: 'cover',
	backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	background: theme.palette.common.black,
	opacity: 0.5,
	transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
	position: 'relative',
	padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 20px`,
  },
  imageMarked: {
	height: 3,
	width: 18,
	background: theme.palette.common.white,
	position: 'absolute',
	bottom: -2,
	left: 'calc(50% - 9px)',
	transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {

  const { classes, restaurants, onRestaurantClick, } = props;
			
  return (
	<Container className={classes.root} component="section">
	  <div className={classes.images}>
		{restaurants.map((restaurant, idx) => {
			const { restaurant_name, restaurant_avatar_urls } = restaurant;
			return (

		
		  <ButtonBase
		  	key={idx}
			className={classes.imageWrapper}
			style={{
			  width: '33%',
			}}
			onClick={() => onRestaurantClick(restaurant)}
		  >
			<div
			  className={classes.imageSrc}
			  style={{
				backgroundImage: `url(${restaurant_avatar_urls[0]})`,
			  }}
			/>
			<div className={classes.imageBackdrop} />
			<div className={classes.imageButton}>
			  <Typography
				component="h3"
				variant="h6"
				color="inherit"
				className={classes.imageTitle}
			  >
				{restaurant_name}
				<div className={classes.imageMarked} />
			  </Typography>
			 
			</div>

		  </ButtonBase>
		);
	  }
		)}
	  </div>
	</Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);

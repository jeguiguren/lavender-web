import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const styles = (theme) => ({
  root: {
	marginTop: theme.spacing(8),
	marginBottom: theme.spacing(4),

  },

  margin: {
    margin: theme.spacing(1),
  },
  listContainer: {
	width: '100%',
    maxWidth: '45%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 400,
    padding: 0,

  },
  images: {
	marginTop: theme.spacing(8),
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center'
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

function ScrollableList(props) {

	const { classes, header, items, onClick } = props;
	let sortedItems = items;
	sortedItems.sort(function(a,b) { return a.item_name < b.item_name ? -1 : 1});

	return (  
		  <List className={classes.listContainer}>
		  	<ListSubheader>{header}</ListSubheader>
        
			{sortedItems.map(item => {
		  	const price = '$' + Number.parseFloat(item.unit_price).toFixed(2);
		  	return (
			  	<ListItem key={item.item_id}>
			        <ListItemText primary={item.item_name} secondary={price} />
			        {onClick &&
			        <ListItemSecondaryAction onClick={() => onClick(item)}>
			        	<Fab size="small" color="primary" aria-label="add">
						  	<AddIcon />
						</Fab>
			        </ListItemSecondaryAction>
			    	}
			    	{!onClick &&
			        <ListItemSecondaryAction>
			        	<Fab size="small" color="primary" aria-label="add">
						  	{item.count}
						</Fab>
			        </ListItemSecondaryAction>
			    	}
			    </ListItem>);
			})}
	      </List>
  );
}


function ProductOrder(props) {

	const { classes, myRef, restaurant, table, items, purchases, onItemClick } = props;
	const totalPrice = Number.parseFloat(purchases.reduce((acc, curr) => acc + (curr.unit_price * curr.count), 0)).toFixed(2);
	
	return (
		<Container className={classes.root} component="section" ref={myRef}>
			 <Typography variant="h5" component="h5">
				{restaurant?.restaurant_name}
		  	</Typography>
		  	<Typography variant="h5" component="h5">
				TABLE {table}
		  	</Typography>
		  
		  	<Grid container style={{justifyContent: 'space-between'}}>
		  		<ScrollableList items={items} classes={classes} header="Menu Items" onClick={onItemClick}/>
				<ScrollableList items={purchases} classes={classes} header={`Your Total: $ ${totalPrice}`}/>
			</Grid>
		</Container>
  );
}

ProductOrder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductOrder);

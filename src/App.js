import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React, { useEffect, useState, useRef } from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductTables from './modules/views/ProductTables';
import ProductQr from './modules/views/ProductQr';
import ProductOrder from './modules/views/ProductOrder';

//import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
//import ProductValues from './modules/views/ProductValues';
//import ProductHowItWorks from './modules/views/ProductHowItWorks';
import Checkout from './modules/checkout/Checkout';

import { getRestaurant, getRestaurants, generateQrCode, getItems, addPurchase } from './modules/components/Api';

//import ProductCTA from './modules/views/ProductCTA';
//import AppAppBar from './modules/views/AppAppBar';



const scrollToRef = (ref) => {
	window.scrollTo({top: ref.current?.offsetTop - 30, behavior: 'smooth'});
  }   

function Index() {

	const restaurantRef = useRef(null);
	const tableRef = useRef(null);
	const qrRef = useRef(null);
	const orderRef = useRef(null);

	const [restaurants, setRestaurants] = useState([]);
	const [restaurant, setRestaurant] = useState(null);
	const [table, setTable] = useState(null);
	const [qrCode, setQrCode] = useState(null);
	const [items, setItems] = useState([]);
	const [purchases, setPurchases] = useState([]);

	useEffect(() => {
	  	getRestaurants().then(res => {
			const restaurant_ids = res.restaurants;
			let promises = [];
			for (var i = 0; i < restaurant_ids.length; i++) {
			  promises.push(getRestaurant(restaurant_ids[i]));
			}
			Promise.all(promises).then((responses) => {
			  	const restaurants = responses.map(r => r.restaurant);
			  	setRestaurants(restaurants);  
			  	}
				);    
			})
  	}, []);


  	useEffect(() => {
	  	if (restaurant && table) {
	  		generateQrCode(restaurant.restaurant_id, table)
	  		.then(res => setQrCode(res));
	  	}
  	}, [restaurant, table]);

  	useEffect(() => {
	  	if (restaurant) {
	  		getItems(restaurant.restaurant_id)
	  		.then(res => setItems(res.items));
	  	}
  	}, [restaurant]);

  	const onRestaurantClick = (restaurant) => {
  		if (qrCode == null) {
  			setRestaurant(restaurant);
			setTable(null);	
			setQrCode(null);
			scrollToRef(tableRef);
		} else {
			alert('You are already checked in');
		}
  	}
  	const onTableClick = (table) => {
  		if (qrCode == null) {
  			if (restaurant) {
			  	setTable(table);
				scrollToRef(qrRef);
			} else {
				alert('Please select a restaurant first');
			}
		} else {
			alert('You are already checked in');
		}
	}

	const onItemClick = (item) => {
		if (qrCode == null) {
  			alert('You must first check in');
		} else {
			// addPurchase(restaurant.restaurant_id, table, [item.item_id])
			// .then(res => {
			// 	let p = purchases;
			// 	p.add(item);
			// 	setPurchases(p);
			// });
			const idx = purchases.findIndex((elem) => elem.item_id == item.item_id);
			if (idx == -1) {
				item.count = 1;
				setPurchases(purchases => purchases.concat([item]));	
			}
			else {
				let newPurchases = JSON.parse(JSON.stringify(purchases));
				newPurchases[idx].count = newPurchases[idx].count + 1;
				setPurchases(newPurchases);
			}
		}
	}
	const onDoneClick = () => {
	  	scrollToRef(orderRef);
	}

  	return (
		<React.Fragment>
		  <ProductHero onStartClick={() => {
				scrollToRef(restaurantRef);
		  	}}/>
		  <ProductCategories myRef={restaurantRef} restaurants={restaurants} onRestaurantClick={onRestaurantClick}/>
		  <ProductTables myRef={tableRef} onTableClick={onTableClick}/>
		  <ProductQr myRef={qrRef} qrCode={qrCode} onDoneClick={onDoneClick}/>
		  <ProductOrder myRef={orderRef} restaurant={restaurant} items={items} table={table} purchases={purchases} onItemClick={onItemClick}/>
		  <AppFooter/>
		 </React.Fragment>
	  );
}

export default withRoot(Index);

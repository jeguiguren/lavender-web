
import React, { useEffect, useState, useRef } from 'react';

import ProductHowItWorks from './ProductHowItWorks';
import ProductCategories from './ProductCategories';
import ProductTables from './ProductTables';
import ProductQr from './ProductQr';
import ProductOrder from './ProductOrder';
import AppFooter from './AppFooter';
import ProductHero from './ProductHero';


import Typography from '../components/Typography';
import { getRestaurant, getRestaurants, generateQrCode, getItems, addPurchase } from '../components/Api';

//import ProductSmokingHero from './modules/views/ProductSmokingHero';
//import ProductValues from './modules/views/ProductValues';

//import ProductCTA from './modules/views/ProductCTA';
//import AppAppBar from './modules/views/AppAppBar';

const scrollToRef = (ref) => {
	window.scrollTo({top: ref.current?.offsetTop + 36, behavior: 'smooth'});
}

function RefSection({ myRef, prevEnabled, enabled, children, title}) {
	const sectionStyle = {
		overflow: 'hidden',
		minHeight: '100vh',
		alignItems: 'center',
		flexDirection: 'column',
		display: 'flex',
		paddingTop: 60,
	}

	if (!enabled) {
		return prevEnabled ? <section style={sectionStyle} ref={myRef} /> : null;
	}
	else {
		return (
			<section style={sectionStyle} ref={myRef}>
				<Typography variant="h4" marked="center" component="h2">
					{title}
				</Typography>
				{children}
			</section>
		);	
	}
}   
//

function ProductRoot() {

	const stepsRef = useRef(null);
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
		if (qrCode === null) {
			setRestaurant(restaurant);
			setTable(null);	
			setQrCode(null);
			scrollToRef(tableRef);
		} else {
			alert('You are already checked in');
		}
	}
	const onTableClick = (table) => {
		if (qrCode === null) {
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
		if (qrCode === null) {
			alert('You must first check in');
		} else {
			// addPurchase(restaurant.restaurant_id, table, [item.item_id])
			// .then(res => {
			// 	let p = purchases;
			// 	p.add(item);
			// 	setPurchases(p);
			// });
			const idx = purchases.findIndex((elem) => elem.item_id === item.item_id);
			if (idx === -1) {
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


	const sections = [
		{
			title: 'How it Works',
			ref: stepsRef,
			enabled: true,
			onClick: () => scrollToRef(restaurantRef),
		},
		{
			title: 'Pick a Restaurant',
			ref: restaurantRef,
			enabled: true,
			onClick: onRestaurantClick,
		},
		{
			title: 'Pick a Table',
			ref: tableRef,
			enabled: restaurant != null,
			onClick: onTableClick,
		},
		{
			title: 'Scan the QR Code',
			ref: qrRef,
			enabled: restaurant != null && table != null,
			onClick: onDoneClick,
		},
		{
			title: 'Place an Order',
			ref: orderRef,
			enabled: qrCode != null,
			onClick: onDoneClick,
		},
	]

	const generateComponent = (idx, onClick) => {
		if (idx === 0) {
			return <ProductHowItWorks onClick={onClick}/>;
		} else if (idx === 1) {
			return <ProductCategories restaurants={restaurants} onRestaurantClick={onRestaurantClick}/>;
		} else if (idx === 2) {
			return <ProductTables onTableClick={onTableClick}/>;
		} else if (idx === 3) {
			return <ProductQr qrCode={qrCode} onDoneClick={onDoneClick}/>;
		} else if (idx === 4) {
			return <ProductOrder restaurant={restaurant} items={items} table={table} purchases={purchases} onItemClick={onItemClick}/>;
		} else {
			return null;
		}
	}
	return (
		<React.Fragment>
			<ProductHero onStartClick={() => scrollToRef(stepsRef)}/>
			{sections.map((section, idx) =>
				<RefSection prevEnabled={idx === 0 || sections[idx-1].enabled} enabled={section.enabled} myRef={section.ref} key={idx} title={section.title}>
					{generateComponent(idx, section.onClick)}
				</RefSection>
			)}	
			<AppFooter/>
		</React.Fragment>
	  );
}


export default ProductRoot;

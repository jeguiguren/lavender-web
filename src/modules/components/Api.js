
import axios from 'axios';



const apiGetRequest = (url, apiName, params={}) => {
	console.log("Get Request to " + apiName);
	return axios.get(url, params)
	.then(res => {
		return res.data;
	})
	.catch(error => {
		console.log(error);
		return Promise.reject('Error in ' + apiName, error);
	});
}

const apiPostRequest = (url, body, apiName) => {
	console.log("Post Request to " + apiName);
	const headers = {
    };


	return axios.post(url, body, { headers })
	.then(res => {
		//console.log(res);
		return res.data;
	})
	.catch(error => {
		console.log(error);
		return Promise.reject('Error in ' + apiName, error);
	});
}

// const body = {
// 		cht: 'qr',
// 		chs: '100x100',
// 		chl: {
// 			restaurant_id: restaurantId,
// 			table_number: tableNumber,
// 		}
// 	}

// 	const url = 'https://chart.googleapis.com/chart?' + JSON.stringify(body);



export const generateQrCode = (restaurantId, tableNumber) => {
	const body = {
		restaurant_id: restaurantId,
		table_number: tableNumber,
	};

	const url = 'https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=' + JSON.stringify(body);
	return apiGetRequest(url, "generateQrCode", {responseType: 'blob'});
}



export const getRestaurant = (restaurantId) => {
	const url = 'https://haf4vfsqx2.execute-api.us-east-1.amazonaws.com/dev/get-restaurant';
	const body = {
		"restaurant_id": restaurantId,
		"eater_id": "1fa045fb-ed9d-4608-a84c-558dd2ce2ce",
	}
	return apiPostRequest(url, body, "getRestaurant");
}

export const addPurchase = (restaurantId, tableNumber, itemIds) => {
	const url = 'https://it7utwer57.execute-api.us-east-1.amazonaws.com/dev/add-purchase';
	const body = {
		restaurant_id: restaurantId,
		table_number: tableNumber,
		item_ids: itemIds
	}
	console.log(body);
	return apiPostRequest(url, body, "addPurchase");
}



export const getItems = (restaurantId) => {
	const url = 'https://3uldp5hst7.execute-api.us-east-1.amazonaws.com/dev/get-items';
	const body = {
		"restaurant_id": restaurantId,
	}
	return apiPostRequest(url, body, "getItems");
}

export const getRestaurants = () => {
	const url = 'https://haf4vfsqx2.execute-api.us-east-1.amazonaws.com/dev/get-restaurants';
	return apiGetRequest(url, "getRestaurants");
}

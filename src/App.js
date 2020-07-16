import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductRoot from './modules/views/ProductRoot';

function Index() {
	return (
		<ProductRoot />
	  );
}

export default withRoot(Index);

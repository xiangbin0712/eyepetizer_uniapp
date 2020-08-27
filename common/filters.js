const setSwiperData = (value) => {
	if (!value.length) return
	let arr = [];
	value.forEach(item => {
		arr.push(item.data);
	});
	return arr;
}




export {
	setSwiperData
}

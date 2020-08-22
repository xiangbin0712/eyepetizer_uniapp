function getDateTimeBefor(publishtime) {
	let currTime = Date.parse(new Date());
	let interval = parseInt(currTime) - parseInt(publishtime);
	let time = interval / 1000;
	// 少于一分钟
	if (time < 60) {
		return "刚刚";
	}

	// 秒转分钟
	var minuies = time / 60;
	if (minuies < 60) {
		return Math.floor(minuies) + "分钟前";
	}

	// 秒转小时
	var hours = time / 3600;
	if (hours < 24) {
		return Math.floor(hours) + "小时前";
	}
	//秒转天数
	var days = time / 3600 / 24;
	if (days < 30) {
		return Math.floor(days) + "天前";
	}
	//秒转周
	var week = time / 3600 / 24 / 7;
	if (week < 7) {
		return Math.floor(week) + "天前";
	}
	//秒转月
	var months = time / 3600 / 24 / 30;
	if (months < 12) {
		return Math.floor(months) + "月前";
	}
	//秒转年
	var years = time / 3600 / 24 / 30 / 12;
	return Math.floor(years) + "年前";
}

export {
	getDateTimeBefor
}

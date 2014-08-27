Template.header.helpers({
	notAndroid: function(){
		if(!navigator){
			return true;
		}
		return !navigator.userAgent.match(/Android/i);
	}
});

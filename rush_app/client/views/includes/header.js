Template.header.helpers({
	notAndroid: function(){
		if(!navigator){
			return false;
		}
		return !navigator.userAgent.match(/Android/i);
	}
});

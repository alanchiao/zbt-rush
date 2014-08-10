Template.driver.helpers({
	isDriverWaiting: function(){
		console.log(this.status);
		return this.status === Drivers.states.WAITING;
	},
	isDriverUnacked: function(){
		console.log(Drivers.states.UNACKED);
		return this.status === Drivers.states.UNACKED;
	},
	isDriverAcked: function(){
		return this.status === Drivers.states.ACKED;
	}
});

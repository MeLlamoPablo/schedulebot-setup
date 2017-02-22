module.exports = function errorHandler(err) {
	console.error(err);
	Materialize.toast("An error occurred while processing the request.", 5000);
};
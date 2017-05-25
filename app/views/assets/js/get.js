const ajax = new Ajax();
const get = ajax.get;

class GetRequests {
	categories (callback) {
		get('/categories', (error, response) => {
			if (!error) {
				callback(!response.error ? response.data.replace(/[\[\]'"]+/g, '').split(',') : []);
			} else {
				console.log(error);
				callback([]);
			}
		});
	}
}
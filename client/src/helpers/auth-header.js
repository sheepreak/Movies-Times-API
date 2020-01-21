export function authHeader() {
	let user = JSON.parse(localStorage.getItem('user'));

	return user && user.authdata ? { Authorization: 'Basic ' + user.authdata } : {};
}
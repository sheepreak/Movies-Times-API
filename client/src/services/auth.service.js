import config from './../env';
import { authHeader } from './../helpers/auth-header';

const login = (username, password) => {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({username, password})
	};

	return fetch(`${config.apiUrl}/login`, requestOptions)
		.then(handleResponse)
		.then(user => {
			if (user) {
				user.authdata = window.btoa(username + ':' + password);
				localStorage.setItem('user', JSON.stringify(user));
			}
		})
};

const getAll = () => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
};

const logout = () => {
	localStorage.removeItem('user');
};

const handleResponse = (response) => {
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				logout();
				window.location.reload();
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	})
};

export const authService = {
	login,
	logout,
	getAll
};
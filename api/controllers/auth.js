
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client();
const config = require('./../../env');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
	try {
		const body = req.swagger.params.body.value;

		if (! (body && body.username && body.password) ) {
			console.log('missing arguments');
			return res.status(400).send({message: 'missing arguments'});
		}

		let user = await client.search({
			index: config.indices.users,
			body: getUserByUsernameQuery(body.username)
		});

		if (!user.hits.hits.length) {
			console.log('no user by this username');
			return res.status(500).send({message: 'no user by this username'});
		}

		user = user.hits.hits[0]._source;

		const hashedPasswordPassed = bcrypt.compareSync(body.password, user.hash, 10);

		if (hashedPasswordPassed) {
			return res.status(200).json(user);
		} else {
			return res.status(401).send({message: 'wrong credentials'});
		}
	} catch (e) {
		console.log(e);
		return res.status(500).send({message: e});
	}
};

const getUserByUsernameQuery = (username) => {
	return {
		size: 1,
		query: {
			bool: {
				must: [
					{
						term: {
							username: {
								value: username
							}
						}
					}
				]
			}
		}
	}
};

module.exports = {
	login
};
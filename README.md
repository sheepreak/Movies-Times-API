# Movies Time API

## Installation

#### Launch Elasticsearch and Kibana on local environment:

- You need Docker installed on your system
- Type `docker-compose up -d` in the scripts folder

Elasticsearch is now available on http://localhost:8100/

Kibana is now available on http://localhost:5601/

#### Swagger

This application uses swagger. Routes are listed in `api/swagger/swagger.yaml`

## Model

#### Movie

- ID - string: the unique ID to find a movie on the database
- Name - string: Movie name
- Release Date - number (epochmillis): Original release date of the movie
- Poster - string: Local path to the poster of the movie (to be changed with something better if possible)

#### User (to be confirmed after auth is done)

- ID - string: User ID
- Email - string: User mail (may be in token ?)
- Token - string: User token containing their infos

#### Subscription

- ID - string: unique ID of the subscription
- Movie ID - string: ID of the Movie
- User ID - string: ID of the User
- Subscription date - number (epochmillis)
- Watched - boolean: indicates if the user has seen the movie yet
- Watch date - number (epochmillis): indicates when the user has seen the movie

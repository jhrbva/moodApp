# J^3 - MoodApp

## To run the project locally

(1) Clone the repo
(2) run `npm install`
(3) run `node app.js`

### Create a database
(1) type `tableCreation.sql` in the MariaDB command line
(2) The connection information in app.js is using `user: root` and `password: password`

## The app

A mood tracker with a calendar view for moods and a randomized visualizer for artistic representation of user submitted mood data.

The app for demonstration purposes assumes that the data being used applies to a user called “test” which is created in the table creation script.  As such, their name is hardcoded into several points in the app itself.  A full build would allow for the creation of additional users, as well as a login screen.  Simple adjustments in the queries would allow for the data retrieved from the database to be user dependent, rather than tied directly to the user “test.”

In the table creation script you will find two tables: UserDefinedEvent, and UserEventsByTime, which are currently unutilized in the app.  In an extended build, users would be able to define their own events and submit the times when they occur. These events could then be crossreferenced with the UserMoodsByTime table to retrieve metrics relevant to the correlation between certain moods and specific user defined life events.

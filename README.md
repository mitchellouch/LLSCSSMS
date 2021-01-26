# LLSCSSMS

Lamb Learner Success Center Student Services Management System

controllers: Define your app route handlers and business logic.
util: Writes utility/helper functions here which can be used by any controllers.
middlewares: You can write middlewares to interpret all incoming requests before moving to the route handler.
models: also a kind of middleware between your controller and the database. You can define a schema and do some validation before writing to the database.
routes: Define your app routes, with HTTP methods. For example, you can define everything related to the user.
public: Store static images in/img, custom JavaScript files, and CSS /css
views: Contains templates to be rendered by the server.
tests: Here you can write all the unit tests or acceptance tests for the API server.
app.js: Acts as the main file of the project where you initialize the app and other elements of the project.
package.json: Takes care of the dependencies, the scripts to run with the npm command, and the version of your project.

# Ginja Ionic 2 Test project

## Test project

Welcome! This is the Ginja Ionic 2 test project. The purpose of this project is to gauge your level of experience and skill with our technology stack, namely: Ionic 2, Angular 2 and RESTful JSON services.

To complete this project, you will need to log-in to our API, then retrieve and display a list of orders from a restaurant.

By the time you're finished, it should look something like [this](http://res.cloudinary.com/ginja-co-ltd/image/upload/v1478242292/ionic-test-project_eyejrm.png):

![Vendor console demo](http://res.cloudinary.com/ginja-co-ltd/image/upload/v1478242292/ionic-test-project_eyejrm.png)

There will be two API calls required.

```
POST /api/v1/oauth/access_token
{
  username: 'corey@ginja.co.th',
  password: 'super-top-secret-password',
  grant_type: 'password',
  client_id: 'vendor-console',
  client_secret: 'super-top-secret-token',
  scope: 'vendor'
}
```

This will create the access token required to interact with the API (the access token should be sent in a HTTP header for all future requests, "Authorization: Bearer TOKEN_GOES_HERE").

The second request is to retrieve the orders for a restaurant:

```
GET /api/v1/vendors/orders/completed
{
  data: [
    /* list of restaurants in here */
  ]
}
```

## Set up

Please run 

`npm -v`  on your command line 

If you have npm verson < 3.x please run this command:

```
sudo npm install npm@latest -g
```
 
 to upgrade your npm package
 
### Before Install Ionic

Check your ionic version by

`ionic -v`

... if you have `ionic version 2 beta 11`

please uninstall ionic before run any command by

`sudo npm uninstall -g ionic`

### Installation

Install Ionic and Cordova by running the following command in your terminal:

`npm install -g cordova`

`npm install -g ionic`

or

`sudo npm install -g cordova`

`sudo npm install -g ionic`

### Check the installation

You should now have everything you need set up and ready to use on your machine! To verify that the

Ionic CLI (Command Line Interface) is in fact installed on your computer, run the following command:

`ionic -v`

You can also get some detailed information about your current installation by running the following com-
mand from within an Ionic project:

`ionic info`

### Run the project 

You will need to access the project by

`cd ginja-ionic-test-vendor`

and then run the `npm install`

and finally run

`ionic serve `

to run the project, which will automatically open in your default web browser.


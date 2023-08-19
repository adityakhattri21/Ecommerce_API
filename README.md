# Ecommerce_API
The Ecommerce CRUD API is a RESTful web service designed to manage the basic operations of an ecommerce platform. This API allows you to Create, Read, Update, and Delete (CRUD) various resources related to products, categories, users, and orders. It provides a straightforward way to interact with your ecommerce database programmatically.

## Getting Started
Make sure you have Node.js and MongoDB is installed in your system . A package manager is also required , It can be any one of your 
choice however I recommend NPM .

1. Clone this repository
```git clone https://github.com/<Your_User_Name>/TicketAssignAPI.git```
2. Now go into the directory containing the project.
3. Install the dependencies using ```npm intall``` or  ```npm i```
4. Now start the server using ```npm start``` . Your server will  start at Localhost:5000.

## Routes
The API consists of 4 main Routers pertaining to following Models and have routes inside them.
1. USER : This router is responsible for User actions.
    1. ```/register``` : Register a user . Expects user name , email and password in request body.
    2. ```/login```    : Login route for registered user . Takes email and password as input.
    3. ```/logout```   : Logout route for user.
    4. ```/me```         : User profile details for signed in user.
    5. ```/me/update``` : Update the current user profile. Takes user name , email as input.
    6. ```/password/update```: Update the password of the current user . Takes old , new and confirm password as input.
    7. ```/admin/users```: Get all users --ADMIN ROUTE.
    8. ```/admin/user/:id```: Get a single user --ADMIN ROUTE.
    9. ```/admin/user/:id``` : Update user role . Takes role as request body --ADMIN ROUTE.
    10. ```/admin/user/:id``` : Delete a user --ADMIN ROUTE.

2. PRODUCT : This router is responsible for Product actions.
    1. ```/products``` : Get all products.
    2. ```/product/"id```    : Get a Single Product.
    3. ```/admin/product/new```   : Add a new product. Takes name , price , description , category as input --ADMIN ROUTE.
    4. ```/admin/product/:id```   : Update a product. Takes similar input as create product --ADMIN ROUTE.
    5. ```/admin/product/:id``` : Delete a product --ADMIN ROUTE.
    6. ```/password/update```: Update the password of the current user . Takes old , new and confirm password as input.
    7. ```/review```: Create/Update review for a product. Takes productId , comment and rating as input.
    8. ```/review```: Get all reviews of a product. Takes productId as query parameter.
    9. ```/review``` : Delete review of a particular product. Takes productId and review id as query parameter.
  
3. ORDER : This router is responsible for Order actions.
    1. ```/order/new``` : Create a new order with following inputs. <img src="https://github.com/adityakhattri21/Ecommerce_API/assets/101019545/9ee965d2-cb50-408a-a8fe-fc430abdae67" height="400px" width="400px" />
    2. ```/order/"id```    : Get a Single Order.
    3. ```/order/me```   : Get orders of current user.
    4. ```/admin/orders```   : Get All Orders --ADMIN ROUTE.
    5. ```/admin/order/:id``` : Delete a order --ADMIN ROUTE.
    6. ```/admin/order/:id```: Update the status of an order. Takes status as input --ADMIN ROUTE.

4. CART : This router is responsible for Cart actions.
    1. ```/addToCart``` : Add a Product to the cart of current user . Takes product id and quantity as input.
    2. ```/delete/"id```    : Remove the cart of the current user.
    3. ```/allCart```   : Get all the carts --ADMIN ROUTE.

## Salient Features.
1. Use of JWT for session management and auth.
2. Hashed Password storage for security.
3. Protected routes based on role.
4. Global exception handler that gives declarative error message and status code .
5. Search and Filters in product searching.
6. Pagination in product searching.

## Future Improvements
1. Use of OAuth.
2. Integration of payment gateway.
3. Use of CDN to store images.
4. Email notifications.

## Contribution
The project was made for educational purposes and there might be some error and scope of improvements. Contributions and 
fixes are welcomed . Please Fork the repo , make changes and generate a pull request for the same.

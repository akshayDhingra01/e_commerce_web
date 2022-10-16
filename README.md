# e_commerce_web
E commerce website using node js

To start the site:
```
npm run start
```
API's
```
POST /api/auth/register
```
Register a user (accept username, email id, password, type of user - buyer/seller, is Admin)
```
POST /api/auth/login
```
Let a previously registered user log in (e.g. retrieve authentication token)
```
GET /api/buyer/list-of-sellers
```

```
Get a list of all sellers
```
```
GET /api/buyer/seller-catalog/:seller_id
```
```
Get the catalog of a seller by seller_id
```
```
POST /api/buyer/create-order/:seller_id
```
Send a list of items to create an order for seller with id = seller_id
```
POST /api/seller/create-catalog
```
Send a list of items to create a catalog for a seller
```
GET /api/seller/orders
```
Retrieve the list of orders received by a seller
```
GET api/products/
```
Will give list of all products
```
POST api/products/
```
Will let user to enter details of the product

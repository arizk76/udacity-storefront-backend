# Storefront API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. Storefront backend project aim to build RESTful APIs that will meet company requirements.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Products

-   Index
    (http://localhost:5000/api/v1/products) GET
-   Show (args: product id)
    (http://localhost:5000/api/v1/products/id) GET with body including {id: ""}
-   Create [args: Product](token required)
    (http://localhost:5000/api/v1/products) with body including {name: "", price:"",} and Authorization Header including token

### Users

-   Index [token required]
    (http://localhost:5000/api/v1/users) GET and Authorization Header including token
-   Show [args: id](token required)
    (http://localhost:5000/api/v1/users/id) GET with body including {id: ""} and Authorization Header including token
-   Create [args: User](token required)
    (http://localhost:5000/api/v1/users) POST with body including {}

### Orders

-   Current Order by user [args: user id](token required)
-   (http://localhost:5000/api/v1/orders/userID) GET with body including {userID: ""} and Authorization Header including token

## Data Shapes

### Product

-   id
-   name
-   price

### User

-   id
-   user_name
-   first_name
-   last_name
-   password

### Order

-   id
-   user_id
-   order_status

### OrderProducts

-   id
-   quantity
-   order_id
-   product_id

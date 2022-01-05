# Storefront API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. Storefront backend project aim to build RESTful APIs that will meet company requirements.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Products

-   Index
-   Show (args: product id)
-   Create [args: Product](token required)
-   [OPTIONAL] Top 5 most popular products
-   [OPTIONAL] Products by category (args: product category)

### Users

-   Index [token required]
-   Show [args: id](token required)
-   Create [args: User](token required)

### Orders

-   Current Order by user [args: user id](token required)
-   [OPTIONAL] Completed Orders by user [args: user id](token required)

## Data Shapes

### Product

-   id
-   name
-   price
-   [OPTIONAL] category

### User

-   id
-   firstName
-   lastName
-   password

### Order

-   id
-   id of each product in the order
-   quantity of each product in the order
-   user_id
-   status of order (active or complete)

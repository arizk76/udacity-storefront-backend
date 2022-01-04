CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    product_id integer,
    user_id integer,
    product_quantity integer,
    order_status VARCHAR(25)
);
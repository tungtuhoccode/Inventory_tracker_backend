SELECT
    products.id,  
    products.barcode,
    products.product_name, 
    products.price, 
    products.import_price, 
    products.stock, 
    brands.brand_name AS brand,
    storage_locations.location_name AS location,
    categories.category_name AS category,
    newImages.image_urls
FROM products 
    JOIN brands ON brands.id = products.brand_id
    JOIN categories ON categories.id = products.category_id
    JOIN storage_locations ON storage_locations.id = products.storage_location_id
    JOIN (
        SELECT product_id, array_agg(image_url) AS image_urls
        FROM images
        GROUP BY product_id
    ) AS newImages ON newImages.product_id = products.id
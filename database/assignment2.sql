-- 1. Insert a new record into the account table
INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- 2. Modify Tony Stark's record to change the account_type to "Admin"
UPDATE public.account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';
-- 3. Delete Tony Stark's record from the database
DELETE FROM public.account
WHERE account_email = 'tony@starkent.com';
-- 4. Update the description of the "GM Hummer" record
UPDATE public.inventory
SET inv_description = REPLACE(
        inv_description,
        'small interior',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
-- 5. Select make, model, and classification name for inventory items in the "Sport" category
SELECT i.inv_make,
    i.inv_model,
    c.classification_name
FROM public.inventory i
    INNER JOIN public.classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';
-- 6. Update all inventory records to modify image paths by adding "/vehicles"
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
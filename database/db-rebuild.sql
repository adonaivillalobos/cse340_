-- Drop tables if they exist to avoid conflicts
DROP TABLE IF EXISTS public.account;
DROP TABLE IF EXISTS public.inventory;
DROP TABLE IF EXISTS public.classification;
DROP TYPE IF EXISTS public.account_type;
-- Create the account_type ENUM type
CREATE TYPE public.account_type AS ENUM ('Client', 'Admin');
-- Table: public.account
CREATE TABLE IF NOT EXISTS public.account (
    account_id SERIAL PRIMARY KEY,
    account_firstname VARCHAR NOT NULL,
    account_lastname VARCHAR NOT NULL,
    account_email VARCHAR NOT NULL UNIQUE,
    account_password VARCHAR NOT NULL,
    account_type public.account_type NOT NULL DEFAULT 'Client'
);
-- Table: public.classification
CREATE TABLE IF NOT EXISTS public.classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR NOT NULL
);
-- Table: public.inventory
CREATE TABLE IF NOT EXISTS public.inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR NOT NULL,
    inv_model VARCHAR NOT NULL,
    inv_year INTEGER NOT NULL,
    inv_description TEXT NOT NULL,
    inv_image VARCHAR NOT NULL,
    inv_thumbnail VARCHAR NOT NULL,
    inv_price NUMERIC NOT NULL,
    inv_miles INTEGER NOT NULL,
    inv_color VARCHAR NOT NULL,
    classification_id INTEGER NOT NULL,
    CONSTRAINT fk_classification FOREIGN KEY (classification_id) REFERENCES public.classification(classification_id) ON DELETE CASCADE
);
-- Insert data into classification table
INSERT INTO public.classification (classification_name)
VALUES ('Custom'),
    ('Sport'),
    ('SUV'),
    ('Truck'),
    ('Sedan');
-- Insert data into inventory table
INSERT INTO public.inventory (
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id
    )
VALUES (
        'Chevy',
        'Camaro',
        2018,
        'If you want to look cool this is the car you need! This car has great performance at an affordable price. Own it today!',
        '/images/camaro.jpg',
        '/images/camaro-tn.jpg',
        25000,
        101222,
        'Silver',
        2
    ),
    (
        'Batmobile',
        'Custom',
        2007,
        'Ever want to be a superhero? Now you can with the Batmobile. This car allows you to switch to bike mode, allowing you to easily maneuver through traffic during rush hour.',
        '/images/batmobile.jpg',
        '/images/batmobile-tn.jpg',
        65000,
        29887,
        'Black',
        1
    ),
    (
        'FBI',
        'Surveillance Van',
        2016,
        'Do you like police shows? You will feel right at home driving this van, complete with surveillance equipment for an extra fee of $2,000 a month.',
        '/images/survan.jpg',
        '/images/survan-tn.jpg',
        20000,
        19851,
        'Green',
        1
    ),
    (
        'Dog',
        'Car',
        1997,
        'Do you like dogs? Well, this car is for you! Straight from the 90s from Aspen, Colorado, we have the original Dog Car complete with fluffy ears.',
        '/images/dog-car.jpg',
        '/images/dog-car-tn.jpg',
        35000,
        71632,
        'Brown',
        1
    ),
    (
        'GM',
        'Hummer',
        2016,
        'Do you have 6 kids and like to go off-roading? The Hummer gives you the small interior with an engine to get you out of any muddy or rocky situation.',
        '/images/hummer.jpg',
        '/images/hummer-tn.jpg',
        58800,
        56564,
        'Yellow',
        4
    );
-- Task 1 Queries
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
-- 6. Fix image paths
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
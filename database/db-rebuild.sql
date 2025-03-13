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
        'Jeep',
        'Wrangler',
        2019,
        'The Jeep Wrangler is small and compact with enough power to get you where you want to go. It\'s great for everyday driving as well as off-roading!',
        '/images/wrangler.jpg',
        '/images/wrangler-tn.jpg',
        28045,
        41205,
        'Orange',
        3
    ),
    (
        'Lamborghini',
        'Aventador',
        2016,
        'This V-12 engine packs a punch in this sporty car. Make sure you wear your seatbelt and obey all traffic laws.',
        '/images/adventador.jpg',
        '/images/adventador-tn.jpg',
        417650,
        71003,
        'Blue',
        2
    ),
    (
        'Aerocar International',
        'Aerocar',
        1963,
        'Are you sick of rush-hour traffic? This car converts into an airplane to get you where you are going fast. Only 6 of these were made, get them while they last!',
        '/images/aerocar.jpg',
        '/images/aerocar-tn.jpg',
        700000,
        18956,
        'Red',
        1
    ),
    (
        'Monster',
        'Truck',
        1995,
        'Most trucks are for working, this one is for fun. This beast comes with 60-inch tires giving you the traction needed to jump and roll in the mud.',
        '/images/monster-truck.jpg',
        '/images/monster-truck-tn.jpg',
        150000,
        3998,
        'Purple',
        1
    ),
    (
        'Cadillac',
        'Escalade',
        2019,
        'This stylish car is great for any occasion from going to the beach to meeting the president. The luxurious interior makes this car a home away from home.',
        '/images/escalade.jpg',
        '/images/escalade-tn.jpg',
        75195,
        41958,
        'Black',
        4
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
    ),
    (
        'Mechanic',
        'Special',
        1964,
        'Not sure where this car came from. However, with a little TLC, it will run as good as new.',
        '/images/mechanic.jpg',
        '/images/mechanic-tn.jpg',
        100,
        200125,
        'Rust',
        5
    ),
    (
        'Ford',
        'Model T',
        1921,
        'The Ford Model T can be a bit tricky to drive. It was the first car to be put into production. You can get it in any color you want as long as it is black.',
        '/images/model-t.jpg',
        '/images/model-t-tn.jpg',
        30000,
        26357,
        'Black',
        5
    ),
    (
        'Mystery',
        'Machine',
        1999,
        'Scooby and the gang always found luck in solving their mysteries because of their 4-wheel drive Mystery Machine. This van will help you do whatever job you need with a success rate of 100%.',
        '/images/mystery-van.jpg',
        '/images/mystery-van-tn.jpg',
        10000,
        128564,
        'Green',
        1
    ),
    (
        'Spartan',
        'Fire Truck',
        2012,
        'Emergencies happen often. Be prepared with this Spartan fire truck. Comes complete with 1000 ft. of hose and a 1000-gallon tank.',
        '/images/fire-truck.jpg',
        '/images/fire-truck-tn.jpg',
        50000,
        38522,
        'Red',
        4
    ),
    (
        'Ford',
        'Crown Victoria',
        2013,
        'After the police force updated their fleet, these cars are now available to the public! These cars come equipped with a siren, which is convenient for college students running late to class.',
        '/images/crwn-vic.jpg',
        '/images/crwn-vic-tn.jpg',
        10000,
        108247,
        'White',
        5
    );
-- Fix image paths
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');
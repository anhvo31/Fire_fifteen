-- Database Manipulation queries for Fire Zoo website
-- A colon : character being used to denote the variables that will have data from the backend programming language

-- Show all zookeepers in the table
SELECT * FROM Zookeepers;

-- Search a zookeeper by last name
SELECT * FROM Zookeepers WHERE last_name = :last_name_input;

-- Add a new zookeeper
INSERT INTO Zookeepers (first_name, last_name)
VALUES (:first_name_input, :last_name_input);

-- Delete a zookeeper
DELETE FROM Zookeepers WHERE zookeeper_id = :zookeeper_id_selected_from_zookeepers_list;

-- Show all kitchens in the table
SELECT * FROM Kitchens;

-- Add a new kitchen
INSERT INTO Kitchens (name)
VALUES (:name_input);

-- Delete a kitchen
DELETE FROM Kitchens WHERE kitchen_id = :kitchen_id_selected_from_kitchens_list;

-- Show all feedings in the table (with corresponding species name)
SELECT Feedings.feeding_id AS Id, Feedings.species_id AS "Species Id", Species.species_name AS "Species Name", 
Feedings.zookeeper_id AS "Zookeeper Id", Feedings.feeding_date AS Date, Feedings.feeding_time AS Time, 
Feedings.feeding_description AS Description
FROM Feedings
INNER JOIN Species ON Feedings.species_id = Species.species_id;

-- Search a feeding by species name
SELECT Feedings.feeding_id AS Id, Feedings.species_id AS "Species Id", Species.species_name AS "Species Name", 
Feedings.zookeeper_id AS "Zookeeper Id", Feedings.feeding_date AS Date, Feedings.feeding_time AS Time, 
Feedings.feeding_description AS Description
FROM Feedings
INNER JOIN Species ON Feedings.species_id = Species.species_id WHERE (Species.species_name = :species_name_input);

-- Add a feeding
INSERT INTO Feedings (species_id, zookeeper_id, feeding_date, feeding_time, feeding_description)
VALUES (:species_id_from_dropdown, :zookeeper_id_from_dropdown, :feeding_date_from_input, :feeding_time_from_input, :feeding_description_from_input);

-- Update a feeding
UPDATE Feedings 
SET species_id = :species_id_from_dropdown, zookeeper_id = :zookeeper_id_from_dropdown,
feeding_date = :feeding_date_from_input, feeding_time = :feeding_time_from_input, 
feeding_description = :feeding_description_from_input
WHERE feeding_id = :feeding_id_from_dropdown;

-- Delete a feeding
DELETE FROM Feedings WHERE feeding_id = :feeding_id_selected_from_kitchens_list;

-- Show all feedings_kitchens (with associated kitchen name)
SELECT Feedings_Kitchens.feeding_kitchen_id AS Id, Feedings_Kitchens.feeding_id AS "Feeding Id", 
Feedings_Kitchens.kitchen_id AS "Kitchen Id", Kitchens.name AS "Kitchen Name"
FROM Feedings_Kitchens
INNER JOIN Kitchens ON Feedings_Kitchens.kitchen_id = Kitchens.kitchen_id;

-- Dis-associate a kitchen from a feeding (M-to-M relationship deletion)
DELETE FROM Feedings_Kitchens WHERE feeding_id = :feeding_id_selected_from_dropdown AND kitchen_id = :kitchen_id_selected_from_dropdown;

INSERT INTO attractions
(id, name, description, price, web_link, picture_url, city_id)
VALUES
(1, 'attraction 1', 'description1', 200, 'ggg', 'ggg', 1),
(2, 'attraction 2', 'descripggtion1', 130, 'ggg', 'ggg', 2),
(3, 'attraction 3', 'descggription1', 50, 'ggg', 'ggg', 3),
(4, 'beach', 'ff', 400, 'ggg', 'ggg', 4);

INSERT INTO attraction_type
(id, name)
VALUES
(1, 'Shrine'),
(2, 'Onsen'),
(3, 'Temple'),
(4, 'Park'),
(5, 'Nature'),
(6, 'Museum'),
(7, 'Castle'),
(8, 'Mountain');

INSERT INTO attraction_type_match
(attraction_type_id, attraction_id)
VALUES
(1, 1),
(2, 2),
(5, 3),
(7, 4);
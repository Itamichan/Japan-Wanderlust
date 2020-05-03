INSERT INTO attractions
(id, name, description, price, web_link, picture_url, city_id)
VALUES
(1, 'Koishikawa Korakuen', 'Koishikawa Korakuen (小石川後楽園, Koishikawa Kōrakuen) is one of Tokyo''s oldest and best Japanese gardens. It was built in the early Edo Period (1600-1867) at the Tokyo residence of the Mito branch of the ruling Tokugawa family. Like its namesake in Okayama, the garden was named Korakuen after a poem encouraging a ruler to enjoy pleasure only after achieving happiness for his people. Koishikawa is the district in which the garden is located in.', 300, 'https://www.tokyo-park.or.jp/park/format/index030.html', 'ggg', 2),
(2, 'Imperial Palace', 'The current Imperial Palace (皇居, Kōkyo) is located on the former site of Edo Castle, a large park area surrounded by moats and massive stone walls in the center of Tokyo, a short walk from Tokyo Station. It is the residence of Japan''s Imperial Family.', 0, 'https://sankan.kunaicho.go.jp/english/index.html', 'ggg', 2),
(3, 'Sensōji', 'Sensoji (浅草寺, Sensōji, also known as Asakusa Kannon Temple) is a Buddhist temple located in Asakusa. It is one of Tokyo''s most colorful and popular temples.', 0, 'http://www.senso-ji.jp/', 'ggg', 2),
(4, 'Shibamata Taishakuten', 'Most of Taishakuten''s buildings are covered in wooden carvings, but the piece de resistance can be viewed in the paid area at the back of the Taishakudo Hall. Panels of intricate carvings cover the outer walls of the hall, each depicting a scene from Buddhist scripture and local folklore. The panels are only brushed once a year to remove cobwebs and otherwise remain untouched to preserve their longevity.', 400, '', 'ggg', 2),
(5, 'Rikugien', 'Rikugien (六義園) is often considered Tokyo''s most beautiful Japanese landscape garden alongside Koishikawa Korakuen. Built around 1700 for the 5th Tokugawa Shogun, Rikugien literally means "six poems garden" and reproduces in miniature 88 scenes from famous poems. The garden is a good example of an Edo Period strolling garden and features a large central pond surrounded by manmade hills and forested areas, all connected by a network of trails.', 300, 'https://www.tokyo-park.or.jp/teien/en/rikugien/', 'ggg', 2),
(6, 'Ghibli', 'The Ghibli Museum (三鷹の森ジブリ美術館, Mitaka no Mori Ghibli Bijutsukan) is the animation and art museum of Miyazaki Hayao''s Studio Ghibli, one of Japan''s most famous animation studios. They have produced many feature length films with worldwide distribution such as My Neighbor Totoro, Princess Mononoke, Spirited Away and Ponyo on the Cliff by the Sea.', 1000, 'http://www.ghibli-museum.jp/en/', 'ggg', 2),
(7, 'Todoroki', 'The Todoroki Valley Park (等々力渓谷公園, Todoroki Keikoku Kōen) is one of Tokyo''s most unconventional green spaces. Located in the middle of the densely populated Setagaya city ward, it is an attractive walking trail, leading for about one kilometer through a narrow, wooded valley along a small river and takes about 20 to 30 minutes to walk through.', 0, 'http://www.todoroki.net/', 'ggg', 2),
(8, 'Oedo Onsen Monogatari', 'Pumped up from 1400 meters deep, our natural hot spring feel soft and smooth on the skin. You will enjoy prolonged effect of warmth even after you get out of the bath, and will feel relaxed inside and out. Soak yourself in Big Common Bath, then try Ashi-Yu (Foot Bath) while chatting with your family and loved ones – at Ooedo-Onsen Monogatari, we offer many different baths to suit your need – so you can enjoy Onsen your way.', 2700, 'https://daiba.ooedoonsen.jp/en/', 'ggg', 2),
(9, 'Takao', 'Mount Takao (高尾山, Takaosan) is one of the closest natural recreation areas to central Tokyo, offering beautiful scenery, an interesting temple and attractive hiking opportunities. Although outside the city center, the mountain is still located within metropolitan Tokyo and takes only 50 minutes and 390 yen to reach from Shinjuku.', 500, 'ggg', 'ggg', 2),
(10, 'Gotokuji', 'Gotokuji Temple, located in the Setagaya ward of Tokyo, is a Buddhist temple that is said to be the birthplace of the maneki-neko, or “luck-inviting cat figurine.” These small statues, which portray a cat sitting up and beckoning with its front paw, have become quite popular all over the world with cat-lovers. Although there are many different kinds of maneki-neko raising either their right or left paws, Gotokuji Temple specializes in the right-pawed version of this good-luck symbol.', 0, '', 'ggg', 2),
(11, 'Shinjuku Gyoen', 'Shinjuku Gyoen (新宿御苑) is one of Tokyo''s largest and most popular parks. Located just a short walk from Shinjuku Station, the paid park''s spacious lawns, meandering walking paths and tranquil scenery provide a relaxing escape from the busy urban center around it. In spring Shinjuku Gyoen becomes one of the best places in the city to see cherry blossoms.', 200, 'http://www.env.go.jp/garden/shinjukugyoen/english/', 'ggg', 2),
(12, 'bla', 'description1', 1000, 'ggg', 'ggg', 2),
(13, 'bla', 'description1', 500, 'ggg', 'ggg', 2),
(14, 'bla', 'description1', 0, 'ggg', 'ggg', 2),
(15, 'bla', 'description1', 200, 'ggg', 'ggg', 2),
(16, 'bla', 'description1', 7400, 'ggg', 'ggg', 2),
(17, 'bla', 'description1', 400, 'ggg', 'ggg', 2),
(18, 'bla', 'description1', 0, 'ggg', 'ggg', 2),
(19, 'bla', 'description1', 0, 'ggg', 'ggg', 2),
(20, 'bla', 'description1', 0, 'ggg', 'ggg', 2),
(21, 'bla', 'description1', 0, 'ggg', 'ggg', 2),
(22, 'bla', 'description1', 0, 'ggg', 'ggg', 2);


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
(4, 1),
(5, 1),
(7, 2),
(4, 2),
(5, 2),
(3, 3),
(3, 4),
(4, 5),
(5, 5),
(6, 6),
(4, 7),
(5, 7),
(2, 8),
(8, 9),
(5, 9),
(3, 10),
(4, 11),
(5, 11),

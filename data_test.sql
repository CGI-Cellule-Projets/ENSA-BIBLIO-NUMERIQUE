USE ensa_biblio;

INSERT INTO users (nom, prenom, email, mot_de_passe, role) VALUES
('Alami', 'Sara', 'sara@ensa.ma', '1234', 'student'),
('Benali', 'Youssef', 'youssef@ensa.ma', '1234', 'student'),
('Admin', 'Rachid', 'admin@ensa.ma', '1234', 'admin');

INSERT INTO resources (titre, description, type, fichier_url, uploade_par, statut) VALUES
('Cours Algo S1', 'Introduction aux algorithmes', 'cours', '/files/algo_s1.pdf', 3, 'approuve'),
('TD Analyse1', 'Exercices Analyse1 chapitre 2', 'td', '/files/td_analyse1.pdf', 3, 'approuve'),
('Examen 2023 BD', 'Examen de rattrapage BD', 'exam', '/files/exam_bd.pdf', 3, 'approuve');

INSERT INTO downloads (user_id, resource_id) VALUES
(1, 1), (1, 3), (2, 2);

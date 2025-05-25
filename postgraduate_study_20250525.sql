-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 25 2025 г., 11:01
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `postgraduate_study`
--

-- --------------------------------------------------------

--
-- Структура таблицы `affiliation`
--

CREATE TABLE `affiliation` (
  `userID` int(11) NOT NULL,
  `department` int(11) DEFAULT NULL,
  `faculty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `affiliation`
--

INSERT INTO `affiliation` (`userID`, `department`, `faculty`) VALUES
(39, 1, 2),
(48, 1, 2),
(72, 33, 3),
(84, 32, 1),
(86, NULL, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `assessments`
--

CREATE TABLE `assessments` (
  `courseID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `assessment` int(11) NOT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `assessments`
--

INSERT INTO `assessments` (`courseID`, `userID`, `assessment`, `date`) VALUES
(1, 85, 4, '2025-05-13'),
(3, 73, 3, '2025-05-21'),
(3, 83, 4, '2025-05-15'),
(3, 85, 5, '2025-05-12'),
(23, 83, 5, '2025-05-19'),
(24, 87, 5, '2025-05-16'),
(25, 89, 5, '2025-05-20'),
(25, 90, 4, '2025-05-21');

-- --------------------------------------------------------

--
-- Структура таблицы `credentials`
--

CREATE TABLE `credentials` (
  `username` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `credentials`
--

INSERT INTO `credentials` (`username`, `password`, `userID`) VALUES
('1_1_1_stud', '6919cc9547d4963762545421fb77e3c556b7a3207413fbef56a4a54d2d45f04b', 83),
('2_2_3_stud', 'f836d878b4529d366b0590b355e55792f8f312759208afe6465c5183b49f5e82', 88),
('dfg_dfbx_xdf_sciens', 'dfc0589423c62755086eee41642c70cd364eecd717e6f7120af13a796123dcbf', 84),
('D_D_D_stud', '79ba227cba707cefd1e94f6af0d8510071d70e0da14da7a765e30fbf2a5eff8f', 90),
('F_F_F_stud', 'd79bebc54da039b829ba7d160189112a02bdcddd1518902b2380ced040823ff9', 89),
('Glinka_Mihail_Ivanovich_sciens', 'd490970cbc3ed4a621e38047c0c512b18982e3f379275dbe447da5008c5b5bac', 48),
('IMIT_Dekanat_agent', '901450ea7f368ba54435e05641837336ea759e4d3c9cdcbaa9d0cba4f871dc6f', 86),
('Ivanov_Ivan_Ivanovich_sciens', 'a516a8737897cdc5ae033c11c69ac4edb6b749a2a112916a50cb2a274125767d', 72),
('i_i_i_stud', '048b6807ae3d12ca2cc66f1da6f70b6632782c2141d6536aaf64623a82dc9929', 94),
('Petrov_Aleksandr_stud', '6026ad1208ddccec7add9abe42971f6c2fccf193a6120782dd45bbab778c2a06', 73),
('Rahmaninov_Sergei _Vasil`evich _agent', '94a47851e55e01fcda6ddf1f300b16ae6c960fcb1ad5ee30335929e02b4a5418', 39),
('Romanenko_Aleksei_Vasil`evich_stud', '13d6425e8de051ea50a840536e1005f053b56fe3cf19680ecfae1352adf521a5', 85),
('Sal`eri_Antonio__admin', 'b67f238703da204d54719e9b5b7cf2e8840871c334fac501568f5548eeccda28', 27),
('SHostakovich_Dmitrii_Dmitrievich_admin', '90434f0f6e8ddade23da961c5fb1ae9b9e9c7ff471635629ad65de30cc274b78', 22),
('SHubert_Frants__admin', '99d2738f684d285f4d96eb34baf0ff3942351d8d6f88ee00ff7a5864b0dcae69', 23),
('test_test_test_stud', '101940cdc1212c53e69701f491899ad921fc494c01c439d395f01ef745a1c90f', 87),
('up_u_u_stud', '8a7770bfa2dfdb26bf9ae3d5ff8ef955a840b05910ba80bd7eebbbd6930bce99', 93);

-- --------------------------------------------------------

--
-- Структура таблицы `departments`
--

CREATE TABLE `departments` (
  `departmentID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `faculty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `departments`
--

INSERT INTO `departments` (`departmentID`, `name`, `faculty`) VALUES
(1, 'Алгебраических и информационных систем', 2),
(2, 'Английской филологии', 212),
(3, 'Биохимии, молекулярной биологии и генетики', 4),
(5, 'Административного и финансового права', 9),
(6, 'Ботаники', 4),
(7, 'Вычислительной математики и оптимизации', 2),
(8, 'Географии, картографии и геосистемных технологий', 6),
(9, 'Геологии нефти и газа', 5),
(10, 'Гидрологии и природопользования', 6),
(11, 'Гражданского права', 9),
(12, 'Динамической геологии', 5),
(13, 'Естественнонаучных дисциплин', 201),
(14, 'Зоологии беспозвоночных и гидробиологии', 4),
(15, 'Зоологии позвоночных и экологии', 4),
(16, 'Истории и методики', 204),
(17, 'Истории России', 7),
(18, 'Конституционного права и теории права', 9),
(19, 'Лингвистики и лингводидактики', 11),
(20, 'Математического анализа и дифференциальных уравнений', 2),
(21, 'Медицинской психологии', 13),
(22, 'Международного права и сравнительного правоведения ', 9),
(23, 'Микробиологии', 4),
(24, 'Мировой истории и международных отношений', 7),
(25, 'Новейшей русской литературы', 211),
(26, 'Философии, религиоведения и теологии', 7),
(27, 'Физической и коллоидной химии', 3),
(28, 'Физиологии и психофизиологии', 4),
(29, 'Физико-химической биологии, биоинженерии и биоинформатики', 4),
(30, 'физики', 201),
(31, 'Уголовного права', 9),
(32, 'Общей и космической физики', 1),
(33, 'Общей и неорганической химии', 3),
(34, 'Общей и экспериментальной физики', 1),
(35, 'Общей психологии', 13),
(36, 'Органической химии и высокомолекулярных соединений', 3),
(37, 'Педагогики', 206),
(38, 'Педагогической и возрастной психологии', 13),
(39, 'Перевода и переводоведения', 212),
(40, 'Полезных ископаемых, геохимии, минералогии и петрографии', 5),
(41, 'Политологии, истории и регионоведения', 7),
(42, 'Почвоведения и оценки земельных ресурсов', 4),
(43, 'Психологии образования и развития личности', 204),
(44, 'Радиофизики и радиоэлектроники', 1),
(45, 'Романо-германской филологии', 212),
(46, 'Русского языка и общего языкознания', 211),
(47, 'Социальной педагогики и психологии', 206),
(48, 'Социальной философии и социологии', 15),
(49, 'Социальной, экстремальной и пенитенциарной психологии', 13),
(50, 'Социально-экономических и математических дисциплин', 11),
(51, 'Стратегического и финансового менеджмента', 12),
(52, 'Теоретической физики', 1),
(53, 'Технологий, предпринимательства и методик их преподавания', 201),
(54, 'Лаборатории геоархеологии Байкальской Сибири', 250);

-- --------------------------------------------------------

--
-- Структура таблицы `educationalcourse`
--

CREATE TABLE `educationalcourse` (
  `courseID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `teacherID` int(11) DEFAULT NULL,
  `note` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `educationalcourse`
--

INSERT INTO `educationalcourse` (`courseID`, `name`, `teacherID`, `note`) VALUES
(1, 'test', 39, 'ssss'),
(2, 'test', 39, 'ddd'),
(3, 'aaa', 39, 'ss'),
(23, 'xxxxxxxxxxxxxxxxxx', 48, 'test'),
(24, 'rrrrrrrrrrrrrrrrr', 72, ''),
(25, 'Курс из файла', NULL, '');

-- --------------------------------------------------------

--
-- Структура таблицы `faculties`
--

CREATE TABLE `faculties` (
  `facultyID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `faculties`
--

INSERT INTO `faculties` (`facultyID`, `name`) VALUES
(1, 'Физический факультет'),
(2, 'Институт математики и информационных технологий'),
(3, 'Химический факультет'),
(4, 'Биолого-почвенный факультет'),
(5, 'Геологический факультет'),
(6, ' Географический факультет'),
(7, 'Исторический факультет'),
(9, 'Юридический институт'),
(11, 'Международный институт экономики и лингвистики'),
(12, 'Сибирско-американский факультет менеджмента'),
(13, 'Факультет психологии'),
(14, 'Факультет бизнес-коммуникаций и информатики'),
(15, 'Институт социальных наук'),
(201, 'ПИ. Отделение физико-математического, естественнонаучного и технологического образования'),
(204, 'ПИ. Отделение гуманитарно-эстетического образования'),
(206, 'ПИ. Отделение педагогического, социального и специального образования'),
(211, 'ИФИЯМ. Факультет теоретической и прикладной филологии'),
(212, 'ИФИЯМ. Факультет иностранных языков'),
(213, 'ИФИЯМ. Высшая школа журналистики и медиапроизводства'),
(250, 'НИЦ «Байкальский регион»');

-- --------------------------------------------------------

--
-- Структура таблицы `graduatestudents`
--

CREATE TABLE `graduatestudents` (
  `userID` int(11) NOT NULL,
  `scientificSupervisorID` int(11) NOT NULL,
  `department` int(11) NOT NULL,
  `specialty` int(11) NOT NULL,
  `yearofadmission` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `graduatestudents`
--

INSERT INTO `graduatestudents` (`userID`, `scientificSupervisorID`, `department`, `specialty`, `yearofadmission`) VALUES
(72, 48, 1, 2, 2024),
(73, 39, 1, 2, 2024),
(83, 48, 1, 2, 2020),
(85, 48, 1, 2, 2025),
(87, 72, 33, 2, 2023),
(88, 39, 1, 2, 2025),
(89, 39, 1, 2, 2025),
(90, 72, 33, 2, 2023),
(93, 39, 1, 2, 2025),
(94, 72, 33, 2, 2023);

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('ci5qozsUbq7RLCu2e7gUQ4F_9AcOt2vW', 1748178803, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"this_user\":22}');

-- --------------------------------------------------------

--
-- Структура таблицы `specialties`
--

CREATE TABLE `specialties` (
  `specialtyID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `specialties`
--

INSERT INTO `specialties` (`specialtyID`, `name`) VALUES
(2, '1.1.2 Дифференциальные уравнения и математическая физика');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `patronymic` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) NOT NULL,
  `role` int(11) NOT NULL,
  `blocking` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`userID`, `firstname`, `patronymic`, `lastname`, `role`, `blocking`) VALUES
(22, 'Дмитрий', 'Дмитриевич', 'Шостакович', 4, 0),
(23, 'Франц', NULL, 'Шуберт', 4, 0),
(27, 'Антонио', NULL, 'Сальери', 4, 1),
(39, 'Сергей ', 'Васильевич ', 'Рахманинов', 3, 0),
(48, 'Михаил', 'Иванович', 'Глинка', 2, 0),
(72, 'Иван', 'Иванович', 'Иванов', 2, 0),
(73, 'Александр', NULL, 'Петров', 1, 0),
(83, '1', '1', '1', 1, 0),
(84, 'dfbx', 'xdf', 'dfg', 2, 0),
(85, 'Алексей', 'Васильевич', 'Романенко', 1, 0),
(86, 'Деканат', NULL, 'ИМИТ', 3, 0),
(87, 'test', 'test', 'test', 1, 0),
(88, '2', '3', '2', 1, 0),
(89, 'F', 'F', 'F', 1, 0),
(90, 'D', 'D', 'D', 1, 0),
(93, 'у', 'у', 'уп', 1, 0),
(94, 'й', 'й', 'й', 1, 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `affiliation`
--
ALTER TABLE `affiliation`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `department` (`department`),
  ADD KEY `faculty` (`faculty`);

--
-- Индексы таблицы `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`courseID`,`userID`),
  ADD KEY `userID` (`userID`);

--
-- Индексы таблицы `credentials`
--
ALTER TABLE `credentials`
  ADD PRIMARY KEY (`username`),
  ADD KEY `userID` (`userID`);

--
-- Индексы таблицы `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`departmentID`),
  ADD KEY `faculty` (`faculty`);

--
-- Индексы таблицы `educationalcourse`
--
ALTER TABLE `educationalcourse`
  ADD PRIMARY KEY (`courseID`),
  ADD KEY `teacherID` (`teacherID`);

--
-- Индексы таблицы `faculties`
--
ALTER TABLE `faculties`
  ADD PRIMARY KEY (`facultyID`);

--
-- Индексы таблицы `graduatestudents`
--
ALTER TABLE `graduatestudents`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `scientificSupervisorID` (`scientificSupervisorID`),
  ADD KEY `department` (`department`),
  ADD KEY `specialty` (`specialty`);

--
-- Индексы таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Индексы таблицы `specialties`
--
ALTER TABLE `specialties`
  ADD PRIMARY KEY (`specialtyID`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `departments`
--
ALTER TABLE `departments`
  MODIFY `departmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT для таблицы `educationalcourse`
--
ALTER TABLE `educationalcourse`
  MODIFY `courseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `specialties`
--
ALTER TABLE `specialties`
  MODIFY `specialtyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `affiliation`
--
ALTER TABLE `affiliation`
  ADD CONSTRAINT `affiliation_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments` (`departmentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `affiliation_ibfk_2` FOREIGN KEY (`faculty`) REFERENCES `faculties` (`facultyID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `affiliation_ibfk_3` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `assessments`
--
ALTER TABLE `assessments`
  ADD CONSTRAINT `assessments_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assessments_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `educationalcourse` (`courseID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `credentials`
--
ALTER TABLE `credentials`
  ADD CONSTRAINT `credentials_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`faculty`) REFERENCES `faculties` (`facultyID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `educationalcourse`
--
ALTER TABLE `educationalcourse`
  ADD CONSTRAINT `educationalcourse_ibfk_1` FOREIGN KEY (`teacherID`) REFERENCES `users` (`userID`);

--
-- Ограничения внешнего ключа таблицы `graduatestudents`
--
ALTER TABLE `graduatestudents`
  ADD CONSTRAINT `graduatestudents_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `graduatestudents_ibfk_2` FOREIGN KEY (`scientificSupervisorID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `graduatestudents_ibfk_3` FOREIGN KEY (`department`) REFERENCES `departments` (`departmentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `graduatestudents_ibfk_4` FOREIGN KEY (`specialty`) REFERENCES `specialties` (`specialtyID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

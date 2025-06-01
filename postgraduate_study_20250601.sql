-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 01 2025 г., 13:32
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
(25, 85, 0, '2025-05-08'),
(26, 130, 4, '2025-05-30'),
(26, 131, 5, '2024-05-27'),
(26, 132, 3, '2025-05-30'),
(26, 133, 0, '2025-05-28'),
(27, 131, 5, '2025-05-06'),
(27, 133, 2, '2025-05-28');

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
('Belov _Evgenii _Egorovich_stud', 'd1196de37c77c278633f8dac76f2c535ac6a253da3e14dc5de3a44fb37c7aea5', 130),
('Glinka_Mihail_Ivanovich_sciens', 'd490970cbc3ed4a621e38047c0c512b18982e3f379275dbe447da5008c5b5bac', 48),
('IMIT_Dekanat_agent', '901450ea7f368ba54435e05641837336ea759e4d3c9cdcbaa9d0cba4f871dc6f', 86),
('Ivanov_Ivan_Ivanovich_sciens', 'a516a8737897cdc5ae033c11c69ac4edb6b749a2a112916a50cb2a274125767d', 72),
('Makarova_Sofiya_ Artyomovna_stud', '1c2965718a48f60a3718105eaf1e5b502cf4c2193b6920148203c32592db9b72', 132),
('Petrov_Aleksandr_stud', '6026ad1208ddccec7add9abe42971f6c2fccf193a6120782dd45bbab778c2a06', 73),
('Rahmaninov_Sergei _Vasil`evich _agent', '94a47851e55e01fcda6ddf1f300b16ae6c960fcb1ad5ee30335929e02b4a5418', 39),
('Romanenko_Aleksei_Vasil`evich_stud', '13d6425e8de051ea50a840536e1005f053b56fe3cf19680ecfae1352adf521a5', 85),
('Sal`eri_Antonio__admin', 'b67f238703da204d54719e9b5b7cf2e8840871c334fac501568f5548eeccda28', 27),
('Sergeev_ Nikita _Nikolaevich_stud', 'd111968ee52fefc3687efbff95fc5e10c45c8d9f6499263f6100c3b5dbe809d3', 131),
('SHostakovich_Dmitrii_Dmitrievich_admin', '90434f0f6e8ddade23da961c5fb1ae9b9e9c7ff471635629ad65de30cc274b78', 22),
('SHubert_Frants__admin', '99d2738f684d285f4d96eb34baf0ff3942351d8d6f88ee00ff7a5864b0dcae69', 23),
('Volkov _Maksim _Sergeevich_stud', '8b69214521050ffed28907114b4690c2569463c17a6a69b729cd631a7553698d', 133);

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
(25, 'Курс из файла', NULL, ''),
(26, 'Иностранный язык', NULL, 'тест'),
(27, 'Математическое моделирование химических реакций', NULL, 'тест');

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
(85, 48, 1, 2, 2025),
(130, 72, 33, 18, 2024),
(131, 72, 33, 18, 2023),
(132, 72, 33, 18, 2024),
(133, 72, 33, 18, 2024);

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
('F_h-5qGlDb52pjj9O9jioPFA_MKDE-Gr', 1748777602, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"this_user\":22}'),
('S9Z0rPOpWH9AqyMx1dC10zxXoRyg8VKH', 1748705507, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"this_user\":22}');

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
(2, '1.1.2 Дифференциальные уравнения и математическая физика'),
(6, '1.2.2 Математическое моделирование, численные методы и комплексы программ'),
(7, '1.3.1 Физика космоса, астрономия'),
(8, '1.3.15 Физика атомных ядер и элементарных частиц, физика высоких энергий'),
(9, '1.5.15 Экология'),
(10, '1.5.6 Биотехнология'),
(11, '1.3.4 Радиофизика'),
(12, '1.5.5 Физиология человека и животных'),
(13, '1.5.8 Математическая биология, биоинформатика'),
(14, '1.4.7 Высокомолекулярные соединения'),
(15, '1.3.8 Физика конденсированного состояния'),
(16, '1.6.1 Общая и региональная геология. Геотектоника и геодинамика'),
(17, '1.5.19 Почвоведение'),
(18, '1.4.4 Физическая химия'),
(19, '1.6.10 Геология, поиски и разведка полезных ископаемых, минерагения'),
(20, '1.6.11 Геология, поиски, разведка и эксплуатация нефтяных и газовых месторождений'),
(21, '1.6.13 Экономическая, социальная, политическая и рекреационная география'),
(22, '1.6.21 Геоэкология'),
(23, '2.3.1 Системный анализ, управление и обработка информации, статистика'),
(24, '5.1.1 Теоретико-исторические правовые науки'),
(25, '5.1.2 Публично-правовые (государственно-правовые) науки'),
(26, '5.1.3 Частно-правовые (цивилистические) науки'),
(27, '5.1.4 Уголовно-правовые науки'),
(28, '5.12.3 Междисциплинарные исследования языка'),
(29, '5.12.3 Междисциплинарные исследования языка (профиль: Лингвокогнитивные исследования)'),
(30, '5.12.3 Междисциплинарные исследования языка (профиль: Психология языковой личности)'),
(31, '5.2.3 Региональная и отраслевая экономика'),
(32, '5.3.1 Общая психология, психология личности, история психологии'),
(33, '5.6.1 Отечественная история'),
(34, '5.3.4 Педагогическая психология, психодиагностика цифровых образовательных сред'),
(35, '5.4.4 Социальная структура, социальные институты и процессы '),
(36, '5.6.2 Всеобщая история'),
(37, '5.6.3 Археология'),
(38, '5.7.7 Социальная и политическая философия'),
(39, '5.8.1 Общая педагогика, история педагогики и образования'),
(40, '5.8.7 Методология и технология профессионального образования'),
(41, '5.9.1 Русская литература и литературы народов Российской Федерации'),
(42, '5.9.5 Русский язык. Языки народов России'),
(43, '5.9.6 Языки народов зарубежных стран (Германские языки)'),
(44, '5.9.8 Теоретическая, прикладная и сравнительно-сопоставительная лингвистика');

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
(85, 'Алексей', 'Васильевич', 'Романенко', 1, 0),
(86, 'Деканат', NULL, 'ИМИТ', 3, 0),
(130, 'Евгений ', 'Егорович', 'Белов ', 1, 0),
(131, 'Никита ', 'Николаевич', 'Сергеев', 1, 0),
(132, 'София', 'Артёмовна', 'Макарова', 1, 0),
(133, 'Максим ', 'Сергеевич', 'Волков ', 1, 0);

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
  MODIFY `courseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT для таблицы `specialties`
--
ALTER TABLE `specialties`
  MODIFY `specialtyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

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

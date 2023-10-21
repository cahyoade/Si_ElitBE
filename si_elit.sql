-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Okt 2023 pada 00.01
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `si_elit`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `attendances`
--

CREATE TABLE `attendances` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `class_id` int(10) UNSIGNED NOT NULL,
  `attend_at` datetime DEFAULT NULL,
  `status` varchar(24) DEFAULT NULL,
  `lastEditBy` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `attendances`
--

INSERT INTO `attendances` (`user_id`, `class_id`, `attend_at`, `status`, `lastEditBy`) VALUES
(1, 48, '2023-10-22 01:19:20', 'izin', 6),
(1, 49, '2023-10-22 03:54:06', 'hadir', 6),
(1, 50, '2023-10-22 03:54:02', 'hadir', 6),
(1, 51, '2023-10-22 01:22:07', 'izin', 6),
(1, 52, '2023-10-22 00:47:56', 'hadir', 6),
(1, 53, '2023-10-22 00:47:54', 'izin', 6),
(1, 54, '2023-10-22 00:47:55', 'izin', 6),
(1, 55, NULL, NULL, NULL),
(1, 56, NULL, NULL, NULL),
(1, 57, NULL, NULL, NULL),
(1, 58, NULL, NULL, NULL),
(3, 48, NULL, NULL, NULL),
(3, 49, NULL, NULL, NULL),
(3, 50, NULL, NULL, NULL),
(3, 51, NULL, NULL, NULL),
(3, 52, NULL, NULL, NULL),
(3, 53, NULL, NULL, NULL),
(3, 54, NULL, NULL, NULL),
(3, 55, NULL, NULL, NULL),
(3, 56, NULL, NULL, NULL),
(3, 57, NULL, NULL, NULL),
(3, 58, NULL, NULL, NULL),
(7, 48, NULL, NULL, NULL),
(7, 49, NULL, NULL, NULL),
(7, 50, NULL, NULL, NULL),
(7, 51, NULL, NULL, NULL),
(7, 52, NULL, NULL, NULL),
(7, 53, NULL, NULL, NULL),
(7, 54, NULL, NULL, NULL),
(7, 55, NULL, NULL, NULL),
(7, 56, NULL, NULL, NULL),
(7, 57, NULL, NULL, NULL),
(7, 58, NULL, NULL, NULL),
(8, 48, NULL, NULL, NULL),
(8, 49, NULL, NULL, NULL),
(8, 50, NULL, NULL, NULL),
(8, 51, NULL, NULL, NULL),
(8, 52, NULL, NULL, NULL),
(8, 53, NULL, NULL, NULL),
(8, 54, NULL, NULL, NULL),
(8, 55, NULL, NULL, NULL),
(8, 56, NULL, NULL, NULL),
(8, 57, NULL, NULL, NULL),
(8, 58, NULL, NULL, NULL),
(17, 48, NULL, NULL, NULL),
(17, 49, NULL, NULL, NULL),
(17, 50, NULL, NULL, NULL),
(17, 51, NULL, NULL, NULL),
(17, 52, NULL, NULL, NULL),
(17, 53, NULL, NULL, NULL),
(17, 54, NULL, NULL, NULL),
(17, 55, NULL, NULL, NULL),
(17, 56, NULL, NULL, NULL),
(17, 57, NULL, NULL, NULL),
(17, 58, NULL, NULL, NULL),
(21, 48, NULL, NULL, NULL),
(21, 49, NULL, NULL, NULL),
(21, 50, NULL, NULL, NULL),
(21, 51, NULL, NULL, NULL),
(21, 52, NULL, NULL, NULL),
(21, 53, NULL, NULL, NULL),
(21, 54, NULL, NULL, NULL),
(21, 55, NULL, NULL, NULL),
(21, 56, NULL, NULL, NULL),
(21, 57, NULL, NULL, NULL),
(21, 58, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `classes`
--

CREATE TABLE `classes` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(128) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `manager_id` int(10) UNSIGNED DEFAULT NULL,
  `teacher_id` int(10) UNSIGNED NOT NULL,
  `type` int(10) UNSIGNED DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `classes`
--

INSERT INTO `classes` (`id`, `name`, `start_date`, `end_date`, `manager_id`, `teacher_id`, `type`, `location`) VALUES
(48, 'Pengajian Pagi', '2023-10-09 05:00:00', '2023-10-09 06:30:00', 1, 5, NULL, 'PB (Masjid lt 1), LB (GSG), CP (Aula)'),
(49, 'Pengajian Malam', '2023-10-09 19:30:00', '2023-10-09 20:30:00', 3, 5, NULL, 'PB (Masjid lt 1), LB (GSG), CP (Aula)'),
(50, 'Pengajian Pagi', '2023-10-10 05:00:00', '2023-10-10 06:00:00', 8, 5, NULL, 'PB (Masjid lt 1), LB (GSG), CP (Aula)'),
(51, 'Pengajian Malam', '2023-10-10 19:30:00', '2023-10-10 20:30:00', 7, 5, NULL, 'PB (Masjid lt 1), LB (GSG), CP (Aula)'),
(52, 'Pengajian Pagi', '2023-10-18 05:00:00', '2023-10-18 06:00:00', 1, 5, NULL, 'PB (Masjid lt 1), LB (GSG), CP (Aula)'),
(53, 'Pengajian Malam', '2023-10-18 19:30:00', '2023-10-18 21:00:00', 3, 5, NULL, 'PB (Masjid lt 1), LB (GSG), CP (Aula)'),
(54, 'Pengajian Pagi', '2023-10-20 05:00:00', '2023-10-20 06:00:00', 8, 5, NULL, 'PB (Masjid lt 1), LB (GSG), CP (Aula)'),
(55, 'Pengajian Malam', '2023-10-20 19:30:00', '2023-10-20 21:00:00', 7, 5, NULL, 'PB (Masjid lt 1), LB (GSG), CP (Aula)'),
(56, 'Pengajian Malam', '2023-10-13 20:00:00', '2023-10-13 21:00:00', 3, 5, NULL, 'PB (Masjid lt 1), LB (GSG), CP (Aula)'),
(57, 'Pengajian Pagi', '2023-10-02 03:57:00', '2023-10-02 04:57:00', 1, 5, NULL, 'PB (Masjid lt 1), LB (GSG), CP (Aula)'),
(58, 'Pengajian Malam', '2023-09-26 19:58:00', '2023-09-26 21:58:00', 3, 5, NULL, 'PB (Masjid lt 1), LB (GSG), CP (Aula)');

-- --------------------------------------------------------

--
-- Struktur dari tabel `class_types`
--

CREATE TABLE `class_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `class_types`
--

INSERT INTO `class_types` (`id`, `name`) VALUES
(1, 'Cepatan'),
(2, 'Lambatan'),
(3, 'Pegon Bacaan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `leave_permits`
--

CREATE TABLE `leave_permits` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `class_id` int(10) UNSIGNED NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `img_url` varchar(255) NOT NULL,
  `is_approved` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'santri'),
(2, 'guru'),
(3, 'admin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(128) NOT NULL,
  `card_id` varchar(8) DEFAULT NULL,
  `password` varchar(128) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `grade` varchar(24) DEFAULT NULL,
  `telephone_number` varchar(13) DEFAULT NULL,
  `role` int(10) UNSIGNED DEFAULT 1,
  `class_type` int(10) UNSIGNED DEFAULT NULL,
  `gender` tinyint(4) DEFAULT NULL,
  `nis` varchar(24) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT 0,
  `inactive_reason` varchar(255) DEFAULT NULL,
  `origin` varchar(128) DEFAULT NULL,
  `residence_in_semarang` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `card_id`, `password`, `birth_date`, `grade`, `telephone_number`, `role`, `class_type`, `gender`, `nis`, `is_active`, `inactive_reason`, `origin`, `residence_in_semarang`) VALUES
(1, 'Cahyo Ade Prasetyo', '3121D026', '$2b$10$HSY71Z49A8CxZYf4/Dkwwun8h6gqRA/XnhHKFM.ZFLfWCyrUHqKrS', '2001-08-21', '5', '085601560192', 1, 1, 1, '211201', 1, NULL, 'semarang', 'pribumi'),
(3, 'Sachiko Fitria Ramadanti', 'ABCD1235', '$2b$10$ToMnqO2WZ4cDf.FUdGMSnuqxcM1.qrHzO3nffsuhngkkq6mEiGNZ6', '2001-08-20', '6', '085601560192', 1, 2, 0, '211202', 1, 'null', 'kendal', 'ppm'),
(5, 'testGuru', NULL, '$2b$10$E9kr1lKI6tZUGflT5WaNoe.iuaWNU0K02d1SZpceW9o3LM7sJc6NG', '2001-08-15', NULL, '0856015601923', 2, NULL, 0, NULL, 1, NULL, NULL, 'asd'),
(6, 'testAdmin', NULL, '$2b$10$qIvd7hB0LbQtd8QiluI8R.n/r2foDlpcsZG60kguZ62A66aataRI6', '2001-08-21', NULL, '085601560192', 3, NULL, 0, NULL, 1, NULL, NULL, NULL),
(7, 'testSantri', 'ABCD1238', '$2b$10$lD.dHEBK9f4phvUGx5j53ud9DbFyPldFY0947AB9JtNEoWh9nqNYS', '2001-08-05', '8', '085601560129', 1, 2, 0, '211204', 1, 'null', 'solo', 'ppmmm'),
(8, 'Muhammad Sulthon Auliya', 'ABCD1234', '$2b$10$bWvRNiFrcd/Jq8tSn/6yzuego2nxp9crkEgAIxEjLUAjkFEyp8ANC', '2001-08-19', '7', '085601560192', 1, 3, 1, '211203', 1, 'null', 'kudus', 'ppm'),
(17, 'test MT', '34FF4C79', '$2b$10$qIvd7hB0LbQtd8QiluI8R.n/r2foDlpcsZG60kguZ62A66aataRI6', '2023-06-15', '4', '085601560192', 1, 1, 0, '211207', 1, 'Magang', 'Batang', 'ppmmm'),
(20, 'admin2', NULL, '$2b$10$qa2lQKYJN2f9.U0Zx3.47u0f6oX.S/7tWFaU/lumOxZ/nNyutsOqi', '2023-10-14', NULL, '0856015601923', 3, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(21, 'Makari', 'FABC1234', '$2b$10$BSNVSRQIZQ4IRQhCP2wsdu3plgUA6y7jFDbCU7PwxvEZ7k2.ckj.O', '2023-10-14', '5', '085601560192', 1, 3, 1, '211209', NULL, 'Magang', 'Batangg', 'p');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`user_id`,`class_id`),
  ADD KEY `fk_attendance_class` (`class_id`),
  ADD KEY `attendances_FK` (`lastEditBy`);

--
-- Indeks untuk tabel `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_manager` (`manager_id`),
  ADD KEY `fk_teacher` (`teacher_id`),
  ADD KEY `classes_FK` (`type`),
  ADD KEY `year` (`start_date`),
  ADD KEY `week` (`start_date`),
  ADD KEY `hour` (`start_date`),
  ADD KEY `idx_start_date` (`start_date`);

--
-- Indeks untuk tabel `class_types`
--
ALTER TABLE `class_types`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `leave_permits`
--
ALTER TABLE `leave_permits`
  ADD PRIMARY KEY (`user_id`,`class_id`),
  ADD KEY `idx_leave_permits` (`user_id`),
  ADD KEY `idx_leave_permits_class` (`class_id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `card_id` (`card_id`),
  ADD KEY `id` (`id`),
  ADD KEY `users_FK` (`class_type`),
  ADD KEY `users_FK_1` (`role`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT untuk tabel `class_types`
--
ALTER TABLE `class_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendances_FK` FOREIGN KEY (`lastEditBy`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_attendance_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `fk_attendance_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_FK` FOREIGN KEY (`type`) REFERENCES `class_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_manager` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `leave_permits`
--
ALTER TABLE `leave_permits`
  ADD CONSTRAINT `fk_leave_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `fk_leave_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_FK` FOREIGN KEY (`class_type`) REFERENCES `class_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_FK_1` FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

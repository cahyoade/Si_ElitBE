-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Okt 2023 pada 12.32
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
  `status` varchar(24) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `attendances`
--

INSERT INTO `attendances` (`user_id`, `class_id`, `attend_at`, `status`) VALUES
(1, 4, '2023-09-25 17:23:15', 'terlambat'),
(3, 1, '2023-09-23 12:40:44', NULL),
(3, 4, '2023-09-20 11:05:49', 'NULL'),
(7, 5, NULL, NULL),
(7, 8, '2023-10-02 10:41:00', 'hadir'),
(7, 9, NULL, NULL);

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
(1, 'Keamanan Jaringan Komputer', '2023-09-20 12:00:00', '2023-09-20 12:40:00', 1, 3, 1, 'PB (Masjid lt 1), LB (GSG), CP (Aula)'),
(4, 'Keamanan Jaringan Komputer', '2023-09-25 16:00:00', '2023-09-25 17:40:00', 1, 3, 1, 'PB (Masjid lt 1), LB (GSG), CP (Aula)'),
(5, 'Tiny Moving Parts', '2023-10-01 16:00:00', '2023-10-01 17:40:00', 1, 3, 1, 'tip tap toe'),
(8, 'Sistem Informasi', '2023-10-02 10:40:00', '2023-10-02 12:20:00', 1, 3, 2, 'gedung baru tekkom A.102'),
(9, 'Sistem Informasi', '2024-10-02 10:40:00', '2024-10-02 12:20:00', 1, 3, 2, 'gedung baru tekkom A.102'),
(10, 'Kriptografi', '2024-10-02 13:00:00', '2024-10-02 15:30:00', 1, 3, 3, 'Tekkom B.201'),
(11, 'Pemrograman Jaringan', '2024-10-03 08:40:00', '2024-10-03 10:20:00', 1, 3, 3, 'Tekkom B.201'),
(12, 'Etika Profesi', '2024-10-03 11:40:00', '2024-10-03 13:20:00', 1, 3, 1, 'Tekkom B.201');

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
(1, 'cepatan'),
(2, 'lambatan'),
(3, 'pagon bacaan'),
(4, 'saringan'),
(5, 'MT');

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

--
-- Dumping data untuk tabel `leave_permits`
--

INSERT INTO `leave_permits` (`user_id`, `class_id`, `description`, `img_url`, `is_approved`) VALUES
(7, 9, 'kebanan', '/public/uploads/img_file-1697004931728-778968423.png', 1);

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
(1, 'cahyo', '3121D026', '$2b$10$HSY71Z49A8CxZYf4/Dkwwun8h6gqRA/XnhHKFM.ZFLfWCyrUHqKrS', '2001-08-21', '6', '085601560192', 1, 1, 1, '211201', 1, NULL, 'semarang', 'pribumi'),
(3, 'cahyo0', 'abcd1235', '$2b$10$ToMnqO2WZ4cDf.FUdGMSnuqxcM1.qrHzO3nffsuhngkkq6mEiGNZ6', '2001-08-21', '7', '085601560192', 1, 2, 1, '211202', 1, NULL, 'kendal', 'ppm'),
(5, 'testGuru', 'abcd1236', '$2b$10$RRDERx8Z6Agn53YJHQT27OnYb2iM.bmFyQ3eDrLlpEHzdG2OrYtRy', '2001-08-21', 'asd', '085601560192', 2, NULL, 0, NULL, 1, NULL, NULL, NULL),
(6, 'testAdmin', 'abcd1237', '$2b$10$qIvd7hB0LbQtd8QiluI8R.n/r2foDlpcsZG60kguZ62A66aataRI6', '2001-08-21', 'asd', '085601560192', 3, NULL, 0, NULL, 1, NULL, NULL, NULL),
(7, 'testSantri', 'abcd1238', '$2b$10$gi3WQLN.3Jhgf.YD5jA/keEcae1vw/o0soecRB.WaVGaDCk9YfFvK', '2001-08-21', '8', '085601560129', 1, 3, 0, '211203', 1, 'null', 'solo', 'ppmm');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`user_id`,`class_id`),
  ADD KEY `fk_attendance_class` (`class_id`);

--
-- Indeks untuk tabel `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_manager` (`manager_id`),
  ADD KEY `fk_teacher` (`teacher_id`),
  ADD KEY `classes_FK` (`type`);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `attendances`
--
ALTER TABLE `attendances`
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

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 21, 2025 at 09:54 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `form_builder`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
CREATE TABLE IF NOT EXISTS `forms` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Contact Form', 'Get in touch with us', '2025-09-20 04:02:11', '2025-09-20 04:02:11'),
(2, 'Event Registration', 'Registration form for upcoming events', '2025-09-20 04:02:11', '2025-09-20 04:02:11'),
(3, 'Product Feedback', 'Share your thoughts about our products', '2025-09-20 04:02:11', '2025-09-20 04:02:11'),
(4, 'Arafath', NULL, '2025-09-20 04:14:48', '2025-09-20 04:14:48');

-- --------------------------------------------------------

--
-- Table structure for table `form_fields`
--

DROP TABLE IF EXISTS `form_fields`;
CREATE TABLE IF NOT EXISTS `form_fields` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `form_id` bigint UNSIGNED NOT NULL,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('text','textarea','checkbox','radio','select') COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` json DEFAULT NULL,
  `required` tinyint(1) NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `form_fields_form_id_foreign` (`form_id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `form_fields`
--

INSERT INTO `form_fields` (`id`, `form_id`, `label`, `type`, `options`, `required`, `order`, `created_at`, `updated_at`) VALUES
(19, 1, 'Full Name', 'text', NULL, 1, 0, '2025-09-20 07:07:37', '2025-09-20 07:07:37'),
(20, 1, 'Email Address', 'text', NULL, 1, 1, '2025-09-20 07:07:37', '2025-09-20 07:07:37'),
(4, 2, 'Participant Name', 'text', NULL, 1, 1, '2025-09-20 04:02:11', '2025-09-20 04:02:11'),
(5, 2, 'Email', 'text', NULL, 1, 2, '2025-09-20 04:02:11', '2025-09-20 04:02:11'),
(6, 2, 'Event Type', 'select', '[\"Workshop\", \"Conference\", \"Seminar\", \"Networking\"]', 1, 3, '2025-09-20 04:02:11', '2025-09-20 04:02:11'),
(7, 2, 'Attendance Type', 'radio', '[\"In-person\", \"Virtual\"]', 1, 4, '2025-09-20 04:02:11', '2025-09-20 04:02:11'),
(8, 2, 'Dietary Restrictions', 'checkbox', '[\"Vegetarian\", \"Vegan\", \"Gluten-free\", \"None\"]', 0, 5, '2025-09-20 04:02:11', '2025-09-20 04:02:11'),
(9, 3, 'Product Name', 'text', NULL, 1, 1, '2025-09-20 04:02:11', '2025-09-20 04:02:11'),
(10, 3, 'Rating', 'radio', '[\"1\", \"2\", \"3\", \"4\", \"5\"]', 1, 2, '2025-09-20 04:02:11', '2025-09-20 04:02:11'),
(11, 3, 'Feedback Type', 'checkbox', '[\"Bug Report\", \"Feature Request\", \"General Feedback\", \"Complaint\"]', 0, 3, '2025-09-20 04:02:11', '2025-09-20 04:02:11'),
(12, 3, 'Comments', 'textarea', NULL, 0, 4, '2025-09-20 04:02:11', '2025-09-20 04:02:11'),
(13, 4, 'color', 'text', NULL, 1, 0, '2025-09-20 04:14:48', '2025-09-20 04:14:48'),
(14, 4, 'mail', 'textarea', NULL, 0, 1, '2025-09-20 04:14:48', '2025-09-20 04:14:48'),
(15, 4, 'food', 'checkbox', '[\"Option 1\", \"Option 2\"]', 0, 2, '2025-09-20 04:14:48', '2025-09-20 04:14:48'),
(21, 1, 'Message', 'textarea', NULL, 1, 2, '2025-09-20 07:07:37', '2025-09-20 07:07:37');

-- --------------------------------------------------------

--
-- Table structure for table `form_submissions`
--

DROP TABLE IF EXISTS `form_submissions`;
CREATE TABLE IF NOT EXISTS `form_submissions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `form_id` bigint UNSIGNED NOT NULL,
  `ip_address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `form_submissions_form_id_foreign` (`form_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `form_submissions`
--

INSERT INTO `form_submissions` (`id`, `form_id`, `ip_address`, `created_at`, `updated_at`) VALUES
(1, 2, '127.0.0.1', '2025-09-20 04:03:42', '2025-09-20 04:03:42'),
(2, 2, '127.0.0.1', '2025-09-20 04:08:24', '2025-09-20 04:08:24'),
(3, 2, '127.0.0.1', '2025-09-20 04:08:56', '2025-09-20 04:08:56'),
(4, 1, '192.168.1.100', '2025-09-20 04:13:43', '2025-09-20 04:13:43'),
(5, 1, '192.168.1.101', '2025-09-20 04:13:43', '2025-09-20 04:13:43'),
(6, 4, '127.0.0.1', '2025-09-20 04:15:32', '2025-09-20 04:15:32'),
(7, 4, '127.0.0.1', '2025-09-20 04:31:54', '2025-09-20 04:31:54'),
(8, 2, '127.0.0.1', '2025-09-20 06:38:43', '2025-09-20 06:38:43'),
(9, 4, '127.0.0.1', '2025-09-20 06:39:11', '2025-09-20 06:39:11'),
(10, 2, '127.0.0.1', '2025-09-21 04:06:07', '2025-09-21 04:06:07'),
(11, 2, '127.0.0.1', '2025-09-21 04:06:31', '2025-09-21 04:06:31'),
(12, 1, '127.0.0.1', '2025-09-21 04:06:55', '2025-09-21 04:06:55');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_01_01_000001_create_forms_table', 1),
(5, '2024_01_01_000002_create_form_fields_table', 1),
(6, '2024_01_01_000003_create_form_submissions_table', 1),
(7, '2024_01_01_000004_create_submission_answers_table', 1),
(8, '2025_08_26_100418_add_two_factor_columns_to_users_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `submission_answers`
--

DROP TABLE IF EXISTS `submission_answers`;
CREATE TABLE IF NOT EXISTS `submission_answers` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `submission_id` bigint UNSIGNED NOT NULL,
  `field_id` bigint UNSIGNED NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `submission_answers_submission_id_foreign` (`submission_id`),
  KEY `submission_answers_field_id_foreign` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `submission_answers`
--

INSERT INTO `submission_answers` (`id`, `submission_id`, `field_id`, `answer`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 'Arafath', '2025-09-20 04:03:42', '2025-09-20 04:03:42'),
(2, 1, 5, 'msmarafath1@gmail.com', '2025-09-20 04:03:42', '2025-09-20 04:03:42'),
(3, 1, 6, 'Workshop', '2025-09-20 04:03:42', '2025-09-20 04:03:42'),
(4, 1, 7, 'In-person', '2025-09-20 04:03:42', '2025-09-20 04:03:42'),
(5, 1, 8, '[\"Vegetarian\",\"Vegan\"]', '2025-09-20 04:03:42', '2025-09-20 04:03:42'),
(6, 2, 4, 'John Doe', '2025-09-20 04:08:25', '2025-09-20 04:08:25'),
(7, 2, 5, 'john@example.com', '2025-09-20 04:08:25', '2025-09-20 04:08:25'),
(8, 2, 6, 'Conference', '2025-09-20 04:08:25', '2025-09-20 04:08:25'),
(9, 2, 7, 'In-person', '2025-09-20 04:08:25', '2025-09-20 04:08:25'),
(10, 2, 8, '[\"Vegetarian\"]', '2025-09-20 04:08:25', '2025-09-20 04:08:25'),
(11, 3, 4, 'Arafath', '2025-09-20 04:08:56', '2025-09-20 04:08:56'),
(12, 3, 5, 'msmarafath1@gmail.com', '2025-09-20 04:08:56', '2025-09-20 04:08:56'),
(13, 3, 6, 'Workshop', '2025-09-20 04:08:56', '2025-09-20 04:08:56'),
(14, 3, 7, 'In-person', '2025-09-20 04:08:56', '2025-09-20 04:08:56'),
(15, 3, 8, '[\"Vegetarian\",\"Vegan\"]', '2025-09-20 04:08:56', '2025-09-20 04:08:56'),
(16, 4, 1, 'John Doe', '2025-09-20 04:13:43', '2025-09-20 04:13:43'),
(17, 4, 2, 'john.doe@email.com', '2025-09-20 04:13:43', '2025-09-20 04:13:43'),
(18, 4, 3, 'I would like to know more about your services.', '2025-09-20 04:13:43', '2025-09-20 04:13:43'),
(19, 5, 1, 'Jane Smith', '2025-09-20 04:13:43', '2025-09-20 04:13:43'),
(20, 5, 2, 'jane.smith@email.com', '2025-09-20 04:13:43', '2025-09-20 04:13:43'),
(21, 5, 3, 'Please send me more information about your products.', '2025-09-20 04:13:43', '2025-09-20 04:13:43'),
(22, 6, 13, 'red', '2025-09-20 04:15:32', '2025-09-20 04:15:32'),
(23, 6, 14, 'msm1@gmail.com', '2025-09-20 04:15:32', '2025-09-20 04:15:32'),
(24, 6, 15, '[\"Option 1\"]', '2025-09-20 04:15:32', '2025-09-20 04:15:32'),
(25, 7, 13, 'red', '2025-09-20 04:31:54', '2025-09-20 04:31:54'),
(26, 7, 14, 'msm1@gmail.com', '2025-09-20 04:31:54', '2025-09-20 04:31:54'),
(27, 7, 15, '[\"Option 1\",\"Option 2\"]', '2025-09-20 04:31:54', '2025-09-20 04:31:54'),
(28, 8, 4, 'Arafath', '2025-09-20 06:38:43', '2025-09-20 06:38:43'),
(29, 8, 5, 'msmarafath1@gmail.com', '2025-09-20 06:38:43', '2025-09-20 06:38:43'),
(30, 8, 6, 'Conference', '2025-09-20 06:38:43', '2025-09-20 06:38:43'),
(31, 8, 7, 'In-person', '2025-09-20 06:38:43', '2025-09-20 06:38:43'),
(32, 8, 8, '[\"Vegetarian\",\"Gluten-free\"]', '2025-09-20 06:38:43', '2025-09-20 06:38:43'),
(33, 9, 13, 'red', '2025-09-20 06:39:11', '2025-09-20 06:39:11'),
(34, 9, 14, 'a@gmail.com', '2025-09-20 06:39:11', '2025-09-20 06:39:11'),
(35, 9, 15, '[\"Option 1\"]', '2025-09-20 06:39:11', '2025-09-20 06:39:11'),
(36, 10, 4, 'Arafath', '2025-09-21 04:06:07', '2025-09-21 04:06:07'),
(37, 10, 5, 'msmarafath1@gmail.com', '2025-09-21 04:06:07', '2025-09-21 04:06:07'),
(38, 10, 6, 'Conference', '2025-09-21 04:06:07', '2025-09-21 04:06:07'),
(39, 10, 7, 'In-person', '2025-09-21 04:06:07', '2025-09-21 04:06:07'),
(40, 10, 8, '[\"Vegetarian\",\"Vegan\"]', '2025-09-21 04:06:07', '2025-09-21 04:06:07'),
(41, 11, 4, 'hasee', '2025-09-21 04:06:31', '2025-09-21 04:06:31'),
(42, 11, 5, 'hasee11@gmail.com', '2025-09-21 04:06:31', '2025-09-21 04:06:31'),
(43, 11, 6, 'Networking', '2025-09-21 04:06:31', '2025-09-21 04:06:31'),
(44, 11, 7, 'Virtual', '2025-09-21 04:06:31', '2025-09-21 04:06:31'),
(45, 11, 8, '[\"Gluten-free\"]', '2025-09-21 04:06:31', '2025-09-21 04:06:31'),
(46, 12, 19, 'Aslam', '2025-09-21 04:06:55', '2025-09-21 04:06:55'),
(47, 12, 20, 'a@gmail.com', '2025-09-21 04:06:55', '2025-09-21 04:06:55'),
(48, 12, 21, 'test', '2025-09-21 04:06:55', '2025-09-21 04:06:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', '2025-09-20 04:02:11', '$2y$12$EIAG7IG7q9WOoeJBQ5hw0.ZEAQxo4R2jl5hF802sVOxtwBPv0ATGu', NULL, NULL, NULL, NULL, '2025-09-20 04:02:11', '2025-09-20 04:02:11'),
(2, 'Admin User', 'admin@formforge.com', '2025-09-20 12:48:39', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, NULL, NULL, NULL, '2025-09-20 12:48:39', '2025-09-20 12:48:39');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

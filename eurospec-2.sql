-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 06, 2026 at 09:16 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eurospec`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `BrandId` int(11) NOT NULL,
  `BrandName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`BrandId`, `BrandName`) VALUES
(1, 'Mercedes-Benz'),
(2, 'BMW'),
(3, 'Audi'),
(4, 'Porsche');

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `brandID` int(11) NOT NULL,
  `model` varchar(100) NOT NULL,
  `year` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `mileage` int(11) DEFAULT NULL,
  `engine` varchar(100) DEFAULT NULL,
  `power` varchar(50) DEFAULT NULL,
  `transmission` varchar(50) DEFAULT NULL,
  `top_speed` varchar(50) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Available',
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `brandID`, `model`, `year`, `price`, `mileage`, `engine`, `power`, `transmission`, `top_speed`, `image_path`, `status`, `description`) VALUES
(1, 1, '300SL', 1957, 1850000.00, 12000, 'Inline-Six 3.0L', '215hp @ 5800rpm', '4-speed Manual', '161 mph', 'assets/CarImages/mercedes/300sl.png', 'Price Upon Request', 'One of the most exclusive road cars ever built, the 300SL Gullwing introduced fuel injection to production cars and remains the definitive symbol of 1950s automotive elegance.'),
(2, 1, 'SL65 Black Series', 2009, 285000.00, 34000, 'V12 6.0L Biturbo', '670hp @ 5500rpm', '5-speed Automatic', '199 mph', 'assets/CarImages/mercedes/2009-sl65-blackseries.png', 'Available', 'The SL65 Black Series represents the absolute pinnacle of Mercedes-AMG excess — a hand-built V12 with 670hp stripped of all comfort in pursuit of raw performance.'),
(3, 1, 'AMG GTR', 2020, 175000.00, 18000, 'V8 4.0L Biturbo', '577hp @ 6250rpm', '7-speed DCT', '198 mph', 'assets/CarImages/mercedes/2020-amg-gtr.png', 'Available', 'Born on the Nürburgring, the AMG GT R is a track weapon disguised as a road car. Its aerodynamic body and race-derived suspension make it one of the most driver-focused AMGs ever made.'),
(4, 1, 'S63 E-Performance', 2023, 210000.00, 5000, 'V8 4.0L Biturbo Hybrid', '802hp Combined', '9-speed Automatic', '186 mph', 'assets/CarImages/mercedes/2023-s65-eperformance.png', 'Available', 'The S63 E-Performance fuses a twin-turbocharged inline-six with Formula 1 derived battery technology, producing a combined 802hp in the most technically advanced S-Class ever built.'),
(5, 2, 'M3 GT', 1994, 185000.00, 42000, 'Inline-Six 3.0L', '295hp @ 7000rpm', '5-speed Manual', '155 mph', 'assets/CarImages/bmw/1994-m3gt.png', 'Available', 'Built specifically for GT racing homologation, the M3 GT is an ultra-rare road car with a naturally aspirated inline-six, stripped interior and a competition pedigree that defined an era.'),
(6, 2, 'M5', 1996, 95000.00, 67000, 'Inline-Six 3.8L', '340hp @ 6900rpm', '6-speed Manual', '155 mph', 'assets/CarImages/bmw/1996-m5.png', 'Available', 'The E34 M5 was the worlds fastest production saloon when launched. Its silky smooth inline-six and understated appearance made it the original sleeper performance car.'),
(7, 2, 'X5M', 2024, 145000.00, 8000, 'V8 4.4L Biturbo', '617hp @ 6000rpm', '8-speed Automatic', '177 mph', 'assets/CarImages/bmw/2024-x5m.png', 'Available', 'The X5 M Competition redefines what an SUV can do. With 617hp from its twin-turbo V8 and adaptive suspension, it corners with the confidence of a sports car despite its imposing size.'),
(8, 2, 'M2 CS', 2026, 98000.00, 2000, 'Inline-Six 3.0L', '444hp @ 6250rpm', '7-speed DCT', '177 mph', 'assets/CarImages/bmw/2026-m2cs.png', 'Price Upon Request', 'The M2 CS is the purest expression of the M2 lineage — lightweight, focused and equipped with the S58 engine borrowed from the M3. A future classic hiding in plain sight.'),
(9, 3, 'R8 V10', 2020, 175000.00, 22000, 'V10 5.2L', '562hp @ 8000rpm', '7-speed DCT', '201 mph', 'assets/CarImages/audi/2020-audi-r8v10.png', 'Available', 'The R8 V10 is Audis only true supercar. Its naturally aspirated 5.2 litre V10 screams to 8250rpm and delivers a driving experience that is raw, mechanical and completely unforgettable.'),
(10, 3, 'RS6 Avant', 2020, 115000.00, 31000, 'V8 4.0L Biturbo', '591hp @ 6000rpm', '8-speed Automatic', '190 mph', 'assets/CarImages/audi/2020-audi-rs6.png', 'Available', 'The RS6 Avant is the ultimate everyday weapon — a 591hp estate car that can swallow a family and their luggage while dispatching supercars on track. Practical performance redefined.'),
(11, 3, 'RS5 Avant', 2027, 95000.00, 1000, 'V6 2.9L Biturbo Hybrid', '630hp Combined', '8-speed Automatic', '174 mph', 'assets/CarImages/audi/2027-audi-rs5-avant.png', 'Price Upon Request', 'The RS5 Avant brings performance estate credentials to a sleeker silhouette. Its turbocharged inline-six delivers effortless performance wrapped in one of Audis sharpest designs.'),
(12, 3, 'Sport Quattro', 1984, 550000.00, 12400, 'Inline-Five 2.1L Turbo', '306hp @ 5900rpm', '5-speed Manual', '155 mph', 'assets/CarImages/audi/audi-sport-quattro.png', 'Price Upon Request', 'The original weapon of the World Rally Championship. The Sport Quattro homologation special introduced four-wheel drive to motorsport and changed rallying forever. Fewer than 225 were built.'),
(13, 4, '911 Turbo 3.3', 1988, 325000.00, 54000, 'Flat-Six 3.3L Turbo', '300hp @ 5500rpm', '4-speed Manual', '168 mph', 'assets/CarImages/porsche/911turbo3.3.png', 'Available', 'The 930 Turbo 3.3 was the most feared production car of its era. Its lag-heavy turbocharger and rear-engine weight distribution demanded total respect — and rewarded it with visceral, unforgettable performance.'),
(14, 4, '911 GT3 S/C', 2027, 195000.00, 500, 'Flat-Six 4.0L', '502hp @ 9000rpm', '7-speed PDK', '194 mph', 'assets/CarImages/porsche/2027-911gt3s-c.png', 'Price Upon Request', 'The ultimate expression of the 992 generation, the GT3S pushes aerodynamic and mechanical grip to new limits while retaining the screaming naturally aspirated flat-six that defines the GT bloodline.'),
(15, 4, 'Carrera GT', 2004, 1350000.00, 8900, 'V10 5.7L', '603hp @ 8000rpm', '6-speed Manual', '205 mph', 'assets/CarImages/porsche/carreragt.png', 'Price Upon Request', 'Porsche built just 1,270 Carrera GTs, each powered by a 5.7 litre naturally aspirated V10 derived from a Le Mans prototype. It is widely regarded as the greatest drivers car ever made.'),
(16, 4, '959', 1988, 1650000.00, 8900, 'Flat-Six 2.8L Turbo', '444hp @ 6500rpm', '6-speed Manual', '197 mph', 'assets/CarImages/porsche/porsche959.png', 'Price Upon Request', 'The 959 was a decade ahead of its time. All-wheel drive, twin-sequential turbos and active suspension in 1986 made it the most technologically advanced road car ever built at the time of its release.'),
(17, 3, 'RS2 Avant', 1993, 75000.00, 85000, 'Inline-Five 2.2L Turbo', '311hp @ 6500rpm', '6-speed Manual', '163 mph', 'assets/CarImages/audi/1993-rs2-avant.png', 'Available', 'The RS2 Avant was born from a collaboration between Audi and Porsche. Its turbocharged five-cylinder engine and Quattro all-wheel drive made it the fastest estate car in the world when it launched in 1993.'),
(18, 3, 'TT RS Coupe', 2020, 65000.00, 15000, 'Inline-Five 2.5L Turbo', '394hp @ 5850rpm', '7-speed DCT', '174 mph', 'assets/CarImages/audi/2020-ttrscoupe.png', 'Available', 'The TT RS Coupe houses a legendary turbocharged five-cylinder engine that produces a distinctive sound unlike anything else on the road. It blends everyday usability with genuine performance car credentials.'),
(19, 3, 'RS e-tron GT performance', 2025, 167000.00, 20000, 'Dual Electric Motors', '912hp Combined', '2-speed Automatic', '155 mph', 'assets/CarImages/audi/2025-rs-etron GT-performance.png', 'Available', 'The RS e-tron GT Performance represents Audis most powerful road car ever built. Twin electric motors produce a combined 912hp, launching it from 0 to 60 in under 2.5 seconds in near silence.'),
(20, 3, 'RS Q8', 2025, 135000.00, 3000, 'V8 4.0L Biturbo', '591hp @ 6000rpm', '8-speed Automatic', '189 mph', 'assets/CarImages/audi/2025-rsq8.png', 'Available', 'The RS Q8 is the definitive performance SUV — a full size luxury family hauler that laps the Nurburgring faster than many dedicated sports cars. 591hp and Quattro make it brutally, effortlessly fast.'),
(21, 2, 'M Roadster', 1999, 45000.00, 60000, 'Inline-Six 3.2L', '321hp @ 7400rpm', '5-speed Manual', '155 mph', 'assets/CarImages/bmw/1999-m-roadster.png', 'Available', 'The Z3 M Roadster is a raw, analogue sports car that BMW has never truly replicated. Its inline-six mounted in a compact roadster body creates a perfectly balanced, driver focused machine with a distinctive aggressive stance.'),
(22, 2, 'M3 GTS', 2011, 165000.00, 12000, 'V8 4.4L', '444hp @ 8300rpm', '7-speed DCT', '190 mph', 'assets/CarImages/bmw/2011m3gts.png', 'Price Upon Request', 'The E92 M3 GTS was a limited homologation special built purely for track use. Its high revving V8 engine was tuned to 444hp and its stripped, lightweight body made it one of the most focused M cars ever produced.'),
(23, 2, 'M8 Gran Coupe', 2023, 130000.00, 8000, 'V8 4.4L Biturbo', '617hp @ 6000rpm', '8-speed Automatic', '190 mph', 'assets/CarImages/bmw/2023-m8comp-grancoupe.png', 'Available', 'The M8 Gran Coupe is BMWs most powerful and most luxurious four door coupe. Its twin turbo V8 produces 617hp while the interior rivals Rolls Royce in quality — a true grand tourer without compromise.'),
(24, 2, 'i7 M70 xDrive', 2024, 155000.00, 1500, 'Dual Electric Motors', '650hp Combined', '1-speed Automatic', '155 mph', 'assets/CarImages/bmw/2024-i7-m70xdrive.png', 'Available', 'The i7 M70 xDrive is the most powerful 7 Series ever made. Two electric motors combine to produce 650hp in a luxury flagship that redefines what a performance saloon can be in the electric age.'),
(25, 1, 'CLE 53 AMG', 2024, 85000.00, 500, 'Inline-Six 3.0L Turbo Hybrid', '443hp Combined', '9-speed Automatic', '155 mph', 'assets/CarImages/mercedes/cle53amg.png', 'Available', 'The CLE 53 AMG is the spiritual successor to the legendary CLK line. Its mild hybrid inline-six produces 443hp combined and wraps it in one of the most elegant coupe bodies Mercedes has designed in years.'),
(26, 1, 'G63 AMG', 2024, 195000.00, 4000, 'V8 4.0L Biturbo', '577hp @ 6000rpm', '9-speed Automatic', '149 mph', 'assets/CarImages/mercedes/g63.png', 'Available', 'The G63 AMG transforms an iconic off road legend into a 577hp street weapon. Its hand built V8 and thunderous exhaust note make it one of the most recognisable and desired vehicles on any road in the world.'),
(27, 1, 'SLR McLaren', 2005, 450000.00, 18000, 'V8 5.4L Supercharged', '617hp @ 6500rpm', '5-speed Automatic', '208 mph', 'assets/CarImages/mercedes/slr-mclaren.png', 'Price Upon Request', 'Born from a partnership between Mercedes and McLaren, the SLR is a true supercar. Its supercharged V8 produces 617hp and the dramatic carbon fibre body conceals a Le Mans inspired engineering philosophy.'),
(28, 1, 'SLS AMG', 2011, 250000.00, 22000, 'V8 6.2L', '563hp @ 6800rpm', '7-speed DCT', '196 mph', 'assets/CarImages/mercedes/sls-amg.png', 'Price Upon Request', 'The SLS AMG was the first car developed entirely in house by Mercedes AMG. Its gullwing doors, naturally aspirated 6.2 litre V8 and spine tingling exhaust note make it an instant modern classic.'),
(29, 4, '911 GT2 RS', 2018, 385000.00, 6000, 'Flat-Six 3.8L Biturbo', '700hp @ 7000rpm', '7-speed PDK', '211 mph', 'assets/CarImages/porsche/2018-gt2rs.png', 'Price Upon Request', 'The 911 GT2 RS is the most powerful and most extreme 911 ever built for road use. Its twin turbocharged flat six produces 700hp sent exclusively to the rear wheels — a machine that demands total commitment and rewards it absolutely.'),
(30, 4, '911 Dakar', 2023, 280000.00, 1500, 'Flat-Six 3.0L Biturbo', '473hp @ 6500rpm', '8-speed PDK', '149 mph', 'assets/CarImages/porsche/2023-911dakar-rallye.png', 'Price Upon Request', 'The 911 Dakar is Porsches most adventurous 911 in decades. Raised suspension, all terrain tyres and a reinforced body allow it to tackle any surface while its turbocharged flat six ensures it remains a true 911 at heart.'),
(31, 4, 'Taycan Turbo GT', 2025, 250000.00, 1000, 'Dual Electric Motors', '1019hp Combined', '2-speed Automatic', '180 mph', 'assets/CarImages/porsche/2025taycanturbo-gt.png', 'Price Upon Request', 'The Taycan Turbo GT is the fastest accelerating production Porsche ever made. Its 1019hp dual motor setup launches it from 0 to 60 in 2.2 seconds while delivering a driving experience that redefines what an electric car can feel like.'),
(32, 4, '918 Spyder', 2015, 1850000.00, 4500, 'V8 4.6L Hybrid', '887hp Combined', '7-speed PDK', '214 mph', 'assets/CarImages/porsche/porsche918.png', 'Price Upon Request', 'The 918 Spyder is one of the holy trinity of hybrid hypercars. Its combination of a naturally aspirated V8 and two electric motors produces 887hp in a car that set a Nurburgring lap record and redefined what a road legal Porsche could achieve.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`BrandId`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brandID` (`brandID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`brandID`) REFERENCES `brands` (`BrandId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

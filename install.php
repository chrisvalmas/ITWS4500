<?php

	require 'config.php';

   try {
      $conn = new PDO('mysql:host=localhost;', $config['DB_USERNAME'], $config['DB_PASSWORD']);
   } catch(PDOException $e) {
      echo 'ERROR: ' . $e->getMessage();
   }

   if ($conn) {
      echo "Connected!";
   }

   $conn->exec("
   	CREATE DATABASE IF NOT EXISTS websyslab9 DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_unicode_ci;");
   echo "<br>Database Created <br>";
   $conn->exec("
   	CREATE TABLE websyslab9.courses(
      	crn INT(11) NOT NULL PRIMARY KEY,
      	prefix VARCHAR(4) NOT NULL,
      	number SMALLINT(4) NOT NULL,
      	title VARCHAR(255) NOT NULL,
      	section SMALLINT(2) NOT NULL,
      	year SMALLINT(4) NOT NULL
      );
   ");
   echo "Courses Table created <br>";

   $conn->exec("
   	CREATE TABLE websyslab9.students (
      	rin INT(9) NOT NULL PRIMARY KEY,
      	fName VARCHAR(100) NOT NULL,
      	lName VARCHAR(100) NOT NULL,
      	address1 VARCHAR(50) NOT NULL,
      	city VARCHAR(50) NOT NULL,
      	state VARCHAR(12) NOT NULL,
      	zip INT(5) NOT NULL,
         year INT(4) NOT NULL
      );
   ");
    echo "students Table created <br>";

   $conn->exec("
   	CREATE TABLE websyslab9.grades (
      	id INT(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
      	crn INT(11) NOT NULL,
      	rin INT (9) NOT NULL,
      	grade INT(3) NOT NULL,
      	FOREIGN KEY (crn) REFERENCES websyslab9.courses(crn),
      	FOREIGN KEY (rin) REFERENCES websyslab9.students(rin)
      );
   ");
    echo "grades Table created <br>";
?>
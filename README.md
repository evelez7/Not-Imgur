# CSC 317 Term Project

## Purpose

The purpose of this repository is to store all the code for your web application. This also includes the history of all commits made and who made them. Only code submitted on the master branch will be graded.

Please follow the instructions below and fill in the information requested when prompted.

## Student Information

|               | Information           |
|:-------------:|:---------------------:|
| Student Name  | Erick Velez           |
| Student ID    | 917148120             |
| Student Email | evelez1@mail.sfsu.edu |



# Build/Run Instructions

## Build Instructions
### To get dependencies
1. Navigate to source folder (in the repo, 'cd application')
2. run 'npm install' to get all **required** dependencies

### To populate database
Please see the config directory README for more information on the database details assumed by the app
1. If using MySQL Workbench, navigate to Server -> Data Import -> "Import from Self-Contained File" -> Select `csc317_users.sql`, execute
2. If using the terminal, `mysql -u {USERNAME} csc317db < {FILE_PATH}'

## Run Instructions
1. Navigate to application source (in the repository, 'cd application') through the command line
2. Run the command 'npm start'
3. Navigate to the project url (http://localhost:3000/)

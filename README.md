# UniResto
## Description
UniResto is a mobile application that makes restaurant reservations easy. Users can make reservations at a public or private restaurants using virtual tickets.<br /> 
The app also provides real-time updates on the status of your reservation and the restaurant, including any changes to the estimated wait time and the status of the queue. Additionally, 
the app gives restaurants the ability to verify and confirm reservations or cancel them if needed, which help them manage their queues more effectively.
### Features 
- Real-time updates: Users can receive real-time updates on the status of their reservation, including any changes to the estimated wait time and the status of the queue.
- Verification and confirmation: Restaurants can verify and confirm reservations made through the app, or cancel them if needed.

## Technologies
This restaurant reservation app includes a React Native front-end for the mobile application, a FastAPI back-end for handling the API calls, and a MySQL database for storing information about the restaurants, reservations, and users. The app uses React Native for the mobile interface, allowing for easy development and deployment on both iOS and Android platforms. The FastAPI back-end provides a fast and efficient way to handle the API calls, while the MySQL database allows for easy storage and retrieval of the app's data. The virtual tickets 
feature is implemented through the use of unique QR codes, which are generated and stored in the database for each reservation.
- [React Native](https://reactnative.dev) a popular open-source framework for building cross-platform mobile applications using React.
- [FastAPI](https://fastapi.tiangolo.com) a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.
- [MySQL](https://www.mysql.com) a widely used, open-source relational database management system that is known for its reliability, robustness and performance.

## Requirements:
- MySQL
- Virtual Environment : To create a virtual environment using python, use the command
```python -m venv env ``` 
in your project directory. This will create a new folder named "env" which contains the virtual environment. <br /> To activate the virtual environment, use the command source ```bash env/bin/activate ``` on Linux/macOS or ```env\Scripts\activate``` on Windows
- FastAPI : run these commands(pyhton needs to be already installed):
```python
pip install "fastapi[all]
pip install "uvicorn[standard]"
pip install python-multipart
pip install "python-jose[cryptography]"
pip install "passlib[bcrypt]"
pip install sqlalchemy
pip install mysqlclient"
```
- React Native
- Emulator(Android Studio) or [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US&pli=1) on your phone.
## Configuration 
### Database Configuration : 
To create a database in your local machine you need to run these commands:
1. ```bash mysql -u root -p ``` 
2. Enter MySQL password(the one created when you installed mySQL]
3. ```bash CREATE DATABASE DATABASE_NAME ``` 
4. To connect the back-end to the MySQL database, you will need to replace the placeholder password in the [database.py](https://github.com/Soulaimene/RESTO/blob/master/Resto-App/fast_back/database.py) with your actual MySQL password and the placeholder "DATABASE_NAME" with the name of the database you have created. The tables for the database will be automatically created when the code  runs successfully.
### How to run this code 

First you have to clone this repository : 
```bash
git clone https://github.com/Soulaimene/RESTO.git 
```
then open the terminal and type :
 ```bash
cd RESTO/Resto-App/
uvicorn fast_back.main:app --reload
```
Also, you have to use another terminal for the Bank.py :
 ```bash
cd RESTO/Resto-App/Bank
python man.py 
```
and Finally, another terminal for the frontend 
```bash 
cd RESTO/Restp-App/UniResto
npm start 
```
then press ```a``` inside the terminal to open the Emulator.


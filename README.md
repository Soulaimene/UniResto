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
4. To connect the back-end to the MySQL database, you will need to replace the placeholder password in the [database.py](https://github.com/Soulaimene/UniResto/blob/master/Resto-App/fast_back/database.py) with your actual MySQL password and the placeholder "DATABASE_NAME" with the name of the database you have created. The tables for the database will be automatically created when the code  runs successfully.
### How to run this code 

First you have to clone this repository : 
```bash
git clone https://github.com/Soulaimene/UniResto.git 
```
then open the terminal and type :
 ```bash
cd UniResto/Resto-App/
uvicorn fast_back.main:app --reload
```
Also, you have to use another terminal for the Bank.py :
 ```bash
cd UniResto/Resto-App/Bank
python main.py 
```
and Finally, another terminal for the frontend 
```bash 
cd UniResto/Restp-App/UniResto
npm start 
```
then press ```a``` inside the terminal to open the Emulator.

# Interface Instructions 
After, Running the code please follow the instructions :

### Creating an account:

1. Open the UniResto app.
2. Tap on "Create an Account".
3. Fill in your personal information such as your name, email, and password,and specify the type of user you are(student or worker).
4. Tap on "Create Account" button to complete the process.
### Loging in:

1. Open the UniResto app.
2. Enter your email and password and specify the type of user you are(student or worker).
3. Tap on "Log In" button to access your account.

### Purshasing tickets(student):

1. Open the UniResto app and log in.
2. Tap on "Purshase Tickets" at the bottom of the screen.
3. Fill in your personal information.
4. specify the number of tickets your buying .
5. Tap on "Purshase" to finish the transaction.

### Make reservation(student):
1. Open the UniResto app and log in.
2. Buy tickets if you don't have any.
3. If the restaurant is not active , wait for the worker to activate it.
4. If the restaurant is active,Tap on "Make a reservation".

### Check The menu(Student):
1. Open the UniResto app and log in.
2. If the restaurant is not active , wait for the worker to activate it.
3. Once the restaurant is activated,the button "Check Menu" will appear, Tap on it

### Verify or cancel your reservation:
1. Open the UniResto app and log in.
2. If you don't have a reservation,follow the steps on making one.
3. Tap on the "manage reservation" to go your reservation page.
4. To cancel your reservation tap on cancel your reservation
5. To verify your reservation show your QRcode to the worker.

### Create a Restaurant State:
1. Open the UniResto app and log in.
2.Tap on "create State".
3. Enter the information of this meal.
4. Tap On "create State".

### Manage the queue and the reservations:

1. Open the UniResto app and log in.
2. If there is no reservation active , follow the previous steps to create one.
3. If the restaurant is not able to serve student , tap on "freeze" to announce that the queue is not moving, and tap "unfreeze" when the service is back.
4. Once the stuff is ready , tap "open" to announce to the students that the restaurant is now serving.
5. If the student is not present for his/her reservation, tap cancel reservation.
6. If the student is present,tap scan to open the camera and then scan his QRcode.  
7. Once the time comes, tap "close" to close the restaurant state.




# Building progress

#### temporary l;ive link - +  hosting:channel: Channel URL (travel-guru-b4986): https://travel-guru-b4986--testing-jnlfa3wh.web.app 

temporary deploy command 
```firebase hosting:channel:deploy testing```

### 1. Home page
- slider created (can be make bettar)
- dynamically backgeound image set and details text displaying
- booking form opened by clicking booking button
- start date and end date set and also dynamic it.
- by clicking on start booking button. the order save in database and redirect the user in my bookings page.
- if user not loging or login session expired the booking proccess not work properly. it display an error.

### 2. My bookings page
- here all of the bookings
- user can filter which booking see like previus booking or future bookings.
- the single booking card component containing -
  - a photo of place
  - a map with marker for exact location
  - pay button
    - by click pay button you will redirect the payment page
    - here you can pay with card
    - after payment recieved you will redirect the my bookings page
  - if not paid the cancel button showing.
  - hotel booking info
    - if no hotel booked there show in link that redirecting.
    - if boked any hotel you see the total cost based one your living days
    
### 3. Hotel booking page
- there are display some hotels based on tour place
- there are a map that shown all the hotels exact location by marking
- by clicking hotel name to redirect hotel booking page
- in this page included a form and some picture of the hotel
- after submiting form you will be redirect the My bookings page

### 4. Login page
- login and register system applied (log out button shown in heder)

### Admin Dashboard


# Issues (user roll)
1. Admin dashboard form modal responsive problem in [Modal.js](./src/Pages/Common/Modal.js)
2. 

# Upcoming fetures
1. Bus booking



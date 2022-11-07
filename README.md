# Building progress

### 1. Home page
- slider created (can be make bettar)
- dynamically backgeound image set and details text displaying
- booking form opened by clicking booking button
- start date and end date set and also dynamic it.
- by clicking on start booking button. the order save in database and redirect the user in my bookings page.
- if user not loging or login session expired the booking proccess not work properly. it display an error.

### 2. My bookings page
- here all of the bookings
- the single booking card component containing -
  - a photo of place
  - a map with marker for exact location
  - pay button
  - if not paid the cancel button showing.
  - hotel booking info
    - if no hotel booked there show in link that redirecting.
    - if boked any hotel you see the total cost based one your living days
    
### 3. Hotel booking page
- there are display some hotels based on tour place
- there are a map that shown all the hotels exact location by marking
- by clicking hotel name to redirect hotel booking page
- in this page included a form and some picture of the hotel
- after submit you will be redirect the My bookings page

### 4. Login page
- login and register system applied (log out button shown in heder)


# Mejor Issues (user roll)
1. when book a hotel the hotel set all the similler places bookings
2. when paying for a booking the payment implemented all the similler place bookings
3. How to pay -
 - book a hotel and pay for that, book a bus/air ticket then pay for it
 - pay at one time
   - when book a hotel then pay once after user again book for a bus the payment button again active and user can pay again
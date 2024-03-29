# Hotel Booking Application

### Team Name - Code Rash

### Team Members 
1. Rushabh Sheta (SJSU ID - 016038646)
2. Aniket Thumar (SJSU ID - 015228993) 
3. Saurabh Sathe (SJSU ID - 015272023)
4. Harsh Vaghasiya (SJSU ID - 016053102) 

### Summary of Contributions
- Rushabh Sheta
  - Designed the backend APIs for User Rewards and Admin Login.
  - Implemented the frontned functionality to search for the hotels at the customer end.
  - Implemented the backend functionality for viewing My Bookings at the customer end.
  - Designed the backend APIs for Modify Booking and Cancel Booking at the customer end.
  - Integrated frontend pages and tested API calls.
  - Analyzed the primary goals to be met at every stage of our project in order to keep focused on what was necessary.
  
- Aniket Thumar
  - Designed frontend functionality for User Login.
  - Created separate NavBar component to be used in all pages.
  - Implemented the frontend functionality for viewing my bookings at the customer end.
  - Ensured communication between teammates throughout the project and maintain sprint task sheet.
  - Helped others to resolve their issues whenever required.

- Saurabh Sathe
  - Designed the backend APIs for Admin side to add rooms and view users, bookings and rooms.
  - Implemented the backend functionality to add rewards on successful stay.
  - Implemented the frontend functionality for viewing My Bookings at the customer end.
  - Designed the frontend for Modify Booking and Cancel Booking at the customer end.
  - Between sprints gave regular feedback, allowing us to bounce ideas off all our teammates and improve with each sprint.

- Harsh Vaghasiya
  - Designed Landing page with access to Login and Register.
  - Designed the frontend for Admin side to add rooms and view users, bookings and rooms.
  - Implemented the backend functionality to search for the hotels at the customer end.
  - Designed the frontend for User Profile.
  - Implemented routing on the frontend side.
  

### Architecture Diagram
![](https://github.com/gopinathsjsu/team-project-code-rash/blob/main/Documentation/Diagrams/Architecture%20Diagram.jpeg)

### Class Diagram
![](https://github.com/gopinathsjsu/team-project-code-rash/blob/main/Documentation/Diagrams/Class%20Diagram.png)

### UI Wireframe
![](https://github.com/gopinathsjsu/team-project-code-rash/blob/main/Documentation/UI%20Wireframe/UI%20Wireframe.png)

### Link to team's GitHub Repo 
https://github.com/gopinathsjsu/team-project-code-rash

### Link to team's Project Board
https://github.com/gopinathsjsu/team-project-code-rash/projects/1

### Link to team's Project Journal
https://github.com/gopinathsjsu/team-project-code-rash/tree/main/Documentation/Journals

### Link to team's Google Sprint Task Sheet
https://docs.google.com/spreadsheets/d/13gUidq-4Wmffb-xHHNgz9p9wrn0GRqPDQghvKsaRWRs/edit?usp=sharing

### Tools and Languages Used
- Frontend : React JS
- Backend : Node JS, Express JS
- Database : MongoDB
- Cloud : AWS EC2 Autoscaling with Load Balancer

### XP Values followed
1. Communication
  - WhatsApp was used a primary source of our communication.
  - Everyone on our team worked jointly at every stage of the project to keep a track of our progress.
  - We conducted a weekly sprint once a week on Thursday to keep a track of the progress made until then.
  - During weekly sprints, we tried to identify our blockers and tried to remove them in the next sprint.
  - Our team followed a hybrid communication approach in conducting meetings such as in-person meetings and online meetings through Zoom.   

2. Feedback
  - Couple of minutes were reserved for feedback at the end of each sprint to discuss if any improvement was needed by a team member. 
  - We identified areas for improvement through constant feedback and revised the practices previously followed. 
   
3. Simplicity
  - We tried to keep the things simple and follow "to do only what is needed".
  - We also tried to minimize the wastage of time by doing only the absolute requirements stated in the problem statement.
  
### Implementation of Dynamic Pricing Algorithm 
  - We implemented the dynamic pricing by taking into account the weekends, national holidays and different festive seasons.
  - If the booking dates fell into the weekend category, then the bookingprice was hiked by 40% to the base proce.
  - If the booking dates fell into the national holidays category, then the booking price was hiked by 15% to the base price.
  - If the booking dated fell into the festive category, then the booking prices of 3 days prior to the festival and 3 days after the festival were hiked.

### Assignment of Customer Loyalty (Rewards)
  - The rewards are assigned to the customer based on the suuccesful completion of his/her stay at the hotel.
  - If the customer is yet to complete his/her stay, then that rewards will be shown as pending rewards.
  - Customer has an option to use the rewards available while booking for his/her stay.
  - Once the customer uses his/her available rewards, then the rewards available will be decucted by that amount and simulataneosuly rewards used will be incremented by the same.

### Multiple Booking System (Cart System)
  - The cart system was implemented so that a customer can book multiple rooms at the same time.
  - The available rewards can also be used in this cart system.
  - Customer can also modify and cancel bookings once he/she books it.
 
### Week Wise Design Decisions
1. Technologies to be used for frontend - Vannilla HTML, CSS, Bootstrap, React JS, Ant Design or Material UI?
2. Technologies to use for the backend - Python Flask, Java Spring Boot or Node JS?
3. Database to be used - MySQL or MongoDB
4. Design patterns to use - Decided to use Chain of Responsibility and Strategy Patterns
5. Rewards generation strategies- factors affecting rewards, when they change, events triggering them and much more.
6. Dynamic Pricing Strategies - How weekday, weekends, national holidays and festive seasons will contribute to the booking price of day?
7. Testing Strategies - Tools to be used and which APIs to test?
8. Cloud Services strategies- AWS or Heroku, ECR or EC2 deployment and cloud related decisions? 

### Feature Set
1. User can login and register.
2. User can browse through various rooms available and filter using different filters provided like room type and location.
3. User can book a room, modify reservation and cancel reservation.
4. User can choose to use the available rewards while doing payment and can create multiple bookings using cart functionality.
5. User can see his past bookings and available rewards by using his/her profile section.
6. Admin can add a room.
7. Admin can see the existing users, booking and rooms of different hotels.
8. Dynamic pricing will be assigned for the rooms based on various factors like peak season, holiday season and weekends.
9. Rewards would be generated for the user using his history of successful orders and the current booking amount.
10. User can also view the details of the room.

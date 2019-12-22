 ### Solitaire FreeCell - Assignment

 

 This project showcases a Solitaire FreeCell Assignment

 

 **Running the application** 

step 1:  to run the react application , install all dependencies 

 ```
 yarn  
 ```

step 2 :  

```
 yarn start 
```



 **Design and assumptions** 

 - this implementation uses redux state 
 - you can drag just the top card in each stack
 - all the game logic is located in one file :  src\redux\game\game.logic.js
 - all actions for the game are located in one file : src\redux\game\game.actions.js
 - all actions fired by the game ( and not by the user directly) end in  ***_RESOLUTION**
 - all actions that occur as a request by user end in  ***_REQUESTED**
 - when an action is requested by the user ,  **redux-saga** will pick it up, preform some game logic ( in more elaborate application this may involve side effects such as call to backend) and then once done **redux-saga** will fire the appropriate event , this is to make clear what events are fired following the user interaction and what events are fired following some logic 
 - using an action based setup allows to record user action and the response actions that occur in  response 
 - src\utils\actionErrorCatchingUtils.js : is a utility I wrote to catch unhandled or undefined actions 
 - game data is fetched (simulated) from src\data\game.data.js
 - the game logic is divided into different functions 
 - win condition is only run once a move into the foundation slot was successful
 - the page is responsive 
 - the drag and drop is done using the **react-dnd** library 



**Future Enhancements**  

- add more visual feedback to user actions 

- add animations to drag effects

- this setup using actions allows to easily record each move, so an undo capability can be added

- allow user to record and replay their moves

- allow persistency of game state (survive F5) , this can be done using **redux-persist**

  



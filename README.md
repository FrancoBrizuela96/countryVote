Loopstudio Frontend Challenge

How to run:

1 - Clone the project on your prefered folder

2 - Open the project directory then run npm install

3 - After installation run on the same directory npm run dev

4 - You should now be able to open your browser and navigate to this URL, application should be live! => http://localhost:5173/

My Approach:

-   I decided to use React with Typescript for this project (that's always my preference).
-   I first took care of the whole UI with static information.
-   Only library I'm using here is tailwind css for faster development ( personal preference too ).
-   Once the UI was ready I moved on to the context creation ( state management ) and business logic ( API calls, and form submition ) to start working with real data.
-   I divided the application in 2 big sections the voting form and the countries table
-   For state management I could've used Redux or Zustand, but since this was a quick and small project I decided to go with context API ( wich is easier to implement and much less boilerplate ). I think this is the best approach for this type of projects.
-   Application is working with all it's functionalities, also when you submit your vote you can see the table actually changing with the new voted number!

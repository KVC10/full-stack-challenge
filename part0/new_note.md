sequenceDiagram
actor User

            participant Browser
            participant Server

      User ->> Browser: Create new note and click save
      Browser ->> Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
      Server -->> Browser: HTTP 302 (Redirect) asks the browser to perform a new HTTP GET request to the address defined in the header's Location
      Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
      Server -->> Browser: Returns the HTML page containing the list of notes

      Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
      Server -->> Browser: Returns the css file

      Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
      Server -->> Browser: Returns the js file

      Note over Browser: The browser starts executing the javascript code that fetches the JSON from the server

      Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
      Server -->> Browser: Returns the json file containing the list of notes

      Note over Browser: The browser executes the callback function that renders the notes to the page

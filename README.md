Instructions for running this sample app:

1) ensure you have installed node.js in your system. its version must be at least 20 ( you can check its version by running "node -v"  in terminal) and npm ( node package manager ) comes with it by default
2) if you configured your local rabbitmq instance in different host or different port , you can configure app's rabbitmq host from .env file
3) open terminal and move to the app's folder.
4) run "npm install" in terminal
5) after install is succeed , open 2 another terminal ( 3 terminal in total )
6) in first terminal go to the app's directory and run "node 720p.js"
7) in second terminal go to the app's directory and run "node 400p.js"
8) in first terminal go to the app's directory and run "node publisher.js"

you can see results in terminals.

note: you can run publisher.js as much as you want in order to publish more messages.

thank you for your help !
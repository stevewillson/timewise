Timewise is a simple time tracking system that provides a graphical way of viewing a daily plan and then capturing actual time spent.

Two timegrids are displayed:
Planning | Tracking

Clicking the timegrid adds an event, events can be resized and moved. Clicking on an event edits the title, dragging an event off the screen removes the event.

![timewise_screenshot][screenshot_1]

[screenshot_1]: timewise_1.png "Timewise Screenshot"

## Installation

1. Clone the git repository `git clone git@gitlab.com:stevewillson/timewise.git`
2. Change directory to the cloned repository `cd timewise`
3. Install dependencies `npm install`
4. Start a development server `npm start`
5. Browse to `localhost:3000` to use timewise

## Package to a single `index.html` file

1. Clone the git repository `git clone git@gitlab.com:stevewillson/timewise.git`
2. Change directory to the cloned repository `cd timewise`
3. Install dependencies `npm install`
4. Build the application `npm run build`
5. Generate the single `index.html` file: `npx gulp`
6. The generated file is located at: `./build/index.html`
7. Open this file locally on a computer with a web browser to use timewise without connecting to the internet

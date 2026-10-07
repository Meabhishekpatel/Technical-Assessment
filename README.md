# Technical Assessment App

A responsive React technical assessment application with a 10-minute countdown timer, automatic submission, localStorage persistence, result calculation, and answer review.

## Features

- 10 assessment questions stored in a local JSON file.
- Start screen with question count and time limit.
- One `useReducer` for:
  - Questions
  - Current question
  - User answers
  - Timer
  - Assessment status
- 10-minute countdown timer.
- Automatic submission when the timer reaches zero.
- Previous and Next question navigation.
- Question navigation panel.
- Selected answers stored inside the reducer.
- Assessment state saved in `localStorage`.
- Assessment restored after page refresh.
- Score, total questions, and percentage.
- Review section with:
  - Each question
  - User's selected answer
  - Correct answer
  - Correct or incorrect status
- Restart assessment option.
- Responsive design for mobile, tablet, laptop, desktop, and large screens.

## Project Setup

Create a new React project with Vite:

```bash
npm create vite@latest assessment-app -- --template react
cd assessment-app
```

## Install Dependencies

Install the project dependencies:

```bash
npm install
```

Install Tailwind CSS:

```bash
npm install tailwindcss @tailwindcss/vite
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Technologies Used

- React
- Vite
- JavaScript
- Tailwind CSS
- React `useReducer`
- React `useEffect`
- Browser `localStorage`
- JSON

## Important Implementation Details

### State Management

The application uses one `useReducer` to manage the complete assessment state:

```js
{
  questions,
  currentQuestion,
  userAnswers,
  timeLeft,
  status,
  submittedAt
}
```

Reducer actions include:

```text
START_ASSESSMENT
SELECT_ANSWER
GO_TO_QUESTION
NEXT_QUESTION
PREVIOUS_QUESTION
TICK
SUBMIT_ASSESSMENT
RESTART_ASSESSMENT
```

### Questions

The questions are stored in:

```text
src/data/questions.json
```

Each question contains:

```js
{
  id,
  question,
  options,
  correctAnswer
}
```

### Timer

The timer is configured for 10 minutes:

```js
const TIME_LIMIT = 10 * 60;
```

The assessment automatically submits when the timer reaches zero.

### Local Storage

The current state is saved using:

```js
localStorage.setItem("assessment-app-state", JSON.stringify(state));
```

When the page loads, the application restores the saved assessment state from localStorage.

### Responsive Design

Tailwind CSS responsive utilities are used to support:

- Mobile screens
- Tablet screens
- Laptop screens
- Desktop screens
- Large displays

The layout avoids horizontal overflow by using responsive grids, flexible containers, wrapping controls, and mobile-first styles.

## Production Build Verification

Run the following commands before submission:

```bash
npm install
npm run build
npm run dev
```

Verify that:

- The application starts successfully.
- Questions can be answered.
- Previous and Next buttons work.
- The timer counts down.
- Refreshing the page restores the assessment.
- The assessment submits when the timer reaches zero.
- Results and answer review are displayed.
- Restart Assessment starts a new attempt.

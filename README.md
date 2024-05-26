# Patient Fitness Tracker

## [![My Skills](https://skillicons.dev/icons?i=nextjs,tailwindcss,githubactions,mongodb,vercel,ts,docker&theme=dark)](https://skillicons.dev)

[![Build](https://img.shields.io/github/actions/workflow/status/ad956/patient-fitness-tracker/playwright.yml?branch=main)](https://img.shields.io)

The Patient Fitness Tracker is a modern healthcare platform designed to streamline patient management and monitoring across multiple hospitals. It empowers patients to take control of their health journey while enabling healthcare providers to deliver personalized care efficiently.

## Features

- **User Authentication:** Secure registration and login for patients and hospital staff.
- **Dashboard:** Personalized dashboards for patients, hospitals, and admins for efficient data management.
- **Patient Management:** Profile management, medical history, and seamless access to patient records across hospitals.
- **Appointment Scheduling:** Easy scheduling and management of appointments for patients and hospital staff.
- **Notifications and Alerts:** Real-time notifications for appointments, medication schedules, and health events.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ad956/patient-fitness-tracker.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd patient-fitness-tracker
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**
   Create a file named `.env.local` in the root directory of your project and add the following environment variables with their corresponding values:

   | Variable             | Description                                           |
   | -------------------- | ----------------------------------------------------- |
   | NEXT_PUBLIC_BASE_URL | Base URL of the application.                          |
   | MONGODB_URI          | MongoDB connection URI.                               |
   | SMTP_HOST            | Hostname of the SMTP server for sending emails.       |
   | SMTP_PORT            | Port number of the SMTP server.                       |
   | SMTP_USER            | Username for SMTP authentication.                     |
   | SMTP_PASSWORD        | Password for SMTP authentication.                     |
   | SMTP_FROM_EMAIL      | Email address for sending emails.                     |
   | JWT_SECRET           | Secret key for JWT token generation and verification. |
   | BCRYPT_SALT_ROUNDS   | Number of salt rounds for bcrypt password hashing     |
   | KEY_ID               | Your Razorpay Key ID                                  |
   | KEY_SECRET           | Your Razorpay Key Secret                              |

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   This command will start the Next.js development server.

### Additional Scripts

- **Testing with Playwright:**

  - Run tests using Playwright:
    ```bash
    npm test
    ```

- **Linting:**

  - To lint your code using Next.js linting rules:
    ```bash
    npm run lint
    ```

- **Previewing Emails:**
  - Use the following command to preview emails:
    ```bash
    npm run preview-email
    ```

📝 **License**
This project is licensed under the [MIT License](LICENSE).

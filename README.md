# FoodShare App

## Group Name
CR7

## Name of Students
- Swagat Tharu (A00031512) - Leader
- Sanjiv Kumar Sah (A00031801)
- Aayusha Limbu (A00035325)
- Tapendra Budha (A00031464)

## Project Description
This project is a web application developed for the Software Engineering module.
The aim of the application is to minimise food waste by allowing users to share excess food
with others in their local community instead of throwing it away.
Users can list surplus food items they no longer need, and other users can request or collect
them. The application focuses on co-operation and community support, rather than
financial gain, helping to reduce waste and encourage responsible consumption.

## How the Application Supports Sharing, Exchange, and Community
The application supports sharing and exchange by providing a platform where users can
offer surplus food to others who need it.
By connecting people within a community, the system helps build trust, encourages
sustainable behaviour, and reduces food waste.
This approach promotes community engagement, environmental responsibility, and mutual
benefit, directly supporting the module theme of sharing, exchange, and building
community.

## Code of Conduct
- All team members will communicate respectfully and professionally at all times.
- Team members will attend scheduled meetings and inform the group in advance if they are unable to attend.
- Tasks will be completed by the agreed deadlines, and any difficulties will be communicated early.
- All team members will contribute fairly to the project and participate in GitHub activities.
- No team member will submit work that they do not understand or that has been copied without permission.
- Feedback and disagreements will be handled constructively and respectfully.
- All members will follow university policies regarding academic integrity and ethical behaviour.

## Personas
### Persona 1: Sarah
- **Age:** 22
- **Occupation:** University student
- **Background:** Sarah lives in shared student accommodation and often buys more food than she can use before it expires.
- **Problem:** She feels bad throwing away food that is still good but has no easy way to share it with others.
- **Needs:** Sarah needs a simple and safe way to list surplus food items and connect with people nearby who can use them.

### Persona 2: Ahmed
- **Age:** 35
- **Occupation:** Part-time worker
- **Background:** Ahmed lives in the local community and sometimes struggles with food costs.
- **Problem:** He wants access to surplus food in his area but does not know where to find it.
- **Needs:** Ahmed needs a platform where he can easily find available food nearby and contact the person sharing it.

## Ethical Issues

### Privacy
The application will collect basic user information such as names and contact details.
User data must be protected and only used for the purpose of sharing food.
Personal information should not be shared publicly without the user’s consent, and access to
data should be restricted to authorised users.

### Safety
Food safety is an important ethical concern for the application.
Users should be encouraged to share food responsibly and provide accurate information about
the food being offered.
The platform should include guidance or disclaimers reminding users to check food quality
and expiry dates before consumption.

### Fair Use
The application should be used fairly and respectfully by all users.
No user should exploit the platform for personal gain or misuse it to repeatedly take resources
without contributing.
Clear rules should be in place to prevent abuse and ensure the system supports cooperation
and community benefit.

## Meetings

### Meeting 1
- **Date:** 8 Feb 2026
- **Attendees:** All group members
- **Discussion:**
  - Chose project idea: minimising food waste
  - Discussed assignment requirements and Sprint 1 deliverables
  - Created GitHub repository and project board
- **Decisions:**
  - Agreed on project focus
  - Assigned initial tasks to team members

### Meeting 2
- **Date:** 9 Feb 2026
- **Attendees:** All group members
- **Discussion:**
  - Reviewed progress on Sprint 1 tasks
  - Discussed personas and ethical issues
  - Confirmed project description
- **Decisions:**
  - Finalised Sprint 1 documentation
  - Prepared for submission to Moodle

---

## Tech Stack
- Frontend: HTML, CSS, JavaScript, Pug
- Backend: Node.js, Express.js
- Database: MySQL
- DevOps: Docker, Docker Compose
- CI/CD: GitHub Actions

## How to Run locally
1. Provide `.env` variables (already provided in the root directly locally).
2. Run database build via Docker:
   \`\`\`bash
   docker-compose up --build
   \`\`\`
3. Visit: http://localhost:3000

## Project Structure
\`\`\`
software-engineering-group-project/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── views/
│   │   ├── partials/
│   │   └── pages/
│   ├── db.js
│   ├── db_init.sql
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── css/
│   └── js/
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
└── README.md
\`\`\`
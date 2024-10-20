# Vijayanagara Finance API

## Getting Started

### Navigate to the project directory:
\`\`\`bash
cd vijayanagara_finance_api
\`\`\`

### Install dependencies:
\`\`\`bash
npm install
\`\`\`

### Configuration
Create a \`.env\` file in the root directory with the following variables:
\`\`\`makefile
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
\`\`\`

## Project Structure
\`\`\`
vijayanagara_finance_api/
│
├── controllers/       # Handles request logic
├── models/            # Defines Mongoose models
├── routes/            # Defines API routes
├── middleware/        # Middleware functions
├── config/            # Configuration settings
├── utils/             # Utility functions
├── .env               # Environment variables
├── server.js          # Entry point of the application
└── package.json       # Project metadata and dependencies
\`\`\`

## API Endpoints
### Overview of Primary API Endpoints:
| Method | Endpoint                       | Description                                   |
|--------|--------------------------------|-----------------------------------------------|
| POST   | \`/api/users/register\`          | Register a new user                          |
| POST   | \`/api/users/login\`             | Authenticate a user                          |
| POST   | \`/api/loans/apply\`            | Submit a loan application                     |
| GET    | \`/api/areas\`                   | Retrieve all service areas                   |
| POST   | \`/api/grievances\`              | Submit a grievance                            |
| GET    | \`/api/grievances/:id\`          | Retrieve a specific grievance                 |

## Data Models
### User Model
Defines user details and authentication.
\`\`\`javascript
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
\`\`\`

### Loan Application Model
Tracks loan application submissions.
\`\`\`javascript
const LoanApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  status: { type: String, default: 'submitted' },
});
\`\`\`

## Error Handling
The API employs a centralized error handling mechanism, returning errors in the following format:
\`\`\`json
{
  "success": false,
  "message": "Error message here"
}
\`\`\`

## Testing
To run tests, ensure you have Mocha and Chai installed. Use the following command:
\`\`\`bash
npm test
\`\`\`

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   \`\`\`bash
   git checkout -b feature/YourFeature
   \`\`\`
3. Make your changes and commit:
   \`\`\`bash
   git commit -m 'Add some feature'
   \`\`\`
4. Push to the branch:
   \`\`\`bash
   git push origin feature/YourFeature
   \`\`\`
5. Create a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries or support, please reach out to us at:
- **Email:** grievance@vijayanagarafinance.com
- **Phone:** +91 84482-98527
EOF

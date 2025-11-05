
# Elev Her - E-commerce website

Elevate Her is an e-commerce concept focused on offering a user-friendly online store with curated sneakers designed specifically for women. It is a full-stack web application built with the MERN stack.

  

![ElevHer_functional_demo](frontend/public/readme/ElevHer_functional_demo_GretaM.gif)


<br><br>


## Features


> - Authentication system (Credentials and Google OAuth)
> - Cart functionality with quantity updates and removal
> - Responsive layout with dynamic navigation (desktop/mobile)
> - Modal system for login/signup and product dialogs
> - Custom design system (built with Tailwind, Shadcn)
> - State management for cart, auth, and UI overlays
> - Image-optimized product displays with aspect ratio handling
> - Client Dashboard
> - Remote images storage (Superbase)


## Tooling

| Layer        | Tools Used                                           |
|-------------|------------------------------------------------------|
| Frontend     | Next.js (App Router), Tailwind CSS                  |
| UI Library   | Shadcn/UI, Lucide Icons                              |
| Forms        | React Hook Form, Zod                                 |
| State Mgmt   | Zustand (local store for UI/Cart/Auth)              |
| Auth         | NextAuth.js + Custom Backend Integration           |
| Backend API  | Express (ESM) with modular route/controller structure |
| Database     | MongoDB                                              |
| Storage			|  Supabase (buckets for product and avatar images) |



## Implementation

#### Use case
It describes the steps and actors involved in each situation. The use case diagram was used as a basis for further design and app implementation.

![ElevHer use case](frontend/public/readme/UseCase-ElevHer.png)

#### Database Design (MongoDB)
A first design draft helped me conceptually shape the database schema & relationships.

![Db Design](frontend/public/readme/Db_Design-ElevHer.png)
  

#### Authentication
The authentication process is mostly handled in the backend for security reasons.
A token is generated on login and validated with each new request.
NextAuth.js manages the session callbacks and supports both credential-based login and third-party OAuth providers (like Google).


#### Routing
Routing in the app is managed by Next.js using the App Router and file-based structure.
I created both public and protected routes, for example, the dashboard is only accessible to logged-in users.
Unauthenticated users are redirected to the homepage when trying to access restricted areas.


#### Key Challenge: Authentication Flow
One of the trickiest parts of this project was managing the authentication flow.
Initially, I couldn’t access user data because it was coming back `undefined` at certain points.
After debugging, I discovered the issue was related to how **NextAuth handles callbacks and token structure**.
I resolved it by accessing the token properly, restructuring the session callback, and making sure the API was returning a well-defined JSON object instead of raw data.

#### Storage
Originally, product and avatar images were stored locally.  
To improve scalability and remote asset management, image storage was migrated to **Supabase**, which now handles remote uploads and public asset delivery.

 <br><br>
## Installation / Setup

### Clone the repository

> ```bash
>git clone https://github.com/DarkPix3l/Elev-Her.git
>```

- #### Go into the project directory

> ```bash
> cd Elev-Her
> ```


### Environment Variables
Create `.env` files for both backend and frontend using the examples provided:

 #### Backend
Required variables:
```bash
# Backend Server
PORT=your_port
API_URL=/api/v1

# Database
MONGO_URL=your_mongodb_connection_string

# JWT Authentication
JWT_KEY=your_secret_key

# OAuth
GOOGLE_CLIENT_ID_BACKEND=your_google_client_id

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_AVATAR_URL=your_supabase_avatar_public_url
SUPABASE_BUCKET_PRODUCT=your_supabase_avatar_bucket_url

# Frontend URL for CORS
FRONTEND= your_frontend_URL_and_port
```


 #### Frontend
 Required variables:

```bash
# Authentication
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_TRUST_HOST=true

# API
API_BASE_URL=your_backend_api_url

# NextAuth configuration
NEXT_PUBLIC_NEXTAUTH=your_nextauth_public_key
NEXTAUTH_URL=your_frontend_URL_and_port

# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_AVATAR_URL=your_supabase_avatar_public_url
```


### Local Development

- #### Install dependencies for frontend and backend

>```bash
> cd frontend && npm install
> cd ../backend && npm install
> ```

### Build and Run with Docker

1 - Navigate to the Project Root Folder
> ````bash
>  cd Elev-Her
> ````
2 - Build Docker Images
> ````bash
>  docker-compose build
> ````

3 - Start the containers
> ````bash
> docker-compose up
> ````

4 - Access the applications:
> -   **Frontend**: Open a browser and go to `http://localhost:[PORT]`
> -   **Backend**: Open a browser or API client and connect to `http://localhost:[PORT]`



<br><br>
## Screenshots

  

#### Homepage

![Homepage](frontend/public/readme/homepage.png)
  

#### Signup Modal

![Signup Modal](frontend/public/readme/signupModal.png)
  

#### Dashboard

![Dashboard](frontend/public/readme/userDashboard-products.png)
  


## Author

Made with ❤️ by [GM](gretamacri.com)

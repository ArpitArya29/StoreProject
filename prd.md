# Backend
- Build with nodejs, postgres database and prisma-client for handling the database
- Admin routes and controllers
- User routes and controllers
- Owner routes and controllers
- General routes and controllers


# Frontend
- Build with Reactjs, tailwind and daisy-ui for stylings
- Register, login page
- Dashboard for admin, Owner
- Homepage for users and different functionalities 

# Functionalities
- System Administrator
    - ✅ Can add new users, normal users, admin users
    - ✅ Has access to the ADMIN DASHBOARD displaying
        - Total number of users
        - Total number of stores
        - Total number of submitted ratings
    - ✅ Can add new users with the following details
        - Name
        - Email
        - Passowrd
        - Address
        - Role
    - ✅ Can view list of stores with their details
    - ✅ can view list of users with their roles
    - ✅ Can apply filters on all listings
        - Implemented on frontend
    - ✅ Can logout from the system

- Normal User
    - ✅ Can sign-up and log-in into the platform
    - ✅ Can view list of all registered stores with its details
    - ✅ Can submit ratings (between 1 - 5) for individual stores
    - ✅ Can logout from the platform

- Store Owner
    - ✅ Can log-in to the platform
    - ✅ Have the access of OWNER DASHBOARD with functionalities
        - ✅ View their stores
        - ✅ View the list of users rated their store
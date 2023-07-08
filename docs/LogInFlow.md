## `Log in user Flow`

```mermaid
sequenceDiagram
    participant User
    participant App
    participant Server
    participant Database

    User->>App: Enter credentials
    App->>Server: Send credentials
    Server->>Database: Query user data
    Database-->>Server: User data

    alt Valid credentials
        Server-->>App: Send success response
        App->>User: Successful login
        App->>App: Store user data
    else Invalid credentials
        Server-->>App: Send error response
        App->>User: Display error message
    end

```

## `Register user Flow`

```mermaid
sequenceDiagram
    participant User
    participant App
    participant Server
    participant Database

    User->>App: Enter registration details
    App->>Server: Send registration data
    Server->>Database: Create new user
    Database-->>Server: User created successfully

    alt User created
        Server-->>App: Send success response
        App->>User: Registration successful
    else User already exists
        Server-->>App: Send error response
        App->>User: Display error message
    end
```

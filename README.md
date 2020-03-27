# BLD Forum (Beta)

## Data Models

### users (from Google Auth)

- displayName
- photoURL
- uid
- district
- seClass

### posts

- uid
- title
- userId
- createdDate
- text

#### comments

- uid
- userId
- createdDate
- text

## TODO

- [x] interfaces
- [x] resolve userId to displayName
- [x] figure out comments architecture
- [x] optimize userId to displayName
- [x] ui components
  - [x] post/comment cards
  - [x] list view
  - [x] post/comment forms
  - [x] nav header
  - [x] home page
  - [x] profile page
    - [x] update user info
  - [x] user images
- [ ] responsive layouts
- [ ] reusable buttons, etc.
- [ ] categories
- [ ] paged queries
- [ ] hover user overlay

# BLD Forum (Beta)

## Data Models

### users

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
  - [x] user images
  - [x] display district info
- [x] home page
- [x] profile page
  - [x] update user info
- [x] about page
- [x] responsive layouts
  - [ ] fix nav header
- [x] order posts by comment date
- [x] character limits
- [x] paged queries
  - [x] comment queries
  - [x] post queries
  - [x] UI components
- [x] hosting
- 0.1.0
- [ ] split comment list into components
- [ ] categories
- [ ] status/error messages
- [ ] firebase permissions
- [ ] staging/prod environments
- [ ] CI/CD
- [ ] hover user overlay
- [ ] reusable buttons, etc.

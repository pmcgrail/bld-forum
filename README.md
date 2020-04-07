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
- [x] categories
- [x] post with links and pictures
- [ ] status/error messages
- 0.2.0
- [ ] firebase permissions
- [ ] staging/prod environments
- [ ] unit tests
- [ ] CI/CD
- 0.3.0
- [ ] member approvals
- [ ] edit/delete/report posts and comments
- 1.0.0
- [ ] hover user overlay
- [ ] split comment list into components
- [ ] reusable buttons, etc.
- [ ] admin functions
- [ ] image uploads

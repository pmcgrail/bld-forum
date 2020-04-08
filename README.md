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
  - [x] get posts
  - [x] new post
  - [x] get comments
  - [x] new comment
  - [x] get categories
  - [ ] get profile
  - [x] update profile
- 0.2.0
- [ ] auto posts for daily readings and praye requests (weekly)
- [x] firebase permissions
- [x] limit categories
- 0.3.0
- [ ] staging/prod environments
- [ ] unit tests
- [ ] CI/CD
- 0.4.0
- [ ] member approvals
- [ ] edit/delete/report posts and comments
- 1.0.0
- [ ] hover user overlay
- [ ] split comment list into components
- [ ] reusable buttons, etc.
- [ ] admin functions
- [ ] image uploads

# 8 Gallery
Art sharing site

## Usage
- server `http://localhost:3000`
Clone the project then:
1. For building and starting server 
```
cd 8-Gallery
npm run deploy
```
2. For starting dev client & serve
```
cd 8-Gallery
npm run dev
```
3. For building 
```
cd 8-Gallery
npm run build
```

## dot.env
.env values are required to run the server
```
DB_DATABASE = ""
DB_USER = ""
DB_PASSWORD = ""
DB_HOST = ""
```

## Feature [implemented & upcoming]
- File Upload
- mariadb bigIntAsNumber
- Node fs
- Dump err to "ErrorLogs (Date).log"
- use my `PHP` serve to store images
- Email Artist 
- Search on images and artists 

- deleting user also deletes user's image directory
- deleting user on a different session will force logout on initial load of other active sessions


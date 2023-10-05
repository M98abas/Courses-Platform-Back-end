# Hello there

## Course platform

this project is for manage the platform from uploading video and to controll all staff

## What I use to build the app:

- Prisma and express : Back-end
- Nextjs and TailwindCss : front-end
- Postgresql for DB

## Tools:

- Nodejs
- express
- prisma
- Token
- Nginx
- pm2
- and more (check package.json for more)

## Structure

- prisma: main and important folder that hold the schema and index.ts
- controller
  - I use versioning to don't loose data so you'll find v1 inside controller and below folders that inside v1 folder.
  - Web
    - This contain only the staff that belong to enrollment and the contract staff
  - Actions
    - This contain the CRUD operation for all staff, like:
      - Courses
      - Constractors
      - Admin
      - Subcourse
      - content
      - Copons
      - Discount
      - Notification
      - Feedback
      - and more
- Middleware
- Routes
- Utils
  - Any function that always we'll use it, like:
    - emailSending folder: contain sender folder to send template of emails
    - Send Emails
    - Send SMS
    - Validations
    - Utils.service: containe functions that I use to return response like okRes,errRes
    - messages: template of messaage in my app
- Reports
- Notification: send notification to users every 24 hours.

## To run The app ⚒️

ensure you install **pn2** and run it to install **pm2** run the following:

    npm install pm2 -g

after install it run the follwoing to run the project in pm2

    PORT=4000 pm2 start npm --name "Back-end" --interpreter /usr/bin/node -- start

Check this and contact me if you have any query regading this app 

[linkedIn]("https://www.linkedin.com/in/mahmoud-abbas-9039ba180/")
[Email]("mahmoud.abbasM1221@outlook.com")
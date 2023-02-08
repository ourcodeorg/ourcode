# OurCode

A platform for devs and students to collaborate on projects or research.

## Functionality

- Share a post with idea and possible stack, including experience level and tags. A brief intro for ideas is also required.
- Profile with experience level and tags to improve recommendation system and search results.
- People can apply to posts, and the sender can review the profile of the people who applied.
- Sender can take as many people as they want. Once their application is accepted by the sender, they can now see the discord/slack link to talk to the sender about the project.

## Tech Stack

- FE: React/Next, mantine, tailwind
- Backend: Nest (Render), Prisma, PSQL

## Build Steps

### Linux
- Make sure to have the following installed:
    - node 16+
    - make
    - docker
    - docker compose
- Run `make` to setup environment and migrate db.
- Run `make dev` to start development environment [both frontend and backend].
- Run `make backend` to run server [dev mode] and db, `make frontend` to run frontend [dev mode].
- Run `make prod` to start production environment.
- Run `make logs` for logs. (`make logs c=backend` for logs of backend).
- Run `make reload` to restart containers. (`make reload c=backend` or `make reload c=ourcode-db`).
- Run `make down` to stop and remove the containers.

### Windows
- Install the [Cygwin](https://www.cygwin.com/) terminal.
- Make sure to install make at time of installation of cygwin.
- In the cygwin terminal, `cd` to the working directory.
- Follow the commands at the linux section.

## Coding Guidelines

- All code should be reviewed by peer
- Understandable commit messages
- Will be using the [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) branching system to manage codebase
    - Main branch is the production branch
    - To add features or bug fixes, create a new branch for it

## Team Members

You can join this project by messaging **0xSH1V4M#8886** or **Holy Spirit#5707.** Cybersecurity people are also welcome as this is a good opportunity to work with developers and find bugs in a real world app. 

### Current members:

- [ujjwal-kr](https://github.com/ujjwal-kr)
- [Shivam](https://github.com/shivam1317)
- [Yogesh](https://bit.ly/github_KYogesh20)
- [Gurpal](https://github.com/phantomknight287)
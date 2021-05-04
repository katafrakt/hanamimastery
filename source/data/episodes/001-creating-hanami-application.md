---
id: 1
author: 'swilgosz'
tags: ['fullstack']
title: '#1 Creating a new Hanami app from the template'
excerpt: 'How to create a brand new Hanami app lighting fast by using the Hanami application template.'
thumbnail:
  full: /images/episodes/001/cover-full.jpeg
  big: /images/episodes/001/cover-big.jpeg
  small: /images/episodes/001/cover-small.jpeg
---

We're entering a new era in Ruby world, there are no doubts on that! It's all because really soon a **completely rewritten** Hanami framework will have it's next major release.

In this episode I'll show you how to create a brand new Hanami application using the prepared [Hanami Application Template](https://github.com/hanami/hanami-2-application-template).

## The quick setup

It's super easy to setup a new project and with the Hanami team busy with the CLI for the project things will soon be even easier. At the moment the process consists of 5 steps:


1. Clone the repository
2. Run installation script
3. Rename example .env file
4. Run bundler
5. Create PG database

I'll cover them all in the article below

### TLDR (full script here)

```shell
g clone git@github.com:hanami/hanami-2-application-template.git hanami_mastery
cd hanami_mastery
bin/install hanami_mastery
cp .env-example .env.development
bundle install
createdb hanami_mastery_development
puma config.ru
```

### Cloning the repository

First of all we need to create a brand new Hanami application by cloning the template repository into
a customized named folder of my application

```shell
g clone git@github.com:hanami/hanami-2-application-template.git hanami_mastery
cd hanami_mastery
```

### Running the installer

Next, run the installation script appending the command with your app name to rename all the default
instances to your customized application name.

```shell
bin/install hanami_mastery
```

This will rename all the occurences of the default AppPrototypeTest with the hanami_mastery in this case.

### Install dependencies

As in any ruby appliation, running it 

```shell
bundle install
```

### Rename the sample .env file

To run the hanami project, we need the environment file collecting all the initial setttings for
our application to run in different environments. The tempalte comes with `.env-example` file
we need to copy during the inital setup and name it: `.env.develpment`


```shell
cp .env-example .env.development
```

### Install dependencies

To install dependencies, we need to run _bundler_ as in any other ruby application

```shell
bundle install
```

### Creating Postgres database

The default setup comes with postgres database configuration. Assuming you have the postgres-server
already installed - I do it on my Mac using [Postgresapp](https://postgresapp.com/) - we can easily
create the database configuration needed using `createdb` command

```shell
createdb hanami_mastery_development
```

The expected name of the database you can preview in the `DATABASE_URL` environment variable - check it out in case of any inconsistencies.

### Run the server

Hanami application template with the default configuration can be run using just a normal `puma` api, with normal port specification itd.

```shell
puma config.ru -p 3001
```


## Summary

I love how Rails made super-easy to start with a new project and deliver MVPs to the clients. Amazing CLI, file generators, all that is perfect for beginners.

Unfortunately, when app grows, Rails default architecture become problematic.

Hanami solves that issue, and with all the amazing progress on simplifying the initial usage, I believe it has a bright future!

### Special Thanks

- [Piotr Solnica (Solnic)](https://github.com/solnic) - for his great work on [dry-rb](https://github.com/dry-rb) ecosystem which made Hanami project possible.
- [Tim Riley](https://timriley.info/) - For his amazing engagement in rewriting the framework almost from scratch!
- [Luca Guidi](https://lucaguidi.com/) - For tremendous work on whole Hanami development.
- And All the people engeaged into the Hanami project, thanks to whom I have a topic to write about.
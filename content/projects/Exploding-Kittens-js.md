---
title: "Exploding Kittens (JS)"
date: 2024-12-31T22:49:54Z
draft: false
languages: [ "JavaScript" ]
frameworks: [ "React" ]
skills: [ "Backend", "Frontend", "Networking", "APIs" ]
status: [ "WIP" ]
tags: []
description: "My 4th (final!) attempt at making Exploding Kittens online!"
image: /img/projects/explodingkittensjs.png
link: "https://github.com/Anshroid/ExplodingKittens.js"
---

## What is Exploding Kittens? (See [the earlier version](/projects/exploding-kittens))

[Exploding Kittens](https://en.wikipedia.org/wiki/Exploding_Kittens) is an incredibly popular card game that I have
enjoyed for a long time, and I've always wanted to make my own online version of it to play with friends.

## How to play

You can read the Exploding Kittens rules [here](https://explodingkittens.com/pages/rules). My version is a Discord
Activity, but it is unlikely that I will be able to verify it for it to be public, so to play it you'll need to
host your own version of it (unless I know you c:)

If you'd like to host your own version, you'll need to set up a Discord app on the 
[developer portal](https://discord.com/developers/), enable activities, host the two servers and set up ngrok tunnels
or URLs for them and use the URL mappings section of the developer portal to point `/api` to the backend and `/` to 
the frontend. Then, you just need to copy the app's client ID and client secret and set them up as environment 
variables in your servers.

## Technical Details

The app is built using [Colyseus](https://github.com/colyseus/colyseus), a multiplayer framework for Node.js. Due to it
being a Discord activity, the frontend is an SPA loaded into an iframe in the Discord client, so I decided to use Vite
and React along with Colyseus to make the frontend, and then an Express server runs Colyseus on the backend along with
handling backend Discord API calls. Both frontend and backend servers are hosted on Azure.

## Blog

Well, given that I wrote about "over two years ago" in the 3rd edition (EK.NET), I suppose for this version it's going
to have to be three years.

When I saw that Discord was making the Embedded App SDK open to developers to make their own Activities, I knew at once
what I wanted to make. This project has been on my to-do list for so long, and I was finally given the opportunity to do
it in a convenient way.

The first thing I decided when I started this project was that I wanted to use a multiplayer framework, rather than
using bare websockets on their own. The library is a somewhat large abstraction, but I understood well enough what was
entailed in the other approach from my earlier iterations, so I decided I just wanted to get the app working this time.
Colyseus handles syncing _schemas_, which represent arbitrary objects that store the state of the game. I was able to
relatively quickly draw up the game logic and all data that needed to be synced among clients, including masking certain
objects so that clients can only see the data relevant to them.

With the game logic done, I had to turn my attention to the frontend. This was a Vite+React app that I quickly set up
with TailwindCSS and built a container wrapped with context managers for the Discord SDK and Colyseus. The components
displaying the information were relatively easy to build, and it was just a matter of laying them out roughly before I
had to turn my attention to making them look nice.

Thankfully, I have had a lot of experience with HTML and CSS so flexboxes provided an easy way to lay out the
components. I wanted to play around with some CSS transformations and animations in 3D space to make some nice-looking
animations for the game, and I was pretty happy with the result!

Then came the playtesting phase. The number of bugs in the app was honestly comedic: Every time I'd start up the game
to test something out, I wouldn't even be able to get to that point in the game before I ran into some bug or other.
I used the GitHub issue tracker to great effect here, and I'm pretty proud of my organisation. I sorted the issues into
milestones and slowly worked up to v1.0.0, when the game would be ready to play.

Possibly the hardest part of the project for me was the art. I am not the greatest of artists, and my initial attempts
at drawing cards were a little sad. Additionally, I wanted to ask my friends for some help, but people were quite busy,
so I decided just to do it myself. One day, when thinking about a separate project, I had the brainwave that one of my
favourite artstyles is a very fluid, pixelated look (I love
[Celeste](https://store.steampowered.com/app/504230/Celeste/), [Minecraft](https://minecraft.net/)
and [Rain World](https://store.steampowered.com/app/312520/Rain_World/)). I realised that it would
also be easier for me to work with these art styles, since I wouldn't have to deal with such small details and filling
up the space would be easier. I was able to draw up all the cards and cover art within two days, which I was very proud
of.

That brings us up to the present! I do still work on this project intermittently and am very proud that the game is in
such a polished and playable state. You can keep track of the progress on 
[the issue tracker](https://github.com/Anshroid/ExplodingKittens.js/issues).

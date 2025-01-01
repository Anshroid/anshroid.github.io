---
title: "Exploding Kittens (.NET)"
date: 2023-02-19T18:26:13Z
draft: false
languages: [ "C#" ]
skills: [ "Backend", "Frontend", "Networking" ]
tags: []
description: "My 3rd (second last!) attempt at making Exploding Kittens online!"
image: /img/projects/explodingkittens.jpg
link: "https://github.com/Anshroid/ExplodingKittens.NET"
---

## What is Exploding Kittens?

[Exploding Kittens](https://en.wikipedia.org/wiki/Exploding_Kittens) is an incredibly popular card game started on
Kickstarter in 2015. It has since become a bestseller, as the most backed Kickstarter project of all time, and has now
even been turned into a mobile app by Netflix. I wanted to make my own online multiplayer version of the game to play
with my friends as well as to learn more about Unity and networking.

## How to play

You can read the original Exploding Kittens rules [here](https://explodingkittens.com/pages/rules). This version was 
never finished, but the [newer version](/projects/exploding-kittens-js) does work! This ended up being a lot more 
complicated than it seemed, but it also ended up being a great learning experience nonetheless.

## Technical Details

The app is composed of two main parts: the client and the server. The client is the front-end of the game, which is
coded in Unity with C#. The server is coded in C# as well, because I'd thought of a very interesting way to implement
the packet system
using [reflection](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/reflection)
over the many iterations of developing this project.

## Blog

I originally planned this project at least two years ago.

I'd been interested in networking for online multiplayer games for a while, having explored the Minecraft packet
protocol when developing plugins for the game. I'd also used Unity a couple of times before, but never made any progress
in any of my projects. I thought it might be a good idea to try to design my own protocol from scratch and implement a
game that I could play with my friends. We played the original Exploding Kittens game a lot, so I thought it would be
fun to play around with coding a version!

I was unaware of the Netflix mobile app at the time: I knew that there was an Exploding Kittens mobile app that was
paid, but I didn't know about the Netflix version which was free. I am still unaware of any desktop versions of this
app, but I'm sure they probably exist.

I wanted the game to be in Python, but that project was not very well planned and I ended up abandoning it. In 2022,
I decided to try again with a reboot, again in Python. This set out the basic ideas for the layout of a packet that I 
still use in the current version of the project. I was, however, dissatisfied with the state of how I had implemented 
everything, and ported the project to C# in 2023 when I was getting into C#.

Originally, while the project was in Python, I had planned to use [pygame](https://www.pygame.org/) for the client,
which I obviously couldn't use when I switched to C#. My original idea was to create a web app in JavaScript that
interfaced with the server using websockets when I was designing my website, but taking one look at the daunting task of
building anything substantial in JavaScript, I decided to use Unity instead, hopefully exporting the game to 
[WebGL](https://en.wikipedia.org/wiki/WebGL) and still hosting it on my website.

Besides the crazy struggles with languages that naturally come with not finishing a project for years, I also have many
experiences with networking that I learnt from. Inspired by several realisations after the networking struggle of
[NHSC](/projects/NHS-Coordinator), my plan was always to use bare websockets for the networking. I am still unsure if
this is a good idea, but I think it has certainly been a fun, if impractical, challenge to design efficient packet
structures. I have also learned a lot about how to design a protocol from scratch, and how to implement it in a way that
is easy to extend and maintain. When taking a break from this project to design the [Confident](/projects/confident)
project, I had a lot of fun creating a system to take a raw stream of bytes, split it into packets and parse the first
byte of each as an ID, and then use reflection to create an object of the correct type and parse the rest of the packet
into the appropriate fields. I ended up carrying that system over to this project, and it has worked very well so far.

Having mostly completed the packet protocol and made significant progress on the server, I had to turn my attention to
the front-end. Obviously, having never properly used Unity, I ran into a brick wall. This led to the end of this 
iteration of the project, though I learnt a lot from what I did and am very proud of how far it got. The follow-up to
this project was the fourth iteration, which you can read about [here](/projects/exploding-kittens-js).
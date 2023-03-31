---
title: "Prizmchess"
date: 2023-02-19T18:12:13Z
draft: false
languages: ["C++"]
frameworks: []
skills: ["UI", "Collaboration"]
status: ["WIP"]
description: "A chessboard for the Casio fx-CG50 Prizm calculator."
image: /img/projects/casio-fx-cg50.jpg
link: "https://github.com/Anshroid/Prizmchess"
---

## What is Prizmchess?

Prizmchess is a chessboard for the Casio fx-CG50 Prizm calculator. It is written in C++ and uses
the [libfxcg](https://github.com/Jonimoose/libfxcg) library to control the
calculator's hardware. It is (planned to be) fully-featured, including a simple chess engine, PGN game
storage, a chess clock and more. It is currently in early development.

## How do I use it?

Prizmchess is currently in early development, and is not yet ready for use. However, you can download
the source code from [GitHub](https://github.com/Anshroid/Prizmchess) and
compile it yourself. Check the README for more information.

Alternatively, you can download the latest built version from
the [releases page](https://github.com/Anshroid/Prizmchess/releases).

## Why did I make it?

After my [KChess](/projects/kchess) project, my friend [Harik](https://github.com/Harik-Sodhi) was reminded
that he had been in a very
similar situation, as the [only chess
app](https://gitlab.com/balping/chess-prism) for the Prizm was created for the earlier fx-CG10 or fx-CG20
calculators. These calculators have
a black screen, so the chessboard was displayed in white, but the fx-CG50 Prizm has a white screen, so
the chessboard (still in white) was invisible.

At first, we thought that we could just change the colour of the chessboard, but we soon realised that
the existing chess app was completely written in Hungarian, and we didn't want to translate all the code
and comments for fear of messing something up that we didn't understand. So we eventually decided to
start from scratch.

Finally, I had never used C++ before and Harik was quite experienced with it, but I had made [my own chessboard](
/projects/kchess) before, so we decided to work on it
together.

## About the app

Prizmchess is written in C++ and uses the [libfxcg](https://github.com/Jonimoose/libfxcg)
library for the calculator's hardware. The C++ code is compiled to a `.bin` file that is then
packaged in a `.g3a` file by the [mkg3a](https://github.com/tari/mkg3a) tool.

The app is currently in very early development, so there are not many details on the app yet. You can
view the development progress on my [GitHub
project](https://github.com/users/Anshroid/projects/4) board.

## Developing the app

The first step to developing the app was to set up the development toolchain. This already created a
problem for Harik, as he was using Windows, and the provided `make.bat` file on the SDK did
not seem to work. I was [using Linux](/about), and so I was able to use the
`make` command to compile the app. After testing the hello world app on Harik's calculator
(as I don't have one), we moved on to actually developing the app.

The next challenge was to solve many of the issues that I managed to skirt around in my [KChess](/projects/kchess)
project. The first of these was the staggering (from my perspective) amount of memory that the Prizm has. The Prizm has
64KB of available RAM, which is far less than the 512MB available on the Kindle and the comparatively massive gigabytes
available on my computer. This meant that I had to be very careful about how I used memory, which was a unique challenge
I had never run into before. We had to plan out all the data structures that we would need, and make sure that
we didn't use more than we needed to (as a contrast to the individual `JPanel` chess squares in KChess).

This is the stage that we are currently at. We have reached a basic plan of how all the features will
vaguely work, and we are beginning to implement them. Stay tuned for more updates, and check
out [the repo](https://github.com/Anshroid/Prizmchess) for more info!
            
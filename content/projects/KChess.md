---
title: "KChess"
date: 2023-02-19T17:07:43Z
draft: false    
languages: ["Java"]
frameworks: ["JSwing"]
skills: ["UI"]
status: ["Done"]
description: "A chessboard for the (jailbroken) Kindle"
image: /img/projects/kchess.jpg
link: "https://github.com/Anshroid/KChess"
---

## What is KChess?

KChess is a chessboard for the Kindle. With all chess rules (including en passant and castling)
implemented, it is a fully functional chessboard. Although lacking certain features to be developed in
the future, it is a great way to play chess on the Kindle.

Note: KChess is only compatible with jailbroken Kindles, as it requires root access to the Kindle's
filesystem.

## How to install

To install KChess, you must first have a jailbroken Kindle (FW v5). If you do not, you can
follow [this guide](https://wiki.mobileread.com/wiki/Kindle_Hacking) to jailbreak your
Kindle. Once you have a jailbroken Kindle, you can install KChess by downloading the latest release from
[GitHub](https://github.com/Anshroid/KChess/releases) and copying the `
kchess.bin` file to the `/mrpackages` directory on the visible filesystem on your
Kindle. You can then run the MRPI installer from KUAL to install KChess.

## Why did I make it?

Looking through the list of apps available for the Kindle
on [Mobileread](https://wiki.mobileread.com/wiki/Kindlet_Index), the unified wiki
for Kindle hacking, none of the available apps were compatible with the firmware version of my Kindle
(>5.12.0). In addition, looking through the (surprisingly brief!) list of apps developed for the Kindle
version 5, I wasn't even able to find any hints on how to develop for the platform other than some brief
[notes on the
architecture](https://wiki.mobileread.com/wiki/Kindle_Touch_Hacking#Architecture), so I decided to take a peek for
myself.

One of the reasons why it was so tricky to find guides on making `Booklets`, as they are
known, is that almost all the knowledge on hacking the Kindle is based on older firmware versions that
compile against the older Amazon `Kindlet` SDK, which no longer even exists on the newer
Kindles. There were only three Booklets I could find and learn from, and all three were based on each
other, as I'll explain below, which was both annoying and funny!

This led me down a deep rabbit hole of Kindle hacking, involving accessing a private Amazon SDK stored
on the Kindle itself with no documentation and using [reflection](https://en.wikipedia.org/wiki/Reflective_programming)
to access
the relevant functions. I managed to
uncover [three](https://github.com/coplate/KUAL_Booklet) [GitHub](https://github.com/yparitcher/KUAL_Booklet) [repositories](https://github.com/ieb/Signalk_Booklet)
that, once I
reverse-engineered them, helped make my own. But enough of that. Let's get to the good stuff.

## About the app

A Kindle 5 `Booklet` is a JSwing applet that runs on the Kindle's modified Java
runtime ([cvm](https://docs.oracle.com/javame/config/cdc/cdc-opt-impl/ojmeec/1.0/runtime/html/cvm.htm)), with further
modified JSwing libraries to be compatible with the obviously
different [E-Ink](https://en.wikipedia.org/wiki/E_Ink) hardware. This also
created some interesting side effects to work around, which I'll get into later.

The `.jar` file that is compiled has a special entry point that uses the Kindle Booklet SDK
to find a parent JSwing window and attach our own UI as a child to it. The utility functions associated
with this entry file were almost directly copied from one of the previously mentioned repositories, which I
then found was copied from another of them, which was a fork of the third repository. I
even found one of the comments in that file in all three repositories, namely

```java
// NOTE: Pilfered from KPVBooklet
```

which is hilarious to me.

Finally, the `.jar` file is then signed with a private key that is stored on the Kindle
itself, and the `.jar` file is then copied to the Kindle's filesystem. This private key is
standardised in the Kindle hacking community, so I didn't have to worry about that as I installed the
keys as part of setting up the jailbreak in the first place. The signing is done with a great tool
called [KindleTool](https://github.com/NiLuJe/KindleTool), which also generates a
`.bin` file that is formatted as a Kindle update package that can be installed with the
`Update your Kindle` menu or using [MRPI](https://www.mobileread.com/forums/showthread.php?t=251143).

The way the app itself runs is by creating a blank file in the Kindle's `documents` folder in
the visible filesystem, and then associating a custom file extension with the `.jar` file.
When the user clicks on the file, the Kindle's internal linux shell runs the `.jar` file,
which then runs the applet. We use a custom save file format (PGN coming soon!) to save the game state,
and this is saved and loaded from the `documents` folder on every launch.

## Developing the app

The first issue I ran into was just getting started on the app. After taking one look at the (very
little) information I could find on the Kindle's architecture, I was completely lost. I had no idea
where to start, so I decided it would probably be best to just start on what I could already do, and so
I started by making the UI for the app. I'd never used JSwing before, but I had used tkinter and PyQT
before, so I figured it couldn't have been too different. I was right, and I was able to make a basic UI
in a few hours.

The next step was to develop the game logic. I had never written a chessboard before, and I had heard
that it was quite tricky to do due to the huge number of rules. I just decided to start somewhere and
work it out as I went along, which probably wasn't the wisest decision, and there are definitely
improvements that can be made. For example, each square of the board is its own `JPanel` as a
result of a bad decision I made early on, and all the piece IDs are a relic of an old system I thought
of that didn't work out. Fortunately enough, the Kindle has enough memory that it doesn't really matter
([foreshadowing](/projects/prizmchess)), so I didn't have to worry about that.

Finally, I had to figure out how to get the applet to run on the Kindle. I had some ideas on where to
start from the repositories I had found, but I had no idea what to actually do. I started by trying to
copy over all the Booklet-related files from [this repo](https://github.com/ieb/Signalk_booklet) and edit all the names
to point to my own files, but something or other broke in the process, and I wasn't able to figure out what exactly
broke. Instead, I decided to clone the repo, copy in my own code and swap it out. This worked, and I just had to slowly
change each instance of the Signalk name to my own and check if anything broke at each stage. By the end of it, I had a
working applet that I could run on the Kindle. I did go through the copied code and tried to understand what was going
on, but I wasn't really in a position to do much more than comment.
            
---
layout: post
title: "Raspberry Pi as Plex Media Server (with Cloudflare Zero Trust)"
date: 2023-06-09 10:00:00 -0300
categories: dev raspberry
---

## Some terminology

Before we start, let's explain some of the terminology that will be used in this text:

### Raspberry Pi

Is a series of small single-board ARM-based computers. This experiment used the [Raspberry Pi 4 Model B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) with 2GB of RAM.

### Plex Media Server

Is [free software](https://www.plex.tv) that allows users to create a client–server for movies, television shows, and music. Plex Media Server organizes movie and television content and adds posters, plot summaries, cast and crew lists, technical details, critical reviews, and subtitles. Plex Media Server is also capable of transcoding files if the codec is incompatible with the device playing the media.

A Plex Media Server can function as a home theater PC and can stream content to Plex's front-end media player client applications that run on a myriad of devices and web browsers.

### Cloudflare Zero Trust

Provides the power of Cloudflare’s global network to your internal teams and infrastructure. Cloudflare Zero Trust empowers users with secure, fast and seamless access to any device on the Internet.

### Cloudflare Tunnel

Establishes a secure outbound connection which runs in your infrastructure to connect the applications and machines to Cloudflare. Removes the need to configure IP addresses and ports to access your self-hosted applications.

## First things first

### Create your Plex account


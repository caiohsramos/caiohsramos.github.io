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

### 1. Create your Plex account

Go to https://www.plex.tv/sign-up/ and sign up.

### 2. Create your Cloudflare account and add your domain

You can create your Cloudflare account at https://dash.cloudflare.com/sign-up, and configure your domain with this guide: https://developers.cloudflare.com/fundamentals/get-started/setup/add-site/

### 3. Flash Raspberry Pi OS

Install Raspberry Pi Imager from https://www.raspberrypi.com/software/ and flash Raspberry Pi OS into your SD Card.

## Media server up and running

You can install Plex Server with an official Plex package repository.

> You may need to install HTTPS support for APT
> ```
> sudo apt-get install apt-transport-https
> ```

* [Enable repository updating for supported Linux server distributions (DEB-based distros).](https://support.plex.tv/articles/235974187-enable-repository-updating-for-supported-linux-server-distributions/)
* `sudo apt-get install plexmediaserver`
* Go to `http://localhost:32400/web` and finish you configuration

## All Cloudflare things

We want to be able to configure our media server from anywhere we need. This section will go through the configuration proccess to have an SSH shell accessible from anywhere, with proper auth and without oppening ports from our router.

Cloudflare Zero Trust will be used to manage access, and can be initialized by clicking in the sidebar button at your dashboard ![cloudflare](/assets/cloudflare.png)

### Create an application
After adding your payment method, you will be redirected to the Cloudflare One dashboard. The first step is to add an application:

* Go to `Access` -> `Applications` -> `Add an application`
* Select `Self-hosted`
* Name your application and set the domain to something like `myssh.yourdomain.com`
* Setup your access policy, more information at https://developers.cloudflare.com/cloudflare-one/policies/access/
* In `Settings`, select SSH as the `Browser rendering` option ![settings](/assets/additional-settings.png)

### Create a tunnel
The next step is to create a tunnel, so your application can be redirected to your Raspberry Pi network:

* Go to `Access` -> `Tunnels` -> `Create a tunnel`
* Name your tunnel and follow the instruction to install and run the connector
* Add a public host name that matches the one you added to your Application, like `myssh.yourdomain.com`
* Select SSH as the service type
* Protect your public hostname with `Access` (select the application you just created)
![Alt text](/assets/tunnel-access.png | width=100)


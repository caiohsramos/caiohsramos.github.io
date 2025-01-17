---
layout: post
title: "A family request"
date: 2025-01-17 12:00:00 -0300
image: logo.png
categories: dev ruby rails
---

## Why I build an inventory management system

My parents recently started producing dairy products in their small farm and wanted a way to better manage the inventory and sales. Initially the workflow was:

- Write down orders from friends and family;
- Produce the products;
- Deliver the orders and receive payments.

Their struggle was mainly with order management, as they had to keep track of the orders, the products needed to produce them, and payment and deliver status. They asked me to help them with a solution, and I thought it would be a good opportunity to put in practice some of the things I recently learned about Ruby on Rails.

## The stack

The project started with the following stack:

- Rails 8 with Ruby 3.3.5;
- SQLite3 for development, testing, and production;
- Turbo and Stimulus for the frontend;
- [css-zero](https://github.com/lazaronixon/css-zero) for styling;
- solid-queue/solid-cache/solid-cable for background jobs, caching, and websockets;
- authentication-zero to bootstrap some authentication features.

## Development process

The initial features of the application were a way to manage customers, products, and orders. The schema of the application was as follows:

![ERD diagram of the application](/assets/primavera-erd.png)

The application was intended to be used only by my parents, so I didn't create any tenant relationship between users and the other models.

When I got the initial version working, I needed a way to deploy and make the application available to them. Since I've been hearing a lot about Kamal, I decided to take a stab. Created a VPS at Hetzner, configured my DNS, added the configuration to the YML file, and ran the deploy command. After some struggles with Cloudflare SSL, the application was up and running.

They got very excited about what I had built, and started to request features. One of cool things I could experience was the feedback loop. They came to me with a problem, and I as the PM/Dev/CEO/CTO had to come up with a solution. The end user is very good at describing the problems they have, but usually not great at proposing solutions. So I had to come up with ideas that would solve their problems and be feasible with the technology I was using and time available that I had.

## Current state

They have been using the application for a couple of months now, and I was able to add some new features, such as:

- Multi-tenancy: introduced the concept of organizations/memberships, so in the future the application can support other sub-companies outside the dairy domain;
- Backups: integrated Litestream to the application to make sure no data would be lost in the event of a VPS/storage failure;
- Active storage: added the ability to upload images to products;

Some other small quality of life features were also added like basic payment integration with Pix payment links, a simple dashboard with some metrics, a public order and menu page, and a way to add product variants to each of the products.

The latest change to the application was the addition of support to the PWA standard, so it can be installed on their phones and used offline. This was done using the workbox library by Google, that made managing the service worker and caching strategies very easy. This combined with View Transitions (from Turbo) made the application feel very snappy and responsive.

## Demo

Here's a small demo of the application:

![Demo of the application](/assets/primavera-demo.gif)

## Conclusion

- Hetzner + Kamal was pretty easy to setup and deploy. One thing I missed was to have metrics to monitor the current state of the VPS and the application;
- css-zero is straightforwad to use and the examples are very good. Not having to think much about styling was a good thing for this project;
- Cloudflare worked great for me, specifically to manage DNS and caching. Rails' defaults work in harmony with Cloudflare's caching strategies and nothing needs to be configured to get CDN benefits;
- Litestream is an incredible tool. After I discovered it I went into the SQLite rabbit hole, leaning more about Ben Johnson, and all the cool use cases that are currently available for modern SQLite;

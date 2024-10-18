---
layout: post
title: "Rails World 2024, Kamal, #NoPaaS"
date: 2024-10-17 22:00:00 -0300
categories: dev ruby rails
---

## Rails World 2024

I had the amazing opportunity to be at Rails World 2024 in Toronto, CA. It was my first time in Canada and attending an international conference. I had opportunity to meet some very nice people, and chat about one of the things I most enjoy doing: programming.
Being there was a confirmation of the incredible community behind the Ruby on Rails ecosystem. People that not only love technology, but also the journey of building web applications with tools that bring joy to programmers.

All the talks are now available at Rails World's [Youtube channel](https://www.youtube.com/playlist?list=PLHFP2OPUpCeb182aDN5cKZTuyjn3Tdbqx).

### Kamal and #NoPaaS

One of the most mentioned topics in the conference was the "NoPaaS" concept; it means to deploy your application without the need of platforms like [Heroku](https://www.heroku.com/), [Render](https://render.com/), and [Railway](https://railway.app/) (not to mention solutions that require a separate DevOps team to manage and understand it all).
This concept connects well with the new tools that will be defaults for new Rails 8 apps:
- [Kamal](https://kamal-deploy.org/): deploy Dockerized apps anywhere with SSH access;
- "Solid Stack": database backed features that take advantage of fast hard drives and new database features:
  - [Solid Queue](https://github.com/rails/solid_queue);
  - [Solid Cache](https://github.com/rails/solid_cache);
  - [Solid Cable](https://github.com/rails/solid_cable);
- SQLite by default and production ready.

Kamal also allows you to run and manage you own "accessories" such as databases, cache storages, and other services that complement your application. 
I'm not sure if I would trust myself to run my own Postgres instance in production from scratch, specially when I consider that managed solutions like [Managed Databases fro DigitalOcean](https://www.digitalocean.com/pricing/managed-databases#postgresql) start as low as $15 with a lot of out-of-the-box features; but it's definitely a powerful tool

### More on production SQLite for web servers

We all know that, by default, SQLite is not suitable to web applications. SQLite defaults aim to be as backwards compatible with the 2000's version as possible and it really shines with web frameworks like Rails when [correctly configured](https://github.com/rails/rails/pull/49349) to handle the concurrent access. Rails 8 + SQLite + Kamal is a killer stack for new companies when we consider that:
1. All you need to get the first version fo your app to the world (w/ caching, async jobs, and real-time updates) is a $5 VPS and Kamal;
2. Simple infrastructure means more time for developers to focus on building new features;
3. Clear path to overcome bottlenecks (and migrate off SQLite if needed).

## Strive for conceptual and operational compression

The Rails community really cares about about simplicity, and sees complexity as the bridge to progress. Not because we want to build simple applications, but because we want to build complex application using the simplest (and most enjoyable) solution possible.
That's one of the reasons why people choose monoliths over microservices: not because [microservices are bad](https://www.youtube.com/watch?v=LcJKxPXYudE), but because monoliths are the simplest way to get things done. 

Engineering teams should optimize development for their current team size and commit to never rewrite their apps. With this mindset you can archive:
- Applications that live longer and healthier;
- Developers can focus on a single codebase to develop and share knowledge;
- Use resources as efficient as possible.

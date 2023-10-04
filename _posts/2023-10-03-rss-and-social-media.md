---
layout: post
title: "RSS and social media"
date: 2023-10-03 22:00:00 -0300
categories: dev rss
---

## Avoiding social media
If you feel uncomfortable with the amount of time you spend in social media apps like Instagram browsing through ads and algorithmic content, you're not alone. A lot of times I find myself unconsciously scrolling my timeline (or clicking across Stories) and loosing track of time. Here is an alternative to be up-to-date with the content you find relevant, without the distractions that these apps are famous for.

## RSS to the rescue
[RSS](https://en.wikipedia.org/wiki/RSS) allows users and applications to access updates to websites in a standardized, computer-readable format. This means that you can have updates from websites without actually accessing them. Here's an example of a RSS _feed_:
```
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
 <title>RSS Title</title>
 <description>This is an example of an RSS feed</description>
 <link>http://www.example.com/main.html</link>
 <copyright>2020 Example.com All rights reserved</copyright>
 <lastBuildDate>Mon, 6 Sep 2010 00:01:00 +0000</lastBuildDate>
 <pubDate>Sun, 6 Sep 2009 16:20:00 +0000</pubDate>
 <ttl>1800</ttl>

 <item>
  <title>Example entry</title>
  <description>Here is some text containing an interesting description.</description>
  <link>http://www.example.com/blog/post/1</link>
  <guid isPermaLink="false">7bd204c6-1655-4c27-aeee-53f933c5395f</guid>
  <pubDate>Sun, 6 Sep 2009 16:20:00 +0000</pubDate>
 </item>

</channel>
</rss>
```
To convert this file to human-readable format a news reader or aggregator is used. Aggregation technology consolidates many websites into one page that can show only the new or updated information from many sites.
## How to get started
### 1. Find an aggregator that suits you
There are plenty of free and paid options out there, search for `feed aggregator` and choose one. Almost all of them provide an option to import and export, so don't hesitate to experiment with different apps.
> My personal choice is to self-host yarr (https://github.com/nkanaev/yarr)

### 2. Search for the content feeds you like
This is probably the hardest part :( There's a lot of data that is only available inside platforms, and not accessible without actually using the proprietary Apps (Meta is excellent in this matter). Here are some tips to find content that matters to you:
- YouTube channels
`https://www.youtube.com/feeds/videos.xml?channel_id=`
* Reddit
	- Front page: [http://www.reddit.com/.rss](http://www.reddit.com/.rss)
	- A subreddit: [http://www.reddit.com/r/news/.rss](http://www.reddit.com/r/news/.rss)
	- Private feeds: https://www.reddit.com/prefs/feeds
- Weather
	- https://www.bbc.com/weather/about/17543675
- HackerNews
	- https://hnrss.github.io/
- GitHub releases
	- https://github.com/jellyfin/jellyfin/releases.atom
- News
	- Almost all news website have a feed, search for `rss <news provider>`
## Pro tips
- [RSSHub](https://github.com/DIYgod/RSSHub) is great to get feeds for stuff that is not easily available like Telegram channels, Spotify-only podcasts, etc.
  - I self-host myself and it saves me a lot with content from "the outside"
- Change the FOMO mentality; don't beat yourself you for not being able to keep every reading up-to-date, or to miss a couple of posts. If it's something really important, I'm sure the information will get to you in time :)

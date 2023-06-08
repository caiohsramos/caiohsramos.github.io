---
layout: post
title: "Publishing to IPFS using GitHub Actions"
date: 2021-08-30 19:04:35 -0300
categories: dev ipfs
---

## IPFS - Interplanetary File System
### Edit: Pinata has restricted HTTP uploads, so this guide is deprecated :(

> A peer-to-peer hypermedia protocol designed to preserve and grow humanity's knowledge by making the web upgradeable, resilient, and more open.

or

> IPFS is a distributed system for storing and accessing files, websites, applications, and data

[IPFS](https://ipfs.io/) allow users to host files in a peer-to-peer network with unique identification and content linking. It takes several good ideas from projects like BitTorrent, Git, Bitcoin, the web, and gathers them in a single tool. To learn more about IPFS visit the [docs](https://docs.ipfs.io/concepts/).

To understand this guide, we need to explain some concepts:

- A **Node** or peer is the IPFS program that you run on your local computer to store/cache files and then connect to the IPFS network;
- **Pinning** is the method of telling an IPFS node that particular data is important and so it will never be removed from that node's cache;
- A **Content Identifier (CID)** is a self-describing content-addressed label used to point to the data stored in IPFS;
- An **IPFS Gateway** acts as a bridge between traditional web browsers and IPFS. Through the gateway, users can browse files and websites stored in IPFS as if they were stored on a traditional web server;
- **DNSLink** uses DNS TXT records to map a DNS name, like ipfs.io, to an IPFS address. Because you can edit your DNS records, you can use them to always point to the latest version of an object in IPFS. Since DNSLink uses DNS records, you can assign names, paths, and sub-domains that are easy to type, read, and remember.

### Example

If you want to access a Wikipedia article, the URL usually looks like this

[https://en.wikipedia.org/wiki/InterPlanetary_File_System](https://en.wikipedia.org/wiki/InterPlanetary_File_System)

When using IPFS, we don't specify where the file is (location based), we ask for a specific file hash (content based) like

`/ipns/k51qzi5u.../wiki/InterPlanetary_File_System`

## Hosting websites on IPFS

The main idea here is to host a full HTML/CSS/JS website using: a service for pinning files on the IPFS network (so we don't need to run our own node), an IPFS Gateway (so users can access our website from their browsers) and a DNSLink entry (so a friendly URL will be possible). The chosen tools for this process are:

- [Pinata](https://www.pinata.cloud/)
- [Cloudflare distributed gateway](https://www.cloudflare.com/pt-br/distributed-web-gateway/)
- [Cloudflare DNS](https://www.cloudflare.com/pt-br/dns/)

First, you will need to upload your website files to Pinata, usually the `build/` directory. After that, you will be able to view your website online. Something like `https://gateway.pinata.cloud/ipfs/QmWAJbBDon9Q...`.

After that, login to Cloudflare and setup the following entries to your DNS:

Type | Name | Content
CNAME | @ | cloudflare-ipfs.com
TXT | \_dnslink | dnslink=/ipfs/QmWAJbBDon9Q...

Now you should be able to access your website using your own domain :)

## Integrate with GitHub Actions

Basically, two steps will be needed:

1. Upload and pin files to IPFS
2. Update your DNSLink record

For the first, we can use [upload-to-ipfs](https://github.com/marketplace/actions/upload-to-ipfs) action. It is pretty straight forward and integrates well with Pinata.

For the second one, if your DNS is on Cloudflare, we can use its API, specifically the [dns-records-for-a-zone-update-dns-record](https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record) method/endpoint.

Your YML file should look something like this

```yml
- name: Upload to IPFS
  uses: aquiladev/ipfs-action@cb917...
  id: upload-ipfs
  with:
    path: ./build
    service: pinata
    pinataKey: $secrets.PINATA_KEY
    pinataSecret: $secrets.PINATA_SECRET
    pinataPinName: Name

- name: Update DNSLink on Cloudflare
  env:
    CLOUDFLARE_ZONE_ID: $secrets.CLOUDFLARE_ZONE_ID
    CLOUDFLARE_DNS_ID: $secrets.CLOUDFLARE_DNS_ID
    CLOUDFLARE_API_KEY: $secrets.CLOUDFLARE_API_KEY
    CLOUDFLARE_EMAIL: $secrets.CLOUDFLARE_EMAIL
    IPFS_HASH: $steps.upload-ipfs.outputs.hash
  run: |
    curl --location --request PUT 'https://api.cloudflare.com/client/v4/zones/'"$CLOUDFLARE_ZONE_ID"'/dns_records/'"$CLOUDFLARE_DNS_ID"'' \
    --header 'Content-Type: application/json' \
    --header 'X-Auth-Key: '"$CLOUDFLARE_API_KEY"'' \
    --header 'X-Auth-Email: '"$CLOUDFLARE_EMAIL"'' \
    --data-raw '{
        "type": "TXT",
        "name": "_dnslink",
        "content": "dnslink=/ipfs/'"$IPFS_HASH"'",
        "ttl": 1
    }'
```

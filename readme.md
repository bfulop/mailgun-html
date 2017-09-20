<img src="https://travis-ci.org/bfulop/mailgun-html.svg?branch=master" alt="build:passed"/>

# Send emails with mailgun

A simple repo to simplify sending test emails with a Mailgun account.

### Setup

The library needs two config files to run:

#### Mailgun credentials

This JSON file is stored globally in your home directory so that all new projects have access to it. Save this to 

`~/.mailgun`

```json
{
  "privateApi": "your private API key",
  "publicApi": "your public API key",
  "domainName": "your domain"
}
```

#### Config file

This file stores the path to you html emails and sender/recipient data.

`./mailgunrc.json`

```json
{
  "to": ["to@example.com"],
  "from": "from@example.com",
  "paths": ["path to html file"]
}
```
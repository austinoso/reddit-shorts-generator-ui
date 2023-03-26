# Typescript Reddit video generator for YouTube Shorts/TikTok

Generates 60 second videos of the best comments from a Reddit post generating screenshots and audio tts for each comment.

## Requirments

- Google Cloud authenticated locally with [gcloud-cli](https://cloud.google.com/sdk/gcloud) and a project enabled with [Cloud Text-to-Speech API](https://cloud.google.com/text-to-speech) https://cloud.google.com/sdk/docs/authorizing
- docker

## Setup

- Create a .env file with `VIDEO_BACKGROUND` set to your background video file path
- Build Container `docker-compose build`

## Running with Docker (Recommended)

`POST=<REDDIT_POST_URL> CREDENTIALS_VOLUME=<GCLOUD_CREDENTIALS_PATH> docker-compose up`

## Running with Node

`POST=<REDDIT_POST_URL> npm run start`

Running with Node or using as a package, you'll need to follow the requirements necessary to run [editly](https://github.com/mifi/editly#requirements).

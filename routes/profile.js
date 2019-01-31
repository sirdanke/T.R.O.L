
const express = require('express')
const router = express.Router()
const Posting = require('../models').Posting
const PostingTags = require('../models').PostingTag
const Tags = require('../models').Tag
const multer = require('multer')
const path = require('path')




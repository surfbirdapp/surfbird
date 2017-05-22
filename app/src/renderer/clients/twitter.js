import Twitter from 'twitter'
import twitterText from 'twitter-text'
import twemoji from 'twemoji'
import credentials from '../../../resources/credentials.json'

export default class TwitterClient {
  constructor (tokens) {
    this.api = new Twitter({
      consumer_key: credentials['twitter']['consumerKey'],
      consumer_secret: credentials['twitter']['consumerSecret'],
      access_token_key: tokens['accessToken'],
      access_token_secret: tokens['accessTokenSecret']
    })

    this.ACTIONS = [
      {
        name: 'Retweet',
        icon: '',
        function: 'retweet'
      },
      {
        name: 'Like',
        icon: '',
        function: 'like'
      }
    ]
  }

  retweet (tweet, callback) {
    console.log('retweet')

    callback('Retweet there!')
  }

  like (tweet, callback) {
    console.log('like')

    callback('Like there!')
  }

  verifyCredentials (callback) {
    this.api.get('account/verify_credentials', {}, (error, data, response) => {
      if (error) { console.log(error) }

      callback(data)
    })
  }

  startStreaming (path, callback) {
    this.api.stream('user', {with: 'followings', include_rts: 'false', extended_tweet: true}, (stream) => {
      stream.on('data', (tweet) => {
        console.log(tweet)
        callback(this.process(tweet))
      })
    })
  }

  process (tweet) {
    if (tweet.retweeted_status !== undefined) {
      tweet.retweeted_status = this.process(tweet.retweeted_status)
    }

    if (tweet.quoted_status !== undefined) {
      tweet.quoted_status = this.process(tweet.quoted_status)
    }

    tweet.text_html = twitterText.autoLink(tweet.text, {'usernameIncludeSymbol': true, 'targetBlank': true})
    tweet.text_html = twemoji.parse(tweet.text_html)

    return tweet
  }
}

// Reply: #199ff4
// Like: #e91e63
// Retweet: #4caf50
// More: #202020
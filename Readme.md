# baitsaagch
  Авто тээврийн байцаагчийн ажлыг хөнгөвчлөх аппликейшн
* Demo
  - [https://baitsaagch.herokuapp.com]
* Used framework (technology)
  - Mongo
  - Express
  - Angular
  - Node
* How to install
   - Clone the repository
   
     * $ git clone https://github.com/bilguun458/baitsaagch2nd.git

   - Install the main components with global flag

      * $ npm install -g nodemon

   - Install the dependencies

      * $ npm install

* Config
   - Change to your API urls (public/config.json):
       * "getTransportsList": "/api/transports/",
       * "getTransport": "/api/transport/",
       * "getLocs": "/api/locs/",
       * "getLocation": "/api/loc/"

* About licence
  - MIT License
  
 
 
 
 
 
 
 
# Sentiment analysis with tweets application

## Used Technologies

Apache Kafka, Apache Spark, Hbase, Twitter streaming API

## To run project, simply

1. Start Kafka server: In kafka root folder run command (bin/kafka-server-start.sh config/server.properties)
2. Run KafkaTweetsStreamer project.
3. Run SparkTweetsStreaming project
4. Run DataSentimentAnalyser project

## About licence
  - MIT License


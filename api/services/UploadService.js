var MAX_BYTES = 50000000; // 50 MB

module.exports = {

  /**
   * `FileController.s3upload()`
   *
   * Upload file(s) to an S3 bucket.
   *
   */
  s3upload: function (fileStream) {
    return Promise.fromNode(function(cb){
      fileStream.upload({
        maxBytes: MAX_BYTES,
        adapter: require('skipper-s3'),
        bucket: process.env.S3_BUCKET,
        key: process.env.S3_KEY,
        secret: process.env.S3_SECRET
      }, cb);
    })
  }

};

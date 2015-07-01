var MAX_BYTES = 50000000; // 50 MB

module.exports = {

  /**
   * `FileController.upload()`
   *
   * Upload file(s) to the server's disk.
   */

  //   req.file('avatar')
  //   .upload({
  //     // You can apply a file upload limit (in bytes)
  //     maxBytes: MAX_BYTES

  //   }, function whenDone(err, uploadedFiles) {
  //     if (err) return res.serverError(err);
  //     else return res.json({
  //       files: uploadedFiles,
  //       textParams: req.params.all()
  //     });
  //   });
  // },

  /**
   * `FileController.s3upload()`
   *
   * Upload file(s) to an S3 bucket.
   *
   */
  s3upload: function (fileStream) {
    console.log('upload to s3', fileStream)

    return Promise.fromNode(function(cb){
      fileStream.upload({
        maxBytes: MAX_BYTES,
        adapter: require('skipper-s3'),
        bucket: process.env.S3_BUCKET,
        key: process.env.S3_KEY,
        secret: process.env.S3_SECRET
      }, cb);
    })
  },

  // /**
  //  * FileController.download()
  //  *
  //  * Download a file from the server's disk.
  //  */
  // download: function (req, res) {
  //   require('fs').createReadStream(req.param('path'))
  //   .on('error', function (err) {
  //     return res.serverError(err);
  //   })
  //   .pipe(res);
  // }
};

import { Mongo } from "meteor/mongo";
import { FilesCollection } from 'meteor/ostrio:files';

Images = new FilesCollection({
  storagePath: '../../../data',   // CHECK IF IT WORKS AFTER DEPLOYMENT
  //storagePath: Meteor.absolutePath + '/data',
  //debug: true,
  downloadRoute: '/files/images',
  collectionName: 'Images',
  //chunkSize: 1024*2048,
  //throttle: 1024*512,
  permissions: 0755,
  allowClientCode: true,
  cacheControl: 'public, max-age=31536000',
  onbeforeunloadMessage: function () {
    return 'Upload is still in progress! Upload will be aborted if you leave this page!';
  },
  onBeforeUpload: function (file) {
    // Allow upload files under 3MB, and only in png/jpg/jpeg formats
    if (file.size <= 3000000 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      //return 'Please upload image, with size equal or less than 10MB';
      return TAPi18n.__("upload_toobig") 
    }
  },
  downloadCallback: function (fileObj) {
    if (this.params.query.download == 'true') {
      // Increment downloads counter
      Images.update(fileObj._id, {$inc: {'meta.downloads': 1}});

    }
    // Must return true to continue download
    return true;
  }
});

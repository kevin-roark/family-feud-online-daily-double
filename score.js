
var renderer = new frampton.WebRenderer({
  mediaConfig: mediaConfig,
  timeToLoadVideo: 3600,
  videoSourceMaker: function(filename) {
    switch (filename[0]) {
      case 'F':
        return `http://family.feud.online/media/${filename}`;

      case 'D':
        return `http://answers.feud.online/media/${filename}`;

      default:
        return `media/${filename}`;
    }
  }
});

var firstSegment = newSequencedSegment();
renderer.scheduleSegmentRender(firstSegment, 2000);

function newSequencedSegment() {
  var segments = [];

  var videos = frampton.util.shuffle(mediaConfig.videos);
  videos.forEach((video) => {
    var segment = new frampton.VideoSegment(video);
    segments.push(segment);
  });

  var sequencedSegment = new frampton.SequencedSegment({
    segments: segments,
    onStart: () => {
      // once it starts, schedule the next loop with a new shuffle
      var newSegment = newSequencedSegment();
      var offset = sequencedSegment.msDuration();
      renderer.scheduleSegmentRender(newSegment, offset);
    }
  });

  return sequencedSegment;
}

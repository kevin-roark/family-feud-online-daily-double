
var renderer = new frampton.WebRenderer({
  mediaConfig: mediaConfig,
  timeToLoadVideo: 6000,
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

var videos = frampton.util.shuffle(mediaConfig.videos);

// schedule 3 at the bang
for (var i = 0; i < 3; i++) {
  renderer.scheduleSegmentRender(newSegment(), 4500 + i * 400);
}

function newSegment() {
  var video = frampton.util.choice(videos);
  var width = Math.random() * 40 + 35;
  var left = (100 - width * 0.75) * Math.random();
  var top = Math.random() * 35;
  var opacity = Math.random() * 0.45 + 0.55;

  var segment = new frampton.VideoSegment({
    filename: video.filename,
    duration: video.duration,
    width: width + '%',
    left: left + '%',
    top: top + '%',
    opacity: opacity,
    onStart: () => {
      // once it starts, schedule the next one
      var duration = segment.msDuration();
      var offset = (Math.random() * duration * 0.5) + duration * 0.75;
      renderer.scheduleSegmentRender(newSegment(), offset);
    }
  });

  return segment;
}

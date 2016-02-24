
var renderer = new frampton.WebRenderer({
  mediaConfig: mediaConfig,
  timeToLoadVideo: 8000,
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

// schedule 3 stacked segments at the bang
for (var i = 0; i < 3; i++) {
  renderer.scheduleSegmentRender(stackedGhostSegment(), 4500 + i * 1100);
}

function stackedGhostSegment() {
  var segments = [];
  for (var i = 0; i < 10; i++) { segments.push(ghostVideoSegment()); }

  var stackedSegment = new frampton.StackedSegment({
    segments: segments,
    onStart: () => {
      // once the first segment starts, schedule the next batch
      var nextSegment = stackedGhostSegment();
      var nextSegmentOffset = stackedSegment.msDuration() + Math.random() * 500;
      renderer.scheduleSegmentRender(nextSegment, nextSegmentOffset);
    }
  });

  return stackedSegment;
}

function ghostVideoSegment() {
  var video = frampton.util.choice(mediaConfig.videos);
  var width = Math.random() * 56 + 34;
  var left = (100 - width * 0.85) * Math.random();
  var top = Math.random() * 35;
  var opacity = Math.random() * 0.43 + 0.5;

  var segment = new frampton.VideoSegment({
    filename: video.filename,
    duration: video.duration,
    width: width + '%',
    left: left + '%',
    top: top + '%',
    opacity: opacity
  });

  return segment;
}

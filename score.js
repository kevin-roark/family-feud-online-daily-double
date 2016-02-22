
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

// schedule 3 self-doublers at the bang
for (var i = 0; i < 3; i++) {
  setupDoubledGhostSegments(4500 + i * 1000);
}

function setupDoubledGhostSegments(segmentOffset=0) {
  // multiple segments scheduled at a time for loading optimization

  var segments = [];
  var videoOffset = 0;
  for (var i = 0; i < 10; i++) {
    var segment = ghostVideoSegment();
    segment.__offset = segmentOffset + videoOffset;
    segments.push(segment);

    var duration = segment.msDuration();
    videoOffset += (Math.random() * duration * 0.5) + duration * 0.75;
  }

  segments[0].onStart = () => {
    // once the first segment starts, schedule the next batch
    var nextSegmentOffset = videoOffset + Math.random() * 500 + 200;
    console.log(`next segment ${nextSegmentOffset}`);
    setupDoubledGhostSegments(nextSegmentOffset);
  };

  segments.forEach((segment) => {
    renderer.scheduleSegmentRender(segment, segment.__offset);
  });
}

function ghostVideoSegment() {
  var video = frampton.util.choice(mediaConfig.videos);
  var width = Math.random() * 55 + 35;
  var left = (100 - width * 0.75) * Math.random();
  var top = Math.random() * 35;
  var opacity = Math.random() * 0.45 + 0.48;

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

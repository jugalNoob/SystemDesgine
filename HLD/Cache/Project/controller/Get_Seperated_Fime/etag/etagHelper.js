exports.buildETag = (version) => {
  return `v${version}`;
};

exports.isETagMatch = (clientETag, currentETag) => {
  return clientETag === currentETag;
};

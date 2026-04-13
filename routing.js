// routing.js
// Logic for dynamic route calculations separated for unit testing

function calculateTransitTime(baseTimeSeconds, nodeCongestionLevel) {
  if (baseTimeSeconds <= 0) return 0;
  // If congestion is high (> 80%), routing takes 2x longer
  if (nodeCongestionLevel > 80) {
    return baseTimeSeconds * 2;
  }
  // Otherwise standard flow plus a minor delay
  return baseTimeSeconds + (nodeCongestionLevel * 0.1);
}

function findOptimalLift(lifts) {
  if (!lifts || lifts.length === 0) return null;
  // Return lift with the lowest current capacity usage
  return lifts.reduce((best, current) => {
    return (current.capacity < best.capacity) ? current : best;
  });
}

module.exports = {
  calculateTransitTime,
  findOptimalLift
};

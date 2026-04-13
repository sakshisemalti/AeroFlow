const { calculateTransitTime, findOptimalLift } = require('../routing');

describe('Anti-Gravity Routing Logic', () => {

  test('calculateTransitTime logic should compute delays properly based on congestion', () => {
    // Normal flow
    expect(calculateTransitTime(30, 10)).toBe(31);
    
    // Congested flow (over 80%)
    expect(calculateTransitTime(30, 85)).toBe(60); // 30 * 2
    
    // Edge case constraints
    expect(calculateTransitTime(0, 50)).toBe(0);
  });

  test('findOptimalLift logic should locate the least congested levitation shaft', () => {
    const mockLifts = [
      { name: 'Grav-1', capacity: 60 },
      { name: 'Grav-2', capacity: 20 },
      { name: 'Grav-3', capacity: 90 }
    ];
    
    const optimal = findOptimalLift(mockLifts);
    expect(optimal.name).toBe('Grav-2');
  });

  test('findOptimalLift should return null for empty arrays', () => {
    expect(findOptimalLift([])).toBeNull();
  });
});

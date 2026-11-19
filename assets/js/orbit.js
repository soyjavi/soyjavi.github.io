export const ORBIT = { minDistance: 6, maxDistance: 640, minPitch: -1.3, maxPitch: 1.3 };

export const clamp = (value, low, high) => Math.min(high, Math.max(low, value));

export function eye({ target, distance, yaw, pitch }) {
  const flat = Math.cos(pitch);
  return [target[0] + distance * flat * Math.sin(yaw), target[1] + distance * Math.sin(pitch), target[2] + distance * flat * Math.cos(yaw)];
}

export const zoom = (distance, amount) => clamp(distance * Math.exp(amount), ORBIT.minDistance, ORBIT.maxDistance);

export const turn = ({ yaw, pitch }, dx, dy) => ({ yaw: yaw + dx, pitch: clamp(pitch + dy, ORBIT.minPitch, ORBIT.maxPitch) });

export function slide({ target, distance, yaw, pitch }, dx, dy, height, fov) {
  const unit = (2 * distance * Math.tan(fov / 2)) / height;
  const right = [Math.cos(yaw), 0, -Math.sin(yaw)];
  const up = [-Math.sin(pitch) * Math.sin(yaw), Math.cos(pitch), -Math.sin(pitch) * Math.cos(yaw)];
  return target.map((value, axis) => value - right[axis] * dx * unit + up[axis] * dy * unit);
}

export const ease = (current, goal, dt, rate) => (Number.isFinite(current) ? current + (goal - current) * (1 - Math.exp(-rate * Math.max(0, dt))) : goal);

export const nearest = (from, to) => from + Math.atan2(Math.sin(to - from), Math.cos(to - from));

export function approach(state, goal, dt, rate) {
  return {
    target: state.target.map((value, axis) => ease(value, goal.target[axis], dt, rate)),
    distance: Math.exp(ease(Math.log(state.distance), Math.log(goal.distance), dt, rate)),
    yaw: ease(state.yaw, nearest(state.yaw, goal.yaw), dt, rate),
    pitch: ease(state.pitch, goal.pitch, dt, rate),
  };
}

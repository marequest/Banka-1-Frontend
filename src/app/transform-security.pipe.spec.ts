import { TransformSecurityPipe } from './transform-security.pipe';

describe('TransformSecurityPipe', () => {
  it('create an instance', () => {
    const pipe = new TransformSecurityPipe();
    expect(pipe).toBeTruthy();
  });
});

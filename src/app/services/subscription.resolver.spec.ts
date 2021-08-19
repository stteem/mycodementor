import { TestBed } from '@angular/core/testing';

import { SubscriptionResolver } from './subscription.resolver';

describe('SubscriptionResolver', () => {
  let resolver: SubscriptionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SubscriptionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

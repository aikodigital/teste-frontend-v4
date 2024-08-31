import { describe, it, expect, vi } from "vitest";
import { useLoader } from "./index";


describe('useLoader', () => {
  it('Deve indicar o loading quanto uma promise não resolve', async () => {
    const mock = vi.fn(() => new Promise(() => { }));

    const [isLoading, cb] = useLoader(mock);

    expect(isLoading.value).toBeFalsy();

    const promise = cb();
    expect(mock).toHaveBeenCalled();

    expect(isLoading.value).toBeTruthy();
    expect(promise).toBeInstanceOf(Promise);
    promise.then(() => {
      expect(isLoading.value).toBeFalsy();
    });
  })
});